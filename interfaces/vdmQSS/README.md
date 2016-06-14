## Deliverable #33

> Prototype a web user interface to FileMan to make FileMan more usable and accessible. This shall demonstrate data query and review via web interface to FileMan and must use commodity, industry standard, vendor-agnostic, battle tested, secure TCP and HTTPS protocols, and vendor- agnostic JS framework.

Relies on the [VDM Read Prototype](https://github.com/vistadataproject/VDM/tree/master/prototypes/vdmRead) (Deliverable #25)


VDM Web Based Query interface and REST Server

## Adding VDM Web Based Query to nodeVISTA
code: https://github.com/vistadataproject/nodeVISTA/blob/master/interfaces/vdmQSS/simpleVdmQueryServer.js

_vagrant ssh_ into the VM and if you haven't already, perform an _npm install_: 

```text
$ su vdp
password: vistaisdata
$ cd /home/vdp/interfaces/
$ npm install <--- installs dependencies
```

and bring up the _fmqlServer_ ...

```text
$ nohup node vdmQSS/fmqlServer.js >> SEESERVERRUN &
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

![Schema Opener](/interfaces/images/schema.png?raw=true)

__One Patient's 'Patient Record'__ ...

![Rambler Patient](/interfaces/images/ramblerPatient.png?raw=true)

__Invoking a query directly__ ...

![Query Patient](/interfaces/images/queryPatient.png?raw=true)


Steps to execute the server  
1. login to the VISTA server and change path to the home directory of nodeVISTA  
2. under nodeVISTA and cd to interfaces / vdmQSS   
3. launch the server by executing node simpleVdmQueryServer.js  
4. Go to the link to test http://localhost:9000/vdmQuery.html?query=DESCRIBE%20120_82-1&format=HTML
