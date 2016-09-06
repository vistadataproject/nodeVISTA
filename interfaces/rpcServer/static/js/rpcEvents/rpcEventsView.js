/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'eventsView',
   'rpcEvents/eventCollection',
   'rpcEvents/eventCounterModel',
   'text!rpcEvents/rpcEvents.hbs',
   'text!rpcEvents/eventModal.hbs',
   'backgrid',
   'backgridCustomCells',
   'backgridSelectFilter',
   'backgridMomentCell'
], function ($, _, Backbone, Handlebars, EventsParentView, EventCollection, EventCounter, EventsTemplate, EventModalTemplate) {
   'use strict';

   var RPCEventsView = EventsParentView.extend({

      initialize: function (options) {

         this.listenTo(options.eventListener, 'newRpcEvent', function() {
            this.renderEventCounter();
         });

         RPCEventsView .__super__.initialize.apply(this, [{
            webSocketRoute: 'mvdmEvents',
            eventCollection: EventCollection,
            template: EventsTemplate,
            eventModalTemplate: EventModalTemplate,
            selectField: 'runner',
            selectOptions: _.union([
               {label: "All", value: null},
               {label: 'Local RPC Runner', value: 'localRPCRunner'},
               {label: 'Emulated', value: 'rpcE'},
               {label: 'Hardcode', value: 'hardcode'}]),
            columns: [{
               name: 'timestamp',
               label: 'Date',
               editable: false,
               cell: Backgrid.Extension.MomentCell.extend({
                  displayFormat: "MMM Do YYYY @ h:mm:ss a"
               })
            }, {
               name: 'rpcName',
               label: 'RPC Name',
               editable: false,
               cell: 'String'
            }, {
               name: 'runner',
               label: 'RPC Runner',
               editable: false,
               cell: 'String',
               formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                  fromRaw: function (rawValue, model) {
                     if (rawValue === 'localRPCRunner') {
                        return 'Local RPC Runner';
                     } else if (rawValue === 'rpcE') {
                        return 'Emulated';
                     } else if (rawValue === 'hardcode') {
                        return 'Hardcode';
                     } else return rawValue;
                  }
               })
            }]
         }]);
      },
      renderEventCounter: function() {

         this.$el.find('.event-count-total').html(EventCounter.get('total'));
         this.$el.find('.event-count-local-rpc-runner').html(EventCounter.get('localRPCRunner'));
         this.$el.find('.event-count-emulated').html(EventCounter.get('rpcE'));
         this.$el.find('.event-count-hardcode').html(EventCounter.get('hardcode'));
      },
      clearEventCounter: function() {
         EventCounter.set({
            total: 0,
            localRPCRunner: 0,
            rpcE: 0,
            hardcode: 0
         });

         this.renderEventCounter();
      }
   });

   return RPCEventsView;
});