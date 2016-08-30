/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'backgrid',
   'jsBeautify',
   'config',
   'bootstrap',
   'templateHelpers',
   'backgridSelectFilter'
], function ($, _, Backbone, Handlebars, Backgrid, jsBeautify) {
   'use strict';

   var EventsView = Backbone.View.extend({

      /**
       * Initialize base EventsView
       * @param options {eventCollection, template, eventTableTemplate}
       */
      initialize: function (options) {

         this.eventTableFilter = '';

         this.template = Handlebars.compile(options.template);
         this.eventsTableTemplate = Handlebars.compile(options.eventTableTemplate);
         this.eventModalTemplate = Handlebars.compile(options.eventModalTemplate);

         this.eventCollection = options.eventCollection;

         if (options.columns) {
            this.grid = new Backgrid.Grid({
               columns: options.columns,
               collection: this.eventCollection
            });

            this.filterConfig = {
               field: options.selectField,
               options: options.selectOptions
            };
         }

         if (!this.grid) this.listenTo(this.eventCollection, "change reset add remove", this.renderEventTable);
      },

      events: {
         "change .filter-select": 'onFilterChange',
         'click .clear-events-list': 'onClearEventsList',
         'click .event-row': 'onEventShow'
      },

      /**
       * Render events view
       * @param templateOptions template fields
       * @returns {EventsView}
       */
      render: function (templateOptions) {

         var templateArgs = {
            eventTableFilter: this.eventTableFilter
         };

         if (templateOptions) {
            templateArgs = _.extend(templateArgs, templateOptions);
         }

         this.$el.html(this.template(templateArgs));
         this.renderEventTable();

         return this;
      },

      renderEventTable: function() {
         var collection = this.eventCollection;

         if (this.grid) {
            this.$el.find('#events-table').append(this.grid.render().sort('timestamp', 'descending').el);

            this.gridFilter = new Backgrid.Extension.SelectFilter({
               className: "backgrid-filter form-control filter filter-select",
               collection: this.eventCollection,
               field: this.filterConfig.field,
               selectOptions: this.filterConfig.options
            });

            this.$el.find("#filter").replaceWith(this.gridFilter.render().$el);

         } else {
            var tableHtml = this.eventsTableTemplate({
               events: collection.toJSON()
            });

            this.$el.find('#events-table').html(tableHtml);
         }

      },

      onEventUpdate: function (eventMsg) {
         var event = JSON.parse(eventMsg.data);

         this.eventCollection.push(new EventModel(event.data));

         this.renderEventTable();
      },

      onFilterChange: function(e) {
         var filterVal = e.currentTarget.value;
         if (filterVal.toLowerCase() === 'all') {
            this.eventTableFilter = '';
         }
         else {
            this.eventTableFilter = e.currentTarget.value;
         }
         var val = e.currentTarget.value;
         this.eventCollection.filter(function(data){
            return data.get('type').toLowerCase() === val.toLowerCase();
         });
      },

      onClearEventsList: function(e) {
         e.preventDefault();

         //clear events
         this.eventCollection.reset();

      },

      //display event details modal
      onEventShow: function(e) {
         if (!e.currentTarget.dataset.cid) {
            return;
         }

         var eventData = this.eventCollection.get(e.currentTarget.dataset.cid);

         var modalHtml = this.eventModalTemplate({
            event: eventData.toJSON(),
            eventDetails: jsBeautify.js_beautify(
               JSON.stringify(eventData.get('data') ? eventData.get('data') : _.omit(eventData.toJSON(), 'cid'))
            )
         });

         this.$el.find('#event-modal-container').html(modalHtml);

         var $modelEl = this.$el.find('.event-modal');
         var title;

         if (eventData.get('rpcName')) {
            title = 'RPC: ' + eventData.get('rpcName');
         } else {
            title = 'Event: ' + eventData.get('type');
         }

         $modelEl.find('.modal-title').html(title);

         $modelEl.modal('show');
      },

      onClose: function () {
      }
   });


   return EventsView;
});