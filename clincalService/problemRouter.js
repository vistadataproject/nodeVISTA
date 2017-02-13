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
/**
 * /problem
 *  POST:
 *      Creates a new problem.
 *      produces: application/json
 *      parameters:
 *          @param {String} args.diagnosis Diagnosis identifier.
 *          @param {String} args.providerNarrative Problem narrative string (e.g. 'Hypertension').
 *          @param {String} args.problem Problem expression identifier.
 *          @param {String} args.clinic Clinic identifier.
 *          @param {enum} args.problemStatus Status of a problem. Possible values: ACTIVE, INACTIVE.
 *          @param {String} args.snomedCTConceptCode SNOMED CT concept code.
 *          @param {String} args.snomedCTDesignationCode SNMOED CT designation code.
 *          @param {String} args.codingSystem Coding system associated with the problem (e.g. 10D).
 *          @param {enum=} args.condition Problem condition. Possible values: TRANSCRIBED, PERMANENT, HIDDEN. Defaults to PERMANENT.
 *          @param {String=} args.responsibleProvider Responsible provider identifier. Defaults to user.
 *          @param {enum=} args.priority Immediacy value. Possible values: ACUTE, CHRONIC.
 *          @param {Date=} args.onsetDate Date of problem onset.
 *          @param {Date=} args.interestDate Date of interest.
 *          @param {Boolean=} args.uniqueTermRequested Indicates whether a unique term was requested.
 *          @param {String=} args.uniqueTermRequestComment Unique term request comment.
 *          @param {Array=} args.treatmentFactors List of treatment factors. Possible values: SERVICE_CONNECTED, AGENT_ORANGE,
 *                            IONIZING_RADIATION, PERSIAN_GULF, HEAD_AND_OR_NECK_CANCER,
 *                            MILITARY_SEXUAL_TRAUMA, COMBAT_VETERAN, SHIPBOARD_HAZARD_DEFENSE.
 *          @param {Array=} args.comments Problem comments.
 *
 *      responses:
 *          201: new created problem
 *          400: invalid parameters produce a bad request
 */
router.post('/',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'ProblemService', 'create', [req.body]).then((result) => {
            res.status(HttpStatus.CREATED).send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /problem
 *  PUT:
 *      Updates an existing problem.
 *      produces: application/json
 *      parameters:
 *          @param {Object} args Update problem arguments.
 *          @param {String} args.id Problem identifier.
 *          @param {String} args.diagnosis Diagnosis identifier.
 *          @param {String} args.providerNarrative Problem narrative string (e.g. 'Hypertension').
 *          @param {String} args.problem Problem expression identifier.
 *          @param {String} args.clinic Clinic identifier.
 *          @param {enum} args.problemStatus Status of a problem. Possible values: ACTIVE, INACTIVE.
 *          @param {String} args.snomedCTConceptCode SNOMED CT concept code.
 *          @param {String} args.snomedCTDesignationCode SNMOED CT designation code.
 *          @param {String} args.codingSystem Coding system associated with the problem (e.g. 10D).
 *          @param {enum=} args.condition Problem condition. Possible values: TRANSCRIBED, PERMANENT, HIDDEN. Defaults to PERMANENT
 *          @param {String=} args.responsibleProvider Responsible provider identifier.
 *          @param {enum=} args.priority Immediacy value. Possible values: ACUTE, CHRONIC.
 *          @param {Date=} args.onsetDate Date of problem onset.
 *          @param {Date=} args.interestDate Date of interest.
 *          @param {Boolean=} args.uniqueTermRequested Indicates whether a unique term was requested.
 *          @param {String=} args.uniqueTermRequestComment Unique term request comment.
 *          @param {Array=} args.treatmentFactors List of treatment factors. Possible values: SERVICE_CONNECTED, AGENT_ORANGE,
 *                            IONIZING_RADIATION, PERSIAN_GULF, HEAD_AND_OR_NECK_CANCER,
 *                            MILITARY_SEXUAL_TRAUMA, COMBAT_VETERAN, SHIPBOARD_HAZARD_DEFENSE.
 *          @param {Array=} args.comments Problem comments.
 *          @param {String} args.comments.comment.id Comment index.
 *          @param {String} args.comments.comment.text Comment text.
 *
 *      responses:
 *          200: an updated problem
 *          400: invalid parameters produce a bad request
 */
router.put('/',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'ProblemService', 'update', [req.body]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /problem/:id
 *  GET:
 *      Retrieves a problem description
 *      produces: application/json
 *      parameters:
 *          @param {String} problemId Problem identifier.
 *
 *      responses:
 *          200: Problem description
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.get('/:id',
    (req, res, next) => {
        const problemId = req.params.id;

        let paramErr;
        if (!problemId) {
            paramErr = 'Invalid parameter - missing problemId';
        } else if (!/9000011-\d+/g.test(problemId)) {
            paramErr = 'Invalid parameter - problemId must be in the form of 9000011-{IEN}';
        }

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'ProblemService', 'describe', [problemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /problem
 *  GET:
 *      Retrieves a list of all problems associated with a patient
 *      produces: application/json
 *      parameters:
 *           @param {String=} filter Problem list status filter. Possible values: active, inactive, both, removed. Defaults to all.
 *
 *      responses:
 *          200: List of all problems associated with a patient
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.get('/',
    (req, res, next) => {
        let filter;

        if (req.query) {
            filter = req.query.filter;
        }

        let paramErr;
        if (filter && !/^(active|inactive|both|removed)$/g.test(filter)) {
            paramErr = 'Invalid parameter - possible filter values are active, inactive, both, or removed';
        }

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'ProblemService', 'list', [filter]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

module.exports = router;
