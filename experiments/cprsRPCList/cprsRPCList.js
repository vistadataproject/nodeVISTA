#!/usr/bin/env node

'use strict';

var util = require('util');
var _ = require('underscore');
var fs = require('fs');
var RPCL = require('../../../VDM/prototypes/rpcL');
var masterList = require('../../../VDM/definitions/RPC/cprsRPCs.json');
var config = require('./config.json');

var rpcList = [];

var rpcL = new RPCL(null); //we just need RPCL to set 'locked' field

_.forEach(masterList, function(result) {
   //categories:
   //unknown, authentication, utility, read-mvdm-backed, write-mvdm-backed, user preferences
   var rpc = {};
   rpc.name = result.rpc;
   rpc.desc = result.desc;
   rpc.category = 'unknown';
   rpc.locked = false;

   // apply heuristics in order of priority with 1 being the highest priority
   // smallest value applied last (i.e 1), larger values applied first
   var heuristics = _.sortBy(config.heuristics, 'priority').reverse();
   _.forEach(heuristics, function(heuristic) {
      var regExp = new RegExp(heuristic.regExp);
      if (heuristic.field === "name" && regExp.test(rpc.name) ||
         heuristic.field === 'desc' && regExp.test(rpc.desc)) {
         rpc.category = heuristic.category;
      }
   });

   //check against manual config
   _.forEach(config.manualSettings, function(manualCfg) {
      if (rpc.name === manualCfg.name) {
         rpc.category = manualCfg.category;
      }
   });

   if (rpcL.isRPCSupported(rpc.name)) {
      rpc.locked = true;
   }

   rpcList.push(rpc);
});

rpcList = _.sortBy(rpcList, 'category');

fs.writeFile('cprsRPCs.json', JSON.stringify(rpcList, null, 2), function (err) {
   if (err) return console.log(err);
});