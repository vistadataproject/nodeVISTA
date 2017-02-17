#!/usr/bin/env node

'use strict';

var LOGGER = require('./logger.js');
var CONFIG = require('./cfg/config.js');
var unsupportedRPCs = require('./unsupportedRPCs.js');

var parser = require('nodevista-rpcparser/rpcParser.js');

var uuid = require('uuid');
var $ = require('jquery');
var _ = require('underscore');

const ClinicalRPCLocker = require('mvdm/cRPCL');
const NonClinicalRPCLocker = require('mvdm/ncRPCL');
const modelsClinical = require('./modelsClinical');
const modelsNonClinical = require('./modelsNonClinical');

//concat all models together because VDM is a singleton and same instance is used in all rpcL instances
const vdmModel = modelsClinical.vdmModel.concat(modelsNonClinical.vdmModel);

// imports for RPCService
var nodem = require('nodem');
var RPCDispatcher = require('./rpcDispatcher');
var RPCContexts = require('mvdm/rpcRunner').RPCContexts;

var db, rpcDispatcher, rpcContexts;
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
    process.env.gtmroutines = process.env.gtmroutines + ' ' + vdmUtils.getVdmPath(); // make VDP MUMPS available
    // console.log("process.env.gtmroutines: " + process.env.gtmroutines);
    db = new nodem.Gtm();
    db.open();

    // clinical RPC locker
    const cRPCL = new ClinicalRPCLocker(db, {
        vdmModel,
        mvdmModel: modelsClinical.mvdmModel,
        rpcLModel: modelsClinical.rpcLModel,
    });

    // non-clinical RPC locker
    const ncRPCL = new NonClinicalRPCLocker(db, {
        rpcLModel: modelsNonClinical.rpcLModel,
    });

    // chain together all locker implementations
    const rpcLockers = [cRPCL, ncRPCL];

    // create RPC dispatcher and register lockers
    rpcDispatcher = new RPCDispatcher(db, rpcLockers);
    rpcContexts = new RPCContexts(db);
}

/**
 * Create, initialize and register ancillary lockers based on server configuration properties.
 *
 * This function allows users to register non-standard, "developer" Locker/Model instances with the dispatcher.
 * Locker and Model instances are dynamically instantiated based on configuration options, which decouples the
 * target locker/model code from the worker. It also precludes the need for special "developer mode" flags and
 * gives sever user more control over the registration process.
 *
 * To configure registration of custom Lockers, the function depends the 'CONFIG.lockers' attribute, which
 * should be an array of Locker configuration objects. The objects should have the following format:
 *
 *    locker.name: {String} <OPTIONAL> Arbitrary string name of the locker.
 *    locker.path: {String} <REQUIRED> Relative or absolute path of the Locker class definition module,
 *                 in CommonJS format.
 *    locker.models: {Array} <REQUIRED> Relative or absolute paths to the model definition modules, in CommonJS format.
 *    locker.routinePath: {String} <OPTIONAL> Path to additional required MUMPS routines.
 *
 * Order matters with respect to the configuration objects. Lockers listed earlier in the CONFIG.lockers array will
 * be given higher precedence in the dispatcher handler.
 */
function registerLockers() {
    // Grab the locker definition object array from the configuration
    const lockers = CONFIG.lockers || [];
    lockers.forEach((locker) => {
        const name = locker.name || 'UNKNOWN';
        LOGGER.info(`Registering locker: ${name}...`);

        // We're going to be doing dynamic 'requires', so we'll need to catch any errors if they occur
        try {
            LOGGER.debug(`Creating instance of RPC Locker class from ${locker.path}`);

            // eslint-disable-next-line
            const LockerClass = require(locker.path);
            const rpcLocker = new LockerClass(db);

            // If that was successful, load all the models specified for this locker via module paths
            const modelPaths = locker.models || [];
            modelPaths.forEach((modelPath) => {
                LOGGER.debug(`Loading models from ${modelPath}`);

                // eslint-disable-next-line
                const model = require(modelPath);

                // Inject model dependencies into the locker instance
                if (model.vdmModel) {
                    rpcLocker.addVDMModel(model.vdmModel);
                }
                if (model.mvdmModel) {
                    rpcLocker.addMVDMModel(model.mvdmModel);
                }
                if (model.rpcLModel) {
                    rpcLocker.addLockerModel(model.rpcLModel);
                }
            });

            // If everything was successful and we didn't raise an exception, we register the locker with the dispatcher
            rpcDispatcher.registerLocker(rpcLocker);

            LOGGER.info(`Successfully registered locker: ${name}`);
        } catch (e) {
            LOGGER.error(`ERROR registering locker: ${name} - ${e.toString()}`);
        }
    });
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
//        rpcDispatcher.setUserAndFacility(DUZ, facilityCode);
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
        var ret = rpcDispatcher.dispatch(rpcObject.name, rpcObject.args);

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
        var userAndFacility = rpcDispatcher.getUserAndFacility();

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
registerLockers();

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
            rpcDispatcher.setLocking(messageObj.isRPCLocked);

            LOGGER.debug('rpcQWorker in on(\'message\'), callRPC messageObj: %j ', messageObj);

            // set the context (user, facility of the runner)
            rpcContexts.setContext(messageObj.contextId);

            var res = callRPC(messageObj, send);

            LOGGER.debug('rpcQWorker: in on(\'message\') res = %j', res);

            res.type = 'rpcResponse';

            finished(res);
        } else if (messageObj.method === 'dbReinit') {
            // if the connection to the server is disconnected it will send a reinit to the rpcRunner (via rpcDispatcher)
            if (rpcDispatcher !== undefined) {
                rpcDispatcher.reinit();
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
                    list: rpcDispatcher.getLockedRPCList()
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