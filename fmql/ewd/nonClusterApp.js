var express = require('express');
var bodyParser = require('body-parser');
var qoper8 = require('ewd-qoper8');
var qx = require('ewd-qoper8-express');

var app = express();
app.use(bodyParser.json());

var q = new qoper8.masterProcess();
qx.addTo(q);

app.post('/qoper8', function(req, res) {
    qx.handleMessage(req, res);
});

app.get('/qoper8/test', function(req, res) {
    qx.handleMessage(req, res);
});

app.get('/fmqlEP', function(request, response) {
    
    qx.handleMessage(request, response);
});

q.on('started', function() {
    this.worker.module = '/home/vdp/fmql/ewd/workerModule';
    var server = app.listen(9000);
});

q.start();