/**
 * Done:
 *
 * Total number of RPCs invoked
 * Number of calls that are locked
 * Number of distinct RPCs invoked
 * Number of distinct RPCs that are locked
 * Top Ten RPCs invoked (since client start up)
 *
 * TODO:
 *
 * Number of calls for each of the distinct RPCs
 * Categorize RPCs by function (utility RPCs, write RPCs, read RPCs, Authorization RPCs)
 * Break down the utility RPCs - ones that we'll never lock and those that we won't be backing with the model
 */


/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'handlebars',
   'stats/statsModel',
   'text!stats/stats.hbs',
   'eventBus',
   'templateHelpers'
], function ($, _, Backbone, Handlebars, StatsModel, statsTemplate, EventBus) {
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
            total: StatsModel.total(),
            distinct: StatsModel.distinctTotal(),
            distinctLocked: StatsModel.distinctLockedTotal(),
            locked: StatsModel.lockedTotal(),
            topTen: StatsModel.topTen()
         }));

         return this;
      },

      onClose: function () {

      }
   });

   return StatsView;
});


