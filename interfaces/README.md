# Node.js-based Service Interfaces to VISTA.
  * run inside a basic Express-based, Job-supporting Node.js server container
  * required for (M)VDM end-to-end demos (Deliverable #23)

## Three Servers
File | Description
--- | --- 
fmqlJobServer.js | FMQL service for VISTA
rpcJobServer.js | RPC service for VISTA
mvdmJobServer.js | MVDM service for VISTA <br> (coming soon)

## How To Run FMQL Job Server
1. Go to Development/VistA/Scripts/Install/Ubuntu/  
2. vagrant up
3. vagrant ssh
4. su vdp  (password: vistaisdata) 
5. cd /home/vdp/interfaces
6. npm install   (now you are ready to use the fmqlJobServer or simpleJobServer under the fmql subfolder)
7. If not exist, make a log folder and create the two empty files "myapp-err.log" and "myapp-info.log" inside the log folder.
8. Run the server: node fmqlJobServer.js (default port 9000)
9. open a browser: https://localhost:9000/fmqlEP?fmql=DESCRIBE%202-1  (accept the SSL warning as it's a self-signed certificate)
10. User name is "foo" and password is "far"
![Schema Opener](/interfaces/images/sslDescribe.png?raw=true)
  * You may log error or information through the following syntax in fmqlJobServer.js  
  + log.error("an error occurred");  
  + log.info("information");       
  * Output will be stored in the log folder (https://github.com/vistadataproject/nodeVISTA/tree/master/interfaces/log)


## How To Run PRC Job Server
1. copy *.m files from ewd folder listed below into /home/osehra/p (https://github.com/vistadataproject/nodeVISTA/tree/master/interfaces/ewd)
2. Follow the same steps from the FMQL job server above and cd to /home/vdp/interfaces
3. node rpcJobServer.js
4. Use Chrome Advanced REST Client POST to the following http://localhost:9001/vista/login (content type "application/json")
  * accessCode: fakenurse1
  * verifyCode: NEWVERIFY1!
![RPC JOB](/interfaces/images/ChromeAdvancedRESTClient.png?raw=true)

   
