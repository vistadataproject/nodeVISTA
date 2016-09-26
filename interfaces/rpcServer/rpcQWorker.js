#!/usr/bin/env node
'use strict';

var LOGGER = require('./logger.js');
var CONFIG = require('./cfg/config.js');
var unsupportedRPCs = require('./unsupportedRPCs.js');

var parser = require('./../rpcParser/rpcParser.js');

var uuid = require('uuid');
var $ = require('jquery');
var _ = require('underscore');


// imports for RpcRunner
var nodem = require('nodem');
var RPCRunner = require('../../../VDM/prototypes/rpcRunner').RPCRunner;

// imports for locked rpcs
var RPCL = require('../../../VDM/prototypes/rpcL');
var mvdmManagement = require('./mvdmManagement');
var moment = require('moment');

var db, rpcRunner, rpcL;
var DUZ = '';
var facilityCode = '';
//need for user and facility lookup
var vdmUtils = require('../../../VDM/prototypes/vdmUtils');
var USER, FACILITY;
var loggedIn = false;

var fromName = CONFIG.client.defaultName;
var DT_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

process.on('uncaughtException', function(err) {
    db.close();

    console.trace('Uncaught Exception:\n', err.stack);

    process.exit(1);
});

function connectVistaDatabase() {
    process.env.gtmroutines = process.env.gtmroutines + ' ../../../VDM/prototypes'; // make VDP MUMPS available
    db = new nodem.Gtm();
    db.open();

    process.on('uncaughtException', function(err) {
        db.close();

        console.trace('Uncaught Exception:\n', err.stack);

        process.exit(1);
    });

    rpcRunner = new RPCRunner(db);
    rpcL = new RPCL(db);
}

function generateTransactionId() {
    return uuid.v4();
}

function setUserAndFacilityCode(newDUZ, newFacilityCode) {
    DUZ = newDUZ;
    facilityCode = newFacilityCode;

    //needed for RPC event reporting
    USER = vdmUtils.userFromId(db, '200-' + DUZ);
    FACILITY = vdmUtils.facilityFromId(db, '4-' + facilityCode);

    if (facilityCode !== 'unk') { //unknown facility a result of a failed logon attempt
        rpcL.setUserAndFacility('200-'+DUZ, '4-'+facilityCode);
    }
}

/**
 * This takes the object (rpcObject) from the parsed RPC string (rpcPacket) and passes it
 * to either the rpcLocker or rpcRunner. For connection type commands such as TCPConnect and #BYE#,
 * the server will send a fixed response instead of calling the RPC Locker or RPC Runner.
 *
 * @param rpcObject js object returned from rpc parser
 * @param rpcPacket the raw rpc string
 * @returns {string} the response from the rpcLocker or rpcRunner (enveloped in \u0000\u0000 and \u0004)
 */
function callRPC(rpcPacket, send) {
    var response = '';
    var transactionId;

    var rpcObject = parser.parseRawRPC(rpcPacket);

    if (unsupportedRPCs.has(rpcObject.name)) {
        // Check if it is a connection RPC, for now we will just catch these and return hard coded responses
        // these can be found in unsupportedRpcs.js map.

        transactionId = generateTransactionId();
        // the unsupported RPC response does not depend on the arguments, this is usually the simple case
        LOGGER.debug("unsupported RPC, returning server defined response");
        response = unsupportedRPCs.get(rpcObject.name);
        rpcObject.to = "server";
    } else {
        // These are normal RPCs that can go to either the locker or the runner.
        LOGGER.debug("calling RPC locker or runner");
        var ret = callRpcLockerOrRunner(rpcObject);
        response = ret.rpcResponse;
        transactionId = ret.transactionId;
    }

    // log to capture file the RPC and the response to a file
    // emit rpc call event
    if (rpcObject) {
        // add more info to captured object
        rpcObject.rpc = rpcPacket;
        rpcObject.response = response;
        rpcObject.from = fromName;
        rpcObject.timeStamp = new Date().toISOString();

        var rpcCallEvent = {
            type: 'rpcCall',
            transactionId: transactionId,
            //ipAddress: conn.remoteAddress,
            timestamp: moment().format(DT_FORMAT) + 'Z',
            runner: rpcObject.to,
            rpcName: rpcObject.name,
            rpcObject: rpcObject,
            response: response
        };

        //include user if available
        if (USER) {
            rpcCallEvent.user = {
                id: '200-' + DUZ,
                name: USER.name.value
            }
        }

        //include facility if available
        if (FACILITY) {
            rpcCallEvent.facility = {
                id: '4-' + facilityCode,
                name: FACILITY.name.value,
                stationNumber:  FACILITY['station_number'].value
            }
        }


        console.log("\n\nin rpcQWorker emit rpcEvent")
        //EventManager.emit('rpcCall', rpcCallEvent);
        var res = {};
        res.type = 'emitEvent';
        res.event = rpcCallEvent;
        send(res);
    }


    return {"rpcObject": rpcObject, "response": response};

}

