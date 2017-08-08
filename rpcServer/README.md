## RPC Server 

The purpose of the RPC Server is to listen for RPC client requests (typically from CPRS or JLV) and forward them on to either the local RPC runner (pass through) or the MVDM RPC Emulator (emulated).


### Running the Server

**Configuration**

Modify cfg/config.js and set the rpc server and to the desired settings

```javascript
// rpc server socket
config.rpcServer = {};
config.rpcServer.port = 9010;
```

Modify cfg/clientConfig.js and set the nodeVISTA Manager configuration to the desired settings (this file is copied into the nodeVISTAManager clone that occurs post npm install):

```javascript
const config = {
    httpProtocol: 'http',
    host: '10.2.2.100',
    port: 9020,
};
```

**Execute the Server**

SSH into the nodeVista machine and login as the vdp user:

```
$ cd ~/dev/nodeVista/interfaces/rpcServer
$ npm install  <--- installs node_modules & nodeVISTAManager client
$ node rpcServer.js
```
The RPC Server should be listening for incoming RPC connections on the configured rpcServer port (9010). 

**Launch nodeVISTA Manager**

Open your browser and launch the nodeVISTA Manager URL: 
```
http://<nodeManager.host>:<nodeManager.port>

i.e. http://10.2.2.100:9020
```

![](https://github.com/vistadataproject/nodeVISTA/blob/master/rpcServer/screenshots/mvdmEvents.jpeg)

**Launching the RPC Client**

The RPC Server requires a RPC client to send RPC protocol requests. CPRS is the recommended client and will need to be configured to point to the RPC server instead of the VistA broker.

From your Windows Desktop, duplicate the target CPRS shortcut, right click on the new shortcut and select properties. 

Modify the target and change the server and port fields:

```
"C:\Program Files\VistA\CPRS\CPRSChart-VA.exe" CCOW=disable s=<VistA VM IP> p=9010 showrpcs
```
<img src="https://raw.githubusercontent.com/wiki/vistadataproject/nodeVISTA/images/cprsProperties.jpg" width=300/>

<img src="https://raw.githubusercontent.com/wiki/vistadataproject/nodeVISTA/images/cprsRpcServer.jpg" width=600/>

**Logging**

Logging output can be configured in cfg/config.js. 

Here are the defaults:

``` javascript
config.LOGGER = {};
config.LOGGER.name = 'rpcServer';
config.LOGGER.infoFile = './log/rpcServerInfo.log';
config.LOGGER.debugFile = './log/rpcServerDebug.log';
config.LOGGER.errorFile = './log/rpcServerError.log';

config.FILE = {};
config.FILE.options = {
    flags: 'w',
    defaultEncoding: 'utf8',
    fd: null,
    mode: 0666,
    autoClose: true
};
config.FILE.defaultCaptureFile = './log/capture.txt';
```
The *defaultCaptureFile* captures all of the incoming and outgoing RPC traffic. 

Here's an example of its output:

```javascript
{
  "name": "XUS INTRO MSG",
  "version": "0",
  "args": [],
  "rpc": "[XWB]11302\u00010\rXUS INTRO MSG54f\u0004",
  "response": "\u0000\u0000NEW SYSTEM 304-262-7078\r\n\u0004",
  "from": "CPRS",
  "to": "rpcRunner", // <--- Indicates which runner the RPC was forwarded to (rpcRunner, rpcE, hardcode)
  "timeStamp": "2016-09-01T23:35:32.110Z"
},
```
The other log files are standard info, debug, and error outputs from the rpc and mvdm client.


**Troubleshooting**
  * Sometimes the dependencies can get behind. Try deleting node_modules/mvdm: ```rm -Rf node_modules/mvdm``` and re-running ```npm install```
  * The same goes for bower: ```bower install```   or ```npm install bower```
