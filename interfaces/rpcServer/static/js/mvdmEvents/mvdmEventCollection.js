/*global define*/
define([
   'jquery',
   'underscore',
   'backbone',
   'mvdmEvents/eventModel'
], function ($, _, Backbone, MVDMEventModel) {
   'use strict';

   var MVDMEventCollection = Backbone.Collection.extend({
      model: MVDMEventModel
   });

   return new MVDMEventCollection();
});