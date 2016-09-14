var net = require('net');
var fs = require('fs');
var util = require('util');
var _ = require('underscore');
var HashMap = require('hashmap');
var parser = require('./../rpcParser/rpcParser.js');
var LOGGER = require('./logger.js');
var CONFIG = require('./cfg/config.js');
var unsupportedRPCs = require('./unsupportedRPCs.js');
var VistaJS = require('../VistaJS/VistaJS.js');
var VistaJSLibrary = require('../VistaJS/VistaJSLibrary.js');
var EventManager = require('./eventManager');

// imports for RpcRunner
var nodem = require('nodem');
var RPCRunner = require('../../../VDM/prototypes/rpcRunner').RPCRunner;
// imports for locked rpcs
var lockedRPCs = require('./lockedRPCs.js');
var mvdmManagement = require('./mvdmManagement');
var mvdmClient = require('./mvdmClient');
var moment = require('moment');


var DT_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

var db, rpcRunner;
var server;
var DUZ = '';
var facilityCode = '';

//need for user and facility lookup
var vdmUtils = require('../../../VDM/prototypes/vdmUtils');
var USER, FACILITY;

var NUL = '\u0000';
var SOH = '\u0001';
var EOT = '\u0004';
var ENQ = '\u0005';

var fromName = CONFIG.client.defaultName;
var capturePath = CONFIG.FILE.defaultCaptureFile;
var port = CONFIG.rpcServer.port;

var loggedIn = false;

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
        } else if (process.argv[argnum].toLowerCase().indexOf("duz=") > -1) {
            // DUZ=DUZ
            DUZ = parseInt(process.argv[argnum].substring(4));
            if (isNaN(DUZ)) {
                port = CONFIG.USER.DUZ;
            }
            LOGGER.info("Setting DUZ to %s", DUZ);
        }
    }
}

connectVistaDatabase();

// first set up a connection to VistA's RPC Broker
function connectVistaDatabase() {
    process.env.gtmroutines = process.env.gtmroutines + ' ../../../VDM/prototypes'; // make VDP MUMPS available
    db = new nodem.Gtm();
    db.open();

    rpcRunner = new RPCRunner(db);
}

