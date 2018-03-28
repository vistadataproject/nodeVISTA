'use strict';

const _ = require('lodash');
const nodem = require('nodem');
const ProgressBar = require('progress');
const emulatorUtils = require('mvdm/nonClinicalRPCs/rpcEmulatorUtils');
const DataModel = require('mvdm/nonClinicalRPCs/vdmNonClinicalModel').vdmModel;
const VDM = require('mvdm/vdm');
const vdmUtils = require('mvdm/vdmUtils');
const fileman = require('mvdm/fileman');

function lookupUserIdByName(db, name) {
    return fileman.lookupBy01(db, '200', name).id;
}

function lookupFacilityIdByName(db, name) {
    return fileman.lookupBy01(db, '4', name).id;
}

class CPTCodeGenerator {
    constructor(options) {
        this.db = null;
        this.process = {};
        this.maxCount = options.maxCount;
        this.codeAlpha = 'A';
        this.codeNumeric = 0;
        this.isVerbose = !!options.isVerbose;
        this.hasMaxCount = !!options.maxCount;
        this.showProgressBar = _.isFunction(_.get(process, 'stdout.clearLine'));

        this.init();
    }

    init() {
        this.initDriver();
        this.initProcess();
    }

    initDriver() {
        // Setup the nodem driver
        process.env.gtmroutines = `${process.env.gtmroutines} ${vdmUtils.getVdmPath()} ${__dirname}`;
        this.db = new nodem.Gtm();
        this.db.open();

        // const userId = lookupUserIdByName(this.db, 'MANAGER,SYSTEM');
        // const facilityId = lookupFacilityIdByName(this.db, 'VISTA HEALTH CARE');

        VDM.setDBAndModel(this.db, DataModel);
        // VDM.setUserAndFacility(userId, facilityId);

        // Setup the clasing of the driver
        ['exit', 'SIGINT'].forEach((signal) => {
            process.on(signal, () => {
                this.db.close();
            });
        });
    }

    initProcess() {
        console.log('Initializing data structures...');
        if (!VDM.exists('81_1-1')) {
            VDM.create({
                type: 'Cpt_Category-81_1',
                category_name: 'Test Category',
                type_of_category: 'MAJOR CATEGORY',
                source: 'CPT',
            });
        }

        // Initialize data required for the process, like the IEN for the CPT coding system, etc.
        const cptSourceIEN = emulatorUtils.lookupCrossReference('757.03', 'LEX', 'B', ['CPT']);
        _.extend(this.process, {
            cptSource: `757_03-${cptSourceIEN}`,
            cptCategory: '81_1-1',
        });

        // Get the last CPT code that has been processed in the system
        console.log('Getting last known CPT code...');
        const result = this.db.function({ function: 'GetLastCPTCode^RAWCPT' });
        this.retrieveCPTCode(result.result || '');
    }

    getNextCPTCode() {
        this.codeNumeric += 1;
        if (this.codeNumeric >= 10000) {
            this.codeNumeric = 1;
            this.codeAlpha = String.fromCharCode(this.codeAlpha.charCodeAt(0) + 1);
        }
        return `${this.codeAlpha}${_.padStart(this.codeNumeric.toString(), 4, '0')}`;
    }

    retrieveCPTCode(code) {
        if (code.length !== 5) {
            return;
        }
        this.codeAlpha = code[0];
        this.codeNumeric = parseInt(code.slice(1), 10);
        console.log(`Active code is ${this.codeAlpha}${_.padStart(this.codeNumeric.toString(), 4, '0')}`);
    }


