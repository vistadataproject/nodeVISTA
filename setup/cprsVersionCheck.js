#!/usr/bin/env node

'use strict';

/*
 * Basic setup
 */
var nodem = require('nodem');
var RPCRunner = require('../../VDM/prototypes/rpcRunner').RPCRunner;

process.env.gtmroutines = process.env.gtmroutines + ' .' + ' ../../VDM/prototypes/';

let db = new nodem.Gtm();
db.open();

process.on('uncaughtException', function(err) {
    db.close();

    console.trace('Uncaught Exception:\n', err);

    process.exit(1);
});

let DUZ = 61; // Should match Robert Alexander used in JSON tests but may not.
let rpcRunner = new RPCRunner(db);
rpcRunner.initializeUser(DUZ);

let CPRS_VERSION_WE_USE = "1.0.30.69";
let args = [
    "OR CPRS GUI CHART",
    CPRS_VERSION_WE_USE
];
let res = rpcRunner.run("ORWU VERSRV", args);
if (res.result !== CPRS_VERSION_WE_USE)
    console.log("CPRS Version of Server %s differs from expected %s", res.result, CPRS_VERSION_WE_USE);
else
    console.log("CPRS Version as expected");

db.close();



