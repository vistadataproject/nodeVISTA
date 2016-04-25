# Node.js-based Service Interfaces to VISTA.
  * run inside a basic Express-based, Job-supporting Node.js server container
  * required for (M)VDM end-to-end demos (Deliverable #23)

## Three Servers
File | Description
--- | --- 
fmqlJobServer.js | FMQL over HTTPS service for VISTA
rpcJobServer.js | RPC over HTTPS service for VISTA
mvdmJobServer.js | MVDM over HTTPS service for VISTA <br> (coming soon)

## How To Run the FMQL Job Server
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
11. Install the self-signed SSL certificate at the local machine in order to run the RPC job server using Chrome Avanced REST Client (see below)
  * Chrome: Click the red X and select "Certificate Information" from the "Connection" tab
  * Drag the certificate icon to desktop (save to desktop) ![LOCALHOST SSL](/interfaces/images/localhostSSL.png?raw=true)
  * Double click the saved file LOCALHOST.cer from the desktop
  * Make sure "Keychain" is selected to "System" and then click "Add" ![ADD SSL](/interfaces/images/addSSL.png?raw=true)
  * Enter your system password in roder to Modify Keychain (and re-enter again if prompted in the steps below)
  * Double click the LOCALHOST.cer certificate once it is added to Keychain Access
  * Click the Trust section to expand it
  * Select "Always Trust" When using this certificate ![TRUST SSL](/interfaces/images/trustSSL.png?raw=true)

## How To Run the RPC Job Server
1. copy *.m files from ewd folder listed below into /home/osehra/p (https://github.com/vistadataproject/nodeVISTA/tree/master/interfaces/ewd)
2. Follow the same steps from the FMQL job server above and cd to /home/vdp/interfaces
3. node rpcJobServer.js (default port 9001)
4. Use [Chrome Advanced REST Client] (https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo) POST to the following https://localhost:9001/vista/login (content type "application/json")
  * accessCode: fakenurse1
  * verifyCode: NEWVERIFY1!
![RPC JOB](/interfaces/images/ChromeAdvancedRESTClient.png?raw=true)

   
## Use PM2 to run node as daemon
To install pm2:
in vagrant box, use vdp user
run command
````text
npm install pm2 -g
````
To start the node.js server in cluster mode , run the following command:   
-i (number of workers) will tell PM2 that you want to launch your app in cluster_mode (as opposed to fork_mode).   
If 'number of workers' argument is 0, PM2 will automatically spawn as many workers as you have CPU cores.
````text
vdp@vagrant-ubuntu-precise-64:~/interfaces$ pm start fmqlJobServer.js -i 0 
[PM2] Spawning PM2 daemon
[PM2] PM2 Successfully daemonized
[PM2] Starting fmqlJobServer.js in cluster_mode (0 instance)
[PM2] Done.
┌───────────────┬────┬─────────┬──────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name      │ id │ mode    │ pid  │ status │ restart │ uptime │ memory      │ watching │
├───────────────┼────┼─────────┼──────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ fmqlJobServer │ 0  │ cluster │ 9872 │ online │ 0       │ 0s     │ 16.191 MB   │ disabled │
└───────────────┴────┴─────────┴──────┴────────┴─────────┴────────┴─────────────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
vdp@vagrant-ubuntu-precise-64:~/interfaces$ pm2 start rpcJobServer.js -i 0 
[PM2] Starting rpcJobServer.js in cluster_mode (0 instance)
[PM2] Done.
┌───────────────┬────┬─────────┬──────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name      │ id │ mode    │ pid  │ status │ restart │ uptime │ memory      │ watching │
├───────────────┼────┼─────────┼──────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ fmqlJobServer │ 0  │ cluster │ 9872 │ online │ 0       │ 40s    │ 37.746 MB   │ disabled │
│ rpcJobServer  │ 1  │ cluster │ 9892 │ online │ 0       │ 0s     │ 13.988 MB   │ disabled │
└───────────────┴────┴─────────┴──────┴────────┴─────────┴────────┴─────────────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
````

To get more info of the job server (given the id)
````text
 vdp@vagrant-ubuntu-precise-64:~/interfaces$ pm2 info 0
 Describing process with id 0 - name fmqlJobServer 
┌───────────────────┬───────────────────────────────────────────────┐
│ status            │ online                                        │
│ name              │ fmqlJobServer                                 │
│ restarts          │ 0                                             │
│ uptime            │ 2m                                            │
│ script path       │ /home/vdp/interfaces/fmqlJobServer.js         │
│ script args       │ N/A                                           │
│ error log path    │ /home/vdp/.pm2/logs/fmqlJobServer-error-0.log │
│ out log path      │ /home/vdp/.pm2/logs/fmqlJobServer-out-0.log   │
│ pid path          │ /home/vdp/.pm2/pids/fmqlJobServer-0.pid       │
│ interpreter       │ node                                          │
│ interpreter args  │ N/A                                           │
│ script id         │ 0                                             │
│ exec cwd          │ /home/vdp/interfaces                          │
│ exec mode         │ cluster_mode                                  │
│ node.js version   │ 0.12.7                                        │
│ watch & reload    │ ✘                                             │
│ unstable restarts │ 0                                             │
│ created at        │ 2016-04-23T23:47:33.623Z                      │
└───────────────────┴───────────────────────────────────────────────┘
 Code metrics value 
┌────────────┬────────┐
│ Loop delay │ 1.59ms │
└────────────┴────────┘
 Add your own code metrics: http://bit.ly/code-metrics
 Use `pm2 logs fmqlJobServer (--lines 1000)` to display logs
 Use `pm2 monit` to monitor CPU and Memory usage fmqlJobServer

vdp@vagrant-ubuntu-precise-64:~/interfaces$ pm2 info 1
 Describing process with id 1 - name rpcJobServer 
┌───────────────────┬──────────────────────────────────────────────┐
│ status            │ online                                       │
│ name              │ rpcJobServer                                 │
│ restarts          │ 0                                            │
│ uptime            │ 6m                                           │
│ script path       │ /home/vdp/interfaces/rpcJobServer.js         │
│ script args       │ N/A                                          │
│ error log path    │ /home/vdp/.pm2/logs/rpcJobServer-error-1.log │
│ out log path      │ /home/vdp/.pm2/logs/rpcJobServer-out-1.log   │
│ pid path          │ /home/vdp/.pm2/pids/rpcJobServer-1.pid       │
│ interpreter       │ node                                         │
│ interpreter args  │ N/A                                          │
│ script id         │ 1                                            │
│ exec cwd          │ /home/vdp/interfaces                         │
│ exec mode         │ cluster_mode                                 │
│ node.js version   │ 0.12.7                                       │
│ watch & reload    │ ✘                                            │
│ unstable restarts │ 0                                            │
│ created at        │ 2016-04-23T23:48:13.646Z                     │
└───────────────────┴──────────────────────────────────────────────┘
 Code metrics value 
┌────────────┬────────┐
│ Loop delay │ 1.54ms │
└────────────┴────────┘
 Add your own code metrics: http://bit.ly/code-metrics
 Use `pm2 logs rpcJobServer (--lines 1000)` to display logs
 Use `pm2 monit` to monitor CPU and Memory usage rpcJobServer

````
