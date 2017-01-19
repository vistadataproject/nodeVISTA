#!/usr/bin/env node

'use strict';

var MVDM = require('mvdm/mvdm');
var VDM = require('mvdm/vdm');
var vdmUtils = require('mvdm/vdmUtils');
var nodem = require('nodem');


/**
 * Problem Service constructor
 * @class ProblemService
 * @param {Object} db VistA database instance
 * @param {Object} serviceContext Contains service context data.
 * @param {String} serviceContext.userId User identifier
 * @param {String} serviceContext.facilityId Facility identifier
 * @param {String} serviceContext.patientId Patient identifier
 */
function ProblemService(db, serviceContext) {

   this.context = serviceContext;

   if (!this.context.userId) {
      throw new Error('Missing userId in service context');
   } else if (!this.context.facilityId) {
      throw new Error('Missing facilityId in service context');
   } else if (!this.context.patientId) {
      throw new Error('Missing patientId in service context');
   }

   VDM.setDBAndModel(db, require('mvdm/problems/vdmProblemsModel').vdmModel);
   VDM.setUserAndFacility(this.context .userId, this.context .facilityId);

   MVDM.setModel(require('mvdm/problems/mvdmProblemsModel').mvdmModel);

   MVDM.setDefaultPatientId(this.context.patientId);
}

/**
 * Creates a new problem
 * @param {Object} args Create problem arguments
 * @param {String} args.diagnosis Diagnosis identifier
 * @param {String} args.problemNarrative Problem narrative string (e.g. 'Hypertension')
 * @param {String} args.problem Problem expression identifier
 * @param {String} args.responsibleProvider Responsible provider
 * @param {String} args.clinic Clinic identifier
 * @param {String} args.problemStatus Status of a problem (e.g. ACTIVE, INACTIVE)
 * @param {String} args.snomedCTConceptCode SNOMED CT concept code
 * @param {String} args.snomedCTDesignationCode SNMOED CT designation code
 * @param {String} args.codingSystem Coding system associated with the problem (e.g. 10D)
 * @param {String=} args.priority Immediacy value (e.g. ACUTE, CHRONIC)
 * @param {String=} args.onsetDate Date of problem onset
 * @param {Array=} args.comments Problem comments
 * @param {String=} args.interestDate Date of interest
 * @param {Array=} args.treatmentFactors List of treatment factors (AGENT_ORANGE, PERSIAN_GULF, etc.)
 * @param {Boolean=} args.uniqueTermRequested Indicates whether a unique term was requested
 * @param {String=} args.uniqueTermRequestComment Unique term request comment
 */
ProblemService.prototype.createProblem = function(args) {
   return MVDM.create(args);
};

module.exports = ProblemService;