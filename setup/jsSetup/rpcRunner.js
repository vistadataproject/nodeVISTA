/**
 * rpcRunner
 *
 * Simple module to run RPCs either with authentication first or straight away - relies
 * on RPCRUN.m which wraps old broker code and permits passing larger RPC arguments too
 * and from MUMPS.
 *
 * Typical use starts with authentication or straight user setup ...
 *
 *          rpcRunner.run("XUS SIGNON SETUP")
 *          rpcRunner.run("XUS AV CODE", [rpcRunner.encryptValue(ACCESS + ";" + VERIFY)])
 *          rpcRunner.run("XWB CREATE CONTEXT", [rpcRunner.encryptValue("OR CPRS GUI CHART")])
 *
 *                          OR
 *
 *          rpcRunner.setUserAndFacility(55, 1)
 *
 *                     and then regular RPC invocation. ex/
 *
 *          res = rpcRunner.run("ORWPT LIST ALL", [2, 1]);
 *
 * IMPORTANT: just as permissive as native MUMPS RPC Broker. TODO: add a "strict" mode that
 * will enforce authentication steps.
 *
 * Background note on RPC Broker Implementation: this code emulates/reuses the flow in the
 * (new style) M RPC Broker which starts in XWBTCPM.
 * - XWBTCPM has entry points for different sorts of OS/MUMPS connection handlers
 *   (ex/ GTM on Linux xinit.d calls GTMLNX)
 * - the handlers all set a trap, setup globals, start a JOB if there are resources
 *   and reply to TCPConnect which initiates the connection
 * - handling ends with MAIN which loops, parsing messages with CALLP^XWBPRS
 * - XWBPRS checks an RPC exists properly ($$RPC called below) and if a user has
 *   permission to run the RPC (CHKPRMIT). CHKPRMIT uses XQY0 for context and that is
 *   set in CRCONTXT, a method called from the "CREATE CONTEXT" RPC.
 *   - note the two levels of pass thru RPCs in CHKPRMIT, one spelled out and not needing
 *     a context; the other (all XMB/XUS) needing just a context (user 0 is fine).
 *
 * TODO:
 * - %GTM-E-ACTLSTTOOLONG, More actual parameters than formal parameters ... formalize with dump of args
 *
 * (c) 2016 VISTA Data Project
 */

var util = require("util");
var _ = require("underscore");

// TMP: until VDP MUMPS goes into p of GT.M or we fix classpath differently.
// make VDP MUMPS available - note doing .. as may be called from one level below
// ... must be set before first db.function call
process.env.gtmroutines = process.env.gtmroutines + ' .' + " .." + " ../..";

function RPCRunner(db) {

    this.db = db;

    this.reinit();
}

/*
 * Broker startup/restart
 *
 * Called in class initialization and can be recalled to "start again"
 */
RPCRunner.prototype.reinit = function() {

    /*
     * Replicate global setup done in XWBTCPM as it sets a process in response
     * to an incoming TCP Connection.
     */
    var res = this.db.function({function: "INITBR^RPCRUN"});
    if (res.ok !== 1)
        throw new Error(util.format("Couldn't initialize with INITBR: %j", res));

    // reset if authentication-less runner
    this._authorizing = true;

}

/*
 * Mainly for RPC testing, quick authentication-less RPC runner. Instead of authentication
 * setup using a sequence of SETUP/AV CODE/DIVISION GET/CREATE CONTEXT, just setting up 
 * up user (DUZ) and other appropriately globals directly.
 *
 * Note: does allow context setting as an option as a few RPCs check the context ("is this CPRS?")
 * This is treated as a matter of authorization - it's simply setting up the Context globals so
 * that RPCs run as intended.
 */
RPCRunner.prototype.initializeUser = function(userId, context) {

    if (!_.isNumber(userId)) { // DUZ
        throw new Error(util.format("Error: must specify a numeric user id (DUZ) to call an RPC"));
    }

    // fixes user identity
    var res = this.db.function({function: "INITUSR^RPCRUN", arguments: [userId]});
    if (res.ok !== 1)
        throw new Error(util.format("Couldn't initialize user %s", userId));

    // Assure [1] no authorization needed to invoke RPCs, [2] can't call auth RPCs
    this._authorizing = false;

    // optional - some RPCs ex/ ORWPT1 PRCARE check the context (they behave differently for a CPRS user
    // (specifically it checks XQCY0 which holds the 0 node of the context option (entry 19) 
    // ex/ _"XQCY0"="OR CPRS GUI CHART^CPRSChart version 1.0.30.69^^B^17^^^^^^^"_, set as part of the context set path.
    // ... to allow for this, allow context to be set
    // ... consider allowing context unset (pass in "")
    if (context !== undefined) {
        var res = this.run("XWB CREATE CONTEXT", [this.encryptValue(context)]);
        if (res.result !== 1)
            throw new Error(util.format("Couldn't set context in initializeUser: %j", res))
    }

    return this.getUserAndFacility();
};

