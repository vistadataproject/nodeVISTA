#!/usr/bin/env node

'use strict';

const _ = require('underscore');

const AbstractService = require('../abstractService');

/**
 * Vitals Class
 *
 */
class VitalsService extends AbstractService {

    /**
     * Vitals Service constructor.
     *
     * @param {Object} db VistA database instance.
     * @param {Object} serviceContext Contains service context data.
     * @param {String} serviceContext.userId User identifier.
     * @param {String} serviceContext.facilityId Facility identifier.
     * @param {String} serviceContext.patientId Patient identifier.
     */
    constructor(db, serviceContext) {
        super(db, serviceContext);

        this.VDM.setDBAndModel(db, require('mvdm/vitals/vdmVitalsModel').vdmModel);
        this.VDM.setUserAndFacility(this.context.userId, this.context.facilityId);

        this.MVDM.setModel(require('mvdm/vitals/mvdmVitalsModel').mvdmModel);

        this.MVDM.setDefaultPatientId(this.context.patientId);
    }

    /**
     * Creates a new vital.
     *
     * @param {Object} args Create vital arguments.
     * @param {String} args.vitalsTakenDateTime Vitals taken date time.
     * @param {String} args.vitalType Vital type identifier.
     * @param {String} args.hospitalLocation Hospital location identifier.
     * @param {String} args.enteredBy Entered by identifier.
     * @param {String} args.value Vital value.
     * @param {String} args.units Units value.
     * @param {String=} args.vitalsEnteredDateTime Vitals entered date time. Defaults to T.
     * @param {String=} args.supplementalO2 Supplemental O2.
     * @param {Array=} args.qualifiers List of qualifier identifiers.
     * @fires create MVDM create event.
     * @returns MVDM create response.
     */
    create(args) {

        let mvdmObj = _.pick(args, 'value', 'supplementalO2');

        mvdmObj.type = 'Vital';

        mvdmObj = this.toPointer([
            'vitalType',
            'hospitalLocation',
            'enteredBy'],
            args, mvdmObj);

        mvdmObj = this.toDateTime([
            'vitalsTakenDateTime',
            'vitalsEnteredDateTime'],
            args, mvdmObj);

        if (args.qualifiers) {

            mvdmObj.qualifier = [];

            args.qualifiers.forEach(function(qualifer) {
                mvdmObj.qualifier.push({
                    id: qualifer
                });
            });
        }

        return this.MVDM.create(mvdmObj);
    }

    /**
     * Describes a vital.
     *
     * @param {String} vitalId Vital identifier.
     * @fires describe MVDM describe event.
     * @returns MVDM vital response.
     */
    describe(vitalId) {
        return this.MVDM.describe(vitalId);
    }
}

module.exports = VitalsService;