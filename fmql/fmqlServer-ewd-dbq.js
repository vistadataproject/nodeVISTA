var express = require('express');
var bodyParser = require('body-parser');
var compress = require("compression");
var qoper8 = require('ewd-qoper8');
var fmqlWorker = require('./fmqlWorker-ewdq');
var app = express();
app.use(bodyParser.json());

var q = new qoper8.masterProcess();

q.on('start', function() {
    var numCPUs = require('os').cpus().length;
    this.worker.poolSize = numCPUs;
});

// gzip etc if accepted - must come before middleware for static handling
app.use(compress());

/*
 * Redirect / or index.html to schema (for now)
 */
app.use(function(req, res, next) {
    if ((req.url.length === 0) || req.path.match(/index/) || req.path.match(/\/$/))
        res.redirect(302, "/schema");
    else
        next();
});

/*
 * Silently rewrites /rambler, /query and /schema to respective htmls
 */
app.use(function(req, res, next) {
    if (req.path.match(/rambler/)) {
        req.url = "/fmRambler.html";
        console.log("Redirected /rambler to %s", req.url);
    } else if (req.path.match(/schema/)) {
        req.url = "/fmSchema.html";
        console.log("Redirected /schema to %s", req.url);
    } else if (req.path.match(/query/)) {
        req.url = "/fmQuery.html";
        console.log("Redirected /query to %s", req.url);
    }
    next();
});


app.get('/fmqlEP', function(req, res) {
    var request = {
        query: {
            fmql: req.query.fmql // 'DESCRIBE 2-1'
        }
    };
    q.handleMessage(request, function(response) {
        res.send(response);
    });
});

// Not FMQL - try static - Express 4 respects order
app.use(express.static("./static")); //use static files in ROOT/public folder

q.on('started', function() {
    this.worker.module = __dirname + '/fmqlWorker-ewdq.js';
    app.listen(9000);
});

q.start();