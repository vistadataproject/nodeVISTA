#!/usr/bin/env node

'use strict';

const utils = require('./nodeVISTAUtils');
const VDM = require('mvdm/vdm');

utils.init();

/*
 * Four DEVICEs (3.5):
 * - NULL (usually reset existing) ... unwanted data dumped
 * - Console (usually reset existing)
 * - Virtual Terminal (ok?)
 * - HFS (ok for KIDS load in  Linux)
 * ... can set/reset all through FileMan (that's what VISTA setup does)
 *
 * Replaces RASUtility for NULL and CONSOLE setup which don't work with new FOIA based
 * OSEHRA which has three ZZNULL devices
 *
 * More see: http://www.hardhats.org/projects/New/InitializeVistA.html
 */

/*
 * OSEHRA in 3/18 has three NULL devices, all called ZZNULL. Want to rename GT/M device NULL and
 * set it appropriately.
 * - rename NULL
 * - nix mnemonic entries
 * - set $I to /dev/null
 */
function setGTMNull() {

    /*
     * Very specific to Devices and NULL devices in 3/18. May change. Setting GTM/Linux device to have name NULL
     */
    let qres = VDM.query("DESCRIBE 3_5 FILTER(.01=ZZNULL&1='/dev/null')")
    if (qres.results.length !== 1)
        throw "No one ZZNULL NULL device of dev/null";
    let device = { id: qres.results[0].id, type: qres.results[0].type, name: "NULL" };
    VDM.update(device);

}

// TODO: CONSOLE, HFS (let subtype = VDM.lookupIdByLabel("Terminal_Type-3_2", "P-HFS/80/99999")), VIRTUAL TERMINAL

setGTMNull();
