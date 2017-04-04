
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

LOGFILE = 'logs/importDemoSetup2.txt'

"""
Expect to be called from Shell - PRINT can be read with
     result=`python simpleSetup.py`
     if [ "$result" != "OK" ]; then ...
"""
def simpleSetup():

    try:
        print "Connecting to MUMPS roll n scroll ..."
        VistA=ConnectToMUMPS(LOGFILE)
    except Exception as e:
        print e
        print "EXIT_PYS_CANT_CONNECT_TO_MUMPS"
        return

    OSEHRASetup.signonZU(VistA,"SM1234","SM1234!!!")
    OSEHRASetup.addPharmacist(VistA,"SHARMA,FRED","FS","000000060","M","sakepharma1","2Pha!@#$");

def main():
    simpleSetup()

if __name__ == "__main__":
    main()
