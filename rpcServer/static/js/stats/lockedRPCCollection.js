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
         currentPage: 0
      }
   });

   return new LockedRPCCollection();
});