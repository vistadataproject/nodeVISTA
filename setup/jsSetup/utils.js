'use strict';

const fileman = require('mvdm/fileman');

/*
 * Portable lookup for userId and facilityId
 *
 * User Name Ex: "ALEXANDER,ROBERT"
 * Facility Name Ex: "VISTA HEALTH CARE"
 *
 * Notes:
 * - DUZ is parseInt(userId.split("-")[1])
 * - vdmUtils.js has "userFromId" etc which
 * goes the other way. Will replace all of these once User and Facility
 * become first class MVDM objects.
 * - could nix facilityByName and just get from
 * user using 'DESCRIBE 200_02 IN 200-...
 */
function lookupUserIdByName(db, name) {
    return fileman.lookupBy01(db, "200", name).id;
}

function lookupFacilityIdByName(db, name) {
    return fileman.lookupBy01(db, "4", name).id;
}

function lookupPatientIdByName(db, name) {
    return fileman.lookupBy01(db, "2", name).id;
}

module.exports = {
    lookupUserIdByName,
    lookupFacilityIdByName,
    lookupPatientIdByName,
};
