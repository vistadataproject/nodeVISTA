## Deliverable #33

> Prototype a web user interface to FileMan to make FileMan more usable and accessible. This shall demonstrate data query and review via web interface to FileMan and must use commodity, industry standard, vendor-agnostic, battle tested, secure TCP and HTTPS protocols, and vendor- agnostic JS framework.

Relies on the [VDM Read Prototype](https://github.com/vistadataproject/VDM/tree/master/prototypes/vdmRead) (Deliverable #25)

Steps to execute the server  
1. login to the VISTA server and change path to the home directory of nodeVISTA  
2. under nodeVISTA and cd to interfaces / vdmQSS   
3. launch the server by executing node simpleVdmQueryServer.js  
4. Go to the link to test http://localhost:9000/vdmQuery.html?query=DESCRIBE%20120_82-1&format=HTML
