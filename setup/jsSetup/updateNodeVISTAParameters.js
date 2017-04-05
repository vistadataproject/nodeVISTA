#!/usr/bin/env node

'use strict';

const util = require('util');
const nodem = require('nodem');
const _ = require('lodash');
const VDM = require('mvdm/vdm');
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

const PARAMETER_FUNCTION_MAP = {
    delete: (param, options) => {
        ParameterService.delete(param.name, options);
    },
    update: (param, options) => {
        ParameterService.update(param.name, param.value, options);
    },
};

let db = null;

const setupParameterService = function setupParameterService() {
    console.log('Setting up Parameter Service...');
    db = new nodem.Gtm();
    db.open();

    ParameterService.setDB(db);
    ParameterService.setDebug(true);

    const rpcRunner = new RPCRunner(db);
    rpcRunner.initializeUser(1);
};

const runParameters = function runParameters() {
    console.log(`Performing ${parameterAction} on ${nodeVISTAParameters.length} parameters in VISTA using Parameter Service...`);
    const parameterFunction = PARAMETER_FUNCTION_MAP[parameterAction];

    nodeVISTAParameters.forEach((param) => {
        try {
            // Just in case, convert any file type identifiers to appropriate parameter service entities.
            let options = _.omit(param, 'name', 'value');
            const entity = ParameterService.convertFileToEntity(options.entity);

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

const teardownParameterService = function teardownParameterService() {
    db.close();
};

setupParameterService();
runParameters();
teardownParameterService();
