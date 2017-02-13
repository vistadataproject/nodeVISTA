#!/usr/bin/env node

'use strict';

const ExtendableError = require('es6-error');

class InvalidContextError extends ExtendableError {
}

module.exports = InvalidContextError;
