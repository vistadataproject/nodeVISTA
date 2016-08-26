/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'eventModel'
], function ($, _, Backbone, EventModel) {
   'use strict';

   var EventCollection = Backbone.Collection.extend({
      model: EventModel,
      filterByType: function(type) {
         return new EventCollection(this.filter(function(data){
            return data.get('type').toLowerCase() === type.toLowerCase();
         }));
      }
   });

   return new EventCollection();
});