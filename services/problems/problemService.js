#!/usr/bin/env node

'use strict';

const _ = require('underscore');

const AbstractService = require('../abstractService');

/**
 * Problem Service Class
 *
 */
class ProblemService extends AbstractService {

    /**
     * Problem Service constructor.
     *
     * @param {Object} db VistA database instance.
     * @param {Object} serviceContext Contains service context data.
     * @param {String} serviceContext.userId User identifier.
     * @param {String} serviceContext.facilityId Facility identifier.
     * @param {String} serviceContext.patientId Patient identifier.
     */
    constructor(db, serviceContext) {
        super(db, serviceContext);

        this.VDM.setDBAndModel(db, require('mvdm/problems/vdmProblemsModel').vdmModel);
        this.VDM.setUserAndFacility(this.context.userId, this.context.facilityId);

        this.MVDM.setModel(require('mvdm/problems/mvdmProblemsModel').mvdmModel);

        this.MVDM.setDefaultPatientId(this.context.patientId);

        //private methods
        this.setTreatmentFactors = function(treatmentFactors, mvdmObj) {
            treatmentFactors.forEach(treatmentFactor => {
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

            return mvdmObj;
        }
    }

    /**
     * Creates a new problem
     *
     * @param {Object} args Create problem arguments.
     * @param {String} args.diagnosis Diagnosis identifier.
     * @param {String} args.providerNarrative Problem narrative string (e.g. 'Hypertension').
     * @param {String} args.problem Problem expression identifier.
     * @param {String} args.clinic Clinic identifier.
     * @param {String} args.problemStatus Status of a problem. Possible values: ACTIVE, INACTIVE.
     * @param {String} args.snomedCTConceptCode SNOMED CT concept code.
     * @param {String} args.snomedCTDesignationCode SNMOED CT designation code.
     * @param {String} args.codingSystem Coding system associated with the problem (e.g. 10D).
     * @param {String=} args.condition Problem condition. Possible values: TRANSCRIBED, PERMANENT, HIDDEN. Defaults to PERMANENT.
     * @param {String=} args.responsibleProvider Responsible provider identifier. Defaults to user.
     * @param {String=} args.priority Immediacy value. Possible values: ACUTE, CHRONIC.
     * @param {String=} args.onsetDate Date of problem onset.
     * @param {String=} args.interestDate Date of interest.
     * @param {Boolean=} args.uniqueTermRequested Indicates whether a unique term was requested.
     * @param {String=} args.uniqueTermRequestComment Unique term request comment.
     * @param {Array=} args.treatmentFactors List of treatment factors. Possible values: SERVICE_CONNECTED, AGENT_ORANGE,
     *                            IONIZING_RADIATION, PERSIAN_GULF, HEAD_AND_OR_NECK_CANCER,
     *                            MILITARY_SEXUAL_TRAUMA, COMBAT_VETERAN, SHIPBOARD_HAZARD_DEFENSE.
     * @param {Array=} args.comments Problem comments.
     * @fires create MVDM create event.
     * @returns MVDM create response.
     */
    create(args) {
        let mvdmObj = {
            type: "Problem",
            condition: "PERMANENT" //default to PERMANENT
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

        if (args.condition) {
            mvdmObj.condition = args.condition;
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
            this.setTreatmentFactors(args.treatmentFactors, mvdmObj);
        }

        if (args.comments) {
            mvdmObj.comments = [];
            let commentId = 0;
            args.comments.forEach(comment => {
                mvdmObj.comments.push({
                    commentId: ++commentId,
                    commentText: comment
                });
            });
        }

        return this.MVDM.create(mvdmObj);
    };


    /**
     * Updates an existing problem.
     *
     * @param {Object} args Update problem arguments.
     * @param {String} args.id Problem identifier.
     * @param {String} args.diagnosis Diagnosis identifier.
     * @param {String} args.providerNarrative Problem narrative string (e.g. 'Hypertension').
     * @param {String} args.problem Problem expression identifier.
     * @param {String} args.clinic Clinic identifier.
     * @param {String} args.problemStatus Status of a problem. Possible values: ACTIVE, INACTIVE.
     * @param {String} args.snomedCTConceptCode SNOMED CT concept code.
     * @param {String} args.snomedCTDesignationCode SNMOED CT designation code.
     * @param {String} args.codingSystem Coding system associated with the problem (e.g. 10D).
     * @param {String=} args.condition Problem condition. Possible values: TRANSCRIBED, PERMANENT, HIDDEN. Defaults to PERMANENT
     * @param {String=} args.responsibleProvider Responsible provider identifier.
     * @param {String=} args.priority Immediacy value. Possible values: ACUTE, CHRONIC.
     * @param {String=} args.onsetDate Date of problem onset.
     * @param {String=} args.interestDate Date of interest.
     * @param {Boolean=} args.uniqueTermRequested Indicates whether a unique term was requested.
     * @param {String=} args.uniqueTermRequestComment Unique term request comment.
     * @param {Array=} args.treatmentFactors List of treatment factors. Possible values: SERVICE_CONNECTED, AGENT_ORANGE,
     *                            IONIZING_RADIATION, PERSIAN_GULF, HEAD_AND_OR_NECK_CANCER,
     *                            MILITARY_SEXUAL_TRAUMA, COMBAT_VETERAN, SHIPBOARD_HAZARD_DEFENSE.
     * @param {Array=} args.comments Problem comments.
     * @param {String} args.comments.comment.id Comment index.
     * @param {String} args.comments.comment.text Comment text.
     * @fires update MVDM update event.
     * @returns MVDM update response.
     */
    update(args) {
        let mvdmObj = {
            type: "Problem"
        };

        if (args.id) {
            mvdmObj.id = args.id;
        }

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

        if (args.snomedCTConceptCode || args.snomedCTConceptCode == '') {
            mvdmObj.snomedCTConceptCode = args.snomedCTConceptCode;
        }

        if (args.snomedCTDesignationCode || args.snomedCTConceptCode == '') {
            mvdmObj.snomedCTDesignationCode = args.snomedCTDesignationCode;
        }

        if (args.codingSystem) {
            mvdmObj.codingSystem = args.codingSystem;
        }

        if (args.condition) {
            mvdmObj.condition = args.condition;
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
            this.setTreatmentFactors(args.treatmentFactors, mvdmObj);
        }

        if (args.comments) {
            mvdmObj.comments = [];
            args.comments.forEach(comment => {
                mvdmObj.comments.push({
                    commentId: comment.id,
                    commentText: comment.text
                });
            });
        }

        return this.MVDM.update(mvdmObj);
    };

    /**
     * Describes a problem.
     *
     * @param {String} problemId Problem identifier.
     * @fire describe MVDM describe event.
     * @returns MVDM describe response.
     */
    describe(problemId) {
        return this.MVDM.describe(problemId);
    };

    /**
     * List of problems.
     *
     * @param {String} filter Problem list status filter. Possible values: active, inactive, both, removed.
     * @fire list MVDM list event.
     * @returns this.MVDM list response.
     */
    list(filter) {

        if (filter) {
            filter = filter.toLowerCase();
        }

        let queryRemoved = false;

        if (filter === 'removed') {
            queryRemoved = true;
        }

        let res = this.MVDM.list("Problem", this.context.patientId, queryRemoved);

        res.results = _.sortBy(res.results, 'lastModifiedDate');

        if (!filter) {
            return res;
        }

        let filteredProblems = [];
        res.results.forEach(problem => {
            if ((problem.condition !== 'HIDDEN' &&
                ((filter === 'both' || filter === 'active') && problem.problemStatus === 'ACTIVE') ||      //both or just active
                ((filter === 'both' || filter === 'inactive') && problem.problemStatus === 'INACTIVE')) || //both or just inactive
                (filter === 'removed' && problem.condition === 'HIDDEN'))                                  //removed problems
            {
                filteredProblems.push(problem);
            }
        });

        filteredProblems = _.sortBy(filteredProblems, 'problemStatus');

        res.results = filteredProblems;

        return res;
    };

    /**
     * Removes a problem.
     *
     * @param {String} problemId Problem identifier.
     * @fires remove MVDM remove event.
     * @returns MVDM remove response.
     */
    remove(problemId) {
        return this.MVDM.remove(problemId);
    };

    /**
     * Unremoves a problem.
     *
     * @param {String} problemId Problem identifier.
     * @fires unremove MVDM unremove event.
     * @returns MVDM unremove response.
     */
    unremove(problemId) {
        return this.MVDM.unremove(problemId);
    };

    /**
     * Deletes problem comments.
     *
     * @param {String} problemId Problem identifier.
     * @param {Array} commentIds Comment indexes to delete (e.g. [1, 3, 5])
     * @fires delete MVDM delete event.
     * @returns MVDM delete response.
     */
    deleteComments(problemId, commentIds) {
        let mvdmComments = {
            id: problemId,
            comments: []
        };

        commentIds.forEach(commentId => {
            mvdmComments.comments.push({
                commentId: commentId
            })
        });

        return this.MVDM.delete(mvdmComments);
    };
}

module.exports = ProblemService;