    generateCodes() {
        // Grab the codes that don't have CPT codes associated yet, and create one for each
        console.log('Getting a list of the unset CPT codes (this may take a few minutes)...');
        const result = this.db.function({ function: 'GetUnsetCodes^RAWCPT' });
        const unsetCodes = JSON.parse(result.result || '[]');
        console.log(`Retrieved ${unsetCodes.length} unset codes!`);

        const codeCount = this.maxCount || unsetCodes.length;
        const codeList = unsetCodes.slice(0, codeCount);

        const bar = new ProgressBar('  [:bar] :current of :total :percent   :elapseds elapsed, eta :etas', {
            incomplete: ' ',
            width: 15,
            total: codeCount,
            renderThrottle: 50,
        });

        let createCount = 0;
        let providerNarrativeFails = 0;
        codeList.forEach((codeIEN) => {
            const vdmObj = VDM.describe(`757_02-${codeIEN}`);
            const updatedObject = this.updateCode(vdmObj);
            this.createCPTCodeEntry(updatedObject);
            providerNarrativeFails += this.createProviderNarrative(updatedObject);
            if (this.showProgressBar) {
                bar.tick();
                bar.render();
            }
            createCount += 1;
        });

        if (this.showProgressBar) {
            bar.terminate();
        }
        console.log(`Created ${createCount} new CPT Code entries!`);
        console.log(`(${providerNarrativeFails} failed creates for Provider Narratives)`);
    }

    updateCode(vdmObject) {
        const updateObj = _.chain(vdmObject)
            .pick(vdmObject, ['id', 'type'])
            .extend({
                code: this.getNextCPTCode(),
                classification_source: { id: this.process.cptSource },
            })
            .value();
        return VDM.update(updateObj);
    }

    // Add the CPT object (81) associated with the Codes VDM object
    createCPTCodeEntry(vdmObject) {
        // Get the active date
        const activationDateObj = vdmObject.activation_status.find(obj => obj.activation_status === 'ACTIVE');
        const activeDate = _.get(activationDateObj, 'activation_effective_date.value', '1994-03-29');

        const activeDateObj = {
            value: activeDate,
            type: 'xsd:date',
        };
        const shortName = _.get(vdmObject, 'major_concept.label', '').toUpperCase();
        const description = _.get(vdmObject, 'expression.label', '').toUpperCase();

        const cptObject = {
            type: 'Cpt-81',
            cpt_code: vdmObject.code,
            short_name: shortName,
            cpt_category: { id: this.process.cptCategory },
            source: 'CPT',
            active_date: activeDateObj,
            description: [description],
            effective_date: [{
                effective_date: activeDateObj,
                status: 'ACTIVE',
            }],
            short_name_versioned: [{
                version_date: activeDateObj,
                short_name_versioned: shortName,
            }],
            description_versioned: [{
                version_date: activeDateObj,
                description_versioned: [description],
            }],
        };

        this.logVerbose(`Creating CPT entry for ${description}, code: ${vdmObject.code}`);
        VDM.create(cptObject);
    }

    // Add the Provider Narrative (9999999.27) entry associated with the Codes (757.02) object
    createProviderNarrative(vdmObject) {
        if (!_.has(vdmObject, 'expression')) {
            return;
        }
        const narrative = vdmObject.expression.label || '';
        const lexiconId = vdmObject.expression.id;

        const providerNarrative = {
            narrative,
            type: 'Provider_Narrative-9999999_27',
            clinical_lexicon: {
                id: lexiconId,
            },
        };

        this.logVerbose(`Creating Provider Narrative for ${narrative}, ID: ${lexiconId}`);
        try {
            VDM.create(providerNarrative);
        } catch (e) {
            // Be silent
        }
    }

    logVerbose(msg) {
        if (this.isVerbose) console.log(msg);
    }
}

module.exports = {
    CPTCodeGenerator,
};

if (require.main === module) {
    const options = {};

    const args = process.argv.slice(2);
    args.forEach((arg, index) => {
        if ((arg === '-m') || (arg === '--maxCount')) {
            options.maxCount = parseInt(args[index + 1], 0);
        }
        if (arg === '-v') {
            options.isVerbose = true;
        }
    });
    const generator = new CPTCodeGenerator(options);
    generator.generateCodes();
}
