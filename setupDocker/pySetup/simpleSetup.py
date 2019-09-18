"""
Sets up Basic System - then JS can kick in. A follow on setup (setup2) runs after the JS setup. 

REM: will retire this when all runs in JS.
"""

import os
import sys
import logging
import time
sys.path = ['rasUtilities'] + sys.path

import OSEHRASetup
from OSEHRAHelper import ConnectToMUMPS, PROMPT

logging.basicConfig(level=logging.INFO,
                    #filename='debug.log',
                    #format='%(asctime)s %(levelname)s: %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S')

"""
ConnectToMUMPS relies on environment:
- is GTM => defined os.getenv('gtm_dist') == /home/nodevista/lib/gtm
- is Linux => defined sys.platform == 'linux2'
"""
# print "Platform", sys.platform, "GT.M MUMPS VM", os.getenv('gtm_dist'), "GTM Prompt", os.getenv("gtm_prompt")

LOGFILE = '/home/nodevista/log/simpleSetup.txt'

"""
Expect to be called from Shell - PRINT can be read with 
     result=`python simpleSetup.py`
     if [ "$result" != "OK" ]; then ... 
"""
def simpleSetup():

    try:
        print "Platform", sys.platform, "GT.M MUMPS VM", os.getenv('gtm_dist'), "GTM Prompt", os.getenv("gtm_prompt")
        print "Connecting to MUMPS roll n scroll ..."
        # change to get from env: os.getenv('gtm_dist')
        VistA=ConnectToMUMPS(LOGFILE)
    except Exception as e:
        print e
        print "EXIT_PYS_CANT_CONNECT_TO_MUMPS"
        return

    try:
        print "Setting up basics ..."
        postImportSetupBasics(VistA)
    except Exception as e:
        print e
        print "EXIT_PYS_CANT_SETUP_BASICS"
        return

    print "Setup1 COMPLETE OK"

def postImportSetupBasics(VistA):
    """
    Basics of postImportSetup from initializeFileMan to division addition
    """

    # from test.cmake
    TEST_VISTA_SETUP_SITE_NAME = "DEMO.NODEVISTA.ORG"
    TEST_VISTA_SETUP_PRIMARY_HFS_DIRECTORY = "@"
    TEST_VISTA_SETUP_SITE_NAME = "DEMO.NODEVISTA.ORG"
    TEST_VISTA_SETUP_VOLUME_SET = "PLA"
    VISTA_TCP_PORT = "9210" # but commented out in test.cmake

    VistA.wait(PROMPT,60)

    # Default site name is 6161
    # ... sets (via ^ZUSET) ZUGTM to ZU and ^DINIT for MSC FileMan
    OSEHRASetup.initializeFileman(VistA, TEST_VISTA_SETUP_SITE_NAME, "999") # from 6161

    # Setup the primary HFS directory from the
    # Kernel System Parameters file via FileMan
    # Use an "@" to remove or set a new file path.
    OSEHRASetup.setupPrimaryHFSDir(VistA, TEST_VISTA_SETUP_PRIMARY_HFS_DIRECTORY)

    # Ensure that the null device is correctly configured by adding
    # a $I for the correct platform rather than VMS and removing
    # sign-on capabilities
    # ... ISSUE seems to be N NULLs in OSEHRA now (see InitializeVISTA.html)
    # OSEHRASetup.configureNULLDevice(VistA)

    # TMP DOCKER BUG - Console and BOX setups don't work
    # FOR FULL FLOW NEEDED SEE: http://www.hardhats.org/projects/New/InitializeVistA.html

    # Change the /dev/tty device (GTM-UNIX-CONSOLE) to set
    # SIGN-ON/SYSTEM DEVICE to be "Yes"
    # ... This also fails -- perhaps because NULL fails ie/ debug second
    # OSEHRASetup.configureConsoleDevice(VistA)

    # Create and Christen the New Domain:
    # Enter the site name into the DOMAIN file then
    # christen the domain via the XMUDCHR routine.
    # Finally, add entries of new domain to
    # Kernel System Parameters and RPC Broker Site Parameters
    # and re-index both files.
    OSEHRASetup.setupVistADomain(VistA, TEST_VISTA_SETUP_SITE_NAME)

    # Set up the proper Box:Volume pair
    # VistA.getenv will query the instance for the local Box:Volume pair
    # and save the result as the "boxvol" parameter of the VistA object
    # IE. It can be printed via 'print VistA.boxvol'
    # ... note: not passing VISTA_TCP_PORT or VISTA_CACHE_NAMESPACE as not set
    # OSEHRASetup.setupBoxVolPair(VistA,TEST_VISTA_SETUP_VOLUME_SET,TEST_VISTA_SETUP_SITE_NAME, "")
    # OSEHRASetup.setupVolumeSet(VistA,TEST_VISTA_SETUP_SITE_NAME,TEST_VISTA_SETUP_VOLUME_SET, "")

    # Start TaskMan through the XUP Menu system.
    OSEHRASetup.restartTaskMan(VistA)

def main():
    simpleSetup()

if __name__ == "__main__":
    main()
