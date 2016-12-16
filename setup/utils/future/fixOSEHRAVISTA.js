/*
 * Runs three fixes on OSEHRA
 * - comment issue for GT/M in Patient file
 * - bad DD for Problem Audit
 * - bad setup of Parameters for CAPRI
 *
 * FUTURE as VDPCorrections.m leads to errors
 */

var nodem = require('nodem');

process.env.gtmroutines = process.env.gtmroutines + ' .';

var db = new nodem.Gtm();

db.open();

process.on('uncaughtException', function(err) {
  db.close();

  console.trace('Uncaught Exception:\n', err);

  process.exit(1);
});

db.function({function: "VDPCorrections^VDPCorrections"});
    
db.close();
