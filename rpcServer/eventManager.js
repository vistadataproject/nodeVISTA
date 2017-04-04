#!/usr/bin/env node
'use strict';

var _ = require('lodash');
var util = require('util');
var EventEmitter = require('events');

function EventHandler() {
    EventEmitter.call(this);
}

//inherit behavior from EventEmitter
util.inherits(EventHandler, EventEmitter);

var eventHandler = new EventHandler();

module.exports = eventHandler;