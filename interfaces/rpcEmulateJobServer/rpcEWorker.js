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
var vpr = require('../../prototypes/vpr');
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

//for emulator only
//we need to know the domain in order to populate the domain specific mappings
function getDomain(rpcName) {
    var maps = {
        ORQQAL_DETAIL: 'allergy',
        ORQQPL_DETAIL: 'problem'
    }
    return maps[rpcName.replace(' ', '_')];
}



function callVpr(messageObj) {
    var domain = messageObj.query.domain;
    setModels(domain);
    var rpcArgs = messageObj.query.rpcArgs.split(',');
    var patient = rpcArgs[0];
    if (rpcArgs.length > 1)
        var ien = rpcArgs[1];
    var format = messageObj.query.format;
    var emulation = messageObj.query.emulation;
    if (format === 'XML') {
        if (emulation === 'on') {
            // call vpr emulator
            if (ien)
                var res = vprE.queryXML(db, patient, domain, ien);
            else
                var res = vprE.queryXML(db, patient, domain);
        } else {
            if (ien)
                var res = vpr.queryXML(db, patient, domain, ien);
            else
                var res = vpr.queryXML(db, patient, domain);
        }
        res = '<textarea rows="60" cols="140" style="border:none;">' + res + '</textarea>';
    } else if (format === 'JSON') {
        // call vpr
        if (ien)
            var res = vpr.query(db, patient, domain, ien);
        else
            var res = vpr.query(db, patient, domain);
    }
    return res;
}

function callRpc(messageObj) {
    var rpcArgs = messageObj.query.rpcArgs.split(',');
    var domain = getDomain(messageObj.query.rpc);
    setModels(domain);
    var rpc = messageObj.query.rpc; //'ORQQAL DETAIL', ORQQPL DETAIL
    var emulation = messageObj.query.emulation;
    if (emulation === 'off' || !rpcE.isRPCSupported(rpc)) {
        //run local rpc
        try {
            var res = localRPCRunner.run(db, DUZ, rpc, rpcArgs);
            res = res.result.join('\n');
        } catch (exception) {
            console.log(exception);
            res = 'Exception: ' + exception;
        }
        res = '<pre>' + res + '</pre>';
    } else {
        try {
            var res = rpcE.run(rpc, rpcArgs);
        } catch (exception) {
            console.log(exception);
            res = 'Exception: ' + exception;
        }
        res = '<pre>' + res + '</pre>';
    }
    return res;
}

module.exports = function() {
    var handleExpressMessage = require('ewd-qoper8-express').workerMessage;
    this.on('expressMessage', function(messageObj, send, finished) {
        var application = messageObj.application;
        var res;
        if (application === 'vpr') {
            res = callVpr(messageObj);
        } else if (application === 'rpc') {
            res = callRpc(messageObj);
        }
        finished(res);
    });

    this.on('message', function(messageObj, send, finished) {
        send({
            type: 'socketMessage',
            status: 'start processing',
            data: messageObj
        });
        var expressMessage = handleExpressMessage.call(this, messageObj, send,
            finished);
        if (expressMessage) return;
        MVDM.on('describe', function(mvdmData) {
            var resObj = {
                type: 'socketMessage',
                MVDM: 'describe',
                data: mvdmData
            }
            send(resObj);
        });

        var application = messageObj.application;
        var res;
        if (application === 'vpr') {
            res = callVpr(messageObj);
        } else if (application === 'rpc') {
            res = callRpc(messageObj);
        }

        send({
            type: 'socketMessage',
            status: 'finish processing',
            data: res
        });
        finished(res);
    });

};