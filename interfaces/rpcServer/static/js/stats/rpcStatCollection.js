/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'stats/rpcStatModel',
   'backbone.paginator'
], function ($, _, Backbone, RPCStatModel) {
   'use strict';

   var RPCStatCollection = Backbone.PageableCollection.extend({
      model: RPCStatModel,
      mode: 'client',
      // Initial pagination states
      state: {
         pageSize: 10,
         firstPage: 0,
         currentPage: 0,
         sortKey: 'count',
         order: 1
      },

      consumeEvent: function(eventModel) {
         var rpcName = eventModel.get('rpcName');
         var runner = eventModel.get('runner');

         var rpc = this.fullCollection.find(function(model) {return model.get('name') === rpcName});

         if (!rpc) {
            this.add(new RPCStatModel({
               name: rpcName,
               count: 1,
               runner: runner
            }));
         } else {
            rpc.set('count', rpc.get('count') + 1);
         }
      },

      total: function() {
         var total = 0;
         this.fullCollection.forEach(function(rpc) {
            total += rpc.get('count');
         });

         return total;
      },

      distinctTotal: function() {
         return this.fullCollection.size();
      },

      distinctLockedTotal: function() {
         var distinctLocked = 0;

         this.fullCollection.forEach(function(rpc) {
            if (rpc.get('runner') === 'mvdmLocked') {
               distinctLocked++;
            }
         });

         return distinctLocked;
      },

      lockedTotal: function() {
         var locked = 0;

         this.fullCollection.forEach(function(rpc) {
            if (rpc.get('runner') === 'mvdmLocked') {
               locked += rpc.get('count');
            }
         });

         return locked;
      }
   });

   return new RPCStatCollection;
});