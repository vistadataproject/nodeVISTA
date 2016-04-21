var express = require('express');
var bodyParser = require('body-parser');
var qoper8 = require('ewd-qoper8');
var qx = require('ewd-qoper8-express');

var app = express();
app.use(bodyParser.json());
app.use(function(err, req, res, next) {
  if (err) {
    res.status(400).send({error: err});
    return;
  }
  next();
});

var q = new qoper8.masterProcess();
qx.addTo(q);

app.use('/vista', qx.router());

q.on('started', function() {
  // Worker processes will load the vista1.js module:
  this.worker.module = __dirname + '/rpcWorker-ewdq';
  //this.worker.module = 'rpcWorker-ewdq';
  var port = process.argv[2] || 9001;
  app.listen(port);
  console.log('ewd-qoper8-vistarpc is now running and listening on port ' + port);

 this.userDefined = {
    returnDUZ: true
  };

});

q.start();
