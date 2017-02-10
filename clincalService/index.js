#!/usr/bin/env node

'use strict';

const fs = require('fs');
const express = require('express');
const expressJwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const config = require('./config/config.js');
const logger = require('./logger.js');
const HttpStatus = require('http-status');
const authRouter = require('./authRouter');
const patientRouter = require('./patientRouter');
const problemRouter = require('./problemRouter');

const app = express();

const accessTokenPubKey = fs.readFileSync(config.accessToken.publicKey);

// middleware

// require JWT token for all services except auth
app.use(
    expressJwt({
        secret: accessTokenPubKey,
        requestProperty: 'context', // change decoded JWT token from 'req.user' to 'req.context'
    }).unless({ path: [/^\/auth\/.*/] })); // auth requests don't require a JWT token

const patientTokenPubKey = fs.readFileSync(config.patientToken.publicKey);

// check and validate for a patient token and add to the context
app.use((req, res, next) => {
    logger.debug('Invoking patientId middleware');
    const _req = req;
    const patientToken = req.get('x-patient-token');

    if (patientToken) {
        const decoded = jsonwebtoken.verify(patientToken, patientTokenPubKey);
        _req.context.patientId = decoded.patientId;

        logger.debug(`retrieved patientId: ${_req.context.patientId}`);
    }

    next();
});

// init routers
app.use('/auth', authRouter);
app.use('/patient', patientRouter);
app.use('/problem', problemRouter);

const port = config.port;
app.listen(port, () => {
    logger.info(`Clinical Service listening on port ${port}`);
});

// error handling
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(HttpStatus.NOT_FOUND).send('Unauthorized token. Invoke /auth to retrieve a valid JWT token.');
    }
});

