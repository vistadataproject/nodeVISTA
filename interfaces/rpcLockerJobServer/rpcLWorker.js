var _ = require('underscore');
var util = require('util');
var nodem = require('nodem');
var VDM = require('../../../VDM/prototypes/vdm');
var mvdmModelAllergy = require('../../../VDM/prototypes/allergies/mvdmAllergiesModel').mvdmModel;
var MVDM = require('../../../VDM/prototypes/mvdm');
var testAllergies = require('../../../VDM/prototypes/allergies/vdmTestAllergies'); // want to use test allergies
var allergyUtils = require("../../../VDM/prototypes/allergies/allergyUtils");
var localRPCRunner = require('../../../VDM/prototypes/localRPCRunner');
var fmql = require('../../../VDM/prototypes/fmql');
var vprE = require('../../../VDM/prototypes/vprEmulate/vprE');
var vpr = require('../../../VDM/prototypes/vpr');
var vprAllergyEmulator = require('../../../VDM/prototypes/vprEmulate/vprAllergyEmulator');
var mvdmModelProblem = require('../../../VDM/prototypes/problems/mvdmProblemsModel').mvdmModel;
var vprProblemEmulator = require('../../../VDM/prototypes/vprEmulate/vprProblemEmulator');
var vitalUtils = require('../../../VDM/prototypes/vitals/vitalUtils');
var mvdmModelVitals = require('../../../VDM/prototypes/vitals/mvdmVitalsModel').mvdmModel;
var vprVitalsEmulator = require('../../../VDM/prototypes/vprEmulate/vprVitalsEmulator');

var fs = require('fs');
var os = require("os");
var fileman = require('../../../VDM/prototypes/fileman');
var vdmUtils = require("../../../VDM/prototypes/vdmUtils");
process.env.gtmroutines = process.env.gtmroutines + '../../../VDM/prototypes'; // make VDP MUMPS available
var db; // for afterAll
db = new nodem.Gtm();
db.open();
var vprDataVersion; // for XML vs JSON
var allergyModel = require('../../../VDM/prototypes/allergies/vdmAllergiesModel').vdmModel;
var documentModel = require('../../../VDM/prototypes/documents/vdmDocumentsModel').vdmModel;
var visitModel = require('../../../VDM/prototypes/visits/vdmVisitsModel').vdmModel;
var vdmModelAllergy = allergyModel.concat(documentModel, visitModel);
var vdmModelProblem = require('../../../VDM/prototypes/problems/vdmProblemsModel').vdmModel;
var vdmModelVitals = require('../../../VDM/prototypes/vitals/vdmVitalsModel').vdmModel;
var rpcLProblemModel = require('../../../VDM/prototypes/problems/rpcLProblemModel').rpcLModel;
var DUZ = 55; // Should match Robert Alexander used in JSON tests but may not.
var facilityCode = 2957;


var rpcL = require('../../../VDM/prototypes/rpcL');
var rpcLAllergyMappings = require('../../../VDM/prototypes/allergies/rpcAllergiesLocker');
var rpcVitalEmulate = require('../../../VDM/prototypes/vitals/rpcVitalLocker');

function setModels(domain) {
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

        DUZ = 55; // Matches Robert Alexander

        patientIen = 25;

        var fmqlRes = fmql.query(db, "DESCRIBE 2-" + patientIen);

        var patientName = fmqlRes.results[0].name.value;
        var last4 = fmqlRes.results[0].social_security_number.value.substring(5);

        patientArgs = patientIen + '^' + patientName + '^' + last4 + '^';
        facilityCode = '2957'; //OSEHRA VistA facility code

        rpcL.setDBAndModels(db, {
            rpcLModel: rpcLProblemModel,
            vdmModel: vdmModelProblem,
            mvdmModel: mvdmModelProblem
        });
        rpcL.setUserAndFacility("200-" + DUZ, "4-" + facilityCode); // note that 4-2957 would come from 200-55 if left out

    } else if (domain === 'vitals') {
        VDM.setDBAndModel(db, vdmModelVitals);
        VDM.setUserAndFacility("200-55", "4-2957"); // note that 4-2957 would come from 200-55 if left out
        MVDM.setModel(mvdmModelVitals);
        vprE.setVprMappings(vprVitalsEmulator, '1.05');
        rpcL.setRpcMappings(rpcVitalEmulate.rpcMappings);
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
    if (!validateArgs(rpcArgs)) {
        return 'Error: invalid args';
    }
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
    if (!validateArgs(rpcArgs)) {
        return 'Error: invalid args';
    }
    var domain = getDomain(messageObj.query.rpc);
    setModels(domain);
    var rpc = messageObj.query.rpc; //'ORQQAL DETAIL', ORQQPL DETAIL
    var emulation = messageObj.query.emulation;
    if (emulation === 'off' || !rpcL.isRPCSupported(rpc)) {
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

            if (domain === 'problem') {
                var input = {
                    name: rpc,
                    args: []
                };
                _.forEach(rpcArgs, function(arg) {
                    input.args.push(arg)
                });
                rpcArgs = input;
            }

            var res = rpcL.run(rpc, rpcArgs);
            if (res.result) {
                res = res.result.join('\n');
            }
        } catch (exception) {
            console.log(exception);
            res = 'Exception: ' + exception;
        }
        res = '<pre>' + res + '</pre>';
    }
    return res;
}

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

function validateArgs(args) {
    var res = true;
    args.forEach(function(item) {
        if (!isInt(item)) {
            res = false;
        }
    });
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
        var expressMessage = handleExpressMessage.call(this, messageObj, send,
            finished);
        if (expressMessage) return;
        MVDM.on('describe', function(mvdmData) {
            var resObj = {
                type: 'socketMessage',
                MVDM: 'DESCRIBE',
                data: mvdmData
            }
            send(resObj);
        });

        MVDM.on('list', function(mvdmData) {
            var resObj = {
                type: 'socketMessage',
                MVDM: 'LIST',
                data: mvdmData
            }
            send(resObj);
        });

        MVDM.on('create', function(mvdmData) {
            var resObj = {
                type: 'socketMessage',
                MVDM: 'CREATE',
                data: mvdmData
            }
            send(resObj);
        });

        MVDM.on('remove', function(mvdmData) {
            var resObj = {
                type: 'socketMessage',
                MVDM: 'REMOVE',
                data: mvdmData
            }
            send(resObj);
        });

        MVDM.on('unremoved', function(mvdmData) {
            var resObj = {
                type: 'socketMessage',
                MVDM: 'UNREMOVED',
                data: mvdmData
            }
            send(resObj);
        });

        MVDM.on('delete', function(mvdmData) {
            var resObj = {
                type: 'socketMessage',
                MVDM: 'DELETE',
                data: mvdmData
            }
            send(resObj);
        });

        MVDM.on('update', function(mvdmData) {
            var resObj = {
                type: 'socketMessage',
                MVDM: 'UPDATE',
                data: mvdmData
            }
            send(resObj);
        });

        MVDM.on('error', function(mvdmData) {
            var resObj = {
                type: 'socketMessage',
                MVDM: 'ERROR',
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
        finished(res);
    });

};