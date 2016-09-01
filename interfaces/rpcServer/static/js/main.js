/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
   // The shim config allows us to configure dependencies for
   // scripts that do not call define() to register a module
   shim: {
      bootstrap: {
         deps: [
            'jquery'
         ]
      },
      underscore: {
         exports: '_'
      },
      backbone: {
         deps: [
            'underscore',
            'jquery'
         ],
         exports: 'Backbone'
      },
      'backbone.paginator': {
         deps: [
            'underscore',
            'jquery',
            'backbone'
         ],
         exports: 'backbone.paginator'
      },
      backgrid: {
         deps: [
            'underscore',
            'jquery',
            'backbone'
         ],
         exports: 'Backgrid'
      },
      'backgrid.paginator': {
         deps: [
            'underscore',
            'jquery',
            'backbone',
            'backbone.paginator',
            'backgrid'
         ],
         exports: 'backgrid.paginator'
      },
      backgridMomentCell: {
         deps: [
            'underscore',
            'jquery',
            'backbone',
            'backgrid'
         ]
      },
      backgridSelectFilter: {
         deps: [
            'underscore',
            'jquery',
            'backbone',
            'backgrid'
         ]
      },
      backgridCustomCells: {
         deps: [
            'underscore',
            'jquery',
            'backbone',
            'backgrid'
         ]
      }
   },
   moment: {
      noGlobal: true
   },
   paths: {
      jquery: '../jquery/dist/jquery.min',
      underscore: '../underscore/underscore-min',
      backbone: '../backbone/backbone-min',
      'backbone.paginator': '../backbone.paginator/lib/backbone.paginator',
      text: '../text/text',
      handlebars: '../handlebars/dist/handlebars.amd.min',
      bootstrap: '../bootstrap/dist/js/bootstrap.min',
      moment: '../moment/min/moment.min',
      jsBeautify: '../js-beautify/js/lib/beautify',
      backgrid: '../backgrid/lib/backgrid',
      'backgrid.paginator': 'lib/backgrid-paginator.min',
      backgridMomentCell: 'lib/backgrid-moment-cell.min',
      backgridSelectFilter: 'lib/backgrid-select-filter',
      backgridCustomCells: 'lib/backgrid-custom-cells',
      config: '../config'
   }
});

require([
   'jquery',
   'backbone',
   'app',
   'router',
   'EventListener',
   'backgrid'
], function ($, Backbone, AppView, Router, EventListener) {
   /*jshint nonew:false*/

   //manages cleaning up previous view and rendering a new view
   function ViewManager() {

      this.showView = function(view) {
         if (this.currentView){
            this.currentView.close();
         }

         this.currentView = view;
         this.currentView.render();

         $("#main-content").html(this.currentView.el);
      };
   }

   //base close function that cleans removes view and unbinds any events
   Backbone.View.prototype.close = function(){
      this.remove();

      //any extra cleanup routines defined by view
      if (this.onClose){
         this.onClose();
      }
   };

   // Initialize routing and start Backbone.history()
   new Router({viewManager: new ViewManager(), eventListener: new EventListener()});
   Backbone.history.start();

   // Initialize the application view
   new AppView();

});
