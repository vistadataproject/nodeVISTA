/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'eventsView',
   'rpcEvents/eventCollection',
   'text!rpcEvents/rpcEvents.hbs',
   'text!rpcEvents/eventsTable.hbs',
   'text!rpcEvents/eventModal.hbs'
], function ($, _, Backbone, Handlebars, EventsParentView, EventCollection, EventsTemplate, EventsTableTemplate, EventModalTemplate) {
   'use strict';

   var RPCEventsView = EventsParentView.extend({

      initialize: function () {
         RPCEventsView.__super__.initialize.apply(this, [{
            webSocketRoute: 'rpcEvents',
            eventCollection: EventCollection,
            template: EventsTemplate,
            eventTableTemplate: EventsTableTemplate,
            eventModalTemplate: EventModalTemplate
         }]);
      }
   });

   return RPCEventsView;
});