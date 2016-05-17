#!/usr/bin/env node

/**
 * Simple Example Client of rpcJobServer.
 *
 * Note: sibling of rpcBrokerClient.js which will invoke the same
 * RPCs over the traditional broker.
 *
 * See: http://vistadataproject.info/artifacts/cprsRPCs to see
 * RPCs used by CPRS. 
 *
 * TODO: will add more patient data RPCs here once nodeVISTA
 * patient data adders are up and running.
 *
 *
 * (c) 2016 VISTA Data Project
 */

var util = require('util');
var async = require('async');
var request = require('request');
var clc = require('cli-color');
var RpcClient = require('../VistaJS1.1/RpcClient').RpcClient;
var RpcParameter = require('../VistaJS1.1/RpcParameter').RpcParameter;
var rpcArgsHelper = require('./rpcArgs_EDITSAVE_ORWDAL32')
var testAllergies = require('./vdmTestAllergies'); // want to use test allergies

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
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

function printRpcResult(error, response, body) {
    if (response.statusCode == 200) {
        console.log("\nRPC response:");
        printResult(error, response.body);
    } else if (response.statusCode == 400) { // error
        console.log("\nRPC error:");
        printResult(response.body.error);
    }
}


/*
 * Login is special - NOT calling security RPCs directly. Instead passing arguments
 * to server (runRPC.js) that calls RPCs locally passed on passed in values.
 *
 * Success yields an authorization token which is passed to the callback.
 */
function login(accessCode, verifyCode, callback) {
    request.defaults({
        strictSSL: false, // allow us to use our self-signed cert for testing
        rejectUnauthorized: false
    });

    console.log("\n----------\nFirst Logging in ...\n");
    request.post({
            strictSSL: false, // allow us to use our self-signed cert for testing
            rejectUnauthorized: false,
            url: 'https://localhost:9001/vista/login',
            json: {
                "accessCode": accessCode, //"fakenurse1",
                "verifyCode": verifyCode
            }
        },
        function(error, response, body) {
            if (response.statusCode == 200) {
                console.log("\nLogin response:");
                printResult(undefined, response.body);
                var authToken = response.body.token;
                // logged in - now go on
                callback(authToken);
            } else { // error
                console.log("\nLogin error:");
                printResult(response.body.error);
            }
        }
    );
}

/*
 * Run any RPC
 * ... needs authToken which signals login succeeded to be passed in.
 */
function runRPC(authToken, rpcName, rpcArgs, callback) {
    console.log("\nRPC called: %s | rpcArgs: %s", rpcName, JSON.stringify(rpcArgs));
    request.post({
            url: 'https://localhost:9001/vista/runRPC/' + rpcName,
            headers: {
                'Authorization': authToken,
            },
            /*
             * json (data and setting format): could just have
             * ... json: rpcArgs
             * and put flag assertions into qs (ie/ two mechanisms supported)
             */
            json: {
                inputs: rpcArgs,
                flags: {
                    returnGlobalArray: true
                }
            },
            /*
             * qs/query string ('usually' not in post/put)
             * ... format: raw in qs is only way to ensure SINGLE VALUES with ^ splits are 
             * left as is for the client to parse. Should be left to client (is when
             * CPRS calls the conventional way)
             *
             * Note that despite the general name 'format', this doesn't effect ARRAY or GLOBAL
             * ARRAY types. They are either always parsed (as standard format) or left
             * in TMP unless returnGlobalArray is set.
             */
            qs: {
                format: "raw"
            }
        },
        function(error, response, body) {
            printRpcResult(error, response);
            if (callback) callback(error, response.body);

        }
    );
}

function addAllergies(authToken) {
    // var rpcArgs = rpcArgsHelper.rpcArgs_EDITSAVE_ORWDAL32(
    //     testAllergies.historicals.three.vdmCreateResult
    // );
    var rpcArgs = [{
        "type": "LITERAL",
        "value": ""
    }, {
        "type": "LITERAL",
        "value": "1"
    }, {
        "type": "LIST",
        "value": {
            'GMRAGNT': 'PENICILLINS AND BETA-LACTAM ANTIMICROBIALS^11;PS(50.605,',
            'GMRATYPE': 'D',
            'GMRANATR': 'U',
            'GMRAORIG': '55',
            'GMRAORDT': '3160218.173200',
            'GMRAOBHX': 'h'
        }
    }]
    var res = runRPC(authToken, "ORWDAL32 SAVE ALLERGY", rpcArgs, printResult);
}

function readAllergies(authToken, callback) {
    var rpc = "ORQQAL DETAIL";
    var rpcArgs = [{
        "type": "LITERAL",
        "value": 1
    }, {
        "type": "LITERAL",
        "value": 1
    }];
    var cb = function(error, result) {
        printResult(error, result);
        callback();
    }
    runRPC(authToken, rpc, rpcArgs, cb);
}

function readAllergies2(authToken) {
    var rpc = "ORWDAL32 LOAD FOR EDIT";
    var rpcArgs = [{
        "type": "LITERAL",
        "value": 1
    }];
    runRPC(authToken, rpc, rpcArgs, printResult);
}


/*
 * After successful login, will get patients and then print out basic information about each based on RPC calls
 */
console.log("\n\n=== Login and call patient information RPCs over EWD-enabled RPC Job Server ===\n");
console.log("... note asking for GLOBAL ARRAYS to be parsed and SINGLE VALUES to be sent back 'raw'\n\n");

function run(authToken) {
    // addAllergies(authToken); 
    funcs = [];
    for(var i = 0; i < 100; i++)
        funcs.push(function(callback) {
            readAllergies(authToken, callback);
        });
    // readAllergies2(authToken);
    async.series(funcs, function(error, result) {
        var d2 = new Date();
        var n2 = d2.getTime(); //milliseconds
        console.log('time spent: ', n2 - n1);    
    })
    
}
login('fakenurse1', 'NEWVERIFY1!', run);