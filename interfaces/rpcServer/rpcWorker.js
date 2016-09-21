#!/usr/bin/env node
'use strict';

var lockerModelUtils = re
var lockedRPCs = require('./lockedRPCs.js');

function callRpcL(messageObject) {

    var domainrpcL = lockedRPCs.get(rpcObject.name);
    domainrpcL.setup(db, DUZ, facilityCode);
    messageObject.rpcObject.to = "rpcL";
    var rpcResult = domainrpcL.rpcL.run(messageObject.rpcObject.name, rpcObject);
    LOGGER.info("RpcL: %s, result: %j", rpcObject.name, rpcResult);


    return rpcResult;
}


function callRpcRunner(messageObject) {


}

module.exports = function() {
    this.on('message', function(messageObj, send, finished) {
        var application = messageObj.application;
        var res;
        if (application === 'rpcL') {
            res = callRpcL(messageObj);
        } else if (application === 'rpcRunner') {
            res = callRpcRunner(messageObj);
        }
        finished(res);
    });


}