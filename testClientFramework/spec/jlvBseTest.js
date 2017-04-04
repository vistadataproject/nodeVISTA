'use strict';

var net = require('net');
var CONFIG = require('../cfg/testconfig.js');
var rpcFormatter = require('nodevista-rpcparser/rpcFormatter.js');
var Clients = new require('../TestClientFramework').Clients(2, 9210, '10.2.100.101');


var NEW_LINE = '\r\n';


// change for local VistA
var robertSSN = CONFIG.robertSSN;
var robertName = CONFIG.robertName;
var robertIEN = CONFIG.robertIEN;
var robertAccess = 'pu1234';
var robertVerify = 'pu1234!!';
var bseToken = '';


function test1() {
    console.log("test 1");
    Clients.sendRpc(0, rpcFormatter.buildRpcGreetingString(Clients.getClient(0).localAddress, 'testClient'))
        .then(function (response) {
            if (response === rpcFormatter.encapsulate('accept')) {
                console.log('TCPConnect OK, trying XUS SIGNON SETUP');

                // build next rpc
                var rpcName = "XUS SIGNON SETUP";
                var rpc = rpcFormatter.buildRpcString(rpcName);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('TCPConnect', response);
        })
        .then(function (response) {
            var signonSetupResponseArray = response.split(NEW_LINE);

            if (signonSetupResponseArray.length > 8 && signonSetupResponseArray[5] == 0) {
                console.log('XUS SIGNON SETUP: %j, trying XUS AV CODE', response);

                // build next rpc
                var rpcName = "XUS AV CODE";
                var rpcArgs = [rpcFormatter.buildEncryptedParamString(robertAccess + ";" + robertVerify)];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('XUS INTRO MSG', response);
        })
        .then(function (response) {
            var responseArray = rpcFormatter.stripMarkers(response).split(NEW_LINE);

            if (response.match(/Good/)) {
                console.log('XUS AV CODE OK: %j, trying XWB CREATE CONTEXT JLV WEB SERVICES', response);

                // build next rpc
                var rpcName = "XWB CREATE CONTEXT";
                console.log("arg: %j", rpcFormatter.buildEncryptedParamString("OR CPRS GUI CHART"));
                var rpcArgs = [rpcFormatter.buildEncryptedParamString("")];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                console.log(rpc);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('XUS AV CODE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                console.log('XWB CREATE CONTEXT OK, trying ORWU1 NEWLOC');

                // build next rpc
                var rpcName = "ORWU1 NEWLOC";
                var rpc = rpcFormatter.buildRpcString(rpcName);
                console.log(rpc);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('XWB CREATE CONTEXT', response);
        })
        .then(function (response) {
            var responseArray = rpcFormatter.stripMarkers(response).split('^');
            if (responseArray.length > 0 && responseArray[0] === '-35') {
                console.log('XUS BSE TOKEN: %j, trying XUS GET TOKEN', response);

                bseToken = rpcFormatter.stripMarkers(response);

                // build next rpc
                var rpcName = "XUS GET TOKEN";
                var rpc = rpcFormatter.buildRpcString(rpcName);

                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('ORWU1 NEWLOC', response);
        })
        .then(function (response) {
            var strippedResponse = rpcFormatter.stripMarkers(response);
            if (strippedResponse.length > 0 && strippedResponse.indexOf('~1') === 0) {
                console.log('XUS GET TOKEN: %j, trying #BYE#', strippedResponse);


                return Clients.sendRpc(0, rpcFormatter.buildRpcSignOffString());
            } else Clients.throwError('XUS GET TOKEN', response);
        })
        .then(function (response) {
            if (response === rpcFormatter.encapsulate('#BYE#')) {
                console.log('#BYE#');
                success('test 1');
                //reconnectClientForNewTest(client, test2);
                //Clients.closeAllClients();
            } else Clients.throwError('#BYE#', response);
        })
        .then(function () {
            setTimeout(function () {
                Clients.startClient(1);

            }, 2000);

        })
        .catch(function (error) {
            console.log(error);
            Clients.closeAllClients();
        });

}

function test2() {
    console.log("test 2");
    Clients.sendRpc(1, rpcFormatter.buildRpcGreetingString(Clients.getClient(1).localAddress, 'testClient'))
        .then(function (response) {
            if (response === rpcFormatter.encapsulate('accept')) {
                console.log('TCPConnect OK, trying XUS SIGNON SETUP');

                // build next rpc
                var rpcName = "XUS SIGNON SETUP";
                var rpcArgs = [rpcFormatter.buildLiteralParamString(bseToken)];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);


                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(1, rpc);
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
                return Clients.sendRpc(1, rpc);
            // } else Clients.throwError('XUS SIGNON SETUP', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {

                console.log('XWB CREATE CONTEXT: %j, trying ORWU USERINFO', response);

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
                console.log('ORWU USERINFO: %j, trying #BYE#', response);


                return Clients.sendRpc(1, rpcFormatter.buildRpcSignOffString());
            } else Clients.throwError('XUS GET TOKEN', response);
        })
        .then(function (response) {
            if (response === rpcFormatter.encapsulate('#BYE#')) {
                console.log('#BYE#');
                success('test 2');
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
Clients.setClientTest(1, test2);

Clients.startClient(0);

