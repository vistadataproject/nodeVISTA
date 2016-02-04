## Adding an FMQL web service to nodeVISTA

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


