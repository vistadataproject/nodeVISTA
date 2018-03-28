'use strict';

// binding and driver for the GT.M language and database
const nodem = require('nodem');
const vdmNonClinicalModel = require('mvdm/nonClinicalRPCs/vdmNonClinicalModel').vdmModel;
const VDM = require('mvdm/vdm');

// Set up the Nodem instance and connection once for all Jasmine test specs...
const db = new nodem.Gtm();

const init = () => {
    db.open();
    process.on('exit', () => {
        db.close();
    });
    process.on('SIGINT', () => {
        db.close();
    });

    VDM.setDBAndModel(db, vdmNonClinicalModel);
};

module.exports = {
    init,
};
