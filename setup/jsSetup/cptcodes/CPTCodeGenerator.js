'use strict';

const _ = require('lodash');
const nodem = require('nodem');
const emulatorUtils = require('mvdm/nonClinicalRPCs/rpcEmulatorUtils');
const DataModel = require('mvdm/nonClinicalRPCs/vdmNonClinicalModel').vdmModel;
const VDM = require('mvdm/vdm');
const vdmUtils = require('mvdm/vdmUtils');

class CPTCodeGenerator {
    constructor(options) {
        this.db = null;
        this.process = {};
        this.createCount = 0;
        this.maxCount = options.maxCount || Number.MAX_SAFE_INTEGER;
        this.codeAlpha = 'A';
        this.codeNumeric = 0;
        this.isVerbose = !!options.isVerbose;
        this.hasMaxCount = !!options.maxCount;

        this.init();
    }

    init() {
        this.initDriver();
        this.initProcess();

        const res = VDM.query('COUNT 757_02');
        this.totalCount = res.count;
    }

    initDriver() {
        // Setup the nodem driver
        process.env.gtmroutines = `${process.env.gtmroutines} ${vdmUtils.getVdmPath()}`;
        this.db = new nodem.Gtm();
        this.db.open();
        VDM.setDBAndModel(this.db, DataModel);

        // Setup the clasing of the driver
        ['exit', 'SIGINT'].forEach((signal) => {
            process.on(signal, () => {
                this.db.close();
            });
        });
    }

    initProcess() {
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
        this.logVerbose(`Active code is ${this.codeAlpha}${_.padStart(this.codeNumeric.toString(), 4, '0')}`);
    }


    generateCodes() {
        // Iterate through all the 757.02 entries, pull down the VDM model for each and check for missing 'code' and
        // 'classification_source'. If we find one, we add the fields, and create a corresponding CPT file entry.
        this.totalIterations = 0;
        console.log('Grab some coffee...this may take a while!');
        emulatorUtils.vdmForEach('757.02', (vdmObject) => {
            if (_.get(vdmObject, 'classification_source.id') === this.process.cptSource) {
                this.retrieveCPTCode(vdmObject.code || '');
            } else if (!vdmObject.code && !vdmObject.classification_source) {
                const updatedObject = this.updateCode(vdmObject);
                this.createCPTCodeEntry(updatedObject);
                this.createProviderNarrative(updatedObject);
                this.createCount += 1;
            }
            this.totalIterations += 1;

            this.showProgress();
            return (this.createCount >= this.maxCount);
        });
        console.log('');
        this.logVerbose(`Created ${this.createCount} new CPT Code entries!`);
    }

    showProgress() {
        const shouldUpdate = (this.hasMaxCount) ? (this.createCount % 10 === 0) : (this.totalIterations % 100 === 0);
        if (shouldUpdate) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            const progress = (this.hasMaxCount) ? `${this.createCount} / ${this.maxCount}` : `${this.totalIterations} / ${this.totalCount}`;
            process.stdout.write(`Progress: ${progress}`);
        }
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
        const narrative = vdmObject.expression.label;
        const lexiconId = vdmObject.expression.id;

        const providerNarrative = {
            narrative,
            type: 'Provider_Narrative-9999999_27',
            clinical_lexicon: {
                id: lexiconId,
            },
        };

        this.logVerbose(`Creating Provider Narrative for ${narrative}, ID: ${lexiconId}`);
        VDM.create(providerNarrative);
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
