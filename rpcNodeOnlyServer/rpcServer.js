#!/usr/bin/env node
'use strict';

var net = require('net');
var fs = require('fs');
var util = require('util');
var _ = require('underscore');
var uuid = require('uuid');
var LOGGER = require('./logger.js');
var CONFIG = require('./cfg/config.js');
var mvdmClient = require('./mvdmClient');
var mvdmManagement = require('./mvdmManagement');
var EventManager = require('./eventManager');
var parser = require('nodevista-rpcparser/rpcParser.js');
var rpcFormatter = require('nodevista-rpcparser/rpcFormatter.js');
var unsupportedRPCs = require('./unsupportedRPCs.js');
var vdmUtils = require('mvdm/vdmUtils');

var utilityRpcLModel = require('mvdm/utilityRPCs/rpcLRemoteUtilitiesModel').rpcLModel;
var utilityRpcLClassesByName = utilityRpcLModel.reduce(function(obj, val) {obj[val["name"]] = val; return obj;  }, {});

// imports for RPCService
var nodem = require('nodem');
var RPCFacade = require('mvdm/rpcDispatcher');
var RPCContexts = require('mvdm/rpcRunner').RPCContexts;
var db, rpcFacade, rpcContexts;


var server;

var NUL = '\u0000';
var SOH = '\u0001';
var EOT = '\u0004';
var ENQ = '\u0005';

process.on('uncaughtException', function(err) {
    if (db !== undefined) {
        db.close();
    }

    console.trace('Uncaught Exception:\n', err.stack);

    process.exit(1);
});

function connectVistaDatabase() {
    process.env.gtmroutines = process.env.gtmroutines + ' ' + vdmUtils.getVdmPath(); // make VDP MUMPS available
    console.log("process.env.gtmroutines: " + process.env.gtmroutines);

    db = new nodem.Gtm();
    db.open();

    rpcFacade = new RPCFacade(db);
    rpcFacade.setEmulating(true); //default is to utilize mvdm emulating

    rpcContexts = new RPCContexts(db);
}

// connect to the VistADatabase
connectVistaDatabase();

function generateTransactionId() {
    return uuid.v4();
}


// check for command line overrides
if (process.argv.length > 2) {
    for (var argnum = 2; argnum < process.argv.length; argnum++) {
        if (process.argv[argnum].indexOf("from=") > -1) {
            // from=something
            fromName = process.argv[argnum].substring(5);
            LOGGER.info("Using '%s' as the from in the capture", fromName);
        } else if (process.argv[argnum].indexOf("captureFile=") > -1) {
            // captureFile=path
            capturePath = process.argv[argnum].substring(12);
            LOGGER.info("Capture file being written to %s", capturePath);
        } else if (process.argv[argnum].indexOf("snifferPort=") > -1) {
            // snifferPort=port
            port = parseInt(process.argv[argnum].substring(12));
            if (isNaN(port)) {
                port = CONFIG.rpcServer.port;
            }
            LOGGER.info("Setting sniffer port to %s", port);
        }
    }
}

var fromName = CONFIG.client.defaultName;
var capturePath = CONFIG.FILE.defaultCaptureFile;
var port = CONFIG.rpcServer.port;

// Setup the capture file
var captureFile = fs.createWriteStream(capturePath, CONFIG.FILE.options);
// wait until the captureFile is open before continuing
captureFile.on("open", function (fd) {
    LOGGER.info("Capture file %s opened for writing", capturePath);
    captureFile.write("[\n");

    // Start up the server
    server = net.createServer();
    server.on('connection', handleConnection);
    server.listen(port, function () {
        LOGGER.info('RPCServer listening to %j', server.address());

        //start up mvdm client
        mvdmClient.init();
    });
});

