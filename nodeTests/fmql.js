var util = require('util');
var _ = require('lodash');

var DEFAULT_RETRIEVE_COUNT = 200;

// ================================== FMQL Query: Batch Retrieve ===================================
function fmqlBatchQuery(db, query, options) {
    var tmpFMQL = db.function({
        function: "QUERY^FMQLQP",
        arguments: [query]
    });

    var currLo = 0;
    var jsonArray = [];
    var retrieveCount = _.get(options, "retrieveCount") || DEFAULT_RETRIEVE_COUNT;
    var isRetrieving = true;

    while (isRetrieving) {

        var response = db.retrieve({
            global: 'TMP',
            subscripts: [process.pid, 'FMQLJSON'],
            lo: currLo,
            hi: currLo + retrieveCount
        }, 'object');

        _.transform(response.object, function(result, value, key) {
            result[+key] = value;
        }, jsonArray);

        currLo += retrieveCount;
        isRetrieving = (_.size(response.object) >= retrieveCount);
    }

    db.kill({
        global: 'TMP',
        subscripts: [process.pid]
    });

    return JSON.parse(jsonArray.join(''));
}

// ================================= FMQL Query: Stepped Approach ==================================
function fmqlQuery(db, query) {
    var tmpFMQL = db.function({
        function: "QUERY^FMQLQP",
        arguments: [query]
    });

    var jsont = '';
    var next = {
        global: 'TMP',
        subscripts: [process.pid, 'FMQLJSON', '']
    };
    while (true) {
        next = db.next(next);
        if (next.subscripts[2] === '')
            break;
        else {
            var text = db.get(next).data;
            jsont += text;
        }
    }

    db.kill({
        global: 'TMP',
        subscripts: [process.pid]
    });

    return JSON.parse(jsont);
}

module.exports = {
    batchQuery: fmqlBatchQuery,
    query: fmqlQuery
};