## Adding EWD (in memory) to the FMQL server
https://github.com/vistadataproject/nodeVISTA/blob/master/fmql/ewd/nonClusterApp.js
https://github.com/vistadataproject/nodeVISTA/blob/master/fmql/ewd/workerModule.js
````text
npm install  
## "ewd-qoper8-express": "3.0.0" required in package.json
````

## Adding EWD (GTM database) to the FMQL server
https://github.com/vistadataproject/nodeVISTA/blob/master/fmql/ewd/fmqlServer-ewd-dbq.js
https://github.com/vistadataproject/nodeVISTA/blob/master/fmql/ewd/fmqlWorker-ewdq.js
````text
npm intall
## "ewd-qoper8-gtm": "latest",
## "ewd-qoper8-dbq": "1.0.0"  required in package.json
````

From Rob on Cluster/EWD
````text
 The master process adds incoming requests to a single queue 
(either in-memory or to a global that acts as a queue). The master process then checks to find the first
available worker and assigns the first member of the queue to that worker. When working with a 
database queue, the master sends a signal to the worker, and, on receipt, the worker pulls its assigned 
record from the database queue. All workers in the pool are fed from the one database queue.
````

## Adding EWD VistA RPC example calls to the FMQL server
https://github.com/vistadataproject/nodeVISTA/blob/master/fmql/ewd/ewd-vista-express.js
https://github.com/vistadataproject/nodeVISTA/blob/master/fmql/ewd/vista-worker-module.js

Steps have been conducted so far:
```text
1. added dependencies in package.json and ran 'npm install'
"ewd-qoper8-vistarpc": "latest"

2. added these two files into GT.M folder:
/home/osehra/p
ewdSymbolTable.m
ewdVistARPC.m

3. put GT.M specific configs to vista-worker-module.js
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

4. run the program by 'node ewd/ewd-vista-express'
```
However, when logged in with a valid user, an error occurred:

```
/home/vdp/fmql/node_modules/ewd-session/lib/proto/symbolTable.js:41
      return db.function(func, gloRef);
                        ^
SyntaxError: Need to supply a function property
    at SyntaxError (native)
    at Object.save (/home/vdp/fmql/node_modules/ewd-session/lib/proto/symbolTable.js:41:25)
    at login (/home/vdp/fmql/node_modules/ewd-qoper8-vistarpc/lib/proto/login.js:98:30)
    at null.<anonymous> (/home/vdp/fmql/node_modules/ewd-qoper8-vistarpc/lib/proto/httpHandlers.js:74:27)
    at emit (events.js:118:17)
    at workerMessage (/home/vdp/fmql/node_modules/ewd-qoper8-express/lib/express.js:101:17)
    at null.<anonymous> (/home/vdp/fmql/ewd/vista-worker-module.js:43:47)
    at emit (events.js:118:17)
    at messageHandler (/home/vdp/fmql/node_modules/ewd-qoper8/lib/worker/proto/messageHandler.js:86:17)
    at process.<anonymous> (/home/vdp/fmql/node_modules/ewd-qoper8/lib/worker/proto/init.js:52:20)
```
