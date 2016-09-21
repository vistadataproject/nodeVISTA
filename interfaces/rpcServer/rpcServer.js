#!/usr/bin/env node
'use strict';

var net = require('net');
var fs = require('fs');
var util = require('util');
var _ = require('underscore');
var parser = require('./../rpcParser/rpcParser.js');
var LOGGER = require('./logger.js');
var CONFIG = require('./cfg/config.js');

var mvdmClient = require('./mvdmClient');

// import for multiprocess management
var qoper8 = require('ewd-qoper8');
var processQueue = new qoper8.masterProcess();

var server;

var NUL = '\u0000';
var SOH = '\u0001';
var EOT = '\u0004';
var ENQ = '\u0005';

var fromName = CONFIG.client.defaultName;
var capturePath = CONFIG.FILE.defaultCaptureFile;
var port = CONFIG.rpcServer.port;

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

processQueue.on('started', function() {
    this.worker.module = __dirname + '/rpcQWorker';
});

processQueue.on('start', function() {
    this.setWorkerPoolSize(CONFIG.workerQ.size);

});


processQueue.start();

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

            //response = callRPC(rpcObject, rpcPacket);
            //
            //// write the response back to the client
            //LOGGER.info("SENDING RESPONSE to client: " + response);
            //var responseBuffer = new Buffer(response, 'binary');
            //
            //conn.write(responseBuffer);

            var messageObject = {};
            messageObject.rpcObject = rpcObject;
            messageObject.rpcPacket = rpcPacket;
            processQueue.handleMessage(messageObject, function(response) {
                // write the response back to the client
                LOGGER.info("SENDING RESPONSE to client: " + response);
                var responseBuffer = new Buffer(response, 'binary');

                conn.write(responseBuffer);
            });

        }
    }


    function onConnectedClose() {
        //rpcRunner.reinit();
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


}



