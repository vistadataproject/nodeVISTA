RPCRUN ;EWD/CG - RPC Runner; 02/24/2016  11:30
 ;;1.1;RPCRUN;;Feb 24th, 2016
 ;
 ; 
 ; TODO:
 ; - XPARSYS (used in XPAR1.m etc to get domain - falls back to kernel sys params ... what sets this up?)
 ;
 ; Two inputs: 
 ;   1. EWD.js VistA RPC wrapper (RPCEXECUTE) function modified to reflect more work in JS, calling
 ;      original broker routines and separating process initialization from RPC handling
 ;      ala the MUMPS Broker.
 ;   2. VISTA Broker routine access and equivalent initialization 
 ;
 ;
 ;
 ; INITBR (initialize broker) replicates the globals setup in XWBTCPM that handles
 ; [1] process initialization and [2] TCPConnect response when a user first connects.
 ; This code initializes a bunch of globals which VISTA code expects to be set.
 ;
 ; Details on globals set are described here: http://www.hardhats.org/tools/sac07.html
 ; (2.3.1.3.2)
 ;
 ; OTHER TODO: formal error trap ewd-qoper8-vistarpc/blob/master/mumps/ewdVistARPC.m code -
 ;     S $ETRAP="D ^%ZTER d errorPointer D UNWIND^%ZTER"
 ; and
 ;     send back results neatly in ^TMP
 ;
