var util = require('util');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var DEFAULT_RETRIEVE_COUNT = 200;

// ================================ Asynchronous FMQL Query Driver ================================
var FMQLQuery = function(db, options) {
    _.extend(this, {
        db: db,
        onSuccess: _.get(options, 'success'),
        onError: _.get(options, 'error'),
        retrieveCount: _.get(options, 'retrieveCount', DEFAULT_RETRIEVE_COUNT),
        json: {}
    });

    this.on('success', function() {
        if (_.isFunction(this.onSuccess)) {
            this.onSuccess(this.json);
        }
    }.bind(this));

    this.on('error', function(err) {
        if (_.isFunction(this.onError)) {
            this.onError(err);
        }
    }.bind(this));
};

FMQLQuery.prototype = _.create(EventEmitter.prototype, {
    query: function(query) {
        this.currLo = 0;
        this.jsonArray = [];
        this.json = {};

        callQueryFunction.call(this, query);
    }
});

function callQueryFunction(query) {
    //console.log('Invoking Query: ', query);
    this.db.function({function: 'QUERY^FMQLQP', arguments: [query]}, function(err, result) {
        if (err) {
            return this.emit('error', result);
        }
        retrieveGlobalData.call(this);
    }.bind(this));
}

function retrieveGlobalData() {
    //console.log('Getting Next Global Subscript: ', next);
    this.db.retrieve({
        global: "TMP",
        subscripts: [process.pid, "FMQLJSON"],
        lo: this.currLo,
        hi: this.currLo + this.retrieveCount,
    }, 'object', function(err, result) {
        if (err) {
            return this.emit('error', result);
        }
        _.transform(result.object, function(result, value, key) {
            result[+key] = value;
        }, this.jsonArray);

        this.currLo += this.retrieveCount;
        if (_.size(result.object) >= this.retrieveCount) {
            retrieveGlobalData.call(this);
        }
        else {
            completeQuery.call(this);
        }
    }.bind(this));
}

function completeQuery() {
    this.json = JSON.parse(this.jsonArray.join(''));

    //console.log('Deleting the Global TMP Node!');
    this.db.kill({global: 'TMP', subscripts: [process.pid]}, function(err, result) {
        return err ? this.emit('error', result) : this.emit('success', this.json);
    }.bind(this));
}

module.exports = FMQLQuery;




