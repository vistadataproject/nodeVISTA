var nodem = require('nodem');

/*
 * VISTA authentication is based on a simple "access" and "verify" code where "access"
 * is username and verify is password. 
 *
 * Namespace of XUS (so far!)
 *
 * TODO: quick - merge change back into login with third argument as part of its flow
 * AND change file 200 entries for password/timeout SO all is re-entrant
 *
 * NOTE: in VDM along with other protoypes though should really be in nodeVISTA
 * 
 * There are a number of policies in security:
 * - force users to change passwords
 * - don't allow too many attempts
 * - inhibit logins if too many users
 * - enforce password strength
 * ... TODO: identify more scenarios (see below)
 * 
 * Context: Node.js to MUMPS guide 
 * ... see: http://globalsdb.org/sites/default/files/Node.js%20Interface%20-%20User%20Guide%20-%20e1.6%20-%20v2013.2.0.350.x.pdf
 *
 * OTHER login RPCs (note IAM System RPCs in particular):
 * - XUS AV HELP (AVHELP) - just generates help text (S RET(0)=$$AVHLPTXT^XUS2()) ... useless
 *   ... returns: Enter 8-20 characters mixed alphanumeric and punctuation (except '^', ';', ':')
 * XUS GET CCOW TOKEN: see code below on CCOW
 * XUS ALLKEYS (ie/ what can you do ...)
 * - XUS KEY CHECK
 * XUS KAAJEE GET USER INFO (Huh?)
 * XUS SET VISITOR
 * XUS KAAJEE GET USER VIA PROXY
 * XUS KAAJEE GET CCOW TOKEN
 * XUS PKI GET UPN (PIV Cards!)
 * XUS IAM ADD USER ('IAM System' adds new user)
 * - XUS ESSO VALIDATE ... there are a bunch of others
 *
 * See TODO below on more that needs to be checked. 
 * and tracking issue: https://github.com/vistadataproject/VDM/issues/77
 */

/*
 * Basic access/verify login with possible issues
 * - invalid access/verify (whether no user with access or invalid verify for user)
 * - must reset verify
 * ... all logged in and here's the DUZ (file 200 IEN)
 *
 * Uses 2 RPCs
 * - XUS SIGNON SETUP
 * - XUS AV CODE

MORE TO CHECK IN SETUP^XUSRB (need to add code to exercise errors)
----------------------------
 S X1=$$INHIBIT() I X1 S XWBERR=$S(X1=1:"Logons Inhibited",1:"Max Users") Q  ;p523
 etc

MORE TO CHECK IN VALIDAV^XURRB
------------------------------

ie/ different messages/issues caught and signalled (need TESTS for all
scenarios/options)

 S XOPT=$$STATE^XWBSEC("XUS XOPT") <------ option gathered
 S XUMSG=$$INHIBIT() I XUMSG S XUM=1 G VAX ;Logon inhibited ???
 ;3 Strikes <------- what msg
 I $$LKCHECK^XUSTZIP($G(IO("IP"))) S XUMSG=7 G VAX ;IP locked
 ;Check type of sign-on code <--------- sign on code types
 I $L(AVCODE) D
 . I $E(AVCODE,1,2)="~1" S DUZ=$$CHKASH^XUSRB4(AVCODE) Q
 . I $E(AVCODE,1,2)="~2" S DUZ=$$CHKCCOW^XUSRB4(AVCODE) Q
 . S DUZ=$$CHECKAV^XUS($$DECRYP^XUSRB1(AVCODE)) <---- 'proper' path
 */
