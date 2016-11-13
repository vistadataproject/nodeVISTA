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
   'eventBus',
   'templateHelpers',
   'backgridCustomCells'
], function ($, _, Backbone, Handlebars, Backgrid, RPCStatModel, RPCStatCollection, statsTemplate, EventBus) {
   'use strict';
   var StatsView = Backbone.View.extend({

      template: Handlebars.compile(statsTemplate),

      initialize: function () {

         this.listenTo(EventBus, 'statsEvent', function(statsModel) {
            this.render();
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

         return this;
      },

      onClose: function () {

      }
   });

   return StatsView;
});


