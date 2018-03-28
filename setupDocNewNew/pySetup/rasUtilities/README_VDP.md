Assembles RAS utilities/specific menu handlers in one place

In OSEHRA gathered now too in https://github.com/OSEHRA/VistA/blob/master/Python/vista (3/18)

1. OSEHRAHelper etc from Python/vista
2. ADTACtion etc from Testing/Functional/RAS/lib 
   (use the helpers)
3. ZTMGRSET.py renames GlobalSetup.py from Testing/Scripts
   ... note: osehra/VISTA-M/packages/kernel has pre changed (portable) ZOSF etc ie/ not set for GT.M
   ... need to take care of ZTLOAD1 issue before running it
4. Added 

ImportGTM.rst goes through manual GTM steps reflected here and https://github.com/OSEHRA/VistA/blob/master/Documentation/ImportGTM.rst#import-the-routines

Note: need pexpect. 

```text
sudo apt-get install python-setuptools
pexpect (pip install pexpect)
```

OSEHRA code includes _pexpect_ source code and so doesn't install from official release (TODO: would need to add to installs)

## BG:

ZTLOAD1 issue ...

https://www.osehra.org/discussion/locking-problem-gtm - issue with Task locks for GT.M. Routine needs to change. WV did it
first and then OSEHRA has copy of the same change. Changed file copied into GTM directory of setup and copied from there.

ZTMGRSET ...

```text
============= ZTMGRSET ======

Called ONLY from Testing/Setup/GlobalImport.py.in:VistA.write('D ^ZTMGRSET')

OSEHRA>D ^XUP

Setting up programmer environment
%GTM-E-GVUNDEF, Global variable undefined: ^%ZOSF("TYPE-AHEAD")

OSEHRA>D ^ZTMGRSET


ZTMGRSET Version 8.0 Patch level **34,36,69,94,121,127,136,191,275,355,446,584**
HELLO! I exist to assist you in correctly initializing the current account.
Which MUMPS system should I install?

1 = VAX DSM(V6), VAX DSM(V7)
2 = MSM-PC/PLUS, MSM for NT or UNIX
3 = Cache (VMS, NT, Linux), OpenM-NT
4 = 
5 = 
6 = 
7 = GT.M (VMS)
8 = GT.M (Unix)
System: 8
 
I will now rename a group of routines specific to your operating system.
Routine:  ZOSVGUX Loaded, Saved as    %ZOSV

Routine:  ZIS4GTM Loaded, Saved as    %ZIS4
Routine:  ZISFGTM Loaded, Saved as    %ZISF
Routine:  ZISHGTM Loaded, Saved as    %ZISH
Routine:  XUCIGTM Loaded, Saved as    %XUCI
Routine: ZOSV2GTM Loaded, Saved as   %ZOSV2
Routine:  ZISTCPS Loaded, Saved as %ZISTCPS

NAME OF MANAGER'S UCI,VOLUME SET: VAH,ROU// PLA,PLA
The value of PRODUCTION will be used in the GETENV api.
PRODUCTION (SIGN-ON) UCI,VOLUME SET: VAH,ROU// PLA,PLA
The VOLUME name must match the one in PRODUCTION.
NAME OF VOLUME SET: PLA//PLA
The temp directory for the system: '/tmp/'//
^%ZOSF setup


Now to load routines common to all systems.
Routine:   ZTLOAD Loaded, Saved as  %ZTLOAD
Routine:  ZTLOAD1 Loaded, Saved as %ZTLOAD1
Routine:  ZTLOAD2 Loaded, Saved as %ZTLOAD2
Routine:  ZTLOAD3 Loaded, Saved as %ZTLOAD3
Routine:  ZTLOAD4 Loaded, Saved as %ZTLOAD4
Routine:  ZTLOAD5 Loaded, Saved as %ZTLOAD5
Routine:  ZTLOAD6 Loaded, Saved as %ZTLOAD6
Routine:  ZTLOAD7 Loaded, Saved as %ZTLOAD7
Routine:      ZTM Loaded, Saved as     %ZTM
Routine:     ZTM0 Loaded, Saved as    %ZTM0
Routine:     ZTM1 Loaded, Saved as    %ZTM1
Routine:     ZTM2 Loaded, Saved as    %ZTM2
Routine:     ZTM3 Loaded, Saved as    %ZTM3
Routine:     ZTM4 Loaded, Saved as    %ZTM4
Routine:     ZTM5 Loaded, Saved as    %ZTM5
Routine:     ZTM6 Loaded, Saved as    %ZTM6
Routine:     ZTMS Loaded, Saved as    %ZTMS
Routine:    ZTMS0 Loaded, Saved as   %ZTMS0
Routine:    ZTMS1 Loaded, Saved as   %ZTMS1
Routine:    ZTMS2 Loaded, Saved as   %ZTMS2
Routine:    ZTMS3 Loaded, Saved as   %ZTMS3
Routine:    ZTMS4 Loaded, Saved as   %ZTMS4
Routine:    ZTMS5 Loaded, Saved as   %ZTMS5
Routine:    ZTMS7 Loaded, Saved as   %ZTMS7
Routine:    ZTMSH Loaded, Saved as   %ZTMSH
Routine:     ZTER Loaded, Saved as    %ZTER
Routine:    ZTER1 Loaded, Saved as   %ZTER1
Routine:      ZIS Loaded, Saved as     %ZIS
Routine:     ZIS1 Loaded, Saved as    %ZIS1
Routine:     ZIS2 Loaded, Saved as    %ZIS2
Routine:     ZIS3 Loaded, Saved as    %ZIS3
Routine:     ZIS5 Loaded, Saved as    %ZIS5
Routine:     ZIS6 Loaded, Saved as    %ZIS6
Routine:     ZIS7 Loaded, Saved as    %ZIS7
Routine:     ZISC Loaded, Saved as    %ZISC
Routine:     ZISP Loaded, Saved as    %ZISP
Routine:     ZISS Loaded, Saved as    %ZISS
Routine:    ZISS1 Loaded, Saved as   %ZISS1
Routine:    ZISS2 Loaded, Saved as   %ZISS2
Routine:   ZISTCP Loaded, Saved as  %ZISTCP
Routine:   ZISUTL Loaded, Saved as  %ZISUTL
Routine:     ZTPP Loaded, Saved as    %ZTPP
Routine:     ZTP1 Loaded, Saved as    %ZTP1
Routine:   ZTPTCH Loaded, Saved as  %ZTPTCH
Routine:   ZTRDEL Loaded, Saved as  %ZTRDEL
Routine:   ZTMOVE Loaded, Saved as  %ZTMOVE
Routine:    ZTBKC Loaded, Saved as   %ZTBKC
Want to rename the FileMan routines: No//YES
Routine:     DIDT Loaded, Saved as      %DT
Routine:    DIDTC Loaded, Saved as     %DTC
Routine:    DIRCR Loaded, Saved as     %RCR
Setting ^%ZIS('C')

... 


Now, I will check your % globals...........
 
ALL DONE
OSEHRA>D ^XUP

Setting up programmer environment
This is a TEST account.

Access Code: 
OSEHRA>
```

