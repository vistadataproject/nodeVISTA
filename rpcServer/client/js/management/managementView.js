/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'management/managementModel',
    'text!management/management.hbs',
    'templateHelpers'
], function ($, _, Backbone, Handlebars, ManagementModel, managementTemplate) {
    'use strict';
    var ManagementView = Backbone.View.extend({

        template: Handlebars.compile(managementTemplate),

        initialize: function () {
            this.management = new ManagementModel();
            this.management.fetch();

            this.management.on('change', _.bind(function() {
                this.render();
            }, this));
        },

        events: {
            "change .rpc-lock-select": "onRPCLockChange"
        },

        render: function() {

            this.$el.html(this.template({management:this.management.toJSON()}));

            return this;
        },

        onRPCLockChange: function(event) {
            if (!event.currentTarget || !event.currentTarget.value) {
                return;
            }

            var isRpcsLocked = undefined;
            if (event.currentTarget.value.toLowerCase() === 'on') {
                isRpcsLocked = true;
            } else if (event.currentTarget.value.toLowerCase() === 'off') {
                isRpcsLocked = false;
            } else {
                return;
            }

            //no change
            if (isRpcsLocked === this.management.get('isRPCLocked')) {
                return;
            }

            this.management.set('isRPCLocked', isRpcsLocked);

            this.management.sync('update', this.management);
        },

        onClose: function () {

        }
    });

    return ManagementView;
});