#!/usr/bin/env node

'use strict';

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status');
const logger = require('./logger.js');
const config = require('./config/config');
const requiresToken = require('./requiresToken');
const utils = require('./utils');
const clinicalService = require('./clinicalService');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
    if (!req.body || !req.body.userId || !req.body.facilityId) {
        res.status(HttpStatus.NOT_FOUND).send('Invalid parameters. Missing userId and/or facilityId');
        return;
    }

    let userId = req.body.userId;
    let facilityId = req.body.facilityId;

    if (!/-/.test(userId)) {
        userId = `200-${userId}`;
    }

    if (!/-/.test(facilityId)) {
        facilityId = `4-${facilityId}`;
    }

    clinicalService.authenticate({ userId, facilityId }).then((result) => {
        res.header('x-access-token', result.accessToken);
        res.header('x-refresh-token', result.refreshToken);
        res.sendStatus(HttpStatus.OK);
    }).catch((err) => { // TODO add error checking
        res.status(HttpStatus.UNAUTHORIZED).send('You are not authorized to use this service.');
    });
});

// use middleware to decode the refresh token
router.use('/refreshToken',
    requiresToken({
        secret: fs.readFileSync(config.jwt.publicKey),
        requestProperty: 'refresh',
        requestHeaderField: 'x-refresh-token',
        tokenSubject: 'refreshToken',
    }));

router.post('/refreshToken', (req, res) => {
    clinicalService.refreshToken({
        userId: req.refresh.userId,
        facilityId: req.refresh.facilityId,
    }).then((result) => {
        res.header('x-access-token', result.accessToken);
        res.sendStatus(HttpStatus.OK);
    }).catch((err) => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
});

module.exports = router;
