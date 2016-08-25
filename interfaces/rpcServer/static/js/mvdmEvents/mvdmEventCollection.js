/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'mvdmEvents/eventModel'
], function ($, _, Backbone, MVDMEventModel) {
   'use strict';

   var MVDMEventCollection = Backbone.Collection.extend({
      model: MVDMEventModel,
      filterByType: function(type) {
         return new MVDMEventCollection(this.filter(function(data){
            return data.get('type').toLowerCase() === type.toLowerCase();
         }));
      }
   });

   return new MVDMEventCollection();
});