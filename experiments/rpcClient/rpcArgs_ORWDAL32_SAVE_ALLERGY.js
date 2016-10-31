/* COPIED FROM function in rpcAllergies-spec.js */

/*
 *
 * Context:
 * --------
 * Every RPC is different - the relationship between the arguments in an RPC and VDM or MVDM
 * (and the FileMan data form behind them) must be handled manually, one RPC at a time. 
 * The convenience methods exist for RPCs with many arguments and work between test VDM
 * data and RPC arguments. This allows us to have one set of test data, in VDM form for
 * testing BOTH the VDM AND the RPCs.
 */

/*
 * Populate key RPC ORWDAL32 SAVE ALLERGY from a combination of a VDM (JSON) definition 
 * and optionally two extra values.
 *
 * The RPC is implemented in MUMPS in EDITSAVE^ORWDAL32
 *
 * The same RPC is used to mark an allergy as "entered in error" or to denote
 * that a patient has no known allergies. These uses are NOT supported here. This is
 * purely for allergy creation.
 *
 * Two extras: not in Allergy VDM. RPC is at ~MVDM level and covers two more fields.
 * - serv (reaction severity 1-3), 
 * - ardt (reaction date). ardt is mandatory for 120.85. 
 *
 * REM: in VDP, our RPC tests are VDM-centered - test data is defined in VDM, VDM
 * model definitions are leveraged ...
 */
var _ = require('underscore');
var vdmModel = require('../../../prototypes/allergies/vdmAllergiesModel').vdmModel; // for initial dump of required properties
var vdmUtils = require('../../../prototypes/vdmUtils');

