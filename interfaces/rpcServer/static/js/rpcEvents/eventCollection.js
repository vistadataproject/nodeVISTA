/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'eventModel'
], function ($, _, Backbone, EventModel) {
   'use strict';

   var RPCEventCollection = Backbone.Collection.extend({
      model: EventModel,
      comparator: 'timestamp',
      filterBy: function(value) {
         return new RPCEventCollection(this.filter(function(data){
            return data.get('isEmulated') === (value.toLowerCase() === 'emulated');
         }));
      }
   });

   return new RPCEventCollection();
});