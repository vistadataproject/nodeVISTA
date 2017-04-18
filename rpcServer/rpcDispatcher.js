#!/usr/bin/env node

'use strict';

const RPCRunner = require('mvdm/rpcRunner').RPCRunner;
const uuid = require('uuid');

/**
 * Remote Procedure Call Dispatcher.
 *
 * Dispatches RPC call to an array of RPC emulators.
 *
 * If emulators cannot accommodate handling a RPC call, the dispatcher will default to the RPC runner.
 *
 * By default, emulators will always be invoked. The dispatcher class does provide the ability to turn emulating off
 * for testing purposes.
 *
 */
class RPCDispatcher {
    /**
     * Constructs instance.
     * @param {Object} db VistA database instance.
     * @param {Array=} rpcEmulators List of RPC emulator implementations to register with the dispatcher (e.g. cRPCEmulator, vprL, ncRPCEmulator)
     */
    constructor(db, rpcEmulators) {
        this.rpcRunner = new RPCRunner(db);
        if (!rpcEmulators) {
            this.rpcEmulatorList = [];
        } else {
            if (!Array.isArray(rpcEmulators)) {
                throw new Error('Invalid parameter - rpcEmulatorList must be of type Array');
            }

            this.rpcEmulatorList = rpcEmulators;
        }

        this.isEmulated = true; // by default dispatcher run method checks emulators

        // private methods

        /**
         * Generates a unique transaction identifier using uuid library.
         * @returns {Object} a uuid.
         */
        this.generateTransactionId = function generateTransactionId() {
            return uuid.v4();
        };

        /**
         * Finds RPC emulator implementation that supports a RPC and the given parameters (if provided).
         * @param {String} rpcName Name of the Remote procedure call.
         * @param {Object=} rpcArgs Remote procedure call arguments.
         * @returns {Object} Supported emulator implementation or null if not found.
         */
        this.findSupportedEmulator = function findSupportedEmulator(rpcName, rpcArgs) {
            let supportedEmulator = null;

            for (let i = 0; i < this.rpcEmulatorList.length; i += 1) {
                const rpcEmulator = this.rpcEmulatorList[i];

                if (rpcEmulator.isRPCSupported(rpcName, rpcArgs)) {
                    supportedEmulator = rpcEmulator;
                    break;
                }
            }

            return supportedEmulator;
        };
    }

    /**
     * Sets emulating value.
     * @param {boolean} isON Is emulating turned on?
     */
    setEmulating(isON) {
        this.isEmulated = isON;
    }

    /**
     * Returns a list of all emulated RPCs
     * @returns {Array} list of all emulated RPCs
     */
    getEmulatedRPCList() {
        let rpcList = [];

        this.rpcEmulatorList.forEach((rpcEmulator) => {
            rpcList = rpcList.concat(rpcEmulator.getEmulatedRPCList());
        });

        return rpcList;
    }

    /**
     * Initializes the user and user context for the RPC Runner.
     * @param {String} userId User identifier.
     * @param {Object} context User context.
     */
    initializeUser(userId, context) {
        return this.rpcRunner.initializeUser(userId, context);
    }

    /**
     * Reinitialize RPC Runner.
     */
    reinit() {
        this.rpcRunner.reinit();
    }

    /**
     * Returns the RPC Runner's user and facility values.
     * @returns {Object} User and facility values (uNF).
     */
    getUserAndFacility() {
        return this.rpcRunner.getUserAndFacility();
    }

    /**
     * Returns the list of registered RPC emulators.
     * @returns {RPCEmulator} rpc facade's rpcEmulator instance.
     */
    getRPCEmulators() {
        return this.rpcEmulatorList;
    }

    /**
     * Registers a RPC emulator with the dispatcher.
     * @param {Object} rpcEmulator A RPC emulator instance (e.g. cRPCEmulator, vprL).
     */
    registerEmulator(rpcEmulator) {
        this.rpcEmulatorList.push(rpcEmulator);
    }

    /**
     * Dispatch a RPC with arguments.
     *
     * If emulating is turned on, this method will dispatch RPC and arguments to the appropriate RPC emulator
     * that is registered with the class. If no RPC emulator is found to accommodates the RPC, by default the RPC will
     * be dispatched to the RPC runner.
     *
     * If emulating is turned off, all calls are dispatched the RPC runner.
     *
     * @param {String} rpcName VistA remote procedure call name
     * @param {String=} rpcArgs Remote procedure arguments
     * @returns {{path: *, rpcResponse: string, transactionId: *, result: *}}
     */
    dispatch(rpcName, rpcArgs) {
        let rpcResult;
        let patient;
        let rpcPath;
        let emulatorName;

        // generate a random transaction id for rpcEmulator and rpcRunner calls
        const transactionId = this.generateTransactionId();

        const rpcEmulator = this.findSupportedEmulator(rpcName, rpcArgs);

        if (this.isEmulated && rpcEmulator !== null) {
            // Since last pass (or this is first pass), user may have changed. Ask rpcRunner.
            const uNf = this.rpcRunner.getUserAndFacility();
            rpcEmulator.setUserAndFacility(uNf.userId, uNf.facilityId);

            // Proxy for "logged in". userId is 0 if not logged in
            if (uNf.userId === 0) {
                throw new Error(`NOT LOGGED IN, dropping RPC call: ${rpcName}`);
            }

            rpcPath = 'rpcEmulated';
            emulatorName = rpcEmulator.name || 'Unknown';

            rpcResult = rpcEmulator.run(rpcName, rpcArgs, transactionId);

            if (rpcResult.patient) {
                patient = rpcResult.patient;
            }
        } else {
            rpcPath = 'rpcRunner';
            rpcResult = this.rpcRunner.run(rpcName, rpcArgs);
        }

        let response = '\u0000\u0000';
        if (rpcResult && rpcResult.result !== undefined) {
            if (Array.isArray(rpcResult.result)) {
                // in rpcRunner the ARRAY, WORD PROCESSING, and GLOBAL ARRAY returns an array as the replyType
                for (let i = 0; i < rpcResult.result.length; i += 1) {
                    response += `${rpcResult.result[i]}\r\n`;
                }
            } else {
                // the SINGLE VALUE replyType is not an array
                response += rpcResult.result;
            }
        }
        response += '\u0004';

        const ret = {
            path: rpcPath,
            emulatorName,
            rpcResponse: response,
            transactionId,
            result: rpcResult.result,
        };

        if (patient) {
            ret.patient = patient;
        }

        return ret;
    }
}

module.exports = RPCDispatcher;

