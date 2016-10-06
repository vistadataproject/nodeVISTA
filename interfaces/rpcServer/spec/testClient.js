'use strict';

var net = require('net');
var CONFIG = require('../cfg/config.js');
var VistaJSLibrary = require('../../VistaJS/VistaJSLibrary.js');

var Promise = require('promise');

var NUL = '\u0000';
var SOH = '\u0001';
var EOT = '\u0004';
var ENQ = '\u0005';
var NEW_LINE = '\r\n';

var client = new net.Socket();
client.on('error', function(error) {
    console.log(error);
    client.end();
});
client.on('connect', test1);
client.connect(CONFIG.rpcServer.port, CONFIG.rpcServer.host);

function reconnectClientForNewTest(client, testFunction) {
    // setup for reconnect when
    client.on('close', function (){
        client.on('connect', testFunction);
        client.connect(CONFIG.rpcServer.port, CONFIG.rpcServer.host);
    });

    // end the current client
    client.end();
}

function closeClient(client) {
    client.end();
}

// change for local VistA
var robertSSN = '000000029';
var robertName = "ALEXANDER,ROBERT";
var robertIEN = '58';


function test1() {
    sendRpc(client, VistaJSLibrary.buildRpcGreetingString(client.localAddress, 'testClient'))
    .then(function (response) {
        if (response === encapsulate('accept')) {
            console.log('TCPConnect OK, trying XUS SIGNON SETUP');

            // build next rpc
            var rpcName = "XUS SIGNON SETUP";
            var rpcArgs = [VistaJSLibrary.buildLiteralParamString("-31^DVBA_^" + robertSSN + "^" + robertName + "^OSEHRA^111^11111^No phone")];
            var rpc = VistaJSLibrary.buildRpcString(rpcName, rpcArgs);

            // send the rpc and wait on the promise of the response
            return sendRpc(client, rpc);
        } else throwError('TCPConnect', response);
    })
    .then(function (response) {
        var signonSetupResponseArray = response.split(NEW_LINE);

        if (signonSetupResponseArray.length > 8 && signonSetupResponseArray[5] == 1) {
            console.log('XUS SIGNON SETUP OK, trying XWB CREATE CONTEXT DVBA CAPRI GUI');

            // build next rpc
            var rpcName = "XWB CREATE CONTEXT";
            var rpcArgs = [VistaJSLibrary.buildEncryptedParamString("DVBA CAPRI GUI")];
            var rpc = VistaJSLibrary.buildRpcString(rpcName, rpcArgs);

            // send the rpc and wait on the promise of the response
            return sendRpc(client, rpc);
        } else throwError('XUS SIGNON SETUP', response);
    })
        .then(function (response) {

            if (response === encapsulate('1')) {
                console.log('XWB CREATE CONTEXT OK, trying XWB GET VARIABLE VALUE');

                // build next rpc
                var rpcName = "XWB GET VARIABLE VALUE";
                var rpcArgs = [VistaJSLibrary.buildReferenceParamString("$O(^VA(200,\"SSN\",\"" + robertSSN + "\",0))")];
                var rpc = VistaJSLibrary.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return sendRpc(client, rpc);
            } else throwError('XWB CREATE CONTEXT', response);
        })
        .then(function (response) {

            if (stripMarkers(response) === robertIEN) {
                console.log('XWB GET VARIABLE VALUE OK, trying XWB CREATE CONTEXT OR CPRS GUI CHART');

                // build next rpc
                var rpcName = "XWB CREATE CONTEXT";
                var rpcArgs = [VistaJSLibrary.buildEncryptedParamString("OR CPRS GUI CHART")];
                var rpc = VistaJSLibrary.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return sendRpc(client, rpc);
            } else throwError('XWB GET VARIABLE VALUE', response);
        })
    .then(function (response) {

        if (response === encapsulate('1')) {
            console.log('XWB CREATE CONTEXT OK, trying DG SENSITIVE RECORD ACCESS');

            // build next rpc
            var rpcName = "DG SENSITIVE RECORD ACCESS";
            var rpcArgs = [VistaJSLibrary.buildLiteralParamString(robertIEN)];
            var rpc = VistaJSLibrary.buildRpcString(rpcName, rpcArgs);

            // send the rpc and wait on the promise of the response
            return sendRpc(client, rpc);
        } else throwError('XWB CREATE CONTEXT', response);
    })
    .then(function (response) {

        if (response === encapsulate('0\r\n')) {
            console.log('DG SENSITIVE RECORD ACCESS OK, trying ORWPT LIST ALL');

            // build next rpc
            var rpcName = "ORWPT LIST ALL";
            var rpcArgs = [
                VistaJSLibrary.buildLiteralParamString("CARTER,DAVIC~"),
                VistaJSLibrary.buildLiteralParamString("1")
            ];
            var rpc = VistaJSLibrary.buildRpcString(rpcName, rpcArgs);

            // send the rpc and wait on the promise of the response
            return sendRpc(client, rpc);
        } else throwError('DG SENSITIVE RECORD ACCESS', response);
    })
    .then(function (response) {
        var orwptListAllArray = response.split(NEW_LINE);

        if (orwptListAllArray.length > 0 && orwptListAllArray[0].match(/\^CARTER,DAVID/)) {
            console.log('ORWPT LIST ALL OK, trying #BYE#');

            return sendRpc(client, VistaJSLibrary.buildRpcSignOffString());
        } else throwError('ORWPT LIST ALL', response);
    })
    .then(function (response) {
        if (response === encapsulate('#BYE#')) {
            console.log('#BYE#');
        } else throwError('#BYE#', response);
        closeClient(client);
    })
    .catch(function (error) {
        console.log(error);
        closeClient(client);
    });

}

function throwError(rpcName, response) {
    throw new Error(rpcName + " Error: " + response);
}


function encapsulate(str) {
    return "\u0000\u0000" + str + "\u0004";
}

function stripMarkers(str) {
    if (str.indexOf(NUL + NUL) === 0 && str.indexOf(EOT) == str.length - 1) {
        return str.substring (2, str.length - 1);
    }
    return str;
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
