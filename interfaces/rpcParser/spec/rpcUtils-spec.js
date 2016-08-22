#!javascript

/**
 * rpcParserUtils.js unit tests
 */

var rpcParserUtils = require('../rpcParserUtils.js');
var VistaJSLibrary = require('../../VistaJS/VistaJSLibrary');

describe ("unSPack", function () {
    it ("should correctly un-SPack '"+ SPACK_LENGTH_1_STRING_ALPHA +"' to payload '" + LENGTH_1_STRING_ALPHA + "'", function () {
        var payload = rpcParserUtils.unSPack(SPACK_LENGTH_1_STRING_ALPHA);
        expect(payload).toBe(LENGTH_1_STRING_ALPHA);
    });

    it ("should correctly un-SPack '"+ SPACK_LENGTH_8_STRING_ALPHA +"' to payload '" + LENGTH_8_STRING_ALPHA + "'", function () {
        var payload = rpcParserUtils.unSPack(SPACK_LENGTH_8_STRING_ALPHA);
        expect(payload).toBe(LENGTH_8_STRING_ALPHA);

    });

    it ("should correctly un-SPack '"+ SPACK_LENGTH_10_STRING_ALPHA +"' to payload '" + LENGTH_10_STRING_ALPHA + "'", function () {
        var payload = rpcParserUtils.unSPack(SPACK_LENGTH_10_STRING_ALPHA);
        expect(payload).toBe(LENGTH_10_STRING_ALPHA);
    });

    it ("should correctly un-SPack '"+ SPACK_LENGTH_1_STRING_NUM_0 +"' to payload '" + LENGTH_1_STRING_NUM_0 + "'", function () {
        var payload = rpcParserUtils.unSPack(SPACK_LENGTH_1_STRING_NUM_0);
        expect(payload).toBe(LENGTH_1_STRING_NUM_0);
    });

    it ("should correctly un-SPack '"+ SPACK_LENGTH_1_STRING_NUM_1 +"' to payload '" + LENGTH_1_STRING_NUM_1 + "'", function () {
        var payload = rpcParserUtils.unSPack(SPACK_LENGTH_1_STRING_NUM_1);
        expect(payload).toBe(LENGTH_1_STRING_NUM_1);
    });

    it ("should correctly un-SPack '"+ SPACK_LENGTH_8_STRING_NUM_0 +"' to payload '" + LENGTH_8_STRING_NUM_0 + "'", function () {
        var payload = rpcParserUtils.unSPack(SPACK_LENGTH_8_STRING_NUM_0);
        expect(payload).toBe(LENGTH_8_STRING_NUM_0);
    });

    it ("should correctly un-SPack '"+ SPACK_LENGTH_8_STRING_NUM_1 +"' to payload '" + LENGTH_8_STRING_NUM_1 + "'", function () {
        var payload = rpcParserUtils.unSPack(SPACK_LENGTH_8_STRING_NUM_1);
        expect(payload).toBe(LENGTH_8_STRING_NUM_1);
    });

    it ("should correctly un-SPack '"+ SPACK_LENGTH_10_STRING_NUM_0 +"' to payload '" + LENGTH_10_STRING_NUM_0 + "'", function () {
        var payload = rpcParserUtils.unSPack(SPACK_LENGTH_10_STRING_NUM_0);
        expect(payload).toBe(LENGTH_10_STRING_NUM_0);

    });

    it ("should correctly un-SPack '"+ SPACK_LENGTH_10_STRING_NUM_1 +"' to payload '" + LENGTH_10_STRING_NUM_1 + "'", function () {
        var payload = rpcParserUtils.unSPack(SPACK_LENGTH_10_STRING_NUM_1);
        expect(payload).toBe(LENGTH_10_STRING_NUM_1);
    });

});

