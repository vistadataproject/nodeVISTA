/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'eventsView',
   'rpcEvents/eventCollection',
   'text!rpcEvents/rpcEvents.hbs',
   'text!rpcEvents/eventModal.hbs',
   'backgrid',
   'backgridCustomCells',
   'backgridSelectFilter',
   'backgridMomentCell'
], function ($, _, Backbone, Handlebars, EventsParentView, EventCollection, EventsTemplate, EventModalTemplate) {
   'use strict';

   var RPCEventsView = EventsParentView.extend({

      initialize: function (options) {

         this.clearEventCounts();

         this.listenTo(options.eventListener, 'newRpcEvent', function(model) {

            this.eventCounts.total += 1;
            this.eventCounts[model.get('runner')] += 1;

            this.renderEventCounts();
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
               {label: 'Hardcode', value: 'hardcode'},]),
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
      renderEventCounts: function() {

         this.$el.find('.event-count-total').html(this.eventCounts.total);
         this.$el.find('.event-count-local-rpc-runner').html(this.eventCounts.localRPCRunner);
         this.$el.find('.event-count-emulated').html(this.eventCounts.rpcE);
         this.$el.find('.event-count-hardcode').html(this.eventCounts.hardcode);
      },
      clearEventCounts: function() {
         this.eventCounts = {
            total: 0,
            localRPCRunner: 0,
            rpcE: 0,
            hardcode: 0
         };

         this.renderEventCounts();
      }
   });

   return RPCEventsView;
});