function setUserAndFacilityCode(newDUZ, newFacilityCode) {
    DUZ = newDUZ;
    facilityCode = newFacilityCode;

    //needed for RPC event reporting
    USER = vdmUtils.userFromId(db, '200-' + DUZ);
    FACILITY = vdmUtils.facilityFromId(db, '4-' + facilityCode);
}


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
            var rpcObject = parser.parseRawRPC(rpcPacket);

            response = callRPC(rpcObject, rpcPacket);

            // write the response back to the client
            LOGGER.info("SENDING RESPONSE to client: " + response);
            var responseBuffer = new Buffer(response, 'binary');

            conn.write(responseBuffer);

        }
    }

    function callRpcLockerOrRunner(rpcObject) {
        var rpcResult;

        // It isn't one that needs to be squashed so we call either rpc locker or localRpcRunner
        if (mvdmManagement.isMvdmLocked && lockedRPCs.has(rpcObject.name)) {
            if (loggedIn) {
                var domainrpcL = lockedRPCs.get(rpcObject.name);
                domainrpcL.setup(db, DUZ, facilityCode);
                rpcObject.to = "mvdmLocked";
                rpcResult = domainrpcL.rpcL.run(rpcObject.name, rpcObject);
                LOGGER.info("RESULT FROM RpcL for RPC: %s, result: %j", rpcObject.name, rpcResult);
            } else {
                LOGGER.info('NOT LOGGED IN, dropping RPC call: %s', rpcObject.name);
            }
        } else {
            //rpcObject.args = parser.inputParametersToArgs(rpcObject.inputParameters);

            rpcObject.to = "rpcRunner";

            try {
                rpcResult = rpcRunner.run(rpcObject.name, rpcObject.args);
                LOGGER.info("RESULT FROM rpcRunner for RPC: %s, result: %j", rpcObject.name, rpcResult);
            } catch (err) {
                LOGGER.error("Error thrown from rpcRunner.run() in rpcServer:  %s", err.message)
            }

            if (rpcObject.name === 'XUS AV CODE') {
                // check if it was a login attempt, if it was successful, set the DUZ and facility
                // from a call to XUS GET USER INFO, and set the loggedIn state
                if (rpcResult.result[0] === '0') {
                    LOGGER.error('Authentication error on XUS AV CODE: %j', rpcResult);
                } else {
                    loggedIn = true;

                    var userInfoResult = rpcRunner.run("XUS GET USER INFO").result;
                    var facilityArray = userInfoResult[3].split("^");

                    // TODO: validate that USER INFO is an array.
                    setUserAndFacilityCode(userInfoResult[0], facilityArray[0]);
                }
            }

        }

        var response = '\u0000\u0000';
        if (rpcResult && rpcResult.result !== undefined) {
            if (_.isArray(rpcResult.result)) {
                // in rpcRunner the ARRAY, WORD PROCESSING, and GLOBAL ARRAY returns an array as the replyType
                for (var i = 0; i < rpcResult.result.length; i++) {
                    response += rpcResult.result[i] + '\r\n';
                }
            } else {
                // the SINGLE VALUE replyType is not an array
                response += rpcResult.result;
            }
        }
        response += '\u0004';

        return response;
    }

    function onConnectedClose() {
        //rpcRunner.reinit();
        loggedIn = false;
        LOGGER.info('CONNECTION from %s CLOSED', remoteAddress);
        conn.removeAllListeners();
        conn.end();
        conn.destroy();
    }

    function onConnectedError(err) {
        //rpcRunner.reinit();
        loggedIn = false;
        LOGGER.error('CONNECTION %s ERROR: %s', remoteAddress, err.message);
        conn.removeAllListeners();
        conn.end();
        conn.destroy();
    }

    /**
     * This takes the object (rpcObject) from the parsed RPC string (rpcPacket) and passes it
     * to either the rpcLocker or rpcRunner
     *
     * @param rpcObject js object returned from rpc parser
     * @param rpcPacket the raw rpc string
     * @returns {string} the response from the rpcLocker or rpcRunner (enveloped in \u0000\u0000 and \u0004)
     */
    function callRPC(rpcObject, rpcPacket) {
        var response = '';

        if (unsupportedRPCs.has(rpcObject.name)) {
            // Check if it is one of the auth RPCs, for now we will just catch these and return hard coded responses

            // check if the mapped value is a map for parameters or just a single response
            if (unsupportedRPCs.get(rpcObject.name) instanceof HashMap && rpcObject.args !== undefined) {
                LOGGER.debug('checking for unsupported RPC/param pairs')

                var params = unsupportedRPCs.get(rpcObject.name).keys();
                var paramKey;
                for (var i = 0; i < params.length; i++) {
                    for (var j = 0; j < rpcObject.args.length; j++) {
                        // check each argument if it contains the param
                        if (typeof rpcObject.args[j] === 'string' && rpcObject.args[j].indexOf(params[i]) > -1) {
                            paramKey = params[i];
                            LOGGER.debug("found an unsupported RPC/arg pair: %s %s", rpcObject.name, paramKey);
                            break;
                        }
                    }
                    if (paramKey !== undefined) {
                        break;
                    }
                }
                if (paramKey !== undefined) {
                    LOGGER.debug("unsupported RPC/param, returning server defined response");
                    response = unsupportedRPCs.get(rpcObject.name).get(paramKey);
                    rpcObject.to = "server";
                } else {
                    // could not find a matching response, try calling the rpc locker or rpcRunner anyway
                    LOGGER.debug("no unsupported RPC/arg pair, calling RPC locker or rpcRunner");
                    response = callRpcLockerOrRunner(rpcObject);

                }
            } else {
                // the unsupported RPC response does not depend on the arguments
                LOGGER.debug("unsupported RPC, returning server defined response");
                response = unsupportedRPCs.get(rpcObject.name);
                rpcObject.to = "server";
            }
        } else {
            LOGGER.debug("calling RPC locker or runner");
            response = callRpcLockerOrRunner(rpcObject);
        }

        // log to capture file the RPC and the response to a file
        // emit rpc call event
        if (rpcObject) {
            // add more info to captured object
            rpcObject.rpc = rpcPacket;
            rpcObject.response = response;
            rpcObject.from = fromName;
            rpcObject.timeStamp = new Date().toISOString();

            var rpcCallEvent = {
                type: 'rpcCall',
                timestamp: moment().format(DT_FORMAT) + 'Z',
                runner: rpcObject.to,
                rpcName: rpcObject.name,
                rpcObject: rpcObject,
                response: response
            };

            //include user if available
            if (USER) {
                rpcCallEvent.user = {
                    id: '200-' + DUZ,
                    name: USER.name.value
                }
            }

            //include facility if available
            if (FACILITY) {
                rpcCallEvent.facility = {
                    id: '4-' + facilityCode,
                    name: FACILITY.name.value,
                    stationNumber:  FACILITY['station_number'].value
                }
            }

            EventManager.emit('rpcCall', rpcCallEvent);
        }
        captureFile.write(JSON.stringify(rpcObject, null, 2) + ",\n");

        return response;

    }

}



