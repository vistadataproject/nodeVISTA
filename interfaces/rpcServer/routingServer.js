var net = require('net');
var async = require('async');
var parser = require('./rpcParser');
var LOGGER = require('./logger.js');
var CONFIG = require('./config.js');
var VistaJS = require('../VistaJS/VistaJS.js');
var VistaJSLibrary = require('../VistaJS/VistaJSLibrary.js');

var EOT = '\u0004';

var context = 'OR CPRS GUI CHART';

var configuration = {
    context: context,
    host: '10.2.100.101',
    port: 9210,
    accessCode: 'pu1234',
    verifyCode: 'pu1234!!',
    localIP: '127.0.0.1',
    localAddress: 'localhost'
};


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

    var brokerSocket = new net.Socket();
    brokerSocket.on('error', onBrokerConnectionError);
    brokerSocket.on('close', onBrokerConnectionClose);
    brokerSocket.setEncoding('utf8');
    brokerSocket.connect(configuration.port, configuration.host);

    function onConnectedData(data) {
        chunk += data;
        // find the end of a RPC packet
        var eotIndex = chunk.indexOf(EOT);

        var commandList = VistaJSLibrary.buildConnectionCommandList(LOGGER, configuration);



        // loop for each packet in the data chunk
        while (eotIndex > -1) {
            // get a packet from the chunk (without the EOT)
            var rpcPacket = chunk.substr(0, eotIndex);
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

            // check if RPC is supported to pass to MVDM

            // pass the unsupported RPC to the legacy broker
            async.series([
                function(callback) {
                    brokerSocket.on('data', onBrokerConnectionData); // RpcTask receive
                    brokerSocket.write(rpcPacket);
                    callback();
                }
            ], function (err) {
                if (err) {
                    LOGGER.error("Error in writing to broker %s", err);
                }
            });


            //var rpcCommand = {
            //    rpc: rpcPacket,
            //    process: function(data) {
            //        return data;
            //    }
            //};
            //var rpcTask = new VistaJSLibrary.RpcTask(LOGGER, rpcCommand, brokerSocket);
            //var execList = [];
            //execList.push(rpcTask.execute.bind(rpcCommand));
            //async.series(execList, function(error, result) {
            //    if (!error) {
            //        conn.write(result);
            //    }
            //});

        }

    }

    function onConnectedClose() {
        LOGGER.info('connection from %s closed', remoteAddress);
        brokerSocket.close();
    }

    function onConnectedError(err) {
        LOGGER.error('Connection %s error: %s', remoteAddress, err.message);
        LOGGER.error('Connection %s error: %s', remoteAddress, err.message);
    }

    var buffer = '';

    function onBrokerConnectionData(data) {
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

            result = buffer.substring(0, buffer.indexOf(EOT));
            brokerSocket.removeAllListeners('data');
            buffer = '';
            if (!error) {
                conn.write(result);
            }

            //LOGGER.trace(error);
            //LOGGER.trace('RpcClient result: ' + util.inspect(result, {
            //        depth: null
            //    }));

            //this.callback(error, result);
        }

    }

    function onBrokerConnectionClose() {
        LOGGER.info('connection from %s closed', remoteAddress);
    }

    function onBrokerConnectionError(err) {
        LOGGER.error('Connection %s error: %s', remoteAddress, err.message);
        LOGGER.error('Connection %s error: %s', remoteAddress, err.message);
    }


    function buildRPCArgs(parameters) {
        var rpcArgs = [];
        for (var i = 0; i < parameters.length; i++) {
            if (parameters[i].type === '0') {
                rpcArgs.push(VistaJS.RpcParameter.literal(parameters[i].parameter));
            } else if (parameters[i].type === '1') {
                rpcArgs.push(VistaJS.RpcParameter.reference(parameters[i].parameter));
            } else if (parameters[i].type === '2') {
                rpcArgs.push(VistaJS.RpcParameter.list(parameters[i].parameter));
            }
        }

    }

    function passToBroker(rpcCommand) {

    }

}



//var rpcClient = new net.Socket();
//client.connect()