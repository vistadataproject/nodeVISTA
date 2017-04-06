#!/usr/bin/env node

'use strict';

const VDM = require('../../../VDM/prototypes/vdm');
const vdmUtils = require('../../../VDM/prototypes/vdmUtils');
const vdmNonClinicalModel = require('./vdmNewPersonModel').vdmModel;
const _ = require('lodash');
const nodem = require('nodem');

// todo: point this mvdm path
// todo: move this non-clinical
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

// delete users based on the 200-ids in VistA - array format
// const usersId = [66, 67, 68, 69, 70];
const usersId = _.range(62, 66);

_.each(usersId, (id) => {
    try {
        const res = VDM.delete({
            type: 'New_Person-200',
            id: `200-${id}`,
        });
        const message = (res) ? `User id (${id}) deleted!` : `Error deleting user ${id}`;
        console.log(message);
    } catch (e) {
        console.log(`Unable to delete user ${id} due to error ${e}`);
    }
});

db.close();
