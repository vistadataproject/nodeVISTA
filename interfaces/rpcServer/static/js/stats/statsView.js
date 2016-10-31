/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'text!stats/stats.hbs',
   'templateHelpers'
], function ($, _, Backbone, Handlebars, statsTemplate) {
   'use strict';
   var StatsView = Backbone.View.extend({

      template: Handlebars.compile(statsTemplate),

      initialize: function () {

      },

      events: {
         // "change .mvdm-lock-select": "onMvdmLockChange"
      },

      render: function() {

         this.$el.html(this.template());

         return this;
      },

      onClose: function () {

      }
   });

   return StatsView;
});