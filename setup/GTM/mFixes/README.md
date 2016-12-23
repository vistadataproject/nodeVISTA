Mix of firsts of OSEHRA VISTA and fixes for GT/M.

Important - the ZTLOAD1 fix (https://www.osehra.org/discussion/locking-problem-gtm) must be inserted before GTM/importVistA.sh and ZTMGRSET.m which compiles and "remakes" for GTM 
respectively.

DPTLK7.m turns off "searching for MVI" which stops dialog-driven Patient insert working on a stand alone system. It was one of number of .ro routines in OSEHRA setup. The following extract from _testingChanges.rst_ explains these files ...

> When using the ``TEST_VISTA_SETUP`` option of the OSEHRA Testing Harness,
> certain routines are replaced during the run of the process.  This replacement
> was used to eliminate platform-specific functionality from being
> executed.
