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

The stress test oftentimes gets failed around 9000 out of the 10000 requests even for the successful URL in kued server version and even in NON KUED server version as well. 
This is due to the old node version (v.0.12) that may cause the resource leak issue. 
There is a workaround to alleviate the leak, otherwise, we need to upgrade to latest node 5.x to fix the issue:

```text
AssertionError: Resource leak detected.
  at removeWorker (cluster.js:346:9)
  at ChildProcess.<anonymous> (cluster.js:366:34)
  at ChildProcess.g (events.js:199:16)
  at ChildProcess.emit (events.js:110:17)
  at Process.ChildProcess._handle.onexit (child_process.js:1074:12)
  
````
There is a workaround function implemented in the kued server code
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
  
```
Even with the workaround, sometimes the work may die due to unknown reason, this is an [unsolved issue] (https://github.com/vistadataproject/nodeVISTA/issues/33):
```text
Worker 2 died :( - starting a new one
```
