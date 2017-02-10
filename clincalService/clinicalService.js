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

        this._issueAccessToken = function _issueAccessToken(context) {
            const cert = fs.readFileSync(config.accessToken.privateKey);  // get token private key
            return jwt.sign(
                context,
                cert,
                { algorithm: config.accessToken.algorithm,
                    expiresIn: config.accessToken.expiresIn,
                });
        };

        this._issueRefreshToken = function _issueRefreshToken(context) {
            const cert = fs.readFileSync(config.refreshToken.privateKey);  // get token private key

            return jwt.sign(
                context,
                cert,
                { algorithm: config.refreshToken.algorithm,
                    expiresIn: config.refreshToken.expiresIn,
                });
        };

        this._issuePatientToken = function _issuePatientToken(patientId) {
            const cert = fs.readFileSync(config.patientToken.privateKey);  // get token private key

            return jwt.sign({
                patientId,
            }, cert,
                { algorithm: config.patientToken.algorithm },
                { expiresIn: config.patientToken.expiresIn });
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

    refreshToken(refreshToken) {
        return new Promise((resolve, reject) => {
            const cert = fs.readFileSync(config.refreshToken.publicKey);
            jwt.verify(refreshToken, cert, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    // token is valid
                    resolve({
                        accessToken: this._issueAccessToken({
                            userId: decoded.userId,
                            facilityId: decoded.facilityId,
                        }),
                    });
                }
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
                    reject(responseObject.message.data);
                } else {
                    resolve(responseObject.message.data);
                }
            });
        });
    }
}

module.exports = new ClinicalService();
