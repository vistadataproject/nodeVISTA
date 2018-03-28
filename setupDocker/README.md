# Docker for nodeVISTA

This docker replaces nodeVISTA's _vagrantFile_ option.

__Note__: Docker for nodeVISTA is in a subdirectory of the nodeVISTA git and not in the VAM Docker git as this Docker is largely a launcher for the dynamic building of an image as opposed to the executable assembly you find for _vicsServer_ or _Router_.

## Building the Image and Starting the Container

__Note__: the docker and basic scripts here are based on the OSEHRA Docker git, [github.com/OSEHRA/docker-vista](https://github.com/OSEHRA/docker-vista) which has both a wider (targets VISTA's beyond FOIA) and narrower (lack of node-based configuration) scope.

In this directory ...

> docker build -t nodevista999 .

and launch the container when the image is built/found ...

> docker run -p 9330:9430 -p 32:22 -p 9030:9000 -d -P --name nodevista999 nodevista999 

which has the CPRS/RPC Broker port, 9430, at 9330, the SSH port at 32 and FMQL at 9030.

Note: you can login to the container with ssh (port 22 is open) using _ssh root@localhost -p 32_

## Connecting Clients

You can access the _Rambler_ from your browser at _http://localhost:9030_.

Docker on OS X is NOT native - it is running on an Oracle VirtualBox virtual machine and the _--network="host"_ setting refers to this virtual box and not the native IP. From the host mac, get its current IP address ...

```text
> ipconfig getifaddr en0
<ipaddress>
```

Then point CPRS to this IP Address and port _9330_. 

## Publishing Image 

to vistadataproject in Docker ...

```text
> docker tag nodevista999 vistadataproject/nodevista999:b2
> docker login 
...
> docker push vistadataproject/nodevista999:b2
```

## Ending it all

Stop the container, prune it (and other stopped containers) and remove the image.

```text
> docker container list 
CONTAINER ID        IMAGE ...
9db4b8e4380f    nodevista999 ...
...
> docker stop nodevista999   
> docker container prune
... y
> docker image list
REPOSITORY                    TAG ...
nodevista999                    latest ...
...
> docker image rm nodevista999
...
```

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
                         
## More to Investigate and Work 

  * Split OUT FMQL Server (not FMQL as utility under MVDM) to own Container; FMQL included as node module along with M installs in it
  * add ability to "empty" ... ie/ add in new service for emptying
  * do more on host machine vs VM host - [see post on windows route settings](https://forums.docker.com/t/how-to-access-docker-container-from-another-machine-on-local-network/4737/13) and more on the official [docker networking](https://docs.docker.com/config/containers/container-networking/) and using [bridge networking](https://docs.docker.com/network/bridge/#use-ipv6) and [four ways to connect](http://blog.oddbit.com/2014/08/11/four-ways-to-connect-a-docker/)
  * [Parallels as host for Docker on OS X](https://zitseng.com/archives/10861) - only if this provides advantage for CPRS in Windows in Parallels
