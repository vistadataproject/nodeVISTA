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
         rpcRunner: 0,
         mvdmLocked: 0,
         server: 0
      }
   });

   return new EventCounterModel();
});