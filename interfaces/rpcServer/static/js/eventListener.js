/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'eventModel',
   'mvdmEvents/eventCollection',
   'rpcEvents/eventCollection',
   'config'
], function ($, _, Backbone, EventModel, MVDMEventCollection, RPCEventCollection) {
   'use strict';

   var EventListener = function() {
      this.mvdmSocket = initWebSocket('mvdmEvents', function(eventMsg) {
         parseAndInsertEvent(eventMsg, MVDMEventCollection);
      });

      this.rpcSocket = initWebSocket('rpcEvents', function(eventMsg) {
         parseAndInsertEvent(eventMsg, RPCEventCollection);
      });

      function parseAndInsertEvent(eventMsg, eventCollection) {
         var event = JSON.parse(eventMsg.data);

         eventCollection.push(new EventModel(event.data));

         //sort collection
         eventCollection.setSorting(eventCollection.state.sortKey);
         eventCollection.fullCollection.sort();
      }

      function initWebSocket(socketRoute, onMessageCallback) {
         // Open an event web socket
         var eventsSocket = new WebSocket("ws://" + config.admin.host + ":" + config.admin.port + '/' + socketRoute);

         eventsSocket.onopen = function () {
            // Web Socket is connected, send data using send()
            console.log("WebSocket: %s Event Handler is connected...", socketRoute);
         };

         eventsSocket.onmessage = _.bind(function (eventMsg) {
            onMessageCallback(eventMsg);

         }, this);

         eventsSocket.onclose = function () {
            // websocket is closed.
            console.log("WebSocket: %s Event Handler connection is closed...", socketRoute);
         };

         return eventsSocket;
      }
   };

   return new EventListener();
});