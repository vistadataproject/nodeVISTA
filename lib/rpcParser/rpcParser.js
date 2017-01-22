'use strict';

/*
 * Reproduces the functionality of XWBPRS.m, PRS5
 *
 * Note: server equivalent of client side/formatter, VistaJSLibrary, of eHMP
 *
 */

var rpcParserUtils = require('./rpcParserUtils.js');
var COUNT_WIDTH = 3;

var parameterTypeMap = {
    LITERAL: 0,
    REFERENCE: 1,
    LIST: 2
}

var parameterTypeReverseMap = {
    0: "LITERAL",
    1: "REFERENCE",
    2: "LIST"
}

var NUL = '\u0000';
var SOH = '\u0001';
var EOT = '\u0004';
var ENQ = '\u0005';


function parseRawRPC (rpcString) {

    if (!rpcString) {
        return null;
    }

    var rpcObject = {};

    if (rpcString.indexOf("{XWB}") === 0) {

        // this is direct query
        // {XWB}<MESSAGE> where <> is strPack with count_width 5
        //   MESSAGE is
        //     HDR = "007XWB;;;;"  or strPack(('XWB;;;;', 3)
        //     then for no parameter of type LIST buildApi(rpcName, parameters, "0")
        //       of buildApi(rpcName, parameters, "1") then the list of key value pairs each strPack with count_width 3 and terminated by 000
        // e.g. rpc "MY DOG" parameter: LITERAL abcde = "{XWB}007XWB;;;;000170MY DOG^000090060abcde"
        //      or "YOUR DOG" parameter: LIST (a,1) (b,2) = "{XWB}007XWB;;;;000341YOUR DOG^00019001a0011001b0012000"

        // this type of RPC is not supported so we will reject it
        rpcObject.name = "#REJECT#";

    } else if (rpcString.indexOf("TCPConnect") > -1) {

        // first check that the TCPConnect header fits the protocol
        if (rpcString.indexOf("[XWB]10304\nTCPConnect") === 0) {
            rpcObject.name = "TCPConnect";

            // parse the originating IP and hostname
            // form [XWB]10<COUNT_WIDTH>04\nTCPConnect + "5" + "0" + LPack(Address, COUNT_WIDTH) + "f"
            //                                               + "0" + LPack("0", COUNT_WIDTH) + "f"
            //                                               + "0" + LPack(Name, COUNT_WIDTH + 1) + "f\u0004"
            //rpcString = rpcString.substring("[XWB]10304\nTCPConnect50".length);
            //rpcObject.ipaddress = rpcParserUtils.popLPack(rpcString, COUNT_WIDTH).string;
            //rpcString = rpcString.substring(2 + COUNT_WIDTH + 3);
            //rpcObject.hostName = rpcParserUtils.popLPack(rpcString, COUNT_WIDTH).string;

            var parametersArray = parseParameters(rpcString.substring("[XWB]10304\nTCPConnect".length));
            //rpcObject.inputParameters = parametersArray;
            rpcObject.args = inputParametersToArgs(parametersArray);

        } else {

            // the header for the TCPConnect is not correct so we will inject a reject object
            rpcObject.name = "#REJECT#";
        }
    } else if (rpcString.indexOf("[XWB]10304\u0005#BYE#\u0004") === 0) {

        rpcObject.name = "#BYE#";

    } else if (rpcString.indexOf("[XWB]") === 0) {

        // this is national query
        // [XWB]11302<1.108><~RPCNAME~>~parameters~\u0004 where <> is an SPack
        // by parts: PREFIX="[XWB]" then "11" then COUNT_WIDTH="3" then "02" then SPack RPC_VERSION="1.108" then SPack RPC_NAME
        //    then the parameters where parameters = "5" then '0' for LITERAL, '1' for REFERENCE, '2' for LIST
        //        then for literals and reference the string is 'LPacked' for using COUNT_WIDTH of 3 and end with an 'f'
        //        for lists see list2string
        // e.g. rpc "MY DOG" parameter: LITERAL abcde = "[XWB]11301251.1086MY DOG50005abcdef"
        //      or "YOUR DOG" parameter: LIST (a,1) (b,2) = "[XWB]11301251.1088YOUR DOG52001a0011t001b0012f"

        // strip [XWB] and "11302" rpcString.substring(10);
        // get the version
        var poppedObject = rpcParserUtils.popSPack(rpcString.substring(10));
        var version = poppedObject.string;
        // get the rpcName
        poppedObject = rpcParserUtils.popSPack(poppedObject.remainder);
        var rpcName = poppedObject.string;
        var parametersArray = parseParameters(poppedObject.remainder);

        rpcObject.name = rpcName;
        rpcObject.version = version;
        //rpcObject.inputParameters = parametersArray;

        rpcObject.args = inputParametersToArgs(parametersArray);

    }
    return rpcObject;

}

