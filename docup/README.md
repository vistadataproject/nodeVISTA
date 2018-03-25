# From OSEHRA to nodeVISTA Container

__2 Stage One Outstanding__: 1. fix PM2 (right now still need to manually restart FMQL with _pm2 start fmqlServer.js and 2. need to test the final 'nodevista addition' script

Start with the git [docker-vista](https://github.com/OSEHRA/docker-vista) ...

> git clone https://github.com/OSEHRA/docker-vista

This has the software and docker file needed to create an image with OSEHRA VISTA on Cent OS. It sets up basic variables (ex/ basedir) and permissions to allow the following to work.

Build this image using Docker ...

> docker build -t osehrabase . 

Note:__ assumes you have installed docker. See how to install [docker for OS X](https://docs.docker.com/docker-for-mac/install/).

Start a container using the new image ...

> docker run -p 9530:9430 -p 8001:8001 -p 2222:22 -p 9500:9000 -d -P --name=osehrabasevista osehrabase  

This maps the image's CPRS 9430 port to 9530 (to avoid clashes with other images) and the usual FMQL port from 9000 to 9500. Note that FMQL hasn't been setup yet but this mapping means that the subsequent setup of FMQL can be tested. 

SSH into the container (to add the nodeVISTA additions ...)

> ssh root@localhost -p 2222
password: docker

## Adding the nodeVISTA additions

Copy in _addNodeVISTA.sh_ and execute it

## Save the enhanced image as a nodeVISTA

exit to the host and ...

> docker commit osehrabase vam/nodevistaDemo:b2a

and see the new image ...

```text
> docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
vam/nvdemo          b2a                 0a80a8dad466        4 minutes ago       10.9GB
```

Now stop (and destroy) the container with _docker stop {containerid}_ and start a new container from the newly committed image ...

> docker run -p 9530:9430 -p 8001:8001 -p 2222:22 -p 9500:9000 -d -P vam/nvdemo:b2a

__Note__: the addition of nodeVISTA setups (New Configurations+FMQL) will be a one of many "demo/test VISTA" setups built over the OSEHRA base

## Connect the Rambler and CPRS

__Rambler;__

Open __localhost:{FMQL port}__, set to _9500_ in the docker above.

__CPRS:__

Docker on OS X is NOT native - it is running on an Oracle VirtualBox virtual machine and the _--network="host"_ setting refers to this virtual box and not the native IP. From the host mac, get its current IP address ...

```text
> ipconfig getifaddr en0
192.168.1.8
```

and use that host in CPRS in parallels along with the RPC Broker port (_9530_) exposed in the container. 

## Publishing Image (to vistadataproject in Docker)

```text
> docker tag vam/nvdemo:b2a vistadataproject/nodevistas:b2a
> docker login 
...
> docker push vistadataproject/nodevistas:b2a
```

## More to Investigate and Work 

  * [docker and pm2](http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/) with _RUN npm install pm2 -g_ and more
  * why "p" and "s" introduces a problem for VISTA broker setup (is there some aspect of the GT/M MUMPS 'port' generation that requires env directories being upgraded/setup first?)
  * do more on host machine vs VM host - [see post on windows route settings](https://forums.docker.com/t/how-to-access-docker-container-from-another-machine-on-local-network/4737/13) and more on the official [docker networking](https://docs.docker.com/config/containers/container-networking/) and using [bridge networking](https://docs.docker.com/network/bridge/#use-ipv6) and [four ways to connect](http://blog.oddbit.com/2014/08/11/four-ways-to-connect-a-docker/)
  * run “Docker in Docker” in Docker for Mac (<=> same network namespace?), so you can run a swarm of Docker daemons which might be enough of a test environment for your multi-host apps.
  * [Parallels as host for Docker on OS X](https://zitseng.com/archives/10861) - only if this provides advantage for CPRS in Windows in Parallels
