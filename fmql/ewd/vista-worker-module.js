// ewd-qoper8 Worker Module example which implements VistA RPC access on a Cache system


module.exports = function() {

  // load standard qoper8-express formatted message handlers:

  var handleExpressMessage = require('ewd-qoper8-express').workerMessage;

  // load VistA RPC-specific handlers

  var vistaRPC = require('ewd-qoper8-vistarpc');

  this.on('start', function(isFirst) {

    // set up standard VistA RPC message handlers (initiate, login and authentication)
    vistaRPC.httpHandlers.call(this);

    // handler to catch all other vista.* requests

    this.on('VistAMessage', function(messageObj, session, send, finished) {
      console.log('*** VistAMessage: ' + session.id);
      finished({error: 'No handler defined for VistA messages of type ' + messageObj.expressType});
    });

    var connectGTMTo = require('ewd-qoper8-gtm');
        var env = {
            // gtmdir: '/opt/lsb-gtm/V6.2-000_x86_64',
            gtmdir: '/home/osehra/lib/gtm',
            gtmdist: '/home/osehra/lib/gtm',
            gtmver: 'V6.2-000_x86_64',
            gtmgbldir: '/home/osehra/g/osehra.gld',
            gtmroutines: '/home/osehra/p/V6.2-000_x86_64*(/home/osehra/p) /home/osehra/s/V6.2-000_x86_64*(/home/osehra/s) /home/osehra/r/V6.2-000_x86_64*(/home/osehra/r) /home/osehra/lib/gtm/libgtmutil.so /home/osehra/lib/gtm /home/osehra/ewdjs/node_modules/nodem/src',
            GTMCI: '/home/osehra/ewdjs/node_modules/nodem/resources/nodem.ci',
            namespace: 'VISTA'
        };
    connectGTMTo(this, env);

  });

  this.on('message', function(messageObj, send, finished) {
    var expressMessage = handleExpressMessage.call(this, messageObj, send, finished);
  });

};
