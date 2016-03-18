var compress = require("compression"),
    cluster = require('cluster'),
    nodem = require('nodem'),
    fmql = require('../fmql');
var db = new nodem.Gtm();
// { ok: 1, result: '1' }
// var ok = db.open();    

module.exports = function() {

    this.on('message', function(request, send, finished) {
        // Enforce ?fmql="SOME QUERY" (rem: query arguments don't get routes of their own in Express)
        console.log('=====', request);
        if (request.path.indexOf('/fmqlEP') === 0) {
            fmqlEP(request, send, finished);
        }
    });

    function fmqlEP(request, send, finished) {
        if (!(("fmql" in request.query) && (request.query.fmql !== ""))) {
            console.log("404'ing: %s", request.url);
            var results = {
                error: "No FMQL Query Specified",
                status: {
                    code: 403
                }
            };
            finished(results);
            return;
        }
        // {"query": "DESCRIBE 2-9"}
        var query = request.query.fmql;
        var jsont = fmql.query(db, query, false);
        var results = {
            query: query,
            result: jsont,
            worker: 'processed from worker ' + process.pid,
            time: new Date().toString()
        };
        finished(results);
    }

    this.on('start', function() {
        db.open();
    });
    this.on('stop', function() {
        db.close();
    });

};