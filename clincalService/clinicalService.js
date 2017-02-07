#!/usr/bin/env node

'use strict';

const config = require('./config.js');
const logger = require('./logger.js');
const nodem = require('nodem');
const fileman = require('mvdm/fileman');
const ClinicalServiceFactory = require('mvdm/clinicalServiceFactory');

class ClinicalService {
    constructor() {
        const db = new nodem.Gtm();
        db.open();

        const userId = fileman.lookupBy01(db, '200', config.user).id;
        const facilityId = fileman.lookupBy01(db, '4', config.facility).id;

        this.clinicalServiceFactory = new ClinicalServiceFactory(db, userId, facilityId);

        this.services = {};

        process.on('uncaughtException', (err) => {
            if (!db) {
                db.close();
            }

            logger.error('Uncaught Exception:\n', err.stack);

            process.exit(1);
        });

        // node shutdown
        process.on('exit', () => {
            if (!db) {
                db.close();
            }
        });
    }

    selectPatient(patientId) {
        this.clinicalServiceFactory.selectPatient(patientId);
        this.services = {};
    }

    getAllergyService() {
        if (!this.servies.allergyService) {
            this.services.allergyService = this.clinicalServiceFactory.createAllergyService();
        }
    }

    getProblemService() {
        if (!this.services.problemService) {
            this.services.problemService = this.clinicalServiceFactory.createProblemService();
        }

        return this.services.problemService;
    }

    getVitalsService() {
        if (!this.services.vitalsService) {
            this.services.vitalsService = this.clinicalServiceFactory.createVitalsService();
        }

        return this.services.vitalsService;
    }

}

module.exports = new ClinicalService();
