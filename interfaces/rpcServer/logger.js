'use strict'

var bunyan = require('bunyan');
var CONFIG = require('./config.js');
var LOGGER = bunyan.createLogger({
    name: CONFIG.LOGGER.name,
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'info',
            path: CONFIG.LOGGER.infoFile
        },
        {
            level: 'error',
            path: CONFIG.LOGGER.errorFile
        }
    ]
});

module.exports = LOGGER;
module.exports.info = LOGGER.info;
module.exports.error = LOGGER.error;
