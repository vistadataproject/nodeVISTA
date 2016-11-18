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
                console.log('TCPConnect OK, running XWB IM HERE');
                
                // send the rpc and wait on the promise of the response
                startTime = new Date().getTime();

                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('TCPConnect', response);
        })




        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })

        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })

        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })

        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })

        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })

        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })

        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })


        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })

        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })

        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
            } else Clients.throwError('XWB IM HERE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                return Clients.sendRpc(0, imHereRpc);
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

