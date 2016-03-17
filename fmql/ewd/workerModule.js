var compress = require("compression"),
    cluster = require('cluster'),
    nodem = require('nodem'),
    fmql = require('../fmql');
var db = new nodem.Gtm();
// { ok: 1, result: '1' }
var ok = db.open();    

module.exports = function() {

  this.on('message', function(request, send, finished) {
    // Enforce ?fmql="SOME QUERY" (rem: query arguments don't get routes of their own in Express)
    if (!(("fmql" in request.query) && (request.query.fmql !== ""))) {
        // response.status(404).json({
        //     "error": "No FMQL Query Specified"
        // });
        console.log("404'ing: %s", request.url);
        finished('error');
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
  });
  
};
