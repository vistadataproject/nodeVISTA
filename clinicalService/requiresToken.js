#!/usr/bin/env node

'use strict';

const fs = require('fs');
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const unless = require('express-unless');
const MissingTokenError = require('./errors/missingTokenError');

/**
 * Requires token middleware
 * @param options Middleware options
 * @param {String} options.secret Path to public key that decodes the patient token.
 * @param {String} options.requestHeaderField Name of patient token header in the request..
 * @param {String} options.tokenSubject Name of the patient token subject.
 * @param {String=} options.requestProperty Name of property to attach the decoded token to (e.g. patient). Default is jwtPayload.
 * @returns {requiresToken}
 */
module.exports = function (options) {
    // check and validate for a patient token and add to the request
    const requiresToken = function requiresToken(req, res, next) {
        const secret = options.secret;
        const tokenHeaderField = options.requestHeaderField;
        const tokenSubject = options.tokenSubject;
        const requestProp = options.requestProperty || 'jwtPayload';

        const _req = req;
        const token = _req.get(tokenHeaderField);

        if (!token) {
            throw new MissingTokenError(`Missing token (${tokenHeaderField})`);
        }

        _req[requestProp] = jsonwebtoken.verify(
            token,
            secret,
            { subject: tokenSubject });

        next();
    };

    requiresToken.unless = unless;

    return requiresToken;
};

