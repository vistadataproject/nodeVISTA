/*
 * Ala setup Vitals, need to setup CAPRI which is controlled in parameter XU522
 *
 * OSEHRA VISTA doesn't properly setup its replacement of FOIA Domain (4.2 entry) with OSEHRA domain (their new 4.2 entry).
 */

var util = require('util');
var fs = require('fs');
var nodem = require('nodem');
var os = require("os");
var _ = require('underscore');

process.env.gtmroutines = process.env.gtmroutines + ' .' + " .." + " ../..";

process.on('uncaughtException', function(err) {
  db.close();

  console.trace('Uncaught Exception:\n', err);

  process.exit(1);
});

var db = new nodem.Gtm();
db.open();

/*
 * Note on SYS:
 *
  I ENT="SYS" D:'$D(XPARSYS)  S ENT=XPARSYS Q  ; current site
 . S XPARSYS=$$FIND1^DIC(4.2,"","QX",$$KSP^XUPARAM("WHERE"))_";DIC(4.2,"

  which means get from domain setting in Kernel System Parameters (8989_3-1) if XPARSYS
  not set.
 */

/*
 CAPRI - VA wants N

Enter Y (YES) to disable old-style CAPRI logins (default).
Enter E (ERROR) to disable old-style CAPRI logins and trap attempts.
Enter N (NO) to leave old-style CAPRI logins enabled.
Enter L (DEBUG) to leave old-style CAPRI logins enabled but trap attempts.
 */
function setupCapriInOSEHRA() {

    var res = db.function({function: "GET^XPAR", arguments: ["SYS", "XU522", "1"]});
    if (res.result !== "N") {
        // Kick trace - what is DOMAIN in kernel system parameters
        var domainIEN = db.get({global: "XTV", subscripts: [8989.3,1,0]}).data.split("^")[0];
        console.log("CAPRI user needs to be setup for the OSEHRA domain which has IEN", domainIEN);
        res = db.function({function: "ADD^XPAR", arguments: ["SYS", "XU522", 1, "N"]});
        if (res.ok !== 1)
            throw new Error("ADD^XPAR failed");
        res = db.function({function: "GET^XPAR", arguments: ["SYS", "XU522", "1"]})
        if (res.result !== "N")
            throw new Error("Failed to set XU522 for current domain to N");
        // TODO: kill "@" value for ADD, the entry for FOIA (which won't be SYS!) ... how to do?
    }
    else
        console.log("CAPRI User already setup properly - OSEHRA omission fixed");

}

setupCapriInOSEHRA();

db.close();
