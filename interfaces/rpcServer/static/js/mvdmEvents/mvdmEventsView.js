/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'eventsView',
   'mvdmEvents/eventCollection',
   'management/managementModel',
   'text!mvdmEvents/mvdmEvents.hbs',
   'text!mvdmEvents/eventModal.hbs',
   'backgrid',
   'backgridCustomCells',
   'backgridSelectFilter',
   'backgridMomentCell'
], function ($, _, Backbone, Handlebars, EventsParentView, EventCollection, ManagementModel, EventsTemplate, EventModalTemplate) {
   'use strict';

   var MVDMEventsView = EventsParentView.extend({

      initialize: function (options) {

         this.management = new ManagementModel();

         this.listenTo(this.management, 'change', this.render);

         this.management.fetch();

         var selectOptions = ['create', 'list', 'describe', 'update', 'remove', 'unremove', 'delete'];

         this.clearEventCounts();

         this.listenTo(options.eventListener, 'newMvdmEvent', function(model) {

            this.eventCounts.total += 1;
            this.eventCounts[model.get('type')] += 1;

            this.renderEventCounts();
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
      renderEventCounts: function() {

         this.$el.find('.event-count-total').html(this.eventCounts.total);
         this.$el.find('.event-count-describe').html(this.eventCounts.describe);
         this.$el.find('.event-count-list').html(this.eventCounts.list);
         this.$el.find('.event-count-create').html(this.eventCounts.create);
         this.$el.find('.event-count-update').html(this.eventCounts.update);
         this.$el.find('.event-count-remove').html(this.eventCounts.remove);
         this.$el.find('.event-count-unremoved').html(this.eventCounts.unremoved);
         this.$el.find('.event-count-delete').html(this.eventCounts.delete);
      },
      clearEventCounts: function() {
         this.eventCounts = {
            total: 0,
            describe: 0,
            list: 0,
            create: 0,
            update: 0,
            remove: 0,
            unremoved: 0,
            delete: 0
         };

         this.renderEventCounts();
      }
   });

   return MVDMEventsView;
});