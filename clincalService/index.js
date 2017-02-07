#!/usr/bin/env node

'use strict';

const express = require('express');
const config = require('./config.js');
const logger = require('./logger.js');
const problemRouter = require('./problemRouter');

const app = express();

// init routers
app.use('/problem', problemRouter);

const port = config.port;
app.listen(port, () => {
    logger.info(`MVDM Client listening on port ${port}`);
});

