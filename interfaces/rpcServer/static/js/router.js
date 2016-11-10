/*global define*/
define([
   'jquery',
   'backbone',
   'mvdmEvents/mvdmEventsView',
   'rpcEvents/rpcEventsView',
   'management/managementView',
   'stats/statsView',
   'eventBus'
], function ($, Backbone, MVDMEventsView, RPCEventsView, ManagementView, StatsView, EventBus) {
   'use strict';

   var AppRouter = Backbone.Router.extend({

      initialize: function(options){
         this.viewManager = options.viewManager;
      },

      routes: {
         "mvdmEvents": "mvdmEvents",
         "rpcEvents": "rpcEvents",
         "management": "management",
         "stats": "stats",
         "": "mvdmEvents" //mvdmEvents is default view
      },
      mvdmEvents: function() {
         this.mvdmEventsView = new MVDMEventsView({
            eventCollection: EventBus.getMvdmEventCollection()
         });
         setActiveNavItem('mvdmEvents');
         this.viewManager.showView(this.mvdmEventsView);
      },
      rpcEvents: function() {
         this.rpcEventsView = new RPCEventsView({
            eventCollection: EventBus.getRpcEventCollection()
         });
         setActiveNavItem('rpcEvents');
         this.viewManager.showView(this.rpcEventsView);
      },
      management: function() {
         this.managementView = new ManagementView();
         setActiveNavItem('management');
         this.viewManager.showView(this.managementView);
      },
      stats: function() {
         this.statsView = new StatsView();
         setActiveNavItem('stats');
         this.viewManager.showView(this.statsView);
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
      var statsEl= $('#nav-stats');

      mvdmEventsEl.removeClass('active');
      rpcEventsEl.removeClass('active');
      managementEl.removeClass('active');
      statsEl.removeClass('active');

      if (navItem === 'mvdmEvents') {
         mvdmEventsEl.addClass('active');
      } else if (navItem === 'rpcEvents') {
         rpcEventsEl.addClass('active');
      } else if (navItem === 'management') {
         managementEl.addClass('active');
      } else if (navItem === 'stats') {
         statsEl.addClass('active');
      }
   }

   return AppRouter;
});
