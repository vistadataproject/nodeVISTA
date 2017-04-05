/*
 * FileMan Data Dictionaries (DDs) have bugs. Some VISTA MUMPS code isn't portable (to GT.M)
 * VDPCorrections.m fixes such problems. For details, see VDPCorrectionsAbout.txt
 */

var nodem = require('nodem');

process.env.gtmroutines = process.env.gtmroutines + ' .';

/*
 * Fix DD to allow prototypes to run.
 */
function vdpCorrect() {

    var db = new nodem.Gtm();
    db.open();

    console.log("Running VDP's DD corrections");

    var res = db.function({function: "^VDPCorrections"});

    console.log();
    
    db.close();

}

vdpCorrect();
