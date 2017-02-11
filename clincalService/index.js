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

// middleware

// require JWT token for all services except auth
app.use(
    expressJwt({
        secret: fs.readFileSync(config.jwt.publicKey),
        requestProperty: 'auth', // change decoded JWT token from 'req.user' to 'req.auth'
    }).unless({ path: [/^\/auth/, /^\/auth\/.*/] })); // auth requests don't require a JWT token

// check and validate for a patient token and add to the context
app.use((req, res, next) => {
    logger.debug('Invoking patientId middleware');
    const _req = req;
    const patientToken = _req.get('x-patient-token');

    if (patientToken) {
        try {
            const decoded = jsonwebtoken.verify(
                patientToken,
                fs.readFileSync(config.jwt.publicKey),
                { subject: 'patientToken' });
            if (_req.auth && _req.auth.context) {
                _req.auth.context.patientId = decoded.patientId;
                logger.debug(`retrieved patientId: ${_req.auth.context.patientId}`);
            }
        } catch (e) {
            logger.error(e);
        }
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
        res.status(HttpStatus.UNAUTHORIZED).send(err.message);
    }
});

module.exports = app;
