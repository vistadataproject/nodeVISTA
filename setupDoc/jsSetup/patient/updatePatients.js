'use strict';

/**
 * Updates existing patients with supplemental data with addresses, contact information, and military service.
 */

const nodem = require('nodem');
const VDM = require('mvdm/vdm');
const mvdmModel = require('mvdm/patient/mvdmPatientModel').mvdmModel;
const MVDM = require('mvdm/mvdm');
const vdmPatientModel = require('mvdm/patient/vdmPatientModel');
const utils = require('../utils');

const vdmModel = vdmPatientModel.vdmModel;

process.on('uncaughtException', (err) => {
    db.close();
    console.log(err);
    process.exit(1);
});

const db = new nodem.Gtm();
db.open();

const userId = utils.lookupUserIdByName(db, 'MANAGER,SYSTEM');
const facilityId = utils.lookupFacilityIdByName(db, 'VISTA HEALTH CARE');

VDM.setDBAndModel(db, vdmModel);
VDM.setUserAndFacility(userId, facilityId);

MVDM.setModel(mvdmModel);

patients2Update(userId, facilityId).forEach((patientData) => {
    MVDM.update(patientData);
});

db.close();

function patients2Update(userId, facilityId) {

    const patient1Id = utils.lookupPatientIdByName(db, 'CARTER,DAVID');

    const patient1 = {
        id: patient1Id,
        type: 'Patient',
        maritalStatus: {
            sameAs: 'va:11-6',
            sameAsLabel: 'NEVER MARRIED',
            id: '11-6',
            label: 'NEVER MARRIED',
        },
        occupation: 'STUDENT',
        religiousPreference: {
            sameAs: 'va:13-29',
            sameAsLabel: 'UNKNOWN_NO PREFERENCE',
            id: '13-29',
            label: 'UNKNOWN_NO PREFERENCE',
        },
        isCheckForDuplicate: true,
        permanentAddress: [{
            street1: '251 W 3RD ST',
            city: 'SANTA MONICA',
            state: {
                id: '5-6',
                label: 'CALIFORNIA',
            },
            county: 14,
            zipCode: '90291',
            country: {
                id: '779_004-1',
                label: 'USA',
            },
            changeDateTime: {
                type: 'xsd:dateTime',
                value: '2011-06-05T00:22:01',
            },
            changeSource: 'VAMC',
            changeSite: {
                id: facilityId,
                label: 'VISTA HEALTH CARE',
            },
            changeUser: {
                id: userId,
                label: 'ALEXANDER,ROBERT',
            },
        }],
        temporaryAddress: [{
            active: false,
            changeDateTime: {
                type: 'xsd:dateTime',
                value: '2007-06-10T11:20:15',
            },
        }],
        patientContact: [{
            phoneNumberResidence: '(000) 000-0000',
            cellularNumberChangeSource: 'VAMC',
            cellularNumberChangeSite: {
                id: facilityId,
                label: 'VISTA HEALTH CARE',
            },
            phoneNumberWork: 'NONE',
            emailAddress: 'CARTERDAVID@VISTADATAPROJECT.INFO',
            phoneNumberCellular: '(000) 000-0000',
            emailAddressChangeDateTime: {
                type: 'xsd:dateTime',
                value: '2011-07-13T11:05:22',
            },
            emailAddressChangeSource: 'VAMC',
            emailAddressChangeSite: {
                id: facilityId,
                label: 'VISTA HEALTH CARE',
            },
            cellularNumberChangeDateTime: {
                type: 'xsd:dateTime',
                value: '2011-02-22T10:13:22',
            },
        }],
        currentMeansTestStatus: {
            id: '408_32-4',
            label: 'MT COPAY EXEMPT',
        },
        fathersName: 'CARTER,BRUCE PATIENT',
        mothersName: 'JONES,PATRICIA',
        mothersMaidenName: 'JONES',
        ratedIncompetent: false,
        contacts: [{
            primaryNextOfKin: [{
                name: 'JONES,PATRICIA',
                phoneNumber: '(000) 000-0000',
                changeDateTime: {
                    type: 'xsd:dateTime',
                    value: '2011-05-26T08:01:22',
                },
            }],
            employer: [{
                status: 'NOT EMPLOYED',
            }],
            primaryEmergencyContact: [{
                name: 'JONES,PATRICIA',
                phoneNumber: '(000) 000-0000',
                changeDateTime: {
                    type: 'xsd:dateTime',
                    value: '2012-04-15T12:01:37',
                },
            }],
            designee: [{
                name: 'JONES,PATRICIA',
                phoneNumber: '(000) 000-0000',
            }],
        }],
        serviceConnected: [{
            isServiceConnected: false,
            receivingVaDisability: 'NO',
            pt: false,
            unemployable: false,
        }],
        claim: [{
            claimNumber: '211670124',
            coveredByHealthInsurance: 'NO',
        }],
        treatmentFactors: [{
            radiationExposure: [{
                exposureIndicated: 'YES',
                exposureMethod: 'OTHER',
            }],
            agentOrangeExposure: [{
                exposureIndicated: 'NO',
            }],
            southwestAsiaConditions: [{
                exposureIndicated: 'NO',
            }],
        }],
        militaryService: [{
            periodOfService: {
                id: '21-122',
                label: 'PERSIAN GULF WAR',
            },
            dischargeTypeLast: {
                id: '25-1',
                label: 'HONORABLE',
            },
            branchLast: {
                id: '23-1',
                label: 'ARMY',
            },
            entryDateLast: {
                type: 'xsd:date',
                value: '2001-10-15',
            },
            separationDateLast: {
                type: 'xsd:date',
                value: '2004-11-12',
            },
            serviceNumberLast: '324316719',
            secondEpisode: false,
            componentLast: 'REGULAR',
            verificationDate: {
                type: 'xsd:date',
                value: '2007-10-20',
            },
            powStatus: [{
                statusIndicated: 'NO',
                statusVerified: {
                    type: 'xsd:dateTime',
                    value: '2010-02-20T00:15:17',
                },
            }],
            combatService: [{
                serviceIndicated: true,
                serviceLocation: {
                    id: '22-7',
                    label: 'PERSIAN GULF WAR',
                },
                fromDate: {
                    type: 'xsd:date',
                    value: '2003-05-22',
                },
                toDate: {
                    type: 'xsd:date',
                    value: '2004-06-29',
                },
                combatVeteranEndDate: {
                    type: 'xsd:date',
                    value: '2009-10-15',
                },
                cvDateEdited: {
                    type: 'xsd:date',
                    value: '2008-06-15',
                },
            }],
        }],
        militaryDisabilityRetirement: false,
        dateMedicaidLastAsked: {
            type: 'xsd:dateTime',
            value: '2010-11-21T11:22:00',
        },
        raceInformation: [
            {
                raceInformation: {
                    id: '10-13',
                    label: 'WHITE',
                },
                methodOfCollection: {
                    id: '10_3-1',
                    label: 'SELF IDENTIFICATION',
                },
            },
        ],
        ethnicityInformation: [
            {
                ethnicityInformation: {
                    id: '10_2-2',
                    label: 'NOT HISPANIC OR LATINO',
                },
                methodOfCollection: {
                    id: '10_3-1',
                    label: 'SELF IDENTIFICATION',
                },
            },
        ],
        preferredFacility: {
            id: facilityId,
            label: 'VISTA HEALTH CARE',
        },
        spinalCordInjury: 'NOT APPLICABLE',
        patientEligibilities: [
            {
                eligibility: {
                    id: '8-5',
                    label: 'NSC',
                },
                longId: '222-02-1234',
                shortId: '1234',
            },
        ],
        patientType: {
            id: '391-12',
            label: 'NSC VETERAN',
        },
        appointmentRequestDate: {
            type: 'xsd:date',
            value: '2007-05-20',
        },
        combatIndicatedOn1010ez: true,
        appointmentRequestOn1010ez: false,
        isVeteran: true,
        networkIdentifier: 'C',

        // TODO setting one or more of these fields causes CPRS to blow up (both native and facade)

        // dischargeDueToDisability: false,
        // primaryEligibilityCode: {
        //     id: '8-5',
        //     label: 'NSC',
        // },
        // eligibilityStatus: 'VERIFIED',
        // eligibilityStatusDate: {
        //     type: 'xsd:date',
        //     value: '2007-11-20',
        // },
        // eligibilityVerifSource: 'HEC',
        // eligibilityVerifMethod: 'CEV/VIVA',
        // eligibilityStatusEnteredBy: {
        //     id: '200-.5',
        //     label: 'POSTMASTER',
        // },
        // userEnrolleeValidThrough: {
        //     type: 'xsd:date',
        //     value: '2011-06-15',
        // },
        // userEnrolleeSite: {
        //     id: facilityId,
        //     label: 'VISTA HEALTH CARE',
        // },
        // receivingAaBenefits: 'NO',
        // receivingHouseboundBenefits: 'NO',
        // receivingAVaPension: 'NO',
        // giInsurancePolicy: 'NO',
        // totalAnnualVaCheckAmount: '0',
        // primaryLongId: '222-02-1234',
        // primaryShortId: '1234',
        // serviceDentalInjury: false,
        // serviceTeethExtracted: false,
        // eligibleForMedicaid: false,
    };

    return [patient1];
}
