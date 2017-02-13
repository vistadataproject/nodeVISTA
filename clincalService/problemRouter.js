#!/usr/bin/env node

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status');
const logger = require('./logger.js');
const utils = require('./utils');
const clinicalService = require('./clinicalService');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
/**
 * /problem:
 *  POST:
 *      description: Creates a new problem.
 *      produces:
 *          - application/json
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
 *          201:
 *              description: new created problem
 */
router.post('/',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'ProblemService', 'create', [req.body]).then((result) => {
            res.status(HttpStatus.CREATED).send(result);
        }).catch((err) => {
            next(err);
        });
    });

router.put('/',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'ProblemService', 'update', [req.body]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

router.get('/:id',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'ProblemService', 'describe', [req.params.id]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

module.exports = router;
