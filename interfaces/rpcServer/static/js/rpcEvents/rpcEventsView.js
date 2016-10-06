/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'moment',
   'eventsView',
   'rpcEvents/eventCollection',
   'rpcEvents/eventCounterModel',
   'appState',
   'text!rpcEvents/rpcEvents.hbs',
   'text!rpcEvents/eventModal.hbs',
   'eventBus',
   'backgrid',
   'backgridCustomCells',
   'backgridSelectFilter',
   'backgridMomentCell'
], function ($, _, Backbone, Handlebars, Moment, EventsParentView, EventCollection, EventCounter, AppState, EventsTemplate, EventModalTemplate, EventBus) {
   'use strict';

   /**
    HtmlCell renders any html code
    @class Backgrid.HtmlCell
    @extends Backgrid.Cell
    */
   var HtmlCell = Backgrid.HtmlCell = Backgrid.Cell.extend({

      /** @property */
      className: "html-cell",

      initialize: function () {
         Backgrid.Cell.prototype.initialize.apply(this, arguments);
      },

      render: function () {
         this.$el.empty();
         var rawValue = this.model.get(this.column.get("name"));
         var formattedValue = this.formatter.fromRaw(rawValue, this.model);
         this.$el.append(formattedValue);
         this.delegateEvents();
         return this;
      }
   });

   var RPCEventsView = EventsParentView.extend({

      initialize: function (options) {

         this.eventCollection = new EventCollection();
         this.eventCollection.fullCollection.reset(options.eventCollection.models);

         this.listenTo(EventBus, 'newRpcEvent', function(model) {
            this.renderEventCounter();

            this.eventCollection.fullCollection.unshift(model, {sort: false});

            if (this.gridFilter) {
               this.gridFilter.onChange(null, true);
            }
         });

         var formatAsHtml = function(rawValue, model) {

            //mvdmLocked runner events are displayed as bold
            if (model.get('runner') === 'mvdmLocked') {
               return '<strong>' + rawValue + '</strong>';
            }

            return rawValue;
         };

         var htmlFormatter = _.extend({}, Backgrid.CellFormatter.prototype, {
            fromRaw: function (rawValue, model) {
               return formatAsHtml(rawValue, model);
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
               cell: HtmlCell,
               formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                  fromRaw: function (rawValue, model) {
                     return formatAsHtml(Moment(rawValue).format("MMM Do YYYY @ h:mm:ss a"), model);
                  }
               })
            }, {
               name: 'rpcName',
               label: 'RPC Name',
               editable: false,
               cell: HtmlCell,
               formatter: htmlFormatter
            }, {
               name: 'runner',
               label: 'Path',
               editable: false,
               cell: HtmlCell,
               formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                  fromRaw: function (rawValue, model) {
                     var retVal = rawValue;

                     if (rawValue === 'rpcRunner') {
                        retVal = 'RPC Runner';
                     } else if (rawValue === 'mvdmLocked') {
                        retVal = 'MVDM Locked';
                     } else if (rawValue === 'server') {
                        retVal = 'Server';
                     }

                     return formatAsHtml(retVal, model);
                  }
               })
            }, {
               name: 'transactionId',
               label: 'Transaction Id',
               editable: false,
               cell: HtmlCell,
               formatter: htmlFormatter
            }, {
               name: 'ipAddress',
               label: 'IP Address',
               editable: false,
               cell: HtmlCell,
               formatter: htmlFormatter
            }, {
               name: 'user',
               label: 'User',
               editable: false,
               cell: HtmlCell,
               formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                  fromRaw: function (rawValue, model) {

                     if (!rawValue) {
                        return '';
                     }

                     var retVal = rawValue.name + ' (' + rawValue.id + ')';

                     return formatAsHtml(retVal, model);
                  }
               })
            }, {
               name: 'facility',
               label: 'Facility',
               editable: false,
               cell: HtmlCell,
               formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                  fromRaw: function (rawValue, model) {

                     if (!rawValue) {
                        return '';
                     }

                     var retVal = rawValue.name + ' (' + rawValue.id + ' / ' + rawValue.stationNumber + ')';

                     return formatAsHtml(retVal, model);
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