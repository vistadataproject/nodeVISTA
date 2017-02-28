#!/usr/bin/env node

'use strict';

const bunyan = require('bunyan');
const config = require('./config/config.js');
const fs = require('fs');

if (!fs.existsSync('./log')) {
    fs.mkdirSync('./log');
}

const logger = bunyan.createLogger({
    name: config.logger.name,
    streams: [
        {
            level: 'info',
            path: config.logger.infoFile,
        },
        {
            level: 'info',
            stream: process.stdout,
        },
        {
            level: 'error',
            path: config.logger.errorFile,
        },
        {
            level: 'error',
            stream: process.stderr,
        },
        {
            level: 'trace',
            path: config.logger.debugFile,
        },
    ],
});

module.exports = logger;
module.exports.info = logger.info;
module.exports.error = logger.error;
