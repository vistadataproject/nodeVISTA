var net = require('net');
var fs = require('fs');
var util = require('util');
var _ = require('underscore');
var parser = require('./../rpcParser/rpcParser.js');
var LOGGER = require('./logger.js');
var CONFIG = require('./config.js');
var authRpcs = require('./authRpcs.js');
var VistaJS = require('../VistaJS/VistaJS.js');
var VistaJSLibrary = require('../VistaJS/VistaJSLibrary.js');

// imports for localRpcRunner
var nodem = require('nodem');
var localRPCRunner = require('../../../VDM/prototypes/localRPCRunner');
var DUZ = CONFIG.USER.DUZ;
var facilityCode = CONFIG.FACILITY.ID;
var db;
var emulated;

var DEFAULT_TIMEOUT = CONFIG.vistaRpcBroker.connectPollTimeout;
var DEFAULT_INTERVAL = CONFIG.vistaRpcBroker.connectPollInterval;
var NUL = '\u0000';
var SOH = '\u0001';
var EOT = '\u0004';
var ENQ = '\u0005';

var configuration = CONFIG.vistaRpcBroker.configuration;
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
            rpcObject.args = [];
            if (rpcObject.inputParameters && rpcObject.inputParameters.length > 0) {
                for (var paramnum = 0; paramnum < rpcObject.inputParameters.length; paramnum++) {
                    rpcObject.args.push(rpcObject.inputParameters[paramnum].parameter);
                }
                LOGGER.info("RPC parameters: %j", rpcObject.args);
            }


            console.log("Rpc name and args: %s %s", JSON.stringify(rpcObject.name), JSON.stringify(rpcObject.args));

            var response = '';

            if (authRpcs.has(rpcObject.name)) {
                // Check if it is one of the auth RPCs, for now we will just catch these and return hard coded responses
                response = authRpcs.get(rpcObject.name);
            } else {
                // It isn't one that needs to be squashed so we call either emulate or localRpcRunner
                if (emulated) {

                } else {
                    var rpcRunnerResult = localRPCRunner.run(db, DUZ, rpcObject.name, rpcObject.args, facilityCode);

                    response = '\u0000\u0000';
                    if (rpcRunnerResult && rpcRunnerResult.result) {
                        if (_.isArray(rpcRunnerResult.result)) {
                            for (var i = 0; i < rpcRunnerResult.result.length; i++) {
                                response += rpcRunnerResult.result[i] +'\r\n';
                            }
                        } else {
                            response += rpcRunnerResult.result;
                        }
                    }
                    response += '\u0004'
                    console.log("response from localRPCRunner: " + JSON.stringify(response));
                }
            }

            // log to capture file the RPC and the response to a file
            if (rpcObject) {
                // add more info to captured object
                rpcObject.rpc = rpcPacket;
                rpcObject.response = response;
                rpcObject.from = fromName;
                rpcObject.to = CONFIG.vistaRpcBroker.configuration.host;
                rpcObject.timeStamp = new Date().toISOString();
            }
            captureFile.write(JSON.stringify(rpcObject, null, 2) + ",\n");


            // write the response back to the client
            conn.write(response);

        }

    }

    function onConnectedClose() {
        LOGGER.info('Connection from %s closed', remoteAddress);
        conn.removeAllListeners();
        conn.end();
        conn.destroy();
        db.close();
    }

    function onConnectedError(err) {
        LOGGER.error('Connection %s error: %s', remoteAddress, err.message);
        conn.removeAllListeners();
        conn.end();
        conn.destroy();
        db.close();
    }

    var buffer = '';
    var dataBuffer = new Buffer(0);

    // Handle the response from the RPC Broker
    function onBrokerConnectionData(data, rpc, rpcObject) {
        LOGGER.debug('sniffer.onBrokerConnection():%s', data);
        var result;
        var error;

        var tempDataBuffer = Buffer.concat([dataBuffer, data]);
        dataBuffer = tempDataBuffer;

        buffer = dataBuffer.toString('binary');


        if (buffer.indexOf(EOT) !== -1) {

            if (buffer[0] !== NUL) {
                LOGGER.trace(data);
                error = new Error('VistA SECURITY error: ' + VistaJSLibrary.extractSecurityErrorMessage(buffer));
            } else if (buffer[1] !== NUL) {
                LOGGER.trace(data);
                error = new Error('VistA APPLICATION error: ' + buffer);
            }

            var buffer2 = buffer.substring(2);

            if (buffer2.indexOf('M  ERROR') !== -1) {
                LOGGER.trace(buffer2);
                error = new Error(buffer2);
            }

            result = buffer.substring(0, buffer.indexOf(EOT) + 1);
            brokerSocket.removeAllListeners('data');

            // send the data back to the client
            LOGGER.info("Read from BrokerConnection result: %s, length: %s", result, result.length);
            //conn.write(result);

            // if it's in the authRpcs don't return it
            if (!authRpcs.has(rpcObject.name)) {
                conn.write(dataBuffer);
            } else {
                if (rpcObject) {
                    rpcObject.hardcodedResponse = authRpcs.get(rpcObject.name);
                }
            }

            dataBuffer = new Buffer(0);
            // log the RPC and the response to a file
            if (rpcObject) {
                rpcObject.rpc = rpc;
                rpcObject.response = result;
                rpcObject.from = fromName;
                rpcObject.to = CONFIG.vistaRpcBroker.configuration.host;
                rpcObject.timeStamp = new Date().toISOString();
            }
            captureFile.write(JSON.stringify(rpcObject, null, 2) + ",\n");

            if (error) {
                LOGGER.trace("RpcClient error: " + error);
            } else {
                LOGGER.trace('RpcClient result: ' + util.inspect(result, {
                        depth: null
                    }));
            }
        }
    }


    // polling function from https://davidwalsh.name/javascript-polling
    function poll(fn, callback, errback, timeout, interval) {
        var endTime = Number(new Date()) + (timeout || DEFAULT_TIMEOUT);
        interval = interval || DEFAULT_INTERVAL;

        (function p() {
            // If the condition is met, we're done!
            if(fn()) {
                callback();
            }
            // If the condition isn't met but the timeout hasn't elapsed, go again
            else if (Number(new Date()) < endTime) {
                setTimeout(p, interval);
            }
            // Didn't match and too much time, reject!
            else {
                errback(new Error('timed out for ' + fn + ': ' + arguments));
            }
        })();
    }
}


