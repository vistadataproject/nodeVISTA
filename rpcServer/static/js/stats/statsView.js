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
   'stats/rpcCollection',
   'text!stats/stats.hbs',
   'text!stats/keyStats.hbs',
   'text!stats/top20.hbs',
   'eventBus',
   'templateHelpers',
   'backbone.paginator',
   'backgrid.paginator',
   'backgridCustomCells',
   "https://www.gstatic.com/charts/loader.js" //google charts
], function ($, _, Backbone, Handlebars, Backgrid, RPCStatModel, RPCStatCollection, LockedRPCCollection, RPCCollection, statsTemplate, keyStatsTemplate, top20Template, EventBus) {
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

         // Load the Visualization API and the corechart package.
         google.charts.load('current', {'packages':['corechart']});

         // Set a callback to run when the Google Visualization API is loaded.
         google.charts.setOnLoadCallback(drawChart);

         // Callback that creates and populates a data table,
         // instantiates the pie chart, passes in the data and
         // draws it.
         function drawChart() {

            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Locked RPCs');
            data.addColumn('number', 'Slices');
            data.addRows([
               ['Unlocked', RPCCollection.size() - LockedRPCCollection.fullCollection.size()],
               ['Locked', LockedRPCCollection.fullCollection.size()]
            ]);

            // Set chart options
            var options = {
               'title':'Locked RPC Coverage',
               'width':512,
               'height':512,
               "is3D": true
            };

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(document.getElementById('locked-rpc-chart'));
            chart.draw(data, options);
         }

      },

      render: function() {
         this.$el.html(this.template({
            total: RPCStatCollection.total(),
            distinct: RPCStatCollection.distinctTotal(),
            distinctLocked: RPCStatCollection.distinctLockedTotal(),
            locked: RPCStatCollection.lockedTotal(),
            topList: RPCStatCollection.top(20)
         }));

         this.renderKeyStats();
         this.renderTop20();

         this.$el.find('#locked-rpc-table').append(this.grid.render().el);

         //render paginator
         this.$el.find('#locked-rpc-table').append(this.paginator.render().el);

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
         this.$el.find('.top20').html(this.top20Template({
            topList: RPCStatCollection.top(20)
         }));
      },
      onClose: function () {

      }
   });

   return StatsView;
});


