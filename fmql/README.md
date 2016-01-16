## Adding an FMQL web service to nodeVISTA

Add a new port forward instruction to osehraVISTA's VagrantFile (Scripts/Install/Ubuntu) ...

```text
  config.vm.network :forwarded_port, guest: 8081, host: 8081 # EWD VistA Term
  # New Forward VDP
  config.vm.network :forwarded_port, guest: 9000, host: 9000 # For FMQL Server
```

and reload Vagrant with _vagrant reload_. 

Then _vagrant ssh_ into the VM and ... 

```text
>> su vdp
password: vistaisdata
>> mkdir ~/fmql
>> cd fmql
>> git clone https://github.com/caregraf/FMQL.git
>> mv FMQL/HTML static
>> mv FMQL/webservice/fmqlServer.js .
>> mv FMQL/webservice/package.json
>> rm -r FMQL
>> npm install <--- installs dependencies
```

and finally bring up the _fmqlServer_ ...

```text
>> nohup node fmqlServer.js >> SEESERVER &
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


