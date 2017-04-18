/**
 HtmlCell renders any html code

 @class Backgrid.HtmlCell
 @extends Backgrid.Cell
 */
(function () {
   Backgrid.HtmlCell = Backgrid.Cell.extend({

      /** @property */
      className: "html-cell",

      initialize: function () {
         Backgrid.Cell.prototype.initialize.apply(this, arguments);
      },

      render: function () {
         this.$el.empty();
         var rawValue = this.model.get(this.column.get("name"));
         var formattedValue = this.formatter.fromRaw(rawValue, this.model);
         this.$el.append(formattedValue);
         this.delegateEvents();
         return this;
      }
   });


   //HtmlCell formatting utility
   Backgrid.HtmlCell.formatAsHtml = function (rawValue, model) {

      //mvdmEmulated runner events are displayed as bold
      if (model.get('runner') === 'mvdmEmulated') {
         rawValue = '<strong>' + rawValue + '</strong>';
      }

      return '<span class="html-cell">' + rawValue + '</span>';
   };

})();
