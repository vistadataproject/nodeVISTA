/* Or use this example tcp client written in node.js.  (Originated with 
 example code from
 http://www.hacksparrow.com/tcp-socket-programming-in-node-js.html.) */

'use strict'

var net = require('net');

var client = new net.Socket();
client.connect(9000, '127.0.0.1', function() {
    console.log('Connected');
    client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
    console.log('Received: ' + data);
    client.destroy(); // kill client after server's response
});

client.on('close', function() {
    console.log('Connection closed');
});