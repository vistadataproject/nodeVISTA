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
commandList.push(buildRpcCommand(logger, "ORWU UESRINFO", []));
commandList.push(buildRpcCommand(logger, "XWB GET VARIABLE VALUE", [VistaJSLibrary.buildReferenceParamString("\"\"_$$GET^XPAR(\"SYS\",\"XU522\",1,\"Q\")")]));
commandList.push(buildRpcCommand(logger, "XWB GET VARIABLE VALUE", [VistaJSLibrary.buildReferenceParamString("@\"^VA(200," + 60 + ",1)\"")]));
//var commmandList = VistaJSLibrary.buildConnectionCommandList(logger, configuration);
commandList.push(VistaJSLibrary.buildSignOffCommand(logger));

//

/**
 * buildRpcCommand is used to add an rpc to the commandList passed to the client.
 * The result from the rpc call is what is returned by the callback.
 *
 * to build rpcArgs for buildRpcCommand
 *   rpcArgs = [];
 *   literalParam = VistaJSLibrary.buildLiteralParamString(theLiteralString);
 *   rpcArgs.push(literalParam);
 *
 *   referenceParam = VistaJSLibrary.buildReferenceParamString(theReferenceString);
 *   rpcArgs.push(referenceParam);
 *
 *   listObject = [{key: "key1", value: "value1", {key: "key2", value: "value2"}, {key: "key3", value: "value3"}]
 *   listParam = VistaJSLibrary.buildListParamString(listObject);
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


commandList.length = 0;
commandList.push(buildRpcCommand(logger, "XUS SIGNON SETUP", [VistaJSLibrary.buildLiteralParamString("-31^DVBA_^" + "000000112" + "^" + "ALEXANDER,ROBERT" + "^OSEHRA^111^11111^No phone")]));
commandList.push(buildRpcCommand(logger, "XWB CREATE CONTEXT", [VistaJSLibrary.buildEncryptedParamString("DVBA CAPRI GUI")]));
commandList.push(buildRpcCommand(logger, "XWB GET VARIABLE VALUE", [VistaJSLibrary.buildReferenceParamString("$O(^VA(200,\"SSN\",\"" + "000000112" + "\",0))")]));
commandList.push(buildRpcCommand(logger, "XWB CREATE CONTEXT", [VistaJSLibrary.buildEncryptedParamString("VPR APPLICATION PROXY")]));
var vprParams = [];
vprParams.push(VistaJSLibrary.buildLiteralParamString("3"));
vprParams.push(VistaJSLibrary.buildLiteralParamString("reactions"));
vprParams.push(VistaJSLibrary.buildLiteralParamString("3160101"));
vprParams.push(VistaJSLibrary.buildLiteralParamString("3160929"));
commandList.push(buildRpcCommand(logger, "VPR GET PATIENT DATA", vprParams));

var client = new VistaJSLibrary.RpcClient(logger, configuration, commandList, function(error, result) {
    //logger.debug('callRpc("%s") via Vista-RPC', rpc);

    printJsonResult(error, result);

    //callback(new Error('results were incomplete or undefined'));
});

client.start();
