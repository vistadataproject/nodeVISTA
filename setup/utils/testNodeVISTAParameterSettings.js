'use strict';

/*
 * Tests for settings made during nodeVISTA installation
 */

var util = require('util');
var fs = require('fs');
var nodem = require('nodem');
var os = require("os");
var _ = require('underscore');

process.env.gtmroutines = process.env.gtmroutines + ' .' + ' ../../../VDM/prototypes/';

var testUtils = require("../../../VDM/prototypes/testUtils");

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
 * 1. CAPRI - VA wants N
 *
 * Set with: "ADD^XPAR", arguments: ["SYS", "XU522", 1, "N"]
 *
 * Enter N (NO) to leave old-style CAPRI logins enabled.
 */
// TODO: kill "@" value for ADD, the entry for FOIA (which won't be SYS!) ... how to do?
let res = db.function({function: "GET^XPAR", arguments: ["SYS", "XU522", "1"]})
if (res.result !== "N") {
    console.log("CAPRI setup failed:", res.result)
}
else {
    console.log("CAPRI has expected value:", res.result);
}

/*
 * 2.
 *
 * Set with: "ADD^XPAR", arguments: ["SYS", "GMV TEMPLATE", "DAILY VITALS", EXPECTED_GMV_TEMPLATE_DAILY_VITALS]
 */
let EXPECTED_GMV_TEMPLATE_DAILY_VITALS = "TPR, BP|1:0;5:0;3:0;2:0;21:0;8:0;22:0;9:0";
res = db.function({function: "GET^XPAR", arguments: ["SYS", "GMV TEMPLATE", "DAILY VITALS"]});
if (res.result !== EXPECTED_GMV_TEMPLATE_DAILY_VITALS) {
    console.log("SYS/GMV TEMPLATE has unexpected or no value", res.result);
}
else {
    console.log("SYS/GMV TEMPLATE has expected value");
}

/*
 * 3. Per user setting so need USR
 * 
 * Set with: "ADD^XPAR", arguments: ["USR","GMV USER DEFAULTS","DefaultTemplate",EXPECTED_USR_GMV_USER_DEFAULTS_DefaultTemplate]
 */
let userDuz = testUtils.lookupUserIdByName(db, "ALEXANDER,ROBERT").split("-")[1];
db.function({function: "INITUSR^RPCRUN", arguments: [userDuz]});
let EXPECTED_USR_GMV_USER_DEFAULTS_DefaultTemplate = "00;DIC(4.2,|DAILY VITALS";
// Note: code has extra/fourth argument "Q" which is pass by reference to return error value. No good for us.
let getArgs = ["USR", "GMV USER DEFAULTS", "DefaultTemplate"];
res = db.function({function: "GET^XPAR", arguments: getArgs});
if (res.result !== EXPECTED_USR_GMV_USER_DEFAULTS_DefaultTemplate) {
    console.log("USR/GMV USER DEFAULTS/DefaultTemplate has unexpected or no value - resetting. %s" + JSON.stringify(res));
}
else {
    console.log("USR/GMV USER DEFAULTS/DefaultTemplate has expected value");
}

db.close();

