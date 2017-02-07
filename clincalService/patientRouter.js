#!/usr/bin/env node

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger.js');
const HttpStatus = require('http-status');
const clinicalService = require('./clinicalService');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/select/:id', (req, res) => {
    // TODO Patient select will be come more elaborate. Currently the factory just applies patientId to internal context.

    clinicalService.selectPatient(req.params.id);

    res.sendStatus(HttpStatus.OK);
});


module.exports = router;
