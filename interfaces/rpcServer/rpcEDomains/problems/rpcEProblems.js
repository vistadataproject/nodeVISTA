var rpcE = require('../../../../../VDM/prototypes/rpcE');

// rpcEModels
var rpcEProblemModel = require('../../../../../VDM/prototypes/problems/rpcEProblemModel').rpcEModel;

// vdmModels
var vdmProblemModel = require('../../../../../VDM/prototypes/problems/vdmProblemsModel').vdmModel;

// mvdmModels
var mvdmProblemModel = require('../../../../../VDM/prototypes/problems/mvdmProblemsModel').mvdmModel;

// model objects for map
var problemModels = {rpcEModel: rpcEProblemModel, vdmModel: vdmProblemModel, mvdmModel: mvdmProblemModel};

function setup(db, DUZ, facilityId) {
    var user = '200-' + DUZ;
    var facility = '4-' + facilityId;

    rpcE.setDBAndModels(db, problemModels);
    rpcE.setUserAndFacility(user, facility); // note that 4-2957 would come from 200-55 if left out
}

module.exports.setup = setup;
module.exports.rpcE = rpcE;


