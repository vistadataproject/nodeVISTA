#!/usr/bin/env node

'use strict';

const ExtendableError = require('es6-error');

class MissingTokenError extends ExtendableError {
}

module.exports = MissingTokenError;
