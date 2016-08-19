var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var path = require('path');
var MVDM = require('../../../VDM/prototypes/mvdm');

function init() {
   app.use(function (req, res, next) {
      console.log('middleware');
      req.testing = 'testing';
      return next();
   });

   app.get('/', function(req, res, next){
      res.sendFile(path.join(__dirname + '/static/index.html'));
   });

   MVDM.on('describe', function(mvdmData) {
      var resObj = {
         type: 'socketMessage',
         MVDM: 'DESCRIBE',
         data: mvdmData
      };
      console.log("\n\n MVDM DESCRIBE EVENT: " + JSON.stringify(resObj) + "\n\n");
      expressWs.getWss('/').clients.forEach(function (client) {
         client.send(JSON.stringify(resObj));
      });
   });

   app.ws('/', function(ws, req) {

      console.log('socket', req.testing);
   });

   app.listen(9001, function () {
      console.log('Example app listening on port 9001!');
   });

// try static - Express 4 respects order
   app.use(express.static(__dirname + "/static")); //use static files in ROOT/public folder
}

module.exports.init = init;

