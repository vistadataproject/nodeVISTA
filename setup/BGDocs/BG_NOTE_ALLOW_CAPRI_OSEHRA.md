```text
OSEHRA>ZWR ^XTV(8989.5,"AC",747,*)          
^XTV(8989.5,"AC",747,"27;DIC(4.2,",1)="N" 
^XTV(8989.5,"AC",747,"27;DIC(4.2,",1,1825)=""
```

where parameter 747 (XU522) is said to have value "N" for first instance (1) that applies to Domain FOIA (DIC(4.2,27)). 

REM: [8995_51-747](http://localhost:9000/query?fmql=DESCRIBE%208989_51-747&format=HTML) is CAPRI status.

But this __shows a sync problem__ - making OSEHRA from FOIA didn't involve re-indexing -  because the file itself only has PARAM set to N for 4_2-87 which is DEMO.OSEHRA. and 87 is the value of "SYS".

So 

```text
ZWR ^XTV(8989.5,"AC","87;DIC(4.2,)")  
```

doesn't exist and the PARAMETER VALUE accessor returns "" ...

```text
$$GET^XPAR("SYS","XU522",1,"Q")

... Q == internal value, instance 1 ... "SYS" will lead to domain entity, XU522 is the 
package-qualified parameter.
```

Note: reindexing the Parameter file should fix this ie/ AC should match 8989_5 and GET^XPAR would return N for the new SYS, 87/OSEHRA.

All for FOIA (27) or 2 which is VISTA platinum but not for OSEHRA (87) ...

```text
OSEHRA>ZWR ^DIC(4.2,2,*) 
^DIC(4.2,2,0)="VISTA.DOMAIN.EXT^"
^DIC(4.2,2,2,0)="^4.23^2^2"
^DIC(4.2,2,2,1,0)="PLATINUM.VISTA.DOMAIN.EXT"
^DIC(4.2,2,2,2,0)="PLATINUM.VISTA.DOMAIN.EXT"

OSEHRA>ZWR ^DIC(4.2,27,*) 
^DIC(4.2,27,0)="FOIA.DOMAIN.EXT^Q"
^DIC(4.2,27,1,0)="^4.21^1^1"
^DIC(4.2,27,1,1,0)="TCP/IP^1^10^SMTP^NULL^FOIA.DOMAIN.EXT"
^DIC(4.2,27,1,1,1,0)="^4.22^2^2^3121107^^^^"
^DIC(4.2,27,1,1,1,1,0)=" O H=FOIA.DOMAIN.EXT,P=TCP/IP-MAILMAN"
^DIC(4.2,27,1,1,1,2,0)=" C TCPCHAN-SOCKET-N"
^DIC(4.2,27,1,"AC",1,1)=""
^DIC(4.2,27,1,"B","TCP/IP",1)=""

OSEHRA>ZWR ^DIC(4.2,87,*) 
^DIC(4.2,87,0)="DEMO.OSEHRA.ORG"
```

## More on Looking up using GET^XPAR

It boils down to using _INTERN^XPAR1_ to turn its arguments into appropriate VPTRs and IENs for use in "AC" in index of 8989.5.

```text
OSEHRA>S ENT="SYS"

OSEHRA>S PAR="XU522"

OSEHRA>S INST=1

OSEHRA>D INTERN^XPAR1

OSEHRA>ZWR INST
INST=1

OSEHRA>ZWR PAR 
PAR=747 <-------- IEN of this parameter in 8989.51

OSEHRA>ZWR ENT
ENT="87;DIC(4.2," <------ SYS == Domain is 87 which is DEMO.OSEHRA.ORG

OSEHRA>ZWR ^XTV(8989.5,"AC",747,*)          
^XTV(8989.5,"AC",747,"27;DIC(4.2,",1)="N" <-------- set for 27, not for 87 (27 is FOIA!!)
^XTV(8989.5,"AC",747,"27;DIC(4.2,",1,1825)=""

ie/ only entry is for domain:27, not this domain (OSEHRA) which is 87.

OSEHRA>ZWR ^DIC(4.2,87,*)
^DIC(4.2,87,0)="DEMO.OSEHRA.ORG"

OSEHRA>ZWR ^DIC(4.2,27,*)
^DIC(4.2,27,0)="FOIA.DOMAIN.EXT^Q"
^DIC(4.2,27,1,0)="^4.21^1^1"
^DIC(4.2,27,1,1,0)="TCP/IP^1^10^SMTP^NULL^FOIA.DOMAIN.EXT"
^DIC(4.2,27,1,1,1,0)="^4.22^2^2^3121107^^^^"
^DIC(4.2,27,1,1,1,1,0)=" O H=FOIA.DOMAIN.EXT,P=TCP/IP-MAILMAN"
^DIC(4.2,27,1,1,1,2,0)=" C TCPCHAN-SOCKET-N"
^DIC(4.2,27,1,"AC",1,1)=""
^DIC(4.2,27,1,"B","TCP/IP",1)=""
```

ie/ OSEHRA failed to reset FOIA's parameters for itself [nodeVISTA thing to fix].

__Crude bug fix ...__:

```text
OSEHRA>ZWR ^XTV(8989.5,"AC",747,*)
^XTV(8989.5,"AC",747,"27;DIC(4.2,",1)="N"
^XTV(8989.5,"AC",747,"27;DIC(4.2,",1,1825)=""

OSEHRA>S ^XTV(8989.5,"AC",747,"87;DIC(4.2,",1)="N"

OSEHRA>S ^XTV(8989.5,"AC",747,"87;DIC(4.2,",1,1825)=""

OSEHRA>K ^XTV(8989.5,"AC",747,"27;DIC(4.2,")
```

But AINA works and is consistent ...

```text
AINA: ENT, PAR, INST turned to internal values and then AC looked up

VISTA>S ENT="SYS"

VISTA>S PAR="XU522" <------ parameter file says "should be namespaced according to the package from which the parameter originated." ie/ this is XU 

VISTA>S INST=1

VISTA>D INTERN^XPAR1

VISTA>ZW ENT
ENT="400;DIC(4.2," <---------- ie/ system is 400 in DIC(4.2 in AINA

VISTA>ZW PAR
PAR=811 <-------- IEN in 8989.51 for XU522

VISTA>ZW INST
INST=1

VISTA>ZW ^XTV(8989.5,"AC",811)           
^XTV(8989.5,"AC",811,"400;DIC(4.2,",1)="N" <--- parameter 811 (XU522); domain:400
^XTV(8989.5,"AC",811,"400;DIC(4.2,",1,14016)="" <--- 8989_5-14016 holds the defn

VISTA>ZW ^XTV(8989.5,14016)
^XTV(8989.5,14016,0)="400;DIC(4.2,^811^1"
^XTV(8989.5,14016,1)="N"

VISTA>ZW ^DIC(4.2,400,0) <------------- despite us calling this AINA, domain (=SYS) is PANORAMA
^DIC(4.2,400,0)="PANORAMA.VISTACORE.US^S^^^^^^^^^^^500^^^n"
```

Side note on values allowed for XU522 ...

```text
Enter Y (YES) to disable old-style CAPRI logins (default).
Enter E (ERROR) to disable old-style CAPRI logins and trap attempts.
Enter N (NO) to leave old-style CAPRI logins enabled.
Enter L (DEBUG) to leave old-style CAPRI logins enabled but trap attempts.

<---- VA sets N. Want E. But to debug, try L.
```
