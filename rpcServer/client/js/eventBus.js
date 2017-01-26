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
    'rpcCounts/rpcCountCollection',
    'rpcCounts/lockedRPCCollection',
    'rpcCounts/rpcCategoryCollection',
    'config'
], function ($, _, Backbone, EventModel, MVDMEventCollection, RPCEventCollection, MVDMEventCounter, RPCEventCounter, RPCCountCollection, LockedRPCCollection, RPCCategoryCollection) {
    'use strict';

    var EventBus = function() {

        var self = this;

        _.extend(self, Backbone.Events);

        var mvdmCollection = new Backbone.Collection();
        var rpcEventCollection = new Backbone.Collection();

        LockedRPCCollection.fetch();

        this.getMvdmEventCollection = function() {
            return mvdmCollection;
        };

        this.getRpcEventCollection = function() {
            return rpcEventCollection;
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
            eventCollection.unshift(new EventModel(event.data));

            //counter consume events
            if (eventType === 'mvdm') {

                MVDMEventCounter.consumeEvent(eventModel);

                self.trigger('newMvdmEvent', eventModel, MVDMEventCounter);
            } else if (eventType === 'rpc') {

                RPCEventCounter.consumeEvent(eventModel);
                RPCCountCollection.consumeEvent(eventModel);
                LockedRPCCollection.consumeEvent(eventModel);
                RPCCategoryCollection.consumeEvent(eventModel);

                self.trigger('countEvent', RPCCountCollection);
                self.trigger('rpcCategoryEvent', RPCCategoryCollection);
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

    return new EventBus();
});