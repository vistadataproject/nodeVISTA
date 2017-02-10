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

router.post('/refreshToken', (req, res) => {
    const refreshToken = req.get('x-refresh-token');

    if (!refreshToken) {
        res.status(HttpStatus.BAD_REQUEST).send('Missing refresh token in header (x-refresh-token)');
        return;
    }

    clinicalService.refreshToken(refreshToken).then((result) => {
        res.header('x-access-token', result.accessToken);
        res.sendStatus(HttpStatus.OK);
    }).catch((err) => {
        if (err.name === 'TokenExpiredError') {
            res.status(HttpStatus.UNAUTHORIZED).send(err.message);
        } else if (err.name === 'JsonWebTokenError') {
            res.status(HttpStatus.BAD_REQUEST).send(err.message);
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
});


module.exports = router;
