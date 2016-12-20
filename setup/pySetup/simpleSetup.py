"""
Based on post import setup (PostImportSetupScript.py.in) but removes switches for Cache and inlines CONSTANTs

Broken in three steps between basic setup, then user then patient addition. 

TODO: break out last two steps completely and move them to JS. Finally move whole setup to JS.
"""

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

"""
ConnectToMUMPS relies on environment:
- is GTM => defined os.getenv('gtm_dist') == /home/osehra/lib/gtm
- is Linux => defined sys.platform == 'linux2'
"""
# print "Platform", sys.platform, "GT.M MUMPS VM", os.getenv('gtm_dist'), "GTM Prompt", os.getenv("gtm_prompt")

LOGFILE = 'logs/importDemoSetup.txt'

def simpleSetup():
    try:
        VistA=ConnectToMUMPS(LOGFILE)
        VistA.wait(PROMPT,60)

        print "Setting up basics ..."
        postImportSetupBasics(VistA)

        try: 
            print "Now setting up Users ..."
            postImportSetupUsers(VistA)
        except Exception as e:
            print e
            print "... going on as except verify msg and will suppress"

        print "Finally setting up Patients ..."
        postImportSetupPatients(VistA)
 
    except Exception as e:
        print e
    finally:
        pass

def postImportSetupBasics(VistA):
    """
    Basics of postImportSetup from initializeFileMan to division addition
    """

    # from test.cmake
    TEST_VISTA_SETUP_SITE_NAME = "DEMO.OSEHRA.ORG"
    TEST_VISTA_SETUP_PRIMARY_HFS_DIRECTORY = "@"
    TEST_VISTA_SETUP_SITE_NAME = "DEMO.OSEHRA.ORG"
    TEST_VISTA_SETUP_VOLUME_SET = "PLA"
    VISTA_TCP_PORT = "9210" # but commented out in test.cmake

    # Default site name is 6161
    # ... sets (via ^ZUSET) ZUGTM to ZU and ^DINIT for MSC FileMan
    OSEHRASetup.initializeFileman(VistA, TEST_VISTA_SETUP_SITE_NAME, "6161")

    # Setup the primary HFS directory from the
    # Kernel System Parameters file via FileMan
    # Use an "@" to remove or set a new file path.
    OSEHRASetup.setupPrimaryHFSDir(VistA, TEST_VISTA_SETUP_PRIMARY_HFS_DIRECTORY)

    # Ensure that the null device is correctly configured by adding
    # a $I for the correct platform rather than VMS and removing
    # sign-on capabilities
    OSEHRASetup.configureNULLDevice(VistA)

    # Change the /dev/tty device (GTM-UNIX-CONSOLE) to set
    # SIGN-ON/SYSTEM DEVICE to be "Yes"
    OSEHRASetup.configureConsoleDevice(VistA)

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
    OSEHRASetup.setupBoxVolPair(VistA,TEST_VISTA_SETUP_VOLUME_SET,TEST_VISTA_SETUP_SITE_NAME, "")
    OSEHRASetup.setupVolumeSet(VistA,TEST_VISTA_SETUP_SITE_NAME,TEST_VISTA_SETUP_VOLUME_SET, "")

    # Start TaskMan through the XUP Menu system.
    OSEHRASetup.restartTaskMan(VistA)

    #Create the System Manager
    OSEHRASetup.addSystemManager(VistA)

    # Open FileMan and create the VistA Health Care institution
    OSEHRASetup.addInstitution(VistA,"VISTA HEALTH CARE","6100")

    # Create the Medical Center Division of
    # the VistA Health Care institution
    OSEHRASetup.addDivision(VistA,'VISTA MEDICAL CENTER',"6101","6100")

def postImportSetupUsers(VistA):
    """
    The following is the second half of 'postImportSetupScript' and is more about 
    providers and patients but has some PARAMETER settings too

    TODO: split out PARAMETER settings and move above. Then make doctor/nurse etc
    setups a separate User Setup pass
    """

    # The Sikuli test for CPRS orders a Streptozyme test for the patient
    # This information ensures the test can be ordered at the VistA Health care
    # Facility
    OSEHRASetup.setupStrepTest(VistA)

    #Register the Vitals DLL and GUI Versions within the XPAR Menu
    OSEHRASetup.registerVitalsCPRS(VistA)

    OSEHRASetup.signonZU(VistA,"SM1234","SM1234!!")

    OSEHRASetup.addDoctor(VistA,"ALEXANDER,ROBERT","RA","000000029","M","fakedoc1","2Doc!@#$")

    #Enter the Nurse Mary Smith
    OSEHRASetup.addNurse(VistA,'SMITH,MARY','MS','000000030','F','fakenurse1','2Nur!@#$')

    # Add a clerk user with permissions for Problem List Data entry
    OSEHRASetup.addClerk(VistA,"CLERK,JOE","JC","000000112","M","fakeclerk1","2Cle!@#$")

    #Create a new Order Menu
    OSEHRASetup.createOrderMenu(VistA)

    #Give all users of the instance permission to mark allergies as "Entered in error')
    OSEHRASetup.addAllergiesPermission(VistA)

    #Give Mary Smith permission to create shared templates
    OSEHRASetup.addTemplatePermission(VistA,"MS")

    # Add clinic via the XUP menu to allow scheduling
    OSEHRASetup.createClinic(VistA,'VISTA HEALTH CARE','VHC','M')

    #Set up the Doctors electronic signature
    OSEHRASetup.setupElectronicSignature(VistA,"fakedoc1",'2Doc!@#$','1Doc!@#$','ROBA123')

    #Set up the Nurse electronic signature
    OSEHRASetup.setupElectronicSignature(VistA,"fakenurse1","2Nur!@#$","1Nur!@#$","MARYS123")

    #Set up the Clerk verification code
    OSEHRASetup.setupElectronicSignature(VistA,"fakeclerk1","2Cle!@#$","1Cle!@#$","CLERKJ123")

def postImportSetupPatients(VistA):

    # Add patient to the instance using the registration menu.
    # Not using the Clerk user to avoid dropping the connection on the error when trying to connect to the MPI.
    # and the Register a Patient menu option.
    # The patient can be a veteran but not service connected
    # Function arguments:
    # VistA, Patient Name, Patient Sex,Patient DOB, Patient SSN, Patient Veteran?
    OSEHRASetup.addPatient(VistA,'../dataFiles/patdata0.csv')

def main():
    simpleSetup()

if __name__ == "__main__":
    main()
