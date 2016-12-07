/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'backbone.paginator'
], function ($, _, Backbone) {
   'use strict';

   var RPCCollection = Backbone.Collection.extend({
      model: Backbone.Model.extend(),
      mode: 'client',
      url: '/rpcList'
   });

   return new RPCCollection();
});