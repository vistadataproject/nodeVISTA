/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'moment'
], function ($, _, Backbone, moment) {
   'use strict';

   var MVDMEventModel = Backbone.Model.extend({
      constructor: function() {
         var args = arguments[0];
         var timestmpMoment = moment(args.timestamp);
         var date = timestmpMoment.format('MMM Do YYYY');
         var time = timestmpMoment.format('h:mm:ss a');

         args.date = date;
         args.time = time;

         Backbone.Model.apply(this, arguments);
      }
   });

   return MVDMEventModel;
});