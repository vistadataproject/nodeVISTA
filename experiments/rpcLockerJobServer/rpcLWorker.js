var _ = require('underscore');
var util = require('util');
var nodem = require('nodem');
var VDM = require('../../../VDM/prototypes/vdm');
var mvdmModelAllergy = require('../../../VDM/prototypes/allergies/mvdmAllergiesModel').mvdmModel;
var MVDM = require('../../../VDM/prototypes/mvdm');
var testAllergies = require('../../../VDM/prototypes/allergies/vdmTestAllergies'); // want to use test allergies
var allergyUtils = require("../../../VDM/prototypes/allergies/allergyUtils");
var RPCRunner = require('../../../VDM/prototypes/rpcRunner').RPCRunner;
var fmql = require('../../../VDM/prototypes/fmql');
// var vprLocker = require('../../../VDM/prototypes/vprLocker/vprL');
var VPRFacade = require('../../../VDM/prototypes/vprFacade');
var vprAllergyLocker = require('../../../VDM/prototypes/vprLocker/vprAllergyLocker');
var mvdmModelProblem = require('../../../VDM/prototypes/problems/mvdmProblemsModel').mvdmModel;
var vprProblemLocker = require('../../../VDM/prototypes/vprLocker/vprProblemLocker');
var vitalUtils = require('../../../VDM/prototypes/vitals/vitalUtils');
var mvdmModelVitals = require('../../../VDM/prototypes/vitals/mvdmVitalsModel').mvdmModel;
var vprVitalsLocker = require('../../../VDM/prototypes/vprLocker/vprVitalsLocker');

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
var DUZ = 55; // Should match Robert Alexander used in JSON tests but may not.
var facilityCode = 2957;

var rpcRunner = new RPCRunner(db);
rpcRunner.setUserAndFacility(DUZ, facilityCode);


var RPCL = require('../../../VDM/prototypes/rpcL');
var rpcL = new RPCL(db);
// Initialize vprFacade
vprFacade = new VPRFacade(db);
vprFacade.setUserAndFacility(DUZ, facilityCode);

function setModels(domain) {
    VDM.setUserAndFacility("200-55", "4-2957"); // note that 4-2957 would come from 200-55 if left out
    if (domain === 'allergy') {
        VDM.setDBAndModel(db, vdmModelAllergy);
        MVDM.setModel(mvdmModelAllergy);
        // Note: allergy doesn't note the facility, just the user logged in but can get it (need for full creation events)
        rpcL.setUserAndFacility("200-55", "4-2957"); // note that 4-2957 would come from 200-55 if left out
        vprFacade.setupVprLocker(vprAllergyLocker);

    } else if (domain === 'problem') {
        VDM.setDBAndModel(db, vdmModelProblem);
        MVDM.setModel(mvdmModelProblem);
        rpcL.setUserAndFacility("200-55", "4-2957"); // note that 4-2957 would come from 200-55 if left out
        vprFacade.setupVprLocker(vprProblemLocker);

    } else if (domain === 'vitals') {
        VDM.setDBAndModel(db, vdmModelVitals);
        MVDM.setModel(mvdmModelVitals);
        rpcL.setUserAndFacility("200-55", "4-2957");
        vprFacade.setupVprLocker(vprVitalsLocker);
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
    var format = messageObj.query.format.toLowerCase();
    var rpcsLocked = messageObj.query.rpcsLocked;

    var vprArgs = {
        dfn: patient,
        type: domain,
        id: ien
    };
    return vprFacade.run(vprArgs, format, rpcsLocked == 'on');
}

function callRpc(messageObj) {
    var rpcArgs = messageObj.query.rpcArgs.split(',');
    if (!validateArgs(rpcArgs)) {
        return 'Error: invalid args';
    }
    var domain = getDomain(messageObj.query.rpc);
    setModels(domain);
    var rpc = messageObj.query.rpc; //'ORQQAL DETAIL', ORQQPL DETAIL
    var rpcsLocked = messageObj.query.rpcsLocked;
    if (rpcsLocked === 'off' || !rpcL.isRPCSupported(rpc)) {
        //run local rpc
        try {
            var res = rpcRunner.run(rpc, rpcArgs);
            res = res.result.join('\n');
        } catch (exception) {
            console.log(exception);
            res = 'Exception: ' + exception;
        }
        res = '<pre>' + res + '</pre>';
    } else {
        try {
            rpcArgs = [];
            _.forEach(rpcArgs, function(arg) {
                rpcArgs.push(arg)
            });

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