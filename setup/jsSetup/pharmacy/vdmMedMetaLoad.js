#!/usr/bin/env node

/*
 * Loading Pharmacy Meta to allow nodeVISTA Pharmacy to work. Includes Orderables and Drugs
 *
 * Note: tests for VDM-based loading of this meta in vdmMedMetaLoad-spec
 *
 * (c) 2017 VISTA Data Project
 */

'use strict';

/*
 * Basic setup
 */
const fs = require('fs');
const nodem = require('nodem');
const fileman = require('../fileman');
const testUtils = require('../testUtils');
const VDM = require('../vdm');
const vdmModel = require('mvdm/pharmacy/vdmPharmacyModel').vdmModel;

const db = new nodem.Gtm();
db.open();

VDM.setDBAndModel(db, vdmModel);
// will show in Activity Log for DRUG (50) once load
var userId = testUtils.lookupUserIdByName(db, "MANAGER,SYSTEM"); // MANAGER,SYSTEM
var facilityId = testUtils.lookupFacilityIdByName(db, "VISTA HEALTH CARE");
VDM.setUserAndFacility(userId, facilityId);

process.on('uncaughtException', function(err) {
  db.close();

  console.trace('Uncaught Exception:\n', err);

  process.exit(1);
});

process.env.gtmroutines = process.env.gtmroutines + ' ..'; // make VDP MUMPS available

// Doing fully explicit and not re-entrant loading as issue with 50 delete with UPDATE^DIE (issue openned)
const MEDMETAFILES = ["50", "50.7", "101.43"];
MEDMETAFILES.forEach(function(value) { fileman.emptyFile(db, value); });
console.log("META FILES EMPTIED FULLY", MEDMETAFILES);

let METATEMPLATES = JSON.parse(fs.readFileSync("medMetaTemplates.json"))
console.log("META TEMPLATES loaded");

let METAATORTEMPLATES = JSON.parse(fs.readFileSync("medMetaAtorTemplates.json"));
console.log("META for Atorvastatin loaded");

let totalLoaded = 0;

// 50.7 sets up 101.43 by side effect (but doesn't delete it by side effect of its deletion!)
let _50_7s = METATEMPLATES["50_7"].concat(METAATORTEMPLATES["50_7"]);
_50_7s.forEach(function(resource) {
    resource.inactive_date = {"value": "2020-12-31", "type": "xsd:date"};
    let concrete = testUtils.fillTemplateValues(db, resource);
    let res = VDM.create(concrete);
    console.log("Created %s of type %s", res.id, res.type);
    totalLoaded += 1;
});

// Must come after 50_7 as depends on it
/*
 * Issue: empty doesn't get things back to 1 - and 'number' is first field. Need to fill in?
 */
let _50s = METATEMPLATES["50"].concat(METAATORTEMPLATES["50"]);
_50s.forEach(function(resource) {
    let concrete = testUtils.fillTemplateValues(db, resource);
    let res = VDM.create(concrete);
    console.log("Created %s of type %s", res.id, res.type);
    totalLoaded += 1;
});

console.log("Finished - meta loaded:", totalLoaded);

db.close()

