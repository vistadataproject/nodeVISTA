#!/usr/bin/env node
'use strict';

var _ = require('underscore');
var util = require('util');
var EventEmitter = require('events');
var MVDM = require('../../../VDM/prototypes/mvdm');

function EventHandler() {
   EventEmitter.call(this);
}

//inherit behavior from EventEmitter
util.inherits(EventHandler, EventEmitter);

var eventHandler = new EventHandler();

//proxy MVDM events

MVDM.on('create', function(mvdmData) {
   eventHandler.emit('mvdmCreate', mvdmData);
});

MVDM.on('describe', function(mvdmData) {
   eventHandler.emit('mvdmDescribe', mvdmData);
});

MVDM.on('list', function(mvdmData) {
   eventHandler.emit('mvdmList', mvdmData);
});

MVDM.on('update', function(mvdmData) {
   eventHandler.emit('mvdmUpdate', mvdmData);
});

MVDM.on('remove',function(mvdmData) {
   eventHandler.emit('mvdmRemove', mvdmData);
});

MVDM.on('unremoved', function(mvdmData) {
   eventHandler.emit('mvdmUnremoved', mvdmData);
});

MVDM.on('delete', function(mvdmData) {
   eventHandler.emit('mvdmDelete', mvdmData);
});

module.exports = eventHandler;