"""
simpleSetup2: runs POST the JS setup

NOTE: for 1.2 USERS (and their signatures) still done here. Next jsSetup will take this over and the User setup part
will be removed from here.
"""

import os
import re
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

LOGFILE = '/home/nodevista/log/pySetupBasics.txt'

"""
Expect to be called from Shell - PRINT can be read with 
     result=`python simpleSetup.py`
     if [ "$result" != "OK" ]; then ... 
"""
def pySetupBasics():

    try:
        print "Connecting to MUMPS roll n scroll ..."
        VistA=ConnectToMUMPS(LOGFILE)
    except:
        print "EXIT_PYS_CANT_CONNECT_TO_MUMPS"
        return

    try:
        print "Setting up basics with", VistA
        postImportSetupBasics(VistA)
    except Exception as e:
        print e
        print "EXIT_PYS_CANT_SETUP_BASICS"

    print "[PY] Basics setup"

def postImportSetupBasics(VistA):
    """
    Basics of postImportSetup from initializeFileMan to division addition
    """

    # from test.cmake
    TEST_VISTA_SETUP_SITE_NAME = "DEMO.NODEVISTA.ORG"
    TEST_VISTA_STATION_NUMBER = "999"

    VistA.wait(PROMPT,60)

    # Reset site name to domain name, station number too. Uses D ^DINIT
    # ... sets (via ^ZUSET) ZUGTM to ZU and ^DINIT for MSC FileMan
    OSEHRASetup.initializeFileman(VistA, TEST_VISTA_SETUP_SITE_NAME, TEST_VISTA_STATION_NUMBER) # from 6161

    # Create and Christen the New Domain:
    # Enter the site name into the DOMAIN file then
    # christen the domain via the XMUDCHR routine.
    # Finally, add entries of new domain to
    # Kernel System Parameters and RPC Broker Site Parameters
    # and re-index both files.
    # OSEHRASetup.setupVistADomain(VistA, TEST_VISTA_SETUP_SITE_NAME)

    # Start TaskMan through the XUP Menu system.
    OSEHRASetup.restartTaskMan(VistA)

def main():
    pySetupBasics()

if __name__ == "__main__":
    main()
