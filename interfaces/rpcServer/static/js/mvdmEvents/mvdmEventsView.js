/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'mvdmEvents/eventModel',
   'mvdmEvents/mvdmEventCollection',
   'management/managementModel',
   'text!mvdmEvents/mvdmEvents.hbs',
   'config',
   'mvdmEvents/templateHelpers'
], function ($, _, Backbone, Handlebars, MVDMEventModel, MVDMEventCollection, ManagementModel, mvdmEventsTemplate) {
   'use strict';

   var MVDMEventsView = Backbone.View.extend({

      template: Handlebars.compile(mvdmEventsTemplate),

      initialize: function () {

         // Open MVDM event web sockets
         this.mvdmEventsSocket = new WebSocket("ws://" + config.admin.host + ":" + config.admin.port);

         this.mvdmEventsSocket.onopen = function () {
            // Web Socket is connected, send data using send()
            console.log("WebSocket: MVDM Event Handler is connected...");
         };

         this.mvdmEventsSocket.onmessage = _.bind(function (eventMsg) {
            this.handleMvdmEvent(eventMsg);

         }, this);

         this.mvdmEventsSocket.onclose = function () {
            // websocket is closed.
            console.log("WebSocket: MVDM Event Handler connection is closed...");
         };

         this.eventFilter = '';

         this.management = new ManagementModel();

         this.management.on('change', _.bind(function() {
            this.render();
         }, this));

         this.management.fetch();
      },

      events: {
         "change .filter-select": "onFilterChange"
      },

      onFilterChange: function(event) {
         var filterVal = event.currentTarget.value;
         if (filterVal.toLowerCase() === 'all') {
            this.eventFilter = '';
         }
         else {
            this.eventFilter = event.currentTarget.value;
         }

         this.render();
      },

      render: function () {

         var collection = MVDMEventCollection;

         if (this.eventFilter) {
            collection = MVDMEventCollection.filterByType(this.eventFilter);
         }

         this.$el.html(this.template({mvdmEvents: collection.toJSON(), eventFilter: this.eventFilter, management:this.management.toJSON()}));
         return this;
      },

      handleMvdmEvent: function (eventMsg) {
         var event = JSON.parse(eventMsg.data);

         MVDMEventCollection.push(new MVDMEventModel(event.data));

         this.render();
      },

      onClose: function () {
         this.mvdmEventsSocket.close();
      }
   });


   return MVDMEventsView;
});