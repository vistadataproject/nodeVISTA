#!/usr/bin/env node

'use strict';

/*
 * Basic setup
 */
var _ = require('underscore');
var testVitals;
var moment = require('moment');
var nodem = require('nodem');
var fileman = require('mvdm/fileman');
var vdmUtils = require('mvdm/vdmUtils');
var vitalUtils = require("mvdm/vitals/vitalUtils");

var VitalsService = require('./vitalsService');

process.env.gtmroutines = process.env.gtmroutines + ' ' + vdmUtils.getVdmPath();

var db, vitalsService, userId, facilityId, patientId;

describe('testVitalsService', function () {

    beforeAll(function () {

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

    it("Create MVDM vital - expect VDM fan out and one MVDM", function() {
        var res = vitalsService.create(testVitals.one.createArgs);

        expect(res.created).toBeDefined();

        expect(res.created.vitalType).toEqual(testVitals.one.createResult.vitalType);
        expect(res.created.value).toEqual(testVitals.one.createResult.value);
        expect(res.created.units).toEqual(testVitals.one.createResult.units);

        // Now let's get (DESCRIBE) the created MVDM vital separately
        var createdId = res.created.id; // here's its id
        var res2 = vitalsService.describe(createdId);

        expect(res2.result).toEqual(res.created);
    });

    it("Create MVDM vital with qualifiers - expect VDM fan out and one MVDM", function() {
        var res = vitalsService.create(testVitals.two.createArgs);

        expect(res.created).toBeDefined();

        expect(res.created.vitalType).toEqual(testVitals.two.createResult.vitalType);
        expect(res.created.value).toEqual(testVitals.two.createResult.value);
        expect(res.created.units).toEqual(testVitals.two.createResult.units);

        // Now let's get (DESCRIBE) the created MVDM vital separately
        var createdId = res.created.id; // here's its id
        var res2 = vitalsService.describe(createdId);

        expect(res2.result).toEqual(res.created);
    });

    afterAll(function () {
        db.close();
    });
});