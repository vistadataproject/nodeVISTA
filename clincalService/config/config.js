#!/usr/bin/env node

'use strict';

const config = {
    logger: {
        name: 'clinicalService',
        infoFile: './log/clinicalService.log',
        debugFile: './log/clinicalService-debug.log',
        errorFile: './log/clinicalService-error.log',
    },

    port: 9030, // service listens on this port

    // JWT access token
    accessToken: {
        publicKey: './config/accessToken.pub',
        privateKey: './config/accessToken.key',
        algorithm: 'RS256',
        expiresIn: '15m', // short expiration of 15 minutes
    },

    // JWT refresh token
    refreshToken: {
        publicKey: './config/refreshToken.pub',
        privateKey: './config/refreshToken.key',
        algorithm: 'RS256',
        expiresIn: '1h', // expires after an hour
    },

    // JWT patient token
    patientToken: {
        publicKey: './config/patientToken.pub',
        privateKey: './config/patientToken.key',
        algorithm: 'RS256',
        expiresIn: '1h', // expires after an hour
    },

    workerQ: {
        size: 1,
    },
};

module.exports = config;

