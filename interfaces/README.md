Node.js-based Service Interfaces to VISTA.
  * run inside a basic Express-based, Job-supporting Node.js server container
  * required for (M)VDM end-to-end demos (Deliverable #23)

## Three Servers
File | Description
--- | --- 
fmqlJobServer.js | FMQL service for VISTA
rpcJobServer.js | RPC service for VISTA
mvdmJobServer.js | MVDM service for VISTA <br> (coming soon)

## How To Run
1. Go to Development/VistA/Scripts/Install/Ubuntu/  
2. vagrant up
3. vagrant ssh
4. su vdp  (password: vistaisdata) 
5. cd /home/vdp/interfaces
6. npm install   (now you are ready to use the fmqlJobServer or simpleJobServer under the fmql folder)
7. node fmqlJobServer.js (default port 9000)
8. open a browser: https://localhost:9000/  
7. special steps for rpcJobServer:
   * copy *.m files from ewd folder into /home/osehra/p (https://github.com/vistadataproject/nodeVISTA/tree/master/interfaces/ewd)
   * replace node_modules/ewd-session/lib/proto/symbolTable.js with symbolTable.js from the ewd directory (we made a fix)

      - https? how to run that ... 
      - controlling logging/ where logs go - describe that
