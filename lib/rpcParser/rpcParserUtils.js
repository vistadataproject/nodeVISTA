'use strict';

var math = require("mathjs");
var _ = require("underscore");

var NUL = '\u0000';
var SOH = '\u0001';
var EOT = '\u0004';
var ENQ = '\u0005';

/**
 * Unpack an LPacked structure
 *
 * @param lPack the package in the form dd...ddSSS...SSS where dd...dd is the length nDigits long and SSS...SSS is the payload of length dd...dd
 * @param digits number of digits of the length to unpack (needs to be an integer)
 * @returns an object with the "string" payload and the "width" ndigits, or null if not a proper lpack. ("string" and "width" property names come from VistaJSLibrary parameter names for strPack())
 */
function unLPack(lPack, nDigits) {
    var payload = "";
    var length, width;

    if (nDigits && _.isNumber(nDigits)) { // this case makes it easier
        length = lPack.substring(0, nDigits);
        length = parseInt(removeLeftPad(length)); // this should be the length of the payload
        payload = lPack.subString(nDigits);
        if (payload.length === length) {
            width = nDigits;
        }
    } else { // this is a little harder
        var packedLength = lPack.length;
        var strippedPack = removeLeftPad(lPack); // remove any leading zeros
        var strippedPackLength = strippedPack.length;

        var lengthString;
        for (var i = 1; i <= math.ceil(math.log(strippedPackLength, 10)); i++) {
            lengthString = strippedPack.substring(0, i);
            length = parseInt(lengthString);
            if (length && !isNaN(length) && (length === strippedPackLength - i)) {
                payload = strippedPack.substring(i);
            }
        }

        if (payload) {
            // the width is the length section plus the number of 0s
            width = (strippedPackLength - payload.length) + (packedLength - strippedPackLength)

        }
    }

    if (width) {
        return {"string": payload, "width": width};
    } else {
        return null;
    }
}

/**
 * Checks the length of the packed string and strips of the length from the payload. Needs to be of the form
 * dSS...SS where d is the length as a char of the payload and SS...SS is the payload
 *
 * @param sPack
 * @returns the payload string, or null sPack is not in the proper form
 */
function unSPack(sPack) {
    if (sPack && typeof sPack === 'string') {
        var length = sPack.charCodeAt(0);

        if (sPack.length - 1 === length) {
            return sPack.substring(1);
        } else {
            return null;
        }
    }
}

/**
 * Takes a string that has an SPack on the front, removes the SPack and returns the SPack payload and the remainder of the
 * string.
 *
 * @param sPackPlusTrailer
 * @returns object containing spack payload, and the remaining string
 */
function popSPack(sPackPlusRemainder) {
    if (sPackPlusRemainder && typeof sPackPlusRemainder === 'string') {
        var length = sPackPlusRemainder.charCodeAt(0);

        var payload = sPackPlusRemainder.substring(1, length + 1);

        var trailer = "";

        if (sPackPlusRemainder.length > length + 1) {
            trailer = sPackPlusRemainder.substring(length + 1);
        }

        return {"string": payload, "remainder": trailer};

    }

}

/**
 * Takes a string that has an LPack on the front, removes the LPack, and returns the LPack payload and the remainder of the
 * string
 *
 * @param lPackPlusRemainder
 * @returns object containing lpack payload and the remaining string
 */
function popLPack(lPackPlusRemainder, lwidth) {
    if (lPackPlusRemainder && typeof  lPackPlusRemainder === 'string') {
        if (!lwidth && typeof lwidth === 'number') {
            // the width is necessary.
            return null;
        }

        var length = lPackPlusRemainder.substring(0, lwidth);
        if (length === '000') {
            length = 0;
        } else {
            length = parseInt(removeLeftPad(length));
        }
        var payload = lPackPlusRemainder.substring(lwidth, lwidth + length);
        var remainder = lPackPlusRemainder.substring(lwidth + length);

        return {
            "string": payload,
            "remainder": remainder
        }
    }
}

function removeLeftPad(lPaddedNum) {
    if (lPaddedNum && typeof lPaddedNum === "string") {
        while (lPaddedNum.indexOf("0") === 0) {
            lPaddedNum = lPaddedNum.substring(1);
        }
        return lPaddedNum;
    }
}

function extractSecurityErrorMessage(string) {
    if (string === null || string === undefined) {
        return null;
    }

    var parts = string.split(NUL);
    var message = parts[parts.length - 1];
    if (message.indexOf(EOT) !== -1) {
        message = message.split(EOT)[0];
    }

    return message;
}

module.exports.unLPack = unLPack;
module.exports.unSPack = unSPack;
module.exports.popSPack = popSPack;
module.exports.popLPack = popLPack;
module.exports.extractSecurityErrorMessage = extractSecurityErrorMessage;
