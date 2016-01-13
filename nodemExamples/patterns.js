#!/usr/bin/env node

/**
 * VistA Functions - simple wrapped VistA functions
 *
 * Direct invocation of pure local and RPC Broker accessible functions through
 * nodem. Shows how to dynamically wrap those where either [1] return values
 * or [2] arguments are passed by reference.
 *
 * Also shows how some constants normally initialized by the Kernel or the 
 * RPC Broker need to be explicitly initialized by this process in order
 * for VISTA functions to run.
 *
 * TODO: round out many examples of TMP walking and wrapping by reference
 * function calls.
 *
 * NOTE: issue of ,,,, missing optionals below
 */

var nodem = require('nodem');

var db = new nodem.Gtm();
db.open();

process.on('uncaughtException', function(err) {
  db.close();

  console.trace('Uncaught Exception:\n', err);

  process.exit(1);
});

// Important - allow for dynamic code addition but also must be set up here
// before gtm loads code ie/ before db.function or other db calls are made.
// Copied from David Wicksell's zwrite.js
process.env.gtmroutines = process.env.gtmroutines + ' .';

/*
 * Simple return values and arguments passed by value ie/ local calls, not RPCs ...
 *
 * ... mostly from Lexicon
 * ... issue for some that VistA constant 'U' isn't set. See how to initialize first.
 */
console.log("\nSIMPLE FUNCTIONS: simple return value, arguments pass by value\n");

// nodem implements the node-mumps interface in MUMPS in v4wnode.m. Version can be
// called directly through function. Same effect as calling db.version() 
// {ok: 1, function: ..., result: ..., arguments: ...} ... just want result
console.log("\tversion from nodem: %j", db.function({function: 'version^v4wNode'}));

console.log("\tDT currently in VistA: %j", db.function({function: "DT^XLFDT"}).result);

var result = db.function({function: "VERSION^XPDUTL"});
// {ok: 0, errorCode: ..., errorMessage: ...}
console.log("\n\tVERSION of package - left out package argument so errorCode: %s -- message: %s", result.errorCode, result.errorMessage);
console.log("\tVERSION of FileMan package: %j", db.function({function: "VERSION^XPDUTL", arguments: ["DI"]}).result);

// 123037004 == SNOMED body structure
console.log("\n\tsnomed body structure in STATCHK: %j", db.function({function: "STATCHK^LEXSRC2", arguments: ["123037004"]}).result);
// 250.81 is valid - don't know why there is no expression
console.log("\ticd lookup (EXP^LEXCODE): %j", db.function({function: "EXP^LEXCODE", arguments: ["250.81", "ICD"]}).result);

/*
 * Dynamically link in a new routine that sets U (needed by functions below). 
 * Copied from David Wicksell's zwrite.js. 
 *
 * Note: need to write everything needed before the first invocation of an entry as M is only compiled once
 */
var fs = require('fs'),
    ret,
    fd;
fd = fs.openSync("NODEFUNC.m", "w");
fs.writeSync(fd, 'INIT() S U="^" Q "DONE"\n\n');
fs.writeSync(fd, 'zwr(glvn) s:$e(glvn)\'="^" glvn="^"_glvn zwr @glvn q ""');
fs.closeSync(fd);

/*
 expect certain global variables to be set
 ; See: http://www.hardhats.org/tools/sac07.html#_TOC011
 ;
 ; Usually set by FM or Kernel initialization (and
 ; some routines do their own initialization too) but not
 ; set if calling straight from Node/Javascript
 ;
 ; Presume if U set already then no need to reset others
 ;
 I '$D(U) S U="^",DT=$$DT^XLFDT,(IO,IO(0),IOF,IOM,ION,IOS,IOSL,IOST,IOT)="",POP=0
 ;
 ; Set U="^",DT=$ZDate($Horolog,8)-17000000 ... Ed's
 */

// https://github.com/OSEHRA/VistA-M/blob/master/Packages/Lexicon%20Utility/Routines/LEXSRC2.m
// $$STATCHK^LEXSRC2("123037004")
var result = db.function({function: "CODE^LEXTRAN", arguments: ["123037004", "SCT"]});
console.log("\n\tExpect error of undefined code from GT.M because VistA constant U is not defined: %j", result);
console.log("\t\t... inserting function to set U etc and invoking it");
db.function({function: "INIT^NODEFUNC"});
console.log("\t2nd time lucky - initialized U etc: %j", db.function({function: "CODE^LEXTRAN", arguments: ["123037004", "SCT"]}));

// Issue for nodem? ,,, values?
// https://github.com/OSEHRA/VistA-M/blob/master/Packages/Lexicon%20Utility/Routines/LEXTRAN.m
// console.log("\tlookup text in scheme - undefined within nodem: %j", db.function({function: "TEXT^LEXTRAN", arguments: ["Biphasic"]}));
// ... issue here: end up with shell prompt and if pass in ,,,ARG to specify defaults then get GT.M undefined from nodem code.
// ... may need to submit bug fix?

/*
 * Pass by reference handling - need to have wrappers that turn by reference returns into explicit returns OR
 * pass back the name of global that holds a return value.
 */

// ... to see TMP ... taken from David Wicksell's zwrite.js
// db.function({function: "zwr^NODEFUNC", arguments: ["TMP"]});

console.log("\n\n");

// No need to keep around 
fs.unlinkSync("NODEFUNC.m");
fs.unlinkSync("NODEFUNC.o");

db.close();
