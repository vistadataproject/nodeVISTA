#!/usr/bin/env node
'use strict';

var bunyan = require('bunyan');
var CONFIG = require('./cfg/config.js');
var LOGGER = bunyan.createLogger({
    name: CONFIG.LOGGER.name,
    streams: [
        {
            level: 'info',
            path: CONFIG.LOGGER.infoFile
        },
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'error',
            path: CONFIG.LOGGER.errorFile
        },
        {
            level: 'error',
            stream: process.stderr
        },
        {
            level: 'trace',
            path: CONFIG.LOGGER.debugFile
        }
    ]
});

module.exports = LOGGER;
module.exports.info = LOGGER.info;
module.exports.error = LOGGER.error;
