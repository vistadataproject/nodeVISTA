'use strict'

var parser = require('../rpcParser.js');
var util = require('util');
var _ = require('underscore');

var RAW_MSG;
var args;
var RESULT_EXPECTED;

// TODO: [1] turn into Jasmine - expect particular argument returns and [2] expand to COVER all conditions in the parser

console.log("No Args");
RAW_MSG = "[XWB]11302\u00010\fORWPS REASON54f\u0004";
args = parser.parseRawRPC(RAW_MSG);
console.log("rawToArgs %s\n", JSON.stringify(args, null, 4));
RESULT_EXPECTED = {
    "name": "ORWPS REASON",
    "version": "0",
    "args": []
};
if (!_.isEqual(args, RESULT_EXPECTED)) {
    console.log("**** PARSER FAIL");
}
console.log("\n\n");


console.log("One Arg");
RAW_MSG = "[XWB]11302\u00010\rORWCH LOADSIZ50011frmODMedNVAf\u0004";
args = parser.parseRawRPC(RAW_MSG);
console.log("rawToArgs %s\n", JSON.stringify(args, null, 4));
RESULT_EXPECTED = {
    "name": "ORWCH LOADSIZ",
    "version": "0",
    "args": [
        "frmODMedNVA"
    ]
};
if (!_.isEqual(args, RESULT_EXPECTED)) {
    console.log("**** PARSER FAIL");
}
console.log("\n\n");


console.log("Many args - same level");
RAW_MSG = "[XWB]11302\u00010\nORWCV POLL5000225f001210.211.55.21f000800090386f\u0004";
args = parser.parseRawRPC(RAW_MSG);
console.log("rawToArgs %s\n", JSON.stringify(args, null, 4));
RESULT_EXPECTED = {
    "name": "ORWCV POLL",
    "version": "0",
    "args": [
        "25",
        "10.211.55.21",
        "00090386"
    ]
};
if (!_.isEqual(args, RESULT_EXPECTED)) {
    console.log("**** PARSER FAIL");
}
console.log("\n\n");


// TODO: split this test (with synthesized RPCs?) to separately test hierarchal keys and \u0001's
console.log("Hierarchy with WP arguments and embedded \u0001's");
RAW_MSG = "[XWB]11302\u00010\u0015ORWDAL32 SAVE ALLERGY500010f000225f2009\"GMRAGNT\"024CHOCOLATE^3;GMRD(120.82,t010\"GMRATYPE\"012DF^Drug,Foodt010\"GMRANATR\"009A^Allergyt010\"GMRAORIG\"00261t010\"GMRAORDT\"0123170121.0429t012\"GMRASYMP\",00011t012\"GMRASYMP\",101799^HYPOTENSION^^^t011\"GMRACHT\",00011t011\"GMRACHT\",10133170121.04294t010\"GMRAOBHX\"012h^HISTORICALt012\"GMRACMTS\",00011t012\"GMRACMTS\",1010saw it agof\u0004";
args = parser.parseRawRPC(RAW_MSG);
console.log("rawToArgs %s\n", JSON.stringify(args, null, 4));
RESULT_EXPECTED = {
    "name": "ORWDAL32 SAVE ALLERGY",
    "version": "0",
    "args": [
        "0",
        "25",
        {
            "GMRAGNT": "CHOCOLATE^3;GMRD(120.82,",
            "GMRATYPE": "DF^Drug,Food",
            "GMRANATR": "A^Allergy",
            "GMRAORIG": "61",
            "GMRAORDT": "3170121.0429",
            "GMRASYMP": [
                "99^HYPOTENSION^^^"
            ],
            "GMRACHT": [
                "3170121.04294"
            ],
            "GMRAOBHX": "h^HISTORICAL",
            "GMRACMTS": [
                "saw it ago"
            ]
        }
    ]
};
if (!_.isEqual(args, RESULT_EXPECTED)) {
    console.log("**** PARSER FAIL");
}
console.log("\n\n");

