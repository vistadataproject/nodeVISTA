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
>> 

```

We will __add to this Vagrant setup__ in VDP. Let's add a _vdp_ user so we have a place to assemble working code ...

```text
>> sudo adduser vdp
>> sudo chmod a+w /home/vdp <------ crude: will move over to this user properly later
>> cd /home/vdp
```

git is already enabled on Vagrant Ubuntu so we can 

```text
>> cd /home/vdp
>> git clone https://github.com/vdp/vistaref.git
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
