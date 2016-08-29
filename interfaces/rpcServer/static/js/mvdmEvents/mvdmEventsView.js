/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'eventsView',
   'mvdmEvents/eventCollection',
   'management/managementModel',
   'text!mvdmEvents/mvdmEvents.hbs',
   'text!mvdmEvents/eventsTable.hbs',
   'text!mvdmEvents/eventModal.hbs'
], function ($, _, Backbone, Handlebars, EventsParentView, EventCollection, ManagementModel, MVDMEventsTemplate, EventsTableTemplate, EventModalTemplate) {
   'use strict';

   var MVDMEventsView = EventsParentView.extend({

      initialize: function () {

         this.management = new ManagementModel();

         this.listenTo(this.management, 'change', this.render);

         this.management.fetch();

         MVDMEventsView.__super__.initialize.apply(this, [{
            webSocketRoute: 'mvdmEvents',
            eventCollection: EventCollection,
            template: MVDMEventsTemplate,
            eventTableTemplate:EventsTableTemplate,
            eventModalTemplate: EventModalTemplate
         }]);
      },
      render: function () {
         //call parent render
         MVDMEventsView.__super__.render.apply(this, [{
               management:this.management.toJSON()
            }]);
      }
   });

   return MVDMEventsView;
});