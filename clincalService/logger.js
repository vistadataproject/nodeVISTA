#!/usr/bin/env node

'use strict';

const bunyan = require('bunyan');
const config = require('./config.js');
const fs = require('fs');

if (!fs.existsSync('./log')) {
    fs.mkdirSync('./log');
}

const logger = bunyan.createLogger({
    name: config.LOGGER.name,
    streams: [
        {
            level: 'info',
            path: config.LOGGER.infoFile,
        },
        {
            level: 'info',
            stream: process.stdout,
        },
        {
            level: 'error',
            path: config.LOGGER.errorFile,
        },
        {
            level: 'error',
            stream: process.stderr,
        },
        {
            level: 'trace',
            path: config.LOGGER.debugFile,
        },
    ],
});

module.exports = logger;
module.exports.info = logger.info;
module.exports.error = logger.error;