// TODO: split this test (with synthesized RPCs?) to separately test hierarchal keys and \u0001's
console.log("Show SOH - \u0001 - turned into empty string when it is the rvalue of a list parameter value and hierarchal keys");
RAW_MSG = "[XWB]11302\u00010\nORWDX SAVE5000225f000261f00013f0008PSH OERRf000248f0003173f0000f20034,10041690t005136,1001\u0001t005138,1001\u0001t005386,1001\u0001t005384,1001\u0001t005137,1001\u0001t005170,1004 PRNt0030,1001\u0001t00415,1019ORDIALOG(\"WP\",15,1)t013\"WP\",15,1,1,0072no dosage or route - date set to yesterday and one of four explanations t013\"WP\",15,1,2,0006pickedt0036,1010Jan 9,2017t0061615,1021ORDIALOG(\"WP\",1615,1)t015\"WP\",1615,1,1,0001\u0001t015\"WP\",1615,1,2,0044Patient wants to buy from Non-VA pharmacy.  t005385,1020ORDIALOG(\"WP\",385,1)t014\"WP\",385,1,1,0007    PRNt009\"ORCHECK\"0010t006\"ORTS\"0010f0000f0000f0000f00010f\u0004"
args = parser.parseRawRPC(RAW_MSG);
console.log("rawToArgs %s\n", JSON.stringify(args, null, 4));
RESULT_EXPECTED = {
    "name": "ORWDX SAVE",
    "version": "0",
    "args": [
        "25",
        "61",
        "3",
        "PSH OERR",
        "48",
        "173",
        "",
        {
            "0": {
                "1": ""
            },
            "4": {
                "1": "1690"
            },
            "6": {
                "1": "Jan 9,2017"
            },
            "15": {
                "1": "ORDIALOG(\"WP\",15,1)"
            },
            "136": {
                "1": ""
            },
            "137": {
                "1": ""
            },
            "138": {
                "1": ""
            },
            "170": {
                "1": " PRN"
            },
            "384": {
                "1": ""
            },
            "385": {
                "1": "ORDIALOG(\"WP\",385,1)"
            },
            "386": {
                "1": ""
            },
            "1615": {
                "1": "ORDIALOG(\"WP\",1615,1)"
            },
            "WP": {
                "15": {
                    "1": {
                        "1": {
                            "0": "no dosage or route - date set to yesterday and one of four explanations "
                        },
                        "2": {
                            "0": "picked"
                        }
                    }
                },
                "385": {
                    "1": {
                        "1": {
                            "0": "    PRN"
                        }
                    }
                },
                "1615": {
                    "1": {
                        "1": {
                            "0": ""
                        },
                        "2": {
                            "0": "Patient wants to buy from Non-VA pharmacy.  "
                        }
                    }
                }
            },
            "ORCHECK": "0",
            "ORTS": "0"
        },
        "",
        "",
        "",
        "0"
    ]
};
if (!_.isEqual(args, RESULT_EXPECTED)) {
    console.log("**** PARSER FAIL");
}
console.log("\n\n");


