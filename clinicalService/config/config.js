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

    // JWT
    jwt: {
        publicKey: './config/jwtRS256.key.pub',
        privateKey: './config/jwtRS256.key',
        algorithm: 'RS256',
        expiresIn: '15m', // access / patient token has a short expiration of 15 minutes
        refreshExpiresIn: '1h', // refresh token expires after an hour
    },

    workerQ: {
        size: 1,
    },
};

module.exports = config;

