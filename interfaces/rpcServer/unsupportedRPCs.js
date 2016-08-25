var HashMap = require('hashmap');
var CONFIG = require('./cfg/config.js');

var unsupportedRpcs = new HashMap();

unsupportedRpcs.set("TCPConnect", "\u0000\u0000accept\u0004");
unsupportedRpcs.set("XUS SIGNON SETUP", "\u0000\u0000vagrant-ubuntu-precise-64\r\nPLA\r\nPLA\r\n0\r\n5\r\n0\r\nDEMO.OSEHRA.ORG\r\n0\r\n\u0004");
unsupportedRpcs.set("XUS AV CODE", "\u0000\u000058\r\n0\r\n0\r\n\r\n0\r\n0\r\n\r\nGood evening ALEXANDER,ROBERT\r\n     You last signed on Aug 12, 2016 at 20:37\r\n\u0004");
unsupportedRpcs.set("XWB IM HERE", "\u0000\u00001\u0004");
unsupportedRpcs.set("#BYE#", "\u0000\u0000#BYE#\u0004");


var xwbGetVariableValueMap = new HashMap();
xwbGetVariableValueMap.set("@\"^VA(200,", "\u0000\u0000^^^^^^^^123456789\u0004");
xwbGetVariableValueMap.set("$O(^VA(200,\"SSN\",", "\u0000\u0000" + CONFIG.USER.DUZ + "\u0004");
unsupportedRpcs.set("XWB GET VARIABLE VALUE",  xwbGetVariableValueMap);

module.exports = unsupportedRpcs;