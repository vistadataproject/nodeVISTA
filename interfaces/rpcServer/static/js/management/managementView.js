/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'text!management/management.hbs'
], function ($, _, Backbone, Handlebars, managementTemplate) {
   'use strict';
   var ManagementView = Backbone.View.extend({

      template: Handlebars.compile(managementTemplate),

      initialize: function () {

      },

      render: function() {
         this.$el.html(this.template());
         return this;
      },

      onClose: function () {

      }
   });

   return ManagementView;
});