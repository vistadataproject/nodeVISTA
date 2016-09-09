var VDM = require('../../../VDM/prototypes/vdm');
var MVDM = require('../../../VDM/prototypes/mvdm');
var vprE = require('../../../VDM/prototypes/vprEmulate/vprE');
var rpcL = require('../../../VDM/prototypes/rpcL');

var vdmModelProblem = require('../../../VDM/prototypes/problems/vdmProblemsModel').vdmModel;
var vdmModelVitals = require('../../../VDM/prototypes/vitals/vdmVitalsModel').vdmModel;
var rpcLProblemModel = require('../../../VDM/prototypes/problems/rpcLProblemModel').rpcLModel;

var vdmUtils = require("../../../VDM/prototypes/vdmUtils");

var allergyModel = require('../../../VDM/prototypes/allergies/vdmAllergiesModel').vdmModel;
var documentModel = require('../../../VDM/prototypes/documents/vdmDocumentsModel').vdmModel;
var visitModel = require('../../../VDM/prototypes/visits/vdmVisitsModel').vdmModel;
var vdmModelAllergy = allergyModel.concat(documentModel, visitModel);

var vprProblemEmulator = require('../../../VDM/prototypes/vprEmulate/vprProblemEmulator');
var mvdmModelProblem = require('../../../VDM/prototypes/problems/mvdmProblemsModel').mvdmModel;

var vprVitalsEmulator = require('../../../VDM/prototypes/vprEmulate/vprVitalsEmulator');
var vitalUtils = require('../../../VDM/prototypes/vitals/vitalUtils');
var mvdmModelVitals = require('../../../VDM/prototypes/vitals/mvdmVitalsModel').mvdmModel;

var vprAllergyEmulator = require('../../../VDM/prototypes/vprEmulate/vprAllergyEmulator');
var mvdmModelAllergy = require('../../../VDM/prototypes/allergies/mvdmAllergiesModel').mvdmModel;
var allergyUtils = require("../../../VDM/prototypes/allergies/allergyUtils");

var rpcLAllergyMappings = require('../../../VDM/prototypes/allergies/rpcAllergiesLocker');
var rpcVitalEmulate = require('../../../VDM/prototypes/vitals/rpcVitalLocker');


function LockerModelUtils(config) {
    if (config !== undefined && config.USER.DUZ !== undefined && config.FACILITY.ID !== undefined) {
        this.CONFIG = config;
    } else {
        this.CONFIG = require('./cfg/config.js');
    }
}

LockerModelUtils.prototype.setModels = function(domain) {
    if (domain === 'allergy') {
        VDM.setDBAndModel(db, vdmModelAllergy);
        VDM.setUserAndFacility("200-55", "4-2957"); // note that 4-2957 would come from 200-55 if left out
        MVDM.setModel(mvdmModelAllergy);
        vprE.setVprMappings(vprAllergyEmulator, '1.05');
        // Note: allergy doesn't note the facility, just the user logged in but can get it (need for full creation events)
        // VDM.setUserAndFacility("200-" + DUZ, "4-" + facilityCode);
        rpcL.setRpcMappings(rpcLAllergyMappings);

    } else if (domain === 'problem') {
        VDM.setDBAndModel(db, vdmModelProblem);
        VDM.setUserAndFacility("200-55", "4-2957"); // note that 4-2957 would come from 200-55 if left out

        MVDM.setModel(mvdmModelProblem);
        vprE.setVprMappings(vprProblemEmulator, '1.05');

        rpcL.setDBAndModels(db, {
            rpcLModel: rpcLProblemModel,
            vdmModel: vdmModelProblem,
            mvdmModel: mvdmModelProblem
        });
        rpcL.setUserAndFacility("200-" + this.CONFIG.USER.DUZ, "4-" + this.CONFIG.FACILITY.ID); // note that 4-2957 would come from 200-55 if left out

    } else if (domain === 'vitals') {
        VDM.setDBAndModel(db, vdmModelVitals);
        VDM.setUserAndFacility("200-55", "4-2957"); // note that 4-2957 would come from 200-55 if left out
        MVDM.setModel(mvdmModelVitals);
        vprE.setVprMappings(vprVitalsEmulator, '1.05');
        rpcL.setRpcMappings(rpcVitalEmulate.rpcMappings);
    }
}

module.exports = LockerModelUtils;