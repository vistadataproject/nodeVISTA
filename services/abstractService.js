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
        var onCreate = _.bind(function (event) {
            this.emit('create', event);
        }, this);

        this.MVDM.on('create', onCreate);

        var onUpdate = _.bind(function (event) {
            this.emit('update', event);
        }, this);

        this.MVDM.on('update', onUpdate);

        var onDescribe = _.bind(function (event) {
            this.emit('describe', event);
        }, this);

        this.MVDM.on('describe', onDescribe);

        var onList = _.bind(function (event) {
            this.emit('list', event);
        }, this);

        this.MVDM.on('list', onList);

        var onRemove = _.bind(function (event) {
            this.emit('remove', event);
        }, this);

        this.MVDM.on('remove', onRemove);

        var onUnremove = _.bind(function (event) {
            this.emit('unremove', event);
        }, this);

        this.MVDM.on('unremove', onUnremove);

        var onDelete = _.bind(function (event) {
            this.emit('delete', event);
        }, this);

        this.MVDM.on('delete', onDelete);
    }
}

module.exports = AbstractService;