// main function to handle the connection from the client
function handleConnection(conn) {
    var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
    LOGGER.info('New client connection from %s', remoteAddress);
    var chunk = '';

    conn.on('data', onConnectedData);
    conn.on('close', onConnectedClose);
    conn.on('error', onConnectedError);

    // handle data coming from the client
    function onConnectedData(data) {
        chunk += data;
        // find the end of a RPC packet
        var eotIndex = chunk.indexOf(EOT);

        // loop for each packet in the data chunk
        while (eotIndex > -1) {
            var response = '';

            // get a packet from the chunk (without the EOT)
            var rpcPacket = chunk.substr(0, eotIndex + 1);
            // remove the RPC packet from the chunk
            chunk = chunk.substring(eotIndex + 1)
            // find the end of the next RPC packet
            eotIndex = chunk.indexOf(EOT);

            // process the packet
            LOGGER.info('RECEIVED RPC from %s: %s', remoteAddress, data);

            var messageObject = {};
            messageObject.method = 'callRPC';
            messageObject.ipAddress = conn.remoteAddress;
            messageObject.rpcPacket = rpcPacket;
            messageObject.isMvdmEmulated = mvdmManagement.isMvdmEmulated;
            messageObject.contextId = remoteAddress;

            rpcFacade.setEmulating(messageObject.isMvdmEmulated);

            // LOGGER.debug('rpcQWorker in on(\'message\'), callRPC messageObj: %j ', messageObj);

            // set the context (user, facility of the runner)
            rpcContexts.setContext(messageObject.contextId);

            var res = callRPC(messageObject);

            // write out the rpc to a capture log
            captureFile.write(JSON.stringify(res.rpcObject, null, 2) + ",\n");

            // write the response back to the client
            LOGGER.info("SENDING RESPONSE to client: %j", res.response);
            var responseBuffer = new Buffer(res.response, 'binary');

            conn.write(responseBuffer);
        }
    }


    function onConnectedClose() {

        if (rpcFacade !== undefined) {
            rpcFacade.reinit();
        }
        // also clear the contexts
        if (rpcContexts !== undefined) {
            rpcContexts.clearAll();
        }

        //loggedIn = false;
        //USER = null;
        //FACILITY = null;
        LOGGER.info('CONNECTION from %s CLOSED', remoteAddress);
        conn.removeAllListeners();
        conn.end();
        conn.destroy();
    }

    function onConnectedError(err) {
        //loggedIn = false;
        //USER = null;
        //FACILITY = null;
        LOGGER.error('CONNECTION %s ERROR: %s', remoteAddress, err.message);
        conn.removeAllListeners();
        conn.end();
        conn.destroy();
    }

    function callRPC(messageObject) {
        var response = '';
        var transactionId;
        var runResult;

        var rpcObject = parser.parseRawRPC(messageObject.rpcPacket);

        if (mvdmManagement.isNodeOnly && utilityRpcLClassesByName[rpcObject.name] !== undefined) {
            // run the RPC by the model
            LOGGER.debug('rpcServer.js trying to run utilityRPC: %j', rpcObject);

            var rpcModel = utilityRpcLClassesByName[rpcObject.name];
            var invokeResult = rpcModel.processRPCInvocation(rpcObject.args);
            response = rpcModel.toReturnValue(invokeResult);
            response = rpcFormatter.encapsulate(response);

            rpcObject.to = "server";

        } else


        if (unsupportedRPCs.has(rpcObject.name)) {
            // Check if it is a connection RPC, for now we will just catch these and return hard coded responses
            // these can be found in unsupportedRpcs.js map.

            transactionId = generateTransactionId();
            // the unsupported RPC response does not depend on the arguments, this is usually the simple case
            LOGGER.debug("unsupported RPC/param, returning server defined response");
            response = unsupportedRPCs.get(rpcObject.name);
            rpcObject.to = "server";
        } else {
            // These are normal RPCs that can go to either the emulator or the runner.
            LOGGER.debug("calling RPC emulator or runner");
            var ret =  rpcFacade.run(rpcObject.name, rpcObject.args);

            rpcObject.to = ret.path;
            response = ret.rpcResponse;
            transactionId = ret.transactionId;
            runResult = ret.result;
        }

        // log to capture file the RPC and the response to a file
        // emit rpc call event
        if (rpcObject) {
            // add more info to captured object
            rpcObject.rpc = messageObject.rpcPacket;
            rpcObject.response = response;
            rpcObject.from = fromName;
            rpcObject.timeStamp = new Date().toISOString();

            var rpcCallEvent = {
                type: 'rpcCall',
                transactionId: transactionId,
                ipAddress: messageObject.ipAddress,
                timestamp: rpcObject.timeStamp,
                runner: rpcObject.to,
                runResult: runResult,
                rpcName: rpcObject.name,
                rpcObject: rpcObject,
                request: {args: rpcObject.args},
                response: rpcObject.response
            };

            //include user if
            var userAndFacility = rpcFacade.getUserAndFacility();

            rpcCallEvent.user = {
                id: '200-' + userAndFacility.userId,
                name: userAndFacility.userName
            }

            //include facility if available
            rpcCallEvent.facility = {
                id: '4-' + userAndFacility.facilityId,
                name: userAndFacility.facilityName,
                stationNumber:  userAndFacility.facilityStationNumber
            }

            EventManager.emit('rpcCall', rpcCallEvent);
        }
        // write out the rpc to a capture log
        captureFile.write(JSON.stringify(rpcObject, null, 2) + ",\n");

        return {"rpcObject": rpcObject, "response": response};

    }
}


