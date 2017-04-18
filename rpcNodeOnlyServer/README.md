The rpcNodeOnlyServer is based on the rpcServer module which uses the rpcFacade from MVDM module to run either the rpcEmulator or rpcRunner. It is configured and run in a very similar way to rpcServer. See the [README](https://github.com/vistadataproject/nodeVISTA/blob/master/rpcServer/README.md) for rpcServer.

The first main difference in the rpcNodeOnlyServer is that it is a single process. The main purpose of this server was to do timing analysis so the single process eliminates the overhead from the latency in the interprocess communication of master and worker present in the original rpcServer.

The second difference is that, there are utilityRPCs that are implemented directly in javascript uesd in the RPC Emulator. These do not need to access patient data, for example, calls that would return a date. rpcNodeOnlyServer adds a third path besides the Emulator or Runner. If called RPC is in utilityRPCs, the javascript is called directly instead of going through the Emulator. This allows a full bypass of crossing the JS/MUMPS boundary. The results from timing tests help to investigate areas that may cause slowdowns. This path is configurable from the MVDM management page.


## Timing of XWB IM HERE
### Methodology
There is also a RPC called XWB IM HERE. This is essentially a ping to VistA and a "1" is returned. This RPC is also implemented in utilityRPCs as pure javascript.

rpcNodeOnlyServer adds a third path besides the Emulator or Runner. If the called RPC is in utilityRPCs, the javascript is executed instead of the call going through the Emulator and database. This allows a full bypass of crossing the JS/MUMPS boundary. The results from timing tests help to investigate areas that may cause slowdowns.

For the timing tests a test script which calls XWB IM HERE 1000 times is used for a trial. A javascript `new Date()` call is placed before the first and after the last XWB IM HERE call. The times are compared and the difference is the number of milliseconds for the 1000 calls. Each cell is a trial of 1000 calls. The last line is the average of all trials divided by 1000 to get the average time per call in ms.

The first column shows the trial running directly against the VistA RPC Broker. The next 6 columns show the times going through the javascript rpcServer. The Node Only data shows where the javascript for the XWB IM HERE is called directly. The Emulator data shows where the rpcServer calls the rpcFacade which calls into rpcEmulator which then calls the same javascript. The Runner column shows the calls going through the rpcFacade to the rpcRunner.

The Emitter is the mvdm monitor. The logging is 3-4 lines of writing to the bunyan logger. The data shows the differences with these lines commented out or in place.

### Test commands
Start rpcNodeOnlyServer
```
node rpcNodeOnlyServer.js
```
Single trial
```
node spec/XWB_IM_HERE_Timing.js
```
Five trials, bash script
```
./spec/runIMHERETiming.sh
```

### Results
| XWB IM HERE (1000 times in milliseconds) |                      |                      |                   |                      |                    |                     |                     |
|--------------------------|----------------------|----------------------|-------------------|----------------------|--------------------|---------------------|----------------------|
| Native Broker            | Node Only            |                      |                   | Emulator             |                    | Runner               |               |
|                          | no Emitter/w logging | no Emitter/no Logger | Emitter/no Logger | no Emitter/no Logger | Emitter/no logging | no Emitter/no Logger |                     |
| 208                      | 1026                 | 349                  | 395               | 37104                | 37346              | 872                  |                     |
| 206                      | 1001                 | 286                  | 391               | 38216                | 37355              | 791                  |                     |
| 201                      | 1018                 | 273                  | 396               | 37233                | 37490              | 784                  |                     |
| 204                      | 1015                 | 267                  | 390               | 37151                | 37976              | 772                  |                     |
| 196                      | 974                  | 267                  | 378               | 37135                | 37465              | 783                  |                     |
| 208                      | 1069                 | 268                  | 390               |                      |                    | 791                  |                     |
| 231                      | 970                  | 285                  | 380               |                      |                    | 805                  |                     |
| 230                      | 977                  | 254                  | 382               |                      |                    | 793                  |                     |
| 227                      | 987                  | 266                  | 383               |                      |                    | 783                  |                     |
| 214                      | 961                  | 277                  | 388               |                      |                    | 780                  |                     |
| 0.2125                   | 0.9998               | 0.2792               | 0.3873            | 37.3678              | 37.5264            | 0.7954               | average ms per call |
