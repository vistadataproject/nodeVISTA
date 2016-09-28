'use strict';

var util = require('util');
var VistaJS = require('../../VistaJS/VistaJS');
var VistaJSLibrary = require('../../VistaJS/VistaJSLibrary');
var async = require('async');
var logger = require('bunyan').createLogger({
    name: 'RpcClient',
    path: 'bunyan.log',
    level: 'info'
})

function inspect(obj) {
    return obj ? util.inspect(obj, {
        depth: null
    }) : '';
}

function printResult(error, result) {
    console.log(inspect(error) +"\n\n");
    console.log(inspect(result) +"\n");
}

function printJsonResult(error, result) {
    console.log(inspect(error) +"\n\n");

    var output = result;
    try {
        output = JSON.parse(result);
    } catch (err) {
        // use default
    }

    console.log(inspect(output) +"\n");
}

var context = 'OR CPRS GUI CHART';

var configuration = {
    context: context,
    host: '10.2.100.110',
    port: 9010,
    accessCode: 'fakedoc1',
    verifyCode: '1Doc!@#$',
    localIP: '127.0.0.1',
    localAddress: 'localhost'
};


var commandList = []
commandList.push(VistaJSLibrary.buildGreetingCommand(logger, configuration));
commandList.push(VistaJSLibrary.buildSignOnSetupCommand(logger));
commandList.push(buildRpcCommand(logger, "XUS INTRO MSG", []));
commandList.push(VistaJSLibrary.buildVerifyLoginCommand(logger, configuration));
commandList.push(buildRpcCommand(logger, "XUS GET USER INFO", []));
commandList.push(buildRpcCommand(logger, "XWB GET BROKER INFO", []));
commandList.push(buildRpcCommand(logger, "XUS DIVISION GET", []));
commandList.push(VistaJSLibrary.buildCreateContextCommand(logger, configuration));
//var commmandList = VistaJSLibrary.buildConnectionCommandList(logger, configuration);
commandList.push(VistaJSLibrary.buildSignOffCommand(logger));

//

/**
 * buildRpcCommand is used to add an rpc to the commandList passed to the client.
 * The result from the rpc call is what is returned by the callback.
 *
 * to build rpcArgs for buildRpcCommand
 *   rpcArgs = [];
 *   literalParam = VistaJS.RpcParameter.literal(theLiteralString);
 *   rpcArgs.push(literalParam);
 *
 *   referenceParam = VistaJS.RpcParameter.reference(theReferenceString);
 *   rpcArgs.push(referenceParam);
 *
 *   listObject = {key1: value1, key2: value2, key3: value3}
 *   listParam = VistaJS.RpcParameter.list(listObject);
 *   rpcArgs.push(listParam);
 *
 *   for an encrypted literal parameter use VistaJSLibrary:
 *   encryptedLiteralParam = VistaJSLibrary.buildEncryptedParamString(stringToEncrypt);
 *   rpcArgs.push(encryptedLiteralParam);
 *
 * @param logger
 * @param rpc
 * @param rpcArgs
 * @returns {{rpc: *, process: Function}}
 */
function buildRpcCommand(logger, rpc, rpcArgs) {

    return {
        rpc: VistaJSLibrary.buildRpcString(rpc, rpcArgs),

        process: function(data) {
            logger.debug('RpcClient.rpcCommand.process(): %s %j', rpc, rpcArgs);

            return data;
        }
    };

}


var client = new VistaJSLibrary.RpcClient(logger, configuration, commandList, function(error, result) {
    //logger.debug('callRpc("%s") via Vista-RPC', rpc);

    printJsonResult(error, result);

    //callback(new Error('results were incomplete or undefined'));
});

client.start();
