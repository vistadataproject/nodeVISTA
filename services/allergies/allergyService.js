#!/usr/bin/env node

'use strict';

const _ = require('underscore');
const moment = require('moment');

const AbstractService = require('../abstractService');

/**
 * Allergy Service Class
 *
 */
class AllergyService extends AbstractService {

    /**
     * Allergy Service constructor.
     *
     * @param {Object} db VistA database instance.
     * @param {Object} serviceContext Contains service context data.
     * @param {String} serviceContext.userId User identifier.
     * @param {String} serviceContext.facilityId Facility identifier.
     * @param {String} serviceContext.patientId Patient identifier.
     */
    constructor(db, serviceContext) {
        if (!serviceContext.patientId) {
            throw new Error('Allergy service requires a patientId');
        }

        super(db, serviceContext);

        //private methods

        this.emitEvent = function (eventName, data) {
            this._emitEvent(eventName, 'Allergy', data);
        };
    }

    /**
     * Creates a new Allergy
     *
     * @param {Object} args Create allergy arguments.
     * @param {String} args.reactantId Allergy reactant identifier.
     * @param {String} args.reactantName Allergy reactant name (e.g. CHOCOLATE).
     * @param {String} args.allergyType Type of allergy. Possible values: DRUG, DRUG, FOOD, FOOD, OTHER.
     * @param {String} args.mechanism Allergy mechanism. Possible values: ALLERGY, PHARMACOLOGI", UNKNOWN.
     * @param {String} args.observedOrHistorical Observed or historical indicator. Possible values: OBSERVED, HISTORICAL.
     * @param {String} args.allergySeverity Allergy severity. Possible values: MILD, MODERATE, SEVERE.
     * @param {String} args.dateOccurred Date occurred value.
     * @param {Array=} args.reactions List of reaction identifiers.
     * @param {Array=} args.comments List of allergy comments.
     *
     * @param {String=} args.enteredBy Entered by identifier. Defaults to user.
     * @fires create Service create event.
     * @returns MVDM create response.
     */
    create(args) {
        let mvdmObj = _.pick(args,
            'allergyType',
            'mechanism',
            'observedOrHistorical',
            'allergySeverity'
        );

        mvdmObj.type =  "Allergy";

        mvdmObj.reactant = {};

        if (args.reactantId) {
            mvdmObj.reactant.id = args.reactantId;
        }

        if (args.reactantName) {
            mvdmObj.reactant.label = args.reactantName;
        }

        mvdmObj = this.toDate(
            mvdmObj,
            args,
            'dateOccurred'
        );

        if (args.reactions) {
            mvdmObj.reactions = [];

            args.reactions.forEach(reactionId => {
                mvdmObj.reactions.push({
                    reaction: {
                        id: reactionId
                    }
                })
            });
        }

        if (args.comments) {
            mvdmObj.comments = [];

            args.comments.forEach(comment => {
                mvdmObj.comments.push({
                    comment: comment
                })
            });
        }

        let res = this.MVDM.create(mvdmObj);

        this.emitEvent('create', res);

        return res;
    }

    /**
     * Describes an allergy.
     *
     * @param {String} allergyId Allergy identifier.
     * @fire describe Service describe event.
     * @returns MVDM describe response.
     */
    describe(allergyId) {
        let res = this.MVDM.describe(allergyId);

        this.emitEvent('describe', res);

        return res;
    };
}

module.exports = AllergyService;