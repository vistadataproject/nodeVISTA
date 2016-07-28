var net = require('net');
var async = require('async');
var fs = require('fs');
var parser = require('./rpcParser');
var LOGGER = require('./logger.js');
var CONFIG = require('./config.js');
var VistaJS = require('../VistaJS/VistaJS.js');
var VistaJSLibrary = require('../VistaJS/VistaJSLibrary.js');

var DEFAULT_TIMEOUT = CONFIG.brokerClient.connectPollTimeout;
var DEFAULT_INTERVAL = CONFIG.brokerClient.connectPollInterval;
var EOT = '\u0004';

var configuration = CONFIG.brokerClient.configuration;
var captureFile = fs.createWriteStream(CONFIG.FILE.defaultCaptureFile, CONFIG.FILE.options);

// Start up the server
server = net.createServer();
server.on('connection', handleConnection);
server.listen(9000, function() {
    console.log('server listening to %j', server.address());
});

// main function to handle the connection from the client
function handleConnection(conn) {
    var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
    console.log('new client connection from %s', remoteAddress);
    var chunk = '';

    conn.on('data', onConnectedData);
    conn.on('close', onConnectedClose);
    conn.on('error', onConnectedError);

    var brokerSocket;
    connectBrokerSocket();

    // first set up a connection to VistA's RPC Broker
    function connectBrokerSocket() {
        brokerSocket = new net.Socket();
        brokerSocket.isConnected = false;
        brokerSocket.on('error', onBrokerConnectionError);
        brokerSocket.on('close', onBrokerConnectionClose);
        brokerSocket.setEncoding('utf8');
        brokerSocket.connect(configuration.port, configuration.host, function() {
            brokerSocket.isConnected = true;
        });
    }

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
            LOGGER.info('connection data from %s: %s', remoteAddress, data);
            var rpcObject = parser.parseRawRPC(rpcPacket);
            LOGGER.info("RPC name: %s", rpcObject.rpcName);
            if (rpcObject.parameters) {
                LOGGER.info("RPC parameters: %j", rpcObject.parameters);
            }

            // Need to check that the connection to the RPC Broker is available before we can send the RPC to it
            poll(
                function() {
                    return (brokerSocket && brokerSocket.isConnected);
                },
                function() {
                    brokerSocket.on('data', function(data) {
                        onBrokerConnectionData(data, rpcPacket, rpcObject)
                    });
                    LOGGER.info("Writing from sniffer to broker message: %s, length %s", rpcPacket, rpcPacket.length);
                    brokerSocket.write(rpcPacket);
                },
                function() {

                }
            )

        }

    }

    function onConnectedClose() {
        onBrokerConnectionClose();
        LOGGER.info('connection from %s closed', remoteAddress);
        conn.removeAllListeners();
        conn.end();
        conn.destroy();
        onBrokerConnectionClose();
    }

    function onConnectedError(err) {
        onBrokerConnectionClose();
        LOGGER.error('Connection %s error: %s', remoteAddress, err.message);
        conn.removeAllListeners();
        conn.end();
        conn.destroy();
    }

    var buffer = '';

    // Handle the response from the RPC Broker
    function onBrokerConnectionData(data, rpc, rpcObject) {
        LOGGER.debug('RpcClient.receive()');
        var result;
        var error;

        buffer += data;

        if (buffer.indexOf(EOT) !== -1) {

            result = buffer.substring(0, buffer.indexOf(EOT) + 1);
            brokerSocket.removeAllListeners('data');
            buffer = '';

            // send the data back to the client
            LOGGER.info("Read from BrokerConnection result: %s, length: %s", result, result.length);
            conn.write(result);

            // log the RPC and the response to a file
            if (rpcObject) {
                rpcObject.rpc = rpc;
                rpcObject.response = result;
                rpcObject.from = CONFIG.client.defaultName;
                rpcObject.to = CONFIG.brokerClient.configuration.host;
                rpcObject.timeStamp = new Date().toString();
            }
            captureFile.write(JSON.stringify(rpcObject, null, 2) + "\n");

        }
    }

    function onBrokerConnectionClose() {
        LOGGER.info('BrokerConnection closed');
        brokerSocket.isConnected = false;
        brokerSocket.removeAllListeners();
        brokerSocket.end();
        brokerSocket.destroy();
    }

    function onBrokerConnectionError(err) {
        LOGGER.error('BrokerConnection error: %s', err.message);
        brokerSocket.isConnected = false;
        brokerSocket.removeAllListeners();
        brokerSocket.end();
        brokerSocket.destroy();
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


