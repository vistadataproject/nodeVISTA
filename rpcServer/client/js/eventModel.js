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

         args.dateTime = moment(args.timestamp).utc().format('MMM Do YYYY @ h:mm:ss a');

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