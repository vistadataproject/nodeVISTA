#!/usr/bin/env node

'use strict';

const ExtendableError = require('es6-error');

class InvalidParametersError extends ExtendableError {
}

module.exports = InvalidParametersError;
