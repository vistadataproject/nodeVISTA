#!/usr/bin/env node

'use strict';

const fs = require('fs');
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const unless = require('express-unless');
const HttpStatus = require('http-status');

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
            res.status(HttpStatus.BAD_REQUEST).send(`Missing token (${tokenHeaderField})`);
            return;
        }

        try {
            _req[requestProp] = jsonwebtoken.verify(
                token,
                secret,
                { subject: tokenSubject });
        } catch (err) {
            if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
                res.status(HttpStatus.UNAUTHORIZED).send(err.message);
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
            }
            return;
        }

        next();
    };

    requiresToken.unless = unless;

    return requiresToken;
};

