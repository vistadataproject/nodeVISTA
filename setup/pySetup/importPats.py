"""
Based on OSEHRA's importPats.py.in but:
- rasUtilities used which holds OSEHRA RAS utilities from a number of places
- constants like VISTA_BINARY_DIR are either not needed or explicitly set here 
"""

import os
import sys
import logging
sys.path = ['rasUtilities'] + sys.path

from PATActions import PATActions
from OSEHRAHelper import ConnectToMUMPS, PROMPT

logging.basicConfig(level=logging.INFO,
                    #filename='debug.log',
                    #format='%(asctime)s %(levelname)s: %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S')

"""
ConnectToMUMPS relies on environment:
- is GTM => defined os.getenv('gtm_dist') == /home/osehra/lib/gtm
- is Linux => defined sys.platform == 'linux2'
"""
# print "Platform", sys.platform, "GT.M MUMPS VM", os.getenv('gtm_dist'), "GTM Prompt", os.getenv("gtm_prompt")

# ConnectToMUMPS(logfile, instance='CACHE', namespace='VISTA', location='127.0.0.1', remote_conn_details=None)
LOGFILE = 'logs/importPats_details.txt'
PATDATA = 'dataFiles/patdata1.csv'
DUZ = 57 # CLERK,JOE

try:
    # Note: in importPats.in from CACHE ARGS which eval to "". VISTA instance or namespace don't matter for GT.M
    VistA=ConnectToMUMPS(LOGFILE, "", "")
    VistA.wait(PROMPT)
    pat = PATActions(VistA)
    # Note: sets duz to 1 by default
    pat.signon(DUZ)
    #print "About to add data ..."
    pat.patientaddallcsv(PATDATA)
except Exception as e:
    print e
finally:
    pat.signoff() 

