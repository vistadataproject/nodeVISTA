var express = require('express');
var _ = require('lodash');
var MumpsDB = require('./mumpsdb');
var FMQL = require('./fmql');
var app = express();

var port = process.argv[2] || 9000;

// ================================= Connect to the MUMPS database =================================
var db = MumpsDB.openConnection({
    type: 'Cache',
    namespace: 'VISTA'
});

if (db.error) {
    console.log('An error has occurred connecting to the M database: ' + db.message);
    process.exit(db.code);
}
console.log('Successfully connected to the M database!');


// ======================================== Escape Handler =========================================
process.on('SIGINT', function(err) {
    console.log('Shutting down web service listener...');
    db.close();
    process.exit(0);
});


// ======================================= Express Listener ========================================
app.get('/fmqlEP', function (req, res) {
    if (_.isEmpty(req.query.fmql)) {
        console.log('Invalid query: ', req.url);
        return res.status(404).json({"error": "No FMQL Query Specified"});
    }

    var result = FMQL.batchQuery(db, req.query.fmql);
    if (result.error) {
        console.log('Error: ', result.error);
        return res.status(404).json(result);
    }
    console.log('Success: ', result.fmql);
    res.status(200).json(result);
});

app.listen(port, function () {
    console.log('FMQL web service listening on port ' + port + '...');
});