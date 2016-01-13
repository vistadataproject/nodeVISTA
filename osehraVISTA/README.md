# osehraVISTA to nodeVISTA

The following outlines how to install osehraVISTA and enable nodeVISTA development.

[OSEHRA's Vagrant VistA setup instructions](https://github.com/OSEHRA/VistA/blob/master/Documentation/Install/Vagrant.rst) are very clear. Once you have Vagrant and VirtualBox and Git setup, you ...

```text
>> git clone https://github.com/OSEHRA/VistA.git
>> cd VistA/Scripts/Install/Ubuntu
>> vagrant up
Bringing machine 'OSEHRA VistA - Ubuntu' up with 'virtualbox' provider...
[OSEHRA VistA - Ubuntu] Box 'Official Ubuntu 12.04 current daily Cloud Image amd64' was not found. Fetching box from specified URL for
the provider 'virtualbox'. Note that if the URL does not have
... lot's of stuff that's takes 20+ minutes

```

We will add to the osehraVISTA VM in VDP. Let's go into the VM and add a _vdp_ development user and become that user ...

```text
>> vagrant ssh <-------- go into the VM
>> sudo adduser vdp
Adding user `vdp' ...
...
Enter new UNIX password: vistaisdata <------- our message is our password!
...
>> sudo usermod -a -G sudo,osehra vdp <-------- like user osehra, add vdp to osehra group
>> cd /home/vdp
>> su vdp
password: vistaisdata
```

Now let's make sure VDP user can run OSEHRA VISTA's version of node and use _nodem_ ...

```text
>> source /home/osehra/.nvm/nvm.sh <------ OSEHRA uses "Node Version Manager"
>> nvm use 0.12 <------ this is the version it wants (the only one it installs!)
>> source /home/osehra/etc/env <------ sets up environment variables
>> export gtm_tmp=/tmp <------ avoid permission issues/linking problems for vdp user
```

Note: we will move the settings above into vdp user's _.profile_ and _.bashrc_ so they mirror those of user _osehra_.

We need to make the module _nodem_ available to _node_ in order to run _nodemExamples_ and _commands_ ...

```text
>> npm install --quiet nodem >> nodemInstall.log <------ installs nodem in node_modules
>> ls node_modules
drwxrwxr-x 7 vdp vdp 4096 Jan 12 04:24 nodem
```

Now we need a copy of _nodemExamples_ in the VM. OSEHRA's Vagrant synchronizes the host directory _VistA/Scripts/Install_  with _/vagrant_ in the VM. On the host, copy _nodemExamples_ into that synchronized directory and in the VM ...

```text
>> cp -r /vagrant/nodemExamples . <------- we put _nodemExamples_ in the synchronized directory on our host machine
>> cd nodemExamples
```

Now let's run some basic clients ...

```text
>> node basic.js 
Basic nodem calls ...
	db.open returns: {"ok":1,"result":"1"}
	...
>> node patterns.js
...
```

Let's add FMQL in a "quick and dirty way" ...

```text
>> cd /tmp
>> git clone https://github.com/caregraf/FMQL.git
>> cd FMQL/MUMPS
>> cp *.m /home/osehra/p
>> sudo chown osehra:osehra /home/osehra/p/FMQL*
>> cd
>> rm -r /tmp/FMQL
```

__Note:__ normally you load FMQL using KIDS. The KIDS has more than MUMPS code - it has a key used for providing secure RPC based access. But ala the MUMPS installed by the EWD installer used in the _osehraVISTA_ build, here we ignore security keys and just add MUMPS directly to the GT/M based system. This suffices for now as we're just developing and calling all routines directly without any Broker based security.

And to see FMQL ...

```text
>> node fmql.js
Return from FMQL: {"ok":1,"function":"QUERY^FMQLQP","result":"^TMP(29852,\"FMQLJSON\")","arguments":["DESCRIBE 2-1"]}
{ results: 
   [ { name: 
        { fmId: '.01',
          fmType: '4',
          value: 'CARTER,DAVID JR',
          type: 'literal' },
```

