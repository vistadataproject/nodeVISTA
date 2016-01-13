#!/usr/bin/env node

/**
 * Calling some basic nodem routines - open db, about
 * db, globals list ...
 *
 * See OUTPUT_BASIC for output
 */
var nodem = require('nodem');
var db = new nodem.Gtm();
var ok = db.open();
console.log("\nBasic nodem calls ...");
console.log('\tdb.open returns: ' + JSON.stringify(ok));
// same as db.about()
console.log('\tversion: ' + db.version());
console.log('\tglobal directory (list): ' + JSON.stringify(db.global_directory({})));
console.log('\tglobal directory (just the l\'s): ' + JSON.stringify(db.global_directory({lo: "L", hi: "L~"})));
console.log();

db.close();
