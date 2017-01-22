#!/usr/bin/env node

'use strict';

/*
 * Basic setup
 */
const _ = require('underscore');
const moment = require('moment');
const nodem = require('nodem');
const fileman = require('mvdm/fileman');
const vdmUtils = require('mvdm/vdmUtils');
const vitalUtils = require("mvdm/vitals/vitalUtils");

const VitalsService = require('./vitalsService');

process.env.gtmroutines = process.env.gtmroutines + ' ' + vdmUtils.getVdmPath();

let db, vitalsService, userId, facilityId, patientId, testVitals;

describe('testVitalsService', () => {

    beforeAll(() => {

        db = new nodem.Gtm();
        db.open();

        vitalUtils.purgeAllVitals(db);

        userId = fileman.lookupBy01(db, "200", "ALEXANDER,ROBERT").id;
        facilityId = fileman.lookupBy01(db, "4", "VISTA HEALTH CARE").id;
        patientId = fileman.lookupBy01(db, "2", "CARTER,DAVID").id;

        vitalsService = new VitalsService(db, {
            userId: userId,
            facilityId: facilityId,
            patientId: patientId
        });

        testVitals = require('./testVitals')(db, userId, facilityId);
    });

    it("Create MVDM vital - expect VDM fan out and one MVDM", () => {
        let res = vitalsService.create(testVitals.one.createArgs);

        expect(res.created).toBeDefined();

        expect(res.created.vitalType).toEqual(testVitals.one.createResult.vitalType);
        expect(res.created.value).toEqual(testVitals.one.createResult.value);
        expect(res.created.units).toEqual(testVitals.one.createResult.units);

        // Now let's get (DESCRIBE) the created MVDM vital separately
        let createdId = res.created.id; // here's its id
        let res2 = vitalsService.describe(createdId);

        expect(res2.result).toEqual(res.created);
    });

    it("Create MVDM vital with qualifiers - expect VDM fan out and one MVDM", () => {
        let res = vitalsService.create(testVitals.two.createArgs);

        expect(res.created).toBeDefined();

        expect(res.created.vitalType).toEqual(testVitals.two.createResult.vitalType);
        expect(res.created.value).toEqual(testVitals.two.createResult.value);
        expect(res.created.units).toEqual(testVitals.two.createResult.units);

        // Now let's get (DESCRIBE) the created MVDM vital separately
        let createdId = res.created.id; // here's its id
        let res2 = vitalsService.describe(createdId);

        expect(res2.result).toEqual(res.created);
    });

    afterAll(() => {
        db.close();
    });
});