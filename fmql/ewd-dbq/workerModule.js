module.exports = function() {

  this.on('dbOpened', function(status) {
    console.log('GT.M was opened by worker ' + process.pid + ': status = ' + JSON.stringify(status));
  });

  this.on('start', function(isFirst) {
    var connectGTMTo = require('ewd-qoper8-gtm');
    var env = {
        gtmdir: '/opt/lsb-gtm/V6.2-000_x86_64'
    };
    connectGTMTo(this, env);

    if (isFirst) {
      var log = new this.documentStore.DocumentNode('ewdTestLog');
      log.delete();
    }
  });

  this.on('message', function(messageObj, send, finished) {
    
    var results = {
      youSent: messageObj,
      workerSent: 'hello from worker ' + process.pid,
      time: new Date().toString()
    };
    // var log = new this.documentStore.DocumentNode('ewdTestLog');
    // var ix = log.increment();
    // log.$(ix).setDocument(results);
    finished(results);
  });

  this.on('stop', function() {
    console.log('Connection to GT.M closed');
  });
  
};