var express = require('express');
var bodyParser = require('body-parser');
var qoper8 = require('ewd-qoper8');
var app = express();
app.use(bodyParser.json());

var q = new qoper8.masterProcess();

app.get('/qoper8', function (req, res) {
    var request = {
        hello: 'world'
    };
  q.handleMessage(request, function(response) {
    res.send(response);
  });
});

q.on('started', function() {
  this.worker.module = '/home/vdp/fmql/ewd-dbq/workerModule';
  app.listen(9000);
});

q.start();