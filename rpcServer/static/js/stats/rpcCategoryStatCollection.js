/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'stats/rpcStatModel',
   'rpcsCategorized'
], function ($, _, Backbone, RPCStatModel) {
   'use strict';

   var RPCStatCategoryCollection = Backbone.Collection.extend({
      model: RPCStatModel,
      mode: 'client',
      comparator: 'category',

      consumeEvent: function(eventModel) {
         var rpcName = eventModel.get('rpcName');

         if (!rpcsCategorized[rpcName] || !rpcsCategorized[rpcName].catag) {
            return;
         }

         var categoryName = rpcsCategorized[rpcName].catag;

         var category = this.find(function(model) {return model.get('category') === categoryName});

         if (!category) {
            var data = {
               category: categoryName,
               count: 1
            };

            this.add(new RPCStatModel(data));
         } else {
            category.set('count', category.get('count') + 1);
         }
      }
   });

   return new RPCStatCategoryCollection;
});