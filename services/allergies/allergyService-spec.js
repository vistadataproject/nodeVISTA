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
const MVDM = require('mvdm/mvdm');

//supported VDM models
const vdmModels = [].concat(
    //allergies
    require('mvdm/allergies/vdmAllergiesModel').vdmModel,
    require('mvdm/documents/vdmDocumentsModel').vdmModel,
    require('mvdm/visits/vdmVisitsModel').vdmModel
);

//supported MVDM models
const mvdmModels = [].concat(
    //allergies
    require('mvdm/allergies/mvdmAllergiesModel').mvdmModel,
    require('mvdm/documents/mvdmDocumentsModel').mvdmModel,
    require('mvdm/visits/mvdmVisitsModel').mvdmModel
);


const AllergyService = require('./allergyService');

process.env.gtmroutines = process.env.gtmroutines + ' ' + vdmUtils.getVdmPath();

let db, allergyService, userId, facilityId, patientId, testAllergies;

describe('testVitalsService', () => {

    function setDefaultPatient(patientName) {
        let patientId = fileman.lookupBy01(db, "2", patientName).id;

        //MVDM needed to create NKA assessment
        MVDM.setDefaultPatientId(patientId);

        allergyService = new AllergyService(db, {
            userId: userId,
            facilityId: facilityId,
            patientId: patientId
        });

        return allergyService;
    }

    beforeAll(() => {

        db = new nodem.Gtm();
        db.open();

        allergyUtils.purgeAllAllergies(db, true);

        userId = fileman.lookupBy01(db, "200", "ALEXANDER,ROBERT").id;
        facilityId = fileman.lookupBy01(db, "4", "VISTA HEALTH CARE").id;
        patientId = fileman.lookupBy01(db, "2", "CARTER,DAVID").id;

        VDM.setDBAndModel(db, vdmModels);
        VDM.setUserAndFacility(userId,facilityId);

        //MVDM needed to create NKA assessment
        MVDM.setModel(mvdmModels);

        allergyService = setDefaultPatient('CARTER,DAVID');

        testAllergies = require('./testAllergies')(db, userId, facilityId);
    });

    function toArgs(createInput) {
        let args = _.clone(createInput);

        if (args.reactant) {
            args.reactantId = args.reactant.id;
            args.reactantName = args.reactant.label;
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

    let p1AssessmentId, patient1;

    it("Create Observable Allergy - expect a result with default user/dates", () => {

        // allergy/document/AR before - assessment is dinumed'
        let expectedAllergyIEN = fileman.nextIEN(db, "120.8");
        let expectedDocumentIEN = fileman.nextIEN(db, "8925");
        let expectedARIEN = fileman.nextIEN(db, "120.85");

        let args = toArgs(testAllergies.observeds.one.createInput);

        // Want the defaults to kick in
        let res = allergyService.create(args);

        // 1. Allergy
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
        patient1 = res.created.patient.id;

        // 2. Allergy Assessment (dinumed' with patient)
        let mvdmAllergyAssessment;
        expect(function() { mvdmAllergyAssessment = allergyService.describe("120_86-" + res.created.patient.id.split("-")[1]).result}).not.toThrow(); // new there!
        expect(mvdmAllergyAssessment.patient.id).toEqual(res.created.patient.id);
        expect(mvdmAllergyAssessment.hasReactions).toEqual(true);
        p1AssessmentId = mvdmAllergyAssessment.id;

        // 3: Document
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

    it("Try to recreate Observable Allergy - expect to be stopped as reactant must be unique for a patient", function() {

        let args = toArgs(testAllergies.observeds.one.createInput);
        expect(function() {allergyService.create(args)}).toThrowError(/the resource already exists - checked using query/);
    });

    it("Create Second Observable Allergy - expect VDM fan out but no new assessment", function() {

        // document before
        let expectedDocumentIEN = fileman.nextIEN(db, "8925");
        let expectedARIEN = fileman.nextIEN(db, "120.85");

        // Want the defaults to kick in
        let args = toArgs(testAllergies.observeds.two.createInput);
        let res = allergyService.create(args);
        expect(res.vdmErrors).toBeUndefined();

        // expect new document
        let nextDocumentIEN = fileman.nextIEN(db, "8925");
        expect(nextDocumentIEN - 1).toEqual(expectedDocumentIEN);
        let doc;
        expect(function() { doc = allergyService.describe("8925-" + expectedDocumentIEN).result }).not.toThrow();
        expect(doc.documentType.label).toEqual("ADVERSE REACTION_ALLERGY");

        // expect new adverse reaction (as observed) in VDM (REM: not separate in MVDM)
        let nextARIEN = fileman.nextIEN(db, "120.85");
        expect(nextARIEN - 1).toEqual(expectedARIEN);
        let ar = VDM.describe("120_85-" + expectedARIEN);
        expect(ar.related_reaction.id).toEqual(res.created.id);

        // assessment unchanged - still true!
        let allergyAssessment;
        expect(function() { allergyAssessment = allergyService.describe(p1AssessmentId).result}).not.toThrow(); // new there!
        expect(allergyAssessment.hasReactions).toEqual(true);
    });

    let historicalAllergyId, lastAllergyId, patient2;

    it("Create Historical Allergy - two VDM fan out (Allergy, Assessment) as first for this patient", function() {

        allergyService = setDefaultPatient("FOURTEEN,PATIENT N");

        let nextDocumentIEN = fileman.nextIEN(db, "8925"); // won't be one as HIST doesn't get one
        let nextARIEN = fileman.nextIEN(db, "120.85");

        let historicalAllergy = testAllergies.historicals.one.createInput;

        // Before Create - no assessment for this patient
        expect(function() { mvdmAllergyAssessment = allergyService.describe("120_86-" + historicalAllergy.patient.id.split("-")[1]).result}).toThrow();

        let args = toArgs(testAllergies.historicals.one.createInput);
        let res = allergyService.create(args);

        // 1. Allergy
        expect(res.created.reactant.label).toEqual("AM114 [PENICILLINS AND BETA-LACTAM ANTIMICROBIALS]");
        expect(res.created.dateTimeEntered).toBeDefined();
        expect(res.created.enteredBy).toBeDefined();
        expect(res.created.enteredBy.id).toEqual(VDM.userId());
        expect(res.created.reactant).toBeDefined();
        // For use by VPR etc, MVDM doesn't just have label of VDM .01 for classes - it has CODE [CLASSFICATION] where CODE is .01
        // and Classification is what would usually be the label. Note that if support array for sameAss then could put code there.
        expect(res.created.reactant.label).toMatch(/[A-Z\d]+ \[/);
        expect(res.created.reactantDetails).toBeDefined();
        expect(res.created.reactantDetails.drugClasses).toBeDefined();
        expect(res.created.reactantDetails.drugClasses.length).toEqual(1);
        expect(res.created.reactantDetails.drugClasses[0].label).toMatch(/[A-Z\d]+ \[/);
        expect(res.created.reactantDetails.drugClasses[0].sameAs).toEqual("vuid:4021523"); // PENICILLINS AND BETA-LACTAM ANTIMICROBIALS
        expect(res.created.comments).toBeUndefined();
        historicalAllergyId = res.created.id;

        // 2. Assessment (new and dinumed)
        let mvdmAllergyAssessment;
        expect(function() { mvdmAllergyAssessment = allergyService.describe("120_86-" + res.created.patient.id.split("-")[1]).result}).not.toThrow(); // new there!
        expect(mvdmAllergyAssessment.hasReactions).toEqual(true);

        // 3. NO NEW DOCUMENT - historical
        expect(function() { allergyService.describe("8925-" + nextDocumentIEN) }).toThrow();

        // VDM:  No Allergy Reaction (120.85) for historical
        expect(function() { VDM.describe("120_85-" + nextARIEN)}).toThrow(); // none there!

        lastAllergyId = res.created.id; // here's its id
        patient2 = res.created.patient.id;
    });

    let patient1Allergies;

    // Two observed allergies belong to patient1 (filled in id above)
    it("List Allergies of Patient 1", function() {

        //go back to patient 1
        allergyService = setDefaultPatient("CARTER,DAVID");
        let res = allergyService.list();
        expect(res.results).toBeDefined();
        expect(res.results.length).toEqual(2);
        expect(res.results[0].id).toEqual("120_8-1");
        expect(res.results[1].id).toEqual("120_8-2");

        patient1Allergies = [res.results[0].id, res.results[1].id];

    });

    // Only ever expect 1 assessment
    it("List Assessment of Patient 1", function() {

        let res = allergyService.listAllergyAssessments();
        expect(res.results).toBeDefined();
        expect(res.results.length).toEqual(1);
        expect(res.results[0].id).toEqual(p1AssessmentId);
        expect(res.results[0].hasReactions).toEqual(true); // obviously!
    });

    // TODO: must add to remove res to see the createds (Document)
    it("Remove one allergy of patient with >1 allergy - removal works and assessment still there", function() {

        let expectedDocumentIEN = fileman.nextIEN(db, "8925"); // expect a document noting removal to be there

        let beforeDescr = allergyService.describe("120_8-1").result;
        let beforeCommentsNo = 0;
        if (beforeDescr.comments)
            beforeCommentsNo = beforeDescr.comments.length;

        // REMOVE 1
        let res = allergyService.remove("120_8-1", "he actually likes dogs and most animals");
        // check that right VDM object was created
        expect(res.removed).toBeDefined();
        expect(res.removed.isRemoved).toBeDefined();
        expect(res.removed.isRemoved).toEqual(true);

        expect(res.removed.removalDetails).toBeDefined();
        // remover is always the userId in VDM (ie/ the 'logged in user') 
        expect(res.removed.removalDetails.enteredBy.id).toEqual(VDM.userId());
        expect(res.removed.removalDetails.comment).toBeDefined();
        expect(res.removed.removalDetails.dateTimeEntered).toBeDefined();
        // Will see SAME date as entered as tests almost instantaneous
        // expect(res.removed.removalDetails.dateTimeEntered.value.split("T")[0]).toEqual(res.removed.dateTimeEntered.value.split("T")[0]);
        // didn't add comment to comments ... inside removalDetails
        if (beforeCommentsNo === 0)
            expect(res.removed.comments).not.toBeDefined();
        else
            expect(res.removed.comments.length).toEqual(beforeCommentsNo);

        // expect new document
        let nextDocumentIEN = fileman.nextIEN(db, "8925");
        expect(nextDocumentIEN - 1).toEqual(expectedDocumentIEN);
        let doc;
        expect(function() { doc = allergyService.describe("8925-" + expectedDocumentIEN).result }).not.toThrow();
        expect(doc.documentType.label).toEqual("ADVERSE REACTION_ALLERGY");
        expect(doc.text).toMatch(/This reaction was either an erroneous entry or was found to/);
        expect(doc.patient.id.split("-")[1]).toEqual(res.removed.patient.id.split("-")[1]); // must split as allergy is 2- and doc is 9000001-

        // assessment unchanged - still true!
        let mvdmAllergyAssessment;
        expect(function() { mvdmAllergyAssessment = VDM.describe(p1AssessmentId)}).not.toThrow(); // new there!
        expect(mvdmAllergyAssessment.reaction_assessment).toEqual(true);

    });

    it("Cannot reremove", function() {

        expect(function() { allergyService.remove("120_8-1", "let's remove again") }).toThrowError(/reremove/);

    });

    it("Unremove then reremove", function() {

        let unremoveComment = "didn't intend to remove";
        let res = allergyService.unremove("120_8-1", unremoveComment);
        expect(res.unremoved).toBeDefined();
        expect(res.unremoved.id).toBeDefined();
        let postDescr = allergyService.describe(res.unremoved.id).result;
        expect(postDescr.isRemoved).toBeUndefined();
        expect(postDescr.removalDetails).toBeUndefined();

        // unremove comment will go in as an OBSERVED comment in VDM 
        expect(postDescr.comments).toBeDefined();
        expect(postDescr.comments.length).toEqual(2);
        expect(postDescr.comments[1].comment).toEqual(unremoveComment);

        // remove again!
        let removeAgainComment = "oops - was right the first time. Nix it";
        res = allergyService.remove("120_8-1", removeAgainComment);
        expect(res.removed).toBeDefined();
        expect(res.removed.isRemoved).toBeDefined();
        expect(res.removed.isRemoved).toEqual(true);

        expect(res.removed.removalDetails).toBeDefined();
        expect(res.removed.removalDetails.comment).toBeDefined();
        expect(res.removed.removalDetails.comment).toEqual(removeAgainComment);

    });

    it("Can describe removed allergy by id", function() {

        let res = allergyService.describe("120_8-1");
        expect(res.result.id).toEqual("120_8-1");
        expect(res.result.isRemoved).toBeDefined();
        expect(res.result.isRemoved).toEqual(true);

        // details there and has the removed comment
        expect(res.result.removalDetails).toBeDefined();
        expect(res.result.removalDetails.comment).toBeDefined();
        expect(res.result.removalDetails.dateTimeEntered).toBeDefined();
        expect(res.result.removalDetails.enteredBy).toBeDefined();

        // has two (observed) comments now as unremove led to one
        expect(res.result.comments).toBeDefined();
        expect(res.result.comments.length).toEqual(2);
    });

    it("Remove only (remaining) allergy of patient - assessment goes", function() {

        let res = allergyService.remove("120_8-2", "he really really likes dogs and most animals");
        // check that right VDM object was created
        expect(res.removed).toBeDefined();
        expect(res.removed.isRemoved).toBeDefined();
        expect(res.removed.isRemoved).toEqual(true);

        // expect assessment to go
        expect(function() {allergyService.describe(p1AssessmentId)}).toThrowError(); // assessment gone
    });

    // Remove the historical allergy of patient2
    it("Remove historical allergy - will see a document for removal even though historical (REM: not on creation of historical)", function() {

        let expectedDocumentIEN = fileman.nextIEN(db, "8925"); // expect a document noting removal to be there

        // REMOVE 1
        let res = allergyService.remove(historicalAllergyId, "nix this historical");
        // check that right VDM object was created
        expect(res.removed).toBeDefined();
        expect(res.removed.isRemoved).toBeDefined();
        expect(res.removed.isRemoved).toEqual(true);

        expect(res.removed.removalDetails).toBeDefined();
        // remover is always the userId in VDM (ie/ the 'logged in user') 
        expect(res.removed.removalDetails.enteredBy.id).toEqual(VDM.userId());
        expect(res.removed.removalDetails.comment).toBeDefined();
        expect(res.removed.removalDetails.dateTimeEntered).toBeDefined();
        // Will see SAME date as entered as tests almost instantaneous
        // expect(res.removed.removalDetails.dateTimeEntered.value.split("T")[0]).toEqual(res.removed.dateTimeEntered.value.split("T")[0]);

        // expect new document
        let nextDocumentIEN = fileman.nextIEN(db, "8925");
        expect(nextDocumentIEN - 1).toEqual(expectedDocumentIEN);
        let doc;
        expect(function() { doc = allergyService.describe("8925-" + expectedDocumentIEN).result }).not.toThrow();
        expect(doc.documentType.label).toEqual("ADVERSE REACTION_ALLERGY");
        expect(doc.text).toMatch(/This reaction was either an erroneous entry or was found to/);
        expect(doc.patient.id.split("-")[1]).toEqual(res.removed.patient.id.split("-")[1]); // must split as allergy is 2- and doc is 9000001-

    });

    // Only allergy of patient was removed => patient 1 has no allergies
    // NOTE: this will change with NKA letiations
    it("List Allergies of patient with only removed allergies - show no allergies", function() {

        let res = allergyService.list("Allergy");
        expect(res.results).toBeDefined();
        expect(res.results.length).toEqual(0);

    });

    it("List Assessment of patient with only removed allergies - none appears", function() {

        let res = allergyService.listAllergyAssessments();
        expect(res.results).toBeDefined();
        expect(res.results.length).toEqual(0);

    });

    // TODO: gotta error out NKA if there are active allergies
    it("Explicitly create NKA assessment for Patient - removed allergies don't interfere", function() {

        let res = MVDM.create({
            "type": "AllergyAssessment",
            "patient": {"id": patient1},
            "hasReactions": false // could leave out as default is false
        });

        expect(res.created.type).toEqual("AllergyAssessment");
        expect(res.created.hasReactions).toEqual(false);
        p1AssessmentId = res.created.id;
        expect(p1AssessmentId.split("-")[1]).toEqual(patient1.split("-")[1]); // dinumed to patient

    });

    let bandCommentTestAllergy;
    // patient1
    it("Give NKA Patient an Allergy - assessment will go to true", function() {

        // same one as before (not doing 'unremove allergy' - may add support
        let args = toArgs(testAllergies.observeds.two.createInput);
        let res = allergyService.create(args);
        expect(res.created).toBeDefined();
        bandCommentTestAllergy = res.created.id;

        // and explicitly
        let assRes = allergyService.describe("120_86-" + res.created.patient.id.split("-")[1]);
        expect(assRes.result.hasReactions).toEqual(true);
    });

    // 120.82 Allergy - D Ascorbic Acid - 120_82-53, a D term with many ingredients (50.416) and classes
    it("Create Historical 120.8 D Allergy whose definition has many ingredients and classes (IN/CLASS fan out test)", function() {

        // back to david!
        let args = toArgs(testAllergies.historicals.two.createInput);
        let res = allergyService.create(args); // patient1 again

        expect(res.created).toBeDefined();
        expect(res.created.dateTimeEntered).toBeDefined();
        expect(res.created.enteredBy).toBeDefined();
        expect(res.created.enteredBy.id).toEqual(VDM.userId());
        expect(res.created.enteredAtFacility).toBeDefined();
        expect(res.created.enteredAtFacility.id).toEqual(VDM.facilityId());

        expect(res.created.reactantDetails.drugIngredients).toBeDefined();
        expect(res.created.reactantDetails.drugIngredients.length).toEqual(4);
        expect(res.created.reactantDetails.drugClasses).toBeDefined();
        expect(res.created.reactantDetails.drugClasses.length).toEqual(5);

    });
    
    afterAll(() => {
        db.close();
    });
});