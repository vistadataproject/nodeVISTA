var util = require('util');
var MumpsDB = require('./mumpsdb');
var FMQL = require('./fmql');

var FMQL_QUERIES = [
    'SELECT 1',
    'DESCRIBE 8994_1-1',
    'DESCRIBE 5-16'
];

// ================================ Setup the M Database connection ================================
var db = MumpsDB.openConnection({
    type: 'CACHE'
});

if (db.error) {
    console.log('Error connecting to the M Database (%s) [%d]', db.message, db.code);
    process.exit(db.code);
}

// ======================================= Synchronous Tests =======================================
console.log('Running FMQL synchronous tests, iterative approach...');
FMQL_QUERIES.forEach(function(query) {

    var json = {};
    console.log('Running synchronous FMQL query: %s', query);

    // The FMQL 'query' function calls the "FMQLQP" function, then iterates over the
    // global subscripts using a 'next'/'get' loop.
    json = FMQL.query(db, query);
    console.log(util.inspect(json.fmql, {depth: null}));
});


console.log('\nRunning FMQL synchronous tests, batch retrieve approach...');
FMQL_QUERIES.forEach(function(query) {

    var json = {};
    console.log('Running synchronous FMQL query: %s', query);

    // The FMQL 'batchQuery' function calls the "FMQLQP" function, then uses one or more
    // calls to 'retrieve' to bulk grab the global subscripts as blocks.
    json = FMQL.batchQuery(db, query);
    console.log(util.inspect(json.fmql, {depth: null}));
});

db.close();