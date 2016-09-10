var rpcL = require('../../../../../VDM/prototypes/rpcL');

// rpcLModels
var rpcLModel = require('../../../../../VDM/prototypes/allergies/rpcLAllergiesModel').rpcLModel;

// vdmModels
var vdmModel = require('../../../../../VDM/prototypes/allergies/vdmAllergiesModel').vdmModel;

// mvdmModels
var mvdmModel = require('../../../../../VDM/prototypes/allergies/mvdmAllergiesModel').mvdmModel;

// model objects for map
var allergyModels = {rpcLModel: rpcLModel, vdmModel: vdmModel, mvdmModel: mvdmModel};

var isSetup = false;

function setup(db, DUZ, facilityId) {
   if (!isSetup) {
      var user = '200-' + DUZ;
      var facility = '4-' + facilityId;

      rpcL.setDBAndModels(db, allergyModels);
      rpcL.setUserAndFacility(user, facility); // note that 4-2957 would come from 200-55 if left out

      isSetup = true;
   }
}

module.exports.setup = setup;
module.exports.rpcL = rpcL;


