'use strict'

var parser = require('../rpcParser.js');
var rpcUtils = require('rpcUtils.js');
var VistaJS = require('../../VistaJS/VistaJS.js');
var VistaJSLibrary = require('../../VistaJS/VistaJSLibrary.js');
var util = require('util');
var _ = require('underscore');

var rpcNamesArray = [
    "RPC 1",
    "RPC 2",
    "RPC 3"
];

var rpcParametersArray = [
    "Parameter1",
    "Parameter2",
    "Parameter3"
];

/** VistaJS buildCommand
 *
 * need tp copy here since this is not exported from VistaJS
 *
 * buildCommand(logger, rpc, _.map(rpcParamList, function(param) {
 *       return param.value;
 *   })
 *
 *   where
 *   var rpcParamList = processParamList(params);
 *
 *
 * */
function buildCommand(logger, rpcName, parameterStringList) {
    //logger.debug('RpcClient.buildCommand()');
    //logger.debug('RpcClient param: %s', parameterStringList);

    var params = parameterStringList || [];
    if (!_.isArray(parameterStringList)) {
        params = [parameterStringList];
    }

    var rpc = VistaJSLibrary.buildRpcString(rpcName, params);

    //logger.debug('RpcClient rpc: %s', rpc);
    return {
        rpc: rpc,

        //process: function(data) {
        //    logger.trace('Response: ');
        //    logger.trace(data);
        //
        //    return data;
        //}
    };
}

/**
 * VistaJS processParamList
 *
 * need to copy here since it is not exported from VistaJS
 *
 * */
function processParamList(paramList) {
    if (paramList === null || paramList === undefined) {
        return [];
    }

    return _.map(paramList, function(param) {
        if (VistaJS.RpcParameter.isRpcParameter(param)) {
            return param;
        }

        var stringParam = param;
        if (_.isNumber(param)) {
            stringParam = String(param);
        }

        if (_.isString(stringParam)) {
            return VistaJS.RpcParameter.literal(stringParam);
        }

        return VistaJS.RpcParameter.list(param);
    });
}

function buildParamStringList (rpcParamList) {
    return _.map(rpcParamList, function(param) {
        return param.value;
    });
}

var paramList, rpcParamList,paramStringList,rpcCommand, rpcObject;

// Building a test string:
// first build the param list
paramList = [rpcParametersArray[0], rpcParametersArray[1]];
//// make an array of VistaJS.RpcParameters
//rpcParamList = processParamList(paramList;
//// get the parameter strings from the VistaJS.RpcParameters and make an array
//paramStringList = buildParamStringList(rpcParamList);
//// pass the rpcName and the parameters as strings list to build the rpcCommand
//rpcCommand = buildCommand(null, rpcNamesArray[0], paramStringList);
//
//console.log("RPC Command: " + rpcCommand.rpc);
//rpcObject = parser.parseRawRPC(rpcCommand.rpc);
//console.log ("  parsed rpcName = " + rpcObject.rpcName);


// build a list type param
var listParam = {
    "key1": "value1",
    "key2": "value2",
    "key3": "value3"
};

paramList.push(listParam);
rpcParamList = processParamList(paramList);
paramStringList = buildParamStringList(rpcParamList);
rpcCommand = buildCommand(null, rpcNamesArray[0], paramStringList);
console.log("RPC Command: " + rpcCommand.rpc);
rpcObject = parser.parseRawRPC(rpcCommand.rpc);
console.log ("  parsed rpcName = " + rpcObject.rpcName);

