'use strict';

var express = require('express');
var _ = require('underscore');
var app = express();
var expressWs = require('express-ws')(app);
var bodyParser = require('body-parser');
var moment = require('moment');
var path = require('path');
var MVDM = require('../../../VDM/prototypes/mvdm');
var CONFIG = require('./cfg/config.js');
var LOGGER = require('./logger.js');
var mvdmManagement = require('./mvdmManagement');

function init() {
   // parse application/x-www-form-urlencoded
   app.use(bodyParser.urlencoded({ extended: false }));

   // parse application/json
   app.use(bodyParser.json());


   //default path goes to index.html
   app.get('/', function(req, res){
      res.sendFile(path.join(__dirname + '/static/index.html'));
   });

   //get emulation status
   app.get('/management', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(mvdmManagement));
   });

   //update emulation
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

   app.ws('/', function(ws, req) {
      //handle socket request
   });

   initMVDMEventListeners();

   var port = CONFIG.admin.port;
   app.listen(port, function () {
      LOGGER.info('MVDM Admin listening on port ' + port);
   });

   //static files
   app.use(express.static(__dirname + "/static")); //use static files in ROOT/public folder
   app.use(express.static(__dirname + "/node_modules")); //expose node_modules for bootstrap, jquery, underscore, etc.
   app.use(express.static(__dirname + "/cfg")); //config - exposing for convenience
}

function initMVDMEventListeners() {
   MVDM.on('create', function(mvdmData) {
      processMVDMEvent(mvdmData);
   });

   MVDM.on('describe', function(mvdmData) {
      processMVDMEvent(mvdmData);
   });

   MVDM.on('list', function(mvdmData) {
      processMVDMEvent(mvdmData);
   });

   MVDM.on('update', function(mvdmData) {
      processMVDMEvent(mvdmData);
   });

   MVDM.on('remove', function(mvdmData) {
      processMVDMEvent(mvdmData);
   });

   MVDM.on('unremoved', function(mvdmData) {
      processMVDMEvent(mvdmData);
   });

   MVDM.on('delete', function(mvdmData) {
      processMVDMEvent(mvdmData);
   });
}

function processMVDMEvent(mvdmEvent) {

   var resObj = {
      type: 'socketMessage',
      data: mvdmEvent
   };

   //send MVDM events to connected websocket clients
   expressWs.getWss('/').clients.forEach(function (client) {
      client.send(JSON.stringify(resObj));
   });
}

module.exports.init = init;

