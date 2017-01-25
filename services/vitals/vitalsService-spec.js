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

    it("Create MVDM vital with qualifiers - expect VDM fan out and one MVDM", done => {

        //listen for vitalsService MVDM create event
        let createRes, _userId, _facilityId, eventTimestamp;

        let SpyObj = { //dummy spy object
            createSpy: () => {
                //method used to test whether vitalsService's MVDM 'create' event was called.
            }
        };

        spyOn(SpyObj, 'createSpy');

        vitalsService.once('create', res => {
            createRes = res.data;
            _userId = res.user.id;
            _facilityId = res.facility.id;
            eventTimestamp = res.timestamp;
            SpyObj.createSpy();
        });

        vitalsService.create(testVitals.two.createArgs);

        _.delay(() => {
            expect(SpyObj.createSpy).toHaveBeenCalled();
            expect(SpyObj.createSpy.calls.count()).toEqual(1);
            expect(SpyObj.createSpy.calls.count()).not.toEqual(2);

            expect(_userId).toEqual(userId);
            expect(_facilityId).toEqual(facilityId);
            expect(eventTimestamp).toMatch(/20\d\d-\d\d-\d\dT/);

            expect(createRes.created).toBeDefined();

            expect(createRes.created.vitalType).toEqual(testVitals.two.createResult.vitalType);
            expect(createRes.created.value).toEqual(testVitals.two.createResult.value);
            expect(createRes.created.units).toEqual(testVitals.two.createResult.units);

            // Now let's get (DESCRIBE) the created MVDM vital separately
            let createdId = createRes.created.id; // here's its id
            let res2 = vitalsService.describe(createdId);

            done();
        }, 100);
    });

    it('Test supplemental vital data - blood pressure', () => {

        let vital = _.clone(testVitals.one.createArgs);

        vital.vitalType = "120_51-1";

        vital.value = '120/80';

        let res = vitalsService.create(vital);
        expect(res.created).toBeDefined();

        expect(res.created.vitalType.label).toEqual('BLOOD PRESSURE');
        expect(res.created.units).toBeDefined();
        expect(res.created.units).toEqual('mm[Hg]');
        expect(res.created.high).toBeDefined();
        expect(res.created.low).toBeDefined();
    });

    it('Test supplemental vital data - temperature', () => {
        let vital = _.clone(testVitals.one.createArgs);

        vital.vitalType = "120_51-2";

        vital.value = '98.6';

        let res = vitalsService.create(vital);

        expect(res.created).toBeDefined();

        expect(res.created.vitalType.label).toEqual('TEMPERATURE');
        expect(res.created.units).toBeDefined();
        expect(res.created.units).toEqual('F');
        expect(res.created.high).toBeDefined();
        expect(res.created.low).toBeDefined();
        expect(res.created.metricUnits).toBeDefined();
        expect(res.created.metricUnits).toEqual('C');
        expect(res.created.metricValue).toBeDefined();
        expect(res.created.metricValue).toEqual('37');
    });

    it ('Test supplemental vital data - respiration', () => {
        let vital = _.clone(testVitals.one.createArgs);

        vital.vitalType = "120_51-3";

        vital.value = '35';

        let res = vitalsService.create(vital);
        expect(res.created).toBeDefined();

        expect(res.created.vitalType.label).toEqual('RESPIRATION');
        expect(res.created.units).toBeDefined();
        expect(res.created.units).toEqual('/min');
        expect(res.created.high).toBeDefined();
        expect(res.created.low).toBeDefined();
    });

    it ('Test supplemental vital data - pulse', () => {
        let vital = _.clone(testVitals.one.createArgs);

        vital.vitalType = "120_51-5";

        vital.value = '80';

        let res = vitalsService.create(vital);
        expect(res.created).toBeDefined();

        expect(res.created.vitalType.label).toEqual('PULSE');
        expect(res.created.units).toBeDefined();
        expect(res.created.units).toEqual('/min');
        expect(res.created.high).toBeDefined();
        expect(res.created.low).toBeDefined();
    });

    it ('Test supplemental vital data - height', () => {
        let vital = _.clone(testVitals.one.createArgs);

        vital.vitalType = "120_51-8";

        vital.value = '70';

        let res = vitalsService.create(vital);
        expect(res.created).toBeDefined();

        expect(res.created.vitalType.label).toEqual('HEIGHT');
        expect(res.created.units).toBeDefined();
        expect(res.created.units).toEqual('in');
        //no high and low values
        expect(res.created.high).toBeUndefined();
        expect(res.created.low).toBeUndefined();

        expect(res.created.metricUnits).toBeDefined();
        expect(res.created.metricUnits).toEqual('cm');
        expect(res.created.metricValue).toBeDefined();
        expect(res.created.metricValue).toEqual('177.8');
    });

    it ('Test supplemental vital data - weight', () => {
        let vital = _.clone(testVitals.one.createArgs);

        vital.vitalType = "120_51-9";

        vital.value = '175';

        let res = vitalsService.create(vital);
        expect(res.created).toBeDefined();

        expect(res.created.vitalType.label).toEqual('WEIGHT');
        expect(res.created.units).toBeDefined();
        expect(res.created.units).toEqual('lb');
        //no high and low values
        expect(res.created.high).toBeUndefined();
        expect(res.created.low).toBeUndefined();

        expect(res.created.metricUnits).toBeDefined();
        expect(res.created.metricUnits).toEqual('kg');
        expect(res.created.metricValue).toBeDefined();
        expect(res.created.metricValue).toEqual('79.55');
    });

    it ('Test supplemental vital data - CVP', () => {
        let vital = _.clone(testVitals.one.createArgs);

        vital.vitalType = "120_51-19";

        vital.value = '6';

        let res = vitalsService.create(vital);
        expect(res.created).toBeDefined();

        expect(res.created.vitalType.label).toEqual('CENTRAL VENOUS PRESSURE');
        expect(res.created.units).toBeDefined();
        expect(res.created.units).toEqual('cmH20');
        //no high and low values
        expect(res.created.high).toBeUndefined();
        expect(res.created.low).toBeUndefined();
    });

    it ('Test supplemental vital data - CG', () => {
        let vital = _.clone(testVitals.one.createArgs);

        vital.vitalType = "120_51-20";

        vital.value = '38';

        let res = vitalsService.create(vital);

        expect(res.created).toBeDefined();

        expect(res.created.vitalType.label).toEqual('CIRCUMFERENCE_GIRTH');
        expect(res.created.units).toBeDefined();
        expect(res.created.units).toEqual('in');
        //no high and low values
        expect(res.created.high).toBeUndefined();
        expect(res.created.low).toBeUndefined();

        expect(res.created.metricUnits).toBeDefined();
        expect(res.created.metricUnits).toEqual('cm');
        expect(res.created.metricValue).toBeDefined();
        expect(res.created.metricValue).toEqual('96.52');
    });

    it ('Test supplemental vital data - PULSE OXIMETRY', () => {
        let vital = _.clone(testVitals.one.createArgs);

        vital.vitalType = "120_51-21";

        vital.value = '96';

        let res = vitalsService.create(vital);
        expect(res.created).toBeDefined();

        expect(res.created.vitalType.label).toEqual('PULSE OXIMETRY');
        expect(res.created.units).toBeDefined();
        expect(res.created.units).toEqual('%');
        //no high and low values
        expect(res.created.high).toBeUndefined();
        expect(res.created.low).toBeUndefined();
    });

    it ('Test supplemental vital data - no supplemental data (PAIN)', () => {
        let vital = _.clone(testVitals.one.createArgs);

        vital.vitalType = "120_51-22";

        vital.value = '6';

        let res = vitalsService.create(vital);
        expect(res.created).toBeDefined();

        expect(res.created.vitalType.label).toEqual('PAIN');
        expect(res.created.units).toBeUndefined();
        expect(res.created.high).toBeUndefined();
        expect(res.created.low).toBeUndefined();
    });

    it('List most recent vitals', () => {
        //add an additional blood pressure vital

        let vital = _.clone(testVitals.one.createArgs);

        vital.vitalType = "120_51-1";

        vital.value = '120/80';

        let res = vitalsService.create(vital);

        expect(res.created).toBeDefined();

        res = vitalsService.getMostRecentVitals();

        expect(res.results).toBeDefined();
        expect(res.results.length).toEqual(10);

        //ensure that vitals are only the most recent (no duplicate types)
        let recentVitals = [];
        res.results.forEach(vital => {
            recentVitals.forEach(recentVital => {
                expect(recentVital).not.toEqual(vital.vitalType.id);
            });

            recentVitals.push(vital);
        });
    });

    it ('List most recent vitals from a given date range', () => {
        let vital = _.clone(testVitals.one.createArgs);

        vital.vitalsTakenDateTime = new Date('2016-01-01').toISOString().substr(0,19) + "Z";

        let createRes = vitalsService.create(vital);

        expect(createRes.created).toBeDefined();

        let res = vitalsService.getMostRecentVitals(new Date('2016-01-01'), new Date('2016-12-01'));

        expect(res.results).toBeDefined();
        expect(res.results.length).toEqual(1);
        expect(res.results[0].vitalType.id).toEqual(createRes.created.vitalType.id);
    });

    it('List most recent vitals from a date range, start date is missing', () => {
        let vital = _.clone(testVitals.one.createArgs);

        vital.vitalsTakenDateTime = new Date('2006-01-01').toISOString().substr(0,19) + "Z";

        let createRes = vitalsService.create(vital);

        //leave out start date
        let res = vitalsService.getMostRecentVitals(null, new Date('2015-01-01'));

        expect(res.results).toBeDefined();
        expect(res.results.length).toEqual(1);
        expect(res.results[0].vitalsTakenDateTime.value).toEqual('2006-01-01');
    });

    let patientOneVitalId;

    // Only one vital belongs to 2-1
    it("List Vitals of Patient 1", () => {

        let vital = _.clone(testVitals.one.createArgs);

        vitalsService = new VitalsService(db, {
            userId: userId,
            facilityId: facilityId,
            patientId: '2-1'
        });

        let res = vitalsService.create(vital);

        expect(res.created).toBeDefined();

        patientOneVitalId = res.created.id;

        res = vitalsService.list();

        expect(res.results).toBeDefined();
        expect(res.results.length).toEqual(1);
        expect(res.results[0].id).toEqual(patientOneVitalId);

    });

    // Remove one vital => only one now shows in LIST
    it("Remove only vital of patient 1", () => {
        // relying on default 'logged in' user
        let res = vitalsService.remove(patientOneVitalId, "INVALID RECORD");

        // check that right VDM object was created
        expect(res.removed).toBeDefined();
        expect(res.removed.isRemoved).toBeDefined();
        expect(res.removed.isRemoved).toEqual(true);

        expect(res.removed.removalDetails).toBeDefined();
        expect(res.removed.removalDetails.comment).toBeDefined();
    });

    it("Can describe removed vital by id", () => {

        let res = vitalsService.describe(patientOneVitalId);
        expect(res.result.id).toEqual(patientOneVitalId);
        expect(res.result.isRemoved).toBeDefined();
        expect(res.result.isRemoved).toEqual(true);

        // details there and has the removed comment
        expect(res.result.removalDetails).toBeDefined();
        expect(res.result.removalDetails.comment).toBeDefined();
    });

    it("List Vitals of Patient 1 who now has no (non removed) vitals", () => {

        let res = vitalsService.list();
        expect(res.results).toBeDefined();
        expect(res.results.length).toEqual(0);
    });


    afterAll(() => {
        db.close();
    });
});