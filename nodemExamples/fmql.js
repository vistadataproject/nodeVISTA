#!/usr/bin/env node

/**
 * Simple FMQL invocation using its node supporting wrapper
 *
 * NOTE: FMQL doesn't rely on VistA Constants like "U" so
 * no need to initialize them.
 */

var util = require('util');
var nodem = require('nodem');
var db = new nodem.Gtm();

db.open();

process.on('uncaughtException', function(err) {
  db.close();

  console.trace('Uncaught Exception:\n', err);

  process.exit(1);
});

function invokeQuery(query) {

    // Note that $J in MUMPS matches process.pid in Node. Note FMQL setup for direct calling from Node (no need for wrapper)
    var tmpFMQL = db.function({function: "QUERY^FMQLQP", arguments: [query]});
    console.log("Return from FMQL: %j", tmpFMQL);

    // Reassembling JSON from TMP
    var json = "";
    var next = {global: "TMP", subscripts:[process.pid, "FMQLJSON", ""]};
    while (true) {
        next = db.next(next);
        if (next.subscripts[2] === '')
            break;
        else {
            var text = db.get(next).data;
            json += text;
        }
    }
    json = JSON.parse(json);
    // console.log("\nJSON: %j\n", json);
    console.log(util.inspect(json, {depth: null, colors: true}));
    console.log("\n\n");
    db.kill({"global": "TMP", subscripts: [process.pid]});
}

invokeQuery("DESCRIBE 2-1");
invokeQuery("COUNT 2");
invokeQuery("COUNT 52");
invokeQuery("COUNT 63");

db.close()
