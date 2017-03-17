'use strict';

const NodeVISTAManager = require('./nodeVISTAManager');

console.log(`Initializing NodeVISTAManager as a separate process: PID=${process.pid}`);
NodeVISTAManager.init();
