/*
 * FileMan DD has holes/bugs - most don't directly effect the VDP prototypes but those that do need to be fixed.
 *
 * TODO: move this set of fixes over to the nodeVISTA setup and this and other DD problems that show up will find their
 * way into a succinct report for the VA.
 */

var nodem = require('nodem');

process.env.gtmroutines = process.env.gtmroutines + ' .';

/*
 * Fix DD to allow prototypes to run.
 */
function fixDD() {

    var db = new nodem.Gtm();
    db.open();

    console.log("Fixing DD:");

    // Fixing old problem value in 125.8 to expose old note narrative: see issue 
    //           https://github.com/vistadataproject/VDM/issues/112
    var subscripts = ["125.8","10","0"];
    var value = "OLD PROBLEM ENTRY^F^^1;3^K:$L(X)>150!($L(X)<1) X"; // 1;1 to 1;3
    console.log("\tDD change: subscripts %j, value %s", subscripts, value);
    db.set({global: "DD", subscripts: subscripts, data: value});

    console.log();
    
    db.close();

}

fixDD();
