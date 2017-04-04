#!/usr/bin/env node

'use strict';

const moment = require('moment');
const testUtils = require('./testUtils');

module.exports = function (db, userId, facilityId) {
    const now = new Date();

    const vitalOne = {

        description: 'Basic active MVDM problem that can lead to two objects in VDM. MVDM should use existing objects.',
        createArgs: {
            vitalsTakenDateTime: now,
            vitalType: '120_51-1',
            hospitalLocation: '44-6',
            value: '120/80',
        },
        createResult: {
            type: 'Vital',
            vitalsTakenDateTime: {
                value: '$NOW',
                type: 'xsd:dateTime',
            },
            vitalType: {
                id: '120_51-1',
                label: 'BLOOD PRESSURE',
                sameAs: 'vuid:4500634',
            },
            hospitalLocation: {
                id: '44-4',
                label: 'Clinic1',
            },
            value: '120/80',
            units: 'mm[Hg]',
        },
    };

    const vitalTwo = {

        description: 'Vital (blood pressure) with qualifiers',
        createArgs: {
            vitalsTakenDateTime: now,
            vitalType: '120_51-1',
            hospitalLocation: '44-4',
            value: '120/80',
            qualifiers: ['120_52-1', '120_52-51'],
        },
        createResult: {
            type: 'Vital',
            vitalsTakenDateTime: {
                value: '$NOW',
                type: 'xsd:dateTime',
            },
            vitalType: {
                id: '120_51-1',
                label: 'BLOOD PRESSURE',
                sameAs: 'vuid:4500634',
            },
            vitalsEnteredDateTime: {
                value: '$NOW',
                type: 'xsd:dateTime',
            },
            hospitalLocation: {
                id: '44-4',
                label: 'Clinic1',
            },
            enteredBy: {
                id: '$USERID',
            },
            value: '120/80',
            units: 'mm[Hg]',
            high: '210/110',
            low: '100/60',
            qualifier: [
                {
                    id: '120_52-1',
                    label: 'R ARM',
                    sameAs: 'vuid:4688676',
                },
                {
                    id: '120_52-51',
                    label: 'SITTING',
                    sameAs: 'vuid:4688703',
                },
            ],
        },
    };

    return {
        one: testUtils.fillTemplateValues(db, vitalOne, userId, facilityId),
        two: testUtils.fillTemplateValues(db, vitalTwo, userId, facilityId),
    };
};
