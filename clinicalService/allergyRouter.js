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

function validateAllergyId(allergyId) {
    let paramErr;
    if (!allergyId) {
        paramErr = 'Invalid parameter - missing id';
    } else if (!/120_8-\d+/g.test(allergyId)) {
        paramErr = 'Invalid parameter - id must be in the form of 120_8-{IEN}';
    }

    return paramErr;
}

/**
 * /allergy
 *  POST:
 *      Creates a new allergy.
 *      produces: application/json
 *      parameters:
 *          @param {Object} args Create allergy arguments.
 *          @param {Object} args.reactant
 *          @param {String} args.reactant.id Allergy reactant identifier.
 *          @param {String} args.reactant.label  Allergy reactant label (e.g. CHOCOLATE).
 *          @param {enum} args.allergyType Type of allergy. Possible values: DRUG, DRUG, FOOD, FOOD, OTHER.
 *          @param {enum} args.mechanism Allergy mechanism. Possible values: ALLERGY, PHARMACOLOGI", UNKNOWN.
 *          @param {enum} args.observedOrHistorical Observed or historical indicator. Possible values: OBSERVED, HISTORICAL.
 *          @param {enum} args.allergySeverity Allergy severity. Possible values: MILD, MODERATE, SEVERE.
 *          @param {Date} args.dateOccurred Date occurred value.
 *          @param {Array=} args.reactions List of reaction identifiers.
 *          @param {Array=} args.comments List of allergy comments.
 *
 *      responses:
 *          201: new created allergy
 *          400: invalid parameters produce a bad request
 */
router.post('/',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'AllergyService', 'create', [req.body]).then((result) => {
            res.status(HttpStatus.CREATED).send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /allergy/:id
 *  GET:
 *      Retrieves an allergy description
 *      produces: application/json
 *      parameters:
 *          @param {String} id Allergy identifier.
 *
 *      responses:
 *          200: Allergy description
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.get('/:id',
    (req, res, next) => {
        const allergyId = req.params.id;

        const paramErr = validateAllergyId(allergyId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'AllergyService', 'describe', [allergyId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /allergy
 *  GET:
 *      Retrieves a list of all allergies associated with a patient
 *      produces: application/json
 *
 *      responses:
 *          200: List of all allergies associated with a patient
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.get('/',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'AllergyService', 'list').then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /allergy/remove
 *  PUT:
 *      Removes an allergy (marks as entered in error)
 *      produces: application/json
 *      parameters:
 *           @param {String} id Problem identifier.
 *           @param {String=} comment Optional entered in error comment.
 *
 *      responses:
 *          200: Removed allergy.
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.put('/remove',
    (req, res, next) => {
        const allergyId = req.body.id;
        const comment = req.body.comment;

        const paramErr = validateAllergyId(allergyId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        const params = [allergyId];

        if (comment) {
            params.push(comment);
        }


        clinicalService.callService(utils.toContext(req), 'AllergyService', 'remove', params).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /allergy/markAsNKA
 *  PUT:
 *      Marks patient record as having NKA (No Known Allergies)
 *      produces: application/json
 *      responses:
 *          200: Marked patient record as having NKA (No Known Allergies)
 */
router.put('/markAsNKA',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'AllergyService', 'markAsNKA').then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

module.exports = router;
