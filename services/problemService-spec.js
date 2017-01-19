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

var db, problemService;

describe('testProblemService', function() {

   beforeAll(function () {

      db = new nodem.Gtm();
      db.open();

      problemUtils.purgeAllProblems(db);

      var userId = fileman.lookupBy01(db, "200", "ALEXANDER,ROBERT").id;
      var facilityId = fileman.lookupBy01(db, "4", "VISTA HEALTH CARE").id;
      var patientId = fileman.lookupBy01(db, "2", "CARTER,DAVID").id;

      problemService = new ProblemService(db, {
         userId: userId,
         facilityId: facilityId,
         patientId: patientId
      });

      testProblems = require('./testProblems')(db, userId, facilityId);
   });

   it('test problem create', function() {

      var res = problemService.createProblem(_.clone(testProblems.active.one.createInput));

      console.log('\n\nres: %s\n\n', JSON.stringify(res, null, 2));

   });

   afterAll(function() {
      db.close();
   });
});
