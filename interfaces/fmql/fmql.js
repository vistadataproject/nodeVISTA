/*
 * FMQL Javascript Wrapper for FMQL behind node.js
 * 
 * LICENSE:
 * This program is free software; you can redistribute it and/or modify it under the terms of 
 * the GNU Affero General Public License version 3 (AGPL) as published by the Free Software 
 * Foundation.
 * (c) 2016 caregraf
 *
 */

'use strict';

function query(db, fmqlQuery, parseJSON) {

    var parseJSON = typeof parseJSON !== 'undefined' ?  parseJSON : true;

    // Note that $J in MUMPS matches process.pid in Node. Note FMQL setup for direct calling from Node (no need for wrapper)
    var tmpFMQL = db.function({function: "QUERY^FMQLQP", arguments: [fmqlQuery]});

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
    if (parseJSON)
        json = JSON.parse(json);

    db.kill({"global": "TMP", subscripts: [process.pid]});

    return json;
}

module.exports.query = query;


