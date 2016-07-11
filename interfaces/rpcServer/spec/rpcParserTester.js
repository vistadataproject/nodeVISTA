'use strict'

var parser = require('../rpcParser.js');
var rpcUtils = require('../rpcUtils.js');
var VistaJS = require('../../VistaJS/VistaJS.js');
var VistaJSLibrary = require('../../VistaJS/VistaJSLibrary.js');
var util = require('util');
var _ = require('underscore');


/** From VistaJSLibrary */
var PREFIX = '[XWB]';
var RPC_VERSION = '1.108';
var COUNT_WIDTH = 3;
var NUL = '\u0000';
var SOH = '\u0001';
var EOT = '\u0004';
var ENQ = '\u0005';


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

/** VistaJSLibrary buildRpcString **/
function buildRpcString(rpcName, paramStringList) {
    return util.format('%s11302%s%s%s%s',
        PREFIX,
        VistaJSLibrary.prependCount(RPC_VERSION),
        VistaJSLibrary.prependCount(rpcName),
        buildParamRpcString(paramStringList),
        EOT);
}

/** VistaJSLibrary buildParamRpcString */
function buildParamRpcString(paramStringList) {
    if (paramStringList === null || paramStringList === undefined || paramStringList.length === 0) {
        return '54f';
    }

    return '5' + paramStringList.join('');
}

/** VistaJS buildCommand
 * buildCommand(logger, rpc, _.map(rpcParamList, function(param) {
        return param.value;
    })

 where     var rpcParamList = processParamList(params);
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

/** VistaJS processParamList */
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

        return RpcParameter.list(param);
    });
}

function buildParamStringList (rpcParamList) {
    return _.map(rpcParamList, function(param) {
        return param.value;
    });
}


// Building a test string:
// first build the param list
var rpcParam1 = VistaJSLibrary.buildLiteralParamString(rpcParametersArray[0]);
var paramList = [rpcParam1];
var rpcParamList = processParamList(paramList);
var paramStringList = buildParamStringList(rpcParamList);
var rpcCommand = buildCommand(null, "TEST RPC NAME", paramStringList);

console.log("RPC Command: " + rpcCommand.rpc);




//var paramList1 = processParamList(rpcParametersArray);
//var paramListString1 = VistaJSLibrary.buildParamRpcString(paramList1);
//var rpc1 = VistaJSLibrary.buildRpcString(rpcNamesArray[0], paramListString1);
//var rpcName = parser.parseRawRPC(rpc1).rpcName;

//console.log ("rpcName = " + rpcName);


