#!/usr/bin/env node

'use strict';

const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = require('./config/config.js');
const logger = require('./logger.js');
const qoper8 = require('ewd-qoper8');

class ClinicalService {
    constructor() {
        // start process queue
        this.processQueue = new qoper8.masterProcess();

        this.processQueue.on('started', function () {
            this.worker.module = `${__dirname}/clinicalQWorker`;
        });

        this.processQueue.on('start', function () {
            this.setWorkerPoolSize(config.workerQ.size);
        });

        this.processQueue.start();

        const privateCert = fs.readFileSync(config.jwt.privateKey); // token private key

        this._issueAccessToken = function _issueAccessToken(context) {
            return jwt.sign(
                context,
                privateCert,
                {
                    subject: 'accessToken',
                    algorithm: config.jwt.algorithm,
                    expiresIn: config.jwt.expiresIn,
                });
        };

        this._issueRefreshToken = function _issueRefreshToken(context) {
            return jwt.sign(
                context,
                privateCert,
                {
                    subject: 'refreshToken',
                    algorithm: config.jwt.algorithm,
                    expiresIn: config.jwt.refreshExpiresIn,
                });
        };

        this._issuePatientToken = function _issuePatientToken(patientId) {
            return jwt.sign({
                patientId,
            }, privateCert,
                {
                    subject: 'patientToken',
                    algorithm: config.jwt.algorithm,
                    expiresIn: config.jwt.expiresIn,
                });
        };
    }

    authenticate(context) {
        // sign access & refresh tokens with RSA SHA256
        return new Promise((resolve, reject) => {
            resolve({
                accessToken: this._issueAccessToken(context),
                refreshToken: this._issueRefreshToken(context),
            });
        });
    }

    refreshToken(context) {
        // sign new refresh token with RSA SHA256
        return new Promise((resolve, reject) => {
            resolve({
                accessToken: this._issueAccessToken(context),
            });
        });
    }

    selectPatient(context, patientId) {
        return new Promise((resolve, reject) => {
            this.callService(context, 'PatientService', 'selectPatient', [patientId]).then((result) => {
                resolve({ patientToken: this._issuePatientToken(patientId) });
            }).catch((err) => {
                reject(err);
            });
        });
    }

    callService(context, service, method, args) {
        return new Promise((resolve, reject) => {
            const messageObject = {
                context,
                service,
                method,
                args,
            };

            this.processQueue.handleMessage(messageObject, (responseObject) => {
                if (responseObject.message.type === 'error') {
                    const err = new Error(responseObject.message.error.message);
                    err.name = responseObject.message.error.name;
                    reject(err);
                } else {
                    resolve(responseObject.message.data);
                }
            });
        });
    }
}

module.exports = new ClinicalService();
