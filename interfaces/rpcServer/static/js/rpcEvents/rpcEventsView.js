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
            selectField: 'runner',
            selectOptions: _.union([
               {label: "All", value: null},
               {label: 'Local RPC Runner', value: 'localRPCRunner'},
               {label: 'Emulated', value: 'rpcE'},
               {label: 'Hardcode', value: 'hardcode'},]),
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
                     } else if (rawValue === 'rpcE') {
                        return 'Emulated';
                     } else if (rawValue === 'hardcode') {
                        return 'Hardcode';
                     } else return rawValue;
                  }
               })
            }]
         }]);
      }
   });

   return RPCEventsView;
});