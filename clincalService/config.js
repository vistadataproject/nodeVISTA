#!/usr/bin/env node

'use strict';

const config = {};

config.LOGGER = {};
config.LOGGER.name = 'rpcServer';
config.LOGGER.infoFile = './log/clinicalService.log';
config.LOGGER.debugFile = './log/clinicalService-debug.log';
config.LOGGER.errorFile = './log/clinicalService-error.log';

config.port = 9030;
config.user = 'ALEXANDER,ROBERT';
config.facility = 'VISTA HEALTH CARE';

module.exports = config;