console.log("Problem Create test - shows = dictionary names");
RAW_MSG = "[XWB]11302\u00010\u000fORQQPL ADD SAVE5002125^CARTER,DAVID^0113^f000262f00042957f20011025GMPFLD(.01)=\"521774^R69.\"t0012033GMPFLD(.03)=\"3170127^Jan 27 2017\"t0013027GMPFLD(.05)=\"^Hypertension\"t0014033GMPFLD(.08)=\"3170127^Jan 27 2017\"t0015022GMPFLD(.12)=\"A^ACTIVE\"t0016015GMPFLD(.13)=\"^\"t0017035GMPFLD(1.01)=\"7647488^Hypertension\"t0018016GMPFLD(1.02)=\"P\"t0019034GMPFLD(1.03)=\"62^ALEXANDER,ROBERT\"t00210034GMPFLD(1.04)=\"62^ALEXANDER,ROBERT\"t00211034GMPFLD(1.05)=\"62^Alexander,Robert\"t00212016GMPFLD(1.06)=\"^\"t00213016GMPFLD(1.07)=\"^\"t00214025GMPFLD(1.08)=\"10^Clinicd\"t00215034GMPFLD(1.09)=\"3170127^Jan 27 2017\"t00216022GMPFLD(1.1)=\"^Unknown\"t00217019GMPFLD(1.11)=\"0^NO\"t00218019GMPFLD(1.12)=\"0^NO\"t00219019GMPFLD(1.13)=\"0^NO\"t00220017GMPFLD(1.14)=\"@^\"t00221019GMPFLD(1.15)=\"0^NO\"t00222019GMPFLD(1.16)=\"0^NO\"t00223019GMPFLD(1.17)=\"0^NO\"t00224019GMPFLD(1.18)=\"0^NO\"t00225016GMPFLD(1.19)=\"^\"t00226033GMPFLD(80001)=\"38341003^38341003\"t00227033GMPFLD(80002)=\"64176011^64176011\"t00228017GMPFLD(80101)=\"^\"t00229017GMPFLD(80102)=\"^\"t00230035GMPFLD(80201)=\"3170127^Jan 27 2017\"t00231029GMPFLD(80202)=\"10D^ICD-10-CM\"t00232016GMPFLD(10,0)=\"0\"f0012hypertensionf\u0004"
args = parser.parseRawRPC(RAW_MSG);
console.log("rawToArgs %s\n", JSON.stringify(args, null, 4));
RESULT_EXPECTED = {
  "name": "ORQQPL ADD SAVE",
  "version": "0",
  "args": [
    "25^CARTER,DAVID^0113^",
    "62",
    "2957",
    {
      "1": "GMPFLD(.01)=\"521774^R69.\"",
      "2": "GMPFLD(.03)=\"3170127^Jan 27 2017\"",
      "3": "GMPFLD(.05)=\"^Hypertension\"",
      "4": "GMPFLD(.08)=\"3170127^Jan 27 2017\"",
      "5": "GMPFLD(.12)=\"A^ACTIVE\"",
      "6": "GMPFLD(.13)=\"^\"",
      "7": "GMPFLD(1.01)=\"7647488^Hypertension\"",
      "8": "GMPFLD(1.02)=\"P\"",
      "9": "GMPFLD(1.03)=\"62^ALEXANDER,ROBERT\"",
      "10": "GMPFLD(1.04)=\"62^ALEXANDER,ROBERT\"",
      "11": "GMPFLD(1.05)=\"62^Alexander,Robert\"",
      "12": "GMPFLD(1.06)=\"^\"",
      "13": "GMPFLD(1.07)=\"^\"",
      "14": "GMPFLD(1.08)=\"10^Clinicd\"",
      "15": "GMPFLD(1.09)=\"3170127^Jan 27 2017\"",
      "16": "GMPFLD(1.1)=\"^Unknown\"",
      "17": "GMPFLD(1.11)=\"0^NO\"",
      "18": "GMPFLD(1.12)=\"0^NO\"",
      "19": "GMPFLD(1.13)=\"0^NO\"",
      "20": "GMPFLD(1.14)=\"@^\"",
      "21": "GMPFLD(1.15)=\"0^NO\"",
      "22": "GMPFLD(1.16)=\"0^NO\"",
      "23": "GMPFLD(1.17)=\"0^NO\"",
      "24": "GMPFLD(1.18)=\"0^NO\"",
      "25": "GMPFLD(1.19)=\"^\"",
      "26": "GMPFLD(80001)=\"38341003^38341003\"",
      "27": "GMPFLD(80002)=\"64176011^64176011\"",
      "28": "GMPFLD(80101)=\"^\"",
      "29": "GMPFLD(80102)=\"^\"",
      "30": "GMPFLD(80201)=\"3170127^Jan 27 2017\"",
      "31": "GMPFLD(80202)=\"10D^ICD-10-CM\"",
      "32": "GMPFLD(10,0)=\"0\""
    },
    "hypertension"
  ]
};
if (!_.isEqual(args, RESULT_EXPECTED)) {
    console.log("**** PARSER FAIL");
}
console.log("\n\n");
