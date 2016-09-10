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
         totalNoPoller: 0,
         localRPCRunner: 0,
         rpcL: 0,
         hardcode: 0
      }
   });

   return new EventCounterModel();
});