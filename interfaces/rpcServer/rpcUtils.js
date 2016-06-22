'use strict';

var math = require("mathjs");
var _ = require("underscore");

/**
 * Unpack an LPacked structure
 *
 * @param lPack the package in the form dd...ddSSS...SSS where dd...dd is the length nDigits long and SSS...SSS is the payload of length dd...dd
 * @param digits number of digits of the length to unpack (needs to be an integer)
 * @returns an object with the "string" payload and the "width" ndigits, or null if not a proper lpack.
 */
function unLPack(lPack, nDigits) {
    var payload = "";
    var length, width;

    if (nDigits && _.isNumber(nDigits)) { // this case makes it easier
        var length = lPack.substring(0, nDigits);
        length = parseInt(removeLeftPad(length)); // this should be the length of the payload
        payload = lPack.subString(nDigits);
        if (payload.length === length) {
            width = nDigits;
        }
    } else { // this is a little harder
        var packedLength = lPack.length;
        var strippedPack = removeLeftPad(lPack); // remove any leading zeros
        var strippedPackLength = strippedPack.length;

        payload = unSPack(strippedPack);
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
 * dd...ddSS...SS where dd...dd is the length of the payload and SS...SS is the payload
 *
 * @param sPack
 * @returns the payload string, or null sPack is not in the proper form
 */
function unSPack(sPack) {
    var packedLength = sPack.length;
    var strippedPack = removeLeftPad(sPack); // remove any leading zeros
    var strippedPackLength = sPack.length;
    var lengthString = "";
    var length, payloadLength, payload;

    for (var i = 1; i <= math.ceil(math.log(packedLength, 10)); i++) {
        lengthString += strippedPack.substring(0, i);
        length = parseInt(lengthString);
        if (length && !isNaN(length) && (length === strippedPackLength - i)) {
            payloadLength = length;
            payload = strippedPack.substring(i);
        }
    }

    if (payloadLength) {
        return payload;
    } else {
        return null;
    }

}

function removeLeftPad(lPaddedNum) {
    while (lPaddedNum.startsWith("0")) {
        lPaddedNum = lPaddedNum.substring (1);
    }
    return lPaddedNum;
}

module.exports.unLPack = unLPack();
module.exports.unSPack = unSPack();
