#!/usr/bin/env node

'use strict';

const VDM = require('../../../VDM/prototypes/vdm');
const vdmUtils = require('../../../VDM/prototypes/vdmUtils');
const testUtils = require('../../../VDM/prototypes/testUtils');
const vdmNonClinicalModel = require('./vdmNewPersonModel').vdmModel;
const _ = require('lodash');
const fs = require('fs');
const nodem = require('nodem');
const util = require('util');

// sets the path for all mumps GT.M routines (compiled .m files)
process.env.gtmroutines = `${process.env.gtmroutines} ${vdmUtils.getVdmPath()}`;

const db = new nodem.Gtm();
db.open();

// prevent incomplete exit on exception - always close db
process.on('uncaughtException', (err) => {
    db.close();

    console.log('Uncaught Exception:\n', err);

    process.exit(1);
});

VDM.setDBAndModel(db, vdmNonClinicalModel);
let userId = testUtils.lookupUserIdByName(db, 'ALEXANDER,ROBERT'); // TODO: make this Manager,System
let facilityId = testUtils.lookupFacilityIdByName(db, 'VISTA HEALTH CARE');
VDM.setUserAndFacility(userId, facilityId); // must setup user (DUZ) when creating ELSE creator is 0

// var newPerson = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
// retrieve MANAGER,SYSTEM (61) record from nodeVistA
const newPersonJSON = VDM.describe('200-61');

const removeLabel = function removeLabel(obj) {
    const newObj = obj;
    return delete newObj.label;
};

const nextLevel = function nextLevel(obj) {
    if (_.isEmpty(obj)) return obj;
    if (_.isArray(obj) || _.isObject(obj)) {
        removeLabel(obj);
        _.each(obj, (element) => {
            nextLevel(element);
        });
    }
    return obj;
};

_.each(newPersonJSON, (element, key) => {
    nextLevel(element);
});

delete newPersonJSON.id;
delete newPersonJSON.file_manager_access_code;
newPersonJSON.name = "REALLY,NEW"; // want a new name - shouldn't have two with same name (but it is possible)
newPersonJSON.initial = "NR";
newPersonJSON.access_code = 'newaccess1'; // NB: can't be same as someone else's access code
newPersonJSON.verify_code = '1doc!@#$';

const newPersonJSON1 = { 
  type: 'New_Person-200',
  name: 'REALLY,NEW',
  initial: 'NR',
  access_code: 'newaccess1',
  sex: 'MALE',
  ssn: '900000010',
  terminal_type_last_used: { id: '3_2-91' },
  // name_components: { id: '20-60' },
  verify_code: '1doc!@#$',
  // date_verify_code_last_changed: '64310,72739',
  signature_block_printed_name: 'NEW REALLY',
  service_section: { id: '49-1' },
  // date_entered: { value: '2017-01-27', type: 'xsd:date' },
  // creator: { id: '200-1' },
  preferred_editor: { id: '1_2-2' }
};

console.log(util.inspect(newPersonJSON1, {
    depth: null,
    colors: true,
}));

VDM.create(newPersonJSON1);

process.on('error', () => {
    db.close();
});

process.on('exit', () => {
    db.close();
});

process.on('SIGINT', () => {
    db.close();
});
