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
   'rpcRecord',
   'backgrid',
   'backgridCustomCells',
   'backgridSelectFilter',
   'backgridMomentCell'
], function ($, _, Backbone, Handlebars, Moment, EventsParentView, EventCollection, EventCounter, AppState, EventsTemplate, EventModalTemplate, EventBus, RPCRecord) {
   'use strict';

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

         this.rpcRecord = new RPCRecord();

         var htmlFormatter = _.extend({}, Backgrid.CellFormatter.prototype, {
            fromRaw: function (rawValue, model) {
               return Backgrid.HtmlCell.formatAsHtml(rawValue, model);
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
               cell: Backgrid.HtmlCell,
               formatter: htmlFormatter
            }, {
               name: 'runner',
               label: 'Path',
               editable: false,
               cell: Backgrid.HtmlCell,
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

                     return Backgrid.HtmlCell.formatAsHtml(retVal, model);
                  }
               })
            }, {
               name: 'transactionId',
               label: 'Transaction Id',
               editable: false,
               cell: Backgrid.HtmlCell,
               formatter: htmlFormatter
            }, {
               name: 'ipAddress',
               label: 'IP Address',
               editable: false,
               cell: Backgrid.HtmlCell,
               formatter: htmlFormatter
            }, {
               name: 'user',
               label: 'User',
               editable: false,
               cell: Backgrid.HtmlCell,
               formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                  fromRaw: function (rawValue, model) {
                     if (!rawValue || !rawValue.name) {
                        return '';
                     }

                     var retVal = rawValue.name + ' (' + rawValue.id + ')';

                     return Backgrid.HtmlCell.formatAsHtml(retVal, model);
                  }
               })
            }, {
               name: 'facility',
               label: 'Facility',
               editable: false,
               cell: Backgrid.HtmlCell,
               formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                  fromRaw: function (rawValue, model) {
                     if (!rawValue || !rawValue.name) {
                        return '';
                     }

                     var retVal = rawValue.name + ' (' + rawValue.id + ' / ' + rawValue.stationNumber + ')';

                     return Backgrid.HtmlCell.formatAsHtml(retVal, model);
                  }
               })
            }]
         }]);
      },
      events: {
         'click .clear-events-list': 'onClearEventsList',
         'click .rpc-record .start': 'onStartRecordRpcSession',
         'click .rpc-record .stop': 'onStopRecordRpcSession',
         'click .rpc-record .download': 'onDownloadRecordRpcSession'
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
      hideAllRecordingControls: function() {
         this.$el.find('.rpc-record .start').addClass('hidden');
         this.$el.find('.rpc-record .stop').addClass('hidden');
         this.$el.find('.rpc-record .download').addClass('hidden');
      },
      onStartRecordRpcSession: function(e) {
         e.preventDefault();
         this.rpcRecord.start();

         this.hideAllRecordingControls();
         this.$el.find('.rpc-record .stop').removeClass('hidden');
      },
      onStopRecordRpcSession: function(e) {
         e.preventDefault();
         this.rpcRecord.stop();

         this.hideAllRecordingControls();
         this.$el.find('.rpc-record .start').removeClass('hidden');
         this.$el.find('.rpc-record .download').removeClass('hidden');
      },
      onDownloadRecordRpcSession: function(e) {
         e.preventDefault();

         var element = document.createElement('a');
         element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.rpcRecord.getSessionOutput()));
         element.setAttribute('download', 'rpcSession.json');

         element.style.display = 'none';
         document.body.appendChild(element);

         element.click();

         document.body.removeChild(element);
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