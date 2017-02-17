#!/usr/bin/env node

'use strict';

/**
 * Clinical models supported by the RPC Server: VDM, MVDM, rpcL
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

// ClinicalRPCLocker models
const rpcLModel = [].concat(
    require('mvdm/allergies/rpcLAllergiesModel').rpcLModel,
    require('mvdm/problems/rpcLProblemModel').rpcLModel,
    require('mvdm/vitals/rpcLVitalsModel').rpcLModel,
    require('mvdm/patient/rpcLPatientModel').rpcLModel,
    require('mvdm/utilityRPCs/rpcLRemoteUtilitiesModel').rpcLModel);

module.exports = {
    vdmModel,
    mvdmModel,
    rpcLModel,
};
