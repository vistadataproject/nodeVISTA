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

describe('test patient service route', () => {
    let db;
    let userId;
    let facilityId;
    let patientId;
    let accessToken;
    let privCert;
    let pubCert;

    before(() => {
        // sets the path for all mumps GT.M routines (compiled .m files)
        process.env.gtmroutines = process.env.gtmroutines + ' ' + vdmUtils.getVdmPath();

        db = new nodem.Gtm();
        db.open();

        userId = fileman.lookupBy01(db, '200', 'ALEXANDER,ROBERT').id;
        facilityId = fileman.lookupBy01(db, '4', 'VISTA HEALTH CARE').id;
        patientId = fileman.lookupBy01(db, '2', 'CARTER,DAVID').id;

        privCert = fs.readFileSync(config.jwt.privateKey);
        pubCert = fs.readFileSync(config.jwt.publicKey);
    });

    beforeEach('get an access token', (done) => {
        chai.request(endpoint)
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
        chai.request(endpoint)
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
        chai.request(endpoint)
            .post('/patient/select')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .send({})
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
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

        chai.request(endpoint)
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