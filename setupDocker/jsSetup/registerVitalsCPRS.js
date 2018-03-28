'use strict';

const nodem = require('nodem');
const parameterService = require('mvdm/parameterService');
const _ = require('lodash');

const db = new nodem.Gtm();
const DEBUG = true;
db.open();

parameterService.setDB(db);
parameterService.setDebug(DEBUG);
parameterService.printDebug('starting db');

process.on('uncaughtException', (err) => {
    db.close();
    console.log(err);
    parameterService.printDebug('Uncaught Exception:\n', err);
    process.exit(1);
});

process.on('exit', () => {
    parameterService.printDebug('exiting db');
});

const parameterList = [{
    type: 'add',
    description: 'complete vitals setup',
    parameterName: 'GMV TEMPLATE',
    entity: 'SYS',
    instance: 'DAILY VITALS',
    value: 'TPR, BP|1:0;5:0;3:0;2:0;21:0;8:0;22:0;9:0',
}, {
    type: 'add',
    description: 'complete vitals setup',
    parameterName: 'XU522',
    entity: 'SYS',
    instance: 1,
    value: 'N',
}, {
    type: 'addChangeDelete',
    description: 'register vitals CPRS',
    parameterName: 'GMV DLL VERSION',
    entity: 'SYS',
    instance: 'GMV_VITALSVIEWENTER.DLL:v. 08/11/09 15:00',
    value: 1,
}, {
    type: 'addChangeDelete',
    description: 'register vitals CPRS',
    parameterName: 'GMV DLL VERSION',
    entity: 'SYS',
    instance: 'GMV_VITALSVIEWENTER.DLL:v. 01/21/11 12:52',
    value: 1,
}, {
    type: 'addChangeDelete',
    description: 'register vitals CPRS',
    parameterName: 'GMV GUI VERSION',
    entity: 'SYS',
    instance: 'VITALSMANAGER.EXE:5.0.26.1',
    value: 1,
}];

const createAvailableOptions = function createAvailableOptions(parameter) {
    const availableOptions = ['entity', 'instance'];
    let options = {};
    _.each(availableOptions, (option) => {
        if (parameter[option]) {
            options = _.extend(options, {
                [option]: parameter[option],
            });
        }
    });
    return options;
};

_.each(parameterList, (parameter) => {
    switch (parameter.type) {
        case 'add':
        case 'update':
        case 'addChangeDelete':
            console.log(`running ${parameter.type} with parameter ${parameter.parameterName}`);
            parameterService[parameter.type](parameter.parameterName, parameter.value,
                createAvailableOptions(parameter));
            break;
        case 'get':
            console.log(`running ${parameter.type} with parameter ${parameter.parameterName}`);
            console.log(`result =>${parameterService.get(parameter.parameterName, createAvailableOptions(parameter))}`);
            break;
        default:
            console.log('invalid type');
    }
});

parameterService.printDebug('db close');
db.close();
