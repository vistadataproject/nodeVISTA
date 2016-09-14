'use strict';

// var vistajs = require('../VistaJS/VistaJS'); TODO: Refactor to use VistaJS and VistaJSLibrary
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

    } else if (rpcString.indexOf("[XWB]10304\nTCPConnect") === 0) {
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
 *  rpcObject.inputParameters is an array of objects {"parameterType": "LITERAL|REFERENCE|LIST", "parameter": value|Array, "num": ordinal}.
 *
 *  args is an array that is accepted by the rpcRunner.
 *
 *  This function modifies the inputParameters into an array where LITERALs and REFERENCEs are each element of the array. The LISTs stay as an
 *  sub-array as the element of the array of parameters. But these sub-arrays are modified to be either a list of only the values
 *
 *  initial LIST parameter: "parameter": [{"key":"1", "value":"ABC"}, {"key":"2", "value":"DEF"}, {"key":"3", "value":"GHI"}]
 *  becomes: {"1": "ABC", "2": "DEF", "3": "GHI"} as the args object.
 *
 *  or
 *
 *  initial LIST parameter: "parameter": [{"key": "\"ABC\"", "value": "123"}, {"key": "\"DEF\"", "value": "345",
 *                                           {"key": "\"GHI\",0", "value": "1"}, {"key": "\"GHI\",1", "value": "678"}]
 *  becomes: {"ABC": "123", "DEF": "345", "GHI": ["678"]}
 *
 * @param rpcObjectInputParameters The rpcObject.inputParameters array.
 * @returns the input parameters as array of the "parameter" values or arrays without the types and ordinals.
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
                    // first check if the value will be an array. that is the key ends with '0'
                    if (parameterList[item].key.slice(-2) === ',0') {
                        // take the first part of the key as the name of the array
                        var name = parameterList[item].key.substring(0, parameterList[item].key.length - 2).replace(/\"/g, '');
                        var subarrayLength = parseInt(parameterList[item].value);

                        var subarray = [];
                        for (var subitem = item + 1; subitem <= item + subarrayLength; subitem++) {
                            subarray.push(parameterList[subitem].value);
                        }
                        listObject[name] = subarray;

                        // skip forward in the parameterList the subarrayLength
                        item += subarrayLength;
                    } else {
                        // just add to list object that the key is the property name, and the value is the value.
                        listObject[parameterList[item].key.replace(/\"/g, '')] = parameterList[item].value;
                    }
                }
                args.push(listObject);
            } else if (rpcObjectInputParameters[paramnum].parameterType === 'REFERENCE') {
                var referenceObject = {};
                referenceObject.type = 'REFERENCE';
                referenceObject.value = rpcObjectInputParameters[paramnum].parameter;
                args.push(referenceObject);
            } else {
                // LITERAL
                args.push(rpcObjectInputParameters[paramnum].parameter);
            }
        }
    }

    return args;
}

module.exports.parseRawRPC = parseRawRPC;
module.exports.inputParametersToArgs = inputParametersToArgs;


/* LPACK === STRPACK === VistaJSLibrary.strPack()
  public static String LPack(String str, int ndigits) {
    int lth = str.length();                                     // length if the string to be packed
    String sLth = Integer.toString(lth);                        // the string length as a String type
    int width = sLth.length();                                  // the length of the String of the length of the input string
    if (ndigits < width) {                                      // if the length of the length is less than the input width, there is a problem
      throw new IllegalArgumentException("Too few digits");
    }
    StringBuilder resultSB = new StringBuilder("000000000");          // prepare to prepend nine 0's to the result for padding if needed
    resultSB.append(Integer.toString(lth));                           // append the length of the input string to the 0's
    StringBuilder packed = new StringBuilder();                       // create an empty string
    packed.append(resultSB.substring(resultSB.length() - ndigits));   // substring the result down to the ndigits length taking the ending not the beginning, this is the length of the input with a zero padding if necessary
    packed.append(str);                                               // append the input string
    return packed.toString();                                         // return 0-padded length and the input string as the result
  }
*/

/* SPACK === VistaJSLibrary.prependCount()
  public static String SPack(String str) {
  int lth = str.length();                                               // length of the string to pack
  if (lth > 255) {                                                      // cannot be longer than 255 chars
    throw new IllegalArgumentException("Parameter exceeds 255 chars");
  }
  StringBuilder sbld = new StringBuilder();
  sbld.append((char) lth);                                              // start with the length of the string (the length is the first char not a number as a string, thus the 255 limit)
  sbld.append(str);                                                     // append the string
  return sbld.toString();                                               // return the length and string, e.g., "abcde" becomes "5abcde"
 }


*/

/* LIST2STRING, see VistaJSLibrary.buildListParamString() --- not equal since it prepends the 2 for list type.
  protected String list2string(DictionaryHashList lst) {
    String rtc;
    if (lst == null || lst.size() == 0) {                // for null lists or 0 length lists
      StringBuilder returnSB = new StringBuilder();      //
      returnSB.append(StringUtils.LPack("", 3));         // LPACK empty character with COUNT_WIDTH = 3
      returnSB.append('f');                              // append and 'f'
      rtc = returnSB.toString();                         // "000f" or length 0 then "" then 'f'
    } else {
      StringBuilder resultSB = new StringBuilder("");    // start with an empty string
      int lstSize = lst.size();                          //
      for (int i = 0; i < lstSize; i++) {                // loop for the number of elements
        KeyValuePair kvp = lst.get(i);                   // get element i (a key/value pair)
        String key = (String) kvp.getKey();
        String value = (String) kvp.getValue();
        if (StringUtils.isEmpty(value)) {                // if the value of the pair is empty
          value = "\u0001";                              // set the value as "\u0001"
        }
        resultSB.append(StringUtils.LPack(key, 3))       // appending lpack key with COUNT_WIDTH = 3
                .append(StringUtils.LPack(value, 3))     // appending lpack value with COUNT_WIDTH = 3
                .append('t');                            // append 't'
      }
      resultSB.setCharAt(resultSB.length() - 1, 'f');    // replace last 't' with 'f'
      rtc = resultSB.toString();                         // example { (a,1), (b,""), (c,3) } becomes "001a0011t001b006\u0001t001c0013f"
    }
    return rtc;
 }
*/

/* STRPACK === LPACK === VistaJSLibrary.strPack()
  public static String strPack(String sre, int len) {
    StringBuilder resultSB = new StringBuilder();
    resultSB.append(sre.length());                       // start with the length of the input string
    while (resultSB.length() < len) {                    // pad the length (prepend 0's) until the width is the specified len
      resultSB.insert(0, '0');
    }
    resultSB.append(sre);                                // append the input string
    return resultSB.toString();                          // eg. strPack ('abcde', 3) = "005abcde"
  }
*/

/* BUILDAPI
  protected String buildApi(String rpcName, String parameters, String fText) {
    String sParams = StringUtils.strPack(parameters, 5);       // strPack parameters with count_width 5
    StringBuilder packStr = new StringBuilder();
    packStr.append(fText);                                     // start with the fText
    packStr.append(rpcName);                                   // add the rpcName
    packStr.append('^');                                       // separate with '^'
    packStr.append(sParams);                                   // add the strPack'd parameters
    return StringUtils.strPack(packStr.toString(), 5);         // strPack the whole thing e.g. buildApi('MY DOG', '0060abcde', '0') = "000170MY DOG^0060abcde"
 }

*/
