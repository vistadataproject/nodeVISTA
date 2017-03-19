/*global define*/
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var EventCounterModel = Backbone.Model.extend({
        defaults: {
            total: 0,
            totalNoPoller: 0,
            rpcRunner: 0,
            rpcLocked: 0,
            server: 0
        },
        consumeEvent: function(eventModel) {
            this.set('total', this.get('total') + 1);
            if (eventModel.get('rpcName') !== 'ORWCV POLL') {
                this.set('totalNoPoller', this.get('totalNoPoller') + 1);
            }

            this.set(eventModel.get('runner'), this.get(eventModel.get('runner')) + 1);
        }
    });

    return new EventCounterModel();
});