function parseParameters(paramRpcString) {

    if (!paramRpcString || paramRpcString.indexOf('5') !== 0) {
        return null;
    }

    if (paramRpcString === '54f') {
        return {};
    }


    // remove the '5' paramRpcString.substring(1);
    var remainderString = paramRpcString.substring(1);
    var parameters = [];
    var parameterNum = 1;

    while (remainderString.length > COUNT_WIDTH) {

        // get the parameter type
        var paramtype = remainderString.substring (0, 1);
        var paramtypeName = parameterTypeReverseMap[paramtype];

        if (paramtype === '0' || paramtype === '1') {

            // LITERAL and REFERENCE type params are treated the same way
            var poppedObject = rpcParserUtils.popLPack(remainderString.substring(1), COUNT_WIDTH);
            remainderString = poppedObject.remainder;
            if (remainderString && remainderString.length > 0) {
                // remove the 'f' marking the end of the parameter.
                remainderString = remainderString.substring(1);
            }
            parameters.push({"parameterType": paramtypeName, "parameter": poppedObject.string, "num": parameterNum++});

        } else if (paramtype === '2') {

            // LIST type parameters need to remove LPacks two at a time for key/value pairs.
            // remove the paramtype
            remainderString = remainderString.substring(1);

            // pop two LPacks until it ends with a 'f'
            var listParams = [];
            var endoflist = false;
            while (!endoflist) {
                var poppedKeyObject = rpcParserUtils.popLPack(remainderString, COUNT_WIDTH);
                remainderString = poppedKeyObject.remainder;
                var poppedValueObject = rpcParserUtils.popLPack(remainderString, COUNT_WIDTH);
                remainderString = poppedValueObject.remainder;
                // push a key/value pair onto the list parameter array
                // turn value of SOH into "" as the MUMPS broker does in XWBPRS/LINST. 
                if (poppedValueObject.string === SOH) {
                    listParams.push({"key": poppedKeyObject.string, "value": ""});
                }
                else
                    listParams.push({"key": poppedKeyObject.string, "value": poppedValueObject.string});
                // remove the 't' or 'f'
                if (remainderString.substring(0, 1) === 'f') {
                    endoflist = true;
                }
                remainderString = remainderString.substring(1);
            }
            if (listParams.length > 0) {
                parameters.push({"parameterType": paramtypeName, "parameter": listParams, "num": parameterNum++});
            }
        }
    }

    return parameters;
}

/**
 * @param rpcObjectInputParameters The rpcObject.inputParameters array.
 * @returns the input parameters as array of the "parameter" values or arrays without the types and ordinals.
 *
 * Main change is to "List Parameters". In general ...
 *
 *      [{"key":"1", "value":"ABC"}, {"key":"2", "value":"DEF"}, {"key":"3", "value":"GHI"}]
 *
 *  becomes:  
 *
 *      {"1": "ABC", "2": "DEF", "3": "GHI"} as the args object.
 *
 */
function inputParametersToArgs (rpcObjectInputParameters) {

    var args = [];

    if (rpcObjectInputParameters && rpcObjectInputParameters.length > 0) {

        for (var paramnum = 0; paramnum < rpcObjectInputParameters.length; paramnum++) {

            if (rpcObjectInputParameters[paramnum].parameterType === 'LIST') {

                var parameterList = rpcObjectInputParameters[paramnum].parameter;
                var listObject = {};

                for (var item = 0; item < parameterList.length; item++) {

                    /*
                     * Three types of Keys - simple, word processing and hierachal
                     */
                    var key = parameterList[item].key.replace(/\"/g, '');
                    var value = parameterList[item].value;

                    // 1. Simple ,-less key - just assign
                    if (!/,/.test(key)) {
                        listObject[key] = value;
                        continue;
                    }

                    /*
                     * 2. , in Key - Word Processing 
                     *
                     * takes form 
                     *    {"..,0": "number of lines", "...,1": "line 1", "...,2": "line 2" ...
                     * and needs to become
                     *    ["line1", "line2" ...
                     * Note: ,0 is not enough - need to make sure value is numeric. 
                     *       otherwise ORWDX SAVE fails
                     */
                    if ((key.slice(-2) === ",0") && (/^\d+$/.test(value))) {

                        var wparray = [];
                        key = key.substring(0, key.length - 2);
                        listObject[key] = wparray;
                        var wpLength = parseInt(value);
                        for (var subitem = item + 1; subitem <= item + wpLength; subitem++) {
                            wparray.push(parameterList[subitem].value);
                        }
                        // skip forward in the parameterList the WP Length
                        item += wpLength;
  
                        continue;

                    }

                    /*
                     * 3. , in Key - Hierarchal
                     *
                     * TODO: find where this happens in the MUMPS. It does happen somewhere as
                     * otherwise ORWDX SAVE wouldn't work.
                     *
                     * hierarchal keys require a hierarchy (needed for ORWDX SAVE):
                     *     {"key": "X,Y,Z", "value": "A"} --> {"X": {"Y": {"Z": "A"}}}
                     *
                     */
                    var hlistObject = listObject;
                    key.split(",").forEach(function(subkey, i, subkeys)  {
                        // last (or only) subkey - assign value at this level
                        if (subkeys.length === i + 1) {
                            hlistObject[subkey] = value;
                            return;
                        }
                        // if subkey not there already then add it and go to its level
                        if (!hlistObject.hasOwnProperty(subkey)) {
                            hlistObject[subkey] = {};
                            hlistObject = hlistObject[subkey];
                        }
                        // go to level of subkey
                        else
                            hlistObject = hlistObject[subkey];
                    });

                }

                args.push(listObject);

            } else if (rpcObjectInputParameters[paramnum].parameterType === 'REFERENCE') {

                var referenceObject = {};
                referenceObject.type = 'REFERENCE';
                referenceObject.value = rpcObjectInputParameters[paramnum].parameter;
                args.push(referenceObject);

            } else { // LITERAL

                args.push(rpcObjectInputParameters[paramnum].parameter);

            }
        }
    }

    return args;
}

module.exports.parseRawRPC = parseRawRPC;
module.exports.inputParametersToArgs = inputParametersToArgs;