INITBR()
 ;
 ; Process setup and logon sets up more than globals - it also uses ^TMP. This is not an issue for 
 ; pure MUMPS VISTA which creates a process for every connection but effects pool-using JS VISTA. 
 ; For JS, ^TMP($J,... and $TMP("SOMETHING",$J need to be cleared (and restored) for a process to use
 ; a connection. One crucial example is ^TMP("XQCS",$J... used to cache the RPCs allowed on a 
 ; connection. It is set and reset by setContext ("what does 'OR CPRS GUI OPTION' let me do?") though
 ; not by initial setup and this omission means that an inconsistent lingering ^TMP("XQCS can prevent
 ; even SIGNON SETUP working. 
 K ^TMP($J)
 ; ... may move this into rpcRunner method ("clearContext"). MUMPS clear only clears local XQCS. Consider
 ; ... when doing restore
 K ^TMP("XQCS",$J)  ; how many more of "SOMETHING",$J is there to clear? ^TMP("XWBFGP",$J,"TODO" in XMBPRS etc?
 ;
 ; NEW^XWBTCPM (for [XWB] New Broker messages) initializes
 ; - Need to set version as in VALIDAV^XUSRB, POST2 will kill the (signon) context if XWBVER is < 1.106. 
 ;   and this means BROKER INFO etc won't work after signon.
 S U="^",DUZ=0,DUZ(0)="",XWBVER=1.108
 ;
 ; Expected by 2.3.1.3.2 and set in broker entry points in XWBTCPM (JOB spawned with TCPConnect)
 D HOME^%ZIS  ; does the 'IO* variables for home device'
 ;
 ; In dump of symbol table before M broker parsing starts but not set in HOME
 ; ... some set in RESTART inside XWBTCPM
 ; auth-free tests.
 ; DILOCKTM (DD("DILOCKTM")) used for lock timeouts. May add
 S DISYS=$G(^DD("OS"))  ; or could be from second piece of ^%ZOSF("OS")
 S DTIME=600  ; ala XUP default (note: set in XUX AV CODE etc per DUZ but fixing here)
 S DT=$$DT^XLFDT  ; per sac07.html 2.3.1.3.2 and 2.3.1.5.2
 S XWBOS=^%ZOSF("OS")  ; Set by broker - routines in TIU/Allergy use to see if in broker and then don't write to terminal 
 ; prepare for INITUSR or login sequence
 K DUZ
 ;
 Q
 ;
 ;
 ; For Local and simple invocation, mimic the user, facility and other basics set by the RPC sequence 
 ; XUS SIGNON SETUP through XUS AV CODE and XUS DIVISION GET called by CPRS.
 ;
 ; - XUS SIGNON SETUP re-sets DUZ to 0
 ;
INITUSR(P200)
 ; 1. XUS SIGNON SETUP resets DUZ
 K DUZ
 S DUZ=0
 S DUZ(0)="@"
 ; 2. XUS AV CODE sets DUZ and indirectly invokes DUZ^XUS1A to set the following
 S DUZ=P200
 S DUZ(1)=""
 ; After setup XOPT holds XUS props of kernel system parameters and DUZ^XUS1A
 ; uses that to pick out the default institution. It does not use SITE^VASITE
 ; which uses (time sensitive) 389.9 to find the system's facility
 S DUZ(2)=$S($D(^XTV(8989.3,1,"XUS")):$P(^("XUS"),"^",17),1:"")
 ; Agency Code explicitly set in Kernel System Parameters (8989.3-1)
 ; and per Institution but fixing to VISTA as code expects1 it.
 S DUZ("AG")="V"
 S DUZ("AUTO")=0
 S DUZ("BUF")=1
 S DUZ("LANG")=""
 ; 3. XUS DIVISION GET sets DUZ(2) per user
 N RET D DIVGET^XUSRB2(.RET,DUZ)  ; XUS DIVISION GET
 Q
 ;
 ;
 ; Get User and Facility
 ;
GETUNF() 
 ; Note that both userId and facility may be empty - INITUSR or XUS SIGNON SETUP fills DUZ
 Q:'$D(DUZ) ""
 Q:DUZ=0 ""
 N RES
 S RES=$G(DUZ)_":"_$P(^VA(200,DUZ,0),"^")
 S:$D(DUZ(2)) RES=RES_":"_DUZ(2)_":"_$P(^DIC(4,DUZ(2),0),"^")_":"_$P($G(^DIC(4,DUZ(2),99)),"^")
 Q RES
 ;
 ;
 ; XWBPRS/RPC checks if RPC exists etc but parses RPC info at the same time. This
 ; version returns RPC's IEN (if all correct) or -1^{ERROR} if problem.
 ;
RPC(RPCNAME) ;Check the rpc information.
 N T
 I '$D(RPCNAME) Q "-1^No RPC sent"
 S T=$O(^XWB(8994,"B",RPCNAME,0))
 I '+T Q "-1^Remote Procedure '"_RPCNAME_"' doesn't exist on the server."
 S T(0)=$G(^XWB(8994,T,0))
 I $P(T(0),U,6)=1!($P(T(0),U,6)=2) Q "-1^Remote Procedure '"_RPC_"' cannot be run at this time."  ;P10. Check INACTIVE field. - dpc.
 Q +T
 ;
 ; Check if RPC is allowed to run for a user.
 ;
 ; Wrapper for equivalent in XWBSEC (which is
 ; called by the parser as it gets a message and
 ; relies on a global). The function processes
 ; a user context (in global XQY0)
 ; and identified user (in global DUZ). Context
 ; is bypassed if user is XUPROGMODE.
 ;
 ; Note: EWD replicated some of this functionality
 ; inline in their MUMPS broker code. We're going
 ; back to the actual kernel code to ensure
 ; compatibility.
 ;
CHKPRMIT(RPCNAME)
 N XWBSEC
 D CHKPRMIT^XWBSEC(RPCNAME)
 S:'$D(XWBSEC) XWBSEC=""
 Q XWBSEC
 ;
 ;
 ; EWD RPCEXECUTE is modified version of Nikolay Topalov's VistA RPC wrapper
 ;
 ;   Original Copyright notice follows:
 ;;
 ;;	Author: Nikolay Topalov
 ;;
 ;;	Copyright 2014 Nikolay Topalov
 ;;
 ;;	Licensed under the Apache License, Version 2.0 (the "License");
 ;;	you may not use this file except in compliance with the License.
 ;;	You may obtain a copy of the License at
 ;;
 ;;	http://www.apache.org/licenses/LICENSE-2.0
 ;;
 ;;	Unless required by applicable law or agreed to in writing, software
 ;;	distributed under the License is distributed on an "AS IS" BASIS,
 ;;	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ;;	See the License for the specific language governing permissions and
 ;;	limitations under the License.
 ;;
 ;;  Modifications Copyright 2016 M/Gateway Developments Ltd
 ;;   Also Apache 2.0 Licensed
 ;;
RPCEXECUTE(TMP,sessionId,sessionGlobal) ;
 ;
 ; Execute an RPC based on paramaters provided in TMP reference global
 ;
 ; Input parameter
 ; ================
 ;
 ; TMP is a reference to a global with nodes. e.g.,  ^TMP($J)
 ;
 ;   ,"ien")      IEN of RPC in #8994
 ;   ,"input",n,"type")   PARAMETER TYPE (#8994.02, #02)
 ;   ,"input",n,"value")  input parameter value
 ;      e.g.
 ;      ,"input",n,"type")="LITERAL"
 ;      ,"input",n,"value")="abc"
 ;
 ;      ,"input",n,"type")="REFERENCE"
 ;      ,"input",n,"value")="^ABC"
 ;
 ;      ,"input",n,"type")="LIST"
 ;      ,"input",n,"value",m1)="list1"
 ;      ,"input",n,"value",m2,k1)="list21"
 ;      ,"input",n,"value",m2,k2)="list22"
 ;         
 ;          where m1, m2, k1, k2 are numbers or strings
 ;     
 ; Output value
 ; ==============
 ; The RPC output is in  @TMP@("result")
 ;  e.g., ,"result","type")="SINGLE VALUE"
 ;                  "value")="Hello World!"
 ;                
 ; Return {"success": result, "message" : message }
 ;    result 1 - success
 ;           0 - error
 ;
 N rpc,tArgs,tCnt,tI,tOut,trash,tResult,X
 ;
 ; VDP - commented out for local invocation so RPC errors flow through
 ; ... TODO: make trap setting optional (local/remote)
 ; S $ETRAP="D ^%ZTER d errorPointer D UNWIND^%ZTER"
 ;
 S rpc("ien")=$G(@TMP@("ien"))
 Q:rpc("ien")="" $$error(-1,"RPC IEN is missing")
 S X=$G(^XWB(8994,rpc("ien"),0)) ;e.g., XWB EGCHO STRING^ECHO1^XWBZ1^1^R
 S rpc("routineTag")=$P(X,"^",2)
 S rpc("routineName")=$P(X,"^",3)
 ; VDP TODO - move to checking if RPC exists and this routine can assume it does
 Q:rpc("routineName") $$error(-4,"Undefined routine name for RPC ["_rpc("ien")_"]")
 ;
 ; 1=SINGLE VALUE; 2=ARRAY; 3=WORD PROCESSING; 4=GLOBAL ARRAY; 5=GLOBAL INSTANCE
 S rpc("resultType")=$P(X,"^",4)
 S rpc("resultWrapOn")=$P(X,"^",8)
 ;
 S X=$$buildArguments(.tArgs,rpc("ien"),TMP)  ; build RPC arguments list - tArgs
 Q:X<0 $$error($P(X,U),$P(X,U,2)) ; error building arguments list
 ;
 ; now, prepare the arguments for the final call
 ; it is outside of the $$buildArgumets so we can newed the individual parameters
 S (tI,tCnt)=""
 F  S tI=$O(tArgs(tI)) Q:tI=""  F  S tCnt=$O(tArgs(tI,tCnt)) Q:tCnt=""  N @("tA"_tI) X tArgs(tI,tCnt)  ; set/merge actions
 ;
 S X="D "_rpc("routineTag")_"^"_rpc("routineName")_"(.tResult"_$S(tArgs="":"",1:","_tArgs)_")"
 S DIC(0)="" ; JAM 2014/9/5 - some obscure problem with LAYGO^XUA4A7
 X X  ; execute the routine
 M @TMP@("result","value")=tResult
 N RESTYPE S RESTYPE=$$EXTERNAL^DILFD(8994,.04,,rpc("resultType"))
 S @TMP@("result","type")=RESTYPE
 I @TMP@("result","type")="GLOBAL ARRAY",$g(sessionId)'="" d
 . n sessRef
 . s sessRef="^"_sessionGlobal_"(""session"","_sessionId_",""GLOBAL_ARRAY"","""_rpc("ien")_""")"
 . s X="K "_sessRef X X
 . s X="M "_sessRef_"="_tResult X X
 . k @TMP@("result","value")
 . k @tResult
 . ; VDP: killing tResult will nix return TMP if it is ^TMP($J) so put it back. 
 . S:'$D(@TMP@("result","type")) @TMP@("result","type")=RESTYPE
 S trash=$$success()
 Q "OK"
 ;
 ;
buildArguments(out,pIEN,TMP) ;Build RPC argument list
 ;
 ; Return values
 ; =============
 ; Success 1
 ; Error   -n^error message
 ;
 ; VDP: removed RPC Defn 8994 parameter extraction as not used in RPC Broker. Broker only
 ; uses name, currency, function and return format
 ;
 ; out array with arguments
 N count,tCnt,tError,tIEN,tI,tII,tIndexSeq,tParam,tRequired,X
 ;
 S tI=0
 S tII=""
 S tCnt=0
 ;
 K out
 S out=""
 S tError=0
 ;
 S count=0
 F  S tII=$O(@TMP@("input",tII)) Q:('tII)!(tError)  D
 . S count=count+1
 . I '$D(@TMP@("input",tII,"value")) S out=out_"," Q
 . I $D(@TMP@("input",tII,"value"))=1 D  Q
 . . S out=out_"tA"_tII_","   ; add the argument
 . . I $$UP^XLFSTR($G(@TMP@("input",tII,"type")))="REFERENCE" D
 . . . ; VDP change - use built in GETV which takes care of both @ and X of variables (original only did @)
 . . . S tCnt=tCnt+1,out(tII,tCnt)="S tA"_tII_"=$$GETV^XWBBRK(@TMP@(""input"","_tII_",""value""))"  ; set it
 . . . Q
 . . E  S tCnt=tCnt+1,out(tII,tCnt)="S tA"_tII_"=@TMP@(""input"","_tII_",""value"")"  ; set it as action for later
 . . Q
 . ; list/array
 . S out=out_".tA"_tII_","
 . S tCnt=tCnt+1,out(tII,tCnt)="M tA"_tII_"=@TMP@(""input"","_tII_",""value"")"  ; merge it
 . Q
 ;
 Q:tError tError
 S out=$E(out,1,$L(out)-1)
 Q 1
 ;
formatResult(code,message) ; return JSON formatted result
 S ^TMP($J,"RPCEXECUTE","result")=code_U_message
 I code=0 Q "ERROR"
 Q "OK"
 ;Q "{""success"": "_code_", ""message"": """_$S($TR(message," ","")="":"",1:message)_"""}"
 ;
error(code,message) ;
 Q $$formatResult(0,code_" "_message)
 ;
success(code,message) ;
 Q $$formatResult(1,$G(code)_" "_$G(message))
 ;
errorPointer ;
 ; Save the latest error pointer into the ^TMP global
 ;  so that the error details can be recovered later
 n dd,no,rec
 s rec=$g(^%ZTER(1,0))
 s dd=$p(rec,"^",3)
 s rec=$g(^%ZTER(1,dd,0))
 s no=$p(rec,"^",2)
 s ^TMP($j,"ERRORTRAP",0)=1
 s ^TMP($j,"ERRORTRAP",1)=dd
 s ^TMP($j,"ERRORTRAP",2)=1
 s ^TMP($j,"ERRORTRAP",3)=no
 QUIT
 ;
 ; TODO (clean to make consistent - will hard code to use a specific symbol table name and just take context id etc.
 ; ... rename to "saveContext(contextId)"
 ; ... REM: context is > symbolTable and covers parts of TMP (and going forward XTMP)
 ; ... ie/ is over context (globals, TMP settings etc) that RPC expects to run within
 ; ... BG is that users and thus unrelated RPCs share processes in a "nodeVISTA" ... vs single per user in traditional VISTA
 ; ... will be key part of cover note with rpcRunner (along with edge cases addressed ex/ which RPCs demand which broker setup)
 ; ... sessions are not enough - need VISTA sessions
 ;
 ; The following is for Symbol Table store and restore, a variation of ewdSymbolTable.m from https://github.com/robtweed/ewd-session
 ;
 ; ... merge with INITBR (or reuse) so empty user reset (DUZ=0) and DOESN'T reset broker globals
 ;
 ; ... off EWD (will need contrast)
 ;
clearSymbolTable()  ;
 k
 q
 ;
 ; Save current variables into zzg
 ;
saveSymbolTable(%zzg) ;
 i '$d(%zzg) s %zzg="^%zSymbolTable"
 k @%zzg
 n %zzz
 s %zzz="%"
 f  s %zzz=$o(@%zzz) q:%zzz=""  d  h 0
 . i %zzz="%zzz"!(%zzz="%zzx")!(%zzz="%zzg") q
 . m @%zzg@(%zzz)=@%zzz
 ; special XQCS set in set context - managed on and off symbol table
 m:$d(^TMP("XQCS",$J)) @%zzg@("TMPXQCS")=^TMP("XQCS",$J)
 q
 ;
 ; Restore variables from zzg
 ;
restoreSymbolTable(%zzg) ;
 i '$d(%zzg) s %zzg="^%zSymbolTable"
 k (%zzg)  ; kill all but zzg
 I '$D(@%zzg) D INITBR^RPCRUN Q  ; restore base broker settings if new context and quit
 K ^TMP("XQCS",$J)
 n %zzz
 s %zzz=""
 f  s %zzz=$o(@%zzg@(%zzz)) q:%zzz=""  d  h 0
 . i %zzz="%zzz"!(%zzz="%zzg") q
 . m @%zzz=^(%zzz)
 M:$D(@%zzg@("TMPXQCS")) ^TMP("XQCS",$J)=@%zzg@("TMPXQCS")
 q
 ;
killSymbolTable(%zzg) ;
 i '$d(%zzg) s %zzg="^%zSymbolTable"
 ; VDP: added @ so it works
 k @%zzg
 q
 ;
