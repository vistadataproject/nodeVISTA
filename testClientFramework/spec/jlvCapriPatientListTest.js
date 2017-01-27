'use strict';

var net = require('net');
var CONFIG = require('../cfg/testconfig.js');
var rpcFormatter = require('nodevista-rpcparser/rpcFormatter.js');
var Clients = new require('../TestClientFramework').Clients(1, 9210, '10.2.100.101');


var NEW_LINE = '\r\n';


// change for local VistA
var robertSSN = CONFIG.robertSSN;
var robertName = CONFIG.robertName;
var robertIEN = CONFIG.robertIEN;
var robertAccess = 'pu1234';
var robertVerify = 'pu1234!!';
var bseToken = '';

var CAPRI_CONTEXT = "DVBA CAPRI GUI";
var CPRS_CONTEXT = "OR CPRS GUI CHART";
var VPR_CONTEXT = "VPR APPLICATION PROXY";
var JLV_CONTEXT = "JLV WEB SERVICES";
var userDUZ = "";


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
            var context = CPRS_CONTEXT;

            if (response.match(/Good/)) {
                console.log('XUS AV CODE OK: %j, trying XWB CREATE CONTEXT: %j', response, context);

                // build next rpc
                var rpcName = "XWB CREATE CONTEXT";
                // console.log("arg: %j", rpcFormatter.buildEncryptedParamString(context));
                var rpcArgs = [rpcFormatter.buildEncryptedParamString(context)];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('XUS AV CODE', response);
        })
        .then(function (response) {
            if (response === rpcFormatter.encapsulate('1')) {
                var context = CAPRI_CONTEXT;
                console.log('XWB CREATE CONTEXT: %j, trying XWB CREATE CONTEXT: %j', response, context);

                // build next rpc
                var rpcName = "XWB CREATE CONTEXT";
                // console.log("arg: %j", rpcFormatter.buildEncryptedParamString(context));
                var rpcArgs = [rpcFormatter.buildEncryptedParamString(context)];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('XWB CREATE CONTEXT', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                console.log('XWB CREATE CONTEXT: %j, trying XUS GET USER INFO', response);

                // build next rpc
                var rpcName = "XUS GET USER INFO";
                var rpc = rpcFormatter.buildRpcString(rpcName);

                // send the rpc and wait on the promise of the response
                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('XWB CREATE CONTEXT', response);
        })
        .then(function (response) {
            var responseArray = rpcFormatter.stripMarkers(response).split('^');
            if (responseArray.length > 0) {
                console.log('XUS GET USER INFO: %j, trying DVBAB RESTRICTED LIST PATIENTS', response);

                userDUZ = responseArray[0];

                // build next rpc
                var rpcName = "DVBAB RESTRICTED LIST PATIENTS";
                var rpcArgs = [rpcFormatter.buildLiteralParamString(userDUZ)];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                return Clients.sendRpc(0, rpc);
            } else Clients.throwError('XUS GET USER INFO', response);
        })
        .then(function (response) {
            var responseArray = rpcFormatter.stripMarkers(response).split('^');
            if (responseArray.length > 0) {
                console.log('DVBAB RESTRICTED LIST PATIENTS: %j, trying #BYE#', responseArray);

                return Clients.sendRpc(0, rpcFormatter.buildRpcSignOffString());
            } else Clients.throwError('DVBAB RESTRICTED LIST PATIENTS', response);
        })
        .then(function (response) {
            if (response === rpcFormatter.encapsulate('#BYE#')) {
                console.log('#BYE#');
                success('test 1');
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

