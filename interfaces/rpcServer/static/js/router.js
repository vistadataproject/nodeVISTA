/*global define*/
define([
   'jquery',
   'backbone',
   'mvdmEvents/mvdmEventsView',
   'management/managementView'
], function ($, Backbone, MVDMEventsView, ManagementView) {
   'use strict';

   var AppRouter = Backbone.Router.extend({

      initialize: function(options){
         this.viewManager = options.viewManager;
      },

      routes: {
         "mvdmEvents": "mvdmEvents",
         "management": "management",
         "": "mvdmEvents" //mvdmEvents is default view
      },
      mvdmEvents: function() {
         this.mvdmEventsView = new MVDMEventsView();
         setActiveNavItem('mvdmEvents');
         this.viewManager.showView(this.mvdmEventsView);
      },
      management: function() {
         this.managementView = new ManagementView();
         setActiveNavItem('management');
         this.viewManager.showView(this.managementView);
      }
   });

   /**
    * Highlights the active nav menu item
    * @param navItem nav item to highlight
    */
   function setActiveNavItem(navItem) {
      var mvdmEventsEl = $('#nav-mvdm-events');
      var managementEl = $('#nav-management');

      mvdmEventsEl.removeClass('active');
      managementEl.removeClass('active');

      if (navItem === 'mvdmEvents') {
         mvdmEventsEl.addClass('active');
      } else if (navItem === 'management') {
         managementEl.addClass('active');
      }
   }

   return AppRouter;
});
