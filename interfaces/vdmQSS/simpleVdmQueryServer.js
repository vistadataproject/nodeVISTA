#!/usr/bin/env node

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
 * QUEUE TODO:
 * kue or bull to queue incoming FMQL requests so available workers aren't
 * overwhelmed - see issue: https://github.com/vistadataproject/nodeVISTA/issues/30
 *
 * MONITOR/LOGGING TODO:
 * - more robust/tested restart/shutdown
 *   - more on SIGKILL, SIGINT, cluster vs worker (issues/misleading stuff)
 *     http://stackoverflow.com/questions/19796102/exit-event-in-worker-process-when-killed-from-master-within-a-node-js-cluster
 * - morgan: See https://github.com/expressjs/morgan, apache like access/error log
 *   - cluster sharing log? 
 *   - more logging with other modules
 *   - see: http://tostring.it/2014/06/23/advanced-logging-with-nodejs/ (gets into winston too)
 * - more on dev vs prod: var env = process.env.NODE_ENV || 'development';
 *
 * LICENSE:
 * This program is free software; you can redistribute it and/or modify it under the terms of 
 * the GNU Affero General Public License version 3 (AGPL) as published by the Free Software 
 * Foundation.
 * (c) 2016 caregraf
 */

'use strict';

var express = require("express"),
    compress = require("compression"),
    cluster = require('cluster'),
    nodem = require('nodem'),

    VDM = require('../../prototypes/vdm'),
    vdmModel = require('../../prototypes/vdmRead/vdmReadOnly').vdmModel,
    vdmQS = require('../../prototypes/vdmRead/vdmQS'),
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

    var db = new nodem.Gtm();
    // { ok: 1, result: '1' }
    var ok = db.open();
    VDM.setDBAndModel(db, vdmModel);

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
        if (req.path.match(/query/)) {
            req.url = "/vdmQuery.html";
            console.log("Redirected /query to %s", req.url);
        }
        next();
    });

    // First try FMQL
    app.get("/vdmEP", function(request, response) {

        // Enforce ?vdmql="SOME QUERY" (rem: query arguments don't get routes of their own in Express)
        if (!(("vdmql" in request.query) && (request.query.vdmql !== ""))) {
            response.status(404).json({"error": "No VDM Query Specified"});
            console.log("404'ing: %s", request.url);
            return;
        }

        // {"query": "DESCRIBE 2-9"}
        var query = request.query.vdmql;
        //JSON, HTML, etc
        var format = request.query.format;

        console.log("Worker %s: invoking VDM Query %s", cluster.worker.id, query);

        var jsont = vdmQS.query(query, format); // ask for text to preserve order 

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
