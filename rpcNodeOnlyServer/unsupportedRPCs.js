#!/usr/bin/env node
'use strict';

var HashMap = require('hashmap');
var CONFIG = require('./cfg/config.js');

var unsupportedRpcs = new HashMap();

unsupportedRpcs.set("TCPConnect", "\u0000\u0000accept\u0004");
unsupportedRpcs.set("#REJECT#", "\u0000\u0000reject\u0004");
unsupportedRpcs.set("#BYE#", "\u0000\u0000#BYE#\u0004");

module.exports = unsupportedRpcs;