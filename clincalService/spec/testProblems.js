#!/usr/bin/env node

'use strict';

/*
 * Peer of vdmTestProblems
 *
 * REM: MVDM == CPRS Profile of VDM, normalizing and orchestrating.
 *
 * (c) VISTA Data Project 2016
 */

const testUtils = require('./testUtils');

module.exports = function (db, userId, facilityId) {
    const activeProblemOne = {

        description: 'Basic active MVDM problem that can lead to two objects in VDM. MVDM should use existing objects.',
        otherProvider: {
            id: '$ID-200',
            label: 'SMITH,MARY',
        },
        createArgs: {
            diagnosis: '80-521774',
            providerNarrative: 'Diabetes mellitus',
            problemStatus: 'ACTIVE',
            problem: '757_01-7130783',
            clinic: '44-8',
            snomedCTConceptCode: '73211009',
            snomedCTDesignationCode: '121589010',
            codingSystem: '10D',
        },
        createResult: {
            type: 'Problem',
            name: 'Diabetes mellitus (SCT 73211009)',
            diagnosis: {
                id: '80-521774',
                label: 'R69.',
                sameAs: 'icd9cm:r69.',
            },
            icdd: 'ILLNESS, UNSPECIFIED',
            providerNarrative: {
                id: '9999999_27-1',
                label: 'Diabetes mellitus',
                sameAs: 'vuid:757-7065392',
            },
            facility: {
                id: '$FACILITYID',
            },
            problemStatus: 'ACTIVE',
            problem: {
                id: '757_01-7130783',
                label: 'Diabetes mellitus',
                sameAs: 'vuid:757-7065392',
            },
            condition: 'PERMANENT',
            clinic: {
                id: '44-8',
                label: 'CLInicB',
            },
            isAgentOrangeExposure: false,
            isIonizingRadiationExposure: false,
            isPersianGulfExposure: false,
            isHeadAndOrNeckCancer: false,
            isMilitarySexualTrauma: false,
            isCombatVeteran: false,
            isShipboardHazardDefense: false,
            snomedCTConceptValue: 'Diabetes mellitus',
            snomedCTConceptCode: '73211009',
            snomedCTDesignationCode: '121589010',
            codingSystem: '10D',
        },
    };

    const activeProblemTwo = {
        description: 'active problem arthritis with two comments',
        createArgs: {
            type: 'Problem',
            diagnosis: '80-521774',
            providerNarrative: 'Arthritis',
            problemStatus: 'ACTIVE',
            onsetDate: new Date('2016-03-01'),
            problem: '757_01-7006401',
            clinic: '44-7',
            comments: [
                'Test comment',
                'Another test comment',
            ],
            snomedCTConceptCode: '3723001',
            snomedCTDesignationCode: '7278014',
            codingSystem: '10D',
        },
        createResult: {
            type: 'Problem',
            name: 'Arthritis (SCT 3723001)',
            diagnosis: {
                id: '80-521774',
                label: 'R69.',
                sameAs: 'icd9cm:r69.',
            },
            icdd: 'ILLNESS, UNSPECIFIED',
            providerNarrative: {
                id: '9999999_27-2',
                label: 'Arthritis',
                sameAs: 'vuid:757-7003201',
            },
            facility: {
                id: '$FACILITYID',
            },
            problemStatus: 'ACTIVE',
            onsetDate: {
                value: '2016-03-01',
                type: 'xsd:date',
            },
            problem: {
                id: '757_01-7006401',
                label: 'Arthritis',
                sameAs: 'vuid:757-7003201',
            },
            condition: 'PERMANENT',
            clinic: {
                id: '44-7',
                label: 'CLInicA',
            },
            isAgentOrangeExposure: false,
            isIonizingRadiationExposure: false,
            isPersianGulfExposure: false,
            priority: 'CHRONIC',
            isHeadAndOrNeckCancer: false,
            isMilitarySexualTrauma: false,
            isCombatVeteran: false,
            isShipboardHazardDefense: false,
            comments: [
                {
                    commentId: 1,
                    commentText: 'Test comment',
                },
                {
                    commentId: 2,
                    commentText: 'Another test comment',
                },
            ],
            snomedCTConceptValue: 'Arthritis',
            snomedCTConceptCode: '3723001',
            snomedCTDesignationCode: '7278014',
            codingSystem: '10D',
        },
    };

    const activeProblemThree = {
        description: 'active problem Heart murmur',
        createArgs: {
            type: 'Problem',
            diagnosis: '80-521774',
            providerNarrative: 'Heart murmur',
            problemStatus: 'ACTIVE',
            onsetDate: new Date('2016-03-01'),
            problem: '757_01-7158329',
            clinic: '44-7',
            snomedCTConceptCode: '88610006',
            snomedCTDesignationCode: '146919019',
            codingSystem: '10D',
        },
    };

    const activeProblemFour = {
        description: 'active problem Morbid obesity',
        createArgs: {
            type: 'Problem',
            diagnosis: '80-521774',
            providerNarrative: 'Morbid obesity',
            problemStatus: 'ACTIVE',
            onsetDate: new Date('2016-03-01'),
            problem: '757_01-7362049',
            clinic: '44-7',
            snomedCTConceptCode: '238136002',
            snomedCTDesignationCode: '356968010',
            codingSystem: '10D',
        },
    };

    return {
        active: {
            one: testUtils.fillTemplateValues(db, activeProblemOne, userId, facilityId),
            two: testUtils.fillTemplateValues(db, activeProblemTwo, userId, facilityId),
            three: testUtils.fillTemplateValues(db, activeProblemThree, userId, facilityId),
            four: testUtils.fillTemplateValues(db, activeProblemFour, userId, facilityId),
        },
    };
};
