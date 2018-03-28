#!/usr/bin/env node

/*
 * Pharmacy Site Addition ie/ Outpatient Pharmacy's -- OUTPATIENT SITEs
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
 * IMPORTANT: manual changes to required in VDM
 *   last_narcotic_number_issued/ib_service_section/last_prescription_number_issued
 * made optional. 
 *
 * TODO: see fuller definitions particularly on narcotic fields (ex/ methadone_program)
 * in clone setup.
 */
const outpatientSite = {

    "type": "Outpatient_Site-59",

    "name": "NODEVISTA",
    
    "site_number": "111NV",

    "shall_computer_assign_rx_numbers": true,
    
    "cprs_ordering_institution": [ 
    
        {
            "cprs_ordering_institution": { "id": facilityId }
        }
        
    ],
    
    "related_institution": { "id": facilityId },
    
    "narcotics_numbered_differently": false,
    
    "narcotic_lower_bound": 1,
    
    "narcotic_upper_bound": 1000000,
    
    "prescription_number_lower_bound": 1,
    
    "prescription_number_upper_bound": 1000000,
    
    "inactive_date": { "value": "2017-12-31T00:00:00Z", "type": "xsd:date" }
    
};

let res = fileman.lookupBy01(db, "59", outpatientSite.name, false);
if (res.length === 0) {
    let res = VDM.create(outpatientSite);
}
else {
    console.log("Out Patient Site %s exists - not reinserting", outpatientSite.name);
}

db.close();
