# Allow for VITALs in CPRS

sent Steve ...

> All in all, Vitals is almost wholly driven by PARAMETERS (allergies and problems are keyed off user 200 settings and CPRS RPC access). You can have the RPCs but not be allowed to access vitals and we need to nail this down.
>
> ie/ __Note that won't show up in basic rpcVitals-spec__ as RPCs allowed and work but CPRS requires PARAMETERS too and won't execute without that data.
>
> Aside: there must be some other neater way to set up these templates and values that ends up calling ADD^XPAR. Gotta find that

Attachments:
  * [vitalsSessionAINA.txt](https://github.com/vistadataproject/VDM/files/531346/vitalsSessionAINA.txt)
  * [vitalsSessionOSEHRA.txt](https://github.com/vistadataproject/VDM/files/531347/vitalsSessionOSEHRA.txt)

## GMV MANAGER for GETTEMP

[GMV MANAGER](http://localhost:9000/query?fmql=DESCRIBE%208994-1286&format=HTML) performs _many functions for the manager module_. One is _GETTEMP_ which _When the OPTION value is GETTEMP, this RPC will return a list data input templates definitions._

DP | VALUE
--- | ---
RPC | GMV MANAGER
ARG | "GETTEMP"
ENTRY POINT | RPC^GMVRPCM
PARAMETER | "GMV TEMPLATE"
ENTITY | system domain (4_2) = SYS 
INSTANCE | DAILY VITALS
VALUE | TPR, BP...1:0;5:0;3:0;2:0;21:0;8:0;22:0;9:0"

See ref to _/home/osehra/r/GMVRPCM.m_ above.

In AINA: 

```text
> D RPC^GMVRPCM(.RESULTS,"GETTEMP") ...
> ZW RESULTS
RESULTS="^TMP(""GMVMGR"",20024)"

>ZW ^TMP("GMVMGR",20024)
   ^TMP("GMVMGR",20024,0)=1
   ^TMP("GMVMGR",20024,1)="1^400;DIC(4.2,^PANORAMA.VISTACORE.US^DAILY VITALS^TPR, BP|1:0;5:0;3:0;2:0;21:0;8:0;22:0;9:0"
```

In OSEHRA NOT as Parameter GMV TEMPLATE isn't set (for the current domain/4.2/SYS) ...

```text
   ^TMP("GMVMGR",26938,0)=0
```

Key call inside _RPC^GMVRPCM_ is 

```text
 D ENVAL^XPAR(.GMV,"GMV TEMPLATE")
```

ie/ GETTEMP in RPC means lookup GMV TEMPLATE parameter, _Templates for vitals V5_

But for AINA ...

```text
VISTA 5d3>S X=$$GET^XPAR("SYS","GMV TEMPLATE","DAILY VITALS") 

VISTA 5d3>ZW X
X="TPR, BP|1:0;5:0;3:0;2:0;21:0;8:0;22:0;9:0"
```

## Adding GMV TEMPLATE setting to OSEHRA

```text
OSEHRA>D ADD^XPAR("SYS","GMV TEMPLATE","DAILY VITALS","TPR, BP|1:0;5:0;3:0;2:0;21:0;8:0;22:0;9:0")
```

ie/ instance is DAILY VITALS and value is "TPR ...". SYS is synonym for 4.2-... current domain.

Confirm it ...

```text
OSEHRA>S X=$$GET^XPAR("SYS","GMV TEMPLATE","DAILY VITALS")

OSEHRA>ZWR X
X="TPR, BP|1:0;5:0;3:0;2:0;21:0;8:0;22:0;9:0"
```

Underneath this GET^XPAR is the "AC" index (inside Parameter file itself and used instead of direct queries on the file - in effect, "beyond fileman" as not using FileMan APIs) ...

```text
VISTA 2N1>ZW ^XTV(8989.5,"AC",399)  
^XTV(8989.5,"AC",399,"400;DIC(4.2,","DAILY VITALS")="TPR, BP|1:0;5:0;3:0;2:0;21:0;8:0;22:0;9:0"
^XTV(8989.5,"AC",399,"400;DIC(4.2,","DAILY VITALS",8846)=""
```

  *  8989_51-399 is the location of GMV TEMPLATE in AINA
  * 4_2-400 is the core domain (Panorama) of AINA.
  * Note: the use of 4_2-400 makes this a "SYS" parameter ie/ system-wide

8989_51-4757 is _GMV TEMPLATE_ in OSEHRA and 4_2-87 is the domain/SYS ...

```text
OSEHRA>ZWR ^XTV(8989.5,"AC",4757,*)
^XTV(8989.5,"AC",4757,"87;DIC(4.2,","DAILY VITALS")="TPR, BP|1:0;5:0;3:0;2:0;21:0;8:0;22:0;9:0"
^XTV(8989.5,"AC",4757,"87;DIC(4.2,","DAILY VITALS",2030)=""
```

and use GMV MANAGER to make sure 

```text
OSEHRA> D RPC^GMVRPCM(.RESULTS,"GETTEMP")

OSEHRA>ZWR RESULTS
RESULTS="^TMP(""GMVMGR"",28342)"

OSEHRA>ZWR ^TMP("GMVMGR",28342,*)
^TMP("GMVMGR",28342,0)=1
^TMP("GMVMGR",28342,1)="1^87;DIC(4.2,^DEMO.OSEHRA.ORG^DAILY VITALS^TPR, BP|1:0;5:0;3:0;2:0;21:0;8:0;22:0;9:0"
```

... before parameter setting, saw 0 but now should work like AINA.

And other variation of GMV MANAGER calls from AINA's trace now work too ...

> D RPC^GMVRPCM(.RESULTS,"GETTEMP","87;DIC(4.2,^DAILY VITALS")
> D RPC^GMVRPCM(.RESULTS,"GETTEMP","87;DIC(4.2,^DAILY VITALS^TPR, BP")

(which both return the same thing as the argument-less call!)

OSEHRA already has other parameters queried using GMV MANAGER

> D RPC^GMVRPCM(.RESULTS,"GETQUAL","1;1")
> D RPC^GMVRPCM(.RESULTS,"GETQUAL","1;2")
> D RPC^GMVRPCM(.RESULTS,"GETQUAL","1;3")
> D RPC^GMVRPCM(.RESULTS,"GETQUAL","1;6")

## GMV USER - GETPAR - DefaultTemplate

__GMV USER__ is another key call for vitals setup that returns 0 in OSEHRA (before parameter setting) but has information about daily vitals in OSEHRA ...

DP | VALUE
--- | ---
RPC | GMV USER
ARGS | "GETPAR", "DefaultTemplate"
ENTRY POINT | RPC^GMVRPCU
PARAMETER | GMV USER DEFAULTS
ENTITY | USR (ie/ DUZ, 200-)
INSTANCE | DefaultTemplate
VALUE | 00;DIC(4.2,..DAILY VITALS

Note: there are other key USER DEFAULTS including VitalsLight and CPRS settings that parallel "DefaultTemplate". None are set for Robert A in OSEHRA.

Parameter is used to _used to store a users default parameter settings_ ([AINA](https://vista-aina/query?fmql=DESCRIBE%208989_51-401&format=HTML)). __DefaultTemplate__ is just one.

_RPC^GMVRPCU_ executes @ on the first (OPTION) argument ie/ @GETPAR which calls

```text
GETPAR ; [Procedure] Get Parameter
 S @RESULTS@(0)=$$GET^XPAR("USR","GMV USER DEFAULTS",DATA,"Q")
 Q

Note: "Q" or not has no effect here and DATA="DefaultTemplate"
```

In AINA ...

```text
VISTA 5d3>D RPC^GMVRPCU(.RESULT,"GETPAR","DefaultTemplate")

VISTA 5d3>ZW RESULT
RESULT="^TMP(""GMVUSER"",20024)"

VISTA 5d3>ZW ^TMP("GMVUSER",20024)
^TMP("GMVUSER",20024,0)="400;DIC(4.2,|DAILY VITALS"
```

backed by

```text
VISTA 5d3>S X=$$GET^XPAR("USR","GMV USER DEFAULTS","DefaultTemplate","Q")

VISTA 5d3>ZW X
X="400;DIC(4.2,|DAILY VITALS"

where USR stands for DUZ ie/ X;VA(200,
```

"AC" here is per User Id (file 200/DUZ). In the AINA above, logged in as user 989 ...

```text
> ZW ^XTV(8989.5,"AC",401,"989;VA(200,"),"DefaultTemplate")

^XTV(8989.5,"AC",401,"989;VA(200,","DefaultTemplate")="400;DIC(4.2,|DAILY VITALS"
^XTV(8989.5,"AC",401,"989;VA(200,","DefaultTemplate",16613)=""
```

and there are other INSTs too that may be relevant ...

```text
^XTV(8989.5,"AC",401,"989;VA(200,","VitalsLite")="1366;768;1830;26;816;702;0"
^XTV(8989.5,"AC",401,"989;VA(200,","VitalsLite",16622)=""
```

as well settings for BOLD etc etc ie/ this is user preferences and permissions

Note that "AC" here holds per user values as well as the global "DefaultTemplate" ...

```text
^XTV(8989.5,"AC",401,"993;VA(200,","VIEW-WIDTH")=1355
^XTV(8989.5,"AC",401,"993;VA(200,","VIEW-WIDTH",14882)="" <--- user 993
```

## Setting "DefaultTemplate" for Robert Alexander in OSEHRA

In OSEHRA, [GMV USER DEFAULTS](http://localhost:9000/query?fmql=DESCRIBE%208989_51-4759&format=HTML) is IEN 4759. For me, Robert Alexander is 200-55

```text
> S DUZ=55
>S X=$$GET^XPAR("USR","GMV USER DEFAULTS","DefaultTemplate","Q")
>ZWR X
X=""
>ZWR ^XTV(8989.5,"AC",4759,"55;VA(200,",*)

```

so no preferences at all for Robert. 

```text
OSEHRA>D ADD^XPAR("USR","GMV USER DEFAULTS","DefaultTemplate","00;DIC(4.2,|DAILY VITALS")  

OSEHRA>S X=$$GET^XPAR("USR","GMV USER DEFAULTS","DefaultTemplate","Q")

OSEHRA>ZWR ^XTV(8989.5,"AC",4759,"55;VA(200,",*)
^XTV(8989.5,"AC",4759,"55;VA(200,","DefaultTemplate")="00;DIC(4.2,|DAILY VITALS"
^XTV(8989.5,"AC",4759,"55;VA(200,","DefaultTemplate",2032)=""

OSEHRA>ZWR X
X="00;DIC(4.2,|DAILY VITALS"
```

and RPC itself (its entry point) ...

```text
OSEHRA>D RPC^GMVRPCU(.RESULT,"GETPAR","DefaultTemplate")

OSEHRA>ZWR RESULT
RESULT="^TMP(""GMVUSER"",1068)"

OSEHRA>ZWR ^TMP("GMVUSER",1068,*)
^TMP("GMVUSER",1068,0)="00;DIC(4.2,|DAILY VITALS"
```

## Others may have to do 

  * [GMV TEMPLATE DEFAULT AINA](https://vista-aina/query?fmql=DESCRIBE%208989_51-400&format=HTML)