function login(db, access, verify) {

  // Step 1: XUS SIGNON SETUP - implemented in SETUP^XUSRB 
  // ... check basic setup before even going to access/verify/user - TODO: catch errors and exercise errors
  // ... note: has no description in 8994
  db.set({global: "TMP", subscripts: [process.pid, "name"], data: "XUS SIGNON SETUP"});
  console.log();
  console.log("Invoking %s", "XUS SIGNON SETUP");
  var res = db.function({function: "RPCEXECUTE^ewdVistARPC", arguments: ["^TMP($j)"]});
  dumpLines(resultLines(res));
  db.kill({"global": "TMP", subscripts: [process.pid]});

  // Step 2: XUS AV CODE - implemented in VALIDAV^XUSRB
  /*
   * DESCRIPTION (from 8994):
   * This API checks if a ACCESS/VERIFY code pair is valid.It returns an array of values 
   * - R(0)=DUZ if sign-on was OK, zero if not OK.
   * - R(1)=(0=OK, 1,2...=Can't sign-on for some reason).
   * - R(2)=verify needs changing.
   *   ... see below: if 0 => 'Not a valid ACCESS CODE/VERIFY CODE pair.'
   * - R(3)=Message.
   * - R(4)=0R(5)=count of the number of lines of text, zero if none.R(5+n)=message text.
   * 
   * Includes logic such as:
   * - try to lookup user by access code
   * - if can't login with verify then don't bother saying "must change verify!"
   *   - no distinction between "no such user" and "invalid verify"
   *   ... ie/ don't let remote user know he's on to something!
   * - if need to change verify then prompt
   *   - both "verify never expires" and the interval for a verify in "kernel system 
   * parameters" (8989.3) kick in
   * - if no need to change and verify matches then just login
   *
   * Messages include (not exhaustive):
   * - "Not a valid ACCESS CODE/VERIFY CODE pair." (EXIT)
   * - "VERIFY CODE must be changed before continued use." (note gets 'Good evening' too)
   *   - if present then use XUS CVC to set ... see below
   * - DUZ (IEN for 200) is returned with 'Good evening ...' (return that DUZ!)
   * ... different lines of the response hold different information (see below)
   */ 
  db.set({global: "TMP", subscripts: [process.pid, "name"], data: "XUS AV CODE"});
  db.set({global: "TMP", subscripts: [process.pid, "input", 1, "type"], data: "LITERAL"});
  var accessVerify = access + ";" + verify;
  db.set({global: "TMP", subscripts: [process.pid, "input", 1, "value"], data: accessVerify});
  console.log();
  console.log("Invoking %s on %s", "XUS AV CODE", accessVerify);
  var res = db.function({function: "RPCEXECUTE^ewdVistARPC", arguments: ["^TMP($j)"]});
  var resLines = resultLines(res);
  dumpLines(resLines);
  db.kill({"global": "TMP", subscripts: [process.pid]});

  var zeroNo = parseInt(resLines[0]);
  var secondNo = parseInt(resLines[2]);

  // 0 if not OK (see comment above) - DUZ otherwise
  if (zeroNo !== 0) {
      var DUZ = zeroNo;
      console.log("Successful login - returning DUZ %s", DUZ);
      return DUZ;
  }

  // Access wrong (no entry in 200) or verify for access
  // ie/ no difference between "No such user" and "invalid verify for user"
  if (secondNo === 0) {
      if (!(/Not a valid ACCESS CODE\/VERIFY CODE pair/.test(resLines[3]))) {
          throw "Not a valid ACCESS CODE/VERIFY CODE pair";
      }
      console.log("Login failed - invalid access/verify pair");
      return -1;
  }

  // Verify needs changing
  if (secondNo === 1) {
      if (!(/VERIFY CODE must be changed before continued use/.test(resLines[3]))) {
          throw "Verify needs changing signalled but message mismatch";
      }
      console.log("Login failed - must redo verify");
      return -2;
  }

  throw "Unexpected error - see trace";
}

/*
 * Change Verify RPC (XUS CVC) 
 *
 * TODO: BIG - MERGE into login as expects to know DUZ (ie/ 'symbol table set') ie/ pass
 * newVerify into login. If absent, force full restart.
 *
 * TODO: 
 * - why "RESTRICTED"? in 8994 
 * - a lot more errors like access/verify wrong, forget about bad new verify etc.
 *   ... Sorry that isn't the correct current code from BRCVC^XS2
 *
 * NOTE: "Verify codes may be changed by the user with the CHANGE USER CHARACTERISTICS option"
 */
