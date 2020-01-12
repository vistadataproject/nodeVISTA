# Docker for nodeVISTA

Contents:
* [Pull and Run the Docker Container](#pull-and-run-the-docker-container)
* [Connecting Clients](#connecting-clients)
* [Publishing Image](#publishing-image)
* [Ending it all](#ending-it-all)
* [Optional: Building the Image and Starting the Container](#optional-building-the-image-and-starting-the-container)
* [QA of nodeVISTA inside Docker](#qa-of-nodevista-inside-docker)
* [Background on Docker](#background-on-docker)
* [More to Investigate and Work](#more-to-investigate-and-work)


__Note__: This docker replaces nodeVISTA's _vagrantFile_ installation and configuration process.  Docker for nodeVISTA is in a subdirectory of the nodeVISTA git (and not in the VAM Docker git) as this Docker is largely a launcher for the dynamic building of an image as opposed to the executable assembly you find for _vicsServer_ or _Router_.


## Pull and Run the Docker Container

> docker pull vistadataproject/nodevista999:latest

and then run a container ...

> docker run -p 9330:9430 -p 32:22 -p 9100:9000 -p 9331:8001 -d -P --name nodevista999 vistadataproject/nodevista999:latest

if the container has previously been started, then restart:

> docker restart nodevista999

Confirm docker container is running

> docker ps

Optional: Access command line interface of Docker container

> docker exec -it nodevista999 bash

## Connecting Clients

### Web Clients
* To browse the native Vista Data Model: http://localhost:9100/schema
* To query the native Vista database:  http://localhost:9100/query
* To access the _Rambler_ and Clinical Services REST: http://localhost:9030


### Thick Clients
The main thick client of VISTA is a Windows application called the Computerized Patient Record System (CPRS).  The windows installer for CPRS is [here](https://www.osehra.org/content/install-vistarpms-clients).

To run CPRS on a Macintosh or Linux machine, one requires a Windows virtual machine. To create a Windows virtual machine, first download and install [Virtualbox](https://www.virtualbox.org), then download and install the Windows operating system from the Windows 10 disk image [here](https://www.microsoft.com/en-us/software-download/windows10ISO). Finally, download and install CPRS installer within the virtualized Windows environment.  

To configure the connection between the CPRS client and nodeVISTA server:

__In Virtualbox:__ 

Set networking to 'Bridged

__On the Mac host:__ 

Obtain the __docker IP address__ of nodeVISTA
> sudo docker inspect -f "{{ .NetworkSettings.IPAddress }}" nodevista999

__In the Windows VM:__ 

Confirm the Windows environment can reach the NodeVistA docker environment
> ping -r 5 *__dockerIPaddress__*

Right-click on the CPRS icon and open its "Properties". In the "Shortcut" tab, paste the following in the "Target" field, with the correct *dockerIPaddress*:
> "C:\Program Files (x86)\VistA\CPRS\CPRSChart.ext" CCOW=diable s=*__dockerIPaddress__* p=9330 showrpcs

Double-click on the CPRS icon to open it and login.  



## Publishing Image 

to vistadataproject in Docker ...

```text
> docker tag nodevista999 vistadataproject/nodevista999:b2
> docker login 
...
> docker push vistadataproject/nodevista999:b2
```

## Ending it all

Stop the container and prune it (and other stopped containers)

```text
> docker container list 
     CONTAINER ID        IMAGE ...
     9db4b8e4380f        nodevista999 ...

> docker stop nodevista999   
> docker container prune
     ... y
```

List and remove image:
```text
> docker image list
     REPOSITORY                    TAG ...
     nodevista999                  latest ...

> docker image rm nodevista999
     ...
```



## Optional: Building the Image and Starting the Container

The following describes how to build a nodeVISTA image and run it in a docker container on your Mac. It assumes that you have installed _Docker for Mac_ available from [docker.com](https://docs.docker.com/docker-for-mac/install/).  __BUT MOST PEOPLE WILL NEVER BUILD THE IMAGE__. They will [pull from the Docker Registry](#pull-and-run-the-docker-container)


__Note__: the docker and basic scripts here are based on the OSEHRA Docker git, [github.com/OSEHRA/docker-vista](https://github.com/OSEHRA/docker-vista) which has both a wider (targets VISTA's beyond FOIA) and narrower (lack of node-based configuration) scope.

In this directory ...

> docker build --no-cache -t nodevista999 .



__Notes__: 
  * the centos (linux) used is centos:latest which will be old if cached in your images already. To use the latest _centos_, do a docker pull centos:latest before building. 
  * see below for how to publish to Docker Hub

When it finishes (takes a while), launch the container when the image is built/found ...

> docker run -p 9330:9430 -p 9100:9000 -p 9331:8001 -d -P --name nodevista999 nodevista999 

which has the CPRS/RPC Broker port, 9430, at 9330, FMQL at 9100, _vistalink_, 8001, at 9331.

and you can login to the container with ...

> docker exec -it -e COLUMNS=$COLUMNS -e LINES=$LINES -e TERM=$TERM --privileged nodevista999 bash

__Note__: _docker run_ with _-v_ (named volume) for _home/nodevista/g_ should persist the database across docker runs.

Extra - building dependent image _nodevista999cs_ that also runs __VAM Clinical Services__ ...

> docker build --no-cache -f DockerfileCS -t nodevista999cs .

and run with the following so that the _clinicalServices REST_ is available ...

> docker run -p 9330:9430 -p 32:22 -p 9100:9000 -p 9030:9030 -d -P --name nodevista999cs nodevista999cs




## QA of nodeVISTA inside Docker

ssh in and go into nodevista with _mumps -dir_. Then ...

Check taskman ...

```text
NODEVISTA> D ^ZTMCHK

Checking Task Manager's Environment.

Checking Taskman's globals...
     ^%ZTSCH is defined!
     ^%ZTSK is defined!
     ^%ZTSK(-1) is defined!
     ^%ZIS(14.5,0) is defined!
     ^%ZIS(14.6,0) is defined!
     ^%ZIS(14.7,0) is defined!

Checking the ^%ZOSF nodes required by Taskman...
     All ^%ZOSF nodes required by Taskman are defined!

Checking the links to the required volume sets...
     There are no volume sets whose links are required!

Checks completed...Taskman's environment is okay!

Press RETURN to continue or '^' to exit: 

Here is the information that Taskman is using:
     Operating System:  GT.M (Unix)
     Volume Set:  ROU
     Cpu-volume Pair:  ROU:gtm_sysid
     TaskMan Files UCI and Volume Set:  VAH,ROU

     Log Tasks?  
     Submanager Retention Time: 0
     Min Submanager Count: 0
     Taskman Hang Between New Jobs: 0
     TaskMan running as a type: GENERAL

     Logons Inhibited?:  N
     Taskman Job Limit:  24
     Max sign-ons: 30
     Current number of active jobs: 6
```

Check broker ...

```text
NODEVISTA>D ^XWBTCPMT

Interactive Broker Test
IP ADDRESS: 127.0.0.1
PORT: 9430
Success, response: accept
```

## Background on Docker

> Docker uses resource isolation features of the Linux kernel such as cgroups and kernel namespaces to allow independent "containers" to run within a single Linux instance, avoiding the overhead of starting virtual machines. ... “LXC” refers to capabilities of the Linux kernel (specifically namespaces and control groups) which allow sandboxing processes from one another, and controlling their resource allocations.

to OS X ...

> OS X client uses Apple's builtin hypervisor framework – yeah, Apple quietly embedded a hypervisor API in its desktop operating system. Previously, you had to use Docker with Oracle's VirtualBox.
                         
[This account](https://blog.docker.com/2016/05/docker-unikernels-open-source/) goes into details on the OS X setup.

## More to Investigate and Work 

  * Split OUT FMQL Server (not FMQL as utility under MVDM) to own Container; FMQL included as node module along with M installs in it
  * see bug issues in this GIT
  * do more on host machine vs VM host - [see post on windows route settings](https://forums.docker.com/t/how-to-access-docker-container-from-another-machine-on-local-network/4737/13) and more on the official [docker networking](https://docs.docker.com/config/containers/container-networking/) and using [bridge networking](https://docs.docker.com/network/bridge/#use-ipv6) and [four ways to connect](http://blog.oddbit.com/2014/08/11/four-ways-to-connect-a-docker/)
  * [Parallels as host for Docker on OS X](https://zitseng.com/archives/10861) - only if this provides advantage for CPRS in Windows in Parallels
