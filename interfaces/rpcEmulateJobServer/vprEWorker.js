var _ = require('underscore');
var util = require('util');
var nodem = require('nodem');
var VDM = require('../../prototypes/vdm');
var mvdmModel = require('../../prototypes/allergies/mvdmAllergiesModel').mvdmModel;
var MVDM = require('../../prototypes/mvdm');
var testAllergies = require('../../prototypes/allergies/vdmTestAllergies'); // want to use test allergies
var allergyUtils = require("../../prototypes/allergies/allergyUtils");
var localRPCRunner = require('../../prototypes/localRPCRunner');
var vprE = require('../../prototypes/vprEmulate/vprE');
var vprAllergyEmulator = require('../../prototypes/vprEmulate/vprAllergyEmulator');

var fs = require('fs');
var os = require("os");
var fileman = require('../../prototypes/fileman');
var vdmUtils = require("../../prototypes/vdmUtils");

var db; // for afterAll

var vprDataVersion; // for XML vs JSON

var DUZ;

var allergyModel = require('../../prototypes/allergies/vdmAllergiesModel').vdmModel;
var documentModel = require('../../prototypes/documents/vdmDocumentsModel').vdmModel;
var visitModel = require('../../prototypes/visits/vdmVisitsModel').vdmModel;
var vdmModel = allergyModel.concat(documentModel, visitModel);
console.log("\nVDM for MVDM allergy tests has classes %j\n", _.map(vdmModel, function(value) {
    return value.id;
}));

process.env.gtmroutines = process.env.gtmroutines + ' ..'; // make VDP MUMPS available

db = new nodem.Gtm();
db.open();
VDM.setDBAndModel(db, vdmModel);

MVDM.setModel(mvdmModel);

DUZ = 55; // Should match Robert Alexander used in JSON tests but may not.

// allergyUtils.purgeAllAllergies(db); // want to start with no allergy info in there (includes TIU).

// vprDataVersion = localRPCRunner.run(db, DUZ, "VPR DATA VERSION", []).result; // 1.05
vprE.setVprMappings(vprAllergyEmulator);

module.exports = function() {

    this.on('message', function(messageObj, send, finished) {
        console.log(messageObj);
        var application = messageObj.application;
        var domain = messageObj.expressType;
        var patient = messageObj.query.patient;
        var ien = messageObj.query.ien;
        if (application === 'vpr') {
            var res = vprE.queryXML(db, patient, domain, ien);
        }
        res = '<textarea rows="60" cols="140" style="border:none;">' + res + '</textarea>';
        finished(res);
    });

};