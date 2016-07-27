var net = require('net');
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


    function onConnectedData(data) {
        chunk += data;
        // find the end of a RPC packet
        var eotIndex = chunk.indexOf(EOT);

        var commandList = VistaJSLibrary.buildConnectionCommandList(LOGGER, configuration);

        // loop for each packet in the data chunk
        while (eotIndex > -1) {
            // get a packet from the chunk (without the EOT)
            var rpcPacket = chunk.substr(0, eotIndex);

            // process the packet
            LOGGER.info('connection data from %s: %s', remoteAddress, data);
            var rpcObject = parser.parseRawRPC(rpcPacket);
            LOGGER.info("RPC name: %s", rpcObject.rpcName);
            if (rpcObject.parameters) {
                LOGGER.info("RPC parameters: %j", rpcObject.parameters);
            }

            // if it is the connect pass to broker
            //if (rpcObject.rpcName === "TCPConnect") {
            //    //passToBroker(rpcPacket)
            //    conn.write('accept' + EOT);
            //
            //}


            // check if RPC is supported to pass to MVDM

            // pass the unsupported RPC to the legacy broker
            var client = new VistaJSLibrary.RpcClient(LOGGER, configuration, commandList, function(error, result) {
                LOGGER.debug('callRpc("%s") via Vista-RPC', rpcPacket);

                if (error) {
                    return callback(error);
                }

                if (result.length && result.length > 4) {
                    var rpcResult = result[4];
                    //save(logger, key, rpcResult);
                    //return callback(null, rpcResult);

                    conn.write(rpcResult);
                }

                callback(new Error('results were incomplete or undefined'));
            });

            client.start();

            // remove the RPC packet from the chunk
            chunk = chunk.substring(eotIndex + 1)
            // find the end of the next RPC packet
            eotIndex = chunk.indexOf(EOT);
        }

    }

    function onConnectedClose() {
        LOGGER.info('connection from %s closed', remoteAddress);
    }

    function onConnectedError(err) {
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