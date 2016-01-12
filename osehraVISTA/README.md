# osehraVISTA to nodeVISTA

The following outlines how to install osehraVISTA and enable nodeVISTA development.

[OSEHRA's Vagrant VistA setup instructions](https://github.com/OSEHRA/VistA/blob/master/Documentation/Install/Vagrant.rst) are very clear. The most important steps are ...

```text

>> vagrant plugin install vagrant-vbguest
...
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
>> sudo usermod -a -G sudo vdp <-------- like user osehra, add vdp to the sudo group
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

We need a copy of _nodemExamples_ in the VM. OSEHRA's Vagrant synchronizes the host directory _VistA/Scripts/Install_  with _/vagrant_ in the VM. On the host, copy _nodemExamples_ into that synchronized directory and in the VM ...

```text
>> cp -r /vagrant/nodemExamples . <------- we put _nodemExamples_ in the synchronized directory on our host machine
>> cd nodemExamples
```

We need to make the module _nodem_ available to _node_ in order to run _nodemExamples_ ...

```text
>> npm install --quiet nodem >> nodemInstall.log <------ installs nodem in node_modules
>> ls node_modules
drwxrwxr-x 7 vdp vdp 4096 Jan 12 04:24 nodem
```

Now let's run some basic clients ...

```text
>> node basic.js 
Basic nodem calls ...
	db.open returns: {"ok":1,"result":"1"}
	...
>> node readFunctions.js
...
```

