#!/usr/bin/env node

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const nodem = require('nodem');
const jwt = require('jsonwebtoken');
const fileman = require('mvdm/fileman');
const vdmUtils = require('mvdm/vdmUtils');
const config = require('../config/config');
const HttpStatus = require('http-status');

const endpoint = `localhost:${config.port}`;

chai.use(chaiHttp);

const expect = chai.expect;

describe('test authentication service route', () => {

    let db;
    let userId;
    let facilityId;
    let accessToken;
    let refreshToken;
    let privCert;
    let pubCert;

    before(() => {
        // sets the path for all mumps GT.M routines (compiled .m files)
        process.env.gtmroutines = process.env.gtmroutines + ' ' + vdmUtils.getVdmPath();

        db = new nodem.Gtm();
        db.open();

        userId = fileman.lookupBy01(db, '200', 'ALEXANDER,ROBERT').id;
        facilityId = fileman.lookupBy01(db, '4', 'VISTA HEALTH CARE').id;

        privCert = fs.readFileSync(config.jwt.privateKey);
        pubCert = fs.readFileSync(config.jwt.publicKey);
    });

    it('POST /auth call returns access and refresh tokens', (done) => {
        chai.request(endpoint)
            .post('/auth')
            .send({ userId, facilityId })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                expect(res.header['x-access-token']).to.exist;
                expect(res.header['x-refresh-token']).to.exist;

                accessToken = res.header['x-access-token'];
                refreshToken = res.header['x-refresh-token'];

                // ensure that the access token contains user info
                let decoded = jwt.verify(accessToken, pubCert);
                expect(decoded.userId).to.equal(userId);
                expect(decoded.facilityId).to.equal(facilityId);
                expect(decoded.exp).to.exist;

                // ensure that the refresh token contains user info
                decoded = jwt.verify(refreshToken, pubCert);
                expect(decoded.userId).to.equal(userId);
                expect(decoded.facilityId).to.equal(facilityId);
                done();
            });
    });

    it('POST /auth/refreshToken call returns new access token', (done) => {
        chai.request(endpoint)
            .post('/auth/refreshToken')
            .set('x-refresh-token', refreshToken)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                expect(res.header['x-access-token']).to.exist;

                accessToken = res.header['x-access-token'];

                // ensure that the access token contains user info
                const decoded = jwt.verify(accessToken, pubCert);
                expect(decoded.userId).to.equal(userId);
                expect(decoded.facilityId).to.equal(facilityId);
                expect(decoded.exp).to.exist;
                done();
            });
    });

    it('POST /auth/refreshToken call returns an error if an expired refresh token is passed in', (done) => {
        // create expired refresh token
        refreshToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) - (60 * 60), // set expiration date to an hour ago
            userId,
            facilityId,
        }, privCert, { subject: 'refreshToken', algorithm: config.jwt.algorithm });

        chai.request(endpoint)
            .post('/auth/refreshToken')
            .set('x-refresh-token', refreshToken)
            .end((err, res) => {
                expect(err).not.to.be.null;
                expect(res).to.have.status(HttpStatus.UNAUTHORIZED);
                expect(res.text).to.equal('jwt expired');
                expect(res.header['x-access-token']).not.to.exist;

                done();
            });
    });

    it('POST /auth/refreshToken call returns an error if an invalid refresh token is passed in', (done) => {
        chai.request(endpoint)
            .post('/auth/refreshToken')
            .set('x-refresh-token', accessToken) // pass in accessToken
            .end((err, res) => {
                expect(err).not.to.be.null;
                expect(res).to.have.status(HttpStatus.UNAUTHORIZED);
                expect(res.text).to.equal('jwt subject invalid. expected: refreshToken');
                expect(res.header['x-access-token']).not.to.exist;

                done();
            });
    });

    after(() => {
        db.close();
    });
});
