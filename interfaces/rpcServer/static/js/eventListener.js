/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'eventModel',
   'mvdmEvents/eventCollection',
   'rpcEvents/eventCollection',
   'mvdmEvents/eventCounterModel',
   'rpcEvents/eventCounterModel',
   'config'
], function ($, _, Backbone, EventModel, MVDMEventCollection, RPCEventCollection, MVDMEventCounter, RPCEventCounter) {
   'use strict';

   var EventListener = function() {

      var self = this;

      _.extend(self, Backbone.Events);

      var mvdmCollection = new MVDMEventCollection();
      var rpcEventCollection = new RPCEventCollection();

      this.getMvdmEventCollection = function() {
         return mvdmCollection.fullCollection;
      };

      this.getRpcEventCollection = function() {
         return rpcEventCollection.fullCollection;
      };

      this.mvdmSocket = initWebSocket('mvdmEvents', function(eventMsg) {
         parseAndInsertEvent(eventMsg, mvdmCollection, 'mvdm');
      });

      this.rpcSocket = initWebSocket('rpcEvents', function(eventMsg) {
         parseAndInsertEvent(eventMsg, rpcEventCollection, 'rpc');
      });

      function parseAndInsertEvent(eventMsg, eventCollection, eventType) {
         var event = JSON.parse(eventMsg.data);

         var eventModel = new EventModel(event.data);
         eventCollection.push(new EventModel(event.data));

         //sort collection
         eventCollection.setSorting(eventCollection.state.sortKey);
         eventCollection.fullCollection.sort();

         //increment event counters
         if (eventType === 'mvdm') {

            MVDMEventCounter.set('total', MVDMEventCounter.get('total') + 1);
            var eventType = eventModel.get('type');
            MVDMEventCounter.set(eventType, MVDMEventCounter.get(eventType) + 1);

            self.trigger('newMvdmEvent', eventModel, MVDMEventCounter);
         } else if (eventType === 'rpc') {

            RPCEventCounter.set('total', RPCEventCounter.get('total') + 1);
            if (eventModel.get('rpcName') !== 'ORWCV POLL') {
               RPCEventCounter.set('totalNoPoller', RPCEventCounter.get('totalNoPoller') + 1);
            }
            var runnerType = eventModel.get('runner');
            RPCEventCounter.set(runnerType, RPCEventCounter.get(runnerType) + 1);

            self.trigger('newRpcEvent', eventModel, RPCEventCounter);
         }
      }

      function initWebSocket(socketRoute, onMessageCallback) {
         // Open an event web socket
         var eventsSocket = new WebSocket("ws://" + config.mvdmClient.host + ":" + config.mvdmClient.port + '/' + socketRoute);

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

   return EventListener;
});