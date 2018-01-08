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
    require('mvdm/patient/vdmPatientModel').vdmModel,

    // provider
    require('mvdm/fileman/vdmNewPersonModel').vdmModel,
    require('mvdm/fileman/vdmMasParametersModel').vdmModel,

    // PCE;
    require('mvdm/PCE/vdmPCEModel').vdmModel);


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
    require('mvdm/patient/mvdmPatientModel').mvdmModel,

    //PCE
    require('mvdm/PCE/mvdmPCE_CPTModel').mvdmModel,
    require('mvdm/PCE/mvdmPCE_DiagnosisModel').mvdmModel,
    require('mvdm/PCE/mvdmPCE_ExamModel').mvdmModel,
    require('mvdm/PCE/mvdmPCE_HealthFactorsModel').mvdmModel,
    require('mvdm/PCE/mvdmPCE_SkinModel').mvdmModel,
    require('mvdm/PCE/mvdmPCE_ProviderModel').mvdmModel,
    require('mvdm/PCE/mvdmPCE_PatientEdModel').mvdmModel,
    require('mvdm/PCE/mvdmPCE_ImmunizationModel').mvdmModel,
    require('mvdm/PCE/mvdmOutpatientEncounter').mvdmModel,
    require('mvdm/PCE/mvdmProviderNarrativeModel').mvdmModel
    );

// Clinical RPC Emulator models
const rpcEmulatorModel = [].concat(
    require('mvdm/allergies/rpcEmulatorAllergiesModel').rpcEmulatorModel,
    require('mvdm/problems/rpcEmulatorProblemModel').rpcEmulatorModel,
    require('mvdm/vitals/rpcEmulatorVitalsModel').rpcEmulatorModel,
    require('mvdm/patient/rpcEmulatorPatientModel').rpcEmulatorModel,
    require('mvdm/PCE/rpcEmulatorPCEModel').rpcEmulatorModel
    );



module.exports = {
    vdmModel,
    mvdmModel,
    rpcEmulatorModel,
};
