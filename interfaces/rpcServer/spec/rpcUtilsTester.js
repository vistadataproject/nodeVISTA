'use strict';

var rpcUtils = require('../rpcUtils.js');
var VistaJSLibrary = require('../../VistaJS/VistaJSLibrary.js');

var LENGTH_1_STRING_ALPHA = 'A';
var LENGTH_8_STRING_ALPHA = 'AbCdEfGh';
var LENGTH_10_STRING_ALPHA = 'AbCdEfGhIj';
var LENGTH_1_STRING_NUM_0 = '0';
var LENGTH_1_STRING_NUM_1 = '1';
var LENGTH_8_STRING_NUM_0 = '01234567';
var LENGTH_8_STRING_NUM_1 = '12345678';
var LENGTH_10_STRING_NUM_0 = '0123456789';
var LENGTH_10_STRING_NUM_1 = '1234567890';

var SPACK_LENGTH_1_STRING_ALPHA = VistaJSLibrary.prependCount(LENGTH_1_STRING_ALPHA);
var SPACK_LENGTH_8_STRING_ALPHA = VistaJSLibrary.prependCount(LENGTH_8_STRING_ALPHA);
var SPACK_LENGTH_10_STRING_ALPHA = VistaJSLibrary.prependCount(LENGTH_10_STRING_ALPHA);
var SPACK_LENGTH_1_STRING_NUM_0 = VistaJSLibrary.prependCount(LENGTH_1_STRING_NUM_0);
var SPACK_LENGTH_1_STRING_NUM_1 = VistaJSLibrary.prependCount(LENGTH_1_STRING_NUM_1);
var SPACK_LENGTH_8_STRING_NUM_0 = VistaJSLibrary.prependCount(LENGTH_8_STRING_NUM_0);
var SPACK_LENGTH_8_STRING_NUM_1 = VistaJSLibrary.prependCount(LENGTH_8_STRING_NUM_1);
var SPACK_LENGTH_10_STRING_NUM_0 = VistaJSLibrary.prependCount(LENGTH_10_STRING_NUM_0);
var SPACK_LENGTH_10_STRING_NUM_1 = VistaJSLibrary.prependCount(LENGTH_10_STRING_NUM_1);

var LPACK_1_LENGTH_1_STRING_ALPHA = VistaJSLibrary.strPack(LENGTH_1_STRING_ALPHA, 1);
var LPACK_1_LENGTH_8_STRING_ALPHA = VistaJSLibrary.strPack(LENGTH_8_STRING_ALPHA, 1);
var LPACK_1_LENGTH_10_STRING_ALPHA = VistaJSLibrary.strPack(LENGTH_10_STRING_ALPHA, 1);
var LPACK_1_LENGTH_1_STRING_NUM_0 = VistaJSLibrary.strPack(LENGTH_1_STRING_NUM_0, 1);
var LPACK_1_LENGTH_1_STRING_NUM_1 = VistaJSLibrary.strPack(LENGTH_1_STRING_NUM_1, 1);
var LPACK_1_LENGTH_8_STRING_NUM_0 = VistaJSLibrary.strPack(LENGTH_8_STRING_NUM_0, 1);
var LPACK_1_LENGTH_8_STRING_NUM_1 = VistaJSLibrary.strPack(LENGTH_8_STRING_NUM_1, 1);
var LPACK_1_LENGTH_10_STRING_NUM_0 = VistaJSLibrary.strPack(LENGTH_10_STRING_NUM_0, 1);
var LPACK_1_LENGTH_10_STRING_NUM_1 = VistaJSLibrary.strPack(LENGTH_10_STRING_NUM_1, 1);

var LPACK_3_LENGTH_1_STRING_ALPHA = VistaJSLibrary.strPack(LENGTH_1_STRING_ALPHA, 3);
var LPACK_3_LENGTH_8_STRING_ALPHA = VistaJSLibrary.strPack(LENGTH_8_STRING_ALPHA, 3);
var LPACK_3_LENGTH_10_STRING_ALPHA = VistaJSLibrary.strPack(LENGTH_10_STRING_ALPHA, 3);
var LPACK_3_LENGTH_1_STRING_NUM_0 = VistaJSLibrary.strPack(LENGTH_1_STRING_NUM_0, 3);
var LPACK_3_LENGTH_1_STRING_NUM_1 = VistaJSLibrary.strPack(LENGTH_1_STRING_NUM_1, 3);
var LPACK_3_LENGTH_8_STRING_NUM_0 = VistaJSLibrary.strPack(LENGTH_8_STRING_NUM_0, 3);
var LPACK_3_LENGTH_8_STRING_NUM_1 = VistaJSLibrary.strPack(LENGTH_8_STRING_NUM_1, 3);
var LPACK_3_LENGTH_10_STRING_NUM_0 = VistaJSLibrary.strPack(LENGTH_10_STRING_NUM_0, 3);
var LPACK_3_LENGTH_10_STRING_NUM_1 = VistaJSLibrary.strPack(LENGTH_10_STRING_NUM_1, 3);


var spackArray = [
    {"spack": SPACK_LENGTH_1_STRING_ALPHA, "payload": LENGTH_1_STRING_ALPHA},
    {"spack": SPACK_LENGTH_8_STRING_ALPHA, "payload": LENGTH_8_STRING_ALPHA},
    {"spack": SPACK_LENGTH_10_STRING_ALPHA, "payload": LENGTH_10_STRING_ALPHA},

    {"spack": SPACK_LENGTH_1_STRING_NUM_0, "payload": LENGTH_1_STRING_NUM_0},
    {"spack": SPACK_LENGTH_8_STRING_NUM_0, "payload": LENGTH_8_STRING_NUM_0},
    {"spack": SPACK_LENGTH_10_STRING_NUM_0, "payload": LENGTH_10_STRING_NUM_0},

    {"spack": SPACK_LENGTH_1_STRING_NUM_1, "payload": LENGTH_1_STRING_NUM_1},
    {"spack": SPACK_LENGTH_8_STRING_NUM_1, "payload": LENGTH_8_STRING_NUM_1},
    {"spack": SPACK_LENGTH_10_STRING_NUM_1, "payload": LENGTH_10_STRING_NUM_1}
]



for (var i = 0; i < spackArray.length; i++) {
    console.log("Unpacking " + spackArray[i]);
    var unspack = rpcUtils.unSPack(spackArray[i]["spack"]);
    console.log("  unpacked: " + unspack);
    if (spackArray[i]["payload"] !== unspack) {
        console.log("Error, quitting");
        break;
    }
}