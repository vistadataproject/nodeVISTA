/*global define*/
define([
   'handlebars'
], function (Handlebars) {
   'use strict';

   Handlebars.registerHelper('rpcs-locked-select', function(management) {

      if (!management) {
         return;
      }

      function setSelected(management, optionValue) {
         if ((management.isRpcsLocked && optionValue === 'on') ||
            (!management.isRpcsLocked && optionValue === 'off')) {
            return ' selected';
         }

         return '';
      }

      var selectHtml = '<select class="form-control rpcs-locked-select">';
      selectHtml += '<option value="on"' + setSelected(management, 'on') + '>On</option>';
      selectHtml += '<option value="off"' + setSelected(management, 'off') + '>Off</option>';
      selectHtml += '</select>';

      return new Handlebars.SafeString(selectHtml);
   });

   Handlebars.registerHelper('show-runner', function(event) {

      if (event.runner === 'localRPCRunner') {
         return 'Local RPC Runner';
      } else if (event.runner === 'rpcL') {
         return 'Locked';
      } else if (event.runner === 'hardcode') {
         return 'Hardcode';
      } else return event.runner;
   });
});