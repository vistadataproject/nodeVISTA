#---------------------------------------------------------------------------
# Copyright 2013 PwC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#---------------------------------------------------------------------------

## Clinic Setup 
##

##
## VDP - ideally should be in simpleSetup.py but OSEHRA had it separate from
## ... adding addition clinics (44)
## ... note NOT the addClinic in OSEHRAHelper called from simpleSetup
## ... docker v2 will remove this (as it makes better clinics)
##

'''
This script sets up seven clinics that allow scheduling.
Clinic1: 0000-0800
Clinic2: 0800-1600
CLINICX: 1600-2400
CLInicA: 0000-0800
CLInicB: 0000-0800
CLInicC: 0000-0800
CLInicD: 0000-0800

Created on Jun 19, 2012
@author: bcaine, pbradley
@copyright PwC
@license http://www.apache.org/licenses/LICENSE-2.0
'''

import sys
import time
sys.path = ['rasUtilities'] + sys.path
from OSEHRAHelper import ConnectToMUMPS, PROMPT

class Clinic(object):
    def __init__(self, cname, cabr, cstarttime, ctime, cdate, cslots,
                 cservice, ctype, cxray, cprofiles, ccico, cproviders, cdiagnosisICD10, cdiagnosis, cvarlen,
                 cstopcode):
        self.cname = cname
        self.cabr = cabr
        self.cstarttime = cstarttime
        self.ctime = ctime
        self.cdate = cdate
        self.cslots = cslots
        self.cservice = cservice
        self.ctype = ctype
        self.cxray = cxray
        self.cprofiles = cprofiles
        self.ccico = ccico
        self.cproviders = cproviders
        self.cdiagnosis = cdiagnosis
        self.cdiagnosisICD10 = cdiagnosisICD10
        self.cvarlen = cvarlen
        self.cstopcode = cstopcode
    def setup(self, VistA):
        VistA.write('W $$NOSEND^VAFHUTL')
        VistA.wait('0')
        VistA.write('S DUZ=1 D ^XUP')
        VistA.wait('OPTION NAME:')
        VistA.write('SDBUILD')
        VistA.wait('CLINIC NAME:')
        VistA.write(self.cname)
        VistA.wait('LOCATION?')
        VistA.write('Yes')
        VistA.wait('NAME:')
        VistA.write('')
        VistA.wait('ABBREVIATION')
        VistA.write(self.cabr)
        while True:
          index = VistA.multiwait(['SERVICE','CLINIC MEETS','PATIENT FRIENDLY NAME','ALLOW DIRECT PATIENT','DISPLAY CLIN APPT'])
          if index == 0:
            break;
          if index == 2:
            VistA.write('')
          else:
            VistA.write('Y')
        VistA.write(self.cservice)
        VistA.wait('CLINIC?')
        VistA.write('N')
        VistA.wait('NUMBER:')
        VistA.write(self.cstopcode)
        VistA.wait('TYPE:')
        VistA.write(self.ctype)
        VistA.wait('MEDS?')
        VistA.write('')
        VistA.wait('TELEPHONE')
        VistA.write('')
        VistA.wait('FILMS?')
        VistA.write(self.cxray)
        VistA.wait('PROFILES?')
        VistA.write(self.cprofiles)
        for a in range(0, 4):
            VistA.wait('LETTER:')
            VistA.write('')
        VistA.wait('TIME:')
        VistA.write(self.ccico)
        for provider in self.cproviders:
            VistA.wait('Select PROVIDER')
            VistA.write(provider)
            VistA.wait('new PROVIDER')
            VistA.write('Yes')
            VistA.wait('DEFAULT PROVIDER')
            VistA.write('')
        VistA.wait('PROVIDER')
        VistA.write('')
        VistA.wait('PRACTITIONER?')
        VistA.write('')
        for diag in self.cdiagnosis:
            VistA.wait('Select DIAGNOSIS')
            VistA.write(diag)
            index = VistA.multiwait(['\?\?','OK'])
            if index == 1:
                VistA.write('')
                VistA.wait('new DIAGNOSIS')
                VistA.write('Yes')
                VistA.wait('DEFAULT DIAGNOSIS')
                VistA.write('')
            else:
                for diag10 in self.cdiagnosisICD10:
                    VistA.wait('Select DIAGNOSIS')
                    VistA.write(diag)
                    index = VistA.multiwait(['\?\?','OK'])
                    if index == 1:
                        VistA.write('')
                        VistA.wait('new DIAGNOSIS')
                        VistA.write('Yes')
                        VistA.wait('DEFAULT DIAGNOSIS')
                        VistA.write('')
                break
        VistA.wait('Select DIAGNOSIS')
        VistA.write('')
        VistA.wait('CHK OUT:')
        VistA.write('')
        index = VistA.multiwait(['ALLOWABLE CONSECUTIVE NO-SHOWS','WORKLOAD VALIDATION'])
        if index == 1:
          VistA.write('')
          VistA.wait('ALLOWABLE CONSECUTIVE NO-SHOWS')
        VistA.write('10')
        VistA.wait('BOOKING')
        VistA.write('365')
        VistA.wait('BEGINS:')
        VistA.write(self.cstarttime)
        VistA.wait('REBOOK:')
        VistA.write('')
        VistA.wait('REBOOK:')
        VistA.write('365')
        VistA.wait('HOLIDAYS')
        VistA.write('Yes')
        VistA.wait('CODE:')
        VistA.write('303')
        VistA.wait('CLINIC')
        VistA.write('')
        VistA.wait('LOCATION')
        VistA.write('')
        VistA.wait('CLINIC')
        VistA.write('')
        VistA.wait('MAXIMUM')
        VistA.write('4')
        VistA.wait('INSTRUCTIONS')
        VistA.write('')
        VistA.wait('LENGTH')
        VistA.write('30')
        VistA.wait('LENGTH')
        VistA.write(self.cvarlen)
        VistA.wait('HOUR')
        VistA.write('2')
        for day in range(0, 7):
            VistA.wait('DATE:')
            VistA.write(self.cdate[day])
            VistA.wait('TIME:')
            VistA.write(self.ctime)
            VistA.wait('SLOTS:')
            VistA.write(self.cslots)
            VistA.wait('TIME:')
            VistA.write('')
            VistA.wait('INDEFINITELY')
            VistA.write('Yes')
        VistA.wait('DATE:')
        VistA.write('')
        VistA.wait('NAME:')
        VistA.write('')

