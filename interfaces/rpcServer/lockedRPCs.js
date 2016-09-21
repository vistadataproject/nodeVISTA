#!/usr/bin/env node
'use strict';

var _ = require('underscore');

var lockedList = [
   //allergies
   'ORQQAL DETAIL',
   'ORWDAL32 SAVE ALLERGY',

   //problems
   'ORQQPL ADD SAVE',
   'ORQQPL DETAIL',
   'ORQQPL PROBLEM LIST',
   'ORQQPL EDIT SAVE',
   'ORQQPL UPDATE',
   'ORQQPL DELETE',
   'ORQQPL REPLACE'
];

module.exports = function() {

   var sortedList = _.sortBy(lockedList);

   return {
      has: function(rpcName) {
         return _.indexOf(sortedList, rpcName, true) > -1;
      }
   }
}();