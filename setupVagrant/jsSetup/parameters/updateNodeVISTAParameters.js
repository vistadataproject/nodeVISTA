#!/usr/bin/env node

'use strict';

const util = require('util');
const nodem = require('nodem');
const _ = require('lodash');
const VDM = require('mvdm/vdm');
var VDMUtils = require('mvdm/vdmUtils');
const fileman = require('mvdm/fileman');
const ParameterService = require('mvdm/parameterService');
const nodeVISTAParameters = require('./nodeVISTAParameters');

/**
 * The 'nodeVISTAParameters' reference should hold an array of JSON objects, each with the following format:
 *
 * {
 *     "name": <<PARAMETER NAME>>,
 *     "entity": <<ENTITY TO SET>>,
 *     "instance": <<INSTANCE FOR THE PARAMETER>>,
 *     "value": <<VALUE TO SET>>
 * }
 *
 * You can also add 'delete' as a command line argument to the script to delete/unset/undo all the
 * changes specified in the nodeVISTAParameters.json file.
 *
 * Ex: node updateNodeVISTAParameters.js delete
 */

const parameterAction = process.argv[2] || 'update';

// =========================================== UTILITIES ===========================================
const ENTITY_FILETYPE_MAP = _.invert(ParameterService.ENTITY_CODE_MAP);
const PARAMETER_FUNCTION_MAP = {
    delete: (param, options) => {
        ParameterService.delete(param.name, options);
    },
    update: (param, options) => {
        ParameterService.update(param.name, param.value, options);
    },
};

const lookupIdByName = (db, fileType, name) => {
    return fileman.lookupBy01(db, fileType, name).id;
}

let lookupItemIdByName = null;
let lookupUserIdByName = null;
let lookupFacilityIdByName = null;

const getEntity = (options) => {
    // If this is a named entity, we split out the data
    const entityElements = (options.entity || '').split('^');
    let entity = entityElements[0];

    if (entityElements.length > 1) {
        const fileType = ENTITY_FILETYPE_MAP[entityElements[0]];
        entity = lookupItemIdByName(fileType, entityElements[1]);
    }

    return ParameterService.convertFileToEntity(entity);
}
// =================================================================================================
//
const setupParameterService = () => {
    console.log('Setting up Parameter Service...');

    // Setup the Nodem driver to the GT.M instance
    const pathElements = [process.env.gtmroutines, VDMUtils.getVdmPath()];
    process.env.gtmroutines = pathElements.join(' ');

    const db = new nodem.Gtm();
    db.open();

    process.on('exit', () => {
        console.log('Closing nodem driver...');
        db.close();
    });

    process.on('SIGINT', () => {
        console.log('Closing nodem driver...');
        db.close();
    });

    // Configure the lookup functions with a closure on the db in the lexical scope
    lookupItemIdByName = _.partial(lookupIdByName, db);
    lookupUserIdByName = _.partial(lookupIdByName, db, '200');
    lookupFacilityIdByName = _.partial(lookupIdByName, db, '4');

    // Setup VDM with user 'MANAGER,SYSTEM' and facility 'VISTA HEALTH CARE'
    const userId = lookupUserIdByName('MANAGER,SYSTEM');
    const facilityId = lookupFacilityIdByName('VISTA HEALTH CARE');
    console.log(`Setting user to ${userId}, facility to ${facilityId}`);

    VDM.setDBAndModel(db, []);
    VDM.setUserAndFacility(userId, facilityId);

    // Initialize the Parameter Service
    ParameterService.setDB(db);
    ParameterService.setDebug(true);
};

const runParameters = () => {
    console.log(`Performing ${parameterAction} on ${nodeVISTAParameters.length} parameters in VISTA using Parameter Service...`);
    const parameterFunction = PARAMETER_FUNCTION_MAP[parameterAction];

    nodeVISTAParameters.forEach((param) => {
        try {
            // Just in case, convert any file type identifiers to appropriate parameter service entities.
            let options = _.omit(param, 'name', 'value');
            const entity = getEntity(options);

            if (!_.isUndefined(entity)) {
                options = _.extend(options, { entity });
            }

            const valueString = parameterAction === 'update' ? `(value = ${param.value}) ` : '';
            console.log(`Running ${parameterAction} on ${param.name} ${valueString}with the following options:`);
            console.log(util.inspect(options, { depth: null, colors: true }));
            parameterFunction.call(null, param, options);
        } catch (e) {
            console.log(`Error setting ${param.name}: ${e.message}`);
        }
    });
};

setupParameterService();
runParameters();
