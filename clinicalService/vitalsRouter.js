#!/usr/bin/env node

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status');
const logger = require('./logger.js');
const utils = require('./utils');
const InvalidParametersError = require('./errors/invalidParametersError');
const clinicalService = require('./clinicalService');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function validateVitalId(vitalId) {
    let paramErr;
    if (!vitalId) {
        paramErr = 'Invalid parameter - missing id';
    } else if (!/120_5-\d+/g.test(vitalId)) {
        paramErr = 'Invalid parameter - id must be in the form of 120_5-{IEN}';
    }

    return paramErr;
}

function validateReason(reason) {
    return reason === 'INCORRECT DATE/TIME' ||
        reason === 'INCORRECT READING' ||
        reason === 'INCORRECT PATIENT' ||
        reason === 'INVALID RECORD';
}

/**
 * /vitals
 *  POST:
 *      Creates a new vital.
 *      produces: application/json
 *      parameters:
 *          @param {Object} args Create vital arguments.
 *          @param {Date} args.vitalsTakenDateTime Vitals taken date time.
 *          @param {String} args.vitalType Vital type identifier.
 *          @param {String} args.hospitalLocation Hospital location identifier.
 *          @param {String} args.value Vital value.
 *          @param {String} args.units Units value.
 *          @param {String=} args.enteredBy Entered by identifier. Defaults to user.
 *          @param {Date=} args.vitalsEnteredDateTime Vitals entered date time. Defaults to T.
 *          @param {String=} args.supplementalO2 Supplemental O2.
 *          @param {Array=} args.qualifiers List of qualifier identifiers.
 *
 *      responses:
 *          201: new created vital
 *          400: invalid parameters produce a bad request
 */
router.post('/',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'VitalsService', 'create', [req.body]).then((result) => {
            res.status(HttpStatus.CREATED).send(result);
        }).catch((err) => {
            next(err);
        });
    });

 /**
 * /vital/mostRecent
 *  GET:
 *      List of most recent vitals within start and stop date/times.
 *
 *      If no start and stop dates are indicated, the most recent are returned.
 *
 *      If no start date is passed then the start date is set to a time before records were collected.
 *
 *      If no end date is passed then the start date is also the end date and if there's no start date, then end date is the current date time.
 *
 *
 *      produces: application/json
 *
 *      @param {String=} startDate Start date in the form of YYYY-MM-DDThh:mm:ss (ISO_8601).
 *      @param {String=} endDate End date in the form of YYYY-MM-DDThh:mm:ss (ISO_8601)
 *
 *      responses:
 *          200: List of all vitals associated with a patient
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.get('/mostRecent/',
    (req, res, next) => {
        let startDate = req.params.startDate;
        let endDate = req.params.endDate;

        try {
            if (startDate) {
                startDate = new Date(startDate);
            }

            if (endDate) {
                endDate = new Date(endDate);
            }
        } catch (e) {
            next(e);
            return;
        }

        clinicalService.callService(utils.toContext(req), 'VitalsService', 'getMostRecentVitals').then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /vital/:id
 *  GET:
 *      Retrieves an vital description
 *      produces: application/json
 *      parameters:
 *          @param {String} id Vital identifier.
 *
 *      responses:
 *          200: Vital description
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.get('/:id',
    (req, res, next) => {
        const vitalId = req.params.id;

        const paramErr = validateVitalId(vitalId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'VitalsService', 'describe', [vitalId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /vital
 *  GET:
 *      Retrieves a list of all vitals associated with a patient
 *
 *      If no start and stop dates are indicated, all vitals are returned.
 *
 *      If no start date is passed then the start date is set to a time before records were collected.
 *
 *      If no end date is passed then the start date is also the end date and if there's no start date, then end date is the current date time.
 *
 *      produces: application/json
 *
 *      @param {String=} startDate Start date in the form of YYYY-MM-DDThh:mm:ss (ISO_8601).
 *      @param {String=} endDate End date in the form of YYYY-MM-DDThh:mm:ss (ISO_8601)
 *
 *      responses:
 *          200: List of all vitals associated with a patient
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.get('/',
    (req, res, next) => {
        let startDate = req.params.startDate;
        let endDate = req.params.endDate;

        try {
            if (startDate) {
                startDate = new Date(startDate);
            }

            if (endDate) {
                endDate = new Date(endDate);
            }
        } catch (e) {
            next(e);
            return;
        }

        clinicalService.callService(utils.toContext(req), 'VitalsService', 'list').then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /vital/remove
 *  PUT:
 *      Removes a vital and marks it as entered in error.
 *      produces: application/json
 *      parameters:
 *      @param {String} vitalId Vital identifier.
 *      @param {enum} reason Reason for removal. Possible values: INCORRECT DATE/TIME, INCORRECT READING, INCORRECT PATIENT, INVALID RECORD
 *
 *      responses:
 *          200: Removed allergy.
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.put('/remove',
    (req, res, next) => {


        const vitalId = req.body.id;
        const reason = req.body.reason;

        let paramErr = validateVitalId(vitalId);

        if (!paramErr) {
            if (!reason) {
                paramErr = 'Invalid parameter - No reason supplied';
            } else if (!validateReason(reason)) {
                paramErr = `Invalid parameter - Supplied reason is invalid: ${reason}`;
            }
        }

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'VitalsService', 'remove', [vitalId, reason]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

module.exports = router;
