'use strict';

var net = require('net');
var CONFIG = require('../cfg/config.js');
var rpcFormatter = require('../../rpcParser/rpcFormatter.js');
var Clients = new require('../TestClientFramework').Clients(1, CONFIG.rpcServer.port, CONFIG.rpcServer.host);

var NEW_LINE = '\r\n';


// change for local VistA
var robertSSN = '000000029';
var robertName = "ALEXANDER,ROBERT";
var robertIEN = '58';


function test1() {
    Clients.sendRpc(0, rpcFormatter.buildRpcGreetingString(Clients.getClient(0).localAddress, 'testClient'))
        .then(function (response) {
            if (response === rpcFormatter.encapsulate('accept')) {
                console.log('TCPConnect OK, trying XUS SIGNON SETUP');

                // build next rpc
                var rpcName = "XUS SIGNON SETUP";
                var rpcArgs = [rpcFormatter.buildLiteralParamString("-31^DVBA_^" + robertSSN + "^" + robertName + "^OSEHRA^111^11111^No phone")];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('TCPConnect', response);
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
                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('XUS SIGNON SETUP', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                console.log('XWB CREATE CONTEXT OK, trying XWB GET VARIABLE VALUE');

                // build next rpc
                var rpcName = "XWB GET VARIABLE VALUE";
                var rpcArgs = [rpcFormatter.buildReferenceParamString("$O(^VA(200,\"SSN\",\"" + robertSSN + "\",0))")];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('XWB CREATE CONTEXT', response);
        })
        .then(function (response) {

            if (rpcFormatter.stripMarkers(response) === robertIEN) {
                console.log('XWB GET VARIABLE VALUE OK, trying XWB CREATE CONTEXT OR CPRS GUI CHART');

                // build next rpc
                var rpcName = "XWB CREATE CONTEXT";
                var rpcArgs = [rpcFormatter.buildEncryptedParamString("OR CPRS GUI CHART")];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('XWB GET VARIABLE VALUE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                console.log('XWB CREATE CONTEXT OK, trying DG SENSITIVE RECORD ACCESS');

                // build next rpc
                var rpcName = "DG SENSITIVE RECORD ACCESS";
                var rpcArgs = [rpcFormatter.buildLiteralParamString(robertIEN)];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('XWB CREATE CONTEXT', response);
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
                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('DG SENSITIVE RECORD ACCESS', response);
        })
        .then(function (response) {
            var orwptListAllArray = response.split(NEW_LINE);

            if (orwptListAllArray.length > 0 && orwptListAllArray[0].match(/\^CARTER,DAVID/)) {
                console.log('ORWPT LIST ALL OK, trying #BYE#');

                return Clients.sendRpc(0, rpcFormatter.buildRpcSignOffString());
            } else Clients.throwError('ORWPT LIST ALL', response);
        })
        .then(function (response) {
            if (response === rpcFormatter.encapsulate('#BYE#')) {
                console.log('#BYE#');
                //reconnectClientForNewTest(client, test2);
                Clients.closeClient(0);
            } else Clients.throwError('#BYE#', response);
        })
        .catch(function (error) {
            console.log(error);
            Clients.closeAllClients();
        });

}


Clients.setClientTest(0, test1);
Clients.start();