describe ("unLPack", function () {

    it ("should correctly un-LPack '" + LPACK_1_LENGTH_1_STRING_ALPHA + "' to payload '" + LENGTH_1_STRING_ALPHA + "', width 1", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_1_LENGTH_1_STRING_ALPHA);
        expect(unpacked.string).toBe(LENGTH_1_STRING_ALPHA);
        expect(unpacked.width).toBe(1);
    });

    it ("should correctly un-LPack '" + LPACK_1_LENGTH_8_STRING_ALPHA + "' to payload '" + LENGTH_8_STRING_ALPHA + "', width 1", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_1_LENGTH_8_STRING_ALPHA);
        expect(unpacked.string).toBe(LENGTH_8_STRING_ALPHA);
        expect(unpacked.width).toBe(1);
    });

    it ("should correctly un-LPack '" + LPACK_1_LENGTH_10_STRING_ALPHA + "' to payload '" + LENGTH_10_STRING_ALPHA + "', width not 1", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_1_LENGTH_10_STRING_ALPHA);
        expect(unpacked.string).toBe(LENGTH_10_STRING_ALPHA);
        // a te
        expect(unpacked.width).not.toBe(1);
    });

    it ("should correctly un-LPack '" + LPACK_1_LENGTH_1_STRING_NUM_0 + "' to payload '" + LENGTH_1_STRING_NUM_0 + "', width 1", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_1_LENGTH_1_STRING_NUM_0);
        expect(unpacked.string).toBe(LENGTH_1_STRING_NUM_0);
        expect(unpacked.width).toBe(1);
    });

    it ("should correctly un-LPack '" + LPACK_1_LENGTH_8_STRING_NUM_0 + "' to payload '" + LENGTH_8_STRING_NUM_0 + "', width 1", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_1_LENGTH_8_STRING_NUM_0);
        expect(unpacked.string).toBe(LENGTH_8_STRING_NUM_0);
        expect(unpacked.width).toBe(1);
    });

    it ("should correctly un-LPack '" + LPACK_1_LENGTH_10_STRING_NUM_0 + "' to payload '" + LENGTH_10_STRING_NUM_0 + "', width not 1", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_1_LENGTH_10_STRING_NUM_0);
        expect(unpacked.string).toBe(LENGTH_10_STRING_NUM_0);
        expect(unpacked.width).not.toBe(1);
    });

    it ("should correctly un-LPack '" + LPACK_1_LENGTH_1_STRING_NUM_1 + "' to payload '" + LENGTH_1_STRING_NUM_1 + "', width 1", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_1_LENGTH_1_STRING_NUM_1);
        expect(unpacked.string).toBe(LENGTH_1_STRING_NUM_1);
        expect(unpacked.width).toBe(1);
    });

    it ("should correctly un-LPack '" + LPACK_1_LENGTH_8_STRING_NUM_1 + "' to payload '" + LENGTH_8_STRING_NUM_1 + "', width 1", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_1_LENGTH_8_STRING_NUM_1);
        expect(unpacked.string).toBe(LENGTH_8_STRING_NUM_1);
        expect(unpacked.width).toBe(1);
    });

    it ("should correctly un-LPack '" + LPACK_1_LENGTH_10_STRING_NUM_1 + "' to payload '" + LENGTH_10_STRING_NUM_1 + "', width not 1", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_1_LENGTH_10_STRING_NUM_1);
        expect(unpacked.string).toBe(LENGTH_10_STRING_NUM_1);
        expect(unpacked.width).not.toBe(1);
    });

    it ("should correctly un-LPack '" + LPACK_3_LENGTH_1_STRING_ALPHA + "' to payload '" + LENGTH_1_STRING_ALPHA + "', width 3", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_3_LENGTH_1_STRING_ALPHA);
        expect(unpacked.string).toBe(LENGTH_1_STRING_ALPHA);
        expect(unpacked.width).toBe(3);
    });

    it ("should correctly un-LPack '" + LPACK_3_LENGTH_8_STRING_ALPHA + "' to payload '" + LENGTH_8_STRING_ALPHA + "', width 3", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_3_LENGTH_8_STRING_ALPHA);
        expect(unpacked.string).toBe(LENGTH_8_STRING_ALPHA);
        expect(unpacked.width).toBe(3);
    });

    it ("should correctly un-LPack '" + LPACK_3_LENGTH_10_STRING_ALPHA + "' to payload '" + LENGTH_10_STRING_ALPHA + "', width 3", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_3_LENGTH_10_STRING_ALPHA);
        expect(unpacked.string).toBe(LENGTH_10_STRING_ALPHA);
        expect(unpacked.width).toBe(3);
    });

    it ("should correctly un-LPack '" + LPACK_3_LENGTH_1_STRING_NUM_0 + "' to payload '" + LENGTH_1_STRING_NUM_0 + "', width 3", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_3_LENGTH_1_STRING_NUM_0);
        expect(unpacked.string).toBe(LENGTH_1_STRING_NUM_0);
        expect(unpacked.width).toBe(3);
    });

    it ("should correctly un-LPack '" + LPACK_3_LENGTH_8_STRING_NUM_0 + "' to payload '" + LENGTH_8_STRING_NUM_0 + "', width 3", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_3_LENGTH_8_STRING_NUM_0);
        expect(unpacked.string).toBe(LENGTH_8_STRING_NUM_0);
        expect(unpacked.width).toBe(3);
    });

    it ("should correctly un-LPack '" + LPACK_3_LENGTH_10_STRING_NUM_0 + "' to payload '" + LENGTH_10_STRING_NUM_0 + "', width 3", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_3_LENGTH_10_STRING_NUM_0);
        expect(unpacked.string).toBe(LENGTH_10_STRING_NUM_0);
        expect(unpacked.width).toBe(3);
    });

    it ("should correctly un-LPack '" + LPACK_3_LENGTH_1_STRING_NUM_1 + "' to payload '" + LENGTH_1_STRING_NUM_1 + "', width 3", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_3_LENGTH_1_STRING_NUM_1);
        expect(unpacked.string).toBe(LENGTH_1_STRING_NUM_1);
        expect(unpacked.width).toBe(3);
    });

    it ("should correctly un-LPack '" + LPACK_3_LENGTH_8_STRING_NUM_1 + "' to payload '" + LENGTH_8_STRING_NUM_1 + "', width 3", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_3_LENGTH_8_STRING_NUM_1);
        expect(unpacked.string).toBe(LENGTH_8_STRING_NUM_1);
        expect(unpacked.width).toBe(3);
    });

    it ("should correctly un-LPack '" + LPACK_3_LENGTH_10_STRING_NUM_1 + "' to payload '" + LENGTH_10_STRING_NUM_1 + "', width 3", function () {
        var unpacked = rpcParserUtils.unLPack(LPACK_3_LENGTH_10_STRING_NUM_1);
        expect(unpacked.string).toBe(LENGTH_10_STRING_NUM_1);
        expect(unpacked.width).toBe(3);

    });

});


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
