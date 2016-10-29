var util = require('util');
var cluster = require('cluster');
var MumpsDB = require('./mumpsdb');
var FMQLAsync = require('./fmqlAsync');

// ====================================== Asynchronous Tests =======================================
// Because the FMQL query results are bound to the local process ID, consecutive asynchronous
// queries run from a single process can clobber the previous queries.  We get around this using
// clustering, which will give us unique process IDs that will provide mapping for global retrieval

if (cluster.isMaster) {

    var FMQL_QUERIES = [
        'SELECT 1',
        'DESCRIBE 8994_1-1',
        'DESCRIBE 5-16'
    ];
    var completedQueries = 0;
    var numWorkers = FMQL_QUERIES.length;

    console.log('Running FMQL asynchronous tests...');
    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for (var i = 0; i < numWorkers; i++) {
        cluster.fork({QUERY: FMQL_QUERIES[i]});
    }

    cluster.on('exit', function() {
        console.log('Completed queries: ' + (++completedQueries));
        if (completedQueries === numWorkers) {
            process.exit(0);
        }
    });
}
else {

    console.log('Processing FMQL query: ' + process.env.QUERY + ' on PID: ' + process.pid);
    var db = MumpsDB.openConnection({
        type: 'CACHE'
    });

    if (db.error) {
        console.log('Error connecting to the M Database (%s) [%d]', db.message, db.code);
        process.exit(db.code);
    }

    var fmql = new FMQLAsync(db);

    fmql.on('success', function(json) {
        console.log(util.inspect(json.fmql, {depth: null}));
        db.close();
        process.exit(0);
    });

    fmql.on('error', function(err) {
        console.log(err);
        db.close();
        process.exit(err.ErrorCode || -1);
    });

    fmql.query(process.env.QUERY);
}