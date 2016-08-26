/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'moment'
], function ($, _, Backbone, moment) {
   'use strict';

   var EventModel = Backbone.Model.extend({
      constructor: function() {
         var args = arguments[0];
         var timestmpMoment = moment(args.timestamp);
         var date = timestmpMoment.format('MMM Do YYYY');
         var time = timestmpMoment.format('h:mm:ss a');

         args.date = date;
         args.time = time;

         Backbone.Model.apply(this, arguments);
      },
      toJSON: function() {
         var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
         json.cid = this.cid;
         return json;
      }
   });

   return EventModel;
});