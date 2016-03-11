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
 * QUEUE STRESS TEST:
 * npm install nperf
 * nperf -c 200 -n 10000 http://localhost:9000/fmqlEP?fmql=DESCRIBE%202-1D //send 10000 requests with 200 concurrent requests > succeed
 * nperf -c 200 -n 10000 http://localhost:9000/schema //failed after overolading around 6555 of the 10000 requests due to no kue
 * another load test with 200 concurrent requests of total 3000. The QPS/rate is 177, which means that it can handle 177 requests per second within the Vagrant virtual box.
 * If we move to real cluster or bigger box, the QPS would be much better.
 * { statuses: { '200': 3000 },
 * min: 91,
 * max: 2584,
 * avg: 1092.525333333334,
 * count: 3000,
 * rate: 177.43080198722498,
 * start: 1457451781999,
 * total_time: 16908 }
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
    fmql = require('./fmql'),
    port = process.argv[2] || 9000,
    kue = require('kue');

var jobs = kue.createQueue();
var jobType = 'fmql';
var numParallel = 5;
var jobDelay = 0;
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
    cluster.on('exit', function(worker) {

        // If forced, don't restart - uncaughtException forces with kill()
        if (worker.suicide === true)
            return;

        // Replace the dead worker, we're not sentimental
        console.log('Worker %d died :( - starting a new one', worker.id);
        cluster.fork();

    });

} else {

    var db = new nodem.Gtm();
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
        } else if (req.path.match(/schema/)) {
            req.url = "/fmSchema.html";
            console.log("Redirected /schema to %s", req.url);
        } else if (req.path.match(/query/)) {
            req.url = "/fmQuery.html";
            console.log("Redirected /query to %s", req.url);
        }
        next();
    });

    // First try FMQL
    app.get("/fmqlEP", function(request, response) {

        // Enforce ?fmql="SOME QUERY" (rem: query arguments don't get routes of their own in Express)
        if (!(("fmql" in request.query) && (request.query.fmql !== ""))) {
            response.status(404).json({
                "error": "No FMQL Query Specified"
            });
            console.log("404'ing: %s", request.url);
            return;
        }

        // {"query": "DESCRIBE 2-9"}
        var query = request.query.fmql;

        var data = {
            query: query
        };
        console.log(data);    
        //create a new job and push to queue
        var job = jobs.create(jobType, data).save(function(err) {
            if (err) {
                console.log('jobs.create', err);
            } else {
                console.log('jobs.create from worker %d, process %d', cluster.worker.id, process.pid);
            }
        });
        job.on('complete', function(result) {
            // could use response.json but will be changing to jsonld so making explicit
            console.log('result:', result);      
            response.type('application/json');
            response.send(result);
        });
    });

    //process job from queue
    jobs.process(jobType, numParallel, function(job, done) {
        var query = job.data.query;
        console.log("Worker %s: invoking FMQL %s", cluster.worker.id, query);
        var jsont = fmql.query(db, query, false); // ask for text to preserve order 
        console.log("Response (100): %s\n\n", jsont.substring(0, 99));
        setTimeout(function() {
            done('', jsont);
        }, jobDelay);
    });

    // Not FMQL - try static - Express 4 respects order
    app.use(express.static("../static")); //use static files in ROOT/public folder

    var server = app.listen(port, function() {
        console.log("FMQL worker %d, process %d, listening to port ", cluster.worker.id, process.pid, port);
    });

}
