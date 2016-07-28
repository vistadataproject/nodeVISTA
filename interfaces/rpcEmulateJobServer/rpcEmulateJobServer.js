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
app.use('/rpc', qx.router());
// try static - Express 4 respects order
app.use(express.static(__dirname + "/static")); //use static files in ROOT/public folder

q.on('started', function() {
  this.worker.module = __dirname + '/rpcEWorker';
  var port = process.argv[2] || 9001;
  app.listen(port);

  console.log('ewd-qoper8-vistarpc is now running and listening on port ' + port);
});

q.start();
