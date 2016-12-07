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
   'stats/lockedRPCCollection',
   'text!stats/stats.hbs',
   'text!stats/keyStats.hbs',
   'text!stats/top20.hbs',
   'eventBus',
   'Chart',
   'rpcsCategorized',
   'templateHelpers',
   'backbone.paginator',
   'backgrid.paginator',
   'backgridCustomCells'
], function ($, _, Backbone, Handlebars, Backgrid, RPCStatModel, RPCStatCollection, LockedRPCCollection, statsTemplate, keyStatsTemplate, top20Template, EventBus, Chart) {
   'use strict';
   var StatsView = Backbone.View.extend({

      template: Handlebars.compile(statsTemplate),
      keyStatsTemplate: Handlebars.compile(keyStatsTemplate),
      top20Template: Handlebars.compile(top20Template),

      initialize: function () {

         this.listenTo(EventBus, 'statsEvent', function(statsModel) {
            this.renderKeyStats();
            this.renderTop20();
         });

         this.grid = new Backgrid.Grid({
            columns: [{
               name: 'name',
               label: 'RPC',
               editable: false,
               cell: 'String'
            }, {
               name: 'count',
               label: '# of Calls',
               editable: false,
               cell: 'integer'
            }],
            collection: LockedRPCCollection
         });

         this.paginator = new Backgrid.Extension.Paginator({
            collection: LockedRPCCollection,
            goBackFirstOnSort: false
         });

      },

      render: function() {

         this.$el.html(this.template({
            total: RPCStatCollection.total(),
            distinct: RPCStatCollection.distinctTotal(),
            distinctLocked: RPCStatCollection.distinctLockedTotal(),
            locked: RPCStatCollection.lockedTotal()
         }));

         this.renderKeyStats();
         this.renderTop20();

         this.$el.find('#locked-rpc-table').append(this.grid.render().el);

         //render paginator
         this.$el.find('#locked-rpc-table').append(this.paginator.render().el);

         //apply bootstrap table styles to grid
         this.$el.find('.backgrid').addClass('table table-condensed table-striped table-bordered table-hover');

         var self = this;
         var renderChart = function() {

            var data = {
               labels: [
                  "Unlocked",
                  "Locked"
               ],
               datasets: [
                  {
                     data: [Object.keys(rpcsCategorized).length - LockedRPCCollection.fullCollection.size(), LockedRPCCollection.fullCollection.size()],
                     backgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                     ],
                     hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                     ]
                  }]
            };
            _.delay(function() {
               new Chart(self.$el.find(".pie-chart")[0],{
                  type: 'pie',
                  data: data,
                  options: {
                     responsive: false
                  }
               });

            }, 200);
         };

         if (LockedRPCCollection.fullCollection.size() < 1) {
            this.listenToOnce(LockedRPCCollection.fullCollection, 'reset', function() {
               renderChart();
            });
         } else {
            renderChart();
         }

         return this;
      },

      renderKeyStats: function() {
         this.$el.find('.keyStats').html(this.keyStatsTemplate({
            total: RPCStatCollection.total(),
            distinct: RPCStatCollection.distinctTotal(),
            distinctLocked: RPCStatCollection.distinctLockedTotal(),
            locked: RPCStatCollection.lockedTotal()
         }));
      },
      renderTop20: function() {

         //populate empty top 20 spaces
         var top20 = RPCStatCollection.top(20);

         if (!top20 || top20.length < 20) {
            if (!top20) {
               top20 = [];
            }

            var len = top20.length;
            for(var i = len; i < 20; i++) {
               top20[i] = {
                  name: '&nbsp;'
               };
            }
         }

         this.$el.find('.top20').html(this.top20Template({
            topList: top20
         }));
      },
      onClose: function () {

      }
   });

   return StatsView;
});


