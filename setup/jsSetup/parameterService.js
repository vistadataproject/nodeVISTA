'use strict';

const _ = require('lodash');

/**
 * VistA Parameter Service class. This class is intended to be used as a singleton and provides a Javascript
 * interface to the service.
 *
 * Example usage:
 *    const parameterService = require('./parameterService');
 *    parameterService.setDB(db);
 *    const value = parameterService.get('YOUR PARAMETER NAME', { entity: 'DIV^SYS', format: 'E' });
 */
class ParameterService {
    constructor() {
        if (!ParameterService.instance) {
            this.db = null;
            this.isDebugging = false;

            ParameterService.FUNCTIONS = {
                add: {
                    routine: 'ADD^XPAR',
                    argList: ['entity', 'parameterName', 'instance', 'value'],
                },
                update: {
                    routine: 'PUT^XPAR',
                    argList: ['entity', 'parameterName', 'instance', 'value'],
                },
                get: {
                    routine: 'GET^XPAR',
                    argList: ['entity', 'parameterName', 'instance', 'format'],
                },
                getList: {
                    routine: 'GETLST^ZVDPXPAR',
                    argList: ['entity', 'parameterName', 'format'],
                },
                getWordProcessing: {
                    routine: 'GETWP^ZVDPXPAR',
                    argList: ['entity', 'parameterName', 'instance'],
                },
                addChangeDelete: {
                    routine: 'EN^XPAR',
                    argList: ['entity', 'parameterName', 'instance', 'value'],
                },
            };
            ParameterService.instance = this;
        }
        return ParameterService.instance;
    }

    // Utility method to generate a parameter list based on options and the standard argument list for a function type
    static createArgumentList(functionType, options) {
        const parameterFunction = ParameterService.FUNCTIONS[functionType];
        if (_.isUndefined(parameterFunction)) {
            return [];
        }

        return parameterFunction.argList.reduce((params, argName) => {
            if (_.has(options, argName)) {
                params.push(options[argName]);
            }
            return params;
        }, []);
    }

    /**
     * Generic function to run one of the supported VistA Parameter Service functions.
     *
     * @param  {String} functionType The Parameter Service function to call. Currently, the following functions are
     *                               supported:
     *                                    "add"
     *                                    "update"
     *                                    "get"
     *                                    "getList"
     *                                    "getWordProcessing"
     * @param  {Array} params        Array of parameters to pass to the NodeJS MUMPS wrapper for the XPAR routine
     * @return {Variable}            Result value of the function call, or an empty string if the result object
     *                               returned doesn't have a 'result' attribute.
     */
    run(functionType, params) {
        const parameterFunction = ParameterService.FUNCTIONS[functionType];
        if (_.isUndefined(parameterFunction)) {
            return '';
        }

        this.printDebug(`Running "${functionType}" with params: ${params}`);
        const res = this.db.function({
            function: parameterFunction.routine,
            arguments: params,
        });

        if (res.ok !== 1) {
            throw new Error(`Parameter Service: Function failed: ${JSON.stringify(res)}`);
        }

        return res.result || '';
    }

    /**
     * Add a parameter value via the parameter service. This method corresponds to a MUMPS "ADD"
     * parameter service call and is analogous to the CRUD 'CREATE' call.  This API function is
     * equivalent to the following MUMPS routine call:
     *
     *    ADD^XPAR({options.entity},{parameterName},{options.instance},{value})
     *
     * Note that the parameters shown in the MUMPS routine call correspond to the named parameters used in
     * the Javascript function call below.
     *
     * @param {String} parameterName Label name of the parameter to set (e.g. "ORWOR WRITE ORDERS")
     * @param {String} value         The value used to set the parameter
     * @param {Object} options       Optional parameter service options:
     *                                    entity: The parameter entity value (default: "ALL")
     *                                  instance: The parameter instance value (default: 1)
     */
    add(parameterName, value, options) {
        const params = ParameterService.createArgumentList('add', _.extend({
            parameterName,
            value,
            entity: _.get(options, 'entity', 'ALL'),
            instance: _.get(options, 'instance', 1),
        }, options));

        return this.run('add', params);
    }

    /**
     * Update a parameter value via the parameter service. This method corresponds to a MUMPS "PUT"
     * parameter service call and is analogous to the CRUD 'UPDATE' call.  This API function is
     * equivalent to the following MUMPS routine call:
     *
     *    PUT^XPAR({options.entity},{parameterName},{options.instance},{value})
     *
     * Note that the parameters shown in the MUMPS routine call correspond to the named parameters used in
     * the Javascript function call below.
     *
     * @param {String} parameterName Label name of the parameter to update (e.g. "ORWOR WRITE ORDERS")
     * @param {String} value         The value used set the parameter
     * @param {Object} options       Optional parameter service options:
     *                                    entity: The parameter entity value (default: "ALL")
     *                                  instance: The parameter instance value (default: 1)
     */
    update(parameterName, value, options) {
        const params = ParameterService.createArgumentList('update', _.extend({
            parameterName,
            value,
            entity: _.get(options, 'entity', 'ALL'),
            instance: _.get(options, 'instance', 1),
        }, options));

        return this.run('update', params);
    }

