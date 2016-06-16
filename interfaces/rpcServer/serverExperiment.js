var net = require('net');
var parser = require('./rpcParser');

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
        console.log('connection data from %s: %j', remoteAddress, d);

        var rpcObject = parser.parseRawRPC(data);

        conn.write("The RPC name is " + rpcObject.name);
        if (rpcObject.parameters) {
            var parameterString = parser.rpcParametersToString(rpcObject.parameters);
            conn.write(" and the parameters are: " + parameterString);
        }
    }

    function onConnectedClose() {
        console.log('connection from %s closed', remoteAddress);
    }

    function onConnectedError(err) {
        console.log('Connection %s error: %s', remoteAddress, err.message);
    }
}