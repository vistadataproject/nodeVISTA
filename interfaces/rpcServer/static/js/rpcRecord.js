/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'eventBus',
   'jsBeautify'
], function ($, _, Backbone, EventBus, jsBeautify) {
   'use strict';

   var RPCRecord = function() {
      _.extend(this, Backbone.Events);

      this.listenTo(EventBus, 'newRpcEvent', function(event) {
         if (this.recordSession) {
            this.rpcSession.push(
               {
                  rpcName: event.get('rpcName'),
                  args: event.get('request').args,
                  response: event.get('response'),
                  transactionId: event.get('transactionId'),
                  timestamp: event.get('timestamp')
               }
            );
         }
      });

      this.start = function() {
         this.rpcSession = [];
         this.recordSession = true;
      };

      this.stop = function() {
         this.recordSession = false;
      };

      this.getSessionOutput = function() {
         return jsBeautify.js_beautify(JSON.stringify(this.rpcSession));
      }
   };

   return RPCRecord;
});