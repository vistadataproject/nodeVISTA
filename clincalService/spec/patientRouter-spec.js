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
const HttpStatus = require('http-status');

chai.use(chaiHttp);

const expect = chai.expect;

describe('test patient service route', () => {
    let db;
    let userId;
    let facilityId;
    let patientId;
    let accessToken;
    let privCert;
    let pubCert;

    before(() => {
        // set node environment to test
        process.env.NODE_ENV = 'test';

        db = new nodem.Gtm();
        db.open();

        userId = fileman.lookupBy01(db, '200', 'ALEXANDER,ROBERT').id;
        facilityId = fileman.lookupBy01(db, '4', 'VISTA HEALTH CARE').id;
        patientId = fileman.lookupBy01(db, '2', 'CARTER,DAVID').id;

        privCert = fs.readFileSync(config.jwt.privateKey);
        pubCert = fs.readFileSync(config.jwt.publicKey);
    });

    beforeEach('get an access token', (done) => {
        chai.request(app)
            .post('/auth')
            .send({ userId, facilityId })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                expect(res.header['x-access-token']).to.exist;
                expect(res.header['x-refresh-token']).to.exist;

                accessToken = res.header['x-access-token'];

                done();
            });
    });

    it('POST /patient/select', (done) => {
        chai.request(app)
            .post('/patient/select')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .send({ patientId })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(HttpStatus.OK);
                expect(res.header['x-patient-token']).to.exist;
                done();
            });
    });

    it('POST /patient/select call without patientId', (done) => {
        chai.request(app)
            .post('/patient/select')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .send({})
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.NOT_FOUND);
                expect(res.text).to.equal('Invalid parameters - missing patientId');
                done();
            });
    });

    it('POST /patient/select call with expired accessToken', (done) => {
        accessToken = jwt.sign({
            exp: Math.floor(Date.now() / 1000) - (60 * 60), // set expiration date to an hour ago
            userId,
            facilityId,
        }, privCert, { subject: 'accessToken', algorithm: config.jwt.algorithm });

        chai.request(app)
            .post('/patient/select')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .send({})
            .end((err, res) => {
                expect(err).to.exist;
                expect(res).to.have.status(HttpStatus.UNAUTHORIZED);
                expect(res.text).to.equal('jwt expired');
                done();
            });
    });

    after(() => {
        db.close();
    });
});