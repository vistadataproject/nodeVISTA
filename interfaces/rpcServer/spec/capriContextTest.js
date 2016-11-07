'use strict';

var net = require('net');
var CONFIG = require('../cfg/testconfig.js');
var rpcFormatter = require('nodevista-rpcparser/rpcFormatter.js');
var Clients = new require('../TestClientFramework').Clients(2, CONFIG.rpcServer.port, CONFIG.rpcServer.host);

var NEW_LINE = '\r\n';


// change for local VistA
var robertSSN = CONFIG.robertSSN;
var robertName = CONFIG.robertName;
var robertIEN = CONFIG.robertIEN;
var robertAccess = CONFIG.robertAccess;
var robertVerify = CONFIG.robertVerify;

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

            if (signonSetupResponseArray.length > 7 && signonSetupResponseArray[5] == 1) {
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
                success('test1')
                //reconnectClientForNewTest(client, test2);
                Clients.closeAllClients();
            } else Clients.throwError('#BYE#', response);
        })
        .catch(function (error) {
            console.log(error);
            Clients.closeAllClients();
        });

}


function test2() {
    Clients.sendRpc(1, rpcFormatter.buildRpcGreetingString(Clients.getClient(0).localAddress, 'testClient'))
        .then(function (response) {
            if (response === rpcFormatter.encapsulate('accept')) {
                console.log('TCPConnect OK, trying XUS SIGNON SETUP');

                // build next rpc
                var rpcName = "XUS SIGNON SETUP";
                var rpc = rpcFormatter.buildRpcString(rpcName);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(1, rpc);
            } else Clients.throwError('TCPConnect', response);
        })
        .then(function (response) {
            var signonSetupResponseArray = response.split(NEW_LINE);

            if (signonSetupResponseArray.length > 8 && signonSetupResponseArray[5] == 0) {
                console.log('XUS SIGNON SETUP OK, trying XUS INTRO MSG');

                // build next rpc
                var rpcName = "XUS INTRO MSG";
                var rpc = rpcFormatter.buildRpcString(rpcName);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(1, rpc);
            } else Clients.throwError('XUS SIGNON SETUP', response);
        })
        .then(function (response) {

            if (response.match(/NEW/)) {
                console.log('XUS INTRO MSG OK, trying XUS AV CODE');

                // build next rpc
                var rpcName = "XUS AV CODE";
                var rpcArgs = [rpcFormatter.buildEncryptedParamString(robertAccess + ";" + robertVerify)];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(1, rpc);
            } else Clients.throwError('XUS INTRO MSG', response);
        })
        .then(function (response) {

            if (response.match(/Good/)) {
                console.log('XUS AV CODE OK, trying XUS GET USER INFO');

                // build next rpc
                var rpcName = "XUS GET USER INFO";
                var rpc = rpcFormatter.buildRpcString(rpcName);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(1, rpc);
            } else Clients.throwError('XUS AV CODE', response);
        })
        .then(function (response) {
            var  responseArray = rpcFormatter.stripMarkers(response).split(NEW_LINE);
            if (responseArray.length > 0) {
                console.log('XUS GET USER INFO OK, trying XWB GET BROKER INFO');
                console.log('  robertIEN: ' + responseArray[0] + ', robertName: ' + responseArray[1]);

                // build next rpc
                var rpcName = "XWB GET BROKER INFO";
                var rpc = rpcFormatter.buildRpcString(rpcName);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(1, rpc);
            } else Clients.throwError('XUS GET USER INFO', response);
        })
        .then(function (response) {

            if (rpcFormatter.stripMarkers(response).match(/^\d+/)) {
                console.log('XWB GET BROKER INFO OK, trying XUS DIVISION GET');

                // build next rpc
                var rpcName = "XUS DIVISION GET";
                var rpc = rpcFormatter.buildRpcString(rpcName);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(1, rpc);
            } else Clients.throwError('XWB GET BROKER INFO', response);
        })
        .then(function (response) {
            var responseArray = rpcFormatter.stripMarkers(response).split(NEW_LINE);

            if (responseArray.length > 0 && responseArray[0] == 0) {
                console.log('XUS DIVISION GET OK, trying XWB CREATE CONTEXT OR CPRS GUI CHART');

                // build next rpc
                var rpcName = "XWB CREATE CONTEXT";
                var rpcArgs = [rpcFormatter.buildEncryptedParamString("OR CPRS GUI CHART")];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(1, rpc);
            } else Clients.throwError('XUS DIVISION GET', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                console.log('XWB CREATE CONTEXT OK, trying ORWU USERINFO');

                // build next rpc
                var rpcName = "ORWU USERINFO";
                var rpc = rpcFormatter.buildRpcString(rpcName);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(1, rpc);
            } else Clients.throwError('XWB CREATE CONTEXT', response);
        })
        .then(function (response) {
            var responseArray = rpcFormatter.stripMarkers(response).split('^');
            if (responseArray.length > 0) {
                console.log('ORWU USERINFO OK, trying XWB GET VARIABLE VALUE for ensuring CAPRI is on');
                console.log('  robertIEN: ' + responseArray[0]);

                // build next rpc
                var rpcName = "XWB GET VARIABLE VALUE";
                var rpcArgs = [rpcFormatter.buildReferenceParamString("\"\"_$$GET^XPAR(\"SYS\",\"XU522\",1,\"Q\")")];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(1, rpc);
            } else Clients.throwError('ORWU USERINFO', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('N')) {
                console.log('XWB GET VARIABLE VALUE OK, trying XWB GET VARIABLE VALUE for user SSN');

                // build next rpc
                var rpcName = "XWB GET VARIABLE VALUE";
                var rpcArgs = [rpcFormatter.buildReferenceParamString("@\"^VA(200," + robertIEN + ",1)\"")];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(1, rpc);
            } else Clients.throwError('XWB GET VARIABLE VALUE', response);
        })
        .then(function (response) {
            var responseArray = rpcFormatter.stripMarkers(response).split('^');

            if (responseArray.length > 8) {
                console.log('XWB GET VARIABLE VALUE OK, trying #BYE#');
                console.log('  robertSSN: ' + responseArray[8]);

                return Clients.sendRpc(1, rpcFormatter.buildRpcSignOffString());
            } else Clients.throwError('XWB GET VARIABLE VALUE', response);
        })
        .then(function (response) {
            if (response === rpcFormatter.encapsulate('#BYE#')) {
                console.log('#BYE#');
                success('test2');
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
//Clients.setClientTest(1, test2);
Clients.startAllClients();


