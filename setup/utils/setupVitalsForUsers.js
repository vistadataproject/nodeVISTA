#!/usr/bin/env node

/*
 * Configure OSEHRA VISTA test users to allow vital creation etc in CPRS
 *
 * BG: Vitals in CPRS driven by and sets up PARAMETERS. Giving CPRS GUI CHART
 * permission to a user is NOT enough.
 * 
 * TODO: will merge with "setupTestUsers.js"
 */

var util = require('util');
var fs = require('fs');
var nodem = require('nodem');
var os = require("os");
var _ = require('underscore');

// process.env.gtmroutines = process.env.gtmroutines + ' .' + " .." + " ../..";
process.env.gtmroutines = process.env.gtmroutines + ' .' + ' ../../../VDM/prototypes/';

process.on('uncaughtException', function(err) {
  db.close();

  console.trace('Uncaught Exception:\n', err);

  process.exit(1);
});

var db = new nodem.Gtm();
db.open();

/*
TO ADD http://vistapedia.net/index.php?title=Configuration_of_Vitals_/_Measurements

S GMVDLL="GMV_VITALSVIEWENTER.DLL:v. 08/11/09 15:00"

D EN^XPAR("SYS","GMV DLL VERSION",GMVDLL,1)

S GMVDLL="GMV_VITALSVIEWENTER.DLL:v. 01/21/11 12:52"

D EN^XPAR("SYS","GMV DLL VERSION",GMVDLL,1)

S GMVGUI="VITALSMANAGER.EXE:5.0.26.1"

D EN^XPAR("SYS","GMV GUI VERSION",GMVGUI,1)
*/

function setupVitalsForSysAndUser(userDuz) {

    /*
     * GMV MANAGER RPC - RPC^GMVRPCM(.RESULT,OPTION,DATA)
     *
     *    "When the OPTION value is GETTEMP, this RPC will return a list data input templates definitions."
     *
     * Call of GMV MANAGER: ["GMVTEMP"] ie/ no DATA set will reduce to GET^XPAR (via ENVAL^XPAR)
     * for the PARAMETER (defined in 8989.51) of "GMV TEMPLATE", instance "DAILY VITALS".
     */
    var EXPECTED_GMV_TEMPLATE_DAILY_VITALS = "TPR, BP|1:0;5:0;3:0;2:0;21:0;8:0;22:0;9:0";
    var res = db.function({function: "GET^XPAR", arguments: ["SYS", "GMV TEMPLATE", "DAILY VITALS"]});
    if (res.result !== EXPECTED_GMV_TEMPLATE_DAILY_VITALS) {
        console.log("SYS/GMV TEMPLATE has unexpected or no value - resetting");
        var res = db.function({function: "ADD^XPAR", arguments: ["SYS", "GMV TEMPLATE", "DAILY VITALS", EXPECTED_GMV_TEMPLATE_DAILY_VITALS]});
        if (res.ok !== 1)
            throw new Error("ADD^XPAR failed");
        // Confirm result set
        res = db.function({function: "GET^XPAR", arguments: ["SYS", "GMV TEMPLATE", "DAILY VITALS"]});
        if (res.result !== EXPECTED_GMV_TEMPLATE_DAILY_VITALS)
            throw new Error("Tried to reset SYS/GMV TEMPLATE and failed - " + JSON.stringify(res));
    }
    else
        console.log("SYS/GMV TEMPLATE/DAILY VITALS already set");

    /*
     * GMV USER - RPC^GMVRPCU(.RESULT,OPTION,DATA)
     * 
     *    "Retrieves data about the user (e.g., parameter settings)"
     *
     * But OPTION of "SETPAR" will "set and/or delete the value of a GMV USER DEFAULTS setting"
     *
     * Call of GMV USER: ["GETPAR", "DefaultTemplate"] with implicit value of DUZ (ie/ it is per user). Reduces to
     * call to GET^XPAR("USR","GMV USER DEFAULTS","DefaultTemplate")
     */ 
    // First must setup the DUZ! ie/ USR, not SYS
    // ...  I ENT="USR" S ENT=DUZ_";VA(200," Q 
    db.function({function: "INITUSR^RPCRUN", arguments: [userDuz]});
    var EXPECTED_USR_GMV_USER_DEFAULTS_DefaultTemplate = "00;DIC(4.2,|DAILY VITALS";
    // Note: code has extra/fourth argument "Q" which is pass by reference to return error value. No good for us.
    var getArgs = ["USR", "GMV USER DEFAULTS", "DefaultTemplate"];
    var res = db.function({function: "GET^XPAR", arguments: getArgs});
    if (res.result !== EXPECTED_USR_GMV_USER_DEFAULTS_DefaultTemplate) {
        console.log("USR/GMV USER DEFAULTS/DefaultTemplate has unexpected or no value - resetting. %s" + JSON.stringify(res));
        res = db.function({function: "ADD^XPAR", arguments: ["USR","GMV USER DEFAULTS","DefaultTemplate",EXPECTED_USR_GMV_USER_DEFAULTS_DefaultTemplate]});
        if (res.ok !== 1)
            throw new Error("ADD^XPAR failed");
        res = db.function({function: "GET^XPAR", arguments: getArgs});
        if (res.result !== EXPECTED_USR_GMV_USER_DEFAULTS_DefaultTemplate)
            throw new Error("Tried to reset USR/GMV USER DEFAULTS/DefaultTemplate and failed - " + JSON.stringify(res));
    }
    else
        console.log("USR/GMV USER DEFAULTS/DefaultTemplate already set");

    // TO TRY: value "@" for ADD will delete a setting
}

// Lookup Robert Alexander the old fashioned way - B index in VA(200
var raIEN = db.next({global: "VA", subscripts: [200, "B", "ALEXANDER,ROBERT", 0]}).result;
setupVitalsForSysAndUser(raIEN);

db.close();
