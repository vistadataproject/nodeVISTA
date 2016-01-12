# osehraVISTA 

The following outlines how to install osehraVISTA, view its EWD applications and add FMQL to it.

## Installing and Basic Use

### 1. Install OSEHRA's VistA using Vagrant

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

We will add to the osehraVISTA VM in VDP. Let's go into the VM and add a _vdp_ user so we have a place to assemble working code ...

```text
>> vagrant ssh <-------- got into the VM
>> sudo adduser vdp
Adding user `vdp' ...
...
Enter new UNIX password: vistaisdata <------- our message is our password!
...
>> cd /home/vdp
>> cp -r /vagrant/nodemExamples <------- we put _nodemExamples_ in the synchronized directory on our host machine
>> cd nodemExamples
```

Note: _nodemExamples_ should be copied into osehraVISTA/VistA/Scripts/Install which OSEHRA's VAGRANT sets up to be a synchonized directory, accessible from _/vagrant_ inside the VM.

Now let's setup user _vdp_ so it can run the same node as _osehraVISTA_ and access the system using _nodem_ ...

```text
>> source /home/osehra/.nvm/nvm.sh <------ OSEHRA uses the _node version manager_
>> nvm use 0.12 <------ this is the version it wants (the only one it installs!)
>> source /home/osehra/etc/env <------ sets up variables ???
>> npm install --quiet nodem >> nodemInstall.log <------ installs nodem in node_modules
>> ls node_modules
drwxrwxr-x 7 vdp vdp 4096 Jan 12 04:24 nodem
```

Note that the first two lines are in user _osehra_'s .profile. (We will move appropriate setups into .profile of vdp). 

Now let's run some basic clients ...

```text
>> node basic.js 
Basic nodem calls ...
	db.open returns: {"ok":1,"result":"1"}
	...
>> node vistaFunctions.js
...
```

### 2. See the basic node.js hosted Applications

Vagrant forwards ports 8080, 8000, 8001 that serve up three simple "EWD" (a node module) applications that access VistA using node.js.

```text
  config.vm.network :forwarded_port, guest: 8080, host: 8080 # EWD.js
  config.vm.network :forwarded_port, guest: 8000, host: 8000 # EWD.js Webservices
  config.vm.network :forwarded_port, guest: 8081, host: 8081 # EWD VistA Term
```

_osehraVISTA embeds _EWD_. To see it, in your browser go to _https://localhost:8080/ewd/VistADemo/index.html_ to see ...

![EWD Open Screen](/osehraVISTA/imgs/ewdOpenScreen.png)

The access code is _fakedoc1_, the verify code is _1Doc!@#$_. This is a basic framework for a _backbone_ application served up by node.js over VistA.

Other application - https://localhost:8080/ewd/ewdMonitor/index.html - password is _keepThisSecret!_.

![EWD Monitor](/osehraVISTA/imgs/ewdMonitor.png)

### 3. Add FMQL 

Using the _vdp_ user, follow the [FMQL Install in Vagrant Instructions](https://github.com/caregraf/FMQL/wiki/Add-FMQL-to-OSEHRA-Vagrant-VistA)

Note:
  * extra step not in there: after doing _git clone_ of this repository into your Vagrant Ubuntu, copy an updated (osehraVISTA has its own encoding string) _brokerRPC.py_ into _/usr/local/fmql_ and restart Apache. 
  * this will be replaced by node-based access

![FMQL from host machine](/osehraVISTA/imgs/FMQLRamblerToVagrant8082.png)
