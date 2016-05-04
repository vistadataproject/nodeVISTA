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

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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
                console.dir(response.body, {
                    depth: null,
                    colors: true
                });
                var authToken = response.body.token;
                // logged in - now go on
                callback(authToken);
            }
            else if (response.statusCode == 403) { // error
                console.log("\nLogin error:");
                console.dir(response.body.error, {
                    depth: null,
                    colors: true
                });
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
            json: {inputs: rpcArgs, flags: { returnGlobalArray: true}},
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
            qs: { format: "raw" }
        },
        function(error, response, body) {

            if (response.statusCode == 200) {
                console.log("\nRPC response:");
                console.dir(response.body, {
                    depth: null,
                    colors: true
                });
            }
            else if (response.statusCode == 400) { // error
                console.log("\nRPC error:");
                console.dir(response.body.error, {
                    depth: null,
                    colors: true
                });
            }
            if (callback) callback(error, response.body);

        }
    );
}

/*
 * Login yields an authorization token which will be used in subsequent runRPC calls.
 *
 * TODO: note that ORWPT LIST ALL supports paging - a session is established in VISTA. Must try this
 * feature once sufficient #'s of patients are added to nodeVISTA.
 */
function reportPatients(authToken) {
    console.log("\n\n----------\nFirst list Patients");
    console.log("... note that return type is array and that is parsed automatically.\n");

    var rpc = 'ORWPT LIST ALL';
    var rpcArgs = [{
        "type": "LITERAL",
        "value": 1
    }, {
        "type": "LITERAL",
        "value": 1
    }];
    var callback = function(error, result) {
        processEachPatient(authToken, result);
    }
    runRPC(authToken, rpc, rpcArgs, callback);
}
 
// Note: only doing first two.
function processEachPatient(authToken, patients) {
    console.log("\n\nGet details about first two patients ...");
    var funcs = [];
    Object.keys(patients.value).some(function(k) {
        var patientStr = patients.value[k];
        var tmp = function(patientStr) {
            return function(callback) {
                console.log("\n\n----------\nProcess Patient: " + patientStr + "\n");
                var id = patientStr.substring(0, patientStr.indexOf('^'));
                getPatientInfo(authToken, id, callback);
            }
        }
        funcs.push(tmp(patientStr));
        // Only doing FIRST TWO patients. Note: # in {} are strings.
        if (k === '2') {
            return true; 
        }
    });
    async.series(funcs, function(error, result) {
        console.log('\n\n\n====== \nall done.\n');
    })
}

/*
 * A series of RPCs that return clinical data per patient.
 */ 
function getPatientInfo(authToken, id, cb) {
    async.series([
            function rpc0(callback) {
                var rpcName = 'ORWPT SELECT';
                var rpcArgs = [{
                    type: "LITERAL",
                    value: id
                }]
                runRPC(authToken, rpcName, rpcArgs, callback);
            },
            function rpc1(callback) {
                var rpcName = 'ORWPT1 PRCARE';
                var rpcArgs = [{
                    type: "LITERAL",
                    value: id
                }]
                runRPC(authToken, rpcName, rpcArgs, callback);
            },
            // TODO: returns NO DATA (one of the standard options) but there is data as
            // VPR below shows. Find out if wrong arguments (will do in VDM/prototypes/vitals)
            function rpc2(callback) {
                var rpcName = 'GMV V/M ALLDATA';
                var rpcArgs = [{
                    type: "LITERAL",
                    value: id
                }]
                runRPC(authToken, rpcName, rpcArgs, callback);
            },
            // List Allergies
            function rpc3(callback) {
                var rpcName = 'ORQQAL LIST';
                var rpcArgs = [{
                    type: "LITERAL",
                    value: id
                }]
                runRPC(authToken, rpcName, rpcArgs, callback);
            },
            // Not used by CPRS: VPR rollup used for patient data record assembly. Can ask for
            // 'all' (remove second argument) or list domains wanted.
            //
            // Note: unless logged in user has key '', then this call will fail (shows
            // error returned when no permission)
            // Error would be: '-4 RPC [VPR GET PATIENT DATA] is not allowed to be run: The remote procedure VPR GET PATIENT DATA is not registered to the option OR CPRS GUI CHART.'
            function rpc4(callback) {
                var rpcName = "VPR GET PATIENT DATA";
                var rpcArgs = [
                    {type: "LITERAL", value: id}, 
                    // triple of demographic, vital and allergy
                    {type: "LITERAL", value: "demographic;vital;allergy"}
                ]
                runRPC(authToken, rpcName, rpcArgs, callback);
            }
        ],
        function(error, result) {
            if (error) {
                console.log("Error: ", error);
            } else {
                console.log('\n... finished processing one (more) patient.\n\n');
            }
            cb();
        });
}

/*
 * After successful login, will get patients and then print out basic information about each based on RPC calls
 */
console.log("\n\n=== Login and call patient information RPCs over EWD-enabled RPC Job Server ===\n");
console.log("... note asking for GLOBAL ARRAYS to be parsed and SINGLE VALUES to be sent back 'raw'\n\n"); 
login('fakenurse1', 'NEWVERIFY1!', reportPatients);
