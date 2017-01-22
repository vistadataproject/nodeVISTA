#!/usr/bin/env node

'use strict';

const util = require('util');
const EventEmitter = require('events');
const _ = require('underscore');

const MVDM = require('mvdm/mvdm');
const VDM = require('mvdm/vdm');
const vdmUtils = require('mvdm/vdmUtils');
const nodem = require('nodem');

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
        const onCreate = _.bind(function (event) {
            this.emit('create', event);
        }, this);

        this.MVDM.on('create', onCreate);

        const onUpdate = _.bind(function (event) {
            this.emit('update', event);
        }, this);

        this.MVDM.on('update', onUpdate);

        const onDescribe = _.bind(function (event) {
            this.emit('describe', event);
        }, this);

        this.MVDM.on('describe', onDescribe);

        const onList = _.bind(function (event) {
            this.emit('list', event);
        }, this);

        this.MVDM.on('list', onList);

        const onRemove = _.bind(function (event) {
            this.emit('remove', event);
        }, this);

        this.MVDM.on('remove', onRemove);

        const onUnremove = _.bind(function (event) {
            this.emit('unremove', event);
        }, this);

        this.MVDM.on('unremove', onUnremove);

        const onDelete = _.bind(function (event) {
            this.emit('delete', event);
        }, this);

        this.MVDM.on('delete', onDelete);
    }
}

module.exports = AbstractService;