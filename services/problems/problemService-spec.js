#!/usr/bin/env node

'use strict';

/*
 * Basic setup
 */
var _ = require('underscore');
var testProblems;
var moment = require('moment');
var nodem = require('nodem');
var fileman = require('mvdm/fileman');
var vdmUtils = require('mvdm/vdmUtils');
var problemUtils = require("mvdm/problems/problemRpcUtils");

var ProblemService = require('./problemService');

var DT_FORMAT = 'YYYY-MM-DD';

var NOW = moment().format(DT_FORMAT);

process.env.gtmroutines = process.env.gtmroutines + ' ' + vdmUtils.getVdmPath();

var db, problemService, userId, facilityId, patientId;

describe('testProblemService', function () {

    beforeAll(function () {

        db = new nodem.Gtm();
        db.open();

        problemUtils.purgeAllProblems(db);

        userId = fileman.lookupBy01(db, "200", "ALEXANDER,ROBERT").id;
        facilityId = fileman.lookupBy01(db, "4", "VISTA HEALTH CARE").id;
        patientId = fileman.lookupBy01(db, "2", "CARTER,DAVID").id;

        problemService = new ProblemService(db, {
            userId: userId,
            facilityId: facilityId,
            patientId: patientId
        });

        testProblems = require('./testProblems')(db, userId, facilityId);
    });

    function setDefaultValues(expectedResult, res) {
        expectedResult.patient = res.patient;
        expectedResult.enteredBy = res.enteredBy;
        expectedResult.responsibleProvider = res.responsibleProvider;
        expectedResult.lastModifiedDate = res.lastModifiedDate;
        expectedResult.enteredDate = res.enteredDate;
        expectedResult.interestDate = res.interestDate;

        //set comment defaults (enteredBy, enteredDate)
        if (res.comments) {
            for (var i = 0; i < res.comments.length; i++) {
                expectedResult.comments[i].enteredBy = res.comments[i].enteredBy;
                expectedResult.comments[i].enteredDate = res.comments[i].enteredDate;
                expectedResult.comments[i].facility = res.comments[i].facility;
            }
        }
        return expectedResult;
    }

    var problemOneId;

    it("Create a new problem using service - expect MVDM create return", function () {

        var res = problemService.create(_.clone(testProblems.active.one.createArgs));

        problemOneId = res.created.id;

        expect(res.created).toBeDefined();

        var mvdmResultForTest = _.omit(res.created, ["id", "uniqueId"]);

        var expectedResult = setDefaultValues(testProblems.active.one.createResult, res.created);

        Object.keys(mvdmResultForTest).forEach(function (key) {
            expect(mvdmResultForTest[key]).toEqual(expectedResult[key]);
        });

        // Now let's get (DESCRIBE) the created MVDM Problem separately
        var createdId = res.created.id; // here's its id
        var res2 = problemService.describe(createdId);

        expect(res2.result).toEqual(res.created);
    });

    it("Create problem with comments", function (done) {

        //listen for problemService MVDM create event
        var createRes, _userId, _facilityId, eventTimestamp;

        var SpyObj = { //dummy spy object
            createSpy: function () {
                //method used to test whether problemService's MVDM 'create' event was called.
            }
        };

        spyOn(SpyObj, 'createSpy');

        problemService.once('create', function (res) {
            createRes = res.data;
            _userId = res.user.id;
            _facilityId = res.facility.id;
            eventTimestamp = res.timestamp;
            SpyObj.createSpy();
        });

        problemService.create(_.clone(testProblems.active.two.createArgs));

        _.delay(function () {
            expect(SpyObj.createSpy).toHaveBeenCalled();
            expect(SpyObj.createSpy.calls.count()).toEqual(1);
            expect(SpyObj.createSpy.calls.count()).not.toEqual(2);

            expect(_userId).toEqual(userId);
            expect(_facilityId).toEqual(facilityId);
            expect(eventTimestamp).toMatch(/20\d\d-\d\d-\d\dT/);

            var mvdmResultForTest = _.omit(createRes.created, ["id", "uniqueId"]);

            var expectedResult = setDefaultValues(testProblems.active.two.createResult, createRes.created);
            Object.keys(mvdmResultForTest).forEach(function (key) {
                expect(mvdmResultForTest[key]).toEqual(expectedResult[key]);
            });

            var createdId = createRes.created.id;
            var res2 = problemService.describe(createdId);
            expect(res2.result).toEqual(createRes.created);

            done();
        }, 100);
    });

    it('Update a problem - change immediacy value', function () {
        var res = problemService.update({
            id: problemOneId,
            priority: 'CHRONIC'
        });

        expect(res).toBeDefined();
        expect(res.updated).toBeDefined();
        expect(res.updated.priority).toEqual('CHRONIC');

        //confirm presence of audit
        var descr = problemService.describe(problemOneId);

        expect(descr.result.audits).toBeDefined();
        expect(descr.result.audits.length).toEqual(1);
        var audit = descr.result.audits[0];
        expect(audit.newValue).toEqual('C');
        expect(audit.oldValue).toBeUndefined();
    });

    it('Update a problem - change set onset value', function () {

        var res = problemService.update({
            id: problemOneId,
            onsetDate: "2016-03-01"
        });

        expect(res).toBeDefined();
        expect(res.updated).toBeDefined();
        expect(res.updated.onsetDate.value).toEqual('2016-03-01');

        //confirm presence of audit
        var descr = problemService.describe(problemOneId);

        expect(descr.result.audits).toBeDefined();
        expect(descr.result.audits.length).toEqual(2);
        var audit = descr.result.audits[1];
        expect(audit.newValue).toMatch(/\d+/);
        expect(audit.oldValue).toBeUndefined();
    });

    it('Update a problem - change responsible provider', function () {
        var res = problemService.update({
            id: problemOneId,
            responsibleProvider: testProblems.active.one.otherProvider.id
        });

        expect(res).toBeDefined();
        expect(res.updated).toBeDefined();
        expect(res.updated.responsibleProvider.id).toEqual(testProblems.active.one.otherProvider.id);

        //confirm presence of audit
        var descr = problemService.describe(problemOneId);

        expect(descr.result.audits).toBeDefined();
        expect(descr.result.audits.length).toEqual(3);
        var audit = descr.result.audits[2];
        expect(audit.newValue).toMatch(/\d+/);
        expect(audit.oldValue).toMatch(/\d+/);

    });

    it('Update a problem - change clinic', function () {
        var res = problemService.update({
            id: problemOneId,
            clinic: "44-4"
        });

        expect(res).toBeDefined();
        expect(res.updated).toBeDefined();
        expect(res.updated.clinic.id).toEqual('44-4');

        //confirm presence of audit
        var descr = problemService.describe(problemOneId);

        expect(descr.result.audits).toBeDefined();
        expect(descr.result.audits.length).toEqual(4);
        var audit = descr.result.audits[3];
        expect(audit.newValue).toMatch(/\d+/);
        expect(audit.oldValue).toMatch(/\d+/);
    });

    it('Update a problem - change problem status', function () {
        var res = problemService.update({
            id: problemOneId,
            problemStatus: 'INACTIVE'
        });

        expect(res).toBeDefined();
        expect(res.updated).toBeDefined();
        expect(res.updated.problemStatus).toEqual('INACTIVE');

        //confirm presence of audit
        var descr = problemService.describe(problemOneId);

        expect(descr.result.audits).toBeDefined();
        expect(descr.result.audits.length).toEqual(5);
        var audit = descr.result.audits[4];
        expect(audit.newValue).toEqual('I')
        expect(audit.oldValue).toEqual('A');

        //set status back to ACTIVE
        res = problemService.update({
            id: problemOneId,
            problemStatus: 'ACTIVE'
        });

        //confirm audit
        descr = problemService.describe(problemOneId);

        expect(descr.result.audits).toBeDefined();
        expect(descr.result.audits.length).toEqual(6);
        var audit = descr.result.audits[5];
        expect(audit.newValue).toEqual('A');
        expect(audit.oldValue).toEqual('I');
    });

    it('Update a problem - change treatment factors', function () {

        //service connected
        var res = problemService.update({
            id: problemOneId,
            treatmentFactors: [
                "SERVICE_CONNECTED",
                "AGENT_ORANGE",
                "IONIZING_RADIATION",
                "PERSIAN_GULF",
                "HEAD_AND_OR_NECK_CANCER",
                "MILITARY_SEXUAL_TRAUMA",
                "COMBAT_VETERAN",
                "SHIPBOARD_HAZARD_DEFENSE"
            ]
        });

        expect(res).toBeDefined();
        expect(res.updated).toBeDefined();
        expect(res.updated.isServiceConnected).toBe(true);
        expect(res.updated.isAgentOrangeExposure).toBe(true);
        expect(res.updated.isIonizingRadiationExposure).toBe(true);
        expect(res.updated.isPersianGulfExposure).toBe(true);
        expect(res.updated.isHeadAndOrNeckCancer).toBe(true);
        expect(res.updated.isMilitarySexualTrauma).toBe(true);
        expect(res.updated.isCombatVeteran).toBe(true);
        expect(res.updated.isShipboardHazardDefense).toBe(true);

        //confirm audit
        var descr = problemService.describe(problemOneId);

        expect(descr.result.audits).toBeDefined();
        expect(descr.result.audits.length).toEqual(14);

        for (var i = 6; i < 14; i++) {
            expect(descr.result.audits[i].oldValue).toEqual('0');
            expect(descr.result.audits[i].newValue).toEqual('1');
        }
    });

    it('Update a problem - change problem', function () {
        var res = problemService.update({
            id: problemOneId,
            providerNarrative: "Hypertension",
            problem: "757_01-7647488",
            snomedCTConceptCode: '38341003',
            snomedCTDesignationCode: '64176011'
        });

        expect(res).toBeDefined();
        expect(res.updated).toBeDefined();
        expect(res.updated.providerNarrative.label).toEqual('Hypertension');
        expect(res.updated.problem.id).toEqual('757_01-7647488');
        expect(res.updated.snomedCTConceptCode).toEqual('38341003');
        expect(res.updated.snomedCTDesignationCode).toEqual('64176011');

        //confirm audits
        var descr = problemService.describe(problemOneId);

        expect(descr.result.audits).toBeDefined();
        expect(descr.result.audits.length).toEqual(18);

        for (var i = 14; i < 18; i++) {
            if (descr.result.audits[i].fieldNumber === .05) {
                //provider narrative
                expect(descr.result.audits[i].oldValue).toEqual('1');
                expect(descr.result.audits[i].newValue).toEqual('3');
            } else if (descr.result.audits[i].fieldNumber === 1.01) {
                //problem
                expect(descr.result.audits[i].oldValue).toEqual('7130783');
                expect(descr.result.audits[i].newValue).toEqual('7647488');
                expect(descr.result.audits[i].reason).toEqual('Reformulated');
                expect(descr.result.audits[i].oldProblemEntry).toEqual('521774');
            } else if (descr.result.audits[i].fieldNumber === 80001) {
                //snomedCT concept code
                expect(descr.result.audits[i].oldValue).toEqual('73211009');
                expect(descr.result.audits[i].newValue).toEqual('38341003');
            } else if (descr.result.audits[i].fieldNumber === 80002) {
                //snomedCT designation code
                expect(descr.result.audits[i].oldValue).toEqual('121589010');
                expect(descr.result.audits[i].newValue).toEqual('64176011');
            }
        }

        //set problem back to diabetes
        res = problemService.update({
            id: problemOneId,
            "providerNarrative": "Diabetes mellitus",
            "problem": "757_01-7130783",
            "snomedCTConceptCode": "73211009",
            "snomedCTDesignationCode": "121589010"
        });

        expect(res).toBeDefined();
        expect(res.updated).toBeDefined();
        expect(res.updated.providerNarrative.label).toEqual('Diabetes mellitus');
        expect(res.updated.snomedCTConceptCode).toEqual('73211009');
        expect(res.updated.snomedCTDesignationCode).toEqual('121589010');

        //confirm audits
        descr = problemService.describe(problemOneId);

        expect(descr.result.audits).toBeDefined();
        expect(descr.result.audits.length).toEqual(22);

        for (i = 18; i < 22; i++) {
            if (descr.result.audits[i].fieldNumber === .05) {
                //provider narrative
                expect(descr.result.audits[i].oldValue).toEqual('3');
                expect(descr.result.audits[i].newValue).toEqual('1');
            } else if (descr.result.audits[i].fieldNumber === 1.01) {
                //problem
                expect(descr.result.audits[i].oldValue).toEqual('7647488');
                expect(descr.result.audits[i].newValue).toEqual('7130783');
                expect(descr.result.audits[i].reason).toEqual('Reformulated');
                expect(descr.result.audits[i].oldProblemEntry).toEqual('521774');
            } else if (descr.result.audits[i].fieldNumber === 80001) {
                //snomedCT concept code
                expect(descr.result.audits[i].oldValue).toEqual('38341003');
                expect(descr.result.audits[i].newValue).toEqual('73211009');
            } else if (descr.result.audits[i].fieldNumber === 80002) {
                //snomedCT designation code
                expect(descr.result.audits[i].oldValue).toEqual('64176011');
                expect(descr.result.audits[i].newValue).toEqual('121589010');
            }
        }
    });

    // Assign ICD10 CM to a problem
    //
    // Per CPRS CPRS GUI 30.A FAQs:
    //
    // Why do so many problems have R69 codes?
    //
    // When a provider enters a new problem on the Problems tab, the problem is a SNOMED term,
    // but each problem must have an ICD-10 code so CPRS assigns a default ICD-10 code of R69 (ILLNESS, UNSPECIFIED).
    // SNOMED terms are not mapped to ICD-10 codes as they were with ICD-9 codes.
    // The provider can associate a more specific ICD-10 code on the Encounter’s Diagnosis tab.
    // That term will then display back on the Problems tab in the detailed display.
    it('Update a problem - Assign ICD10 CM to a problem', function () {
        var res = problemService.update({
            id: problemOneId,
            diagnosis: "80-503126",
            interestDate: NOW
        });

        expect(res).toBeDefined();
        expect(res.updated).toBeDefined();
        expect(res.updated.diagnosis.id).toEqual('80-503126');

        //confirm audits
        var descr = problemService.describe(problemOneId);

        expect(descr.result.audits).toBeDefined();
        expect(descr.result.audits.length).toEqual(23);

        var audit = descr.result.audits[22];
        expect(audit.oldValue).toEqual('521774');
        expect(audit.newValue).toEqual('503126');
    });

    it('Update a problem - change to a unique problem', function () {
        var res = problemService.update({
            id: problemOneId,
            "providerNarrative": "A unique problem",
            problem: "757_01-1",
            "diagnosis": "80-5570",
            interestDate: NOW,
            snomedCTConceptCode: '',
            snomedCTDesignationCode: '',
            uniqueNewTermRequested: true,
            uniqueTermRequestComment: 'A request comment'
        });

        expect(res).toBeDefined();
        expect(res.updated).toBeDefined();
        expect(res.updated.providerNarrative.label).toEqual('A unique problem');
        expect(res.updated.problem.id).toEqual("757_01-1");
        expect(res.updated.snomedCTConceptCode).toEqual("");
        expect(res.updated.snomedCTDesignationCode).toEqual("");

        //confirm audits
        var descr = problemService.describe(problemOneId);

        expect(descr.result.audits).toBeDefined();
        expect(descr.result.audits.length).toEqual(28);

        for (var i = 23; i < 28; i++) {
            if (descr.result.audits[i].fieldNumber === .05) {
                //provider narrative
                expect(descr.result.audits[i].oldValue).toEqual('1');
                expect(descr.result.audits[i].newValue).toEqual('4');
            } else if (descr.result.audits[i].fieldNumber === 1.01) {
                //problem
                expect(descr.result.audits[i].oldValue).toEqual('7130783');
                expect(descr.result.audits[i].newValue).toEqual('1');
                expect(descr.result.audits[i].reason).toEqual('Reformulated');
                expect(descr.result.audits[i].oldProblemEntry).toEqual('503126');
            }
            else if (descr.result.audits[i].fieldNumber === .01) {
                //diagnosis
                expect(descr.result.audits[i].oldValue).toEqual('503126');
                expect(descr.result.audits[i].newValue).toEqual('5570');
            } else if (descr.result.audits[i].fieldNumber === 80001) {
                //snomedCT concept code
                expect(descr.result.audits[i].oldValue).toEqual('73211009');
                expect(descr.result.audits[i].newValue).toEqual(' ');
            } else if (descr.result.audits[i].fieldNumber === 80002) {
                //snomedCT designation code
                expect(descr.result.audits[i].oldValue).toEqual('121589010');
                expect(descr.result.audits[i].newValue).toEqual(' ');
            }
        }
    });

    it('Update a problem - add a comment', function () {
        var addComment = {
            "id": problemOneId,
            "comments": [{
                "id": 1,
                "text": "A problem comment"
            }]
        };
        var res = problemService.update(addComment);

        expect(res.updated.comments).toBeDefined();
        expect(res.updated.comments.length).toEqual(1);
        expect(res.updated.comments[0].comment).toEqual(addComment.comments[0].comment);
        expect(res.vdmUpdateds[0].note_facility[0].note[0].note_narrative).toEqual("A problem comment");

        //new comments are not audited
        var descr = problemService.describe(problemOneId);
        expect(descr.result.audits).toBeDefined();
        expect(descr.result.audits.length).toEqual(28);
    });

    it('Update a problem - edit a comment', function () {
        var editComment = {
            "id": problemOneId,
            "comments": [{
                "id": 1,
                "text": "Editing a comment"
            }]
        };
        var res = problemService.update(editComment);

        expect(res.updated.comments).toBeDefined();
        expect(res.updated.comments.length).toEqual(1);
        expect(res.updated.comments[0].comment).toEqual(editComment.comments[0].comment);
        expect(res.vdmUpdateds[0].note_facility[0].note[0].note_narrative).toEqual("Editing a comment");

        //confirm audit
        var descr = problemService.describe(problemOneId);

        expect(descr.result.audits).toBeDefined();
        expect(descr.result.audits.length).toEqual(29);

        var audit = descr.result.audits[28];
        expect(audit.oldValue).toEqual('C');
        expect(audit.newValue).toBeUndefined();
        expect(audit.oldProblemEntry).toEqual('A problem comment');
        expect(audit.reason).toEqual('Note Modified');
    });

    it('Update a problem - remove a comment', function () {

        problemService.deleteComments(problemOneId, [1]);

        var descr = problemService.describe(problemOneId);
        expect(descr.result.comments).toBeUndefined();

        //confirm audit
        expect(descr.result.audits).toBeDefined();
        expect(descr.result.audits.length).toEqual(30);

        var audit = descr.result.audits[29];
        expect(audit.oldValue).toEqual('A');
        expect(audit.newValue).toBeUndefined();
        expect(audit.oldProblemEntry).toEqual('Editing a comment');
        expect(audit.reason).toEqual('Deleted Note');
    });

    // 2 problems setup above
    it("List all problems - across patients", function () {

        var res = problemService.list();
        expect(res.results).toBeDefined();
        expect(res.results.length).toEqual(2);
        for (var i = 0; i < res.results.length; i++) {
            expect(res.results[i].type).toEqual("Problem");
        }

    });

    it("Problem Service list event - list all problems", function (done) {

        var listRes;

        var SpyObj = { //dummy spy object
            listSpy: function () {
                //method used to test whether MVDM 'list' event was called.
            }
        };

        spyOn(SpyObj, 'listSpy');

        problemService.once('list', function (res) {
            listRes = res.data;
            SpyObj.listSpy();
        });

        problemService.list();

        _.delay(function () {
            expect(SpyObj.listSpy).toHaveBeenCalled();
            expect(SpyObj.listSpy.calls.count()).toEqual(1);
            expect(SpyObj.listSpy.calls.count()).not.toEqual(2);

            expect(listRes).toBeDefined();
            expect(listRes.results.length).toEqual(2);
            done();
        }, 100);
    });

    it('Problem filters', function () {
        var res = problemService.update({
            id: problemOneId,
            problemStatus: 'INACTIVE'
        });

        expect(res).toBeDefined();
        expect(res.updated).toBeDefined();
        expect(res.updated.problemStatus).toEqual('INACTIVE');

        //only list inactive problems
        res = problemService.list('inactive');

        expect(res.results).toBeDefined();
        expect(res.results.length).toEqual(1);
        expect(res.results[0].problemStatus).toEqual('INACTIVE');

        //only list active problems
        res = problemService.list('active');

        expect(res.results).toBeDefined();
        expect(res.results.length).toEqual(1);
        expect(res.results[0].problemStatus).toEqual('ACTIVE');

        //list both active and inactive problems
        res = problemService.list('both');

        expect(res.results).toBeDefined();
        expect(res.results.length).toEqual(2);
    });

    // Remove one problem => only one now shows in LIST
    it("Remove only problem of patient 1", function() {

        // relying on default userId and dateTime
        var removedRes = problemService.remove(problemOneId);

        // check that right VDM object was created
        expect(removedRes.removed).toBeDefined();
        expect(removedRes.removed.isRemoved).toBeDefined();
        expect(removedRes.removed.isRemoved).toEqual(true);

        //removalDetails not supported for the problems domain
        expect(removedRes.removed.removalDetails).toBeUndefined();

        //confirm presence of remove audit
        var descr = problemService.describe(problemOneId);

        expect(descr.result.audits).toBeDefined();
        expect(descr.result.audits.length).toEqual(32);
        var audit = descr.result.audits[descr.result.audits.length-1];
        expect(audit.reason).toEqual('Deleted');
        expect(audit.oldValue).toEqual('P');
        expect(audit.newValue).toEqual('H');

        var listRemoveRes = problemService.list("removed");
        expect(listRemoveRes.results).toBeDefined();
        expect(listRemoveRes.results.length).toEqual(1);
        expect(listRemoveRes.results[0].isRemoved).toEqual(true);

    });

    it("Can describe removed problem by id", function() {

        var descrRes = problemService.describe(problemOneId);

        expect(descrRes.result.id).toEqual(problemOneId);
        expect(descrRes.result.isRemoved).toBeDefined();
        expect(descrRes.result.isRemoved).toEqual(true);

        //removalDetails not supported for the problems domain
        expect(descrRes.removed).toBeUndefined();
    });


    it("Unremove problem of patient 1", function() {

        // relying on default userId and dateTime
        var unremoveRes = problemService.unremove(problemOneId);

        expect(unremoveRes.unremoved).toBeDefined();
        expect(unremoveRes.unremoved.id).toBeDefined();
        expect(unremoveRes.unremoved.id).toEqual(problemOneId);

        //confirm presence of unremove audit
        var descr = problemService.describe(problemOneId);

        expect(descr.result.audits).toBeDefined();
        expect(descr.result.audits.length).toEqual(33);
        var audit = descr.result.audits[descr.result.audits.length-1];
        expect(audit.reason).toEqual('Replaced');
        expect(audit.oldValue).toEqual('H');
        expect(audit.newValue).toEqual('P');

    });

    afterAll(function () {
        db.close();
    });
});
