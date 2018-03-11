#!/usr/bin/env node

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const _ = require('lodash');
const nodem = require('nodem');
const fileman = require('mvdm/fileman');
const vdmUtils = require('mvdm/vdmUtils');
const allergyUtils = require('mvdm/allergies/allergyUtils');
const HttpStatus = require('http-status');
const moment = require('moment');
const _testAllergies = require('./testAllergies');
const config = require('../config/config');

const endpoint = `localhost:${config.port}`;

chai.use(chaiHttp);

const expect = chai.expect;

describe('test allergy service route', () => {
    let db;
    let userId;
    let facilityId;
    let patientId;
    let allergyId;
    let accessToken;
    let patientToken;
    let testAllergies;

    before(() => {
        // sets the path for all mumps GT.M routines (compiled .m files)
        process.env.gtmroutines = process.env.gtmroutines + ' ' + vdmUtils.getVdmPath();

        db = new nodem.Gtm();
        db.open();

        userId = fileman.lookupBy01(db, '200', 'ALEXANDER,ROBERT').id;
        facilityId = fileman.lookupBy01(db, '4', 'VISTA HEALTH CARE').id;
        patientId = fileman.lookupBy01(db, '2', 'CARTER,DAVID').id;

        allergyUtils.purgeAllAllergies(db); // clear out allergies

        testAllergies = _testAllergies(db, userId, facilityId);
    });

    function toArgs(createInput) {
        const args = _.clone(createInput);

        if (args.reactions) {
            const reactions = [];
            args.reactions.forEach((reaction) => {
                reactions.push(reaction.reaction.id);
            });

            args.reactions = reactions;
        }

        if (args.dateOccurred) {
            args.dateOccurred = moment(args.dateOccurred.value).toDate();
        }

        return args;
    }

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

    it('PUT /allergy/markAsNKA - mark patient record with NKA', (done) => {
        chai.request(endpoint)
            .put('/allergy/markAsNKA')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send()
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                const json = JSON.parse(res.text);
                const allergy = json.created;
                expect(allergy.hasReactions).to.be.false;
                done();
            });
    });

    it('POST /allergy - create with missing/empty parameters', (done) => {
        chai.request(endpoint)
            .post('/allergy')
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

    it('POST /allergy - create an allergy', (done) => {
        chai.request(endpoint)
            .post('/allergy')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send(toArgs(testAllergies.observeds.one.createInput))
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.CREATED);
                const json = JSON.parse(res.text);
                expect(json).to.have.created;
                const allergy = json.created;
                allergyId = allergy.id;
                expect(allergy).to.have.reactant;
                expect(allergy.reactant.label).to.equal('CHOCOLATE');
                done();
            });
    });

    it('GET /allergy/:id without access token', (done) => {
        chai.request(endpoint)
            .get(`/allergy/${allergyId}`)
            // exclude access token
            .set('x-patient-token', patientToken) // pass in patientToken
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.UNAUTHORIZED);
                expect(res.text).to.equal('No authorization token was found');
                done();
            });
    });

    it('GET /allergy/:id without patient token', (done) => {
        chai.request(endpoint)
            .get(`/allergy/${allergyId}`)
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            // exclude patient token
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                expect(res.text).to.equal('Missing token (x-patient-token)');
                done();
            });
    });

    it('GET /allergy/:id - describe an allergy with an invalid allergy id', (done) => {
        chai.request(endpoint)
            .get('/allergy/1234')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                console.log(res.text);
                expect(res.text).to.equal('Invalid parameter - id must be in the form of 120_8-{IEN}');

                done();
            });
    });

    it('GET /allergy/:id', (done) => {
        chai.request(endpoint)
            .get(`/allergy/${allergyId}`)
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                const json = JSON.parse(res.text);
                expect(json).to.have.result;
                const allergy = json.result;
                expect(allergy).to.have.id;
                expect(allergy.id).to.equal(allergyId);
                expect(allergy).to.have.reactant;
                expect(allergy.reactant.label).to.equal('CHOCOLATE');

                done();
            });
    });

    it('GET /allergy - list all allergies', (done) => {
        chai.request(endpoint)
            .get('/allergy')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                const json = JSON.parse(res.text);
                expect(json).to.have.results;
                const allergies = json.results;
                expect(allergies.length).to.equal(1);

                const allergy = allergies[0];
                expect(allergy).to.have.id;
                expect(allergy.id).to.equal(allergyId);
                expect(allergy).to.have.reactant;
                expect(allergy.reactant.label).to.equal('CHOCOLATE');

                done();
            });
    });

    it('PUT /remove - remove an allergy without allergy id', (done) => {
        const removeComment = 'entered by mistake';
        chai.request(endpoint)
            .put('/allergy/remove')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ comment: removeComment })
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                expect(res.text).to.equal('Invalid parameter - missing id');

                done();
            });
    });

    it('PUT /remove - remove an allergy with an invalid allergy id', (done) => {
        const removeComment = 'entered by mistake';
        chai.request(endpoint)
            .put('/allergy/remove')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ id: '1234', comment: removeComment })
            .end((err, res) => {
                expect(err).to.exist
                expect(res).to.have.status(HttpStatus.BAD_REQUEST);
                console.log(res.text);
                expect(res.text).to.equal('Invalid parameter - id must be in the form of 120_8-{IEN}');

                done();
            });
    });

    it('PUT /remove - remove an allergy', (done) => {
        const removeComment = 'entered by mistake';
        chai.request(endpoint)
            .put('/allergy/remove')
            .set('authorization', `Bearer ${accessToken}`) // pass in accessToken
            .set('x-patient-token', patientToken) // pass in patientToken
            .send({ id: allergyId, comment: removeComment })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(HttpStatus.OK);
                const json = JSON.parse(res.text);
                expect(json).to.have.removed;
                expect(json).to.have.isRemoved;
                expect(json.removed.isRemoved).to.be.true;
                expect(json.removed).to.have.removalDetails;
                expect(json.removed.removalDetails.comment).to.equal(removeComment);

                done();
            });
    });

    after(() => {
        db.close();
    });
});
