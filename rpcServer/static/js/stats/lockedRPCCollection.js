/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'backbone.paginator'
], function ($, _, Backbone) {
   'use strict';

   var LockedRPCCollection = Backbone.PageableCollection.extend({
      model: Backbone.Model.extend(),
      mode: 'client',
      url: '/lockedRPCList',
      // Initial pagination states
      state: {
         pageSize: 20,
         firstPage: 0,
         currentPage: 0,
         sortKey: 'rpcName'
      },
      consumeEvent: function(eventModel) {
         if (eventModel.get('runner') !== 'mvdmLocked') {
            return;
         }

         var model = this.fullCollection.findWhere({
            rpcName: eventModel.get('rpcName')
         });

         if (!model) {
            return;
         }

         var count = model.get('count');

         model.set('count', count + 1);
      }
   });

   return new LockedRPCCollection();
});