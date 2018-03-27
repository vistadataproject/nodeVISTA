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

    VDM.update({ id: '8989_3-1', type: 'Kernel_System_Parameters-8989_3', intro_message: `${banner}\r\r${text}` });

}

/*
 * Rename CONSOLE to GTM-UNIX-CONSOLE and make it SIGN-ON/SYSTEM DEVICE: YES
 */
function setGTMConsole() {

}
