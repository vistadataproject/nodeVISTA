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
const fileman = require('../../../../VDM/prototypes/fileman');
const VDM = require('../../../../VDM/prototypes/vdm');
const vdmUtils = require('../../../../VDM/prototypes/vdmUtils');
const testUtils = require('../../../../VDM/prototypes/testUtils');
const vdmModel = require('../../../../VDM/prototypes/pharmacy/vdmPharmacyModel').vdmModel;

process.env.gtmroutines = `${process.env.gtmroutines} ${vdmUtils.getVdmPath()}`;

var db = new nodem.Gtm();
db.open();
VDM.setDBAndModel(db, vdmModel);
var userId = testUtils.lookupUserIdByName(db, "MANAGER,SYSTEM");
var facilityId = testUtils.lookupFacilityIdByName(db, "VISTA HEALTH CARE");
VDM.setUserAndFacility(userId, facilityId);

process.on('uncaughtException', function(err) {
  db.close();

  console.trace('Uncaught Exception:\n', err);

  process.exit(1);
});

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
    console.log(res);
}
else {
    console.log("Pharmacy Site %s already updated. Not redoing.", pharmacySystem.name);
}

db.close();
