var net = require('net');
var parser = require('./rpcParser');
var LOGGER = require('./logger.js');
var CONFIG = require('./config.js');
var VistaJS = require('../VistaJS/VistaJS.js');


var context = 'OR CPRS GUI CHART';

var configuration = {
    context: context,
    host: '10.2.100.101',
    port: 9240,
    accessCode: 'pu1234',
    verifyCode: 'pu1234!!',
    localIP: '127.0.0.1',
    localAddress: 'localhost'
};


var server = net.createServer();
server.on('connection', handleConnection);

server.listen(9000, function() {
    console.log('server listening to %j', server.address());
});

function handleConnection(conn) {
    var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
    console.log('new client connection from %s', remoteAddress);

    conn.on('data', onConnectedData);
    conn.once('close', onConnectedClose);
    conn.on('error', onConnectedError);

    function onConnectedData(data) {
        LOGGER.info('connection data from %s: %s', remoteAddress, data);

        var rpcObject = parser.parseRawRPC(data);

        LOGGER.info("RPC name: %s", rpcObject.name);
        LOGGER.info("RPC parameters: %j", rpcObject.parameters);

        // check if RPC is supported to pass to MVDM

        // pass the unsupported RPC to the legacy broker
        var rpcArgs = buildRPCArgs(rpcObject.parameters);
        VistaJS.callRpc()

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
}



//var rpcClient = new net.Socket();
//client.connect()