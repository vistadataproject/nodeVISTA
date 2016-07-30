'use strict';

var util = require('util');
var clc = require('cli-color');
var RpcClient = require('../VistaJS1.1/RpcClient').RpcClient;
var RpcParameter = require('../VistaJS1.1/RpcParameter').RpcParameter;
var async = require('async');
var logger = require('bunyan').createLogger({
    name: 'RpcClient',
    path: 'bunyan.log',
    level: 'info'
})
var rpcArgsHelper = require('./rpcArgs_ORWDAL32_SAVE_ALLERGY');
var testAllergies = require('../../../prototypes/allergies/vdmTestAllergies'); // want to use test allergies

var d1 = new Date();
var n1 = d1.getTime(); //milliseconds

function inspect(obj) {
    return obj ? util.inspect(obj, {
        depth: null
    }) : '';
}

function printResult(error, result) {
    console.log(clc.red(inspect(error)));
    console.log(clc.cyan(inspect(result)));
}

function printJsonResult(error, result) {
    console.log(clc.red(inspect(error)));

    var output = result;
    try {
        output = JSON.parse(result);
    } catch (err) {
        // use default
    }

    console.log(clc.cyan(inspect(output)));
}

var context = 'OR CPRS GUI CHART';

var config = {
    context: context,
    host: '10.0.2.15',
    port: 9430,
    accessCode: 'fakenurse1',
    verifyCode: 'NEWVERIFY1!',
    localIP: '127.0.0.1',
    localAddress: 'localhost',
    connectTimeout: 3000,
    sendTimeout: 10000
};

console.log('********** start');
var client = RpcClient.create(logger, config);
client.connect(function(error, result) {
    if (error) {
        console.log('Unable to connect to Vista');
        console.log(error);
        return;
    }

    console.log(result);
    console.log('connected');
});

function runRPC(rpc, rpcArgs, callback) {
    var cb = function(error, result) {
        printResult(error, result);
        if (callback) callback(error, result);
    };
    client.execute(rpc, rpcArgs, cb);
}

function closeClient() {
    client.close(function(error, result) {
        console.log('********** close');
        if (error) {
            console.log('close() was not clean');
            console.log(error);
            return;
        }

        try {
            result = JSON.parse(result);
        } catch (err) {
            // do nothing
        }
        console.log('%j', result);
        console.log('********** end');
    });
}

function addAllergies() {
    var rpcArgs = rpcArgsHelper.rpcArgs_ORWDAL32_SAVE_ALLERGY(
        testAllergies.historicals.three.vdmCreateResult, "", "", true
    );
    var res = runRPC("ORWDAL32 SAVE ALLERGY", rpcArgs, printResult);
}

function readAllergies(callback) {
    var rpc = "ORQQAL DETAIL";
    var rpcArgs = [
        RpcParameter.literal('1'),
        RpcParameter.literal('1')
    ];
    var cb = function(error, result) {
        printResult(error, result);
        callback();
    }
    runRPC(rpc, rpcArgs, cb);
}

function readAllergies2() {
    var rpc = "ORWDAL32 LOAD FOR EDIT";
    var rpcArgs = [
        RpcParameter.literal('1')
    ];
    runRPC(rpc, rpcArgs, printResult);
}

// addAllergies();
// readAllergies();
// readAllergies2();
// closeClient();

function testPerformance() {
    var funcs = [];
    for(var i = 0; i < 100; i++)
        funcs.push(function(callback){
            readAllergies(callback);
        });
    async.series(funcs, function(error, result){
        closeClient();
        var d2 = new Date();
        var n2 = d2.getTime();
        console.log('time spent: ', n2 - n1);
    });
    
}

testPerformance();
