#!/usr/bin/env node

'use strict';

const _ = require('underscore');
const moment = require('moment');

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

        //private methods

        this.emitEvent = function(eventName, data) {
            this._emitEvent(eventName, 'Problem', data);
        };

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
    };

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

        let mvdmObj = _.pick(args,
            'problemStatus',
            'responsibleProvider',
            'snomedCTConceptCode',
            'snomedCTDesignationCode',
            'codingSystem',
            'condition',
            'priority',
            'uniqueTermRequested',
            'uniqueTermRequestComment');

        mvdmObj.type =  "Problem";
        mvdmObj.condition = "PERMANENT"; //default to PERMANENT

        if (args.providerNarrative) {
            mvdmObj.providerNarrative = {
                id: '9999999_27',
                label: args.providerNarrative
            };
        }

        mvdmObj = this.toPointer(
            mvdmObj,
            args,
            'diagnosis',
            'problem',
            'clinic',
            'responsibleProvider');

        mvdmObj = this.toDate(
            mvdmObj,
            args,
            'onsetDate',
            'interestDate');

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

        let res = this.MVDM.create(mvdmObj);

        this.emitEvent('create', res);

        return res;
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

        let mvdmObj = _.pick(args,
            'id',
            'problemStatus',
            'snomedCTConceptCode',
            'snomedCTDesignationCode',
            'codingSystem',
            'condition',
            'priority',
            'uniqueTermRequested',
            'uniqueTermRequestComment');

        mvdmObj.type = 'Problem';

        if (args.providerNarrative) {
            mvdmObj.providerNarrative = {
                id: '9999999_27',
                label: args.providerNarrative
            };
        }

        mvdmObj = this.toPointer(
            mvdmObj,
            args,
            'diagnosis',
            'problem',
            'clinic',
            'responsibleProvider');

        mvdmObj = this.toDate(
            mvdmObj,
            args,
            'onsetDate',
            'interestDate');

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

        let res = this.MVDM.update(mvdmObj);

        this.emitEvent('update', res);

        return res;
    };

    /**
     * Describes a problem.
     *
     * @param {String} problemId Problem identifier.
     * @fire describe MVDM describe event.
     * @returns MVDM describe response.
     */
    describe(problemId) {
        let res = this.MVDM.describe(problemId);

        this.emitEvent('describe', res);

        return res;
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

        let filterResults = function (results) {

            results = _.sortBy(results, 'lastModifiedDate');

            if (!filter) {
                return results;
            }

            let filteredProblems = [];
            results.forEach(problem => {
                if ((problem.condition !== 'HIDDEN' &&
                    ((filter === 'both' || filter === 'active') && problem.problemStatus === 'ACTIVE') ||      //both or just active
                    ((filter === 'both' || filter === 'inactive') && problem.problemStatus === 'INACTIVE')) || //both or just inactive
                    (filter === 'removed' && problem.condition === 'HIDDEN'))                                  //removed problems
                {
                    filteredProblems.push(problem);
                }
            });

            filteredProblems = _.sortBy(filteredProblems, 'problemStatus');

            return filteredProblems;
        };

        let res = this.MVDM.list("Problem", this.context.patientId, queryRemoved);

        res.results = filterResults(res.results);

        this.emitEvent('list', res);

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
        let res = this.MVDM.remove(problemId);

        this.emit('remove', res);

        return res;
    };

    /**
     * Unremoves a problem.
     *
     * @param {String} problemId Problem identifier.
     * @fires unremove MVDM unremove event.
     * @returns MVDM unremove response.
     */
    unremove(problemId) {
        let res = this.MVDM.unremove(problemId);

        this.emit('unremove', res);

        return res;
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

        let res = this.MVDM.delete(mvdmComments);

        this.emitEvent('deleteComments', res);

        return res;
    };
}

module.exports = ProblemService;