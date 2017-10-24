#!/usr/bin/env node

'use strict';

var LOGGER = require('./logger.js');
var CONFIG = require('./cfg/config.js');
var unsupportedRPCs = require('./unsupportedRPCs.js');

var parser = require('nodevista-rpcparser/rpcParser.js');

var uuid = require('uuid');
var $ = require('jquery');
var _ = require('lodash');

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
    process.env.gtmroutines = setGtmRoutinePath();
    // console.log("process.env.gtmroutines: " + process.env.gtmroutines);
    db = new nodem.Gtm();
    db.open();

    rpcContexts = new RPCContexts(db);
}

/**
 * Adjust the GT.M routine path environment variable. This needs to be called prior to the nodem instance
 * being created to ensure that the MUMPS routine paths are included in the configuration.
 */
function setGtmRoutinePath() {
    const pathElements = [process.env.gtmroutines, vdmUtils.getVdmPath()];

    const emulators = CONFIG.emulators || [];
    emulators.forEach((emulator) => {

        // Add the MUMPS routine paths any exist for this emulator configuration
        if (emulator.routinePath) {
            LOGGER.debug(`Appending ${emulator.routinePath} to the gtmroutines environment variable`);
            pathElements.push(emulator.routinePath);
        }
    });
    return pathElements.join(' ');
}

/**
 * Create and initialize RPC dispatcher.
 *
 * This function also registers RPC emulators based on server configuration properties.
 *
 * Emulator and Model instances are dynamically instantiated based on configuration options, which decouples the
 * target emulator/model code from the worker. It also precludes the need for special "developer mode" flags and
 * gives sever user more control over the registration process.
 *
 * To configure registration of emulators, the function depends the 'CONFIG.emulators' attribute, which
 * should be an array of Emulator configuration objects. The objects should have the following format:
 *
 *    emulator.name: {String} <OPTIONAL> Arbitrary string name of the emulator.
 *    emulator.path: {String} <REQUIRED> Relative or absolute path of the Emulator class definition module,
 *                 in CommonJS format.
 *    emulator.models: {Array} <REQUIRED> Relative or absolute paths to the model definition modules, in CommonJS format.
 *    emulator.routinePath: {String} <OPTIONAL> Path to additional required MUMPS routines.
 *
 * Order matters with respect to the configuration objects. Emulators listed earlier in the CONFIG.emulators array will
 * be given higher precedence in the dispatcher handler.
 */
function createDispatcher() {

    // create RPC dispatcher
    rpcDispatcher = new RPCDispatcher(db);

    // Grab the emulator definition object array from the configuration
    const emulators = CONFIG.emulators || [];

    let vdmModels = [];
    let mvdmModels = [];

    // We create a generic function to ensure uniqueness of model definitions, then we create specialized versions of
    // the function to handle both VDM and MVDM definitions. We use these functions in place of the straight-up Array
    // 'concat' function to prevent emulators from clobbering other emulator VDM/MVDM defintions.
    const getUniqueModels = (type, key, modelArray, modelsToAdd) => {
        LOGGER.info(`Adding ${modelsToAdd.length} ${type} models...`);
        const allModels = modelArray.concat(modelsToAdd);
        const uniqueModels = _.uniqBy(allModels, key);

        LOGGER.info(`...found ${allModels.length - uniqueModels.length} duplicates, current ${type} model count: ${uniqueModels.length}`);
        return uniqueModels;
    };
    const getUniqueVDMModels = _.partial(getUniqueModels, 'VDM', 'fmId');
    const getUniqueMVDMModels = _.partial(getUniqueModels, 'MVDM', 'fmIdForId');

    emulators.forEach((emulator) => {
        const name = emulator.name || 'UNKNOWN';
        LOGGER.info(`Registering emulator: ${name}...`);

        // We're going to be doing dynamic 'requires', so we'll need to catch any errors if they occur
        try {
            LOGGER.debug(`Creating instance of RPC Emulator class from ${emulator.path}`);

            // eslint-disable-next-line
            const EmulatorClass = require(emulator.path);
            const rpcEmulator = new EmulatorClass(db);

            rpcEmulator.name = name;

            // If that was successful, load all the models specified for this emulator via module paths
            const modelPaths = emulator.models || [];
            modelPaths.forEach((modelPath) => {
                LOGGER.debug(`Loading models from ${modelPath}`);

                // eslint-disable-next-line
                const model = require(modelPath);

                // Inject model dependencies into the emulator instance
                if (model.vdmModel) {
                    // add to existing vdm model list (VDM is a singleton)
                    vdmModels = getUniqueVDMModels(vdmModels, model.vdmModel);

                    rpcEmulator.addVDMModel(vdmModels);
                }
                if (model.mvdmModel) {
                    // add to existing MVDM list (MVDM is a singleton)
                    mvdmModels = getUniqueMVDMModels(mvdmModels, model.mvdmModel);

                    rpcEmulator.addMVDMModel(mvdmModels);
                }
                if (model.rpcEmulatorModel) {
                    rpcEmulator.addEmulatorModel(model.rpcEmulatorModel);
                }
            });

            // If everything was successful and we didn't raise an exception, we register the emulator with the dispatcher
            rpcDispatcher.registerEmulator(rpcEmulator);

            LOGGER.info(`Successfully registered emulator: ${name}`);
        } catch (e) {
            LOGGER.error(`ERROR registering emulator: ${name} - ${e.toString()}`);
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
 * the server will send a fixed response instead of calling the RPC Emulator or RPC Runner.
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
        // These are normal RPCs that can go to either the emulator or the runner.
        LOGGER.debug("calling RPC service");

        // Wrap the dispatcher in a try/catch block to allow for error condition logging
        let ret = {};
        try {
            ret = rpcDispatcher.dispatch(rpcObject.name, rpcObject.args);
        } catch (e) {
            LOGGER.error(`RPC DISPATCH ERROR: ${e.message} {RPC: ${rpcObject.name}, args: [${rpcObject.args}]}`);
            LOGGER.error(e.stack);

            ret = {
                path: 'ERROR',
                rpcResponse: e.message,
                transactionId: e.errno,
                result: e.message,
                emulatorName: 'ERROR',
            };
        }

        rpcObject.to = ret.path;
        response = ret.rpcResponse;
        transactionId = ret.transactionId;
        runResult = ret.result;
        rpcObject.emulatorName = ret.emulatorName;
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
            emulatorName: rpcObject.emulatorName,
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
createDispatcher();

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
            rpcDispatcher.setEmulating(messageObj.isRPCEmulated);

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
        } else if (messageObj.method === 'emulatedRPCList') {

            finished({
                type: 'rpcEmulator',
                event: {
                    list: rpcDispatcher.getEmulatedRPCList()
                },
                eventType: 'emulatedRPCList'
            });
        }
    });

    this.on('stop', function() {
        db.close();
        LOGGER.debug('Stopping rpcWorker process pid: %s ...', process.pid);
    });
}