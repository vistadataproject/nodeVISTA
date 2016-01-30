#!/usr/bin/env node

/**
 * Vitals Prototype: Create VITAL RPC (GMV ADD VM)
 *
 * Note: RPC testing to prepare for VDM, seeing what works 
 * including what isn't checked (invalid refs, missing values ...)
 *
 * Companion to pure UPDATE^DIE Vital Create test
 *
 * TODO: add tests of qualifiers
 *
 * This basic UPDATE^DIE wrapper massages but doesn't validate input data.
 * It IS NOT SUITABLE FOR DIRECT EXPOSURE AS A NETWORK SERVICE CALL.
 * ... examples of "thou shalt nots" for (M)VDM
 *
 * Date = 10/11/2015 - 3051011....
 * Patient = 2-1 (OSEHRA Base goes 1-25)
 * Type; Value = BLOODPRESSURE (120_51-1 ; 120/80)
 * Location = 44-4 (OSEHRA Base has 1-10)
 * User (200) = 56, Mary Smith
 *
 * (c) 2016 VISTA Data Project
 */
 
/*
 * Basic setup
 */
var nodem = require('nodem');
var os = require("os");

var db = new nodem.Gtm();
db.open();

process.on('uncaughtException', function(err) {
  db.close();

  console.trace('Uncaught Exception:\n', err);

  process.exit(1);
});

/*
 * Dynamically link in a wrappers to allow VPR function invocation. 
 * Copied from David Wicksell's Pattern in zwrite.js. 
 *
 * Note: need to write everything needed before the first invocation of an entry as M is only compiled once
 */
process.env.gtmroutines = process.env.gtmroutines + ' .'; // allow dynamic code addition - tmp add to current dir. Must come before first db.function

// GMVDCSAV.m
var fs = require('fs'),
    ret,
    fd;
fd = fs.openSync("NODEFUNC.m", "w");
fs.writeSync(fd, 'INIT() S U="^" Q "DONE"\n\n');
fs.writeSync(fd, 'NEXTIEN(FLARRAY) Q:\'$D(@FLARRAY@(0)) -1 N FLHDR S FLHDR=@FLARRAY@(0) Q $P(FLHDR,"^",3)+1\n\n');
fs.writeSync(fd, 'W4GMVDCSAV(ARGS) N RET D EN1^CGVDCSAV(.RET,ARGS) S:\'$D(RET) RET="NO PROBLEM" Q RET  ; Wrap VITAL CREATE\n\n');
fs.closeSync(fd);
// Many VISTA RPCs need INIT
db.function({function: "INIT^NODEFUNC"});


console.log("\n\n========== 1. GMVDCSAV Tests ===========\n\n");

// var currentDate = db.function({function: "DT^XLFDT"}).result;
var currentTime = db.function({function: "NOW^XLFDT"}).result;
var rpcArg = currentTime + "^1^1;120/80^4^56";
console.log("Creating Vital with argument: " + rpcArg);
var res = db.function({function: "W4GMVDCSAV^NODEFUNC", arguments: [rpcArg]});
if (res.ok === 1)
    console.log("... success - %j\n\n", res);
else
    console.log("... error - %j\n\n", res);

var nextVTIEN = db.function({function: "NEXTIEN^NODEFUNC", arguments: ["^GMRD(120.51)"]}).result;
var rpcArg = currentTime + "^1^" + nextVTIEN + ";120/80^4^56";
console.log("Creating BAD Vital for invalid Vital type: 120_51-" + nextVTIEN + " - unresolvable IEN inserted");
var res = db.function({function: "W4GMVDCSAV^NODEFUNC", arguments: [rpcArg]});
if (res.ok === 1)
    console.log("... success - %j\n\n", res);
else
    console.log("... error - %j\n\n", res);

// Special case exceptions code - note: no + for 'type' which means doesn't default to 0. Further problem in XREF.
var rpcArg = currentTime + "^1^;120/80^4^56";
console.log("Trying to create Vital without specifying a vital type - a side effect attempt to set a XREF leads to an exception"); 
var res=db.function({function: "W4GMVDCSAV^NODEFUNC", arguments: [rpcArg]});
if (res.ok === 1)
    console.log("... success - %j\n\n", res);
else
    console.log("... error - %j\n\n", res);

// VDM: thou shalt not allow invalid references - referential integrity.
// true for all of Location/Patient/User
var nextLOCIEN = db.function({function: "NEXTIEN^NODEFUNC", arguments: ["^SC"]}).result; // 44
var rpcArg = currentTime + "^1^1;120/80^" + nextLOCIEN + "^56";
console.log("Creating BAD Vital for invalid location: 44-" + nextLOCIEN + " - unresolvable IEN inserted");
var res = db.function({function: "W4GMVDCSAV^NODEFUNC", arguments: [rpcArg]});
if (res.ok === 1)
    console.log("... success - %j\n\n", res);
else
    console.log("... error - %j\n\n", res);

// VDM: thou shalt not stuff in a 0 because a property isn't specified
// ... or is this a (rather lame) convention?
// S GMVHOSPL=+$P(GMVVMEAS,"^",4) ; Hospital - + means 0 substituted for ""
// ... same is true for USER (200) reference.
// ... same is true for PATIENT (2) reference
// ... probably as UPDATE^DIE mandates presence ...
//
// Warning: date has + too but if left out, this hangs
//
var rpcArg = currentTime + "^1^1;120/80^^56";
console.log("Creating BAD Vital for NO location - Function uses 0");
var res = db.function({function: "W4GMVDCSAV^NODEFUNC", arguments: [rpcArg]});
if (res.ok === 1)
    console.log("... success - %j\n\n", res);
else
    console.log("... error - %j\n\n", res);

// A Vital with no observed value is allowed ie/ type is always there but value can be absent!
var rpcArg = currentTime + "^1^1;^4^56";
console.log("Creating BAD Vital for no value");
var res = db.function({function: "W4GMVDCSAV^NODEFUNC", arguments: [rpcArg]});
if (res.ok === 1)
    console.log("... success - %j\n\n", res);
else
    console.log("... error - %j\n\n", res);

# TODO: test qualifiers (ie/ SET etc)

/* 
 * Nix temporary work file NODEFUNC.m and close DB
 */
fs.unlinkSync("NODEFUNC.m");
fs.unlinkSync("NODEFUNC.o");

db.close();