/*
 * Access user and facility irrespective of whether they are setup explicitly in initializeUser or through
 * a login sequence.
 */
RPCRunner.prototype.getUserAndFacility = function() {

    // Note: relies on init of Runner calling reinit which means something is set.
    var res = this.db.function({function: "GETUNF^RPCRUN"});
    var pieces = res.result.split(":");
    if (pieces.length === 0)
        return {};
    var vals = {"userId": parseInt(pieces[0]), "userName": pieces[1]};
    if (pieces.length < 3)
        return vals;
    var facilityId = res.result.split(":")[1];
    vals["facilityId"] = parseInt(pieces[2]);
    vals["facilityName"] = pieces[3];
    if ((pieces.length === 5) && (pieces[4] !== ""))
        vals["facilityStationNumber"] = pieces[4];
    return vals;

};

/*
 * Access;Verify and Context of AV CODE and CREATE CONTEXT RPCs are encrypted but
 * rather than repeat the encryption cypher here - it differs in VA and Open source
 * systems, we leverage REFERENCE parameters to provide a server-side encrypted
 * version of RPC values.
 */
RPCRunner.prototype.encryptValue = function(value) {
    return {"type": "REFERENCE", "value": "\"\"_$$ENCRYP^XUSRB1(\"" + value + "\")"};
};

/*
 * Follows 'parse message' of traditional broker which enforces that an RPC exists
 * and that a user has permission to run it. It also knows about pass through RPCs
 * and allows them.
 */
