var nodem = require('nodem'),
fmql = require('./fmql');

module.exports = function() {
    var db = new nodem.Gtm();
    this.on('dbOpened', function(status) {
        console.log('GT.M was opened by worker ' + process.pid + ': status = ' + JSON.stringify(status));
    });

    this.on('start', function(isFirst) {
        db.open();
        var connectGTMTo = require('ewd-qoper8-gtm');
        var env = {
            // gtmdir: '/opt/lsb-gtm/V6.2-000_x86_64',
            gtmdir: '/home/osehra/lib/gtm',
            gtmdist: '/home/osehra/lib/gtm',
            gtmver: 'V6.2-000_x86_64',
            gtmgbldir: '/home/osehra/g/osehra.gld',
            gtmroutines: '/home/osehra/p/V6.2-000_x86_64*(/home/osehra/p) /home/osehra/s/V6.2-000_x86_64*(/home/osehra/s) /home/osehra/r/V6.2-000_x86_64*(/home/osehra/r) /home/osehra/lib/gtm/libgtmutil.so /home/osehra/lib/gtm /home/osehra/ewdjs/node_modules/nodem/src',
            GTMCI: '/home/osehra/ewdjs/node_modules/nodem/resources/nodem.ci'
        };
        connectGTMTo(this, env);

        if (isFirst) {
            var log = new this.documentStore.DocumentNode('ewdTestLog');
            log.delete();
        }
    });

    this.on('message', function(messageObj, send, finished) {
        var query = messageObj.query.fmql;
        var jsont = fmql.query(db, query, false);
        var results = {
            query: query,
            result: jsont,
            worker: 'processed from worker ' + process.pid,
            time: new Date().toString()
        };
        // var log = new this.documentStore.DocumentNode('ewdTestLog');
        // var ix = log.increment();
        // log.$(ix).setDocument(results);
        finished(results);
    });

    this.on('stop', function() {
        console.log('Connection to GT.M closed');
        db.close();
    });

};