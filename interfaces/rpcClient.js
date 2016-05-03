var util = require('util');
var async = require('async');
var request = require('request');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var authToken;

function login(accessCode, verifyCode) {
    request.defaults({
        strictSSL: false, // allow us to use our self-signed cert for testing
        rejectUnauthorized: false
    });

    console.log("\nLogin called\n");
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
            if (error) {
                //console.log("\n *********login client body log: " + body);
                return console.error(' failed:', error);
            }
            if (!error && response.statusCode == 200) {
                console.log("\nLogin response:");
                console.dir(response.body, {
                    depth: null,
                    colors: true
                });
                authToken = response.body.token;
                run();
            }
        }
    );
}

function run() {
    getAllPatients(processEachPatient);
}

function runRPC(rpcName, rpcArgs, callback) {
    console.log("\nRPC called: %s | rpcArgs: %s", rpcName, JSON.stringify(rpcArgs));
    //var rpcArgs = [{"type": "LITERAL", "value": 1}];
    request.post({
            url: 'https://localhost:9001/vista/runRPC/' + rpcName + '?format=raw&returnGlobalArray=true',
            headers: {
                'Authorization': authToken,
            },
            json: rpcArgs,
            returnGlobalArray: true // nothing happens Conor - same for 'raw'. Wrong place?
        },
        function(error, response, body) {
            if (error) {
                return console.error(' failed:', error);
            }
            if (!error && response.statusCode == 200) {
                console.log("\nRPC response:");
                console.dir(response.body, {
                    depth: null,
                    colors: true
                });
                if (callback) callback(error, response.body);
            }
            else { 
                errorMessage = JSON.stringify(response.body); //print out MUMPS error message. 
                console.log('******* Error: '+ errorMessage.substring(10, errorMessage.length -2))   
            }
        }
    );
}

function getAllPatients(callback) {
    var rpc = 'ORWPT LIST ALL';
    var rpcArgs = [{
        "type": "LITERAL",
        "value": 1
    }, {
        "type": "LITERAL",
        "value": 1
    }];
    var callback = function(error, result) {
        processEachPatient(result);
    }
    runRPC(rpc, rpcArgs, callback);
}
 
function processEachPatient(patients) {
    var funcs = [];
    for (var k in patients.value) {
        var patientStr = patients.value[k];
        var tmp = function(patientStr) {
            return function(callback) {
                console.log("\n\n----------\nProcess Patient: " + patientStr + "\n");
                var id = patientStr.substring(0, patientStr.indexOf('^'));
                getPatientInfo(id, callback);
            }
        }
        funcs.push(tmp(patientStr));
        // break; ... added so can just do first patient as debug
    }
    async.series(funcs, function(error, result) {
        console.log('all done.');
    })
}

function getPatientInfo(id, cb) {
    async.series([
            function rpc0(callback) {
                var rpcName = 'ORWPT SELECT';
                var rpcArgs = [{
                    type: "LITERAL",
                    value: id
                }]
                runRPC(rpcName, rpcArgs, callback);
            },
            function rpc1(callback) {
                var rpcName = 'ORWPT1 PRCARE';
                var rpcArgs = [{
                    type: "LITERAL",
                    value: id
                }]
                runRPC(rpcName, rpcArgs, callback);
            },
            function rpc2(callback) {
                var rpcName = 'GMV V/M ALLDATA';
                var rpcArgs = [{
                    type: "LITERAL",
                    value: id
                }]
                runRPC(rpcName, rpcArgs, callback);
            },
            // function rpc3(callback) {
            //     var rpcName = "VPR GET PATIENT DATA";
            //     var rpcArgs = [{
            //         type: "LITERAL",
            //         value: id
            //     }, {type: "LITERAL", value: "vital"}]
            //     //runRPC(rpcName, rpcArgs, callback);
            // }
            function rpc4(callback) { //test type error 
                var rpcName = 'ORWPT1 PRCARE';
                var rpcArgs = [{
                    type: "INT",
                    value: id
                }]
                runRPC(rpcName, rpcArgs, callback);
            }
        ],
        function(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log('finished processing one patient.');
            }
            cb();
        });
}

login('fakenurse1', 'NEWVERIFY1!');
