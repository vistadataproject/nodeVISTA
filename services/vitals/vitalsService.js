#!/usr/bin/env node

'use strict';

var _ = require('underscore');

var AbstractService = require('../abstractService');

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

        VDM.setDBAndModel(db, require('mvdm/vitals/vdmVitalsModel').vdmModel);
        VDM.setUserAndFacility(this.context.userId, this.context.facilityId);

        this.MVDM.setModel(require('mvdm/vitals/mvdmVitalsModel').mvdmModel);

        this.MVDM.setDefaultPatientId(this.context.patientId);
    }

    create(args) {

    }
}