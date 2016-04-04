## Adding an FMQL web service to nodeVISTA
code: https://github.com/vistadataproject/nodeVISTA/blob/master/fmql/fmqlServer.js

_vagrant ssh_ into the VM and if you haven't already, perform an _npm install_: 

```text
$ su vdp
password: vistaisdata
$ cd /home/vdp/fmql
$ npm install <--- installs dependencies
```

and bring up the _fmqlServer_ ...

```text
$ nohup node fmqlServer.js >> SEESERVERRUN &
```

and try a query ...

```text
$ curl http://localhost:9000/fmqlEP?fmql=DESCRIBE%202-1

{"results" ...
```

You can now exit the VM (exit/exit) and in the host system's browser, use FMQL and its clients to view
all the data and schema of the osehraVISTA system. 

## Some one page client screens

FMQL comes with three one page clients, _Rambler_ for viewing data, _Schema_ for viewing a VISTA's schema and _Query_ for invoking FMQL queries directly.

__List of populated files in the system and their sizes__ ...

![Schema Opener](/fmql/images/schema.png?raw=true)

__One Patient's 'Patient Record'__ ...

![Rambler Patient](/fmql/images/ramblerPatient.png?raw=true)

__Invoking a query directly__ ...

![Query Patient](/fmql/images/queryPatient.png?raw=true)

We are going to add queue service to the FMQL server. There are three different approaches to do this:

1. using Kue 
2. using EWD in memory queue   
3. using EWD DBQ with GT.M database  

## Stress Test Results

|EWD in Database<br>(non-cluster) |EWD in memory Queue|KUE with Redis Queue
|-------------------------|--------------------------------|-------------------------------|
||command: nperf -c 200 -n 1000 http://localhost:9000/fmqlEP?fmql=DESCRIBE%202-1 <br> { statuses: { '200': 1000 },<br>  min: 386,<br>  max: 4050,<br>  avg: 2645.90,<br>  count: 1000,<br>  rate: 68.88,<br>  start: 1458539944777,<br>  total_time: 14519ms }|command: nperf -c 200 -n 1000 http://localhost:9000/fmqlEP?fmql=DESCRIBE%202-1<br>{ statuses: { '200': 1000 },<br>  min: 142,<br>  max: 2355,<br>  avg: 1187.65,<br>  count: 1000,<br>  rate: 154.54,<br>  start: 1458540820125,<br>  total_time: 6471ms }
|command: <br>nperf -c 200 -n 5000 http://localhost:9000/fmqlEP?fmql=DESCRIBE%202-1<br> { statuses: { '200': 5000 },<br>  min: 132,<br>  max: 4060,<br>  avg: 2827.94,<br>  count: 5000,<br>  rate:69.41,<br>  start: 1458970680772,<br>  total_time: 72040ms }|command: nperf -c 200 -n 3000 http://localhost:9000/fmqlEP?fmql=DESCRIBE%202-1 <br>failed. socket hang up<br>processed the first 1600 only.| command: nperf -c 200 -n 3000 http://localhost:9000/fmqlEP?fmql=DESCRIBE%202-1<br>  { statuses: { '0': 1006, '200': 1994 },<br>  min: 97,<br>  max: 44021,<br>  avg: 4842.39,<br>  count: 3000,<br>  rate: 37.09,<br>  start: 1458540867355,<br>  total_time: 80895ms }|

It seems to be the best so far ... it seems to be more stable than kue with Redis. It can handle all of the 5000 requests with 69.41 request/second. The Kue with Redis can't handle all of 5000 requests correctly. Kue only handles 4000 out of 5000 successfully.

Caveat: our virtual box is not a real cluster environment so these tests do not tell us the performance difference in the real cluster server.
