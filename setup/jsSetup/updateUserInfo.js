#!/usr/bin/env node

'use strict';

// this is a tool to update user info in vista

const VDM = require('../../../VDM/prototypes/vdm');
const vdmUtils = require('../../../VDM/prototypes/vdmUtils');
const testUtils = require('../../../VDM/prototypes/testUtils');
const vdmNonClinicalModel = require('./vdmNewPersonModel').vdmModel;
const _ = require('lodash');
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

// Util function to print full obj tree
const printResult = function printResult(obj) {
    console.log(util.inspect(obj, {
        depth: null,
        colors: true,
    }));
};

VDM.setDBAndModel(db, vdmNonClinicalModel);
const userId = testUtils.lookupUserIdByName(db, 'MANAGER,SYSTEM'); // TODO: make this Manager,System
const facilityId = testUtils.lookupFacilityIdByName(db, 'VISTA HEALTH CARE');
VDM.setUserAndFacility(userId, facilityId); // must setup user (DUZ) when creating ELSE creator is 0

// update user id and field to update user info
const person = {
    id: '200-61',
    type: 'New_Person-200',
    file_manager_access_code: '@',
};

printResult(person);
const res = VDM.update(person);
printResult(res);

db.close();

