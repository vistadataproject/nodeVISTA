## FMQL web service with queuing  service

install the redis server required for kue: 

```text
sudo -i
# install tcl if you don't have it yet
apt-get install tcl8.5
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make
# optional test
make test 
make install
# start redis server
cd utils
./install_server.sh

service redis_6379 start
# service redis_6379 stop
exit 
```

(optional) redis server has the snapshot auto-save enabled and we will change the path for the autosave to a temp location (so that we don't get the error like the following due to the auto-save operation)
```text
Error: MISCONF Redis is configured to save RDB snapshots, but is currently not able to persist on disk. Commands that may modify the data set are disabled. Please check Redis logs for details about the error.
....
Can’t save in background: fork: Cannot allocate memory
```

```text
vdp@vagrant-ubuntu-precise-64:~$ mkdir redistmp
vdp@vagrant-ubuntu-precise-64:~/fmql$ redis-cli
# the following two command lines fix the ERROR: MISCONF Redis is configured to save RDB ....
127.0.0.1:6379> config set dir /home/vdp/redistmp
OK
127.0.0.1:6379> config set dbfilename tmp.rdb
OK
# the command line below fixes the Can's save in background error
127.0.0.1:6379> config set stop-writes-on-bgsave-error no
OK
127.0.0.1:6379> exit

# if the tmp.rdb gets too big, you may need to delete it and redo the "config set dbfilename tmp.rdb" comannd
```

and try a stress test with http-perf

```text
npm install -g http-perf
nperf -c 200 -n 10000 http://localhost:9000/fmqlEP?fmql=DESCRIBE%202-1 //send 10000 requests with 200 concurrent requests > succeed
nperf -c 200 -n 10000 http://localhost:9000/schema //failed after overloading around 6555 of the 10000 requests due to no kue
```

The stress test oftentimes gets failed around 9000 out of the 10000 requests even for the successful URL in kued server version and even in NON KUED server version as well. This is due to the old node version (v.0.12) that may cause the resource leak issue. 
A simple 'hello world' express app with cluster was also tested in the same environment (200 concurrent requests for a total 10,000 requests, Vagrant single CPU under VDP user) and the same error message "Resource leak detected" also appeared. Therefore it is concluded that the virtual box is not geared to handle heavy requests because of the limited memory and single CPU. 

```text
AssertionError: Resource leak detected.
  at removeWorker (cluster.js:346:9)
  at ChildProcess.<anonymous> (cluster.js:366:34)
  at ChildProcess.g (events.js:199:16)
  at ChildProcess.emit (events.js:110:17)
  at Process.ChildProcess._handle.onexit (child_process.js:1074:12)
  
````
Nevertheless, there is a workaround to alleviate the leak, otherwise, we need to upgrade to latest node 5.x to fix the issue:
This is a workaround function implemented in the kued server code:
```text
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
  
(source: https://github.com/nodejs/node-v0.x-archive/issues/9409)
```
Even with the workaround, sometimes the worker may die due to unknown reason, this is an [issue] (https://github.com/vistadataproject/nodeVISTA/issues/33):
```text
Worker 2 died :( - starting a new one
```
worker died with code 'SIGKILL', and no exception. It was assumed that the worker was killed by cluster in a normal way. The reason is probably that we run out of memory/CPU resources and cluster needs to kill/recycle it. This is not surprising since we are load testing it in very heavy batches.

With a lighter load test, it passed the load test with 200 concurrent requests of total 3000. And the QPS/rate is 177. That means it can handle 177 requests per second with the virtual box. If it's within a real cluster or bigger box, the QPS would be much better.
```text
{ statuses: { '200': 3000 },
  min: 91,
  max: 2584,
  avg: 1092.525333333334,
  count: 3000,
  rate: 177.43080198722498,
  start: 1457451781999,
  total_time: 16908 }
````

Similar result 175.81 for 8000 requests
````text
stats:
{ statuses: { '200': 8000 },
  min: 129,
  max: 1414,
  avg: 1123.7987499999933,
  count: 8000,
  rate: 175.81258378568447,
  start: 1457506696995,
  total_time: 45503 }````
