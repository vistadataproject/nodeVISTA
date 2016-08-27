/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'eventsView',
   'rpcEvents/eventCollection',
   'text!rpcEvents/rpcEvents.hbs',
   'text!rpcEvents/rpcEventsTable.hbs'
], function ($, _, Backbone, Handlebars, EventsParentView, EventCollection, EventsTemplate, EventsTableTemplate) {
   'use strict';

   var RPCEventsView = EventsParentView.extend({

      initialize: function () {
         RPCEventsView.__super__.initialize.apply(this, [{
            webSocketRoute: 'rpcEvents',
            eventCollection: EventCollection,
            template: EventsTemplate,
            eventTableTemplate:EventsTableTemplate
         }]);
      }
   });

   return RPCEventsView;
});