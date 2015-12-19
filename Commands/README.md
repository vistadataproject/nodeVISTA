The _VDM Package_ (and _VMDN Module_) must build on VISTA's native MUMPS database, FileMan.

Before implementing these modules, the Project needs to show and test:

  * raw node access works for all required functions 
  * the effectiveness of FileMan data creation APIs (UPDATE^DIE) 
  * the shape of data returned by VPR and other key RPCs 
  * the data made by key RPCs and local functions 
  
This work will create a series of _node.js_ command line commands such as a _VPR Invoker_, _Vitals Adder_ to try out node.js Javascript-VISTA interactions.

See [issue 3](https://github.com/vistadataproject/nodeVistA/issues/3)
