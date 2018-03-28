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
 * TODO: move Clinic in here once confirm roll and scroll NOT needed
 *        OSEHRASetup.createClinic(VistA,'VISTA HEALTH CARE','VHC','M')
 *
 * TODO: Mailman Site Parameters (4.3) reference default institution too. Do if/when setup MailMan
 */
function setupInstitution(institutionName, stationNumber) {

    /*
     * Institution - bare minimum (no domain, no address ...) has name, station, if national, npi and agency
     *
     * Don't create two copies!
     */
    let institutionRef;
    try {
        institutionRef = VDM.lookupIdByLabel("Institution-4", institutionName);

    } catch(e) { // no entry

        let agencyRef = VDM.lookupIdByLabel("Agency-4_11", "VA");
        // shouldn't be NATIONAL status (as 999 not national!) but using for testing
        let MEANINGLESSNPI = "1234567890";
        let res = VDM.create({type: "Institution-4", name: institutionName, station_number: stationNumber, status: "National", "npi": MEANINGLESSNPI, pointer_to_agency: agencyRef});
        institutionRef = { id: res.id, label: res.name };

    }

    console.log("Institution being filled in", institutionRef, "with station number mcd, local MPI et al");

    // 2. station number of one and only (FOIA) station number entry must be stationNumber
    VDM.update({ id: '389_9-1', type: 'Station_Number_time_Sensitive-389_9', "reference_number": stationNumber, station_number: stationNumber});

    // 3. default institution of KSP must be INSTITUTION
    VDM.update({id: '8989_3-1', type: "Kernel_System_Parameters-8989_3", default_institution: institutionRef});

    // 4. Medical Center Division (one and only) point to INSTITUTION
    VDM.update({id: '40_8-1', type: "Medical_Center_Division-40_8", "name": institutionName, "institution_file_pointer": institutionRef, facility_number: stationNumber });

    // 5. MPI LOCAL - one and only entry use STATION NUMBER
    // Note: not resetting check sums or ranges ... may do later so totally clean setup
    VDM.update({id: "984_1-1", type: "Master_Patient_Index_local_Numbers-984_1", site_id_number: stationNumber} );

}

const INSTITUTION_NAME = "VISTA HEALTH CARE";
const STATION_NUMBER = "999";
setupInstitution(INSTITUTION_NAME, STATION_NUMBER);
