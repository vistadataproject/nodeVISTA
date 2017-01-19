#!/usr/bin/env node

'use strict';

var util = require('util');
var EventEmitter = require('events');
var _ = require('underscore');

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

   EventEmitter.call(this);

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

   //forward MVDM events
   var onCreate = _.bind(function(event) {
      this.emit('create', event);
   }, this);

   MVDM.on('create', onCreate);
}

//inherit behavior from EventEmitter
util.inherits(ProblemService, EventEmitter);

/**
 * Creates a new problem
 * @param {Object} args Create problem arguments
 * @param {String} args.diagnosis Diagnosis identifier
 * @param {String} args.providerNarrative Problem narrative string (e.g. 'Hypertension')
 * @param {String} args.problem Problem expression identifier
 * @param {String} args.clinic Clinic identifier
 * @param {String} args.problemStatus Status of a problem. Possible values: ACTIVE, INACTIVE
 * @param {String} args.snomedCTConceptCode SNOMED CT concept code
 * @param {String} args.snomedCTDesignationCode SNMOED CT designation code
 * @param {String} args.codingSystem Coding system associated with the problem (e.g. 10D)
 * @param {String=} args.responsibleProvider Responsible provider identifier
 * @param {String=} args.priority Immediacy value. Possible values: ACUTE, CHRONIC
 * @param {String=} args.onsetDate Date of problem onset
 * @param {String=} args.interestDate Date of interest
 * @param {Boolean=} args.uniqueTermRequested Indicates whether a unique term was requested
 * @param {String=} args.uniqueTermRequestComment Unique term request comment
 * @param {Array=} args.treatmentFactors List of treatment factors. Possible values: SERVICE_CONNECTED, AGENT_ORANGE,
 *                            IONIZING_RADIATION, PERSIAN_GULF, HEAD_AND_OR_NECK_CANCER,
 *                            MILITARY_SEXUAL_TRAUMA, COMBAT_VETERAN, SHIPBOARD_HAZARD_DEFENSE
 * @param {Array=} args.comments Problem comments
 */
ProblemService.prototype.createProblem = function(args) {
   var mvdmObj = {
      type: "Problem",
      condition: "PERMANENT"
   };

   if (args.diagnosis) {
      mvdmObj.diagnosis = {
         id: args.diagnosis
      }
   }

   if (args.providerNarrative) {
      mvdmObj.providerNarrative = {
         id: '9999999_27',
         label: args.providerNarrative
      };
   }

   if (args.problem) {
      mvdmObj.problem = {
         id: args.problem
      };
   }

   if (args.clinic) {
      mvdmObj.clinic = {
         id: args.clinic
      };
   }

   if (args.problemStatus) {
      mvdmObj.problemStatus = args.problemStatus;
   }

   if (args.snomedCTConceptCode) {
      mvdmObj.snomedCTConceptCode = args.snomedCTConceptCode;
   }

   if (args.snomedCTDesignationCode) {
      mvdmObj.snomedCTDesignationCode = args.snomedCTDesignationCode;
   }

   if (args.codingSystem) {
      mvdmObj.codingSystem = args.codingSystem;
   }

   if (args.responsibleProvider) {
      mvdmObj.responsibleProvider = {
         id: args.responsibleProvider
      };
   }

   if (args.priority) {
      mvdmObj.priority = args.priority;
   }

   if (args.onsetDate) {
      mvdmObj.onsetDate = {
         value: args.onsetDate,
         type: 'xsd:date'
      };
   }

   if (args.interestDate) {
      mvdmObj.interestDate = {
         value: args.interestDate,
         type: 'xsd:date'
      };
   }

   if (args.uniqueTermRequested) {
      mvdmObj.uniqueTermRequested = args.uniqueTermRequested;
   }

   if (args.uniqueTermRequestComment) {
      mvdmObj.uniqueTermRequestComment = args.uniqueTermRequestComment;
   }

   if (args.treatmentFactors) {
      args.treatmentFactors.forEach(function(treatmentFactor) {
         switch (treatmentFactor) {
            case 'SERVICE_CONNECTED':
               mvdmObj.isServiceConnected = true;
               break;
            case 'AGENT_ORANGE':
               mvdmObj.isAgentOrangeExposure = true;
               break;
            case 'IONIZING_RADIATION':
               mvdmObj.isIonizingRadiationExposure = true;
               break;
            case 'PERSIAN_GULF':
               mvdmObj.isPersianGulfExposure = true;
               break;
            case 'HEAD_AND_OR_NECK_CANCER':
               mvdmObj.isHeadAndOrNeckCancer = true;
               break;
            case 'MILITARY_SEXUAL_TRAUMA':
               mvdmObj.isMilitarySexualTrauma = true;
               break;
            case 'COMBAT_VETERAN':
               mvdmObj.isCombatVeteran = true;
               break;
            case 'SHIPBOARD_HAZARD_DEFENSE':
               mvdmObj.isShipboardHazardDefense = true;
               break;
         }
      });
   }

   if (args.comments) {
      mvdmObj.comments = [];
      var commentId = 0;
      args.comments.forEach(function(comment) {
         mvdmObj.comments.push({
            commentId: ++commentId,
            commentText: comment
         });
      });
   }

   return MVDM.create(mvdmObj);
};

module.exports = ProblemService;