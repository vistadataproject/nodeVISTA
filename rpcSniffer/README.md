The rpcSniffer is a module that is placed between a VistA RPC Broker and a RPC Broker client and is able to capture the RPC traffic between the client and broker. The RPCs are parsed and put into a near-JSON format. 

## Sniffer Directory

The main file of the sniffer there is a file called sniffer.js. `npm install` needs to be run in rpcSniffer directory to get the dependent node_modules.

## Configuration file

There is a file call config.js that contains the VistA RPC Broker connection information and other configuration items. The _config.sniffer.port_ is where the client that is being sniffed will point to. This is where the default port is set. It can also be set at the command line. The _config.vistaRpcBroker.configuration.host_ and _config.vistaRpcBroker.configuration.port_ are where the VistA has it's RPC Broker.

There is also a file called logger.js, that manages the bunyan paths and streams. Some file names are in config.js

## Starting the Sniffer

Usage (parameters are optional):
 
    node sniffer.js [snifferPort=PORT(default 9000)] [capturePath=CAPTURE_FILE_PATH(default ./log/capture.txt)] [from=NAME_OF_CLIENT(default CPRS] 

For example: 

    node sniffer.js capturePath=./log/VISTA1CPRSCapture.txt from=CPRSVISTA1 snifferPort=9001

The default port is 9010. The RPC client should be set to this port. The VistA RPC Broker endpoint is specified in the configuration file.

## Capture file

A capture.txt file will start writing an array of JSON objects for each RPC. At the end of the file there will be no closing ']' and it will contain a superfluous ','. This will need to be edited for the file to contain a valid JSON array. The capture.txt file is overwritten each time the sniffer is started.

        
    [
      {
        "name": "TCPConnect",
        "args": [
          "10.0.2.15",
          "0",
          "10.0.2.15"
        ],
        "rpc": "[XWB]10304\nTCPConnect5000910.0.2.15f00010f000910.0.2.15f\u0004",
        "response": "\u0000\u0000accept\u0004",
        "from": "CPRS",
        "to": "10.2.2.100",
        "timeStamp": "2016-11-15T18:46:53.477Z"
      },
      {
        "name": "XUS SIGNON SETUP",
        "version": "1.108",
        "args": [],
        "rpc": "[XWB]11302\u00051.108\u0010XUS SIGNON SETUP54f\u0004",
        "response": "\u0000\u0000vagrant-ubuntu-precise-64\r\nPLA\r\nPLA\r\n0\r\n5\r\n0\r\nDEMO.OSEHRA.ORG\r\n0\r\n\u0004",
        "from": "CPRS",
        "to": "10.2.2.100",
        "timeStamp": "2016-11-15T18:46:53.487Z"
      },


## External modules

The sniffer uses nodevista-rpcparser which is in nodeVISTA/lib as a package. Running `npm install` in rpcSniffer will build the nodevista-rpcparser package in node_modules so it is unnecessary to run that install separately. The package.json in rpcSniffer looks to for the relative path to lib/rpcParser to find the nodevista-rpcparser package.json.

