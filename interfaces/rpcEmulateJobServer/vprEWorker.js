var _ = require('underscore');
var util = require('util');
var nodem = require('nodem');
var VDM = require('../../prototypes/vdm');
var mvdmModelAllergy = require('../../prototypes/allergies/mvdmAllergiesModel').mvdmModel;
var MVDM = require('../../prototypes/mvdm');
var testAllergies = require('../../prototypes/allergies/vdmTestAllergies'); // want to use test allergies
var allergyUtils = require("../../prototypes/allergies/allergyUtils");
var localRPCRunner = require('../../prototypes/localRPCRunner');
var vprE = require('../../prototypes/vprEmulate/vprE');
var vprAllergyEmulator = require('../../prototypes/vprEmulate/vprAllergyEmulator');
var problemUtils = require('../../prototypes/problems/problemUtils');
var mvdmModelProblem = require('../../prototypes/problems/mvdmProblemsModel').mvdmModel;
var vprProblemEmulator = require('../../prototypes/vprEmulate/vprProblemEmulator');
var vitalUtils = require('../../prototypes/vitals/vitalUtils');
var mvdmModelVitals = require('../../prototypes/vitals/mvdmVitalsModel').mvdmModel;
var vprVitalsEmulator = require('../../prototypes/vprEmulate/vprVitalsEmulator');

var fs = require('fs');
var os = require("os");
var fileman = require('../../prototypes/fileman');
var vdmUtils = require("../../prototypes/vdmUtils");
process.env.gtmroutines = process.env.gtmroutines + '../../prototypes'; // make VDP MUMPS available
var db; // for afterAll
db = new nodem.Gtm();
db.open();
var vprDataVersion; // for XML vs JSON
var allergyModel = require('../../prototypes/allergies/vdmAllergiesModel').vdmModel;
var documentModel = require('../../prototypes/documents/vdmDocumentsModel').vdmModel;
var visitModel = require('../../prototypes/visits/vdmVisitsModel').vdmModel;
var vdmModelAllergy = allergyModel.concat(documentModel, visitModel);
var testProblems = require('../../prototypes/problems/vdmTestProblems')(db);
var vdmModelProblem = require('../../prototypes/problems/vdmProblemsModel').vdmModel;
var vdmModelVitals = require('../../prototypes/vitals/vdmVitalsModel').vdmModel;
var testVitals = require('../../prototypes/vitals/vdmTestVitals')(db);
var DUZ = 55; // Should match Robert Alexander used in JSON tests but may not.


var rpcE = require('../../prototypes/rpcE');
var rpcEAllergyMappings = require('../../prototypes/allergies/rpcAllergiesEmulate');
var rpcProblemEmulate = require('../../prototypes/problems/rpcProblemEmulate');
var rpcVitalEmulate = require('../../prototypes/vitals/rpcVitalEmulate');

function setModels(domain) {
    if (domain === 'allergy') {
        VDM.setDBAndModel(db, vdmModelAllergy);
        MVDM.setModel(mvdmModelAllergy);
        vprE.setVprMappings(vprAllergyEmulator);
        // Note: allergy doesn't note the facility, just the user logged in but can get it (need for full creation events)
        VDM.setUserAndFacility("200-" + parseInt(DUZ));
        rpcE.setRpcMappings(rpcEAllergyMappings);

    } else if (domain === 'problem') {
        VDM.setDBAndModel(db, vdmModelProblem);
        MVDM.setModel(mvdmModelProblem);
        vprE.setVprMappings(vprProblemEmulator);
        rpcE.setRpcMappings(rpcProblemEmulate.rpcMappings(db));
    } else if (domain === 'vitals') {
        VDM.setDBAndModel(db, vdmModelVitals);
        MVDM.setModel(mvdmModelVitals);
        vprE.setVprMappings(vprVitalsEmulator);
        rpcE.setRpcMappings(rpcVitalEmulate.rpcMappings);
    }
}

module.exports = function() {

    this.on('message', function(messageObj, send, finished) {
        console.log(messageObj);
        var application = messageObj.application;
        var domain = messageObj.expressType;
        var patient = messageObj.query.patient;
        var ien = messageObj.query.ien;
        setModels(domain);
        if (application === 'vpr') {
            var res = vprE.queryXML(db, patient, domain, ien);
            res = '<textarea rows="60" cols="140" style="border:none;">' + res + '</textarea>';
        } else if (application === 'rpc') {
            var rpc = messageObj.query.rpc; //'ORQQAL DETAIL', ORQQPL DETAIL
            if (!rpcE.isRPCSupported(rpc)) {
                //run local rpc
                var rpcArgs = messageObj.query.rpcArgs.split(',');
                try {
                    var res = localRPCRunner.run(db, DUZ, rpc, rpcArgs);
                    res = res.result.join('\n');
                } catch (exception) {
                    res = 'RPC not supported.';
                }

                res = '<pre>' + res + '</pre>';
            } else {
                var params;
                if (domain === 'allergy') {
                    params = {
                        patientIEN: '',
                        allergyIEN: ien
                    };
                } else if (domain === 'problem') {
                    params = [patient, ien, ien];
                }
                var res = rpcE.run(rpc, params);
                res = '<pre>' + res + '</pre>';
            }

        }

        finished(res);
    });

};