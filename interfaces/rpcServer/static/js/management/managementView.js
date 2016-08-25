/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'management/managementModel',
   'text!management/management.hbs',
   'management/templateHelpers'
], function ($, _, Backbone, Handlebars, ManagementModel, managementTemplate) {
   'use strict';
   var ManagementView = Backbone.View.extend({

      template: Handlebars.compile(managementTemplate),

      initialize: function () {
         this.management = new ManagementModel();
         this.management.fetch();
      },

      events: {
         "change .emulation-select": "onEmulationChange"
      },

      render: function() {

         this.management.on('change', _.bind(function() {
            console.log("on change");
            console.log("this management: " + JSON.stringify(this.management));
            this.$el.html(this.template({management:this.management}));
         }, this));

         return this;
      },

      onEmulationChange: function(event) {
         if (!event.currentTarget || !event.currentTarget.value) {
            return;
         }

         var isEmulation = undefined;
         if (event.currentTarget.value.toLowerCase() === 'on') {
            isEmulation = true;
         } else if (event.currentTarget.value.toLowerCase() === 'off') {
            isEmulation = false;
         } else {
            return;
         }

         //no change
         if (isEmulation === this.management.get('isEmulation')) {
            return;
         }

         this.management.set('isEmulation', isEmulation);

         this.management.sync('update', this.management);
      },

      onClose: function () {

      }
   });

   return ManagementView;
});