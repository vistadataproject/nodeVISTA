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

describe('testProblemService', function() {

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
         for(var i = 0; i < res.comments.length; i++) {
            expectedResult.comments[i].enteredBy = res.comments[i].enteredBy;
            expectedResult.comments[i].enteredDate = res.comments[i].enteredDate;
            expectedResult.comments[i].facility = res.comments[i].facility;
         }
      }
      return expectedResult;
   }

   var problemOneId;

   it("Create a new problem using service - expect MVDM create return", function() {

      var res = problemService.createProblem(_.clone(testProblems.active.one.createArgs));

      problemOneId = res.created.id;

      expect(res.created).toBeDefined();

      var mvdmResultForTest = _.omit(res.created, ["id", "uniqueId"]);

      var expectedResult = setDefaultValues(testProblems.active.one.createResult, res.created);

      Object.keys(mvdmResultForTest).forEach(function(key) {
         expect(mvdmResultForTest[key]).toEqual(expectedResult[key]);
      });
   });

   it("Create problem with comments", function(done) {

      //listen for problemService MVDM create event
      var createRes, _userId, _facilityId, eventTimestamp;

      var SpyObj = { //dummy spy object
         createSpy: function() {
            //method used to test whether problemService's MVDM 'create' event was called.
         }
      };

      spyOn(SpyObj, 'createSpy');

      problemService.once('create', function(res) {
         createRes = res.data;
         _userId = res.user.id;
         _facilityId = res.facility.id;
         eventTimestamp = res.timestamp;
         SpyObj.createSpy();
      });

      problemService.createProblem(_.clone(testProblems.active.two.createArgs));

      _.delay(function() {
         expect(SpyObj.createSpy).toHaveBeenCalled();
         expect(SpyObj.createSpy.calls.count()).toEqual(1);
         expect(SpyObj.createSpy.calls.count()).not.toEqual(2);

         expect(_userId).toEqual(userId);
         expect(_facilityId).toEqual(facilityId);
         expect(eventTimestamp).toMatch(/20\d\d-\d\d-\d\dT/);

         var mvdmResultForTest = _.omit(createRes.created, ["id", "uniqueId"]);

         var expectedResult = setDefaultValues(testProblems.active.two.createResult, createRes.created);
         Object.keys(mvdmResultForTest).forEach(function(key) {
            expect(mvdmResultForTest[key]).toEqual(expectedResult[key]);
         });

         done();
      }, 100);
   });


   afterAll(function() {
      db.close();
   });
});
