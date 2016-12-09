/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'backgrid',
   'rpcCounts/rpcCountCollection',
   'rpcCounts/lockedRPCCollection',
   'rpcCounts/rpcCategoryCollection',
   'text!rpcCounts/rpcCounts.hbs',
   'text!rpcCounts/rpcReceived.hbs',
   'text!rpcCounts/top20.hbs',
   'eventBus',
   'Chart',
   'rpcsCategorized',
   'templateHelpers',
   'backbone.paginator',
   'backgrid.paginator',
   'backgridCustomCells'
], function ($, _, Backbone, Handlebars, Backgrid, RPCCountCollection, LockedRPCCollection, RPCCategoryCollection, rpcCountsTemplate, rpcReceivedTemplate, top20Template, EventBus, Chart) {
   'use strict';
   var StatsView = Backbone.View.extend({

      template: Handlebars.compile(rpcCountsTemplate),
      rpcReceivedTemplate: Handlebars.compile(rpcReceivedTemplate),
      top20Template: Handlebars.compile(top20Template),

      initialize: function () {

         this.listenTo(EventBus, 'countEvent', function(model) {
            this.renderRPCTotal();
            this.renderTop20();

            this.isRenderDistinctChart = true;
            this.isRenderLockedChart = true;
         });

         this.listenTo(EventBus, 'rpcCategoryEvent', function(model) {
            this.isRenderCategoryChart = true;
         });

         this.listenToOnce(LockedRPCCollection, 'reset', function(model) {
            this.$el.find('.locked-total').html(LockedRPCCollection.fullCollection.size());
         });

         this.lockedGrid = new Backgrid.Grid({
            columns: [{
               name: 'name',
               label: 'RPC',
               editable: false,
               cell: 'String'
            }, {
               name: 'catag',
               label: 'Category',
               editable: false,
               cell: 'String'
            }, {
               name: 'count',
               label: '# Received',
               editable: false,
               cell: 'integer'
            }],
            collection: LockedRPCCollection
         });

         this.lockedPaginator = new Backgrid.Extension.Paginator({
            collection: LockedRPCCollection,
            goBackFirstOnSort: false
         });

      },

      render: function() {

         this.$el.html(this.template({
            lockedRPCCount: LockedRPCCollection.fullCollection.size(),
            total: Object.keys(rpcsCategorized).length
         }));

         this.renderRPCTotal();
         this.renderTop20();
         this.renderLockedTable();

         var self = this;
         _.delay(function() {
            self.renderCategoryChart();
            self.renderDistinctChart();
            self.renderLockedChart();
         }, 100);

         //check if chart needs to be redrawn every five seconds
         this.renderChartsIntervalId = setInterval(function() {
            if (self.isRenderCategoryChart) {
               self.renderCategoryChart();

               self.isRenderCategoryChart = false;
            }

            if (self.isRenderDistinctChart) {
               self.renderDistinctChart();

               self.isRenderDistinctChart = false;
            }

            if (self.isRenderLockedChart) {
               self.renderLockedChart();

               self.isRenderLockedChart = false;
            }
         }, 50);

         return this;
      },

      renderRPCTotal: function() {
         this.$el.find('.rpc-received').html(this.rpcReceivedTemplate({
            total: RPCCountCollection.total()
         }));
      },
      renderTop20: function() {

         //populate empty top 20 spaces
         var top20 = RPCCountCollection.top(20);

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
      renderDistinctChart: function() {
         var self = this;
         var renderChart = function() {

            var colors = ["#FF6384", "#36A2EB"];

            var data = {
               animation: false,
               labels: [
                  "Distinct Unlocked",
                  "Distinct Locked"
               ],
               datasets: [
                  {
                     data: [RPCCountCollection.distinctTotal(), RPCCountCollection.distinctLockedTotal()],
                     backgroundColor: colors,
                     hoverBackgroundColor: colors
                  }]
            };

            self.$el.find('.distinct-pie-chart').remove();
            var pieChartContainer = self.$el.find('.distinct-pie-chart-container');
            pieChartContainer.append('<canvas class="distinct-pie-chart" width="300" height="300"></canvas>');

            new Chart($('.distinct-pie-chart')[0], {
               type: 'pie',
               data: data,
               options: {
                  responsive: false,
                  animation: false
               }
            });
         };

         renderChart();
      },
      renderCategoryChart: function() {
         var self = this;
         var renderChart = function() {

            var categoryMap = {
               "AUTHENTICATION": 0,
               "CHANGE": 0,
               "READ STRUCTURED": 0,
               "READ UNSTRUCTURED": 0,
               "UTILITY": 0
            };

            var colors = ["#36A2EB", "b56355", "#a4f442", "#FF6384", "#FFCE56"];

            RPCCategoryCollection.models.forEach(function(model) {
               categoryMap[model.get('category')] = model.get('count');
            });

            var data = {
               animation: false,
               labels: Object.keys(categoryMap),
               datasets: [
                  {
                     data: [],
                     backgroundColor: colors,
                     hoverBackgroundColor: colors
                  }]
            };

            Object.keys(categoryMap).forEach(function(category) {
               data.datasets[0].data.push(categoryMap[category]);
            });

            self.$el.find('.category-pie-chart').remove();
            var pieChartContainer = self.$el.find('.category-pie-chart-container');
            pieChartContainer.append('<canvas class="category-pie-chart" width="500" height="300"></canvas>');

            new Chart($('.category-pie-chart')[0], {
               type: 'pie',
               data: data,
               options: {
                  responsive: false,
                  animation: false
               }
            });
         };

         renderChart();
      },
      renderLockedChart: function() {
         var self = this;
         var renderChart = function() {

            var colors = ["#FF6384", "#36A2EB"];

            var data = {
               animation: false,
               labels: [
                  "Unlocked",
                  "Locked"
               ],
               datasets: [
                  {
                     data: [RPCCountCollection.total(), RPCCountCollection.lockedTotal()],
                     backgroundColor: colors,
                     hoverBackgroundColor: colors
                  }]
            };

            self.$el.find('.locked-pie-chart').remove();
            var pieChartContainer = self.$el.find('.locked-pie-chart-container');
            pieChartContainer.append('<canvas class="locked-pie-chart" width="300" height="300"></canvas>');

            new Chart($('.locked-pie-chart')[0], {
               type: 'pie',
               data: data,
               options: {
                  responsive: false,
                  animation: false
               }
            });
         };

         renderChart();
      },
      renderLockedTable: function() {
         this.$el.find('#locked-rpc-table').append(this.lockedGrid.render().el);

         //render paginator
         this.$el.find('#locked-rpc-table').append(this.lockedPaginator.render().el);

         //apply bootstrap table styles to grid
         this.$el.find('.backgrid').addClass('table table-condensed table-striped table-bordered table-hover');

      },
      onClose: function () {
         clearInterval(this.renderChartsIntervalId);
      }
   });

   return StatsView;
});


