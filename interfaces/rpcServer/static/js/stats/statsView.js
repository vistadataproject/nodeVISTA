/**
 * Done:
 *
 * Total number of RPCs invoked
 * Number of calls that are locked
 * Number of distinct RPCs invoked
 * Number of distinct RPCs that are locked
 * Top Ten RPCs invoked (since client start up)
 * Number of calls for each of the distinct RPCs
 *
 * TODO:
 *
 * Categorize RPCs by function (utility RPCs, write RPCs, read RPCs, Authorization RPCs)
 * Break down the utility RPCs - ones that we'll never lock and those that we won't be backing with the model
 */


/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'backgrid',
   'stats/rpcStatModel',
   'stats/rpcStatCollection',
   'text!stats/coreStats.hbs',
   'text!stats/stats.hbs',
   'eventBus',
   'templateHelpers',
   'backgridCustomCells'
], function ($, _, Backbone, Handlebars, Backgrid, RPCStatModel, RPCStatCollection, coreStatsTemplate, statsTemplate, EventBus) {
   'use strict';
   var StatsView = Backbone.View.extend({

      template: Handlebars.compile(statsTemplate),

      initialize: function () {
         this.coreStatsTemplate = Handlebars.compile(coreStatsTemplate);

         this.grid = new Backgrid.Grid({
            columns: [{
               name: 'name',
               label: 'RPC',
               editable: false,
               cell:'string'
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
               name: 'count',
               label: '# Calls',
               editable: false,
               cell: 'integer'
            }],
            collection: RPCStatCollection
         });

         this.paginator = new Backgrid.Extension.Paginator({
            collection: RPCStatCollection,
            goBackFirstOnSort: false
         });

         this.listenTo(EventBus, 'statsEvent', function(statsModel) {
            this.renderCoreStats();
            this.grid.sort("count", "descending");
         });
      },

      render: function() {
         this.$el.html(this.template());

         this.renderCoreStats();

         //render table
         this.$el.find('#rpc-table').append(this.grid.render().el);

         //render paginator
         this.$el.find('#rpc-table').append(this.paginator.render().el);

         //apply bootstrap table styles to grid
         this.$el.find('.backgrid').addClass('table table-condensed table-striped table-bordered');

         this.grid.sort("count", "descending");

         return this;
      },

      renderCoreStats: function() {

         this.$el.find('#core-stats').html(this.coreStatsTemplate({
            total: RPCStatCollection.total(),
            distinct: RPCStatCollection.distinctTotal(),
            distinctLocked: RPCStatCollection.distinctLockedTotal(),
            locked: RPCStatCollection.lockedTotal()
         }));
      },

      onClose: function () {

      }
   });

   return StatsView;
});


