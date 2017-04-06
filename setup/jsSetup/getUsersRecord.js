#!/usr/bin/env node

'use strict';

const VDM = require('../../../VDM/prototypes/vdm');
const vdmUtils = require('../../../VDM/prototypes/vdmUtils');
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

/*  SYSTEM, MANAGER (61)
    ALEXANDER,ROBERT (62)
    SMITH,MARY (63)
    CLERK,JOE (64)
    POSTMASTER (.5)
*/
//const userIENs = ['61', '62', '63', '64', '.5'];
const userIENs = ['61', '62', '63', '64'];

const fieldsToRemove = ['id', 'file_manager_access_code',
    'name_components', 'date_verify_code_last_changed', 'date_entered',
    'last_signon_date_time', 'last_signon_date_time',
    'multiple_signon_limit', 'xus_logon_attempt_count', 'xus_active_user',
    'date_esig_last_changed', 'entry_last_edit_date',
    'creator', 'access_code', 'verify_code', 'last_option_accessed', 'timestamp'];

const requiredFields = ['type', 'name', 'service_section'];

// Util function to print full obj tree
const printResult = function printResult(obj) {
    console.log(util.inspect(obj, {
        depth: null,
        colors: true,
    }));
};

// recursively remove all label tag
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

let userRecords = '';
// retrieve user record from nodeVistA
_.each(userIENs, (id) => {
    let newPersonJSON = {};
    try {
        newPersonJSON = VDM.describe(`200-${id}`);
    } catch (e) {
        console.log(`Error retrieving user 200-${id}`);
    }

    // check minimum required fields fto create new user
    _.each(requiredFields, (field) => {
        if (_.isEmpty(newPersonJSON[field])) {
            throw new Error(`Missing required field '${field}' for user id 200-${id}`);
        }
    });

    // remove label tag
    _.each(newPersonJSON, (element, key) => {
        nextLevel(element);
    });

    // remove system generated fields
    _.each(fieldsToRemove, (field) => {
        delete newPersonJSON[field];
    });

    _.isUndefined(newPersonJSON.restrict_patient_selection) ? 'NO' : 'YES';
    newPersonJSON.restrict_patient_selection = (newPersonJSON.restrict_patient_selection === 'true') ? "YES" : "NO";

    // userRecords += `${util.inspect(newPersonJSON, { depth: null }, 'utf-8' )},\r\n`;
    userRecords += `${JSON.stringify(newPersonJSON)},`;
    console.log(`User record for ${newPersonJSON.name} (${id}) retrived`);
    // printResult(userRecords);
});

fs.writeFileSync('./data.json', `[${userRecords.slice(0, -1)}]`, 'utf-8');

db.close();

