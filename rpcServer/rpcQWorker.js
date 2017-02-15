#!/usr/bin/env node
'use strict';

var LOGGER = require('./logger.js');
var CONFIG = require('./cfg/config.js');
var unsupportedRPCs = require('./unsupportedRPCs.js');

var parser = require('nodevista-rpcparser/rpcParser.js');

var uuid = require('uuid');
var $ = require('jquery');
var _ = require('underscore');


// imports for RPCService
var nodem = require('nodem');
var RPCFacade = require('mvdm/rpcFacade');
var RPCContexts = require('mvdm/rpcRunner').RPCContexts;

var db, rpcFacade, rpcContexts;
//need for user and facility lookup
var MVDM = require('mvdm/mvdm');
var vdmUtils = require('mvdm/vdmUtils');
var mvdmHandlersSet = false;

var fromName = CONFIG.client.defaultName;

process.on('uncaughtException', function(err) {
    if (db !== undefined) {
        db.close();
    }

    console.trace('Uncaught Exception:\n', err.stack);

    process.exit(1);
});

function connectVistaDatabase() {
    process.env.gtmroutines += ` ${vdmUtils.getVdmPath()}`; // make VDP MUMPS available
    // console.log("process.env.gtmroutines: " + process.env.gtmroutines);

    // Use the development RPC Facade if we're in 'developer' mode (dev-vdm or dev-nc), which would be set in the config
    const isDeveloperMode = CONFIG['dev-vdm'] || CONFIG['dev-nc'];

    // Attach the path to the prototype MUMPS code if we're in developer mode
    process.env.gtmroutines += isDeveloperMode ? ' ../../VDM/prototypes' : '';

    db = new nodem.Gtm();
    db.open();

    if (isDeveloperMode) {
        LOGGER.info('***************** DEVELOPER MODE *****************');
        LOGGER.debug('Loading Prototyped RPC Locker and VDM Models...');

        try {
            LOGGER.debug('Initializing VDM RPC Facade and prototype locker models...');

            // eslint-disable-next-line
            const VDMRPCFacade = require('../../VDM/prototypes/rpcFacade');
            rpcFacade = new VDMRPCFacade(db);

            // eslint-disable-next-line
            const ParameterService = require('../../VDM/prototypes/parameterService');
            ParameterService.setDB(db);

            // If we're also including Non-Clinical RPC development, load those models as well
            if (CONFIG['dev-nc']) {
                LOGGER.debug('Adding prototype Non-Clinical RPC Models...');

                // eslint-disable-next-line
                const devRPCModels = require('../../nonClinicalRPCs/prototypes');

                const rpcL = rpcFacade.getRPCLInstance();
                rpcL.addLockerModel(devRPCModels.rpcLModel);
                rpcL.addVDMModel(devRPCModels.vdmModel);

                LOGGER.debug('Successfully loaded the Non-Clinical RPC Models!');
            }
        } catch (err) {
            LOGGER.error(`ERROR initializing DEVELOPER MODE: ${err.message} [${err.code}]`);
        }
    }

    // If we haven't set the RPC Facade instance yet, do it now, then default to utilize mvdm locking
    rpcFacade = rpcFacade || new RPCFacade(db);
    rpcFacade.setLocking(true);

    rpcContexts = new RPCContexts(db);
}

function generateTransactionId() {
    return uuid.v4();
}

//function setUserAndFacilityCode(newDUZ, newFacilityCode) {
//    DUZ = newDUZ;
//    facilityCode = newFacilityCode;
//
//    //needed for RPC event reporting
//    USER = vdmUtils.userFromId(db, '200-' + DUZ);
//    FACILITY = vdmUtils.facilityFromId(db, '4-' + facilityCode);
//
//    if (facilityCode !== 'unk') { //unknown facility a result of a failed logon attempt
//        rpcFacade.setUserAndFacility(DUZ, facilityCode);
//    }
//}

/**
 * This takes the object (rpcObject) from the parsed RPC string (rpcPacket) and passes it
 * to the rpcService. For connection type commands such as TCPConnect and #BYE#,
 * the server will send a fixed response instead of calling the RPC Locker or RPC Runner.
 *
 * @param rpcObject js object returned from rpc parser
 * @param rpcPacket the raw rpc string
 * @returns {string} the response from the rpcService (enveloped in \u0000\u0000 and \u0004)
 */
function callRPC(messageObject, send) {
    var response = '';
    var transactionId;
    var runResult;
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
        LOGGER.debug("calling RPC service");
        var ret = rpcFacade.run(rpcObject.name, rpcObject.args);

        rpcObject.to = ret.path;
        response = ret.rpcResponse;
        transactionId = ret.transactionId;
        runResult = ret.result;
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
            runResult: runResult,
            rpcName: rpcObject.name,
            rpcObject: rpcObject,
            request: {args: rpcObject.args},
            response: rpcObject.response
        };

        //include user if
        var userAndFacility = rpcFacade.getUserAndFacility();

        rpcCallEvent.user = {
            id: '200-' + userAndFacility.userId,
            name: userAndFacility.userName
        }

        //include facility if available
        rpcCallEvent.facility = {
            id: '4-' + userAndFacility.facilityId,
            name: userAndFacility.facilityName,
            stationNumber:  userAndFacility.facilityStationNumber
        }

        var qMessage = {};
        qMessage.type = 'emitRpcEvent';
        qMessage.event = rpcCallEvent;
        // send the rpc emit event back to the worker queue server.
        send(qMessage);
    }


    return {"rpcObject": rpcObject, "response": response};

}

function setMvdmHandlers(send) {
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

    mvdmHandlersSet = true;
}

connectVistaDatabase();

module.exports = function() {

    this.on('start', function() {
        LOGGER.debug('Started rpcQWorker module process.pid: %s', process.pid);
    });

    this.on('message', function(messageObj, send, finished) {

        if (!mvdmHandlersSet) {
            setMvdmHandlers(send);
        }

        // now check the message to setup callbacks to the rpcServer after running the rpc or other messages
        if (messageObj.method === 'callRPC') {
            rpcFacade.setLocking(messageObj.isMvdmLocked);

            LOGGER.debug('rpcQWorker in on(\'message\'), callRPC messageObj: %j ', messageObj);

            // set the context (user, facility of the runner)
            rpcContexts.setContext(messageObj.contextId);

            var res = callRPC(messageObj, send);

            LOGGER.debug('rpcQWorker: in on(\'message\') res = %j', res);

            res.type = 'rpcResponse';

            finished(res);
        } else if (messageObj.method === 'dbReinit') {
            // if the connection to the server is disconnected it will send a reinit to the rpcRunner (via rpcFacade)
            if (rpcFacade !== undefined) {
                rpcFacade.reinit();
            }
            // also clear the contexts
            if (rpcContexts !== undefined) {
                rpcContexts.clearAll();
            }
            finished();
        } else if (messageObj.method === 'lockedRPCList') {

            finished({
                type: 'rpcL',
                event: {
                    list: rpcFacade.getLockedRPCList()
                },
                eventType: 'lockedRPCList'
            });
        }
    });

    this.on('stop', function() {
        db.close();
        LOGGER.debug('Stopping rpcWorker process pid: %s ...', process.pid);
    });
}