var _ = require('underscore');
var util = require('util');
var nodem = require('nodem');
var VDM = require('../../../VDM/prototypes/vdm');

var MVDM = require('../../../VDM/prototypes/mvdm');
var testAllergies = require('../../../VDM/prototypes/allergies/vdmTestAllergies'); // want to use test allergies

var localRPCRunner = require('../../../VDM/prototypes/localRPCRunner');
var fmql = require('../../../VDM/prototypes/fmql');
var vprE = require('../../../VDM/prototypes/vprEmulate/vprE');
var vpr = require('../../../VDM/prototypes/vpr');

var fs = require('fs');
var os = require("os");
var fileman = require('../../../VDM/prototypes/fileman');

process.env.gtmroutines = process.env.gtmroutines + '../../../VDM/prototypes'; // make VDP MUMPS available
var db; // for afterAll
db = new nodem.Gtm();
db.open();
var vprDataVersion; // for XML vs JSON

var CONFIG  = require('./cfg/config.js');
var DUZ = CONFIG.USER.DUZ; // Should match Robert Alexander used in JSON tests but may not.
var facilityCode = CONFIG.FACILITY.ID;

var LockerModelUtils = require('./lockerModelUtils')
var lockerModelUtils = new LockerModelUtils(CONFIG);

var rpcL = require('../../../VDM/prototypes/rpcL');

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
    lockerModelUtils.setModels(domain);
    var rpcArgs = messageObj.query.rpcArgs.split(',');
    if (!validateArgs(rpcArgs)) {
        return 'Error: invalid args';
    }
    var patient = rpcArgs[0];
    if (rpcArgs.length > 1)
        var ien = rpcArgs[1];
    var format = messageObj.query.format;
    var rpcsLocked = messageObj.query.rpcsLocked;
    if (format === 'XML') {
        if (rpcsLocked === 'on') {
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
    lockerModelUtils.setModels(domain);
    var rpc = messageObj.query.rpc; //'ORQQAL DETAIL', ORQQPL DETAIL
    var rpcsLocked = messageObj.query.rpcsLocked;
    if (rpcsLocked === 'off' || !rpcL.isRPCSupported(rpc)) {
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