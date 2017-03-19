'use strict';

const testUtils = require('./testUtils');

module.exports = function (db, userId, facilityId) {
    const observedOne = {

        description: 'Basic Observable MVDM that can lead to five objects in VDM. Can - as if run after visit or assessment exists then MVDM should reuse existing objects',

        createInput: { // vs createResult

            type: 'Allergy',
            reactant: {
                id: '$ID-120_82', // CHOCOLATE
                sameAs: 'vuid:4636681',
            },
            allergyType: 'DRUG, FOOD',
            // no dateTimeEntered or enteredBy
            dateOccurred: {
                value: '2016-02-18', // May default this in MVDM
                type: 'xsd:date',
            }, // want this to go to $USER/DUZ
            observedOrHistorical: 'OBSERVED',
            mechanism: 'ALLERGY',
            reactions: [
                {
                    reaction: {
                        id: '$ID-120_83',
                        label: 'HIVES',
                        sameAs: 'vuid:4538560',
                    },
                },
                {
                    reaction: {
                        id: '$ID-120_83',
                        label: 'ITCHING,WATERING EYES',
                        sameAs: 'vuid:4538561',
                    },
                },
            ],
            allergySeverity: 'MODERATE', // in VDM, off in Report
            // ala CPRS - no verifier - want to flatten this out ...
            // "comments" and "comment_details"?
            // is DUZ optional?
            comments: [
                'unfortunate fellow\nbut mannerly!',
            ],
        },

        // Will card for "id" and "visit" so remove before compare
        createResult: {

            type: 'Allergy',
            patient: {
                id: '$ID-2',
                label: 'CARTER,DAVID',
            },
            facility: {
                id: '$FACILITYID',
            },
            reactant: {
                id: '$ID-120_82',
                label: 'CHOCOLATE',
                sameAs: 'vuid:4636681',
            },
            allergyType: 'DRUG, FOOD',
            dateTimeEntered: {
                value: '$NOW',
                type: 'xsd:dateTime',
            },
            enteredBy: {
                id: '$USERID',
            },
            observedOrHistorical: 'OBSERVED',
            mechanism: 'ALLERGY',
            reactions: [
                {
                    reaction: {
                        id: '$ID-120_83',
                        label: 'HIVES',
                        sameAs: 'vuid:4538560',
                    },
                },
                {
                    reaction: {
                        id: '$ID-120_83',
                        label: 'ITCHING,WATERING EYES',
                        sameAs: 'vuid:4538561',
                    },
                },
            ],
            allergySeverity: 'MODERATE',
            dateOccurred: {
                value: '2016-02-18',
                type: 'xsd:date',
            },
            comments: [
                {
                    dateTimeEntered: {
                        value: '$NOW',
                        type: 'xsd:dateTime',
                    },
                    enteredBy: {
                        id: '$USERID',
                    },
                    comment: 'unfortunate fellow\nbut mannerly!',
                },
            ],
        },

    };

    const observedTwo = {

        description: 'Basic Observable MVDM that can lead to five objects in VDM. Can - as if run after visit or assessment exists then MVDM should reuse existing objects',

        createInput: { // vs createResult

            type: 'Allergy',
            reactant: {
                id: '$ID-120_82',
                label: 'DOG DANDER',
                sameAs: 'vuid:4691020',
            },
            allergyType: 'DRUG, FOOD',
            // no dateTimeEntered
            dateOccurred: {
                value: '2016-02-18', // May default this in MVDM
                type: 'xsd:date',
            }, // want this to go to $USER/DUZ
            // no enteredBy
            observedOrHistorical: 'OBSERVED',
            mechanism: 'ALLERGY',
            reactions: [
                {
                    reaction: {
                        id: '$ID-120_83',
                        label: 'HIVES',
                        sameAs: 'vuid:4538560',
                    },
                },
            ],
            allergySeverity: 'MODERATE', // in VDM, off in Report
            // ala CPRS - no verifier - want to flatten this out ...
            // "comments" and "comment_details"?
            // is DUZ optional?
            comments: [
                'saw it myself',
            ],
        },
    };

// based on a vdm test allergy
    const historicalOne = {

        createInput: {

            type: 'Allergy',
            reactant: {
                id: '$ID-50_605',
                // REM: pulled from/to classification as not VDM .01
                label: 'AM114 [PENICILLINS AND BETA-LACTAM ANTIMICROBIALS]',
                sameAs: 'vuid:4021523',
            },
            allergyType: 'DRUG',
            // no dateTimeEntered or enteredBy
            observedOrHistorical: 'HISTORICAL',
            mechanism: 'UNKNOWN',
            // allowed to do HISTORICAL Comments but of type OBSERVED! - leaving out for later update tests
        },

        createResult: {

            type: 'Allergy',
            patient: {
                id: '$ID-2',
                label: 'FOURTEEN,PATIENT N',
            },
            facility: {
                id: '$FACILITYID',
            },
            reactant: {
                id: '$ID-50_605',
                // REM: pulled from/to classification as not VDM .01
                label: 'PENICILLINS AND BETA-LACTAM ANTIMICROBIALS',
                sameAs: 'vuid:4021523',
            },
            reactantDetails: {
                drugClasses: [
                    {
                        id: '$ID-50_605',
                        // matches reactant - pulled from classification
                        label: 'AM114 [PENICILLINS AND BETA-LACTAM ANTIMICROBIALS]',
                        sameAs: 'vuid:4021523',
                    },
                ],
            },
            allergyType: 'DRUG',
            dateTimeEntered: {
                value: '$NOW',
                type: 'xsd:dateTime',
            },
            enteredBy: {
                id: '$USERID',
            },
            observedOrHistorical: 'HISTORICAL',
            mechanism: 'UNKNOWN',
        },
    };

    /*
     * Test for Ascorbic Acid fan out - should see three ingredients (and it) in "drug_ingredients" and five classes
     */
    const historicalTwo = {

        createInput: {

            type: 'Allergy',
            reactant: {
                id: '$ID-120_82',
                sameAs: 'vuid:4636711', // ASCORBIC ACID
            },
            allergyType: 'DRUG',
            // no dateTimeEntered or enteredBy
            observedOrHistorical: 'HISTORICAL',
            mechanism: 'PHARMACOLOGIC',

        },

        createResult: {

            type: 'Allergy',
            patient: {
                id: '$ID-2',
                label: 'CARTER,DAVID',
            },
            reactant: {
                id: '$ID-120_82',
                label: 'ASCORBIC ACID',
                sameAs: 'vuid:4636711',
            },
            reactantDetails: {
                drugIngredients: [
                    {
                        id: '$ID-50_416',
                        label: 'SODIUM ASCORBATE',
                        sameAs: 'vuid:4017472',
                    },
                    {
                        id: '$ID-50_416',
                        label: 'ASCORBIC ACID',
                        sameAs: 'vuid:4017471',
                    },
                    {
                        id: '$ID-50_416',
                        label: 'ASCORBYL PALMITATE',
                        sameAs: 'vuid:4020017',
                    },
                    {
                        id: '$ID-50_416',
                        label: 'EDETATE',
                        sameAs: 'vuid:4025443',
                    },
                ],
                drugClasses: [
                    {
                        id: '$ID-50_605',
                        label: 'VT801 [MULTIVITAMINS]',
                        sameAs: 'vuid:4021807',
                    },
                    {
                        id: '$ID-50_605',
                        label: 'VT400 [VITAMIN C]',
                        sameAs: 'vuid:4021716',
                    },
                    {
                        id: '$ID-50_605',
                        label: 'TN200 [ENTERAL NUTRITION]',
                        sameAs: 'vuid:4021704',
                    },
                    {
                        id: '$ID-50_605',
                        label: 'VT802 [MULTIVITAMINS WITH MINERALS]',
                        sameAs: 'vuid:4021913',
                    },
                    {
                        id: '$ID-50_605',
                        label: 'VT809 [VITAMIN COMBINATIONS,OTHER]',
                        sameAs: 'vuid:4021808',
                    },
                ],
            },
            allergyType: 'DRUG',
            mechanism: 'PHARMACOLOGIC',
            dateTimeEntered: {
                value: '$NOW',
                type: 'xsd:dateTime',
            },
            enteredBy: {
                id: '$USERID',
            },
            enteredAtFacility: {
                id: '$FACILITYID',
            },
            observedOrHistorical: 'HISTORICAL',
        },

    };

    return {
        historicals: {
            one: testUtils.fillTemplateValues(db, historicalOne, userId, facilityId),
            two: testUtils.fillTemplateValues(db, historicalTwo, userId, facilityId),
        },
        observeds: {
            one: testUtils.fillTemplateValues(db, observedOne, userId, facilityId),
            two: testUtils.fillTemplateValues(db, observedTwo, userId, facilityId),
        },
    };
};
