#!/usr/bin/env node

'use strict';

const fs = require('fs');
const express = require('express');
const expressJwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
const config = require('./config/config.js');
const logger = require('./logger.js');
const HttpStatus = require('http-status');
const requiresToken = require('./requiresToken');
const authRouter = require('./authRouter');
const patientRouter = require('./patientRouter');
const allergyRouter = require('./allergyRouter');
const problemRouter = require('./problemRouter');
const pceRouter = require('./pceRouter');
const vitalsRouter = require('./vitalsRouter');

const app = express();

// middleware

app.use(cors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    exposedHeaders: ['x-access-token', 'x-refresh-token'],
    allowedHeaders: ['content-type', 'Authorization'],
}));

// require JWT token for all services except auth
 app.use(
     expressJwt({
         secret: fs.readFileSync(config.jwt.publicKey),
         requestProperty: 'auth', // change decoded JWT token from 'req.user' to 'req.auth'
     }).unless({ path: [/^\/auth/, /^\/auth\/.*/] })); // auth requests don't require a JWT token

// require patient token for all services expect /auth/* and /patient/select
 app.use(
     requiresToken({
         secret: fs.readFileSync(config.jwt.publicKey),
         requestProperty: 'patient',
         requestHeaderField: 'x-patient-token',
         tokenSubject: 'patientToken',
     }).unless({ path: [/^\/auth/, /^\/auth\/.*/, /^\/patient\/select/, /^\/patient\/select\//] }));

// init routers
app.use('/auth', authRouter);
app.use('/patient', patientRouter);
app.use('/allergy', allergyRouter);
app.use('/problem', problemRouter);
app.use('/vitals', vitalsRouter);
app.use('/pce', pceRouter);

const port = config.port;
app.listen(port, () => {
    logger.info(`Clinical & PCE Service listening on port ${port}`);
});

// error handling
app.use((err, req, res, next) => {
    let status;
    if (err.name === 'UnauthorizedError' ||
        err.name === 'TokenExpiredError' ||
        err.name === 'JsonWebTokenError') {
        status = HttpStatus.UNAUTHORIZED;
    } else if (err.name === 'MissingTokenError' ||
        err.name === 'InvalidParametersError' ||
        err.name === 'InvalidContextError') {
        status = HttpStatus.BAD_REQUEST;
    } else {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    logger.error(`Error with status ${status}::${err}`);

    res.status(status).send(err.message);
});

module.exports = app;
