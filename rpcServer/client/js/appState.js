/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'moment'
], function ($, _, Backbone, moment) {
    'use strict';

    var AppState = Backbone.Model.extend({});

    return new AppState(
        //app state defaults
        {
            mvdmFilterInitialValue: 'All',
            rpcFilterInitialValue: 'noPoller',
            rpcEventsGridPage: 0,
            mvdmEventsGridPage: 0
        }
    );
});