'use strict'

var parser = require('../rpcParser.js');
var util = require('util');
var _ = require('underscore');

// Problem shown with 'rogue' "key": "0,1" and \u0001's
console.log("Show SOH - \u0001 - turned into empty string when it is the rvalue of a list parameter value");
var RAW_MSG = "[XWB]11302\u00010\nORWDX SAVE5000225f000261f00013f0008PSH OERRf000248f0003173f0000f20034,10041690t005136,1001\u0001t005138,1001\u0001t005386,1001\u0001t005384,1001\u0001t005137,1001\u0001t005170,1004 PRNt0030,1001\u0001t00415,1019ORDIALOG(\"WP\",15,1)t013\"WP\",15,1,1,0072no dosage or route - date set to yesterday and one of four explanations t013\"WP\",15,1,2,0006pickedt0036,1010Jan 9,2017t0061615,1021ORDIALOG(\"WP\",1615,1)t015\"WP\",1615,1,1,0001\u0001t015\"WP\",1615,1,2,0044Patient wants to buy from Non-VA pharmacy.  t005385,1020ORDIALOG(\"WP\",385,1)t014\"WP\",385,1,1,0007    PRNt009\"ORCHECK\"0010t006\"ORTS\"0010f0000f0000f0000f00010f\u0004"

var args = parser.parseRawRPC(RAW_MSG);
console.log("rawToArgs %j", args);


