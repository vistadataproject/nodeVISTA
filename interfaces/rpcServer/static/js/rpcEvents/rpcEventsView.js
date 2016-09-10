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

         this.eventCollection = new EventCollection();
         this.eventCollection.reset(options.eventCollection.models);

         this.listenTo(options.eventListener, 'newRpcEvent', function(model) {
            this.renderEventCounter();

            this.eventCollection.push(model);
            //sort collection
            this.eventCollection.setSorting(this.eventCollection.state.sortKey);
            this.eventCollection.fullCollection.sort();
         });

         RPCEventsView.__super__.initialize.apply(this, [{
            eventCollection: this.eventCollection,
            template: EventsTemplate,
            eventModalTemplate: EventModalTemplate,
            selectField: 'runner',
            selectInitialValue: 'noPoller',
            selectOptions: [
               {label: "All", value: null},
               {label: "All No Polling", value: 'noPoller'},
               {label: 'Local RPC Runner', value: 'localRPCRunner'},
               {label: 'Locked', value: 'rpcL'},
               {label: 'Hardcode', value: 'hardcode'}],
            selectMatcher: function(value) {
               return function(model) {
                  if (value === 'noPoller') { //exclude poller
                     return model.get('rpcName') !== 'ORWCV POLL';
                  }

                  return model.get(this.field) == value;
               };
            },
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
                     } else if (rawValue === 'rpcL') {
                        return 'Locked';
                     } else if (rawValue === 'hardcode') {
                        return 'Hardcode';
                     } else return rawValue;
                  }
               })
            },{
               name: 'user',
               label: 'User',
               editable: false,
               cell: 'String',
               formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                  fromRaw: function (rawValue, model) {
                     return rawValue.name + ' (' + rawValue.id + ')'
                  }
               })
            }, {
               name: 'facility',
               label: 'Facility',
               editable: false,
               cell: 'String',
               formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                  fromRaw: function (rawValue, model) {
                     return rawValue.name + ' (' + rawValue.id + ' / ' + rawValue.stationNumber + ')'
                  }
               })
            }]
         }]);
      },
      renderEventCounter: function() {

         this.$el.find('.event-count-total').html(EventCounter.get('total'));
         this.$el.find('.event-count-total-no-poller').html(EventCounter.get('totalNoPoller'));
         this.$el.find('.event-count-local-rpc-runner').html(EventCounter.get('localRPCRunner'));
         this.$el.find('.event-count-locked').html(EventCounter.get('rpcL'));
         this.$el.find('.event-count-hardcode').html(EventCounter.get('hardcode'));
      },
      clearEventCounter: function() {
         EventCounter.set({
            total: 0,
            totalNoPoller: 0,
            localRPCRunner: 0,
            rpcL: 0,
            hardcode: 0
         });

         this.renderEventCounter();
      }
   });

   return RPCEventsView;
});