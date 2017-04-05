#!/usr/bin/env node

/*
 * Pharmacy Patient Addition
 *
 * (c) 2016 VISTA Data Project
 */

'use strict';

var _ = require('lodash');
var nodem = require('nodem');
var fileman = require('../fileman');
var testUtils = require('../testUtils');
var VDM = require('../vdm');
var vdmModel = require('./vdmPharmacyModel').vdmModel;

process.env.gtmroutines = process.env.gtmroutines + ' ..'; // make VDP MUMPS available

var db = new nodem.Gtm();
db.open();
VDM.setDBAndModel(db, vdmModel);
var userId = testUtils.lookupUserIdByName(db, "ALEXANDER,ROBERT");
var facilityId = testUtils.lookupFacilityIdByName(db, "VISTA HEALTH CARE");
VDM.setUserAndFacility(userId, facilityId);

process.on('uncaughtException', function(err) {
  db.close();

  console.trace('Uncaught Exception:\n', err);

  process.exit(1);
});

function addPharmacyPatient(patientIEN) {

    var res = fileman.lookupBy01(db, "55", "2-" + patientIEN, false);
    if (res.length === 0) {
 
        var pp = {

            "type": "Pharmacy_Patient-55",

            "ien": patientIEN, // force dinum

            "name": {"id": "2-" + patientIEN}

        };
    
        var res = VDM.create(pp);
        var ppId = res.id;
        console.log("Pharmacy Patient %s create", res.id);
 
    }
    else
        console.log("Pharmacy Patient already exists - no need to recreate");

}

// CHANGE TO LOOKUP ROBERT ALEXANDER
addPharmacyPatient(25);

db.close();
