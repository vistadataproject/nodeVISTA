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

var db, rpcRunner, rpcL;
var DUZ = '';
var facilityCode = '';
//need for user and facility lookup
var vdmUtils = require('../../../VDM/prototypes/vdmUtils');
var MVDM = require('../../../VDM/prototypes/mvdm');
var USER, FACILITY;
var loggedIn = false;

var fromName = CONFIG.client.defaultName;

process.on('uncaughtException', function(err) {
    db.close();

    console.trace('Uncaught Exception:\n', err.stack);

    process.exit(1);
});

function connectVistaDatabase() {
    process.env.gtmroutines = process.env.gtmroutines + ' ../../../VDM/prototypes'; // make VDP MUMPS available
    db = new nodem.Gtm();
    db.open();

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
function callRPC(messageObject, send) {
    var response = '';
    var transactionId;
    var rpcPacket = messageObject.rpcPacket;

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
            ipAddress: messageObject.ipAddress,
            timestamp: rpcObject.timeStamp,
            runner: rpcObject.to,
            rpcName: rpcObject.name,
            rpcObject: rpcObject,
            request: {args: rpcObject.args},
            response: rpcObject.response
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

        var qMessage = {};
        qMessage.type = 'emitRpcEvent';
        qMessage.event = rpcCallEvent;
        // send the rpc emit event back to the worker queue server.
        send(qMessage);
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

connectVistaDatabase();

module.exports = function() {

    this.on('start', function() {
        LOGGER.debug('Started rpcQWorker module process.pid: %s', process.pid);
    });

    this.on('message', function(messageObj, send, finished) {
        // Setup MVDM event handlers for rpcServer to proxy
        MVDM.on('create', function(mvdmData) {
            var qMessage = {};
            qMessage.type = 'emitMvdmEvent';
            qMessage.event = mvdmData;
            qMessage.eventType = 'mvdmCreate';
            send(qMessage);
        });

        MVDM.on('describe', function(mvdmData) {
            var qMessage = {};
            qMessage.type = 'emitMvdmEvent';
            qMessage.event = mvdmData;
            qMessage.eventType = 'mvdmDescribe';
            send(qMessage);
        });

        MVDM.on('list', function(mvdmData) {
            console.log('\n\naaaaargghhh');
            var qMessage = {};
            qMessage.type = 'emitMvdmEvent';
            qMessage.event = mvdmData;
            qMessage.eventType = 'mvdmList';
            send(qMessage);
        });

        MVDM.on('update', function(mvdmData) {
            var qMessage = {};
            qMessage.type = 'emitMvdmEvent';
            qMessage.event = mvdmData;
            qMessage.eventType = 'mvdmUpdate';
            send(qMessage);
        });

        MVDM.on('remove',function(mvdmData) {
            var qMessage = {};
            qMessage.type = 'emitMvdmEvent';
            qMessage.event = mvdmData;
            qMessage.eventType = 'mvdmRemove';
            send(qMessage);
        });

        MVDM.on('unremoved', function(mvdmData) {
            var qMessage = {};
            qMessage.type = 'emitMvdmEvent';
            qMessage.event = mvdmData;
            qMessage.eventType = 'mvdmUnremoved';
            send(qMessage);
        });

        MVDM.on('delete', function(mvdmData) {
            var qMessage = {};
            qMessage.type = 'emitMvdmEvent';
            qMessage.event = mvdmData;
            qMessage.eventType = 'mvdmDelete';
            send(qMessage);
        });

        // now check the message to setup callbacks to the rpcServer after running the rpc or other messages
        if (messageObj.method === 'callRPC') {
            LOGGER.debug('rpcQWorker in on(\'message\'), callRPC messageObj: %j ', messageObj);

            var res = callRPC(messageObj, send);

            LOGGER.debug('rpcQWorker: in on(\'message\') res = %j', res);

            res.type = 'rpcResponse';

            finished(res);
        } else if (messageObj.method === 'dbReinit') {
            // if the connection to the server is disconnected it will send a reinit for the rpcRunner
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