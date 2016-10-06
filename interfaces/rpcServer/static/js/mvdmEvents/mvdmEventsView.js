/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'eventsView',
   'mvdmEvents/eventCollection',
   'management/managementModel',
   'mvdmEvents/eventCounterModel',
   'appState',
   'text!mvdmEvents/mvdmEvents.hbs',
   'text!mvdmEvents/eventModal.hbs',
   'eventBus',
   'backgrid',
   'backgridCustomCells',
   'backgridSelectFilter',
   'backgridMomentCell'
], function ($, _, Backbone, Handlebars, EventsParentView, EventCollection, ManagementModel, EventCounter, AppState, EventsTemplate, EventModalTemplate, EventBus) {
   'use strict';

   var MVDMEventsView = EventsParentView.extend({

      initialize: function (options) {

         this.eventCollection = new EventCollection();
         this.eventCollection.fullCollection.reset(options.eventCollection.models);

         this.management = new ManagementModel();

         this.listenTo(this.management, 'change', this.render);

         this.management.fetch();

         this.listenTo(EventBus, 'newMvdmEvent', function(model) {
            this.renderEventCounter();

            this.eventCollection.fullCollection.unshift(model, {sort: false});

            if (this.gridFilter) {
               this.gridFilter.onChange(null, true);
            }
         });

         MVDMEventsView.__super__.initialize.apply(this, [{
            eventCollection: this.eventCollection,
            gridPage: AppState.get('mvdmEventsGridPage'),
            template: EventsTemplate,
            eventModalTemplate: EventModalTemplate,
            selectField: 'type',
            selectInitialValue: AppState.get('mvdmFilterInitialValue'),
            selectOptions: [
               {label: "All", value: null},
               {label: "Change", value: 'change'}
            ],
            selectMatcher: function(value) {
               return function(model) {
                  if (value === 'change') { //exclude LIST/DESCRIBE
                     return model.get('type') !== 'list' && model.get('type') !== 'describe';
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
               name: 'domain',
               label: 'Domain',
               editable: false,
               cell: 'String'
            }, {
               name: 'type',
               label: 'Type',
               editable: false,
               cell: 'String',
               formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                  fromRaw: function (rawValue, model) {
                     return rawValue.toUpperCase()
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
                     return rawValue.name + ' (' + rawValue.id + ')'
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
                     return rawValue.name + ' (' + rawValue.id + ' / ' + rawValue.stationNumber + ')'
                  }
               })
            }]
         }]);
      },
      render: function () {

         this.listenTo(this.management, 'change', function() {
            //call parent render
            MVDMEventsView.__super__.render.apply(this, [{
               management:this.management.toJSON()
            }]);
         });
      },
      renderEventCounter: function() {

         this.$el.find('.event-count-total').html(EventCounter.get('total'));
         this.$el.find('.event-count-describe').html(EventCounter.get('describe'));
         this.$el.find('.event-count-list').html(EventCounter.get('list'));
         this.$el.find('.event-count-create').html(EventCounter.get('create'));
         this.$el.find('.event-count-update').html(EventCounter.get('update'));
         this.$el.find('.event-count-remove').html(EventCounter.get('remove'));
         this.$el.find('.event-count-unremoved').html(EventCounter.get('unremoved'));
         this.$el.find('.event-count-delete').html(EventCounter.get('delete'));
      },
      clearEventCounter: function() {
         EventCounter.set({
            total: 0,
            describe: 0,
            list: 0,
            create: 0,
            update: 0,
            remove: 0,
            unremoved: 0,
            delete: 0
         });

         this.renderEventCounter();
      },
      onFilterChange: function(e) {
         AppState.set('mvdmFilterInitialValue', e.currentTarget.value.replace(/"/g,"")); //remove double quotes
      },
      onClose: function () {
         if (this.eventCollection.fullCollection.pageableCollection) {
            AppState.set('mvdmEventsGridPage', this.eventCollection.fullCollection.pageableCollection.state.currentPage);
         }
      }
   });

   return MVDMEventsView;
});