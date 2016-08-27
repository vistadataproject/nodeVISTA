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
   'text!mvdmEvents/mvdmEventsTable.hbs'
], function ($, _, Backbone, Handlebars, EventsParentView, EventCollection, ManagementModel, MVDMEventsTemplate, MVDMEventsTableTemplate) {
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
            eventTableTemplate:MVDMEventsTableTemplate
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