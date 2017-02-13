#!/usr/bin/env node

'use strict';

const fs = require('fs');
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const unless = require('express-unless');
const HttpStatus = require('http-status');

/**
 * Requires patient token middleware
 * @param options Middleware options
 * @param {String} options.pubKeyPath Path to public key that decodes the patient token.
 * @param {String=} options.tokenHeader Name of patient token header in the request. Defaults to x-patient-token.
 * @param {String=} options.subject Name of the patient token subject. Defaults to patientToken.
 * @returns {requiresPatientToken}
 */
module.exports = function (options) {
    // check and validate for a patient token and add to the request
    const requiresPatientToken = function requiresPatientToken(req, res, next) {

        const pubKeyPath = options.pubKeyPath;
        const tokenHeader = options.tokenHeader || 'x-patient-token';
        const tokenSubject = options.subject || 'patientToken';

        const _req = req;
        const patientToken = _req.get(tokenHeader);

        if (!patientToken) {
            res.status(HttpStatus.BAD_REQUEST).send(`Missing patient token (${tokenHeader})`);
            return;
        }

        try {
            const decoded = jsonwebtoken.verify(
                patientToken,
                fs.readFileSync(pubKeyPath),
                { subject: tokenSubject });
            _req.patientId = decoded.patientId;
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).send(`Invalid patient token (${tokenHeader})`);
            return;
        }

        next();
    };

    requiresPatientToken.unless = unless;

    return requiresPatientToken;
};

