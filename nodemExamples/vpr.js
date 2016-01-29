#!/usr/bin/env node

/**
 * Invoking VPR - VPR is a service, not just one simple RPC
 *
 * TODO: 
 * - cover all of VPR invoked through the RPC Broker
 * - ala fmqlInvoke, allow pass in of patient id (and domain) ie more like a command
 */

var nodem = require('nodem');
var util = require('util');

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

var fs = require('fs'),
    ret,
    fd;
fd = fs.openSync("NODEFUNC.m", "w");

// VISTA needs U initialized
fs.writeSync(fd, 'INIT() S U="^" Q "DONE"\n\n');
// From zwrite.js - allow global dump using ZWR
fs.writeSync(fd, 'zwr(glvn) s:$e(glvn)\'="^" glvn="^"_glvn zwr @glvn q ""\n\n');

// VERSION passes return argument by reference - make return explicit
fs.writeSync(fd, 'WRAPVPRV() N RET D VERSION^VPRD(.RET) Q RET  ; Wrap VPR version - ref to value\n\n');
// VPRDJ complex arguments passed by reference. "domain" is optional AND absence leads to $$ALL in code. TMP holds result.
fs.writeSync(fd, 'WRAPVPRDJ(patientId,domain) N VPR N FILTER S FILTER("patientId")=patientId S:$D(domain) FILTER("domain")=domain D GET^VPRDJ(.VPR,.FILTER) Q  ; Wrap VPR get \n\n'); 

fs.closeSync(fd);

// Init sets U needed in VISTA
db.function({function: "INIT^NODEFUNC"});

/*
 * Invoke VPR methods normally called via the RPC Broker
 */

// db.kill({"global": "TMP", subscripts: ["VPR"]});

// 1. Simplest - pass by reference return value flipped in a wrapper. No arguments proper.
// https://github.com/OSEHRA/VistA-M/blob/master/Packages/Virtual%20Patient%20Record/Routines/VPRD.m
console.log("\nVERSION^VPRD - version: %j\n", db.function({function: "WRAPVPRV^NODEFUNC"}).result);

// Variations of VPR GET PATIENT DATA JSON
function getPatientData(arguments) {
    var rpcGlobal = db.function({function: "WRAPVPRDJ^NODEFUNC", arguments: arguments});
    console.log("\rGET^VPRDJ - arguments: %j", rpcGlobal.arguments); 
    // console.log("Data: %j", db.get({ global: "TMP", subscripts: ["VPR", process.pid] }));
    // Reassembling JSON from TMP
    var json = "";
    var next = {global: "TMP", subscripts:["VPR",process.pid, ""]};
    while (true) {
        next = db.next_node(next);
        if (next.subscripts === undefined)
            break;
        var text = db.get(next).data;
        json += text;
    }
    // Clean up for next VPR GET call
    db.kill({"global": "TMP", subscripts: ["VPR",process.pid]});
    json = JSON.parse(json);
    // console.log(JSON.stringify(json, null, "\t"));
    console.log(util.inspect(json, {depth: null, colors: true}));
    console.log("\n\n");
}

// 2 VPR GET PATIENT DATA JSON - all
getPatientData(["1"]); // patient 1 (seems to have some data and is used for testing Vitals etc result)

// 3. VPR GET PATIENT DATA JSON - patient domain only
getPatientData(["1", "patient"]);

// ... to see TMP ... taken from David Wicksell's zwrite.js
// db.function({function: "zwr^NODEFUNC", arguments: ["TMP"]});

console.log("\n\n");

// Clean up Wrapper file 
fs.unlinkSync("NODEFUNC.m");
fs.unlinkSync("NODEFUNC.o");

db.close();
