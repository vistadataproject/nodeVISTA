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

server = net.createServer();

server.on('connection', handleConnection);

server.listen(9000, function() {
    console.log('server listening to %j', server.address());
});

function handleConnection(conn) {
    var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
    console.log('new client connection from %s', remoteAddress);
    var chunk = '';

    conn.on('data', onConnectedData);
    conn.on('close', onConnectedClose);
    conn.on('error', onConnectedError);

    var brokerSocket;
    connectBrokerSocket();


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
            if (!rp)
            LOGGER.info("RPC name: %s", rpcObject.rpcName);
            if (rpcObject.parameters) {
                LOGGER.info("RPC parameters: %j", rpcObject.parameters);
            }


            // check if RPC is supported to pass to MVDM

            // pass the unsupported RPC to the legacy broker
            //if (brokerSocket.isConnected) {
            //    brokerSocket.on('data', onBrokerConnectionData);
            //    LOGGER.info("Writing from sniffer to broker message: %s, length %s", rpcPacket, rpcPacket.length);
            //    brokerSocket.write(rpcPacket);
            //}

            poll(
                function() {
                    return (brokerSocket && brokerSocket.isConnected);
                },
                function() {
                    brokerSocket.on('data', function(data) {
                        onBrokerConnectionData(data, rpcObject)
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

    function onBrokerConnectionData(data, rpcObject) {
        LOGGER.debug('RpcClient.receive()');
        var result;
        var error;

        buffer += data;

        if (buffer.indexOf(EOT) !== -1) {
            //if (buffer[0] !== NUL) {
            //    LOGGER.trace(data);
            //    error = new Error('VistA SECURITY error: ' + extractSecurityErrorMessage(buffer));
            //} else if (buffer[1] !== NUL) {
            //    LOGGER.trace(data);
            //    error = new Error('VistA APPLICATION error: ' + buffer);
            //}

            //buffer = buffer.substring(2);

            //if (buffer.indexOf('M  ERROR') !== -1) {
            //    LOGGER.trace(buffer);
            //    error = new Error(buffer);
            //}

            result = buffer.substring(0, buffer.indexOf(EOT) + 1);
            brokerSocket.removeAllListeners('data');
            buffer = '';
            if (!error) {
                LOGGER.info("Read from BrokerConnection result: %s, length: %s", result, result.length);
                conn.write(result);
            }


            if (rpcObject) {
                rpcObject.response = result;
                rpcObject.from = CONFIG.client.defaultName;
                rpcObject.to = CONFIG.brokerClient.configuration.host;
                rpcObject.timeStamp = new Date().toString();
            }


            captureFile.write(JSON.stringify(rpcObject, null, 2));

            //LOGGER.trace(error);
            //LOGGER.trace('RpcClient result: ' + util.inspect(result, {
            //        depth: null
            //    }));

            //this.callback(error, result);
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

