# osehraVISTA 

The following outlines how to install osehraVISTA and enable nodeVISTA development.

[OSEHRA's Vagrant VistA setup instructions](https://github.com/OSEHRA/VistA/blob/master/Documentation/Install/Vagrant.rst) are very clear.

Highlights beyond installing Vagrant, VirtualBox and Git ...

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

We will add to the osehraVISTA VM in VDP. Let's go into the VM and add a _vdp_ development user ...

```text
>> vagrant ssh <-------- go into the VM
>> sudo adduser vdp
Adding user `vdp' ...
...
Enter new UNIX password: vistaisdata <------- our message is our password!
...
>> cd /home/vdp
>> cp -r /vagrant/nodemExamples . <------- we put _nodemExamples_ in the synchronized directory on our host machine
>> cd nodemExamples
```

_nodemExamples_? We copied _nodemExamples_ into _VistA/Scripts/Install_ which OSEHRA's VAGRANT sets up to be a synchonized directory, accessible from _/vagrant_ inside the VM.

Now let's setup user _vdp_ so it can run the node used by _osehraVISTA_ ...

```text
>> source /home/osehra/.nvm/nvm.sh <------ OSEHRA uses the _node version manager_
>> nvm use 0.12 <------ this is the version it wants (the only one it installs!)
>> source /home/osehra/etc/env <------ sets up variables ???
>> npm install --quiet nodem >> nodemInstall.log <------ installs nodem in node_modules
>> ls node_modules
drwxrwxr-x 7 vdp vdp 4096 Jan 12 04:24 nodem
```

Note that the first two lines are in user _osehra_'s _.profile_. (__TODO:__ move appropriate setups into .profile of vdp). 

Now let's run some basic clients ...

```text
>> node basic.js 
Basic nodem calls ...
	db.open returns: {"ok":1,"result":"1"}
	...
>> node vistaFunctions.js
...
```

