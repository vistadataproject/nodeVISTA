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

## Import Patients
##

'''
Import patients from CSV files

@author: pbradley
Created on Apr 4, 2012
@author: pbradley
@copyright PwC
@license http://www.apache.org/licenses/LICENSE-2.0
'''

import sys
import logging
sys.path = ['/vagrant/VistA/Python/vista'] + ['/vagrant/VistA/Testing/Functional/RAS/lib'] + sys.path
from PATActions import PATActions
import datetime
import TestHelper
import sys
resfile = './VistA/bin/Testing/Log/importPAT_results.txt'
resultlog=file(resfile,'w')
logging.basicConfig(level=logging.INFO,
                    #filename='debug.log',
                    #format='%(asctime)s %(levelname)s: %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S')
try:
    from OSEHRAHelper import ConnectToMUMPS,PROMPT
    VistA=ConnectToMUMPS('./VistA/bin/Testing/Log/importPats_details.txt','CACHE','VISTA')
    if ('' and ''):
        VistA.login('','')
    if VistA.type=='cache':
        try:
            VistA.ZN('VISTA')
        except IndexError,no_namechange:
            pass
    VistA.wait(PROMPT)
    pat=PATActions(VistA)
    pat.signon()
    pat.patientaddallcsv('/vagrant/VistA/Testing/Functional/dataFiles/patdata0.csv')
except TestHelper.TestError, e:
    resultlog.write(e.value)
    logging.error('*****exception*********')
else:
    resultlog.write('Pass\n')
finally:
    '''
    Close Vista
    '''
    pat.signoff()
