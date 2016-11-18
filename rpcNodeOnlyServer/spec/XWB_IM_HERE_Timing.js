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

var startTime, endTime;

// build XWB IM HERE RPC
var imHereRpcName = "XWB IM HERE";
var imHereRpc = rpcFormatter.buildRpcString(imHereRpcName);


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
                console.log('XWB CREATE CONTEXT OK, running XWB IM HERE');

                // send the rpc and wait on the promise of the response
                startTime = new Date().getTime();

                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB CREATE CONTEXT', response);
        })



        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })

        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })

        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })

        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })

        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })

        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })

        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })


        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })

        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })

        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })


        .then(function (response) {
            if (response === rpcFormatter.encapsulate('1')) {

                endTime = new Date().getTime();
                console.log("\n\nExecution time of XWB IM HERE: %j ms\n\n", endTime - startTime);

                console.log('XWB IM HERE OK: %j, trying #BYE#', response);

                return Clients.sendRpc(0, rpcFormatter.buildRpcSignOffString());
            } else Clients.throwError('XWB IM HERE', response);
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



function success(testName) {
    console.log('\n\n' + testName + ' SUCESS!!!\n\n');
}

Clients.setClientTest(0, test1);
Clients.startAllClients();

