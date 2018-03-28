#!/usr/bin/env node

/*
 * FileMan Data Dictionaries (DDs) have bugs. Some VISTA MUMPS code isn't portable (to GT.M)
 * VDPCorrections.m fixes such problems. For details, see VDPCorrectionsAbout.txt
 *
 * (c) 2017 VISTA Data Project
 */

'use strict';

const nodem = require('nodem');

process.env.gtmroutines = process.env.gtmroutines + ' .';

const db = new nodem.Gtm();
db.open();

process.on('uncaughtException', function(err) {
    db.close();

    console.trace('Uncaught Exception in Pharmacy Patient Addition:\n', err);

    process.exit(1);
});

console.log("\nRunning VDP's DD and MUMPS portability corrections\n");

let res = db.function({function: "CORRECT^VDPCorrections"});

if (res.ok !== 1) {
    console.log("Bad result for VDP Corrections:", res);
}

db.close();
