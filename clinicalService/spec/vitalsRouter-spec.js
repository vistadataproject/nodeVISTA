#!/usr/bin/env node

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const _ = require('lodash');
const nodem = require('nodem');
const fileman = require('mvdm/fileman');
const vdmUtils = require('mvdm/vdmUtils');
const vitalUtils = require('mvdm/vitals/vitalUtils');
const HttpStatus = require('http-status');
const moment = require('moment');
const _testVitals = require('./testVitals');
const config = require('../config/config');

const endpoint = `localhost:${config.port}`;

chai.use(chaiHttp);

const expect = chai.expect;

describe('test vitals service route', () => {
    let db;
    let userId;
    let facilityId;
    let patientId;
    let vitalOneId;
    let vitalTwoId;
    let accessToken;
    let patientToken;
    let testVitals;

    before(() => {
        // sets the path for all mumps GT.M routines (compiled .m files)
        process.env.gtmroutines = process.env.gtmroutines + ' ' + vdmUtils.getVdmPath();

        db = new nodem.Gtm();
        db.open();

        userId = fileman.lookupBy01(db, '200', 'ALEXANDER,ROBERT').id;
        facilityId = fileman.lookupBy01(db, '4', 'VISTA HEALTH CARE').id;
        patientId = fileman.lookupBy01(db, '2', 'CARTER,DAVID').id;

        vitalUtils.purgeAllVitals(db); // clear out vitals

        testVitals = _testVitals(db, userId, facilityId);
    });

    beforeEach('get an access token', (done) => {
        chai.request(endpoint)
            .post('/auth')
            .send({
                userId,
                facilityId,
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                expect(res.header['x-access-token']).to.exist;
                expect(res.header['x-refresh-token']).to.exist;

                accessToken = res.header['x-access-token'];

                done();
            });
    });

    beforeEach('get a patient token', (done) => {
        chai.request(endpoint)
            .post('/patient/select')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .send({ patientId })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                expect(res.header['x-patient-token']).to.exist;

                patientToken = res.header['x-patient-token'];

                done();
            });
    });

    it('POST /vitals - create with missing/empty parameters', (done) => {
        chai.request(endpoint)
            .post('/vitals')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ patientId })
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                expect(res.text).to.match(/Error 11/g);
                done();
            });
    });

    it('POST /vitals - create a blood pressure vital', (done) => {
        chai.request(endpoint)
            .post('/vitals')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send(testVitals.one.createArgs)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.CREATED);
                const json = JSON.parse(res.text);
                expect(json).to.have.created;
                const vital = json.created;
                vitalOneId = vital.id;
                expect(vital.vitalType.label).to.equal(testVitals.one.createResult.vitalType.label);
                expect(vital.value).to.equal(testVitals.one.createResult.value);
                expect(vital.units).to.equal(testVitals.one.createResult.units);
                done();
            });
    });

    it('GET /vitals/:id without access token', (done) => {
        chai.request(endpoint)
            .get(`/vitals/${vitalOneId}`)
            // exclude access token
            .set('x-patient-token', patientToken) // pass in patientToken
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.UNAUTHORIZED);
                expect(res.text).to.equal('No authorization token was found');
                done();
            });
    });

    it('GET /vitals/:id without patient token', (done) => {
        chai.request(endpoint)
            .get(`/vitals/${vitalOneId}`)
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            // exclude patient token
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                expect(res.text).to.equal('Missing token (x-patient-token)');
                done();
            });
    });

    it('GET /vitals/:id - describe a vital with an invalid vital id', (done) => {
        chai.request(endpoint)
            .get('/vitals/1234')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                console.log(res.text);
                expect(res.text).to.equal('Invalid parameter - id must be in the form of 120_5-{IEN}');

                done();
            });
    });

    it('GET /vitals/:id', (done) => {
        chai.request(endpoint)
            .get(`/vitals/${vitalOneId}`)
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                const json = JSON.parse(res.text);
                expect(json).to.have.result;
                const vital = json.result;
                expect(vital).to.have.id;
                expect(vital.id).to.equal(vitalOneId);
                expect(vital.vitalType.label).to.equal(testVitals.one.createResult.vitalType.label);
                expect(vital.value).to.equal(testVitals.one.createResult.value);
                expect(vital.units).to.equal(testVitals.one.createResult.units);

                done();
            });
    });

    it('POST /vitals - create another blood pressure vital', (done) => {
        chai.request(endpoint)
            .post('/vitals')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send(testVitals.two.createArgs)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.CREATED);
                const json = JSON.parse(res.text);
                expect(json).to.have.created;
                const vital = json.created;
                vitalTwoId = vital.id;
                expect(vital.vitalType.label).to.equal(testVitals.one.createResult.vitalType.label);
                expect(vital.value).to.equal(testVitals.one.createResult.value);
                expect(vital.units).to.equal(testVitals.one.createResult.units);
                done();
            });
    });

    it('GET /vitals - list vitals with start and end dates', (done) => {
        chai.request(endpoint)
            .get('/vitals')
            .query({ startDate: new Date(2016, 1, 1).toISOString(), endDate: new Date().toISOString() })
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                const json = JSON.parse(res.text);
                expect(json).to.have.results;
                const vitals = json.results;
                expect(vitals.length).to.equal(2);

                const vital = vitals[0];
                expect(vital).to.have.id;
                expect(vital.id).to.equal(vitalOneId);
                expect(vital.vitalType.label).to.equal(testVitals.one.createResult.vitalType.label);
                expect(vital.value).to.equal(testVitals.one.createResult.value);
                expect(vital.units).to.equal(testVitals.one.createResult.units);

                done();
            });
    });

    it('GET /vitals/mostRecent - list most recent vitals', (done) => {
        chai.request(endpoint)
            .get('/vitals/mostRecent')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                const json = JSON.parse(res.text);
                expect(json).to.have.results;
                const vitals = json.results;
                expect(vitals.length).to.equal(1);

                const vital = vitals[0];
                expect(vital).to.have.id;
                expect(vital.id).to.equal(vitalTwoId);
                expect(vital.vitalType.label).to.equal(testVitals.two.createResult.vitalType.label);
                expect(vital.value).to.equal(testVitals.two.createResult.value);
                expect(vital.units).to.equal(testVitals.two.createResult.units);

                done();
            });
    });

    it('PUT /remove - remove a vital without vital id', (done) => {
        const reason = 'INCORRECT DATE/TIME';
        chai.request(endpoint)
            .put('/vitals/remove')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ reason })
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                expect(res.text).to.equal('Invalid parameter - missing id');

                done();
            });
    });

    it('PUT /remove - remove a vital with an invalid vital id', (done) => {
        const reason = 'INCORRECT DATE/TIME';
        chai.request(endpoint)
            .put('/vitals/remove')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ id: '1234', reason })
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                console.log(res.text);
                expect(res.text).to.equal('Invalid parameter - id must be in the form of 120_5-{IEN}');

                done();
            });
    });

    it('PUT /remove - remove a vital with a missing reason', (done) => {
        chai.request(endpoint)
            .put('/vitals/remove')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ id: vitalOneId })
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                console.log(res.text);
                expect(res.text).to.equal('Invalid parameter - No reason supplied');

                done();
            });
    });

    it('PUT /remove - remove a vital with an invalid reason', (done) => {
        chai.request(endpoint)
            .put('/vitals/remove')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ id: vitalOneId, reason: 'a bad reason' })
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                console.log(res.text);
                expect(res.text).to.equal('Invalid parameter - Supplied reason is invalid: a bad reason');

                done();
            });
    });

    it('PUT /remove - remove a vital', (done) => {
        const reason = 'INCORRECT DATE/TIME';
        chai.request(endpoint)
            .put('/vitals/remove')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ id: vitalOneId, reason })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                const json = JSON.parse(res.text);
                expect(json).to.have.removed;
                expect(json).to.have.isRemoved;
                expect(json.removed.isRemoved).to.be.true;
                expect(json.removed).to.have.removalDetails;
                expect(json.removed.removalDetails.comment).to.equal(reason);

                done();
            });
    });

    after(() => {
        db.close();
    });
});
