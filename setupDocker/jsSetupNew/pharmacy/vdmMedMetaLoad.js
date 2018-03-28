#!/usr/bin/env node

/*
 * Loading Pharmacy Meta to allow nodeVISTA Pharmacy to work. Includes Orderables and Drugs
 *
 * Note: tests for VDM-based loading of this meta in vdmMedMetaLoad-spec
 *
 * (c) 2017 VISTA Data Project
 */

'use strict';

const fs = require('fs');
const _ = require('lodash');
const nodem = require('nodem');
const fileman = require('mvdm/fileman');
const VDM = require('mvdm/vdm');
const vdmUtils = require('mvdm/vdmUtils');
const testUtils = require('mvdm/testUtils');
const vdmModel = require('mvdm/pharmacy/vdmPharmacyModel').vdmModel;

// sets the path for all mumps GT.M routines (compiled .m files)
process.env.gtmroutines = `${process.env.gtmroutines} ${vdmUtils.getVdmPath()}`;

const db = new nodem.Gtm();
db.open();

process.on('uncaughtException', function(err) {
  db.close();

  console.trace('Uncaught Exception:\n', err);

  process.exit(1);
});


VDM.setDBAndModel(db, vdmModel);
// will show in Activity Log for DRUG (50) once load
let userId = testUtils.lookupUserIdByName(db, "USER,ONE"); // USER,ONE
let facilityId = testUtils.lookupFacilityIdByName(db, "VISTA HEALTH CARE");
VDM.setUserAndFacility(userId, facilityId);

console.log("\nLoading Pharmacy Meta - Orderables and Drug Definitions")

// Doing fully explicit and not re-entrant loading as issue with 50 delete with UPDATE^DIE (issue openned)
const MEDMETAFILES = ["50", "50.7", "101.43"];
MEDMETAFILES.forEach(function(value) { fileman.emptyFile(db, value); });
console.log("\tMETA FILES EMPTIED FULLY", MEDMETAFILES);

let METATEMPLATES = JSON.parse(fs.readFileSync("medMetaTemplates.json"))
console.log("\tMETA TEMPLATES loaded");

let METAATORTEMPLATES = JSON.parse(fs.readFileSync("medMetaAtorTemplates.json"));
console.log("\tMETA for Atorvastatin loaded");

console.log("\tInsertings Drugs and Orderables ...");

// 50.7 sets up 101.43 by side effect (but doesn't delete it by side effect of its deletion!)
let _50_7s = METATEMPLATES["50_7"].concat(METAATORTEMPLATES["50_7"]);
let totalPOLoaded = 0;
_50_7s.forEach(function(resource) {
    resource.inactive_date = {"value": "2020-12-31", "type": "xsd:date"};
    let concrete = testUtils.fillTemplateValues(db, resource);
    let res = VDM.create(concrete);
    totalPOLoaded += 1;
});

// Must come after 50_7 as depends on it
/*
 * Issue: empty doesn't get things back to 1 - and 'number' is first field. Need to fill in?
 */
let _50s = METATEMPLATES["50"].concat(METAATORTEMPLATES["50"]);
let totalDrugLoaded = 0;
_50s.forEach(function(resource) {
    let concrete = testUtils.fillTemplateValues(db, resource);
    let res = VDM.create(concrete);
    totalDrugLoaded += 1;
});

console.log("Finished - Pharmacy meta loaded: drug (50) - %d, Pharmacy Orderables (50.7) - %d\n", totalDrugLoaded, totalPOLoaded);

db.close()

