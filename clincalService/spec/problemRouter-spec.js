#!/usr/bin/env node

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const nodem = require('nodem');
const fileman = require('mvdm/fileman');
const problemUtils = require('mvdm/problems/problemRpcUtils');
const app = require('../index');
const HttpStatus = require('http-status');
const _testProblems = require('./testProblems');

chai.use(chaiHttp);

const expect = chai.expect;

describe('test problem service route', () => {
    let db;
    let userId;
    let facilityId;
    let patientId;
    let accessToken;
    let patientToken;
    let testProblems;

    before(() => {
        // set node environment to test
        process.env.NODE_ENV = 'test';

        db = new nodem.Gtm();
        db.open();

        // problemUtils.purgeAllProblems(db); //clear out problems

        userId = fileman.lookupBy01(db, '200', 'ALEXANDER,ROBERT').id;
        facilityId = fileman.lookupBy01(db, '4', 'VISTA HEALTH CARE').id;
        patientId = fileman.lookupBy01(db, '2', 'CARTER,DAVID').id;

        testProblems = _testProblems(db, userId, facilityId);
    });

    beforeEach('get an access token', (done) => {
        chai.request(app)
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
        chai.request(app)
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

    it('POST /problem - create with missing/empty parameters', (done) => {
        chai.request(app)
            .post('/problem')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ patientId })
            .end((err, res) => {
                expect(err).to.exist
                // expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                // expect(res.text).to.equal('Missing token (x-patient-token)');
                done();
            });
    });

    it('GET /problem/:id without access token', (done) => {
        chai.request(app)
            .get('/problem/9000011-1')
            // exclude access token
            .set('x-patient-token', patientToken) // pass in patientToken
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.UNAUTHORIZED);
                expect(res.text).to.equal('No authorization token was found');
                done();
            });
    });

    it('GET /problem/:id without patient token', (done) => {
        chai.request(app)
            .get('/problem/9000011-1')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            // exclude patient token
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                expect(res.text).to.equal('Missing token (x-patient-token)');
                done();
            });
    });

    it('GET /problem/:id', (done) => {
        chai.request(app)
            .get('/problem/9000011-1')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                const json = JSON.parse(res.text);
                expect(json).to.have.result;
                const problem = json.result;
                expect(problem).to.have.id;
                expect(problem.id).to.equal('9000011-1');
                done();
            });
    });

    it('GET /problem without id', (done) => {
        chai.request(app)
            .get('/problem')
            .set('authorization', `Bearer ${accessToken}`)
            .set('x-patient-token', patientToken)
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.NOT_FOUND);
                done();
            });
    });

    after(() => {
        db.close();
    });
});
