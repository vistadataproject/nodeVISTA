/*global define*/
define([
   'jquery',
   'backbone',
   'mvdmEvents/mvdmEventsView',
   'rpcEvents/rpcEventsView',
   'management/managementView'
], function ($, Backbone, MVDMEventsView, RPCEventsView, ManagementView) {
   'use strict';

   var AppRouter = Backbone.Router.extend({

      initialize: function(options){
         this.viewManager = options.viewManager;
         this.eventListener = options.eventListener;
      },

      routes: {
         "mvdmEvents": "mvdmEvents",
         "rpcEvents": "rpcEvents",
         "management": "management",
         "": "mvdmEvents" //mvdmEvents is default view
      },
      mvdmEvents: function() {
         this.mvdmEventsView = new MVDMEventsView({eventListener: this.eventListener});
         setActiveNavItem('mvdmEvents');
         this.viewManager.showView(this.mvdmEventsView);
      },
      rpcEvents: function() {
         this.rpcEventsView = new RPCEventsView({eventListener: this.eventListener});
         setActiveNavItem('rpcEvents');
         this.viewManager.showView(this.rpcEventsView);
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
      var rpcEventsEl = $('#nav-rpc-events');
      var managementEl = $('#nav-management');

      mvdmEventsEl.removeClass('active');
      rpcEventsEl.removeClass('active');
      managementEl.removeClass('active');

      if (navItem === 'mvdmEvents') {
         mvdmEventsEl.addClass('active');
      } else if (navItem === 'rpcEvents') {
         rpcEventsEl.addClass('active');
      } else if (navItem === 'management') {
         managementEl.addClass('active');
      }
   }

   return AppRouter;
});
