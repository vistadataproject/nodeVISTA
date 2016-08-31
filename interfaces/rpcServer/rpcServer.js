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
var EventHandler = require('./EventHandler');

// imports for localRpcRunner
var nodem = require('nodem');
var localRPCRunner = require('../../../VDM/prototypes/localRPCRunner');
// imports for emulated
var emulatedRPCs = require('./emulatedRPCs.js');
var mvdmManagement = require('./mvdmManagement');
var adminServer = require('./adminServer');
var moment = require('moment');

var DT_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

var db;
var DUZ = CONFIG.USER.DUZ;
var facilityCode = CONFIG.FACILITY.ID;

var NUL = '\u0000';
var SOH = '\u0001';
var EOT = '\u0004';
var ENQ = '\u0005';

var fromName = CONFIG.client.defaultName;
var capturePath = CONFIG.FILE.defaultCaptureFile;
var port = CONFIG.sniffer.port;

// check for command line overrides
if (process.argv.length > 2) {
    for (var argnum = 2; argnum < process.argv.length; argnum++) {
        if (process.argv[argnum].indexOf("from=")  > -1) {
            // from=something
            fromName = process.argv[argnum].substring(5);
            console.log("Using '%s' as the from in the capture", fromName);
        } else if (process.argv[argnum].indexOf("captureFile=")  > -1) {
            // captureFile=path
            capturePath = process.argv[argnum].substring(12);
            console.log("Capture file being written to %s", capturePath);
        } else if (process.argv[argnum].indexOf("snifferPort=")  > -1) {
            // snifferPort=port
            port = parseInt(process.argv[argnum].substring(12));
            if (isNaN(port)) {
                port = CONFIG.sniffer.port;
            }
            console.log("Setting sniffer port to %s", port);
        } else if (process.argv[argnum].toLowerCase().indexOf("duz=")  > -1) {
            // DUZ=DUZ
            DUZ = parseInt(process.argv[argnum].substring(4));
            if (isNaN(DUZ)) {
                port = CONFIG.USER.DUZ;
            }
            console.log("Setting DUZ to %s", DUZ);
        }
    }
}

connectVistaDatabase();

// first set up a connection to VistA's RPC Broker
function connectVistaDatabase() {
    process.env.gtmroutines = process.env.gtmroutines + ' ../../../VDM/prototypes'; // make VDP MUMPS available
    db = new nodem.Gtm();
    db.open();
}


var captureFile = fs.createWriteStream(capturePath, CONFIG.FILE.options);
// wait until the captureFile is open before continuing
captureFile.on("open", function(fd) {
    LOGGER.info("Capture file %s opened for writing", capturePath);
    captureFile.write("[\n");

    // Start up the server
    server = net.createServer();
    server.on('connection', handleConnection);
    server.listen(port, function() {
        console.log('Sniffer listening to %j', server.address());

        //start up rpc server admin server
        adminServer.init();
    });
});

