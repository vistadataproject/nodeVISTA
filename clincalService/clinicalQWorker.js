#!/usr/bin/env node

'use strict';

const config = require('./config/config.js');
const logger = require('./logger.js');
const nodem = require('nodem');
const vdmUtils = require('mvdm/vdmUtils');
const ClinicalServiceFactory = require('mvdm/clinicalServiceFactory');

let db;
let clincalServiceFactory;

process.on('uncaughtException', (err) => {
    if (db) {
        db.close();
    }

    logger.error('Uncaught Exception:\n', err.stack);

    process.exit(1);
});

/**
 * Connect to VistA system.
 */
function connectToVista() {
    process.env.gtmroutines = `${process.env.gtmroutines} ${vdmUtils.getVdmPath()}`; // make VDP MUMPS available

    db = new nodem.Gtm();
    db.open();
}


function validateMethod(serviceName, service, method) {
    if (!service[method]) {
        throw new Error(`Unsupported method - service ${serviceName} does not support ${method}`);
    }
}

function setServiceContext(context) {
    if (!context.userId || !context.facilityId) {
        throw new Error('Missing required fields userId and/or facilityId');
    }

    // restore user & patient context
    clincalServiceFactory = new ClinicalServiceFactory(db, context.userId, context.facilityId);
    logger.debug(`setServiceContext - creating clinical service factory instance: ${context.userId} ${context.facilityId}`);

    if (context.patientId) {
        clincalServiceFactory.selectPatient(context.patientId);

        logger.debug(`setServiceContext - calling select patient: ${context.patientId}`)
    }
}

connectToVista();

module.exports = function () {
    this.on('start', () => {
        logger.debug('Started clinicalQWorker module process.pid: %s', process.pid);
    });

    // respond to message event
    this.on('message', (messageObj, send, finished) => {
        try {
            let service;

            setServiceContext(messageObj.context);

            // create a service
            if (messageObj.service === 'PatientService' && messageObj.method === 'selectPatient') {
                service = clincalServiceFactory;
            } else if (messageObj.service === 'ProblemService') {
                service = clincalServiceFactory.createProblemService();
            } else if (messageObj.service === 'AllergyService') {
                service = clincalServiceFactory.createAllergyService();
            } else if (messageObj.service === 'VitalsService') {
                service = clincalServiceFactory.createAllergyService();
            }

            // invoke service method with args array
            validateMethod(messageObj.service, service, messageObj.method);
            const res = service[messageObj.method].apply(service, messageObj.args);

            // send response event
            finished({
                type: 'clinicalService',
                data: res,
            });
        } catch (err) {
            logger.error(`Error processing message: ${err.message}`);

            finished({
                type: 'error',
                error: { name: err.name, message: err.message },
            });
        }
    });

    this.on('stop', () => {
        if (db) {
            db.close();
        }
        logger.debug('Stopping rpcWorker process pid: %s ...', process.pid);
    });
};

