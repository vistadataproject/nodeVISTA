# osehraVISTA to nodeVISTA

The following outlines how to install osehraVISTA and enable nodeVISTA development.

[OSEHRA's Vagrant VistA setup instructions](https://github.com/OSEHRA/VistA/blob/master/Documentation/Install/Vagrant.rst) are very clear. Once you have Vagrant and VirtualBox and Git setup, you git clone ...

```text
>> git clone https://github.com/OSEHRA/VistA.git
```

and copy the script _installVDP.sh_ inside ...

```text
>> cp installVDP.sh VistA/Scripts/Install/.
```

Note: this is a temporary step. We intend to have this script run at the end of OSEHRA's VISTA build.

Then install _osehraVISTA_ ...

```text
>> cd VistA/Scripts/Install/Ubuntu
>> vagrant up
Bringing machine 'OSEHRA VistA - Ubuntu' up with 'virtualbox' provider...
[OSEHRA VistA - Ubuntu] Box 'Official Ubuntu 12.04 current daily Cloud Image amd64' was not found. Fetching box from specified URL for
the provider 'virtualbox'. Note that if the URL does not have
... lot's of stuff that's takes 20+ minutes
```

Now let's go inside and add _VDP Development_ to the VM ...

```text
>> vagrant ssh <------ go into the VM
>> cp /vagrant/installVDP.sh .
>> sudo ./installVDP.sh
...
```

Switch to become _vdp_ user and run some basic clients ...

```text
>> su vdp
password: vistaisdata
>> cd
>> cd nodemExamples
>> node basic.js 
Basic nodem calls ...
	db.open returns: {"ok":1,"result":"1"}
	...
>> node patterns.js
...
>> node fmql.js
Return from FMQL: {"ok":1,"function":"QUERY^FMQLQP","result":"^TMP(29852,\"FMQLJSON\")","arguments":["DESCRIBE 2-1"]}
{ results: 
   [ { name: 
        { fmId: '.01',
          fmType: '4',
          value: 'CARTER,DAVID JR',
          type: 'literal' },
```

FMQL also runs as a service. See [fmql](/fmql) on how to setup the _fmqlServer.js_ for remote access to FMQL and its applications.

Note: to temporarily suspend the VM, just call _vagrant halt_.
