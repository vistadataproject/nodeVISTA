/*global define*/
define([
   'jquery',
   'underscore',
   'backbone'
], function ($, _, Backbone) {
   'use strict';

   var StatsModel = Backbone.Model.extend({
      defaults: {
         distinctRPC: {} //map of distinct RPCs and the number of times it was invoked
      },

      total: function() {
         var total = 0;
         _.forEach(_.values(this.get('distinctRPC')), function(val) {
            total += val.count;
         });

         return total;
      },

      distinctTotal: function() {
         return _.keys(this.get('distinctRPC')).length;
      },

      distinctLockedTotal: function() {
         var distinctLocked = 0;
         _.forEach(_.values(this.get('distinctRPC')), function(val) {
            if (val.eventModel.get('runner') === 'mvdmLocked') {
               distinctLocked++;
            }
         });

         return distinctLocked;
      },

      lockedTotal: function() {
         var locked = 0;
         _.forEach(_.values(this.get('distinctRPC')), function(val) {
            if (val.eventModel.get('runner') === 'mvdmLocked') {
               locked += val.count;
            }
         });

         return locked;
      },

      topTen: function() {
         var rpcList = _.map(this.get('distinctRPC'), function(val, key) {return {name: key, count: val.count}});
         return _.sortBy(rpcList, 'count').reverse().splice(0, 10);
      }
   });

   return new StatsModel();
});