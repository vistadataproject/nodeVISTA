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
const allergyUtils = require("mvdm/allergies/allergyUtils");
const VDM = require('mvdm/vdm');

//supported VDM models
const vdmModels = [].concat(
    //allergies
    require('mvdm/allergies/vdmAllergiesModel').vdmModel,
    require('mvdm/documents/vdmDocumentsModel').vdmModel,
    require('mvdm/visits/vdmVisitsModel').vdmModel
);


const AllergyService = require('./allergyService');

process.env.gtmroutines = process.env.gtmroutines + ' ' + vdmUtils.getVdmPath();

let db, allergyService, userId, facilityId, patientId, testAllergies;

describe('testVitalsService', () => {

    beforeAll(() => {

        db = new nodem.Gtm();
        db.open();

        allergyUtils.purgeAllAllergies(db, true);

        userId = fileman.lookupBy01(db, "200", "ALEXANDER,ROBERT").id;
        facilityId = fileman.lookupBy01(db, "4", "VISTA HEALTH CARE").id;
        patientId = fileman.lookupBy01(db, "2", "CARTER,DAVID").id;

        allergyService = new AllergyService(db, {
            userId: userId,
            facilityId: facilityId,
            patientId: patientId
        });

        VDM.setDBAndModel(db, vdmModels);
        VDM.setUserAndFacility(userId,facilityId);

        testAllergies = require('./testAllergies')(db, userId, facilityId);
    });

    function toArgs(createInput) {
        let args = _.clone(createInput);

        if (args.reactant) {
            args.reactantId = args.reactant.id;
            args.reactantName = args.reactantName;
        }

        if (args.reactions) {
            let reactions = [];
            args.reactions.forEach(reaction => {
                reactions.push(reaction.reaction.id);
            });

            args.reactions = reactions;
        }

        if (args.dateOccurred) {
            args.dateOccurred = args.dateOccurred.value;
        }

        return args;
    }

    it("Create Observable Allergy - expect a result with default user/dates", () => {

        // allergy/document/AR before - assessment is dinumed'
        let expectedAllergyIEN = fileman.nextIEN(db, "120.8");
        let expectedDocumentIEN = fileman.nextIEN(db, "8925");
        let expectedARIEN = fileman.nextIEN(db, "120.85");

        let args = toArgs(testAllergies.observeds.one.createInput);

        // Want the defaults to kick in
        let res = allergyService.create(args);

        // MVDM 1. Allergy
        expect(res.created).toBeDefined();
        // defaulted
        expect(res.created.dateTimeEntered).toBeDefined();
        expect(res.created.enteredBy).toBeDefined();
        expect(res.created.enteredBy.id).toEqual(userId);
        // only in create as facility not stored in VDM. This means VPR must hard code it
        expect(res.created.enteredAtFacility).toBeDefined();
        expect(res.created.enteredAtFacility.id).toEqual(facilityId);
        expect(res.created.comments).toBeDefined();
        expect(res.created.comments.length).toEqual(1);
        expect(res.created.comments[0].dateTimeEntered).toBeDefined();
        expect(res.created.comments[0].enteredBy).toBeDefined();
        expect(res.created.comments[0].enteredBy.id).toEqual(VDM.userId());
        expect(res.created.comments[0].comment).toBeDefined();
        let patient1 = res.created.patient.id;

        // MVDM 2. Allergy Assessment (dinumed' with patient)
        let mvdmAllergyAssessment;
        expect(function() { mvdmAllergyAssessment = allergyService.describe("120_86-" + res.created.patient.id.split("-")[1]).result}).not.toThrow(); // new there!
        expect(mvdmAllergyAssessment.patient.id).toEqual(res.created.patient.id);
        expect(mvdmAllergyAssessment.hasReactions).toEqual(true);
        let p1AssessmentId = mvdmAllergyAssessment.id;

        // MVDM 3: Document
        let nextDocumentIEN = fileman.nextIEN(db, "8925");
        expect(nextDocumentIEN - 1).toEqual(expectedDocumentIEN);
        let doc = allergyService.describe("8925-" + expectedDocumentIEN).result;
        expect(doc.documentType.label).toEqual("ADVERSE REACTION_ALLERGY");
        expect(doc.patient.id.split("-")[1]).toEqual(res.created.patient.id.split("-")[1]); // must split as allergy is 2- and doc is 9000001-
        expect(doc.text).toMatch(/This patient has the following reactions/);

        // VDM 1. Allergy
        let vdmAllergy;
        expect(function() { vdmAllergy = VDM.describe("120_8-" + expectedAllergyIEN)}).not.toThrow(); // new there!
        expect(vdmAllergy.drug_ingredients).toBeDefined(); // side effect creation
        expect(vdmAllergy.chart_marked).toBeDefined(); // side effet VDM only
        expect(vdmAllergy.verifier).toBeUndefined(); // doesn't add verifier as not set in CPRS either
        expect(vdmAllergy.verified).toBeDefined(); // verified there
        expect(vdmAllergy.verification_date_time).toBeDefined(); // verified date there
        expect(vdmAllergy.allergy_type).toEqual("DF");
        expect(vdmAllergy.comments).toBeDefined();
        expect(vdmAllergy.comments.length).toEqual(1);
        expect(vdmAllergy.comments[0].comment_type).toBeDefined();
        expect(vdmAllergy.comments[0].comment_type).toEqual("OBSERVED"); // VDM types comments - MVDM doesn't

        // VDM 2. Allergy Reaction
        let vdmAllergyReaction; // vdm does two objects to MVDM's one
        expect(function() { vdmAllergyReaction = VDM.describe("120_85-" + expectedARIEN)}).not.toThrow(); // new there!
        expect(vdmAllergyReaction.related_reaction.id).toEqual(vdmAllergy.id); // pts back to VDM allergy
        // want xsd:date plain
        expect(vdmAllergyReaction.date_time_of_event.type).toEqual("xsd:date");
        expect(vdmAllergyReaction.allergySeverity).toEqual(res.created.severity); // severity in MVDM comes from this VDM
    });

    afterAll(() => {
        db.close();
    });
});