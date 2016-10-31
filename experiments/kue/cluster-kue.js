// cluster-queue.js

var kue     = require('kue');
var cluster = require('cluster');

var numWorkers  = process.argv[2];
var numParallel = process.argv[3];
var jobDelay    = process.argv[4];
var numJobs     = process.argv[5];

if (process.argv.length !== 6) {
  console.log('Usage: node cluster-work-queue <numWorkers> <numParallel> <jobDelay> <numJobs>');
  process.exit(1);
}

var jobs = kue.createQueue();

var jobType = 'someTask';

if (cluster.isMaster) {
  for (var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }
  for (var j = 0; j < numJobs; j++) {
    (function(count) {
      var data = { count: count };
      jobs.create(jobType, data).save(function(err) {
        if (err) {
          console.log('jobs.create', err);
        } else {
          console.log('master', 'jobs.create', count);
        }
      });
    })(j);
  }
} else {
  jobs.process(jobType, numParallel, function(job, done){
    console.log('worker', cluster.worker.id, 'jobs.process', job.data);
    setTimeout(function() { done(); }, jobDelay);
  });
}

