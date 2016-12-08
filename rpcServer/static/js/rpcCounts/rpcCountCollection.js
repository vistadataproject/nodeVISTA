/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'rpcCounts/rpcCountModel',
   'rpcsCategorized'
], function ($, _, Backbone, RPCCountModel) {
   'use strict';

   var RPCCountCollection = Backbone.Collection.extend({
      model: RPCCountModel,
      mode: 'client',
      comparator: function(a, b) {
         var aCount = a.get('count');
         var bCount = b.get('count');
         var aName = a.get('name');
         var bName = b.get('name');

         if (aCount > bCount) {
            return 1;
         } else if (aCount === bCount) {
            //if counts are equal, compare by name
            if (aName < bName) {
               return 1;
            } if (aName === bName) {
               return 0;
            }
         }

         return -1;
      },

      consumeEvent: function(eventModel) {
         var rpcName = eventModel.get('rpcName');
         var runner = eventModel.get('runner');

         var rpc = this.find(function(model) {return model.get('name') === rpcName});

         if (!rpc) {
            var data = {
               name: rpcName,
               count: 1,
               runner: runner
            };

            data = _.extend(data, rpcsCategorized[rpcName]);

            this.add(new RPCCountModel(data));
         } else {
            rpc.set('count', rpc.get('count') + 1);
         }
      },

      total: function() {
         var total = 0;
         this.forEach(function(rpc) {
            total += rpc.get('count');
         });

         return total;
      },

      distinctTotal: function() {
         return this.size();
      },

      distinctLockedTotal: function() {
         var distinctLocked = 0;

         this.forEach(function(rpc) {
            if (rpc.get('runner') === 'mvdmLocked') {
               distinctLocked++;
            }
         });

         return distinctLocked;
      },

      lockedTotal: function() {
         var locked = 0;

         this.forEach(function(rpc) {
            if (rpc.get('runner') === 'mvdmLocked') {
               locked += rpc.get('count');
            }
         });

         return locked;
      },

      top: function(num) {
         if (num < 1) {
            throw new Error('Number parameter must be greater than zero.')
         }

         return this.toJSON().reverse().splice(0, num);
      }
   });

   return new RPCCountCollection;
});