function changeVerify(db, verify, newVerify) {

  // Force Upper Case as file 200 has upper values
  // ... MUMPS code doesn't unlike the code for XUS AV CODE above which
  // leads to S X1=$$UP(X1) in the call CHECKAV^XUS
  verify = verify.toUpperCase();
  newVerify = newVerify.toUpperCase();

  // Doesn't seem to be RPCs for this ie/ CLIENT just has to know how to encrypt?
  // ... to do CHECK CPRS code
  var encVerify = db.function({function: "ENCRYP^XUSRB1", arguments: [verify]}).result;
  var encNewVerify = db.function({function: "ENCRYP^XUSRB1", arguments: [newVerify]}).result;

  // XUS CVC - implemented in CVC^XUSRB
  // TODO: 8994 has no description (and no data on the input parameters) but it does
  // note that access to this RPC is RETRICTED ... need to find context for restriction.
  db.set({global: "TMP", subscripts: [process.pid, "name"], data: "XUS CVC"});
  db.set({global: "TMP", subscripts: [process.pid, "input", 1, "type"], data: "LITERAL"});
  var changeVerify = encVerify + "^" + encNewVerify + "^" + encNewVerify;
  db.set({global: "TMP", subscripts: [process.pid, "input", 1, "value"], data: changeVerify});
  console.log();
  console.log("Invoking %s", "XUS CVC");
  var res = db.function({function: "RPCEXECUTE^ewdVistARPC", arguments: ["^TMP($j)"]});
  var resLines = resultLines(res);
  dumpLines(resLines);
  db.kill({"global": "TMP", subscripts: [process.pid]});

  var resCode = parseInt(resLines[0]);
  if (resCode === 0) {
      console.log("All changed - new verify in place - proceed"); // silent login
      return 0; 
  }

  if (resCode === 2) {
      if (!(/VERIFY CODE must be a mix of alpha and numerics and punctuation/.test(resLines[1]))) {
          throw "Unexpected message with error 2";
      }
      console.log("Change failed - must have a valid newVerify");
      return -1;
  }

  // TODO - must have other variations is no such access or original verify is wrong or ...
  throw "Unexpected problem - didn't expect to get here";

}

function resultLines(res) {
  if (!((res.ok === 1) && (db.get({global: "TMP", subscripts: [process.pid, "result", "type"]}).data === "ARRAY"))) {
      throw "Expected OK Array result but didn't get it";
  }
  var lines = [];
  var next = {global: "TMP", subscripts:[process.pid, "result", "value", ""]};
  while (true) {
      next = db.next(next);
      if (next.subscripts[3] === '')
          break;
      else {
          var text = db.get(next).data;
          lines.push(text);
      }
  }
  return lines;
}

function dumpLines(lines) {
  console.log("\nRESULT:");
  var msg = lines.join("\n\t");
  console.log(msg);
  console.log();
  return msg;
}

var db = new nodem.Gtm();
db.open();

var access = "fakenurse1";
var verify = "1Nur!@#$";
var newVerify = "NEWVERIFY1!";

// verify = newVerify; - for second time through

try {

    // First let's try completely invalid access
    var err = login(db, access + "INVALID", verify);
    if (err !== -1) {
        throw "Expected error invalid access/verify";
    }

    // Next let's try invalid verify - same error as above
    // ... no difference between "no such user" and "invalid verify for user"
    var err = login(db, access, verify + "INVALID");
    if (err !== -1) {
        throw "Expected error invalid access/verify";
    }

    // A valid access and verify but may get need for new verify
    var duzOrErr = login(db, access, verify);
    if (duzOrErr === -2) {
        // TODO: issue - know DUZ from login before as DUZ is valid (and waiting). Change
        // happens in the context of that DUZ (ie/ not isolated).
        // => need to put change back INSIDE the login function and have that take an alt verify.

        // change verify - but will get error as verifies need the right length and mix of characters
        var err = changeVerify(db, verify, newVerify);
        if (err !== -1)
            throw ("Expected change to fail but didn't"); // will move in merge into login
       
        console.log("Trying proper new verify", newVerify);
        var res = changeVerify(db, verify, newVerify); 

        console.log("Now logged in - after changing verify (login is 'silent') - access %s, verify %s", access, newVerify);
    }
    // No need for new verify - logged in
    else {
        console.log("Logged into user with DUZ (User (200) IEN) %d using access %s and verify %s", duzOrErr, access, verify);
    }
}
catch (e) {
    console.log(e);
}

db.close();

