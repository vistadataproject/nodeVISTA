#!/usr/bin/env node

'use strict';

const util = require('util');
const EventEmitter = require('events');
const _ = require('underscore');
const moment = require('moment');

const MVDM = require('mvdm/mvdm');
const VDM = require('mvdm/vdm');
const vdmUtils = require('mvdm/vdmUtils');
const nodem = require('nodem');

//supported VDM models
const vdmModels = [].concat(
    //allergies
    require('mvdm/allergies/vdmAllergiesModel').vdmModel,
    require('mvdm/documents/vdmDocumentsModel').vdmModel,
    require('mvdm/visits/vdmVisitsModel').vdmModel,

    //problems
    require('mvdm/problems/vdmProblemsModel').vdmModel,

    //vitals
    require('mvdm/vitals/vdmVitalsModel').vdmModel
);

//supported MVDM models
const mvdmModels = [].concat(
    //allergies
    require('mvdm/allergies/mvdmAllergiesModel').mvdmModel,
    require('mvdm/documents/mvdmDocumentsModel').mvdmModel,
    require('mvdm/visits/mvdmVisitsModel').mvdmModel,

    //problems
    require('mvdm/problems/mvdmProblemsModel').mvdmModel,

    //vitals
    require('mvdm/vitals/mvdmVitalsModel').mvdmModel
);

/**
 * Abstract service class.
 *
 */
class AbstractService extends EventEmitter {

    /**
     * Abstract service constructor.
     *
     * @param {Object} db VistA database instance.
     * @param {Object} serviceContext Contains service context data.
     * @param {String} serviceContext.userId User identifier.
     * @param {String} serviceContext.facilityId Facility identifier.
     * @param {String} serviceContext.patientId Patient identifier.
     */
    constructor(db, serviceContext) {
        super();

        if (!serviceContext.userId) {
            throw new Error('Missing userId in service context');
        } else if (!serviceContext.facilityId) {
            throw new Error('Missing facilityId in service context');
        }

        this.VDM = VDM;
        this.MVDM = MVDM;

        this.VDM.setDBAndModel(db, vdmModels);
        this.VDM.setUserAndFacility(serviceContext.userId, serviceContext.facilityId);

        this.MVDM.setModel(mvdmModels);

        this.context = {
            user:  {
                id: VDM.userId(),
                name: VDM.user().name.value
            },
            facility: {
                id: VDM.facilityId(),
                name: VDM.facility().name.value,
                stationNumber: VDM.facility().station_number.value
            }
        };

        if (serviceContext.patientId) {
            this.MVDM.setDefaultPatientId(serviceContext.patientId);
            this.context.patientId = serviceContext.patientId;
        }

        //protected methods

        this._emitEvent = function(eventName, domain, data) {
            this.emit(eventName, {
                type: eventName,
                timestamp: moment().format('YYYY-MM-DDTHH:mm:ss') + 'Z',
                domain: domain,
                user: this.context.user,
                facility: this.context.facility,
                patient: this.MVDM.context().patient,
                data: data
            });
        };

        /**
         * Assigns pointer id arguments and their values as pointer objects in a MVDM object.
         *
         * @param {Object} mvdmObj MVDM Object.
         * @param {Object} argsObj Object containing argument values.
         * @param *args Arguments to assign.
         * @returns {Object} MVDM Object with assigned pointer objects.
         */
        this.toPointer = function(mvdmObj, argsObj) {
            let args = Array.prototype.slice.call(arguments, 2);

            args.forEach(arg => {
                if (argsObj[arg]) {
                    mvdmObj[arg] = {
                        id: argsObj[arg]
                    };
                }
            });

            return mvdmObj;
        };

        /**
         * Assigns datetime arguments and their values as datetime objects in a MVDM object.
         *
         * @param mvdmObj {Object} mvdmObj MVDM Object.
         * @param argsObj {Object} argsObj Object containing argument values.
         * @param *args Arguments to assign.
         * @returns {Object} MVDM Object with assigned datetime objects.
         */
        this.toDateTime = function(mvdmObj, argsObj) {

            let args = Array.prototype.slice.call(arguments, 2);

            args.forEach(arg => {
                if (argsObj[arg]) {
                    mvdmObj[arg] = {
                        value: argsObj[arg],
                        type: 'xsd:datetime'
                    };
                }
            });

            return mvdmObj;
        };

        /**
         * Assigns datetime arguments and their values as date objects in a MVDM object.
         *
         * @param mvdmObj {Object} mvdmObj MVDM Object.
         * @param argsObj {Object} argsObj Object containing argument values.
         * @param *args Arguments to assign.
         * @returns {Object} MVDM Object with assigned date object.
         */
        this.toDate = function(mvdmObj, argsObj) {
            let args = Array.prototype.slice.call(arguments, 2);

            args.forEach(arg => {
                if (argsObj[arg]) {
                    mvdmObj[arg] = {
                        value: argsObj[arg],
                        type: 'xsd:date'
                    };
                }
            });

            return mvdmObj;
        };
    };
}

module.exports = AbstractService;