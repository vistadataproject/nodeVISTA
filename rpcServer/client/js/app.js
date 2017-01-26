/*global define*/
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    // Our overall **AppView** is the top-level piece of UI.
    var AppView = Backbone.View.extend({
        el: '#main-content',

        initialize: function () {
        },

        render: function () {
            return this;
        }
    });

    return AppView;
});