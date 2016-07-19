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

app.use('/vpr', qx.router());

q.on('started', function() {
  this.worker.module = __dirname + '/vprEWorker';
  var port = process.argv[2] || 9001;
  app.listen(port);

  console.log('ewd-qoper8-vistarpc is now running and listening on port ' + port);
});

q.start();
