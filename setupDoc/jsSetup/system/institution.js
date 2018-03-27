#!/usr/bin/env node

'use strict';

const utils = require('./nodeVISTAUtils');
const VDM = require('mvdm/vdm');

utils.init();

/*
 * Taken broadly. Must setup Institution w/station number and supporting cast and reference appropriately:
 *
 * \# | File | Id | Do
 * --- | --- | --- |---
 * 1. | Institution | 4 | See Name and Station Number (999)
 * 2. | Station Number | 389_9 | edit 389_9-1 to 999 (instead of 50/050)
 * 3. | KSP | 8989_3 | Default Institution to new Institution (rest setup elsewhere)
 * 4. | Medical Center Division | 40_8 | edit first to pt to institution and use 999 (ie/ ala station # file)
 * 5. | MASTER PATIENT INDEX | 984_1 | cover 999 - edit one and only entry
 *
 * Replacing Py:
 * - OSEHRASetup.addInstitution(VistA,"VISTA HEALTH CARE","999")
 * - OSEHRASetup.addDivision(VistA,'VISTA MEDICAL CENTER',"6101","999")
 * ... and adding pieces PY was missing.
 *
 * More details see: http://www.hardhats.org/projects/New/InitializeVistA.html
 */
const INSTITUTION_NAME = "VISTA HEALTH CARE";
const STATION_NUMBER = "999";

/*
 * Institution - bare minimum (no domain, no address ...) has name, station, if national, npi and agency
 *
 * Don't create two copies!
 */
let institutionRef;
try {
    institutionRef = VDM.lookupIdByLabel("Institution-4", INSTITUTION_NAME);

} catch(e) { // no entry

    let agencyRef = VDM.lookupIdByLabel("Agency-4_11", "VA");
    // shouldn't be NATIONAL status (as 999 not national!) but using for testing
    let MEANINGLESSNPI = "1234567890";
    let res = VDM.create({type: "Institution-4", name: INSTITUTION_NAME, station_number: STATION_NUMBER, status: "National", "npi": MEANINGLESSNPI, pointer_to_agency: agencyRef});
    institutionRef = { id: res.id, label: res.label };

}

console.log("Institution being filled in", institutionRef, "with station number mcd, local MPI et al");

// 2. station number of one and only (FOIA) station number entry must be STATION_NUMBER
VDM.update({ id: '389_9-1', type: 'Station_Number_time_Sensitive-389_9', "reference_number": STATION_NUMBER, station_number: STATION_NUMBER});

// 3. default institution of KSP must be INSTITUTION
VDM.update({id: '8989_3-1', type: "Kernel_System_Parameters-8989_3", default_institution: institutionRef});

// 4. Medical Center Division (one and only) point to INSTITUTION
VDM.update({id: '40_8-1', type: "Medical_Center_Division-40_8", "name": INSTITUTION_NAME, "institution_file_pointer": institutionRef, facility_number: STATION_NUMBER });

// Not in nonClinical MVDM ... must add (Issue: ...)
// 5. MPI LOCAL - one and only entry use STATION NUMBER
// VDM.update({id: "984_1-1", type: "Master_Patient_Index-", station_number: STATION_NUMBER etc etc});

/*
 * TODO: move Clinic Create in Here
 *
 *     # OSEHRASetup.createClinic(VistA,'VISTA HEALTH CARE','VHC','M')
 *
 * OR DO A PY AFTER JS?
 */
