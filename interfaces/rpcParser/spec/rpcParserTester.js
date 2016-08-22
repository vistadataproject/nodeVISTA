'use strict'

var parser = require('../rpcParser.js');
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

var inputParameters = [
    {
        "parameterType": "LITERAL",
        "parameter": "0",
        "num": 1
    },
    {
        "parameterType": "LITERAL",
        "parameter": "$PATIENTID",
        "num": 2
    },
    {
        "parameterType": "LIST",
        "parameter": [
            {
                "key": "\"GMRAGNT\"",
                "value": "CHOCOLATE^3;GMRD(120.82,"
            },
            {
                "key": "\"GMRATYPE\"",
                "value": "DF^Drug,Food"
            },
            {
                "key": "\"GMRANATR\"",
                "value": "A^Allergy"
            },
            {
                "key": "\"GMRAORIG\"",
                "value": "$USERID",
                "exampleValue": "55"
            },
            {
                "key": "\"GMRAORDT\"",
                "value": "$NOWNOSECS",
                "exampleValue": "3160804.2157"
            },
            {
                "key": "\"GMRASYMP\",0",
                "value": "1"
            },
            {
                "key": "\"GMRASYMP\",1",
                "value": "15^CONFUSION^^^"
            },
            {
                "key": "\"GMRACHT\",0",
                "value": "1"
            },
            {
                "key": "\"GMRACHT\",1",
                "value": "$NOW",
                "exampleValue": "3160804.215746"
            },
            {
                "key": "\"GMRAOBHX\"",
                "value": "h^HISTORICAL"
            },
            {
                "key": "\"GMRACMTS\",0",
                "value": "1"
            },
            {
                "key": "\"GMRACMTS\",1",
                "value": "adding hist choc"
            }
        ],
        "num": 3
    },
    {
        "parameterType": "LIST",
        "parameter": [
            {
                "key": "1",
                "value": "GMPFLD(.01)=\"521774^R69.\""
            },
            {
                "key": "2",
                "value": "GMPFLD(.03)=\"0^\""
            },
            {
                "key": "3",
                "value": "GMPFLD(.05)=\"^Hypertension\""
            },
            {
                "key": "4",
                "value": "GMPFLD(.08)=\"3160811^Aug 11 2016\""
            },
            {
                "key": "5",
                "value": "GMPFLD(.12)=\"A^ACTIVE\""
            },
            {
                "key": "6",
                "value": "GMPFLD(.13)=\"3160303^Mar 03 2016\""
            },
            {
                "key": "7",
                "value": "GMPFLD(1.01)=\"7647488^Hypertension\""
            },
            {
                "key": "8",
                "value": "GMPFLD(1.02)=\"P\""
            },
            {
                "key": "9",
                "value": "GMPFLD(1.03)=\"57^ALEXANDER,ROBERT\""
            },
            {
                "key": "10",
                "value": "GMPFLD(1.04)=\"57^ALEXANDER,ROBERT\""
            },
            {
                "key": "11",
                "value": "GMPFLD(1.05)=\"57^Alexander,Robert\""
            },
            {
                "key": "12",
                "value": "GMPFLD(1.06)=\"^\""
            },
            {
                "key": "13",
                "value": "GMPFLD(1.07)=\"^\""
            },
            {
                "key": "14",
                "value": "GMPFLD(1.08)=\"10^Clinicd\""
            },
            {
                "key": "15",
                "value": "GMPFLD(1.09)=\"3160811^Aug 11 2016\""
            },
            {
                "key": "16",
                "value": "GMPFLD(1.1)=\"^Unknown\""
            },
            {
                "key": "17",
                "value": "GMPFLD(1.11)=\"0^NO\""
            },
            {
                "key": "18",
                "value": "GMPFLD(1.12)=\"0^NO\""
            },
            {
                "key": "19",
                "value": "GMPFLD(1.13)=\"0^NO\""
            },
            {
                "key": "20",
                "value": "GMPFLD(1.14)=\"A^ACUTE\""
            },
            {
                "key": "21",
                "value": "GMPFLD(1.15)=\"0^NO\""
            },
            {
                "key": "22",
                "value": "GMPFLD(1.16)=\"0^NO\""
            },
            {
                "key": "23",
                "value": "GMPFLD(1.17)=\"0^NO\""
            },
            {
                "key": "24",
                "value": "GMPFLD(1.18)=\"0^NO\""
            },
            {
                "key": "25",
                "value": "GMPFLD(80001)=\"38341003^38341003\""
            },
            {
                "key": "26",
                "value": "GMPFLD(80002)=\"64176011^64176011\""
            },
            {
                "key": "27",
                "value": "GMPFLD(80101)=\"^\""
            },
            {
                "key": "28",
                "value": "GMPFLD(80102)=\"^\""
            },
            {
                "key": "29",
                "value": "GMPFLD(80201)=\"3160725^Jul 25 2016\""
            },
            {
                "key": "30",
                "value": "GMPFLD(80202)=\"10D^ICD-10-CM\""
            },
            {
                "key": "31",
                "value": "GMPFLD(10,\"NEW\",1)=\"a problem comment\""
            },
            {
                "key": "32",
                "value": "GMPFLD(10,0)=\"1\""
            }
        ],
        "num": 4
    }
]



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

//paramList.push(listParam);
//rpcParamList = processParamList(paramList);
//paramStringList = buildParamStringList(rpcParamList);
//rpcCommand = buildCommand(null, rpcNamesArray[0], paramStringList);
//console.log("RPC Command: " + rpcCommand.rpc);
//rpcObject = parser.parseRawRPC(rpcCommand.rpc);
//console.log ("  parsed rpcName = " + rpcObject.rpcName);

var args = parser.inputParametersToArgs(inputParameters);
console.log("inputParametersToArgs %j", args);