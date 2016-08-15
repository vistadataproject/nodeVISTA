var net = require('net');
var parser = require('./../rpcParser/rpcParser.js');
var LOGGER = require('./logger.js');
var CONFIG = require('./config.js');

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
        LOGGER.info('connection data from %s: %j', remoteAddress, data);


        conn.write('Echo: ' + data);
        //conn.pipe(conn);

        //var rpcObject = parser.parseRawRPC(data);
        //
        //conn.write("The RPC name is " + rpcObject.name);
        //if (rpcObject.parameters) {
        //    var parameterString = parser.rpcParametersToString(rpcObject.parameters);
        //    conn.write(" and the parameters are: " + parameterString);
        //}
    }

    function onConnectedClose() {
        LOGGER.info('connection from %s closed', remoteAddress);
    }

    function onConnectedError(err) {
        LOGGER.info('Connection %s error: %s', remoteAddress, err.message);
    }
}




//var rpcClient = new net.Socket();
//client.connect()