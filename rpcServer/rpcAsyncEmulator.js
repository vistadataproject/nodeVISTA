'use strict';

const _ = require('lodash');
const moment = require('moment');
const uuid = require('uuid');

// This should be dropped in a utility somewhere
function formatResponse(result) {
    const response = ['\u0000', '\u0000'];

    if (!_.isUndefined(result)) {
        if (_.isArray(result)) {
            result.forEach((res) => { response.push(`${res}\r\n`); });
        } else {
            response.push(result);
        }
    }
    response.push('\u0004');

    return response.join('');
}

// This too...
function generateTransactionId() {
    return uuid.v4();
}

class RPCAsyncEmulator {
    constructor() {
        this.modelMap = {};
    }
    addModels(models) {
        // Just keep the models we care about, which are the ones that support async operations via 'invokeRPCAsync'
        models.forEach((model) => {
            if (_.isFunction(model.invokeRPCAsync)) {
                console.log(`RPCAsyncEmulator::addModels - Adding RPC Emulator ${model.name}`);
                this.modelMap[model.name] = model;
            }
        });
    }
    isAsyncRPCSupported(rpcName) {
        return (!!this.modelMap[rpcName]);
    }
    dispatch(rpcObject, callback) {
        const model = this.modelMap[rpcObject.name];
        const rpcArgs = rpcObject.args || [];

        model.invokeRPCAsync(rpcArgs, (err, result) => {
            if (err) {
                return callback(err);
            }

            let res = result;
            if (_.isFunction(model.toReturnValue)) {
                res = model.toReturnValue(res);
            }

            // This is just a test result object...it is NOT meant to be used in production!!
            const resultObject = {
                rpcObject,
                type: 'rpcCall',
                ipAddress: rpcObject.ipAddress,
                timestamp: moment().format(),
                runner: 'rpcLocked',
                runResult: res,
                rpcName: rpcObject.name,
                request: rpcObject,
                response: formatResponse(res),
                user: {
                    id: '200-62',
                    name: 'ALEXANDER,ROBERT',
                },
                facility: {
                    id: '4-2957',
                    name: 'VISTA HEALTH CARE',
                    stationNumber: '6100',
                },
                path: 'rpcLocked',
                lockerName: '<i>** ASYNC Emulator **</i>',
                rpcResponse: formatResponse(res),
                transactionId: generateTransactionId(),
                result: res,
            };

            return callback(null, resultObject);
        });
    }
}

module.exports = RPCAsyncEmulator;
