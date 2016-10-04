'use strict';

var net = require('net');
var CONFIG = require('./../../rpcParser/cfg/config.js');
var VistaJSLibrary = require('../../VistaJS/VistaJSLibrary.js');

var Promise = require('promise');

var NUL = '\u0000';
var SOH = '\u0001';
var EOT = '\u0004';
var ENQ = '\u0005';

var client = new net.Socket();
client.on('error', function(error) {
    console.log('ffff\n\n\n');
    console.error(error);
});
client.on('connect', test1);
//client.on('close', reconnectClient(test2));
client.connect(CONFIG.rpcServer.port, CONFIG.rpcServer.host);

function reconnectClient(testFunction) {
    client.on('connect', testFunction);
    client.connect(CONFIG.rpcServer.port, CONFIG.rpcServer.host);
}


var robertSSN = '000000112';
var robertName = "ALEXANDER,ROBERT"


function test1() {
    sendRpc(client, VistaJSLibrary.buildRpcGreetingString(client.localAddress, 'testClient'))
    .then(function (response) {
        if (response === encapsulate('accept')) {
            console.log('yay');

            // build next rpc
            var rpcName = "XUS SIGNON SETUP";
            var rpcArgs = [VistaJSLibrary.buildLiteralParamString("-31^DVBA_^" + robertSSN + "^" + robertName + "^OSEHRA^111^11111^No phone")];
            var rpc = VistaJSLibrary.buildRpcString(rpcName, rpcArgs);

            // send the rpc and wait on the promise of the response
            return sendRpc(client, rpc);
        }
    })
    .then(function (response) {
        var signonSetupResponseArray = response.split("\r\n");

        if (signonSetupResponseArray.length > 8 && signonSetupResponseArray[5] == 1) {
            // build next rpc
            var rpcName = "XWB CREATE CONTEXT";
            var rpcArgs = [VistaJSLibrary.buildEncryptedParamString("DVBA CAPRI GUI")];
            var rpc = VistaJSLibrary.buildRpcString(rpcName, rpcArgs);

            // send the rpc and wait on the promise of the response
            return sendRpc(client, rpc);
        }
    })
    .then(function (response) {

        if (response === encapsulate('1')) {
            console.log('yip yip');
        }
        return sendRpc(client, VistaJSLibrary.buildRpcSignOffString());
    })
    .then(function (response) {
        if (response === encapsulate('#BYE#')) {
            console.log('yippee');

            client.end();
        }
    });

}


function encapsulate(str) {
    return "\u0000\u0000" + str + "\u0004";
}


function sendRpc(client, rpc) {
    chunk = '';

    return new Promise(function (fulfill, reject) {

        client.on('data', function(data) {
            fulfill(receiveData(data));
        });

        client.on('error', function(error) {
            reject(error);
        });

        var rpcBuffer = new Buffer(rpc, 'binary');
        client.write(rpcBuffer);
    });
}

var chunk;
function receiveData(data) {
    chunk += data;
    // find the end of a RPC packet
    var eotIndex = chunk.indexOf(EOT);

    // loop for each packet in the data chunk
    while (eotIndex > -1) {
        var response = '';

        // get a packet from the chunk (without the EOT)
        var recievedPacket = chunk.substr(0, eotIndex + 1);
        // remove the RPC packet from the chunk
        chunk = chunk.substring(eotIndex + 1)
        // find the end of the next RPC packet
        eotIndex = chunk.indexOf(EOT);
    }

    return recievedPacket;

}

