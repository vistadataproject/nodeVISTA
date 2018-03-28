import os
import sys
import logging
sys.path = ['rasUtilities'] + sys.path

import OSEHRASetup
from OSEHRAHelper import ConnectToMUMPS, PROMPT

logging.basicConfig(level=logging.INFO,
                    #filename='debug.log',
                    #format='%(asctime)s %(levelname)s: %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S')

# -------------------------------------------------------------------------
#
# The ZTMGRSET routine will configure the VistA instance by renaming
# some system-specific routines
#
# Based on OSEHRA's GlobalImport.py.in which is called in a cmake based run.
# This is called after the GTM shell script 'importVistA.sh'. Normally this
# would be performed in such a shell script but as it is Python, it is being
# run separately.
# 
# Opens with:
#
#    ZTMGRSET Version 8.0 Patch level **34,36,69,94,121,127,136,191,275,355,446**
#    HELLO! I exist to assist you in correctly initializing the current account.
#    Which MUMPS system should I install?
#
# *****: REFERENCE-ONLY
# ... NOT IN DOCKER 1 as done in basic OSEHRA setup script (ie/ PLA/PLA) 
#
# -------------------------------------------------------------------------

LOGFILE = "/tmp/ZTMGRSET.txt"
TEST_VISTA_SETUP_UCI_NAME="PLA"
TEST_VISTA_SETUP_VOLUME_SET="PLA"

def ZTMGRSET():
    VistA=ConnectToMUMPS(LOGFILE)
    VistA.wait(PROMPT)
    VistA.write('D ^ZTMGRSET')
    while True:
        index = VistA.multiwait(['Should I continue?', 'System:'])
        if index == 0:
            VistA.write('YES')
            continue
        if index == 1:
            break
    # After choosing GTM (8), will see:
    #    'I will now rename a group of routines specific to your operating system
    VistA.write('8') 
    # MANAGER's
    VistA.wait('NAME OF')
    VistA.write(TEST_VISTA_SETUP_UCI_NAME + "," + TEST_VISTA_SETUP_VOLUME_SET)
    # PRODUCTION SIGN ON
    VistA.wait('PRODUCTION')
    VistA.write(TEST_VISTA_SETUP_UCI_NAME + "," + TEST_VISTA_SETUP_VOLUME_SET)
    # VOLUME SET must match one used in PRODUCTION
    VistA.wait('NAME OF')
    VistA.write(TEST_VISTA_SETUP_VOLUME_SET)
    # Accept /tmp
    VistA.wait('The temp directory for the system')
    VistA.write('')
    # last step - Now to load routines common to all systems.
    VistA.wait('Want to rename the FileMan routines: No//')
    VistA.write('YES')
    VistA.wait(PROMPT, 200)

def main():
    ZTMGRSET()

if __name__ == "__main__":
    main()
