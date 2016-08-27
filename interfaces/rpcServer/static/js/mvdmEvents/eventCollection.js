/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'eventModel'
], function ($, _, Backbone, EventModel) {
   'use strict';

   var MVDMEventCollection = Backbone.Collection.extend({
      model: EventModel,
      filterBy: function(value) {
         return new MVDMEventCollection(this.filter(function(data){
            return data.get('type').toLowerCase() === value.toLowerCase();
         }));
      }
   });

   return new MVDMEventCollection();
});