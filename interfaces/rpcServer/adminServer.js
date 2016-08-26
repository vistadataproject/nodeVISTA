'use strict';

var express = require('express');
var _ = require('underscore');
var app = express();
var expressWs = require('express-ws')(app);
var bodyParser = require('body-parser');
var moment = require('moment');
var path = require('path');
var CONFIG = require('./cfg/config.js');
var LOGGER = require('./logger.js');
var mvdmManagement = require('./mvdmManagement');
var EventHandler = require('./EventHandler');

function init() {
   // parse application/x-www-form-urlencoded
   app.use(bodyParser.urlencoded({ extended: false }));

   // parse application/json
   app.use(bodyParser.json());


   //default path goes to index.html
   app.get('/', function(req, res){
      res.sendFile(path.join(__dirname + '/static/index.html'));
   });

   //get management settings
   app.get('/management', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(mvdmManagement));
   });

   //update management settings
   app.put('/management', function(req, res) {
      if (!req.body) {
         return res.sendStatus(400);
      }

      var settings = req.body;

      if (_.has(settings, 'isEmulation')) {
         mvdmManagement.isEmulation = settings.isEmulation;
      }
      
      return res.sendStatus(200);
   });

   //mvdm events socket
   app.ws('/mvdmEvents', function(ws, req) {
      //handle socket request
      EventHandler.on('mvdmCreate', function(event) {
         processEvent(ws, 'MVDM', event);
      });

      EventHandler.on('mvdmDescribe', function(event) {
         processEvent(ws, 'MVDM', event);
      });

      EventHandler.on('mvdmList', function(event) {
         processEvent(ws, 'MVDM', event);
      });

      EventHandler.on('mvdmUpdate', function(event) {
         processEvent(ws, 'MVDM', event);
      });

      EventHandler.on('mvdmRemove', function(event) {
         processEvent(ws, 'MVDM', event);
      });

      EventHandler.on('mvdmUnremoved', function(event) {
         processEvent(ws, 'MVDM', event);
      });

      EventHandler.on('mvdmDelete', function(event) {
         processEvent(ws, 'MVDM', event);
      });
   });

   //rpc events socket
   app.ws('/rpcEvents', function(ws, req) {

      EventHandler.on('rpcCall', function(event) {
         processEvent(ws, 'RPC', event);
      });
   });

   var port = CONFIG.admin.port;
   app.listen(port, function () {
      LOGGER.info('MVDM Admin listening on port ' + port);
   });

   //static files
   app.use(express.static(__dirname + "/static")); //use static files in ROOT/public folder
   app.use(express.static(__dirname + "/node_modules")); //expose node_modules for bootstrap, jquery, underscore, etc.
   app.use(express.static(__dirname + "/cfg")); //config - exposing for convenience
}

function processEvent(ws, eventCategory, event) {

   var resObj = {
      type: 'socketMessage',
      eventCategory: eventCategory,
      data: event
   };

   ws.send(JSON.stringify(resObj));
}

module.exports.init = init;

