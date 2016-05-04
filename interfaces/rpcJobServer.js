var express = require('express');
var bodyParser = require('body-parser');
var qoper8 = require('ewd-qoper8');
var qx = require('ewd-qoper8-express');

var app = express();
app.use(bodyParser.json());
app.use(function(err, req, res, next) {
    if (err) {
        res.status(400).send({
            error: err
        });
        return;
    }
    next();
});

//use https
var https = require('https');
var fs = require('fs');
//path of the ssl 
var options = {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem'),
    rejectUnauthorized: true, // Trust to listed certificates only. Don't trust even google's certificates.
    strictSSL: false // allow us to use our self-signed cert for testing
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//use bunyan as logging tool
var bunyan = require('bunyan');
var log = bunyan.createLogger({
  name: 'rpcJobServer',
  streams: [
    {
      level: 'info',
      stream: process.stdout            // log INFO and above to stdout
    },
    {
      level: 'info',
      path: 'log/rpcJobServerInfo.log'      // log INFO and above to the specified file
    },
    {
      level: 'error',
      path: 'log/rpcJobServerError.log'  // log ERROR and above to a file
    }
  ]
});
log.info();     // Returns a boolean: is the "info" level enabled?
                // This is equivalent to `log.isInfoEnabled()` or
                // `log.isEnabledFor(INFO)` in log4j.


var q = new qoper8.masterProcess();
qx.addTo(q);

app.use('/vista', qx.router());

q.on('started', function() {
    // Worker processes will load the vista1.js module:
    this.worker.module = __dirname + '/rpcWorker-ewdq';
    //this.worker.module = 'rpcWorker-ewdq';
    var port = process.argv[2] || 9001;
    //app.listen(port);

    var server = https.createServer(options, app).listen(port, function() {
    //log.info("listening to port ", port);
    });

    console.log('ewd-qoper8-vistarpc is now running and listening on port ' + port);
    log.info('ewd-qoper8-vistarpc is now running and listening on port ' + port);

    this.userDefined = {
        returnDUZ: true
    };

});

q.start();