RPCRunner.prototype.run = function(rpcName, rpcArgs) {

    // TODO: should TMP, $J be saved off with a context? INITBR clears it
    function cleanUpTMP() {
        // Want the pid TMP for ourselves - "session" variation is a special for GLOBAL_ARRAY reading
        this.db.kill({"global": "TMP", subscripts: [process.pid]});
        this.db.kill({"global": "TMP", subscripts: ["session"]});
    }

    /*
     * XWBTCPM/MAIN calls XMBPRS to parse a message which both checks RPC existence (RPC)
     * and permission to run it (CHKPRMIT).
     */
    var res = this.db.function({function: "RPC^RPCRUN", arguments: [rpcName]});
    if (!/^\d+$/.test(res.result)) {
        // -1^Remote Procedure \'...\' doesn't exist ...
        console.log("Why not getting doesn't exist? %j, rpcName: %s", res.result, rpcName);
        throw new Error(res.result);
    }
    var rpcIEN = parseInt(res.result);

    // TODO: expose this check as needed for locker too ie/ it too can run under login or explicit userId, facilityId
    // setUserAndFacility turns off permission to run checks
    if (this._authorizing) {
        var res = this.db.function({function: "CHKPRMIT^RPCRUN", arguments: [rpcName]});
        if (res.result !== "") {
            throw new Error(util.format(res.result));
        }
    }
    // Don't allow AUTH RPCs if running with explicit userId, facilityId setting
    // but allow CREATE CONTEXT as some RPCs rely on knowing the context
    else if (_.contains(["XUS SIGNON SETUP", "XUS AV CODE"], rpcName))
        throw new Error(util.format("Authentication RPC %s not allowed when runner initialized with explicit user and facility", rpcName));

    rpcArgs = (rpcArgs === undefined) ? [] : rpcArgs;

    cleanUpTMP.call(this);

    /*
     * Initialize rpcName and facility 
     *
     * RPC meta is in file 8994. Only "name" NAME (#8994, .01) is checked.
     * Arguments are not as they are not enforced.
     */
    this.db.set({global: "TMP", subscripts: [process.pid, "ien"], data: rpcIEN});

    bldInputArgumentsTMP(this.db, rpcArgs);

    /*
     * Now execute 
     * - $j == process.pid
     * - passing in a "session global (TMP)" and session_id (process.pid) to support
     * pass back of GLOBAL ARRAY values
     *
     * TODO: qualified "ZVDP" as some RPCs hard code their use of ^TMP("$J) per Dave Whitten.
     *
     * Note: used modifierd ewdVistARPC, 'ewdVistARPCLocal'
     */
    var res = this.db.function({function: "RPCEXECUTE^RPCRUN", arguments: ["^TMP($j)", process.pid, "TMP"]});

    /*
     * Three possible returns: 
     * - 1. RESULT: ok=1, result='OK' with detailed reply in ^TMP(process.pid, "result") (type/value)
     * - 2. ERROR JS: ok=1, result='ERROR' with error detail in errorMessage
     * - 3. MUMPS exception: ok=0, no result, errorCode 
     *          Default .m traps exceptions and the stack trace goes to the error log file (3.076) - it first goes
     *      on a queue and so isn't available locally. EWD returns a reference to the log record in ^TMP(process.pid, "ERRORTRAP",0-3)
     *      saving the reference in the session object for later retrieval (see: getErrorReport.js ). 
     *
     *      As we're local, we want immediate access and want the end of the stack and not intermediate steps. It's best to remove 
     *      trapping from the M and allow exceptions to flow through. Trapping removed in ewdVistARPCLocal.m 
     */
    if (res.ok === 0) {
        var errorMessage = res.errorMessage;

        // RPC has no error concept per se. Just results. The client needs to know its an error. Only errors from 
        // invoker should be exceptions.

        // See comment above: better to comment out trap and see end result directly
        //    errorMessage: 'UNWIND+1^%ZTER,%GTM-E-SETECODE, Non-empty value assigned to $ECODE (user-defined error trap)'
        if (errorMessage.slice(0,14) === "UNWIND+1^%ZTER") {
            throw new Error(util.format("Shouldn't happen as errors being trapped - RUNRPC turns off trapping"));
        }

        cleanUpTMP.call(this);

        // throw RPC error
        throw new Error(errorMessage);
    }

    // Rare as removed some reasons for such errors in local MUMPS
    // ex/ removed 'context' step, could get the likes of "[ORWDAL32 SAVE ALLERGY] is not allowed to be run"
    // but could get error if RPC arguments don't match the RPC's definition in 8994. Most RPCs LACK such definitions
    // so such errors are rare. You usually only find out if you have the wrong arguments from a MUMPS exception.
    if (res.result === "ERROR") {
        var errorMessage = this.db.get({global: "TMP", subscripts: [process.pid, "RPCEXECUTE", "result"]}).data;
        cleanUpTMP.call(this);
        throw new Error(errorMessage);
    }

    /*
     * Return value in ^TMP(process.pid, "result")
     * - "result"/"type" is type of result ex/ SINGLE VALUE etc
     * - "result"/"value" is value 
     * 
     * Except that value of GLOBAL ARRAY comes back in a 'session':
     * 
     *  "^"_sessionGlobal_"(""session"","_sessionId_",
     *             \""GLOBAL_ARRAY"","""_pRpc("name")_""")"
     *
     * which because of the call above is 
     *
     *    ^TMP("session", process.pid, "GLOBAL_ARRAY", rpcIEN)
     *
     * Types of return: from 8994/.04
     * - 1:SINGLE VALUE: one value
     * - 2:ARRAY : values indexed as 1, 2, 3 etc
     * - 3:WORD PROCESSING : same as array but "WORD WRAP ON" setting decides if \r\n ends values
     * - 4:GLOBAL ARRAY - 'Return value parameter should be set to a closed global reference in ^TMP'. TMP value is deleted in traditional broker once value is taken. MUMPS
     *   code called by this routine mimics this behavior and puts GLOBAL ARRAY into a session global. A later "RPC" call can get the data from that global
     *   (see: ewd-qoper8-vistarpc/lib/proto/getGlobalArray.js ). 
     * - 5:GLOBAL INSTANCE - NA of global (not TMP).
     *
     * Important: regular RPC errors are returned as results. The Broker doesn't distinguish reply types.
     *
     */

    var replyType = this.db.get({global: "TMP", subscripts: [process.pid, "result", "type"]}).data;

    if ((replyType === "ARRAY") || (replyType === "WORD PROCESSING")) {
        var lines = [];
        var next = {global: "TMP", subscripts:[process.pid, "result", "value", ""]};
        while (true) {
            next = this.db.next(next);
            if (next.subscripts[3] === '')
                break;
            else {
                var text = this.db.get(next).data;
                lines.push(text);
            }
        }
        reply = lines;
    }

    // EWD MUMPS side puts GLOBAL_ARRAY response in the 'session' for later retrieval. In this local call, we return
    // it right away.
    // ... TODO: put into the local M directly and removing all mention of session etc
    else if (replyType === "GLOBAL ARRAY") {

        var lines = [];
        var next = {global: "TMP", subscripts:["session", process.pid, "GLOBAL_ARRAY", rpcIEN, ""]};
        while (true) {
            next = this.db.next(next);
            if (next.subscripts[4] === '')
                break;
            else {
                var text = this.db.get(next).data;
                lines.push(text);
            }
        }

        reply = lines;
    }

    else if (replyType === "SINGLE VALUE") {
        reply = this.db.get({global: "TMP", subscripts: [process.pid, "result", "value"]}).data;
    }

    else {

        throw new Error(util.format("Error - unexpected type of reply <%s>", replyType));

    }

    cleanUpTMP.call(this);

    return {"result": reply};
};

