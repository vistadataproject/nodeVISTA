/*global define*/
define([
   'jquery',
   'underscore',
   'backbone'
], function ($, _, Backbone) {
   'use strict';

   var EventCounterModel = Backbone.Model.extend({
      defaults: {
         total: 0,
         describe: 0,
         list: 0,
         create: 0,
         update: 0,
         remove: 0,
         unremoved: 0,
         delete: 0
      }
   });

   return new EventCounterModel();
});