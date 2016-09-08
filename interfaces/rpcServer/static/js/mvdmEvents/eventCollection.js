/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'eventModel',
   'backbone.paginator'
], function ($, _, Backbone, EventModel) {
   'use strict';

   var MVDMEventCollection = Backbone.PageableCollection.extend({
      model: EventModel,
      mode: 'client',
      // Initial pagination states
      state: {
         pageSize: 20,
         firstPage: 0,
         currentPage: 0,
         sortKey: 'timestamp',
         order: 1
      },
      filterBy: function(value) {
         return new MVDMEventCollection(this.filter(function(data){
            return data.get('type').toLowerCase() === value.toLowerCase();
         }));
      }
   });

   return new MVDMEventCollection();
});