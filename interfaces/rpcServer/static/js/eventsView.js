/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'eventModel',
   'jsBeautify',
   'text!eventModal.hbs',
   'config',
   'bootstrap',
   'templateHelpers'
], function ($, _, Backbone, Handlebars, EventModel, jsBeautify, EventModalTemplate) {
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
         this.eventModalTemplate = Handlebars.compile(EventModalTemplate);

         this.eventCollection = options.eventCollection;

         this.listenTo(this.eventCollection, "change reset add remove", this.renderEventTable);
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

         if (this.eventTableFilter) {
            collection = this.eventCollection.filterBy(this.eventTableFilter);
         }

         var tableHtml = this.eventsTableTemplate({
            events: collection.toJSON()
         });

         this.$el.find('#events-table').html(tableHtml);
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

         this.renderEventTable();
      },

      onClearEventsList: function(e) {
         e.preventDefault();

         //clear events
         this.eventCollection.remove(this.eventCollection.models);

         this.renderEventTable();
      },

      //display event details modal
      onEventShow: function(e) {
         if (!e.currentTarget.dataset.cid) {
            return;
         }

         var eventData = this.eventCollection.get(e.currentTarget.dataset.cid);

         var modalHtml = this.eventModalTemplate({
            eventData: jsBeautify.js_beautify(
               JSON.stringify(
                  _.omit(eventData.toJSON(), 'cid')
               ))
         });

         this.$el.find('#event-modal-container').html(modalHtml);

         var modelEl = this.$el.find('.event-modal');

         modelEl.find('.modal-title-type').html(eventData.get('title').toUpperCase());

         modelEl.modal('show');
      },

      onClose: function () {
      }
   });


   return EventsView;
});