/*
 * Class used by a multi-user Server to manage and switch the contexts above rpcRunner
 *
 * TODO: along with polish of RPCRUN, comment here on role of this class to manage multi-users sharing one or more processes
 */
function RPCContexts(db) {

    this.db = db;

}

// Call from Server on exit/shutdown or on initialization ie/ to remove any old contexts
RPCContexts.prototype.clearAll = function() {
    this.db.function({function: "killSymbolTable^RPCRUN", arguments: ["^%zSymbolTable"]}); // no arguments means kills all entries
};

// Call from Server - on single user disconnect
RPCContexts.prototype.clearContext = function(contextId) {
    this.db.function({function: "killSymbolTable^RPCRUN", arguments: ["^%zSymbolTable(\"" + contextId + "\")"]});
};

/*
 * Call from Worker - can do blindly as if same as current context will just ignore
 *
 * Note contextId is turned into a string no matter what so any form of valid string value is allowed:
 * ... 1 or 1.1.1 or ff:1.1.1 etc.
 *
 * Consider: check for/enforce ascii only strings
 */
RPCContexts.prototype.setContext = function(contextId) {

    if (this._contextId === contextId)
        return;

    if ((contextId === undefined) || (contextId === null))
        throw new Error("Valid contextId must be specified");

    // only save off and restore context if already exists
    if (this._contextId !== undefined) { // TODO: make this check inside save and restore

        this.db.function({function: "saveSymbolTable^RPCRUN", arguments: ["^%zSymbolTable(\"" + this._contextId + "\")"]});

        this.db.function({function: "restoreSymbolTable^RPCRUN", arguments: ["^%zSymbolTable(\"" + contextId + "\")"]});

    }

    this._contextId = contextId;
};

/*
 * Input arguments for an RPC as an array of values,  
 * simple (string | number), arrays or objects (key/values). 
 * 
 *     ["ABC", 1, {"key": value, "key2": value2}, [A, B, C]]
 * 
 * The form of arguments depends on the RPC.
 * 
 * This utility will format ^TMP to allow invocation of RPCs 
 * through _ewdVistARPCLocal.m_
 * 
 * The TMP is a strange mix:
 * - the top level of TMP has a "type"/"value" form with
 *   ^TMP(...,"type")=LITERAL|REFERENCE|WORD PROCESSING|LIST
 *   ^TMP(...,"value")=...
 * where LIST values (Object or Array values) may themselves embed
 * LIST or simple values, none of which are typed. ie/
 *   [1, 2, {k: v} ... etc
 * The top level values appear in a plain array (they aren't named).
 *
 * For non MUMPS people, the notion of a "LIST" which encompasses both
 * ARRAYs and OBJECTs (key/value pairs) seems overly crude but MUMPS
 * effectively only have OBJECTs and in RPCs, the convention is to use
 * numeric keys to represent plain arrays. 
 * 
 * One other quirk: FileMan and RPCs has the concept of a WORD PROCESSING
 * type. These are multi-line strings represented as arrays of STRINGS and
 * for argument assembly, that's what they are - ["line1", "line2", ...]
 *
 * Note: RPC meta data is defined in file 8994 in VISTA. In general, meta is
 * under specified. In particular input arguments aren't specified. You only
 * know what they are by examining CPRS calling code or the implementing 
 * MUMPS code.
 *
 * 8994_02 has types for arguments of:
 * - 1:LITERAL
 * - 2:LIST (Array or Object)
 * - 3:WORD PROCESSING (same as ARRAY of STRING)
 * - 4:REFERENCE
 *
 * TODO: Consider expanding on 8994 meta data for ALL 1050 CPRS RPCs, in 
 * particular noting the names and formats of input parameters. May expand the
 * format to note the range of pointers etc.
 * See issue: 
 */
