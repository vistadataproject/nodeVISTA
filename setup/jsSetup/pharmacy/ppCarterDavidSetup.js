#!/usr/bin/env node

/*
 * Pharmacy Patient Addition - specifically for David Carter
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

const db = new nodem.Gtm();
db.open();

process.on('uncaughtException', function(err) {
    db.close();

    console.trace('Uncaught Exception in Pharmacy Patient Addition:\n', err);

    process.exit(1);
});

VDM.setDBAndModel(db, vdmModel);
const userId = testUtils.lookupUserIdByName(db, "MANAGER,SYSTEM");
const facilityId = testUtils.lookupFacilityIdByName(db, "VISTA HEALTH CARE");
VDM.setUserAndFacility(userId, facilityId);
const patientId = testUtils.lookupPatientIdByName(db, 'CARTER,DAVID');

function addPharmacyPatient(patientId) {

    const patientIEN = patientId.split("-")[1];

    let res = fileman.lookupBy01(db, "55", "2-" + patientIEN, false);

    if (res.length === 0) {
 
        const pp = {

            "type": "Pharmacy_Patient-55",

            "ien": patientIEN, // force dinum

            "name": {"id": "2-" + patientIEN}

        };
    
        let res = VDM.create(pp);
        let ppId = res.id;
        console.log("Pharmacy Patient %s created", res.id);
 
    }
    else
        console.log("Pharmacy Patient already exists - no need to recreate");

}

addPharmacyPatient(patientId);

db.close();
