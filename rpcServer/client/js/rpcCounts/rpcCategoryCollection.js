/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'rpcCounts/rpcCountModel',
   'rpcsCategorized'
], function ($, _, Backbone, RPCCountModel) {
   'use strict';

   var RPCCategoryCollection = Backbone.Collection.extend({
      model: RPCCountModel,
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

            this.add(new RPCCountModel(data));
         } else {
            category.set('count', category.get('count') + 1);
         }
      }
   });

   return new RPCCategoryCollection;
});