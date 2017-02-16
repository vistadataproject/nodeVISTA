#!/usr/bin/env node

'use strict';

const RPCRunner = require('mvdm/rpcRunner').RPCRunner;
const uuid = require('uuid');

/**
 * Remote Procedure Call Dispatcher.
 *
 * Dispatches RPC call to an array of RPC lockers.
 *
 * If lockers cannot accommodate handling a RPC call, the dispatcher will default to the RPC runner.
 *
 * By default, lockers will always be invoked. The dispatcher class does provide the ability to turn locking off
 * for testing purposes.
 *
 */
class RPCDispatcher {
    /**
     * Constructs instance.
     * @param {Object} db VistA database instance.
     * @param {Array=} rpcLockers List of RPC locker implementations to register with the dispatcher (e.g. cRPCL, vprL, ncRPCL)
     */
    constructor(db, rpcLockers) {
        this.rpcRunner = new RPCRunner(db);
        if (!rpcLockers) {
            this.rpcLockerList = [];
        } else {
            if (!Array.isArray(rpcLockers)) {
                throw new Error('Invalid parameter - rpcLockerList must be of type Array');
            }

            this.rpcLockerList = rpcLockers;
        }

        this.isLocked = true; // by default dispatcher run method checks lockers

        // private methods

        /**
         * Generates a unique transaction identifier using uuid library.
         * @returns {Object} a uuid.
         */
        this.generateTransactionId = function generateTransactionId() {
            return uuid.v4();
        };

        /**
         * Finds RPC locker implementation that supports a RPC and the given parameters (if provided).
         * @param {String} rpcName Name of the Remote procedure call.
         * @param {Object=} rpcArgs Remote procedure call arguments.
         * @returns {Object} Supported locker implementation or null if not found.
         */
        this.findSupportedLocker = function findSupportedLocker(rpcName, rpcArgs) {
            let supportedLocker = null;

            for (let i = 0; i < this.rpcLockerList.length; i += 1) {
                const rpcL = this.rpcLockerList[i];

                if (rpcL.isRPCSupported(rpcName, rpcArgs)) {
                    supportedLocker = rpcL;
                    break;
                }
            }

            return supportedLocker;
        };
    }

    /**
     * Sets locking value.
     * @param {boolean} isON Is locking turned on?
     */
    setLocking(isON) {
        this.isLocked = isON;
    }

    /**
     * Returns a list of all locked RPCs
     * @returns {Array} list of all locked RPCs
     */
    getLockedRPCList() {
        let rpcList = [];

        this.rpcLockerList.forEach((rpcL) => {
            rpcList = rpcList.concat(rpcL.getLockedRPCList());
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
     * Returns the list of registered RPC lockers.
     * @returns {RPCL} rpc facade's rpcL instance.
     */
    getRPCLockers() {
        return this.rpcLockerList;
    }

    /**
     * Registers a RPC locker with the dispatcher.
     * @param {Object} rpcL A RPC locker instance (e.g. cRPCL, vprL).
     */
    registerLocker(rpcL) {
        this.rpcLockerList.push(rpcL);
    }

    /**
     * Dispatch a RPC with arguments.
     *
     * If locking is turned on, this method will dispatch RPC and arguments to the appropriate RPC locker
     * that is registered with the class. If no RPC locker is found to accommodates the RPC, by default the RPC will
     * be dispatched to the RPC runner.
     *
     * If locking is turned off, all calls are dispatched the RPC runner.
     *
     * @param {String} rpcName VistA remote procedure call name
     * @param {String=} rpcArgs Remote procedure arguments
     * @returns {{path: *, rpcResponse: string, transactionId: *, result: *}}
     */
    dispatch(rpcName, rpcArgs) {
        let rpcResult;
        let patient;
        let rpcPath;

        // generate a random transaction id for rpcL and rpcRunner calls
        const transactionId = this.generateTransactionId();

        const rpcL = this.findSupportedLocker(rpcName, rpcArgs);

        if (this.isLocked && rpcL !== null) {
            // Since last pass (or this is first pass), user may have changed. Ask rpcRunner.
            const uNf = this.rpcRunner.getUserAndFacility();
            rpcL.setUserAndFacility(uNf.userId, uNf.facilityId);

            // Proxy for "logged in". userId is 0 if not logged in
            if (uNf.userId === 0) {
                throw new Error(`NOT LOGGED IN, dropping RPC call: ${rpcName}`);
            }

            rpcPath = 'rpcLocked';

            rpcResult = rpcL.run(rpcName, rpcArgs, transactionId);

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