function callRpcLockerOrRunner(rpcObject) {
    LOGGER.debug('rpcQWorker:callRpcLockerOrRunner: %j', rpcObject);

    var rpcResult;
    var transactionId, patient;
    // It isn't one that needs to be squashed so we call either rpc locker or localRpcRunner
    if (mvdmManagement.isMvdmLocked && rpcL.isRPCSupported(rpcObject.name)) {
        if (loggedIn) {
            rpcObject.to = "mvdmLocked";
            rpcResult = rpcL.run(rpcObject.name, rpcObject);
            transactionId = rpcResult.transactionId;

            if (rpcResult.patient) {
                patient = rpcResult.patient;
            }

            LOGGER.info("RESULT FROM rpcL for RPC: %s, transactionId: %s, result: %j", rpcObject.name, transactionId, rpcResult);
        } else {
            LOGGER.info('NOT LOGGED IN, dropping RPC call: %s', rpcObject.name);
        }
    } else {
        //rpcObject.args = parser.inputParametersToArgs(rpcObject.inputParameters);

        transactionId = generateTransactionId();

        rpcObject.to = "rpcRunner";

        try {
            rpcResult = rpcRunner.run(rpcObject.name, rpcObject.args);
            LOGGER.info("RESULT FROM rpcRunner for RPC: %s, transactionId: %s, result: %j", rpcObject.name, transactionId, rpcResult);
        } catch (err) {
            LOGGER.error("Error thrown from rpcRunner.run() in rpcServer:  %s", err.message);
            rpcResult = {"result": err.message};
        }
        if (rpcObject.name === 'XUS AV CODE') {
            // check if it was a login attempt, if it was successful, set the DUZ and facility
            // from a call to XUS GET USER INFO, and set the loggedIn state
            if (rpcResult.result[0] === '0') {
                LOGGER.error('Authentication error on XUS AV CODE: %j', rpcResult);
            } else {
                loggedIn = true;

                var userInfoResult = rpcRunner.run("XUS GET USER INFO").result;
                var facilityArray = userInfoResult[3].split("^");

                // TODO: validate that USER INFO is an array.
                setUserAndFacilityCode(userInfoResult[0], facilityArray[0]);
            }
        }

    }

    var response = '\u0000\u0000';
    if (rpcResult && rpcResult.result !== undefined) {
        if (_.isArray(rpcResult.result)) {
            // in rpcRunner the ARRAY, WORD PROCESSING, and GLOBAL ARRAY returns an array as the replyType
            for (var i = 0; i < rpcResult.result.length; i++) {
                response += rpcResult.result[i] + '\r\n';
            }
        } else {
            // the SINGLE VALUE replyType is not an array
            response += rpcResult.result;
        }
    }
    response += '\u0004';

    var ret = {rpcResponse: response, transactionId: transactionId};

    if (patient) {
        ret.patient = patient;
    }

    return ret;
}










function callRpcL(messageObject) {
    var rpcResult = messageObject.rpcL.run(messageObject.rpcObject.name, messageObject.rpcObject);
    LOGGER.debug("rpcQWorker rpcL.run: %s, result: %j", messageObject.rpcObject.name, rpcResult);

    return rpcResult;
}


function callRpcRunner(messageObject) {
    var rpcResult = messageObject.rpcRunner.run(messageObject.rpcObject.name, messageObject.rpcObject.args);
    LOGGER.debug("rpcQWorker rpcRunner.run: %s, result: %j", messageObject.rpcObject.name, rpcResult);


    //try {
    //    rpcResult = messageObject.runnerOrLocker.run(rpcObject.name, rpcObject.args);
    //    LOGGER.info("RESULT FROM rpcRunner for RPC: %s, transactionId: %s, result: %j", rpcObject.name, transactionId, rpcResult);
    //} catch (err) {
    //    LOGGER.error("Error thrown from rpcRunner.run() in rpcServer:  %s", err.message);
    //    rpcResult = {"result": err.message};
    //}
    //
    return rpcResult;
}


connectVistaDatabase();

module.exports = function() {

    this.on('start', function() {
        LOGGER.debug('Started rpcQWorker module process.pid: %s', process.pid);
    });

    this.on('message', function(messageObj, send, finished) {
        if (messageObj.method === 'callRPC') {
            LOGGER.debug('rpcQWorker in on(\'message\'), callRPC messageObj: %j ', messageObj);

            var res = callRPC(messageObj.rpcPacket, send);

            LOGGER.debug('rpcQWorker: in on(\'message\') res = %j', res);

            res.type = 'rpcResponse';

            finished(res);
        } else if (messageObj.method === 'dbReinit') {
            if (rpcRunner !== undefined) {
                rpcRunner.reinit();
            }
            finished();
        }


    });

    this.on('stop', function() {
        db.close();
        LOGGER.debug('Stopping rpcWorker process pid: %s ...', process.pid);
    });
}