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
   'text!stats/stats.hbs',
   'text!stats/keyStats.hbs',
   'text!stats/top20.hbs',
   'eventBus',
   'templateHelpers',
   'backgridCustomCells'
], function ($, _, Backbone, Handlebars, Backgrid, RPCStatModel, RPCStatCollection, statsTemplate, keyStatsTemplate, top20Template, EventBus) {
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


