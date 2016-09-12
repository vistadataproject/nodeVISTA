var rpcL = require('../../../../../VDM/prototypes/rpcL');

// rpcLModels
var rpcLModel = require('../../../../../VDM/prototypes/problems/rpcLProblemModel').rpcLModel;

// vdmModels
var vdmModel = require('../../../../../VDM/prototypes/problems/vdmProblemsModel').vdmModel;

// mvdmModels
var mvdmModel = require('../../../../../VDM/prototypes/problems/mvdmProblemsModel').mvdmModel;

// model objects for map
var problemModels = {rpcLModel: rpcLModel, vdmModel: vdmModel, mvdmModel: mvdmModel};

var isSetup = false;

function setup(db, DUZ, facilityId) {
    var user = '200-' + DUZ;
    var facility = '4-' + facilityId;

    rpcL.setDBAndModels(db, problemModels);
    rpcL.setUserAndFacility(user, facility);
}

module.exports.setup = setup;
module.exports.rpcL = rpcL;


