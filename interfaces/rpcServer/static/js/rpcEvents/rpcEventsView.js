/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'eventsView',
   'rpcEvents/eventCollection',
   'rpcEvents/eventCounterModel',
   'appState',
   'text!rpcEvents/rpcEvents.hbs',
   'text!rpcEvents/eventModal.hbs',
   'backgrid',
   'backgridCustomCells',
   'backgridSelectFilter',
   'backgridMomentCell'
], function ($, _, Backbone, Handlebars, EventsParentView, EventCollection, EventCounter, AppState, EventsTemplate, EventModalTemplate) {
   'use strict';

   var RPCEventsView = EventsParentView.extend({

      initialize: function (options) {

         this.eventCollection = new EventCollection();
         this.eventCollection.fullCollection.reset(options.eventCollection.models);

         this.listenTo(options.eventListener, 'newRpcEvent', function(model) {
            this.renderEventCounter();

            this.eventCollection.fullCollection.unshift(model, {sort: false});

            if (this.gridFilter) {
               this.gridFilter.onChange(null, true);
            }
         });

         RPCEventsView.__super__.initialize.apply(this, [{
            eventCollection: this.eventCollection,
            gridPage: AppState.get('rpcEventsGridPage'),
            template: EventsTemplate,
            eventModalTemplate: EventModalTemplate,
            selectField: 'runner',
            selectInitialValue: AppState.get('rpcFilterInitialValue'),
            selectOptions: [
               {label: "All", value: null},
               {label: "All No Polling", value: 'noPoller'},
               {label: 'RPC Runner', value: 'rpcRunner'},
               {label: 'MVDM Locked', value: 'mvdmLocked'},
               {label: 'Server', value: 'server'}],
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
               label: 'Path',
               editable: false,
               cell: 'String',
               formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                  fromRaw: function (rawValue, model) {
                     if (rawValue === 'rpcRunner') {
                        return 'RPC Runner';
                     } else if (rawValue === 'mvdmLocked') {
                        return 'MVDM Locked';
                     } else if (rawValue === 'server') {
                        return 'Server';
                     } else return rawValue;
                  }
               })
            },{
               name: 'transactionId',
               label: 'Transaction Id',
               editable: false,
               cell: 'String'
            }, {
               name: 'user',
               label: 'User',
               editable: false,
               cell: 'String',
               formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                  fromRaw: function (rawValue, model) {

                     if (!rawValue) {
                        return '';
                     }

                     return rawValue.name + ' (' + rawValue.id + ')';
                  }
               })
            }, {
               name: 'patient',
               label: 'Patient',
               editable: false,
               cell: 'String',
               formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                  fromRaw: function (rawValue, model) {

                     if (!rawValue) {
                        return '';
                     }

                     return rawValue.label + ' (' + rawValue.id + ')';
                  }
               })
            }, {
               name: 'facility',
               label: 'Facility',
               editable: false,
               cell: 'String',
               formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                  fromRaw: function (rawValue, model) {

                     if (!rawValue) {
                        return '';
                     }

                     return rawValue.name + ' (' + rawValue.id + ' / ' + rawValue.stationNumber + ')';
                  }
               })
            }]
         }]);
      },
      renderEventCounter: function() {

         this.$el.find('.event-count-total').html(EventCounter.get('total'));
         this.$el.find('.event-count-total-no-poller').html(EventCounter.get('totalNoPoller'));
         this.$el.find('.event-count-rpc-runner').html(EventCounter.get('rpcRunner'));
         this.$el.find('.event-count-mvdm-locked').html(EventCounter.get('mvdmLocked'));
         this.$el.find('.event-count-server').html(EventCounter.get('server'));
      },
      clearEventCounter: function() {
         EventCounter.set({
            total: 0,
            totalNoPoller: 0,
            rpcRunner: 0,
            mvdmLocked: 0,
            server: 0
         });

         this.renderEventCounter();
      },
      onFilterChange: function(e) {
         AppState.set('rpcFilterInitialValue', e.currentTarget.value.replace(/"/g, "")); //remove double quotes
      },
      onClose: function () {
         if (this.eventCollection.fullCollection.pageableCollection) {
            AppState.set('rpcEventsGridPage', this.eventCollection.fullCollection.pageableCollection.state.currentPage);
         }
      }
   });

   return RPCEventsView;
});