// main function to handle the connection from the client
function handleConnection(conn) {
    var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
    console.log('New client connection from %s', remoteAddress);
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
            // get a packet from the chunk (without the EOT)
            var rpcPacket = chunk.substr(0, eotIndex + 1);
            // remove the RPC packet from the chunk
            chunk = chunk.substring(eotIndex + 1)
            // find the end of the next RPC packet
            eotIndex = chunk.indexOf(EOT);

            // process the packet
            LOGGER.info('Connection data from %s: %s', remoteAddress, data);
            var rpcObject = parser.parseRawRPC(rpcPacket);
            LOGGER.info("RPC name: %s", rpcObject.name);

            var response = '';
            var runnerReturn, runner;


            if (unsupportedRPCs.has(rpcObject.name)) {
                // Check if it is one of the auth RPCs, for now we will just catch these and return hard coded responses

                // check if the mapped value is a map for parameters or just a single response
                if (unsupportedRPCs.get(rpcObject.name) instanceof HashMap && rpcObject.args !== undefined) {
                    LOGGER.info('checking for unsupported RPC/param pairs')

                    var params = unsupportedRPCs.get(rpcObject.name).keys();
                    var paramKey;
                    for (var i = 0; i < params.length; i++) {
                        for (var j = 0; j < rpcObject.args.length; j++) {
                            // check each argument if it contains the param
                            if (typeof rpcObject.args[j] === 'string' && rpcObject.args[j].indexOf(params[i]) > -1) {
                                paramKey = params[i];
                                LOGGER.info("found an unsupported RPC/arg pair: %s %s", rpcObject.name, paramKey);
                                break;
                            }
                        }
                        if (paramKey !== undefined) {
                            break;
                        }
                    }
                    if (paramKey !== undefined) {
                        LOGGER.info("unsupported RPC/param, returning hardcoded response");
                        response = unsupportedRPCs.get(rpcObject.name).get(paramKey);
                        runner = "hardcode";
                    } else {
                        // could not find a matching response, try calling the emulator or localRunner anyway
                        LOGGER.info("no unsupported RPC/arg pair, calling RPC emulator or localRunner");
                        runnerReturn = callEmulatorOrLocalRunner(rpcObject);
                        response = runnerReturn.response;
                        runner = runnerReturn.runner;
                    }
                } else {
                    // the unsupported RPC response does not depend on the arguments
                    LOGGER.info("unsupported RPC, returning hardcoded response");
                    response = unsupportedRPCs.get(rpcObject.name);
                    runner = "hardcode";
                }
            } else {
                LOGGER.info("calling RPC emulator or local runner");
                runnerReturn = callEmulatorOrLocalRunner(rpcObject);
                response = runnerReturn.response;
                runner = runnerReturn.runner;
            }

            // log to capture file the RPC and the response to a file
            if (rpcObject) {
                // add more info to captured object
                rpcObject.rpc = rpcPacket;
                rpcObject.response = response;
                rpcObject.from = fromName;
                rpcObject.to = runner;
                rpcObject.timeStamp = new Date().toISOString();
            }
            captureFile.write(JSON.stringify(rpcObject, null, 2) + ",\n");


            // write the response back to the client
            var responseBuffer = new Buffer(response, 'binary');

            conn.write(responseBuffer);

        }

    }

    function callEmulatorOrLocalRunner(rpcObject) {
        var rpcResult;
        var runner;
        // It isn't one that needs to be squashed so we call either emulate or localRpcRunner
        if (mvdmManagement.isEmulation && emulatedRPCs.has(rpcObject.name)) {
            var domainRpcE = emulatedRPCs.get(rpcObject.name);
            domainRpcE.setup(db, DUZ, facilityCode);
            runner = "rpcE";
            rpcResult = domainRpcE.rpcE.run(rpcObject.name, rpcObject);
            LOGGER.info("RpcE: %s, result: %j", rpcObject.name, rpcResult);
        } else {
            //rpcObject.args = parser.inputParametersToArgs(rpcObject.inputParameters);
            LOGGER.info("RPC parameters: %j", rpcObject.args);
            runner = "localRPCRunner";
            rpcResult = localRPCRunner.run(db, DUZ, rpcObject.name, rpcObject.args, facilityCode);
        }

        var response = '\u0000\u0000';
        if (rpcResult && rpcResult.result !== undefined) {
            if (_.isArray(rpcResult.result)) {
                // in localRpcRunner the ARRAY, WORD PROCESSING, and GLOBAL ARRAY returns an array as the replyType
                for (var i = 0; i < rpcResult.result.length; i++) {
                    response += rpcResult.result[i] +'\r\n';
                }
            } else {
                // the SINGLE VALUE replyType is not an array
                response += rpcResult.result;
            }
        }
        response += '\u0004';
        console.log("response to client: " + JSON.stringify(response));

        EventHandler.emit('rpcCall', {
            type: 'rpcCall',
            timestamp: moment().format(DT_FORMAT) + 'Z',
            runner: runner,
            rpcName: rpcObject.name,
            isEmulated: runner === 'rpcE',
            rpcObject: rpcObject,
            result: rpcResult,
            response: response
        });

        return {"response": response, "runner": runner};
    }

    function onConnectedClose() {
        LOGGER.info('Connection from %s closed', remoteAddress);
        conn.removeAllListeners();
        conn.end();
        conn.destroy();
    }

    function onConnectedError(err) {
        LOGGER.error('Connection %s error: %s', remoteAddress, err.message);
        conn.removeAllListeners();
        conn.end();
        conn.destroy();
    }

}


