#!/usr/bin/env node

'use strict';

/**
 * Clinical models supported by the RPC Server: VDM, MVDM, rpcEmulator
 */

// VDM Models
const vdmModel = [].concat(
    // allergies
    require('mvdm/allergies/vdmAllergiesModel').vdmModel,
    require('mvdm/documents/vdmDocumentsModel').vdmModel,
    require('mvdm/visits/vdmVisitsModel').vdmModel,

    // problems
    require('mvdm/problems/vdmProblemsModel').vdmModel,

    // vitals
    require('mvdm/vitals/vdmVitalsModel').vdmModel,

    // patient
    require('mvdm/patient/vdmPatientModel').vdmModel);

// MVDM Models
const mvdmModel = [].concat(
    // allergies
    require('mvdm/allergies/mvdmAllergiesModel').mvdmModel,
    require('mvdm/documents/mvdmDocumentsModel').mvdmModel,
    require('mvdm/visits/mvdmVisitsModel').mvdmModel,

    // problems
    require('mvdm/problems/mvdmProblemsModel').mvdmModel,

    // vitals
    require('mvdm/vitals/mvdmVitalsModel').mvdmModel,

    // patient
    require('mvdm/patient/mvdmPatientModel').mvdmModel);

// Clinical RPC Emulator models
const rpcEmulatorModel = [].concat(
    require('mvdm/allergies/rpcEmulatorAllergiesModel').rpcEmulatorModel,
    require('mvdm/problems/rpcEmulatorProblemModel').rpcEmulatorModel,
    require('mvdm/vitals/rpcEmulatorVitalsModel').rpcEmulatorModel,
    require('mvdm/patient/rpcEmulatorPatientModel').rpcEmulatorModel);

module.exports = {
    vdmModel,
    mvdmModel,
    rpcEmulatorModel,
};
