'use strict';

// var vistajs = require('../VistaJS/VistaJS'); TODO: Refactor to use VistaJS and VistaJSLibrary

var parameterTypeMap = {
    LITERAL: 0,
    REFERENCE: 1,
    LIST: 2
}

function parseRawRPC (rpcString) {

    var rpcObject = {};

    if (rpcString.startsWith("{XWB}")) {
        // this is direct query
        // {XWB}<MESSAGE> where <> is strPack with count_width 5
        //   MESSAGE is
        //     HDR = "007XWB;;;;"  or strPack(('XWB;;;;', 3)
        //     then for no parameter of type LIST buildApi(rpcName, parameters, "0")
        //       of buildApi(rpcName, parameters, "1") then the list of key value pairs each strPack with count_width 3 and terminated by 000
        // e.g. rpc "MY DOG" parameter: LITERAL abcde = "{XWB}007XWB;;;;000170MY DOG^000090060abcde"
        //      or "YOUR DOG" parameter: LIST (a,1) (b,2) = "{XWB}007XWB;;;;1YOUR DOG^00019001a0011001b0012000"

    } else if (rpcString.startsWith("[XWB]")) {
        // this is national query
        // [XWB]11302<1.108><~RPCNAME~>~parameters~\u0004 where <> is an SPack
        // by parts: PREFIX="[XWB]" then "11" then COUNT_WIDTH="3" then "02" then SPack RPC_VERSION="1.108" then SPack RPC_NAME
        //    then the parameters where parameters = "5" then '0' for LITERAL, '1' for REFERENCE, '2' for LIST
        //        then for literals and reference the string is 'LPacked' for using COUNT_WIDTH of 3 and end with an 'f'
        //        for lists see list2string
        // e.g. rpc "MY DOG" parameter: LITERAL abcde = "[XWB]11301251.1086MY DOG50005abcdef"
        //      or "YOUR DOG" parameter: LIST (a,1) (b,2) = "[XWB]11301251.1088YOUR DOG52001a0011t001b0012f"

    }
    return rpcObject;

}


function rpcParametersToString (rpcParametersArray) {
    var parameterString = "";
    for (var i = 0; i < rpcParametersArray.length; i++ ) {
        if (rpcParametersArray[i].type === parameterTypeMap.LITERAL) {
            parameterString += i + " (LITERAL): " + rpcParametersArray[i].value + "\n";
        } else if (rpcParametersArray[i].type === parameterTypeMap.REFERENCE) {
            parameterString += i + " (REFERENCE): " + rpcParametersArray[i].value + "\n";
        } else if (rpcParametersArray[i].type === parameterTypeMap.LIST) {

        }

    }

    return parameterString;

}

module.exports.parseRawRPC = parseRawRPC();
module.exports.rpcParametersToString = rpcParametersToString();


/* LPACK
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

/* SPACK
  public static String SPack(String str) {
  int lth = str.length();                                               // length of the string to pack
  if (lth > 255) {                                                      // cannot be longer than 255 chars
    throw new IllegalArgumentException("Parameter exceeds 255 chars");
  }
  StringBuilder sbld = new StringBuilder();
  sbld.append((char) lth);                                              // start with the length of the string
  sbld.append(str);                                                     // append the string
  return sbld.toString();                                               // return the length and string, e.g., "abcde" becomes "5abcde"
 }


*/

/* LIST2STRING
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

/* STRPACK
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
