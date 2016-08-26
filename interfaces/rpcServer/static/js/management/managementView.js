/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'management/managementModel',
   'text!management/management.hbs',
   'templateHelpers'
], function ($, _, Backbone, Handlebars, ManagementModel, managementTemplate) {
   'use strict';
   var ManagementView = Backbone.View.extend({

      template: Handlebars.compile(managementTemplate),

      initialize: function () {
         this.management = new ManagementModel();
         this.management.fetch();

         this.management.on('change', _.bind(function() {
           this.render();
         }, this));
      },

      events: {
         "change .emulation-select": "onEmulationChange"
      },

      render: function() {

         this.$el.html(this.template({management:this.management.toJSON()}));

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