and OSEHRASetup.initializeFileMan ...

```text
====== DINIT ZUSET =====

ie/ setting ZU from ZUGTM (as knows OS!)

called from OSEHRASetup.py ... initializeFileMan

GTM>D ^ZUSET
This routine will rename the correct routine to ZU for you.

Rename ZUGTM to ZU, OK? No//Y

(doesn't seem to be run in my setup!)

Routine ZUGTM was renamed to ZU
GTM>D ^DINIT
```

Does basics

I will now rename a group of routines specific to your operating system.
Routine:  ZOSVGUX Loaded, Saved as    %ZOSV

Routine:  ZIS4GTM Loaded, Saved as    %ZIS4
Routine:  ZISFGTM Loaded, Saved as    %ZISF
Routine:  ZISHGTM Loaded, Saved as    %ZISH
Routine:  XUCIGTM Loaded, Saved as    %XUCI
Routine: ZOSV2GTM Loaded, Saved as   %ZOSV2
Routine:  ZISTCPS Loaded, Saved as %ZISTCPS

and 

Now to load routines common to all systems.
Routine:   ZTLOAD Loaded, Saved as  %ZTLOAD
Routine:  ZTLOAD1 Loaded, Saved as %ZTLOAD1
...

and "It is found in the Testing/Setup directory called "ZTLOAD1.ro". It contains a new copy of the ZTLOAD1.m file which contains modifications that remove some transaction processing code that fails only on the GT.M platform."
```
