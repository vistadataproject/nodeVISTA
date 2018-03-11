# From OSEHRA to nodeVISTA Container

__3 Outstanding__: 1. need to test the final 'nodevista addition' script, 2. pm2 supprting restart and 3. CPRS connecting (port is there but from Parallels CPRS?)

Start with the git [docker-vista](https://github.com/OSEHRA/docker-vista) ...

> git clone https://github.com/OSEHRA/docker-vista

This has the software and docker file needed to create an image with OSEHRA VISTA on Cent OS. It sets up basic variables (ex/ basedir) and permissions to allow the following to work.

Build this image using Docker ...

> docker build -t osehrabase . 

Note:__ assumes you have installed docker. See how to install [docker for OS X]().

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

> docker commit osehrabase vam/nodevistaDemo:b2 

__Note__: eventually the addition of nodeVISTA setups (New Configurations+FMQL) will be a one of many "demo/test VISTA" setups built over the OSEHRA base
