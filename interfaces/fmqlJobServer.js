var express = require('express');
var compress = require("compression");
var qoper8 = require('ewd-qoper8');
var fmqlWorker = require('./fmqlWorker-ewdq');


var q = new qoper8.masterProcess();

q.on('start', function() {
    var numCPUs = require('os').cpus().length;
    this.worker.poolSize = numCPUs;
});

//use https
var https = require('https');
var fs = require('fs');
var port = process.argv[2] || 9000;
//path of the ssl 
var options = {
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem')
};

//use bunyan as logging tool
var bunyan = require('bunyan');
var log = bunyan.createLogger({
  name: 'myapp',
  streams: [
    {
      level: 'info',
      stream: process.stdout            // log INFO and above to stdout
    },
    {
      level: 'info',
      path: 'log/myapp-info.log'      // log INFO and above to the specified file
    },
    {
      level: 'error',
      path: 'log/myapp-error.log'  // log ERROR and above to a file
    }
  ]
});
log.info();     // Returns a boolean: is the "info" level enabled?
                // This is equivalent to `log.isInfoEnabled()` or
                // `log.isEnabledFor(INFO)` in log4j.

var auth = require('basic-auth');

var authCall = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = auth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };
  //username & password
  if (user.name === 'foo' && user.pass === 'bar') {
    return next();
  } else {
    return unauthorized(res);
  };
};

var app = express();

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

//print out error information for debugging purpose
if (app.get('env') === 'development') {

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
        log.error(err);
        if (req.path.match(/rambler/)) {
            req.url = "/fmRambler.html";
            log.info("Redirected /rambler to %s", req.url);
        } else if (req.path.match(/schema/)) {
            req.url = "/fmSchema.html";
            log.info("Redirected /schema to %s", req.url);
        } else if (req.path.match(/query/)) {
            req.url = "/fmQuery.html";
            log.info("Redirected /query to %s", req.url);
        }
        next();
    });



}


/*
 * Silently rewrites /rambler, /query and /schema to respective htmls
 */
app.use(function(req, res, next) {
    if (req.path.match(/rambler/)) {
        req.url = "/fmRambler.html";
        log.info("Redirected /rambler to %s", req.url);
    } else if (req.path.match(/schema/)) {
        req.url = "/fmSchema.html";
        log.info("Redirected /schema to %s", req.url);
    } else if (req.path.match(/query/)) {
        req.url = "/fmQuery.html";
        log.info("Redirected /query to %s", req.url);
    }
    next();
});


app.get('/fmqlEP', authCall, function(req, res) {
    var request = {
        query: {
            fmql: req.query.fmql // 'DESCRIBE 2-1'
        }
    };
    q.handleMessage(request, function(response) {
        res.type('application/json');
        res.send(response.message);
    });
});

// Not FMQL - try static - Express 4 respects order
app.use(express.static("./static")); //use static files in ROOT/public folder

//deal with the rest of nonexisting path
app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

// handling 404 errors
app.use(function(err, req, res, next) {
  if(err.status !== 404) {
    return next();
  };   
  log.error(err);
  res.send(err.message || '** sorry, no such file. **');

});

q.on('started', function() {
    this.worker.module = __dirname + '/fmqlWorker-ewdq.js';
    //app.listen(9000);
    //specify the port of the https server
    var server = https.createServer(options, app).listen(port, function() {
        log.info("listening to port ", port);
    });

  this.userDefined = {
    returnDUZ: true
  };


});

q.start();