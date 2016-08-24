var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var moment = require('moment');
var path = require('path');
var MVDM = require('../../../VDM/prototypes/mvdm');
var CONFIG = require('./cfg/config.js');
var LOGGER = require('./logger.js');


function init() {
   app.use(function (req, res, next) {
      return next();
   });

   //default path goes to index.html
   app.get('/', function(req, res, next){
      res.sendFile(path.join(__dirname + '/static/index.html'));
   });

   MVDM.on('create', function(mvdmData) {
      processMVDMEvent('CREATE', mvdmData);
   });

   MVDM.on('describe', function(mvdmData) {
      processMVDMEvent('DESCRIBE', mvdmData);
   });

   MVDM.on('list', function(mvdmData) {
      processMVDMEvent('LIST', mvdmData);
   });

   MVDM.on('update', function(mvdmData) {
      processMVDMEvent('UPDATE', mvdmData);
   });

   MVDM.on('remove', function(mvdmData) {
      processMVDMEvent('REMOVE', mvdmData);
   });

   MVDM.on('unremoved', function(mvdmData) {
      processMVDMEvent('UNREMOVED', mvdmData);
   });

   MVDM.on('delete', function(mvdmData) {
      processMVDMEvent('DELETE', mvdmData);
   });

   app.ws('/', function(ws, req) {
      //handle socket request
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

function processMVDMEvent(eventName, mvdmData) {
   var resObj = {
      type: 'socketMessage',
      MVDM: eventName,
      data: {
         timestamp: mvdmData.eventTimestamp,
         domain: mvdmData.domain,
         type: eventName,
         userId: mvdmData.userId,
         facilityId: mvdmData.facilityId,
         mvdmObj: mvdmData.data.result
      }
   };

   //send MVDM events to connected websocket clients
   expressWs.getWss('/').clients.forEach(function (client) {
      client.send(JSON.stringify(resObj));
   });
}

module.exports.init = init;

