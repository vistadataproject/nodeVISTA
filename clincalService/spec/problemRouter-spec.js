#!/usr/bin/env node

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const _ = require('underscore');
const nodem = require('nodem');
const fileman = require('mvdm/fileman');
const vdmUtils = require('mvdm/vdmUtils');
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
    let problemId;
    let accessToken;
    let patientToken;
    let testProblems;

    before(() => {
        // sets the path for all mumps GT.M routines (compiled .m files)
        process.env.gtmroutines = process.env.gtmroutines + ' ' + vdmUtils.getVdmPath();

        db = new nodem.Gtm();
        db.open();

        userId = fileman.lookupBy01(db, '200', 'ALEXANDER,ROBERT').id;
        facilityId = fileman.lookupBy01(db, '4', 'VISTA HEALTH CARE').id;
        patientId = fileman.lookupBy01(db, '2', 'CARTER,DAVID').id;

        problemUtils.purgeAllProblems(db); // clear out problems

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
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                expect(res.text).to.match(/Error 11/g);
                done();
            });
    });

    function setDefaultValues(expectedRes, res) {
        const expectedResult = expectedRes;
        expectedResult.patient = res.patient;
        expectedResult.enteredBy = res.enteredBy;
        expectedResult.responsibleProvider = res.responsibleProvider;
        expectedResult.lastModifiedDate = res.lastModifiedDate;
        expectedResult.enteredDate = res.enteredDate;
        expectedResult.interestDate = res.interestDate;

        // set comment defaults (enteredBy, enteredDate)
        if (res.comments) {
            for (let i = 0; i < res.comments.length; i += 1) {
                expectedResult.comments[i].enteredBy = res.comments[i].enteredBy;
                expectedResult.comments[i].enteredDate = res.comments[i].enteredDate;
                expectedResult.comments[i].facility = res.comments[i].facility;
            }
        }
        return expectedResult;
    }

    it('POST /problem - create a problem', (done) => {
        chai.request(app)
            .post('/problem')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send(testProblems.active.two.createArgs)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.CREATED);
                const json = JSON.parse(res.text);
                expect(json).to.have.created;

                problemId = json.created.id;

                const problem = _.omit(json.created, ['id', 'uniqueId', 'providerNarrative']);
                const expectedResult = setDefaultValues(testProblems.active.two.createResult, problem);
                Object.keys(problem).forEach((key) => {
                    expect(problem[key]).to.deep.equal(expectedResult[key]);
                });

                done();
            });
    });

    it('GET /problem/:id without access token', (done) => {
        chai.request(app)
            .get(`/problem/${problemId}`)
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
            .get(`/problem/${problemId}`)
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                const json = JSON.parse(res.text);
                expect(json).to.have.result;
                let problem = json.result;
                expect(problem).to.have.id;
                expect(problem.id).to.equal(problemId);

                problem = _.omit(json.result, ['id', 'uniqueId', 'providerNarrative']);

                const expectedResult = setDefaultValues(testProblems.active.two.createResult, problem);
                Object.keys(problem).forEach((key) => {
                    expect(problem[key]).to.deep.equal(expectedResult[key]);
                });
                done();
            });
    });

    it('PUT /problem - update a problem', (done) => {
        chai.request(app)
            .put('/problem')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ id: problemId, onsetDate: '2016-03-01' })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                const json = JSON.parse(res.text);
                expect(json).to.have.updated;
                expect(json.updated.onsetDate.value).to.equal('2016-03-01');

                done();
            });
    });

    it('GET /problem - list all problems', (done) => {
        chai.request(app)
            .get('/problem')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                const json = JSON.parse(res.text);
                expect(json).to.have.results;
                const problems = json.results;
                expect(problems.length).to.equal(1);

                let problem = problems[0];
                expect(problem).to.have.id;
                expect(problem.id).to.equal(problemId);

                problem = _.omit(json.result, ['id', 'uniqueId', 'providerNarrative']);

                const expectedResult = setDefaultValues(testProblems.active.one.createResult, problem);
                Object.keys(problem).forEach((key) => {
                    expect(problem[key]).to.deep.equal(expectedResult[key]);
                });
                expect(problems[0].id).to.equal(problemId);

                done();
            });
    });

    it('GET /problem - invalid filter', (done) => {
        chai.request(app)
            .get('/problem')
            .query({ filter: 'all' }) // an invalid filter parameter
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                expect(res.text).to.equal('Invalid parameter - possible filter values are active, inactive, both, or removed');
                done();
            });
    });

    it('PUT /remove - remove a problem', (done) => {
        chai.request(app)
            .put('/problem/remove')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ id: problemId })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                const json = JSON.parse(res.text);
                expect(json).to.have.removed;

                done();
            });
    });

    it('PUT /unremove - unremove a problem', (done) => {
        chai.request(app)
            .put('/problem/unremove')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ id: problemId })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                const json = JSON.parse(res.text);
                expect(json).to.have.unremoved;

                done();
            });
    });

    it('DELETE /deleteComments - unremove a problem', (done) => {
        chai.request(app)
            .delete('/problem/deleteComments')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ id: problemId, commentIds: [1] })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                const json = JSON.parse(res.text);
                console.log(JSON.stringify(json, null, 2));
                expect(json).to.have.comments;

                done();
            });
    });

    after(() => {
        db.close();
    });
});
