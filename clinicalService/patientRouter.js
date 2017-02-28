#!/usr/bin/env node

'use strict';

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status');
const logger = require('./logger.js');
const config = require('./config/config');
const utils = require('./utils');
const InvalidParametersError = require('./errors/invalidParametersError');
const clinicalService = require('./clinicalService');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/select',
    (req, res, next) => {
        if (!req.body || !req.body.patientId) {
            next(new InvalidParametersError('Invalid parameters - missing patientId'));
            return;
        }

        // TODO Patient select will be come more elaborate. Currently the factory just applies patientId to internal context.

        let patientId = req.body.patientId;

        if (!/-/.test(patientId)) {
            patientId = `2-${patientId}`;
        }

        logger.debug('calling patient select');

        clinicalService.selectPatient(utils.toContext(req), patientId).then((result) => {
            res.header('x-patient-token', result.patientToken);
            res.sendStatus(HttpStatus.OK);
        }).catch((err) => {
            next(err);
        });
    });


module.exports = router;
