var rpcL = require('../../../../../VDM/prototypes/rpcL');
var _ = require('underscore');

// rpcLModels
var rpcLModel = require('../../../../../VDM/prototypes/allergies/rpcLAllergiesModel').rpcLModel;

// vdmModels
var allergyModel = require('../../../../../VDM/prototypes/allergies/vdmAllergiesModel').vdmModel;
var documentModel = require('../../../../../VDM/prototypes/documents/vdmDocumentsModel').vdmModel;
var visitModel = require('../../../../../VDM/prototypes/visits/vdmVisitsModel').vdmModel;
var vdmModel = allergyModel.concat(documentModel, visitModel);
console.log("\n\n\nVDM for MVDM allergy tests has classes %j\n\n\n", _.map(vdmModel, function(value) {
   return value.id;
}));

// mvdmModels
var mAllergyModel = require('../../../../../VDM/prototypes/allergies/mvdmAllergiesModel').mvdmModel;
var mDocumentModel = require('../../../../../VDM/prototypes/documents/mvdmDocumentsModel').mvdmModel;
var mvdmModel = mAllergyModel.concat(mDocumentModel);

// model objects for map
var allergyModels = {rpcLModel: rpcLModel, vdmModel: vdmModel, mvdmModel: mvdmModel};

function setup(db, DUZ, facilityId) {
   var user = '200-' + DUZ;
   var facility = '4-' + facilityId;

   rpcL.setDBAndModels(db, allergyModels);
   rpcL.setUserAndFacility(user, facility);
}

module.exports.setup = setup;
module.exports.rpcL = rpcL;


