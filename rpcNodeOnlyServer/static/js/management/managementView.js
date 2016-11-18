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
         "change .mvdm-lock-select": "onMvdmLockChange",
         "change .node-only-select": "onNodeOnlyChange"

      },

      render: function() {

         this.$el.html(this.template({management:this.management.toJSON()}));

         return this;
      },

      onMvdmLockChange: function(event) {
         if (!event.currentTarget || !event.currentTarget.value) {
            return;
         }

         var isRpcsLocked = undefined;
         if (event.currentTarget.value.toLowerCase() === 'on') {
            isRpcsLocked = true;
         } else if (event.currentTarget.value.toLowerCase() === 'off') {
            isRpcsLocked = false;
         } else {
            return;
         }

         //no change
         if (isRpcsLocked === this.management.get('isMvdmLocked')) {
            return;
         }

         this.management.set('isMvdmLocked', isRpcsLocked);

         this.management.sync('update', this.management);
      },

      onNodeOnlyChange: function(event) {
         if (!event.currentTarget || !event.currentTarget.value) {
            return;
         }

         var isNodeOnlySet = undefined;
         if (event.currentTarget.value.toLowerCase() === 'on') {
            isNodeOnlySet = true;
         } else if (event.currentTarget.value.toLowerCase() === 'off') {
            isNodeOnlySet = false;
         } else {
            return;
         }

         //no change
         if (isNodeOnlySet === this.management.get('isNodeOnly')) {
            return;
         }

         this.management.set('isNodeOnly', isNodeOnlySet);

         this.management.sync('update', this.management);
      },


      onClose: function () {

      }
   });

   return ManagementView;
});