#!/usr/bin/env node

'use strict';

let util = require('util');
let EventEmitter = require('events');
let _ = require('underscore');

let MVDM = require('mvdm/mvdm');
let VDM = require('mvdm/vdm');
let vdmUtils = require('mvdm/vdmUtils');
let nodem = require('nodem');

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

        this.context = serviceContext;

        if (!this.context.userId) {
            throw new Error('Missing userId in service context');
        } else if (!this.context.facilityId) {
            throw new Error('Missing facilityId in service context');
        } else if (!this.context.patientId) {
            throw new Error('Missing patientId in service context');
        }

        this.VDM = VDM;
        this.MVDM = MVDM;

        //forward MVDM events
        let onCreate = _.bind(function (event) {
            this.emit('create', event);
        }, this);

        this.MVDM.on('create', onCreate);

        let onUpdate = _.bind(function (event) {
            this.emit('update', event);
        }, this);

        this.MVDM.on('update', onUpdate);

        let onDescribe = _.bind(function (event) {
            this.emit('describe', event);
        }, this);

        this.MVDM.on('describe', onDescribe);

        let onList = _.bind(function (event) {
            this.emit('list', event);
        }, this);

        this.MVDM.on('list', onList);

        let onRemove = _.bind(function (event) {
            this.emit('remove', event);
        }, this);

        this.MVDM.on('remove', onRemove);

        let onUnremove = _.bind(function (event) {
            this.emit('unremove', event);
        }, this);

        this.MVDM.on('unremove', onUnremove);

        let onDelete = _.bind(function (event) {
            this.emit('delete', event);
        }, this);

        this.MVDM.on('delete', onDelete);
    }
}

module.exports = AbstractService;