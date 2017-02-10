#!/usr/bin/env node

'use strict';

const ExtendableError = require('es6-error');

class InvalidTokenError extends ExtendableError {
}

module.exports = InvalidTokenError;
