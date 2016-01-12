/**
 * Showcase node global traversal by walking the DPT (Patient) FileMan global
 *
 * FileMan globals have a very specific format - working with FileMan
 * in MUMPS is not the same as working with raw MUMPS globals. FileMan
 * "packs" multiple values in a subscript, puts indexes at the end of
 * a global and meta data at its start. To truly interpret the data you
 * need to consule the data dictionary (DD), something we won't do here.
 *
 * Illustrates traversing globals [1] iterating with "next", [2] checking
 * the nature of content (at subscript or below or both) with "data" and
 * [3] taking values with "get".
 *
 * TODO: add node_next for multiples ie/ walk down (recursively) once
 * through top level.
 *
 * Note: one handy "document" grabbing routine in Cache's node i/f is 'retrieve'.
 * This isn't supported in GT.M. Effectively you perform a walk as illustrated
 * below in order to make your own "retrieve"
 *
 * See: OUTPUT_DPT_WALKER to see output of running this on OSEHRA VistA.
 *
 */
var nodem = require('nodem');
var os = require("os");

var db = new nodem.Gtm();
db.open();

/**
 * Here's an option from David Wicksell to invoke zwr to dump the global
 
// Important - add environment before any function's are called below. 
// Otherwise GT.M will have been linked.
var fs = require('fs'),
    ret,
    fd,
    code = 'zwr(glvn) s:$e(glvn)\'="^" glvn="^"_glvn zwr @glvn q ""';
fd = fs.openSync('v4wTest.m', 'w');
fs.writeSync(fd, code);
process.env.gtmroutines = process.env.gtmroutines + ' .';
db.function({function: 'zwr^v4wTest', arguments: ["DPT"]});
fs.closeSync(fd);
fs.unlinkSync('v4wTest.m');
fs.unlinkSync('v4wTest.o');

 *
 */

// DPT == global used to hold patient data
console.log("Reporting on Patient Global (DPT):" + os.EOL);
var node = { global: "DPT", subscripts: [""] };
// iterate where result == subscript at this level
while ((node = db.next(node)).result !== "") {

    // FileMan - first 0 entry defines type
    // ... includes a not always accurate IEN count
    if (node.result === 0) {
        console.log("META:\t" + db.get(node).data + os.EOL);
        continue;
    } 

    // Full entries always have a zero node - indexes follow and they don't
    if (db.data({global: "DPT", subscripts: node.subscripts.concat(0)}).defined === 0) {
        console.log("INDEX:\t" + node.result);
        var idxnode = {global: "DPT", subscripts: node.subscripts.concat("")};
        while ((idxnode = db.next(idxnode)).result !== "") {
            // Two level with a value ... TODO: but what value?
            if (db.data(idxnode).defined === 1) {
                console.log("\t:" + idxnode.subscripts[1] + " - " + db.get(idxnode).data);
                continue;
            }
            // Most of these indexes are three level ie/ patient-id, value indexed, patient ien
            if (db.data(idxnode).defined !== 10)
                throw "Unexpected lack of data or third level in FileMan index";
            var idxxnode = {global: "DPT", subscripts: idxnode.subscripts.concat("")};
            while ((idxxnode = db.next(idxxnode)).result !== "") {
                console.log("\tValue:\t" + idxxnode.subscripts[1] + "\tIEN:\t" + idxxnode.subscripts[2]);
            }
        }
        continue;
    }

    console.log("IEN:\t" + node.result);
    // Each location holds one or more values ...
    var ienvnode = {global: "DPT", subscripts: node.subscripts.concat("")};
    while ((ienvnode = db.next(ienvnode)).result !== "") {
        if (db.data(ienvnode).defined === 1) { // value
            console.log("\t" + ienvnode.result + ":\t" + JSON.stringify(db.get(ienvnode).data));
            continue;
        }
        // multiples - subfiles - (ex/ appointments) are one level below (and can go on and on.)
        // ... move into recursion here to dive down the multiples.
        if (db.data(ienvnode).defined === 10) {
            console.log("\t" + ienvnode.result + ":\t" + "MULTIPLE ... TODO"); // will dive TODO
            continue;
        }
        throw "FileMan data either a value (1) or a multiple (10) but not a mix (11)";
    } 
    console.log();
}
