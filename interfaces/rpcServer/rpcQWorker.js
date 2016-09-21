#!/usr/bin/env node
'use strict';

var LOGGER = require('./logger.js');


function callRpcL(messageObject) {
    var rpcResult = messageObject.rpcL.run(messageObject.rpcObject.name, messageObject.rpcObject);
    LOGGER.debug("rpcQWorker rpcL.run: %s, result: %j", messageObject.rpcObject.name, rpcResult);

    return rpcResult;
}


function callRpcRunner(messageObject) {
    var rpcResult = messageObject.rpcRunner.run(messageObject.rpcObject.name, messageObject.rpcObject.args);
    LOGGER.debug("rpcQWorker rpcRunner.run: %s, result: %j", messageObject.rpcObject.name, rpcResult);


    //try {
    //    rpcResult = messageObject.runnerOrLocker.run(rpcObject.name, rpcObject.args);
    //    LOGGER.info("RESULT FROM rpcRunner for RPC: %s, transactionId: %s, result: %j", rpcObject.name, transactionId, rpcResult);
    //} catch (err) {
    //    LOGGER.error("Error thrown from rpcRunner.run() in rpcServer:  %s", err.message);
    //    rpcResult = {"result": err.message};
    //}
    //
    return rpcResult;
}

module.exports = function() {

    this.on('start', function() {
        LOGGER.debug('Started rpcQWorker module process.pid: %s', process.pid);
    });

    this.on('message', function(messageObj, send, finished) {
        var application = messageObj.application;
        var res;
        if (messageObj.rpcL !== undefined) {
            res = callRpcL(messageObj);
        } else if (messageObj.rpcRunner !== undefined) {
            res = callRpcRunner(messageObj);
        }
        finished(res);
    });

    this.on('stop', function() {
        LOGGER.debug('Stopping rpcWorker process pid: %s ...', process.pid);
    });
}