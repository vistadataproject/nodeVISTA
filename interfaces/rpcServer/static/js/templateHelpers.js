/*global define*/
define([
   'handlebars'
], function (Handlebars) {
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

   Handlebars.registerHelper('show-runner', function(event) {

      if (event.runner === 'rpcRunner') {
         return 'RPC Runner';
      } else if (event.runner === 'mvdmLocked') {
         return 'MVDM Locked';
      } else if (event.runner === 'server') {
         return 'Server';
      } else return event.runner;
   });
});