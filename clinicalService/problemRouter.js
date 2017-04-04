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

function validateProblemId(problemId) {
    let paramErr;
    if (!problemId) {
        paramErr = 'Invalid parameter - missing id';
    } else if (!/9000011-\d+/g.test(problemId)) {
        paramErr = 'Invalid parameter - id must be in the form of 9000011-{IEN}';
    }

    return paramErr;
}
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
 *          @param {String} id Problem identifier.
 *
 *      responses:
 *          200: Problem description
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.get('/:id',
    (req, res, next) => {
        const problemId = req.params.id;

        const paramErr = validateProblemId(problemId);

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
        const filter = req.query ? req.query.filter : undefined;

        if (filter && !/^(active|inactive|both|removed)$/g.test(filter)) {
            next(new InvalidParametersError('Invalid parameter - possible filter values are active, inactive, both, or removed'));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'ProblemService', 'list', [filter]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /problem/remove
 *  PUT:
 *      Removes a problem (sets condition to HIDDEN).
 *      produces: application/json
 *      parameters:
 *           @param {String} id Problem identifier.
 *
 *      responses:
 *          200: Removed problem.
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.put('/remove',
    (req, res, next) => {
        const problemId = req.body.id;

        const paramErr = validateProblemId(problemId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'ProblemService', 'remove', [problemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });
/**
 * /problem/unremove
 *  PUT:
 *      Unremoves a problem (sets condition back to PERMANENT).
 *      produces: application/json
 *      parameters:
 *           @param {String} id Problem identifier.
 *
 *      responses:
 *          200: Unremoved problem.
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.put('/unremove',
    (req, res, next) => {
        const problemId = req.body.id;

        const paramErr = validateProblemId(problemId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'ProblemService', 'unremove', [problemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /problem/deleteComments
 *  DELETE:
 *      Deletes problem comments.
 *      produces: application/json
 *      parameters:
 *           @param {String} id Problem identifier.
 *           @param {Array} commentIds List of comment ids to delete.
 *
 *      responses:
 *          200: Deleted problem comments.
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.delete('/deleteComments',
    (req, res, next) => {
        const problemId = req.body.id;
        const commentIds = req.body.commentIds;

        let paramErr = validateProblemId(problemId);

        // validate comment ids
        if (!paramErr) {
            if (!commentIds || !Array.isArray(commentIds) || commentIds.length < 1) {
                paramErr = 'Invalid parameter - missing or invalid commentIds';
            }
        }

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'ProblemService', 'deleteComments', [problemId, commentIds]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });


module.exports = router;
