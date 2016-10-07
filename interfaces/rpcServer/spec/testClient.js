'use strict';

var net = require('net');
var CONFIG = require('../cfg/config.js');
var rpcFormatter = require('../../rpcParser/rpcFormatter.js');

var Promise = require('promise');

var NUL = '\u0000';
var SOH = '\u0001';
var EOT = '\u0004';
var ENQ = '\u0005';
var NEW_LINE = '\r\n';

var client = new net.Socket();
var clientActive = false;
client.on('error', function(error) {
    console.log(error);
    client.end();
});
client.on('connect', test1);
client.connect(CONFIG.rpcServer.port, CONFIG.rpcServer.host);

function reconnectClientForNewTest(client, testFunction) {
    // end the current client
    client.end();

    // setup new client for reconnect
    client.on('close', function (){
        var client = new net.Socket();
        client.on('connect', testFunction);
        client.connect(CONFIG.rpcServer.port, CONFIG.rpcServer.host);
    });


}

function closeClient(client) {
    client.end();
}

// change for local VistA
var robertSSN = '000000029';
var robertName = "ALEXANDER,ROBERT";
var robertIEN = '58';


function test1() {
    sendRpc(client, rpcFormatter.buildRpcGreetingString(client.localAddress, 'testClient'))
    .then(function (response) {
        if (response === rpcFormatter.encapsulate('accept')) {
            console.log('TCPConnect OK, trying XUS SIGNON SETUP');

            // build next rpc
            var rpcName = "XUS SIGNON SETUP";
            var rpcArgs = [rpcFormatter.buildLiteralParamString("-31^DVBA_^" + robertSSN + "^" + robertName + "^OSEHRA^111^11111^No phone")];
            var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

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
            var rpcArgs = [rpcFormatter.buildEncryptedParamString("DVBA CAPRI GUI")];
            var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

            // send the rpc and wait on the promise of the response
            return sendRpc(client, rpc);
        } else throwError('XUS SIGNON SETUP', response);
    })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                console.log('XWB CREATE CONTEXT OK, trying XWB GET VARIABLE VALUE');

                // build next rpc
                var rpcName = "XWB GET VARIABLE VALUE";
                var rpcArgs = [rpcFormatter.buildReferenceParamString("$O(^VA(200,\"SSN\",\"" + robertSSN + "\",0))")];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return sendRpc(client, rpc);
            } else throwError('XWB CREATE CONTEXT', response);
        })
        .then(function (response) {

            if (rpcFormatter.stripMarkers(response) === robertIEN) {
                console.log('XWB GET VARIABLE VALUE OK, trying XWB CREATE CONTEXT OR CPRS GUI CHART');

                // build next rpc
                var rpcName = "XWB CREATE CONTEXT";
                var rpcArgs = [rpcFormatter.buildEncryptedParamString("OR CPRS GUI CHART")];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return sendRpc(client, rpc);
            } else throwError('XWB GET VARIABLE VALUE', response);
        })
    .then(function (response) {

        if (response === rpcFormatter.encapsulate('1')) {
            console.log('XWB CREATE CONTEXT OK, trying DG SENSITIVE RECORD ACCESS');

            // build next rpc
            var rpcName = "DG SENSITIVE RECORD ACCESS";
            var rpcArgs = [rpcFormatter.buildLiteralParamString(robertIEN)];
            var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

            // send the rpc and wait on the promise of the response
            return sendRpc(client, rpc);
        } else throwError('XWB CREATE CONTEXT', response);
    })
    .then(function (response) {

        if (response === rpcFormatter.encapsulate('0\r\n')) {
            console.log('DG SENSITIVE RECORD ACCESS OK, trying ORWPT LIST ALL');

            // build next rpc
            var rpcName = "ORWPT LIST ALL";
            var rpcArgs = [
                rpcFormatter.buildLiteralParamString("CARTER,DAVIC~"),
                rpcFormatter.buildLiteralParamString("1")
            ];
            var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

            // send the rpc and wait on the promise of the response
            return sendRpc(client, rpc);
        } else throwError('DG SENSITIVE RECORD ACCESS', response);
    })
    .then(function (response) {
        var orwptListAllArray = response.split(NEW_LINE);

        if (orwptListAllArray.length > 0 && orwptListAllArray[0].match(/\^CARTER,DAVID/)) {
            console.log('ORWPT LIST ALL OK, trying #BYE#');

            return sendRpc(client, rpcFormatter.buildRpcSignOffString());
        } else throwError('ORWPT LIST ALL', response);
    })
    .then(function (response) {
        if (response === rpcFormatter.encapsulate('#BYE#')) {
            console.log('#BYE#');
            //reconnectClientForNewTest(client, test2);
            client.close();
        } else throwError('#BYE#', response);
    })
    .catch(function (error) {
        console.log(error);
        closeClient(client);
    });

}

function test2() {
    var rpcName = "XUS GET USER INFO";
    var rpc = rpcFormatter.buildRpcString(rpcName);

    sendRpc(client, rpc)
        .then(function (response) {
            var responseArray = rpcFormatter.stripMarkers(response).split(NEW_LINE);

            if (responseArray.length > 0 && responseArray[0] === robertIEN) {
                console.log('XUS GET USER INFO OK, trying ORWPT LIST ALL');

                var rpcName = "ORWPT LIST ALL";
                var rpcArgs = [
                    rpcFormatter.buildLiteralParamString("CARTER,DAVIC~"),
                    rpcFormatter.buildLiteralParamString("1")
                ];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return sendRpc(client, rpc);
            } else throwError('XUS GET USER INFO', response);
        })
        .then(function (response) {
            var orwptListAllArray = response.split(NEW_LINE);

            if (orwptListAllArray.length > 0 && orwptListAllArray[0].match(/\^CARTER,DAVID/)) {
                console.log('ORWPT LIST ALL OK, ending test\n\n');

                closeClient(client);
            } else throwError('ORWPT LIST ALL', response);
        })
        .catch(function (error) {
            console.log(error);
            closeClient(client);
        });

}


function throwError(rpcName, response) {
    throw new Error(rpcName + " Error: " + response);
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
