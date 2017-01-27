'use strict';

var net = require('net');
var CONFIG = require('../cfg/testconfig.js');
var rpcFormatter = require('nodevista-rpcparser/rpcFormatter.js');
var Clients = new require('../TestClientFramework').Clients(1, 9210, '10.2.100.102');


var NEW_LINE = '\r\n';


// change for local VistA
var robertSSN = CONFIG.robertSSN;
var robertName = CONFIG.robertName;
var robertIEN = CONFIG.robertIEN;
var robertAccess = 'pu1234';
var robertVerify = 'pu1234!!';
var bseToken = '-35^(fE7]_=(ioZ7ZjnZZq^#aJ:J\"8?!;xp?y!8{m^mZZ^8y?Z2';



function test1() {
    console.log("test 1");
    Clients.sendRpc(0, rpcFormatter.buildRpcGreetingString(Clients.getClient(0).localAddress, 'testClient'))
        .then(function (response) {
            if (response === rpcFormatter.encapsulate('accept')) {
                console.log('TCPConnect OK, trying XUS SIGNON SETUP');

                // build next rpc
                var rpcName = "XUS SIGNON SETUP";
                var rpcArgs = [rpcFormatter.buildLiteralParamString(bseToken)];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);


                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('TCPConnect', response);
        })
        .then(function (response) {
            // var signonSetupResponseArray = response.split(NEW_LINE);

            // if (signonSetupResponseArray.length > 8 && signonSetupResponseArray[5] == 0) {

                console.log('XUS SIGNON SETUP: %j, trying XWB CREATE CONTEXT JLV WEB SERVICES', response);

                // build next rpc
                var rpcName = "XWB CREATE CONTEXT";
                // console.log("arg: %j", rpcFormatter.buildEncryptedParamString("JLV WEB SERVICES"));
                var rpcArgs = [rpcFormatter.buildEncryptedParamString("OR CPRS GUI CHART")];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(0, rpc);
            // } else Clients.throwError('XUS SIGNON SETUP', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {

                console.log('XWB CREATE CONTEXT: %j, trying VPR GET PATIENT DATA', response);

                // build next rpc
                var rpcName = "VPR GET PATIENT DATA";
                var rpcArgs = [rpcFormatter.buildLiteralParamString("100716"), rpcFormatter.buildLiteralParamString("demographics")];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);
                console.log("sending RPC: %j", rpc);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('XWB CREATE CONTEXT', response);
        })
        .then(function (response) {
            var responseArray = rpcFormatter.stripMarkers(response).split('^');
            if (responseArray.length > 0) {
                console.log('ORWU USERINFO: %j, trying #BYE#', response);


                return Clients.sendRpc(0, rpcFormatter.buildRpcSignOffString());
            } else Clients.throwError('XUS GET TOKEN', response);
        })
        .then(function (response) {
            if (response === rpcFormatter.encapsulate('#BYE#')) {
                console.log('#BYE#');
                success('test 1');
                //reconnectClientForNewTest(client, test2);
                Clients.closeAllClients();
            } else Clients.throwError('#BYE#', response);
        })

        .catch(function (error) {
            console.log(error);
            Clients.closeAllClients();
        });

}

function success(testName) {
    console.log('\n\n' + testName + ' SUCESS!!!\n\n');
}


Clients.setClientTest(0, test1);
Clients.startClient(0);

