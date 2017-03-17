#!/usr/bin/env node

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const _ = require('lodash');
const nodem = require('nodem');
const fileman = require('mvdm/fileman');
const vdmUtils = require('mvdm/vdmUtils');
const problemUtils = require('mvdm/problems/problemRpcUtils');
const HttpStatus = require('http-status');
const _testProblems = require('./testProblems');
const config = require('../config/config');

const endpoint = `localhost:${config.port}`;

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

    it('POST /problem - create with missing/empty parameters', (done) => {
        chai.request(endpoint)
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
        chai.request(endpoint)
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
        chai.request(endpoint)
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
        chai.request(endpoint)
            .get(`/problem/${problemId}`)
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            // exclude patient token
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                expect(res.text).to.equal('Missing token (x-patient-token)');
                done();
            });
    });

    it('GET /problem/:id - describe a problem with an invalid problem id', (done) => {
        chai.request(endpoint)
            .get('/problem/1234')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                console.log(res.text);
                expect(res.text).to.equal('Invalid parameter - id must be in the form of 9000011-{IEN}');

                done();
            });
    });

    it('GET /problem/:id', (done) => {
        chai.request(endpoint)
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

    it('PUT /problem - update with missing/empty parameters', (done) => {
        chai.request(endpoint)
            .put('/problem')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ patientId })
            .end((err, res) => {
                expect(err).to.exist;
                expect(res).to.have.status(HttpStatus.INTERNAL_SERVER_ERROR);
                expect(res.text).to.equal("Update Object must have the 'id' of the object being updated");
                done();
            });
    });

    it('PUT /problem - update a problem', (done) => {
        chai.request(endpoint)
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
        chai.request(endpoint)
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
        chai.request(endpoint)
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

    it('PUT /remove - remove a problem without a problem id', (done) => {
        chai.request(endpoint)
            .put('/problem/remove')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({})
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                expect(res.text).to.equal('Invalid parameter - missing id');

                done();
            });
    });

    it('PUT /remove - remove a problem with an invalid problem id', (done) => {
        chai.request(endpoint)
            .put('/problem/remove')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ id: '1234' })
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                console.log(res.text);
                expect(res.text).to.equal('Invalid parameter - id must be in the form of 9000011-{IEN}');

                done();
            });
    });

    it('PUT /remove - remove a problem', (done) => {
        chai.request(endpoint)
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

    it('PUT /unremove - unremove a problem without a problem id', (done) => {
        chai.request(endpoint)
            .put('/problem/unremove')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({})
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                expect(res.text).to.equal('Invalid parameter - missing id');

                done();
            });
    });

    it('PUT /unremove - unremove a problem with an invalid problem id', (done) => {
        chai.request(endpoint)
            .put('/problem/unremove')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ id: '1234' })
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                console.log(res.text);
                expect(res.text).to.equal('Invalid parameter - id must be in the form of 9000011-{IEN}');

                done();
            });
    });

    it('PUT /unremove - unremove a problem', (done) => {
        chai.request(endpoint)
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

    it('DELETE /deleteComments - delete a comment without a problem id', (done) => {
        chai.request(endpoint)
            .delete('/problem/deleteComments')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({})
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                expect(res.text).to.equal('Invalid parameter - missing id');

                done();
            });
    });

    it('DELETE /deleteComments - delete a comment with an invalid problem id', (done) => {
        chai.request(endpoint)
            .delete('/problem/deleteComments')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ id: '1234', commentIds: [1] })
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                console.log(res.text);
                expect(res.text).to.equal('Invalid parameter - id must be in the form of 9000011-{IEN}');

                done();
            });
    });

    it('DELETE /deleteComments - delete a comment with invalid commentIds', (done) => {
        chai.request(endpoint)
            .delete('/problem/deleteComments')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ id: problemId, commentIds: 1 })
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                console.log(res.text);
                expect(res.text).to.equal('Invalid parameter - missing or invalid commentIds');

                done();
            });
    });

    it('DELETE /deleteComments - delete a comment', (done) => {
        chai.request(endpoint)
            .delete('/problem/deleteComments')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ id: problemId, commentIds: [1] })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                const json = JSON.parse(res.text);
                expect(json).to.have.comments;

                done();
            });
    });

    after(() => {
        db.close();
    });
});
