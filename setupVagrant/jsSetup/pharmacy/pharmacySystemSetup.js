#!/usr/bin/env node

/*
 * Pharmacy System Setup (Partial)
 * ... OSEHRA comes with "SOFTWARE SYSTEM" setup. They don't appear to do it explicitly. Need to change
 * the .01 name and link Pharmacy System to OUTPATIENT SITE setup for nodeVISTA
 *
 * (c) 2017 VISTA Data Project
 */

'use strict';

const _ = require('lodash');
const nodem = require('nodem');
const fileman = require('mvdm/fileman');
const VDM = require('mvdm/vdm');
const vdmUtils = require('mvdm/vdmUtils');
const testUtils = require('mvdm/testUtils');
const vdmModel = require('mvdm/pharmacy/vdmPharmacyModel').vdmModel;

let db = new nodem.Gtm();
db.open();

process.on('uncaughtException', function(err) {
  db.close();

  console.trace('Uncaught Exception:\n', err);

  process.exit(1);
});

VDM.setDBAndModel(db, vdmModel);
let userId = testUtils.lookupUserIdByName(db, "MANAGER,SYSTEM");
let facilityId = testUtils.lookupFacilityIdByName(db, "VISTA HEALTH CARE");
VDM.setUserAndFacility(userId, facilityId);

/*
 * Just Tweek default Pharmacy System of FOIA - will do fully later
 */
const pharmacySystem = {

    "id": "59_7-1",

    "type": "Pharmacy_System-59_7",

    "site_name": "VISTA HEALTH CARE", // resetting

    "default_outpatient_site": { "id": "59-1", "label": "VISTA HEALTH CARE" } // should really be VISTA HEALTH CARE PHARMACY

};

let res = fileman.lookupBy01(db, "59_7", pharmacySystem.site_name, false);
if (res.length === 0) {
    let res = VDM.update(pharmacySystem);
}
else {
    console.log("Pharmacy Site %s already updated. Not redoing.", pharmacySystem.site_name);
}

db.close();
