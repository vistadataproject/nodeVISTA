## FMQL web service with queueing service

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

(optional)redis server has the snapshot auto-save enabled and we will change the path for the autosave to a temp location (so that we don't get the error like the following due to the auto-save operation)
```text
Error: MISCONF Redis is configured to save RDB snapshots, but is currently not able to persist on disk. Commands that may modify the data set are disabled. Please check Redis logs for details about the error.
```

```text
vdp@vagrant-ubuntu-precise-64:~$ mkdir redistmp
vdp@vagrant-ubuntu-precise-64:~/fmql$ redis-cli
127.0.0.1:6379> config set dir /home/vdp/redistmp
OK
127.0.0.1:6379> config set dbfilename tmp.rdb
OK
127.0.0.1:6379> exit
```

and try a stress test with http-perf

```text
npm install -g http-perf
nperf -c 200 -n 10000 http://localhost:9000/fmqlEP?fmql=DESCRIBE%202-1 //send 10000 requests with 200 concurrent requests > succeed
nperf -c 200 -n 10000 http://localhost:9000/schema //failed after overolading around 6555 of the 10000 requests due to no kue
```