    /**
     * Get a parameter value via the parameter service. This method corresponds to a MUMPS "GET"
     * parameter service call and is analogous to the CRUD 'RETRIEVE' call.  This API function is
     * equivalent to the following MUMPS routine call:
     *
     *    GET^XPAR({options.entity},{parameterName},{options.instance},{options.format})
     *
     * Note that the parameters shown in the MUMPS routine call correspond to the named parameters used in
     * the Javascript function call below.
     *
     * @param {String} parameterName Label name of the parameter to get (e.g. "ORWOR WRITE ORDERS")
     * @param {Object} options       Optional parameter service options:
     *                                    entity: The parameter entity value (default: "ALL")
     *                                  instance: The parameter instance value (default: 1)
     *                                    format: The parameter format value (default: "Q")
     * @return {String or Number}    Returns the value corresponding to the parameter requested or an empty
     *                               string if the parameter or value doesn't exist.
     */
    get(parameterName, options) {
        const params = ParameterService.createArgumentList('get', _.extend({
            parameterName,
            entity: _.get(options, 'entity', 'ALL'),
            instance: _.get(options, 'instance', 1),
        }, options));

        return this.run('get', params);
    }

    /**
     * Get a list of parameter values associated with all the associated parameter type instances via the parameter
     * service. This method corresponds to a MUMPS "GETLST" parameter service call and is analogous to the CRUD
     * 'RETRIEVE' call.  This API function is equivalent to the following MUMPS routine call:
     *
     *    GETLST^XPAR({options.entity},{parameterName},{options.instance},{options.format})
     *
     * Note that the parameters shown in the MUMPS routine call correspond to the named parameters used in
     * the Javascript function call below.
     *
     * @param {String} parameterName Label name of the parameters to get (e.g. "ORWOR WRITE ORDERS")
     * @param {Object} options       Optional parameter service options:
     *                                    entity: The parameter entity value (default: "ALL")
     *                                    format: The parameter format value (default: "Q")
     * @return {Object}              Returns a JSON object with the following attributes:
     *                                      list: An array containing the parameter values, each one a String with the
     *                                            following format:
     *                                               "<instance>^<value>"
     *                               Example: { "list": ["10^3", "20^159", "30^23", "52^129"] }
     */
    getList(parameterName, options) {
        const params = ParameterService.createArgumentList('getList', _.extend({
            parameterName,
            entity: _.get(options, 'entity', 'ALL'),
        }, options));

        const result = this.run('getList', params);
        return (_.isEmpty(result) ? { list: [] } : JSON.parse(result));
    }

    /**
     * Get the word processing text associated with a named parameter via the parameter service. This method
     * corresponds to a MUMPS "GETWP" parameter service call and is analogous to the CRUD 'RETRIEVE' call.  This API
     * function is equivalent to the following MUMPS routine call:
     *
     *    GETWP^XPAR({options.entity},{parameterName},{options.instance})
     *
     * Note that the parameters shown in the MUMPS routine call correspond to the named parameters used in
     * the Javascript function call below.
     *
     * @param {String} parameterName Label name of the parameters to get (e.g. "ORWOR WRITE ORDERS")
     * @param {Object} options       Optional parameter service options:
     *                                    entity: The parameter entity value (default: "ALL")
     *                                  instance: The parameter instance value (default: 1)
     * @return {Object}              Returns a JSON object with the following attributes:
     *                                     title: A string containing the parameter word processing text title
     *                                     lines: An array of strings containing the word processing text lines,
     *                                            in proper order
     *                               Example: { "title": "Please contact",
     *                                          "lines": ["Please see your Administrator",
     *                                                     "if you believe you should have this ability."] }
     */
    getWordProcessing(parameterName, options) {
        const params = ParameterService.createArgumentList('getWordProcessing', _.extend({
            parameterName,
            entity: _.get(options, 'entity', 'ALL'),
        }, options));

        const result = this.run('getWordProcessing', params);
        return (_.isEmpty(result) ? { title: '', lines: [] } : JSON.parse(result));
    }

    /**
     * Add, change, or delete of parameter values associated with all the associated parameter type instances via the parameter
     * service. This method corresponds to a MUMPS "EN" parameter service call and is analogous to the CRUD
     * CRUD Add/Change/delete call.  This API function is equivalent to the following MUMPS routine call:
     *
     *    EN^XPAR({options.entity},{parameterName},{options.instance},{options.format})
     *
     * Note that the parameters shown in the MUMPS routine call correspond to the named parameters used in
     * the Javascript function call below.
     *
     * @param {String} parameterName Label name of the parameter to set (e.g. "ORWOR WRITE ORDERS")
     * @param {String} value         The value used to set the parameter
     * @param {Object} options       Optional parameter service options:
     *                                    entity: The parameter entity value (default: "ALL")
     *                                  instance: The parameter instance value (default: 1)
     */
    addChangeDelete(parameterName, value, options) {
        const params = ParameterService.createArgumentList('addChangeDelete', _.extend({
            parameterName,
            value,
            entity: _.get(options, 'entity', 'ALL'),
            instance: _.get(options, 'instance', 1),
        }, options));

        return this.run('addChangeDelete', params);
    }


    /**
     * Set the NodeJS interface descriptor for the ParameterService class. You only need to do this once, since
     * the ParameterService will always be imported as a singleton.
     *
     * @param {MUMPS Database Descriptor Object} db a NodeJS database descriptor object.  This must be created
     *                                              and the 'open()' function must be called on this object before
     *                                              the parameter service can be used. Use without performing this
     *                                              step is undefined.
     */
    setDB(db) {
        this.db = db;
    }

    setDUZ(duz) {
        const node = { global: 'DUZ', data: duz };
        const res = this.db.set(node);

        if (res.ok !== 1) {
            throw new Error(`Parameter Service: Function failed: ${JSON.stringify(res)}`);
        }
    }

    /**
     * Get the NodeJS interface descriptor for the ParameterService class.
     *
     * @return {MUMPS Database Descriptor Object} the NodeJS database descriptor object.
     */
    db() {
        return this.db;
    }

    setDebug(isDebugging) {
        this.isDebugging = isDebugging;
    }

    printDebug(message) {
        if (this.isDebugging) {
            console.log(`ParameterService::${message}`);
        }
    }
}

module.exports = new ParameterService();
