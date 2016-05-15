/* ************************* Convenience Functions for Building RPC Arguments ***************
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
 * Note: this RPC is actually implemented in EDITSAVE^ORWDAL32, hence the name
 * 
 * Two extras: not in Allergy VDM. RPC is at ~MVDM level and covers two more fields.
 * - serv (reaction severity 1-3), 
 * - ardt (reaction date). ardt is mandatory for 120.85. 
 *
 * TODO: consider nixing use of toFMForm and relying on localRPCRunner to turn 
 * {"value": ...} ; {"id" ...} into FM forms
 */

var _ = require('underscore');
var fileman = require('../../../prototypes/fileman');
var vdmModel = require('../../../prototypes/allergies/vdmAllergiesModel').vdmModel; // for initial dump of required properties
var vdmUtils = require('../../../prototypes/vdmUtils');

/*
 * This is weird but MUMPS LIST form needs it.
 *
 * ie/ can't send {"X": "Y"} ... must send {"\"X\"": "\"Y\""}
 * 
 * TODO: one other problem ... array/word processing with in rpcArgs doesn't work. Have to 
 * look at RPC Broker prototype and see why.
 */ 
function escapeKeysAndValues(rpcArgs) {
    var rpcArgsNew = {};
    Object.keys(rpcArgs).forEach(function(key, i, list) {
        if (key == "GMRACHT")
            return; // can't do ARRAYS yet
        // rpcArgsNew["\"" + key + "\""] = "\"" + rpcArgs[key] + "\"";
        rpcArgsNew["\"" + key + "\""] = rpcArgs[key]
    });
    return rpcArgsNew;
}

function rpcArgs_EDITSAVE_ORWDAL32(vdmForm, ardt, serv) {

    var rpcArgs = {};

    // RPC form is akin to the generic fm form ie/ values look the same as opposed to the
    // "nice" values in VDM JSON. So go to FM form and work from there.
    // NOTE: this use of FileMan values may be too hard for people to follow. May
    // want to encode values directly so the translation makes more sense.
    var vdmClassesById = _.reduce(vdmModel, function(obj, val) { obj[val["id"]] = val; return obj;  }, {});
    var fmInput = vdmUtils.toFMForm(vdmForm, vdmClassesById);

    // GNT - combination of reactant (.02) ^ GMR Allergy (1) - PENICILLIN^16;PSNDF(50.6,
    var gnt = "";
    if (_.has(fmInput, ".02"))
        gnt = fmInput[".02"];
    gnt += "^";
    if (_.has(fmInput, "1"))
        gnt += fmInput["1"];
    rpcArgs["GMRAGNT"] = gnt

    // TYPE - D or F or O
    if (_.has(fmInput, "3.1"))
        rpcArgs["GMRATYPE"] = fmInput["3.1"]  

    // NATR/Mechanism - A, P, U - only one optional according to FM (but RPC?)
    if (_.has(fmInput, "17"))
        rpcArgs["GMRANATR"] = fmInput["17"];

    // ORIG - originator
    if (_.has(fmInput, "5"))
        rpcArgs["GMRAORIG"] = fmInput["5"]

    // ORDT - date (note: copied into Chart Marked Singleton below)
    // explicitly CALLED date entered in its comment
    // ... note: reaction allowed to have separate date entered
    if (_.has(fmInput, "4")) {
        rpcArgs["GMRAORDT"] = fmInput["4"]
        // Chart Marked - not passed in. Just take ORDT and fill in one member array. Note: RPC takes user from DUZ
        // ... in CPRS, marked at time of data pushed vs occurence == time dialog opened (it seems). But "same" for MVDM.
        rpcArgs["GMRACHT"] = [fmInput["4"]]; // array of chart marked dates (ie/ LIST)
    }

    // OBHX - Observed or Historical
    if (_.has(fmInput, "6"))
        rpcArgs["GMRAOBHX"] = fmInput["6"]

    /*
     * SYMP (REACTIONS)
     * ... vdmForm as need label for RPC because of - S GMRAROT($P(GMRAS0,U,2))="" which sets up a reactant label array (which isn't used!)
     * ... "entered_by" is set to DUZ ie/ not passed in.
     * ... date (position 3) is optional.
     * ... not setting position 5 (@) which is used for deletion - reaction keyed by reactant/date_entered
     */
    if (_.has(fmInput, "10")) {
    
        // add in explicit date 
        // ... explicit date of the symptom occerence (vs date entered)
        // TODO: may move this out - why checking here. Should allow any combo
        // and see what RPC will do!
        if ((ardt === "") || (ardt === undefined))
            throw "Symptoms but no (explicit) date set for them";
        rpcArgs["GMRARDT"] = ardt

        // Severity - goes with reaction so in here. Only add if passed in explicitly.
        if (serv !== undefined) {
            rpcArgs["GMRASEVR"] = serv
        }
        
        var sympValues = [];
        vdmForm["reactions"].forEach(function(vdmRInput, i) {
            rval = vdmRInput["reaction"]["id"].split("-")[1] + "^" + vdmRInput["reaction"]["label"];
            // may be different from ORDT (date entered for allergy as a whole BUT why?)
            if (_.has(vdmRInput, "date_entered"))
                rval += "^" + vdmRInput.date_entered.value;
            sympValues[i] = rval
        });        
        rpcArgs["GMRASYMP"] = sympValues

    }

    // GMRAIDBN: Band Marked - NOT set by CPRS - peer of Chart Marked but 120.814. Ignored.

    // GMRACMTS: CPRS only sets for O (and EIE). But if set for HISTORICAL then RPC will set comment type
    // appropriately. DUZ used for user. ie/ only need to pass in the comment text. 
    if (_.has(fmInput, "26")) {
        // ex/ [{"1":"55","2":"don't give the guy this med! ",".01":"3160218.175242","1.5":"O"}]
        if (fmInput["26"].length !== 1)
            throw "Expected one and only one comment";
        // RPC fills in .01/1/1.5 itself. Only need to set comment.
        // ... from [] comment form to \n to pass into prototype
        rpcArgs["GMRACMTS"] = fmInput["26"][0]["2"]
    }

    // Full args are: IEN, DUZ, INPUT
    rpcArgs = escapeKeysAndValues(rpcArgs);

    return ["", fmInput[".01"], rpcArgs];
}

exports.rpcArgs_EDITSAVE_ORWDAL32 = rpcArgs_EDITSAVE_ORWDAL32;
