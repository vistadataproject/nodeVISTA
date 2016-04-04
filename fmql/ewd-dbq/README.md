## Adding EWD (in memory) to the FMQL server
https://github.com/vistadataproject/nodeVISTA/blob/master/fmql/ewd/nonClusterApp.js
https://github.com/vistadataproject/nodeVISTA/blob/master/fmql/ewd/workerModule.js
````text
npm install  
## "ewd-qoper8-express": "3.0.0" required in package.json
````

## Adding EWD (GTM database) to the FMQL server
https://github.com/vistadataproject/nodeVISTA/blob/master/fmql/fmqlServer-ewd-dbq.js
https://github.com/vistadataproject/nodeVISTA/blob/master/fmql/fmqlWorker-ewdq.js
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
