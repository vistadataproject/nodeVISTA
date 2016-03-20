var express = require('express');
var bodyParser = require('body-parser');
var qoper8 = require('ewd-qoper8');
var qx = require('ewd-qoper8-express');
var cluster = require('cluster');


function workAround(worker) {
    var listeners = null;

    listeners = worker.process.listeners('exit')[0];
    var exit = listeners[Object.keys(listeners)[0]];

    listeners = worker.process.listeners('disconnect')[0];
    var disconnect = listeners[Object.keys(listeners)[0]];

    worker.process.removeListener('exit', exit);
    worker.process.once('exit', function(exitCode, signalCode) {
        if (worker.state != 'disconnected')
            disconnect();
        exit(exitCode, signalCode);
    });
}

/* 
 * Typical 'cluster' setup
 */
if (cluster.isMaster) {

    var numCPUs = require('os').cpus().length;
    console.log('cpus: ' + numCPUs);
    // Create a worker for each CPU
    for (var i = 0; i < numCPUs; i += 1) {
        var newWorker = cluster.fork();
        workAround(newWorker);

    }

    console.log("Master process %d (kill -9 this) with %d CPUs to play with", process.pid, numCPUs);

    // Listen for dying workers
    cluster.on('exit', function(worker, code, signal) {

        // If forced, don't restart - uncaughtException forces with kill()
        if (worker.suicide === true)
            return;

        // Replace the dead worker, we're not sentimental
        console.log('Worker %d died :( - starting a new one', worker.id);
        console.log('==== died with code ' + code);
        console.log('==== died with signal ' + signal);
        var newWorker2 = cluster.fork();
        workAround(newWorker2);

    });

    // workAround(cluster.worker);

} else {
    process.on('uncaughtException', function(err) {
        // db.close();
        console.trace('Uncaught Exception - exiting worker');
        console.error(err.stack);
        // exit(1) - Uncaught Fatal Exception
        cluster.worker.kill();
    });

    var app = express();
    app.use(bodyParser.json());

    var q = new qoper8.masterProcess();
    qx.addTo(q);

    app.get('/fmqlEP', function(req, res) {
        qx.handleMessage(req, res);
    });

    q.on('started', function() {
        this.worker.module = '/home/vdp/fmql/ewd/workerModule';
        var server = app.listen(9000);
    });

    q.start();
}