#!/usr/bin/env node

'use strict';

const ExtendableError = require('es6-error');

class UnsupportedMethodError extends ExtendableError {
}

module.exports = UnsupportedMethodError;
