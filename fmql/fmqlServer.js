/*
 * Simple cluster-based FMQL server that can also statically serve Rambler and
 * other one page apps and their CSS/JS.
 * 
 * For local test invoke with: nohup node fmqlServer.js > SEESERVERRUN &
 *
 * Context: replaces use of Apache/Python for Web access to FMQL.
 *
 * - SIGKILL (kill -9) - cluster will kill workers (once they are done)
 * - see: curl http://localhost:9000/fmqlEP?fmql=DESCRIBE%202-1 -v
 *
 * TODO:
 * - more robust/tested restart/shutdown
 *   - more on SIGKILL, SIGINT, cluster vs worker (issues/misleading stuff)
 *     http://stackoverflow.com/questions/19796102/exit-event-in-worker-process-when-killed-from-master-within-a-node-js-cluster
 * - stress it
 * - morgan: See https://github.com/expressjs/morgan, apache like access/error log
 *   - cluster sharing log? 
 *   - more logging with other modules
 * - more on dev vs prod: var env = process.env.NODE_ENV || 'development';
 * - try on Cache (vs nodem GTM). Add explicit support. Test one/close DB vs keep DB open in worker
 */

var express = require("express"),
    compress = require("compression"),
    cluster = require('cluster'),
    nodem = require('nodem'),
    port = process.argv[2] || 9000;

/* 
 * Typical 'cluster' setup
 */
if (cluster.isMaster) {

    var numCPUs = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < numCPUs; i += 1) {
        cluster.fork();
    }

    console.log("Master process %d (kill -9 this) with %d CPUs to play with", process.pid, numCPUs);

    // Listen for dying workers
    cluster.on('exit', function (worker) {

        // If forced, don't restart - uncaughtException forces with kill()
        if (worker.suicide === true)
            return;

        // Replace the dead worker, we're not sentimental
        console.log('Worker %d died :( - starting a new one', worker.id);
        cluster.fork();

    });

}
else {

    const db = new nodem.Gtm();
    // { ok: 1, result: '1' }
    var ok = db.open();

    process.on('uncaughtException', function(err) {
        db.close();
        console.trace('Uncaught Exception - exiting worker');
        console.error(err.stack);
        // exit(1) - Uncaught Fatal Exception
        cluster.worker.kill();
    });

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

    /*
     * Silently rewrites /rambler, /query and /schema to respective htmls
     */
    app.use(function(req, res, next) {
        if (req.path.match(/rambler/)) {
            req.url = "/fmRambler.html";
            console.log("Redirected /rambler to %s", req.url);
        }
        else if (req.path.match(/schema/)) {
            req.url = "/fmSchema.html";
            console.log("Redirected /schema to %s", req.url);
        }
        else if (req.path.match(/query/)) {
            req.url = "/fmQuery.html";
            console.log("Redirected /query to %s", req.url);
        }
        next();
    });

    // First try FMQL
    app.get("/fmqlEP", function(request, response) {

        // Enforce ?fmql="SOME QUERY" (rem: query arguments don't get routes of their own in Express)
        if (!(("fmql" in request.query) && (request.query.fmql !== ""))) {
            response.status(404).json({"error": "No FMQL Query Specified"});
            console.log("404'ing: %s", request.url);
            return;
        }

        // {"query": "DESCRIBE 2-9"}
        var query = request.query.fmql;

        console.log("Worker %s: invoking FMQL %s", cluster.worker.id, query);

        // FMQL setup for direct (Synchronous) calling from node. No need for wrapper.
        // $J in MUMPS matches process.pid in Node so no need for result ^TMP parse
        var tmpFMQL = db.function({function: "QUERY^FMQLQP", arguments: [query]});
        // {"ok":1,"function":"QUERY^FMQLQP","arguments":["DESCRIBE 2-100"],"result":"^TMP(4012,\"FMQLJSON\")"}

        // Reassembling JSON from TMP - rem no advantage to chunk as sync call only
        // returns when TMP JSON completely built.  
        var jsont = "";
        var next = {global: "TMP", subscripts:[process.pid, "FMQLJSON", ""]};
        while (true) {
            next = db.next(next);
            if (next.subscripts[2] === '')
                break;
            else {
                var text = db.get(next).data;
                jsont += text;
            }
        }
        // could do JSON.parse(jsont) and response.write(typeof JSON.parse(jsont))
        db.kill({"global": "TMP", subscripts: [process.pid]});
        // could use response.json but will be changing to jsonld so making explicit
        response.type('application/json');
        response.send(jsont);
        console.log("Response (100): %s\n\n", jsont.substring(0, 99));
    });

    // Not FMQL - try static - Express 4 respects order
    app.use(express.static(__dirname + "/static")); //use static files in ROOT/public folder

    var server = app.listen(port, function() {
        console.log("FMQL worker %d, process %d", cluster.worker.id, process.pid);
    });

}
