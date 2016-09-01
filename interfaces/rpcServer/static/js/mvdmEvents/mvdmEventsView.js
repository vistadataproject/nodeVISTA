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
   'text!mvdmEvents/mvdmEvents.hbs',
   'text!mvdmEvents/eventModal.hbs',
   'backgrid',
   'backgridCustomCells',
   'backgridSelectFilter',
   'backgridMomentCell'
], function ($, _, Backbone, Handlebars, EventsParentView, EventCollection, ManagementModel, EventCounter, EventsTemplate, EventModalTemplate) {
   'use strict';

   var MVDMEventsView = EventsParentView.extend({

      initialize: function (options) {

         this.management = new ManagementModel();

         this.listenTo(this.management, 'change', this.render);

         this.management.fetch();

         var selectOptions = ['create', 'list', 'describe', 'update', 'remove', 'unremove', 'delete'];

         this.listenTo(options.eventListener, 'newMvdmEvent', function() {
            this.renderEventCounter();
         });

         MVDMEventsView.__super__.initialize.apply(this, [{
            webSocketRoute: 'mvdmEvents',
            eventCollection: EventCollection,
            template: EventsTemplate,
            eventModalTemplate: EventModalTemplate,
            selectField: 'type',
            selectOptions: _.union([{label: "All", value: null}],
               _.map(selectOptions, function(val) { return {label:val.toUpperCase(), value:val};})),
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
         //call parent render
         MVDMEventsView.__super__.render.apply(this, [{
               management:this.management.toJSON()
            }]);
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
      }
   });

   return MVDMEventsView;
});