/*global define*/
define([
   'jquery',
   'underscore',
   'backbone'
], function ($, _, Backbone) {
   'use strict';

   var ManagementModel = Backbone.Model.extend({
      urlRoot: '/management'
   });

   return ManagementModel;
});