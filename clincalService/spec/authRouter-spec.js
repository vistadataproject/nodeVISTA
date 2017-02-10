#!/usr/bin/env node

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const nodem = require('nodem');
const jwt = require('jsonwebtoken');
const fileman = require('mvdm/fileman');
const app = require('../index');
const config = require('../config/config');

chai.use(chaiHttp);

const expect = chai.expect;

describe('test authentication service', () => {
    let db;
    let userId;
    let facilityId;
    before(() => {
        // set node environment to test
        process.env.NODE_ENV = 'test';

        db = new nodem.Gtm();
        db.open();

        userId = fileman.lookupBy01(db, '200', 'ALEXANDER,ROBERT').id;
        facilityId = fileman.lookupBy01(db, '4', 'VISTA HEALTH CARE').id;
    });

    let accessToken;
    let refreshToken;

    it('POST /auth call returns access and refresh tokens', (done) => {
        chai.request(app)
            .post('/auth')
            .send({ userId, facilityId })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.header['x-access-token']).to.exist;
                expect(res.header['x-refresh-token']).to.exist;

                accessToken = res.header['x-access-token'];
                refreshToken = res.header['x-refresh-token'];

                // ensure that the access token contains user info
                const accessPubKey = fs.readFileSync(config.accessToken.publicKey);
                let decoded = jwt.verify(accessToken, accessPubKey);
                expect(decoded.userId).to.equal(userId);
                expect(decoded.facilityId).to.equal(facilityId);
                expect(decoded.exp).to.exist;

                // ensure that the refresh token contains user info
                const refreshPubKey = fs.readFileSync(config.refreshToken.publicKey);
                decoded = jwt.verify(refreshToken, refreshPubKey);
                expect(decoded.userId).to.equal(userId);
                expect(decoded.facilityId).to.equal(facilityId);
                done();
            });
    });

    it('POST /auth/refreshToken call returns new access token', (done) => {
        chai.request(app)
            .post('/auth/refreshToken')
            .set('x-refresh-token', refreshToken)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.header['x-access-token']).to.exist;

                accessToken = res.header['x-access-token'];

                // ensure that the access token contains user info
                const accessPubKey = fs.readFileSync(config.accessToken.publicKey);
                const decoded = jwt.verify(accessToken, accessPubKey);
                expect(decoded.userId).to.equal(userId);
                expect(decoded.facilityId).to.equal(facilityId);
                expect(decoded.exp).to.exist;
                done();
            });
    });

    it('POST /auth/refreshToken call throws an error if expired refresh token is passed in', (done) => {
        // create expired refresh token
        const privCert = fs.readFileSync(config.refreshToken.privateKey);
        refreshToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) - (60 * 60), // set expiration date to an hour ago
            userId,
            facilityId,
        }, privCert, { algorithm: config.refreshToken.algorithm });

        chai.request(app)
            .post('/auth/refreshToken')
            .set('x-refresh-token', refreshToken)
            .end((err, res) => {
                expect(err).not.to.be.null;
                expect(res).to.have.status(401);
                expect(res.text).to.equal('jwt expired');
                expect(res.header['x-access-token']).not.to.exist;

                done();
            });
    });

    after(() => {
        db.close();
    })
});
