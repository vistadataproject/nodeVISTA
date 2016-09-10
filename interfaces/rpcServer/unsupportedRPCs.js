var HashMap = require('hashmap');
var CONFIG = require('./cfg/config.js');

var unsupportedRpcs = new HashMap();

unsupportedRpcs.set("TCPConnect", "\u0000\u0000accept\u0004");
unsupportedRpcs.set("XUS SIGNON SETUP", "\u0000\u0000vagrant-ubuntu-precise-64\r\nPLA\r\nPLA\r\n0\r\n5\r\n0\r\nDEMO.OSEHRA.ORG\r\n0\r\n\u0004");
unsupportedRpcs.set("XUS AV CODE", "\u0000\u000058\r\n0\r\n0\r\n\r\n0\r\n0\r\n\r\nGood evening ALEXANDER,ROBERT\r\n     You last signed on Aug 12, 2016 at 20:37\r\n\u0004");
unsupportedRpcs.set("XWB IM HERE", "\u0000\u00001\u0004");
unsupportedRpcs.set("#BYE#", "\u0000\u0000#BYE#\u0004");

module.exports = unsupportedRpcs;