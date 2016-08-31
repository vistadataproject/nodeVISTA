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

      initialize: function () {

         RPCEventsView .__super__.initialize.apply(this, [{
            webSocketRoute: 'mvdmEvents',
            eventCollection: EventCollection,
            template: EventsTemplate,
            eventModalTemplate: EventModalTemplate,
            selectField: 'isEmulated',
            selectOptions: _.union([{label: "All", value: null}, {label: 'Emulated', value: true}]),
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
               name: 'isEmulated',
               label: 'Emulated',
               editable: false,
               cell: 'html',
               formatter: _.extend({}, Backgrid.CellFormatter.prototype, {
                  fromRaw: function (rawValue) {
                     if (rawValue) {
                        return '<span class="grid-emulated-status glyphicon glyphicon-plus-sign" alt="This RPC is being emulated over MVDM"></span>';
                     } else {
                        return '<span class="grid-emulated-status glyphicon glyphicon-minus-sign" alt="This RPC is not being emulated."></span>';
                     }
                  }
               })
            }]
         }]);
      }
   });

   return RPCEventsView;
});