function rpcArgs_ORWDAL32_SAVE_ALLERGY(vdmForm, ardt, serv, forBroker) {

    /*
     * For rpcBroker calls, 
     * - remote MUMPS LIST form needs to escape string keys
     *   ie/ can't send {"X": "Y"} ... must send {"\"X\"": "\"Y\""}
     *   as Broker MUMPS will try to interpret the "keys"
     *
     * - and array values need to be formatted with appropriate subscripts. 
     *   ... this may be specific to this RPC or more generic. If generic, then
     *   like escaping keys, will move to generic handler.
     *
     * NOTE: not relevant for this local calling Jasmine but same routine is (copied)
     * in RPC Broker tests in nodeVISTA and want code to be consistent.
     */
    function inputToBrokerProtocolForm(input) {
        var inputNew = {};
        Object.keys(input).forEach(function(key, i, list) {
            /* 
             * Array form of {"KEY,0": LENGTH ARRAY, "KEY,1": first val ...
             */
            if (forBroker && (key === "GMRACHT")) {
                inputNew["\"GMRACHT\",0"] = input[key].length;
                input[key].forEach(function(dt, i, l) {
                    var k = "\"GMRACHT\"," + (i+1).toString();
                    inputNew[k]=dt;
                });
                return;
            }
            // prepare for supporting other RPC Broker array args
            if (_.isArray(input[key])) {
                throw util.format("Array value not handled properly - add support %s", key);
            }
            // doesn't arise for SAVE_ALLERGY list but will make this
            // routine generic later.
            // ex/ Problem: GMPFLD(.01) doesn't need it.
            if (_.isNumber(key))
                return; // no need to escape
            inputNew["\"" + key + "\""] = input[key]
        });
        return inputNew;
    }

    if (forBroker === undefined)
        forBroker = false;
        
    var classesById = _.reduce(vdmModel, function(obj, val) { obj[val["id"]] = val; return obj;  }, {});
    var propertiesById = _.reduce(classesById[vdmForm.type].properties, function(obj, pinfo) { obj[pinfo["id"]] = pinfo; return obj;  }, {});

    // Most values go into the INPUT "dictionary"    
    var vdmToInputMap = {

        // GNT - combination of reactant ^ gmr_allergy ex/ PENICILLIN^16;PSNDF(50.6,
        "GMRAGNT": function(vdmForm, vdmClass) {
            var gnt = "";
            if (_.has(vdmForm, "reactant"))
                gnt = vdmUtils.toSimpleFMValue(vdmForm["reactant"], propertiesById["reactant"], classesById);
            gnt += "^";
            if (_.has(vdmForm, "gmr_allergy"))
                // ie/ {"id": ...} -> FM PTR ex/ 16;PSNDF(50.6,)
                gnt += vdmUtils.toSimpleFMValue(vdmForm["gmr_allergy"], propertiesById["gmr_allergy"], classesById);
            return gnt;
        },

        // TYPE - D or F or O    
        "GMRATYPE": "allergy_type",

        // NATR/Mechanism - A, P, U - only one optional according to FM (but RPC?)
        "GMRANATR": "mechanism",

        // ORIG - originator
        "GMRAORIG": "originator",

        // ORDT - date (note: copied into Chart Marked Singleton below)
        // explicitly CALLED date entered in its comment
        // ... note: reaction allowed to have separate date entered
        "GMRAORDT": "origination_date_time",

        // Could just copy ORDT into an array but taking explicitly
        "GMRACHT": function(vdmForm, vdmClass) {
            if (!_.has(vdmForm, "chart_marked"))
                return null;

            var vals = [];
            vdmForm["chart_marked"].forEach(function(cmObject, i, l) {
                if (_.has(cmObject, "date_time"))
                    vals.push(vdmUtils.toFMDateTime(cmObject["date_time"]["value"]));

            });
            return vals;
        },

        // OBHX - Observed or Historical
        "GMRAOBHX": "observed_historical",

        /*
         * SYMP (REACTIONS)
         * ... "entered_by" is set to DUZ ie/ not passed in.
         * ... date (position 3) is optional.
         * ... not setting position 5 (@) which is used for deletion - reaction keyed by reactant/date_entered
         *
         * Note: GMRARDT and GMRASEVR are NOT part of vdmForm and are filled in explicitly
         * (or not) below.
         */
        "GMRASYMP": function(vdmForm, vdmClass) {
            if (!_.has(vdmForm, "reactions"))
                return null;

            var sympValues = [];
            vdmForm["reactions"].forEach(function(vdmRInput, i) {
                rval = vdmRInput["reaction"]["id"].split("-")[1] + "^" + vdmRInput["reaction"]["label"];
                // may be different from ORDT (date entered for allergy as a whole BUT why?)
                if (_.has(vdmRInput, "date_entered"))
                    rval += "^" + vdmRInput.date_entered.value;
                sympValues.push(rval);
            });
            return sympValues;
        },

        // GMRAIDBN: Band Marked - NOT set by CPRS - peer of Chart Marked but 120.814. Ignored.

        // GMRACMTS: CPRS only sets for O (and EIE). But if set for HISTORICAL then RPC will set comment type
        // appropriately. DUZ used for user. ie/ only need to pass in the comment text. 
        "GMRACMTS": function(vdmForm, vdmClass) {
            // ex/ [{"1":"55","2":"don't give the guy this med! ",".01":"3160218.175242","1.5":"O"}]
            // RPC fills in .01/1/1.5 itself. Only need to set comment.
            if (!_.has(vdmForm, "comments"))
                return null;
            // RPC can't take multiple comments
            if (vdmForm["comments"].length > 1)
                throw "Expected one and only one comment";
            return vdmForm["comments"][0]["comments"].split("\n");
        }
    }

    var pid = vdmUtils.toSimpleFMValue(vdmForm["patient"], propertiesById["patient"], classesById); // "patient id"

    var input = {};

    Object.keys(vdmToInputMap).forEach(function(arg, i, list) {

        if (_.isFunction(vdmToInputMap[arg])) {
            var rpcValue = vdmToInputMap[arg](vdmForm, propertiesById[arg]);
            if (rpcValue !== null)
                input[arg] = rpcValue;
        }

        var propId = vdmToInputMap[arg]
        if (_.has(vdmForm, propId)) {
            input[arg] = vdmUtils.toSimpleFMValue(vdmForm[propId], propertiesById[propId], classesById);
        }

    });

    // ardt and serv should only be passed in if there are reactions. They are part
    // of the RPC BUT not in 120.8, the file type behind the Allergy Record. So they
    // get special case handling. We don't enforce that reactions must be present
    // if they are passed in so that we can perform basic negative testing
    if (!((ardt === "") || (ardt === undefined)))
        input["GMRARDT"] = vdmUtils.toFMDateTime(ardt);
    if (!((serv === "") || (serv === undefined)))
        input["GMRASEVR"] = serv;

    // If using for remote RPC Broker call then must escape keys of LIST argument 
    // note: VistA.js from eHMP knows how to put {} into {"type": "list" etc
    // ... see: VistaJS1.1/RpcCall.js/ processParamList
    // Also need to handle list values (often for multiples). Need to supply
    // subscripts as part of keys.
    if (forBroker) {
        input = inputToBrokerProtocolForm(input);
    }

    // Full args are: IEN, PATIENT ID, INPUT
    return ["", pid, input];
}

exports.rpcArgs_ORWDAL32_SAVE_ALLERGY = rpcArgs_ORWDAL32_SAVE_ALLERGY;