LOGFILE = '/home/nodevista/log/importClinicSetup.txt'

print "Connecting to MUMPS roll n scroll for clinic ..."
VistA=ConnectToMUMPS(LOGFILE)
VistA.wait(PROMPT, 60)

'''   (cname, cabr, cstarttime, ctime, cdate, cslots,
       cservice, ctype, cxray, cprofiles, ccico, cproviders, cdiagnosisICD10,cdiagnosis, cvarlen,
       cstopcode):'''
Clinic('Clinic1', 'C1', '0', '0000-0800', ['t', 't+1', 't+2', 't+3', 't+4', 't+5', 't+6', 't+7'], '16',
       'Medicine', 'Regular', 'Yes', '', 'YES', ['Alexander'], '', '', '',
       'Cardiology').setup(VistA)

Clinic('Clinic2', 'C2', '8', '0800-1600', ['t', 't+1', 't+2', 't+3', 't+4', 't+5', 't+6', 't+7'], '16',
       'Medicine', 'Regular', 'Yes', '', 'YES', ['Alexander'], '', '', '',
       'Cardiology').setup(VistA)

Clinic('CLINICX', 'CX', '16', '1600-2400', ['t', 't+1', 't+2', 't+3', 't+4', 't+5', 't+6', 't+7'], '16',
       'Medicine', 'Regular', 'Yes', '', 'NO', ['Alexander'], '', '', '',
       'Cardiology').setup(VistA)

Clinic('CLInicA', 'CA', '0', '0000-0800', ['t', 't+1', 't+2', 't+3', 't+4', 't+5', 't+6', 't+7'], '16',
       'Medicine', 'Regular', 'Yes', '', 'NO', ['Alexander'], '', '', 'Yes',
       '303').setup(VistA)

Clinic('CLInicB', 'CB', '0', '0000-0800', ['t', 't+1', 't+2', 't+3', 't+4', 't+5', 't+6', 't+7'], '2',
       'Surgery', 'Employee', 'Yes', '', 'YES', ['Smith', 'Alexander'], ['164.1', '391.8', '402.01'], ['C38.0', 'I01.8', 'I11.0'], 'yes',
       '435').setup(VistA)

Clinic('CLInicC', 'CC', '0', '0000-0800', ['t', 't+1', 't+2', 't+3', 't+4', 't+5', 't+6', 't+7'], '4',
       'None', 'Research', 'Yes', '', '', ['Smith'], '', '', '',
       '435').setup(VistA)

Clinic('CLInicD', 'CD', '0', '0000-0800', ['t', 't+1', 't+2', 't+3', 't+4', 't+5', 't+6', 't+7'], '4',
       'Neurology', 'Service Connected', 'Yes', '', '', ['Smith', 'Alexander'], ['191.7'], ['C71.7'], '',
       'NEUROLOGY').setup(VistA)

print "Setup Clinics ... Complete OK"
