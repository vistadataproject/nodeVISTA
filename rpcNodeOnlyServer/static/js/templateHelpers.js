/*global define*/
define([
   'handlebars',
   'jsBeautify'
], function (Handlebars, jsBeautify) {
   'use strict';

   Handlebars.registerHelper('mvdm-lock-select', function(management) {

      if (!management) {
         return;
      }

      function setSelected(management, optionValue) {
         if ((management.isMvdmLocked && optionValue === 'on') ||
            (!management.isMvdmLocked && optionValue === 'off')) {
            return ' selected';
         }

         return '';
      }

      var selectHtml = '<select class="form-control mvdm-lock-select">';
      selectHtml += '<option value="on"' + setSelected(management, 'on') + '>On</option>';
      selectHtml += '<option value="off"' + setSelected(management, 'off') + '>Off</option>';
      selectHtml += '</select>';

      return new Handlebars.SafeString(selectHtml);
   });

   Handlebars.registerHelper('node-only-select', function(management) {

      if (!management) {
         return;
      }

      function setSelected(management, optionValue) {
         if ((management.isNodeOnly && optionValue === 'on') ||
             (!management.isNodeOnly && optionValue === 'off')) {
            return ' selected';
         }

         return '';
      }

      var selectHtml = '<select class="form-control node-only-select">';
      selectHtml += '<option value="on"' + setSelected(management, 'on') + '>On</option>';
      selectHtml += '<option value="off"' + setSelected(management, 'off') + '>Off</option>';
      selectHtml += '</select>';

      return new Handlebars.SafeString(selectHtml);
   });

   Handlebars.registerHelper('show-runner', function(runner) {

      if (runner === 'rpcRunner') {
         return 'RPC Runner';
      } else if (runner === 'mvdmLocked') {
         return 'MVDM Locked';
      } else if (runner === 'server') {
         return 'Server';
      } else return runner;
   });

   Handlebars.registerHelper('jsBeautify', function(obj) {
      return jsBeautify.js_beautify(JSON.stringify(obj));
   });
});