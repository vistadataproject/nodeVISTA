/*global define*/
define([
   'handlebars'
], function (Handlebars) {
   'use strict';

   Handlebars.registerHelper('filter-select', function(eventFilter) {

      if (!eventFilter) {
         eventFilter = '';
      }

      function setSelected(eventFilter, optionValue) {
         return eventFilter.toLowerCase() === optionValue ? ' selected' : '';
      }

      var selectHtml = '<select class="filter filter-select form-control">';
      selectHtml += '<option value="all"' + setSelected(eventFilter, 'all') + '>ALL</option>';
      selectHtml += '<option value="create"' + setSelected(eventFilter, 'create') + '>CREATE</option>';
      selectHtml += '<option value="list"' + setSelected(eventFilter, 'list') + '>LIST</option>';
      selectHtml += '<option value="describe"' + setSelected(eventFilter, 'describe') + '>DESCRIBE</option>';
      selectHtml += '<option value="update"' + setSelected(eventFilter, 'update') + '>UPDATE</option>';
      selectHtml += '<option value="remove"' + setSelected(eventFilter, 'remove') + '>REMOVE</option>';
      selectHtml += '<option value="unremoved"' + setSelected(eventFilter, 'unremvoed') + '>UNREMOVED</option>';
      selectHtml += '<option value="delete"' + setSelected(eventFilter, 'delete') + '>DELETE</option>';
      selectHtml += '</select>';

      return new Handlebars.SafeString(selectHtml);
   });
});