function bldInputArgumentsTMP(db, rpcArgs) {

    /*
     * Lists inside Lists do not preserve encoding 
     *
     * Note: Perhaps simple list of values possible but LIST seems to be set of 
     * name-value pairs
     */
    function addObjectList(subscripts, objectList) {

        // will have one or more keys
        Object.keys(objectList).forEach(function(key, eindex, keys) {
            var value = objectList[key];
            var keySubscripts = subscripts.slice();
            keySubscripts.push(key);

            // IMPORTANT: must come before _.isObject as Array is an Object in JS
            if (_.isArray(value)) {
                addArrayList(keySubscripts, value);
                return;
            }

            if (_.isObject(value)) {
                addObjectList(keySubscripts, value);
                return;
            }

            if (!(_.isNumber(value) || _.isString(value))) {
                throw new Error(util.format("simple value must be NUMBER or STRING, not %s for key %s", JSON.stringify(value), key));
            }

            db.set({global: "TMP", subscripts: keySubscripts, data: value});

        });
    }

    /*
     * "Array Lists" - index 0 is length. Note covers both straight lists AND
     * WORD PROCESSING values.
     */
    function addArrayList(subscripts, arrayList) {
        if (arrayList.length === 0) {
            throw new Error(util.format("Passed in array value of zero length"));
        }
        var zSubscripts = subscripts.slice();
        zSubscripts.push(0);
        db.set({global: "TMP", subscripts: zSubscripts, data: arrayList.length});
        arrayList.forEach(function(value, index, list) {
            var isubscripts = subscripts.slice();
            isubscripts.push(index+1);

            // IMPORTANT: must come before _.isObject as Array is an Object in JS
            if (_.isArray(value)) {
                addArrayList(isubscripts, value);
                return;
            }

            if (_.isObject(value)) {
                addObjectList(isubscripts, value);
                return;
            }

            if (!(_.isNumber(value) || _.isString(value))) {
                throw new Error(util.format("simple value must be NUMBER or STRING, not %s", JSON.stringify(value)));
            }

            db.set({global: "TMP", subscripts: isubscripts, data: value});
        });
    }

    if (!_.isArray(rpcArgs)) {
        throw new Error(util.format("rpcArgs must be an array"));
    }

    // Note: assuming TMP[process.pid is killed above 

    rpcArgs.forEach(function(rpcArg, index, list) {

        var subscripts = [process.pid, "input", index+1];

        var value = rpcArg;

        var typeSubs = subscripts.slice();
        typeSubs.push("type");
        var valueSubs = subscripts.slice();
        valueSubs.push("value");

        if (_.isObject(value)) {

            // Special case of REFERENCE: evaluated globals, expressions ($O...) and global variables ($HOROLOG)
            if (_.has(value, "type") && _.has(value, "value") && (value.type === "REFERENCE")) {
                db.set({global: "TMP", subscripts: typeSubs, data: "REFERENCE"});
                db.set({global: "TMP", subscripts: valueSubs, data: value.value});
                return;
            }

            db.set({global: "TMP", subscripts: typeSubs, data: "LIST"});
            addObjectList(valueSubs, value);
            return;
        }

        if (_.isArray(value)) {
            db.set({global: "TMP", subscripts: typeSubs, data: "LIST"});
            addArrayList(valueSubs, value);
            return;
        }

        // simple value - default to LITERAL
        if (!(_.isNumber(value) || _.isString(value))) {
            throw new Error(util.format("simple typed value must be NUMBER or STRING, not %s", JSON.stringify(value)));
        }
        db.set({global: "TMP", subscripts: typeSubs, data: "LITERAL"});
        db.set({global: "TMP", subscripts: valueSubs, data: value});

    });
}

module.exports.RPCRunner = RPCRunner;
module.exports.RPCContexts = RPCContexts;
