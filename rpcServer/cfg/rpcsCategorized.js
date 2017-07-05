var rpcsCategorized = {
    "DG CHK BS5 XREF ARRAY": {
        "mn": "DG",
        "catag": "READ",
        "tags": [
            "DFN",
            "XREF"
        ]
    },
    "DG CHK BS5 XREF Y/N": {
        "mn": "DG",
        "catag": "READ",
        "descr": "patient with same name - XREF use ... ie/ ala parameter, special handling",
        "tags": [
            "DFN",
            "XREF",
            "IS-A"
        ]
    },
    "DG CHK PAT/DIV MEANS TEST": {
        "mn": "DG",
        "catag": "READ",
        "descr": "MEANS test check",
        "tags": [
            "DFN"
        ]
    },
    "DG SENSITIVE RECORD ACCESS": {
        "mn": "DG",
        "catag": "AUTHENTICATION",
        "descr": "4 different responses checking if user and patient are the same, a key that allow access for a user to sensitive data and warning messages. Like most authentication, this is effectively a utility.",
        "tags": [
            "DFN"
        ]
    },
    "DG SENSITIVE RECORD BULLETIN": {
        "mn": "DG",
        "catag": "CHANGE",
        "files": ["38.1"],
        "descr": "Adds to sensitive record log 38.1 and/or sends bulletin",
        "tags": [
            "DFN",
            "BULLETIN"
        ]
    },
    "GMRC LIST CONSULT REQUESTS": {
        "catag": "READ",
        "descr": "number of days to look backwards",
        "tags": [
            "PARAMETER",
            "DFN"
        ]
    },
    "GMV ADD VM": {
        "mn": "GMV",
        "catag": "CHANGE",
        "tags": [
            "DFN"
        ]
    },
    "GMV ALLERGY": {
        "mn": "GMV",
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "GMV CLOSEST READING": {
        "catag": "READ",
        "descr": "uses PXRMINDX",
        "tags": [
            "DFN"
        ]
    },
    "GMV CONVERT DATE": {
        "mn": "GMV",
        "catag": "UTILITY",
        "descr": "Converts date to internal (FM) form",
        "tags": [
            "HARD CODED"
        ]
    },
    "GMV DLL VERSION": {
        "mn": "GMV",
        "catag": "READ",
        "descr": "GMV DLL VERSION - with XPAR",
        "tags": [
            "PARAMETER",
            "S/META"
        ]
    },
    "GMV EXTRACT REC": {
        "mn": "GMV",
        "catag": "READ",
        "files": ["120.5"],
        "tags": [
            "DFN"
        ]
    },
    "GMV GET CATEGORY IEN": {
        "catag": "READ",
        "files": ["120.53"],
        "exArgs": "[\"LOCATION\"]",
        "tags": [
            "K/META",
            "IEN-LOOKUP"
        ]
    },
    "GMV GET CURRENT TIME": {
        "mn": "GMV",
        "catag": "UTILITY",
        "descr": "True JS only",
        "tags": [
            "HARD CODED"
        ]
    },
    "GMV GET VITAL TYPE IEN": {
        "catag": "READ",
        "files": ["120.51"],
        "exArgs": "[\"HEIGHT\"]",
        "tags": [
            "K/META",
            "IEN-LOOKUP"
        ]
    },
    "GMV LATEST VM": {
        "mn": "GMV",
        "catag": "READ",
        "descr": "Latest vitals",
        "tags": [
            "DFN"
        ]
    },
    "GMV LOCATION SELECT": {
        "mn": "GMV",
        "catag": "UTILITY",
        "descr": "Like GMV Manager. Despite name, seems to execute any \"OPTION\" and return the results. So this is a flexible UTILITY in effect. Akin to other 'generic query RPCs",
        "tags": [
            "MACRO",
            "DYNAMIC EXECUTE"
        ]
    },
    "GMV MANAGER": {
        "mn": "GMV",
        "catag": "UTILITY",
        "descr": "Dangerous Dynamic code execution with @",
        "tags": [
            "DYNAMIC EXECUTE",
            "MACRO"
        ]
    },
    "GMV MARK ERROR": {
        "mn": "GMV",
        "catag": "CHANGE",
        "tags": [
            "DFN"
        ]
    },
    "GMV PARAMETER": {
        "mn": "GMV",
        "catag": "CHANGE",
        "descr": "Sets and retrieves parameters",
        "tags": [
            "PARAMETER"
        ]
    },
    "GMV USER": {
        "mn": "GMV",
        "catag": "READ",
        "descr": "Parameter values about a user 200.",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "GMV V/M ALLDATA": {
        "mn": "GMV",
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "GMV VITALS/CAT/QUAL": {
        "mn": "GMV",
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "MAG4 REMOTE IMPORT": {
        "mn": "MAG4",
        "catag": "UTILITY",
        "descr": "IMPORT IMAGES from a Windows App",
        "tags": [
            "UTILITY"
        ]
    },
    "OR GET COMBAT VET": {
        "mn": "OR",
        "catag": "READ",
        "descr": "relies on the VADPT code, code that grabs pieces of PATIENT (2) into subobjects. Some of the logic there should be reproduced in the MVDM structure and VDM maps.",
        "tags": [
            "DFN"
        ]
    },
    "ORALWORD ALLWORD": {
        "mn": "ORALWORD",
        "catag": "READ",
        "descr": "Can an Order be made",
        "tags": [
            "DFN"
        ]
    },
    "ORB DELETE ALERT": {
        "mn": "ORB",
        "catag": "CHANGE",
        "files": ["8992.1"],
        "descr": "Saying DFN but some alerts only DUZ. Stored in 8992.1",
        "tags": [
            "DFN",
            "ALERT"
        ]
    },
    "ORB FOLLOW-UP ARRAY": {
        "mn": "ORB",
        "catag": "READ",
        "files": ["8992", "8992_1"],
        "descr": "Notification follow-up Order - may be about Orders and may be CHANGE. Need to walk through properly.",
        "tags": [
            "DFN",
            "K/META"
        ]
    },
    "ORB FOLLOW-UP STRING": {
        "mn": "ORB",
        "catag": "READ",
        "files": ["8992", "8992_1"],
        "descr": "Notification follow-up Order String - like FOLLOW-UP ARRAY",
        "tags": [
            "DFN",
            "K/META"
        ]
    },
    "ORB FOLLOW-UP TYPE": {
        "mn": "ORB",
        "catag": "READ",
        "files": ["100.9"],
        "descr": "Looks up follow up type starting with info from Order. Would be K/META if just passed in 100.9 IEN",
        "tags": [
            "DFN",
            "K/META"
        ]
    },
    "ORB FORWARD ALERT": {
        "mn": "ORB",
        "catag": "CHANGE",
        "descr": "Forward an alert (in pool with PRINTER?)",
        "tags": [
            "DFN",
            "ALERT"
        ]
    },
    "ORB RENEW ALERT": {
        "mn": "ORB",
        "catag": "CHANGE",
        "descr": "alerts in 8992",
        "tags": [
            "DFN",
            "ALERT"
        ]
    },
    "ORB SORT METHOD": {
        "mn": "ORB",
        "catag": "READ",
        "descr": "User can be involved ie/ per User",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORBCMA5 GETUDID": {
        "catag": "READ",
        "descr": "From 'PSJ OR PAT OE' in 101.41 and argument passed isn't processed",
        "files": ["101.41"],
        "tags": [
            "K/META",
            "IEN-LOOKUP"
        ]
    },
    "ORCDLR2 CHECK ALL LC TO WC": {
        "mn": "ORCDLR2",
        "catag": "READ",
        "descr": "list of lab orders with invalid times",
        "tags": [
            "DFN"
        ]
    },
    "ORCDLR2 CHECK ONE LC TO WC": {
        "mn": "ORCDLR2",
        "catag": "READ",
        "descr": "Get Child times - LR Dialog method",
        "tags": [
            "DFN"
        ]
    },
    "ORCHECK DELMONO": {
        "mn": "ORCHECK",
        "catag": "UTILITY",
        "descr": "temporary (TMP) monograph delete - was setup in OCAPI. Monographs are returned in GETMONO etc, GLOBAL ARRAY RPCs",
        "tags": [
            "K/META",
            "REENTRANCY"
        ]
    },
    "ORCHECK GETMONO": {
        "catag": "READ",
        "descr": "read from TMP ORMONOGRAPH which was setup in OCAPI. Example of GLOBAL ARRAY RPC which returns the name of a TMPs setup from Order to be checked. Example of GLOBAL ARRAY RPC which returns the name of a TMP",
        "tags": [
            "K/META",
            "REENTRANCY"
        ]
    },
    "ORCHECK GETMONOL": {
        "mn": "ORCHECK",
        "catag": "READ",
        "descr": "read from TMP ORMONOGRAPH which was setup in OCAPI",
        "tags": [
            "K/META",
            "REENTRANCY"
        ]
    },
    "ORCHECK GETXTRA": {
        "mn": "ORCHECK",
        "catag": "READ",
        "descr": "Gets multi-line in Monograph whose info is setup by OCAPI",
        "tags": [
            "K/META",
            "REENTRANCY"
        ]
    },
    "ORCHECK ISMONO": {
        "mn": "ORCHECK",
        "catag": "READ",
        "descr": "Is TMP ORMONOGRAPH setup from Order to be checked ie/ determines if monographs to read",
        "tags": [
            "K/META",
            "IS-A",
            "REENTRANCY"
        ]
    },
    "ORCNOTE GET TOTAL": {
        "mn": "ORCNOTE",
        "catag": "READ",
        "descr": "Count progress notes of patient - utility really",
        "tags": [
            "DFN"
        ]
    },
    "ORDDPAPI ADMTIME": {
        "mn": "ORDDPAPI",
        "catag": "READ",
        "descr": "GETWP^XPAR for sys of 'OR ADMIN TIME HELP TEXT'",
        "tags": [
            "PARAMETER",
            "K/META"
        ]
    },
    "ORDDPAPI CLOZMSG": {
        "mn": "ORDDPAPI",
        "catag": "READ",
        "descr": "GETWP^XPAR",
        "tags": [
            "PARAMETER",
            "K/META"
        ]
    },
    "ORDEA CSVALUE": {
        "mn": "ORDEA",
        "catag": "READ",
        "descr": "1/0 for controlled substance or not - 101.43",
        "tags": [
            "K/META"
        ]
    },
    "ORDEA DEATEXT": {
        "mn": "ORDEA",
        "catag": "READ",
        "descr": "GETWP^XPAR",
        "tags": [
            "PARAMETER",
            "K/META"
        ]
    },
    "ORDEA HASHINFO": {
        "mn": "ORDEA",
        "catag": "READ",
        "descr": "basic info (include patient) for order",
        "tags": [
            "DFN"
        ]
    },
    "ORDEA LNKMSG": {
        "mn": "ORDEA",
        "catag": "READ",
        "descr": "'OR DEA PIV LINK MSG'",
        "tags": [
            "PARAMETER",
            "K/META"
        ]
    },
    "ORDEA ORDHINFO": {
        "mn": "ORDEA",
        "catag": "READ",
        "descr": "From Order",
        "tags": [
            "DFN"
        ]
    },
    "ORDEA PINLKCHK": {
        "mn": "ORDEA",
        "catag": "UTILITY",
        "descr": "if current user has active PIN lock (in XTMP OR DEA PIN LOCK)",
        "tags": [
            "LOCK"
        ]
    },
    "ORDEA PINLKSET": {
        "mn": "ORDEA",
        "catag": "UTILITY",
        "descr": "TMP set - for lock per user",
        "tags": [
            "LOCK"
        ]
    },
    "ORDEA PNDHLD": {
        "mn": "ORDEA",
        "catag": "READ",
        "descr": "1/0 on pending or not",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "ORDEA SIGINFO": {
        "mn": "ORDEA",
        "catag": "READ",
        "descr": "info from PATIENT and PROVIDER to show when signing a controlled substance",
        "tags": [
            "DFN"
        ]
    },
    "ORECS01 CHKESSO": {
        "mn": "ORECS01",
        "catag": "UTILITY",
        "descr": "is a patch installed",
        "tags": [
            "PATCH",
            "S/META"
        ]
    },
    "ORECS01 ECPRINT": {
        "mn": "ORECS01",
        "catag": "UTILITY",
        "descr": "PRINT EC report to device",
        "tags": [
            "PRINT",
            "REPORT"
        ]
    },
    "ORECS01 ECRPT": {
        "mn": "ORECS01",
        "catag": "UTILITY",
        "descr": "EC REPORT - Event Capture - will be returned vs printed",
        "tags": [
            "REPORT"
        ]
    },
    "ORECS01 GETDIV": {
        "mn": "ORECS01",
        "catag": "UTILITY",
        "descr": "yet another get DUZ(2)/ mvdm.getFacility",
        "tags": [
            "S/META"
        ]
    },
    "ORECS01 SAVPATH": {
        "mn": "ORECS01",
        "catag": "CHANGE",
        "descr": "of and by PARAMETERS for Event Capture",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORECS01 VSITID": {
        "mn": "ORECS01",
        "catag": "READ",
        "descr": "visit IEN from criteria (may overlap with allergy visit lookup)",
        "tags": [
            "IEN-LOOKUP",
            "DFN"
        ]
    },
    "OREVNTX ACTIVE": {
        "mn": "OREVNTX",
        "catag": "READ",
        "files": ["100.5"],
        "descr": "active events of type",
        "tags": [
            "K/META"
        ]
    },
    "OREVNTX LIST": {
        "mn": "OREVNTX",
        "catag": "READ",
        "files": ["100.2"],
        "descr": "processed order (OE/RR) events for patient - 'AC' index in 100.2",
        "tags": [
            "DFN"
        ]
    },
    "OREVNTX PAT": {
        "mn": "OREVNTX",
        "catag": "READ",
        "descr": "100.2 (per patient) delayed event ie/ MAS move or OR return could delay orders",
        "tags": [
            "DFN"
        ]
    },
    "OREVNTX1 AUTHMREL": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "Can user manually release delayed orders",
        "tags": [
            "DUZ",
            "PARAMETER",
            "XUSEC"
        ]
    },
    "OREVNTX1 CHGEVT": {
        "mn": "OREVNTX1",
        "catag": "CHANGE",
        "descr": "change orders events (get into 100.5 for orders)",
        "tags": [
            "DFN"
        ]
    },
    "OREVNTX1 CMEVTS": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "tags": [
            "DUZ",
            "LOCATION",
            "PARAMETER"
        ]
    },
    "OREVNTX1 COMP": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "OE/RR PATIENT EVENT completed",
        "files": ["100.2"],
        "tags": [
            "DFN"
        ]
    },
    "OREVNTX1 CPACT": {
        "mn": "OREVNTX1",
        "files": ["100.5"],
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "OREVNTX1 CURSPE": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "OREVNTX1 DEFLTS": {
        "mn": "OREVNTX1",
        "files": ["100.5"],
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "OREVNTX1 DELDFLT": {
        "mn": "OREVNTX1",
        "catag": "CHANGE",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "OREVNTX1 DELPTEVT": {
        "mn": "OREVNTX1",
        "files": ["100.2"],
        "catag": "CHANGE",
        "descr": "Delete Patient Event",
        "tags": [
            "DFN"
        ]
    },
    "OREVNTX1 DFLTDLG": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "From OE/RR RELEASE EVENT to Dialog (101.41)",
        "files": ["101.41", "100.5"],
        "tags": [
            "K/META"
        ]
    },
    "OREVNTX1 DFLTEVT": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "OREVNTX1 DIV": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "files": ["100.2"],
        "tags": [
            "DFN",
            "LOCATION"
        ]
    },
    "OREVNTX1 DIV1": {
        "mn": "OREVNTX1",
        "files": ["100.5"],
        "catag": "READ",
        "tags": [
            "K/META",
            "LOCATION"
        ]
    },
    "OREVNTX1 DLGIEN": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "IEN based on name",
        "tags": [
            "IEN-LOOKUP",
            "K/META"
        ]
    },
    "OREVNTX1 DONE": {
        "mn": "OREVNTX1",
        "catag": "CHANGE",
        "descr": "Terminate a Patient Event",
        "files": ["100.2"],
        "tags": [
            "DFN"
        ]
    },
    "OREVNTX1 EMPTY": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "Does patient event have any orders?",
        "files": ["100.2"],
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "OREVNTX1 EVT": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "Really simple lookup of EVENT 100.5 from PATIENT EVENT 100.2",
        "complexity": "LOW",
        "files": ["100.2", "100.5"],
        "tags": [
            "DFN"
        ]
    },
    "OREVNTX1 EXISTS": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "files": ["100.2"],
        "descr": "return patient event if patient already has delayed orders",
        "tags": [
            "DFN"
        ]
    },
    "OREVNTX1 GETDLG": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "complexity": "LOW",
        "exArgs": "[\"1\"]",
        "descr": "dlg 101.43 (meta)",
        "tags": [
            "K/META"
        ]
    },
    "OREVNTX1 GETSTS": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "complexity": "LOW",
        "descr": "order status value",
        "tags": [
            "DFN"
        ]
    },
    "OREVNTX1 GTEVT": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "pass in patient event, get event type info",
        "files": ["100.2", "100.5"],
        "complexity": "LOW",
        "tags": [
            "DFN"
        ]
    },
    "OREVNTX1 GTEVT1": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "event based on 100.5 info",
        "complexity": "LOW",
        "files": ["100.5"],
        "exArgs": "[\"1\"]",
        "tags": [
            "K/META"
        ]
    },
    "OREVNTX1 HAVEPRT": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "parent patient event",
        "files": ["100.2"],
        "complexity": "LOW",
        "tags": [
            "DFN"
        ]
    },
    "OREVNTX1 ISDCOD": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "tags": [
            "DFN",
            "PARAMETER",
            "IS-A"
        ]
    },
    "OREVNTX1 ISHDORD": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "files": ["100", "100.98", "100.01"],
        "descr": "order on hold?",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "OREVNTX1 ISPASS": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "Same as ISPASS1 but give 100.2 which gets to 100.5",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "OREVNTX1 ISPASS1": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "Same as ISPASS but go right to 100.5",
        "tags": [
            "K/META",
            "IS-A"
        ]
    },
    "OREVNTX1 LOC": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "Default hospital locn for patient event",
        "files": ["100.2"],
        "tags": [
            "DFN",
            "LOCATION"
        ]
    },
    "OREVNTX1 LOC1": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "files": ["100.5"],
        "tags": [
            "K/META",
            "LOCATION"
        ]
    },
    "OREVNTX1 MATCH": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "match or not patient and event",
        "tags": [
            "DFN"
        ]
    },
    "OREVNTX1 MULTS": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "speciality list",
        "files": ["100.5"],
        "exArgs": "[\"1\"]",
        "tags": [
            "K/META"
        ]
    },
    "OREVNTX1 NAME": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "complexity": "LOW",
        "files": ["100.5", "100.2"],
        "descr": "name of 100.5 from 100.2",
        "tags": [
            "DFN"
        ]
    },
    "OREVNTX1 ODPTEVID": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "complexity": "LOW",
        "descr": "patient event from Order 100 - easy lookup of event (15) field which pts to 100.2",
        "files": ["100", "100.2"],
        "tags": [
            "DFN"
        ]
    },
    "OREVNTX1 PRMPTID": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "files": ["101.41"],
        "exArgs": "[\"1\"]",
        "tags": [
            "K/META"
        ]
    },
    "OREVNTX1 PROMPT IDS": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "prompt ids for 101.41",
        "exArgs": "[\"1\"]",
        "files": ["101.41"],
        "tags": [
            "K/META"
        ]
    },
    "OREVNTX1 PUTEVNT": {
        "mn": "OREVNTX1",
        "catag": "CHANGE",
        "descr": "save new patient delayed events in 100.2",
        "files": ["100.2"],
        "tags": [
            "DFN"
        ]
    },
    "OREVNTX1 SETDFLT": {
        "mn": "OREVNTX1",
        "catag": "CHANGE",
        "descr": "SETS personal (DUZ) default event in a parameter",
        "files": ["100.5"],
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "OREVNTX1 TYPEXT": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "Does EVT have delayed orders?",
        "tags": [
            "DUZ"
        ]
    },
    "OREVNTX1 WRLSTED": {
        "mn": "OREVNTX1",
        "catag": "READ",
        "descr": "list of dialogs inside a parameter for a user",
        "files": ["101.41"],
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORIMO IMOLOC": {
        "mn": "ORIMO",
        "catag": "READ",
        "descr": "Inpatient medication on outpatient - uses scheduling API to return info on patient and clinic. Enum of values.",
        "tags": [
            "PATCH",
            "DFN"
        ]
    },
    "ORIMO IMOOD": {
        "mn": "ORIMO",
        "catag": "READ",
        "descr": "is IMO order?",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "ORIMO ISCLOC": {
        "mn": "ORIMO",
        "catag": "READ",
        "descr": "is clinical location? 0:3 gives if C/CLINICAL",
        "tags": [
            "LOCATION",
            "IS-A"
        ]
    },
    "ORIMO ISIVQO": {
        "mn": "ORIMO",
        "catag": "READ",
        "descr": "is it an IV quick order?",
        "tags": [
            "K/META",
            "IS-A"
        ]
    },
    "ORK TRIGGER": {
        "mn": "ORK",
        "catag": "READ",
        "complexity": "HIGH",
        "descr": "Order Checking",
        "tags": [
            "DFN",
            "LOGIC"
        ]
    },
    "ORPRF CLEAR": {
        "mn": "ORPRF",
        "catag": "UTILITY",
        "descr": "\"Clears up the ORPRF TMP global set by HASFLG",
        "tags": [
            "REENTRANCY"
        ]
    },
    "ORPRF GETFLG": {
        "mn": "ORPRF",
        "catag": "READ",
        "descr": "relies on HASFLG setup of patient flags - TMP use",
        "tags": [
            "REENTRANCY",
            "DFN"
        ]
    },
    "ORPRF HASFLG": {
        "mn": "ORPRF",
        "catag": "READ",
        "descr": "National or local flags. 26.11/26.15 files. This returns flags of patient and also sets up TMP with those flags for use by GETFLG",
        "tags": [
            "REENTRANCY",
            "DFN"
        ]
    },
    "ORPRF TRIGGER POPUP": {
        "mn": "ORPRF",
        "catag": "READ",
        "descr": "for CPRS - should it trigger a popup because patient has flags - 1 or 0",
        "tags": [
            "IS-A",
            "DFN"
        ]
    },
    "ORQ NULL LIST": {
        "mn": "ORQ",
        "catag": "UTILITY",
        "descr": "Silly return empty list",
        "tags": [
            "HARD CODED"
        ]
    },
    "ORQOR DETAIL": {
        "mn": "ORQOR",
        "catag": "READ",
        "descr": "see format in DETAIL^ORQ2",
        "tags": [
            "DFN"
        ]
    },
    "ORQOR LIST": {
        "catag": "READ",
        "descr": "list of patient orders",
        "tags": [
            "DFN"
        ]
    },
    "ORQORB SORT": {
        "mn": "ORQORB",
        "catag": "READ",
        "descr": "Same function as ORB SORT METHOD: sort method for user/division etc",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORQPT ATTENDING/PRIMARY": {
        "mn": "ORQPT",
        "catag": "READ",
        "descr": "patient's attending physician and primary provider.",
        "tags": [
            "DFN"
        ]
    },
    "ORQPT CLINIC PATIENTS": {
        "mn": "ORQPT",
        "catag": "READ",
        "descr": "patients with appointments at a clinic between start and stop dates",
        "tags": [
            "DFN",
            "QUERY",
            "PARAMETER"
        ]
    },
    "ORQPT CLINICS": {
        "mn": "ORQPT",
        "catag": "READ",
        "descr": "a list of clinics stored in Parameter 'ORWD COMMON CLINIC'",
        "tags": [
            "LOCATION",
            "PARAMETER"
        ]
    },
    "ORQPT DEFAULT CLINIC DATE RANG": {
        "mn": "ORQPT",
        "catag": "READ",
        "descr": "default start and stop dates for clinics specific to a user",
        "tags": [
            "LOCATION",
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORQPT DEFAULT LIST SORT": {
        "mn": "ORQPT",
        "catag": "READ",
        "descr": "current user's default patient selection list SORT ORDER setting. Typical preference stuff - 'ORLP DEFAULT LIST ORDER'",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORQPT DEFAULT LIST SOURCE": {
        "mn": "ORQPT",
        "catag": "READ",
        "descr": "the source (ward | team | ...) of the current user's default patient list.",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORQPT DEFAULT PATIENT LIST": {
        "mn": "ORQPT",
        "catag": "READ",
        "descr": "returns the current user's default patient list. Returning Patients for a User.",
        "tags": [
            "PARAMETER",
            "DFN"
        ]
    },
    "ORQPT KILL RPL": {
        "mn": "ORQPT",
        "catag": "UTILITY",
        "descr": "Clean up TMP made with MAKE RPL",
        "tags": [
            "REENTRANCY",
            "HARD CODED"
        ]
    },
    "ORQPT MAKE RPL": {
        "mn": "ORQPT",
        "catag": "UTILITY",
        "descr": "Passes Team List (100.21) IEN, creates a TMP file",
        "files": ["100.21"],
        "tags": [
            "REENTRANCY",
            "DFN"
        ]
    },
    "ORQPT PATIENT TEAM PROVIDERS": {
        "mn": "ORQPT",
        "catag": "READ",
        "files": ["100.21"],
        "descr": "list of providers linked to a patient via teams. Uses index on 100.21",
        "tags": [
            "DFN",
            "XREF",
            "QUERY"
        ]
    },
    "ORQPT PROVIDER PATIENTS": {
        "mn": "ORQPT",
        "catag": "READ",
        "descr": "patients linked to a provider/user. Uses index in DPT",
        "tags": [
            "DFN",
            "XREF",
            "QUERY"
        ]
    },
    "ORQPT PROVIDERS": {
        "mn": "ORQPT",
        "catag": "READ",
        "descr": "an array of providers - note tag DUZ here means Users and not a specific DUZ. Checks provider is active and using XUSEC is a user a provider ie/ has 'PROVIDER' key",
        "files": ["200"],
        "tags": [
            "XUSEC",
            "XREF",
            "DUZ"
        ]
    },
    "ORQPT READ RPL": {
        "mn": "ORQPT",
        "catag": "READ",
        "descr": "global ref leads to list of patients for scroll box (44 max). Uses TMP from MAKE RPL.",
        "tags": [
            "DFN",
            "REENTRANCY"
        ]
    },
    "ORQPT SPECIALTIES": {
        "mn": "ORQPT",
        "catag": "READ",
        "descr": "treating specialties.",
        "files": ["45.7"],
        "tags": [
            "K/META"
        ]
    },
    "ORQPT SPECIALTY PATIENTS": {
        "mn": "ORQPT",
        "catag": "READ",
        "descr": "patients linked to a treating specialty.",
        "files": ["2"],
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "ORQPT TEAM PATIENTS": {
        "mn": "ORQPT",
        "catag": "READ",
        "descr": "patients on a team. Optional whether to write to TMP or not",
        "files": ["100.21"],
        "tags": [
            "DFN",
            "REENTRANCY"
        ]
    },
    "ORQPT TEAMS": {
        "mn": "ORQPT",
        "catag": "READ",
        "descr": "list of teams.",
        "files": ["100.21"],
        "tags": [
            "DUZ"
        ]
    },
    "ORQPT WARD PATIENTS": {
        "mn": "ORQPT",
        "catag": "READ",
        "files": ["42", "2"],
        "descr": "patients on a ward. From ward to patient and room bed taken from DPT if available",
        "tags": [
            "DFN",
            "LOCATION"
        ]
    },
    "ORQPT WARDRMBED": {
        "mn": "ORQPT",
        "catag": "READ",
        "complexity": "LOW",
        "descr": "the ward, room-bed for a patient",
        "tags": [
            "DFN"
        ]
    },
    "ORQPT WARDS": {
        "mn": "ORQPT",
        "complexity": "LOW",
        "files": ["42"],
        "catag": "READ",
        "descr": "Simple name/ien of wards defined in file 42",
        "tags": [
            "LOCATION"
        ]
    },
    "ORQQAL DETAIL": {
        "catag": "READ",
        "complexity": "LOW",
        "tags": [
            "DFN"
        ]
    },
    "ORQQAL LIST": {
        "mn": "ORQQAL",
        "catag": "READ",
        "complexity": "LOW",
        "tags": [
            "DFN"
        ]
    },
    "ORQQAL LIST REPORT": {
        "catag": "READ",
        "complexity": "LOW",
        "descr": "Patients allergy reactions in Report format (vs ORQQAL LIST)",
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN ADDCMT": {
        "mn": "ORQQCN",
        "catag": "CHANGE",
        "domain": "CONSULTS",
        "descr": "comment to consult change - may send alert ... gets into 100.9 etc",
        "files": ["123"],
        "tags": [
            "DFN",
            "ALERT"
        ]
    },
    "ORQQCN ADMIN COMPLETE": {
        "mn": "ORQQCN",
        "catag": "CHANGE",
        "domain": "CONSULTS",
        "descr": "Admin complete for consult and returns unstructured data - need to test for full purpose",
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN ASSIGNABLE MED RESULTS": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "medicine results that can be attached to a procedure.",
        "files": ["123", "697.2"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN ATTACH MED RESULTS": {
        "mn": "ORQQCN",
        "catag": "CHANGE",
        "domain": "CONSULTS",
        "descr": "med result to be attached to a procedure request.",
        "files": ["123"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN CANEDIT": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "whether a consult/procedure request can beresubmitted.",
        "domain": "CONSULTS",
        "files": ["123"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN DEFAULT REQUEST REASON": {
        "mn": "ORQQCN",
        "catag": "READ",
        "files": ["123.3", "123.5"],
        "tags": [
            "K/META"
        ]
    },
    "ORQQCN DETAIL": {
        "mn": "ORQQCN",
        "catag": "READ",
        "files": ["123"],
        "descr": "formatted detailed information regarding the consult request,including result report if available.",
        "tags": [
            "DFN",
            "UNSTRUCTURED READ",
            "JLV"
        ]
    },
    "ORQQCN DISCONTINUE": {
        "mn": "ORQQCN",
        "catag": "CHANGE",
        "descr": "Discontinue a consult or deny a consult request.",
        "files": ["123"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN EDIT DEFAULT REASON": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "when the consults'reason for request can be edited.",
        "files": ["123.3", "123.5"],
        "tags": [
            "K/META"
        ]
    },
    "ORQQCN FIND CONSULT": {
        "mn": "ORQQCN",
        "catag": "READ",
        "files": ["123"],
        "descr": "a Consult IEN in file 123, return a formatted list item for that",
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN FORWARD": {
        "mn": "ORQQCN",
        "catag": "CHANGE",
        "descr": "Forwards a consult to a subservice of the forwarding service, as definedin file 123.5",
        "files": ["123", "123.5"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN GET CONSULT": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "Given a Consult ID from file 123, return the zero node to the client forloading into a consult record. If the consult has anyassociated TIU records (completion, addenda) these will be returned",
        "files": ["123"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN GET MED RESULT DETAILS": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "Detailed display of medicine results - may be a utility",
        "files": ["691.5"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN GET ORDER NUMBER": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "Tie back to orders. Simple lookup",
        "files": ["123", "100"],
        "complexity": "LOW",
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN GET PROC IEN": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "orderable item IEN, return pointer to file 123.3",
        "files": ["123.3", "101.43"],
        "complexity": "LOW",
        "tags": [
            "K/META"
        ]
    },
    "ORQQCN GET PROC SVCS": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "an orderable item from the S.PROC XREF in 101.43, return theConsults service from 123.5 that can perform the procedure.",
        "files": ["123.3", "123.5", "101.43"],
        "tags": [
            "K/META",
            "XREF"
        ]
    },
    "ORQQCN GET SERVICE IEN": {
        "mn": "ORQQCN",
        "catag": "READ",
        "files": ["101.43", "123.5"],
        "complexity": "LOW",
        "tags": [
            "K/META"
        ]
    },
    "ORQQCN ISPROSVC": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "RPC will return 1 or 0 if the supplied file entry from 123.5 is marked as part of the Consults-Prosthetics interface. This RPC is used to disable the Earliest Appropriate Date field and value when ordering Prosthetics requests via CPRS GUI.",
        "files": ["123.5"],
        "complexity": "LOW",
        "tags": [
            "K/META",
            "IS/A"
        ]
    },
    "ORQQCN LIST": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "consult requests for a patient within optional date range",
        "files": ["123"],
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "ORQQCN LOAD FOR EDIT": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "the current values of that record's fields.",
        "files": ["123"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN MED RESULTS": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "a display of Medicine Package results, followed by any TIU results. Uses 0;15 VPTR to 'GMRC MEDICINE PKG INTERFACE option'",
        "files": ["123"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN PRINT SF513": {
        "mn": "ORQQCN",
        "catag": "UTILITY",
        "tags": [
            "PRINT"
        ]
    },
    "ORQQCN PROVDX": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "provisional dx prompting info for service",
        "files": ["123.3", "123.5"],
        "tags": [
            "K/META"
        ]
    },
    "ORQQCN RECEIVE": {
        "mn": "ORQQCN",
        "catag": "CHANGE",
        "descr": "version of RECEIVE CONSULT for use with GUI",
        "files": ["123"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN REMOVABLE MED RESULTS": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "list of medicine results that are currently attached to a procedure.",
        "files": ["123", "697.2"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN REMOVE MED RESULTS": {
        "mn": "ORQQCN",
        "catag": "CHANGE",
        "descr": "removal of medicine results from a procedure.",
        "files": ["123"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN RESUBMIT": {
        "mn": "ORQQCN",
        "catag": "CHANGE",
        "descr": "resubmission of a cancelled consult or procedure request afterediting. This is a backdoor resubmission, and CPRS will be notified via the HL7 proocess.",
        "files": ["123"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN SET ACT MENUS": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "Based on the IEN of the consult passed in, returns a string representingvarious facets of the user's access level for that consult and service. This allows dynamic enabling/disabling of GUI menus based on the user's ability to act on that particular consult. ie/ CPRS config but not parameters?",
        "files": ["123"],
        "tags": [
            "DFN",
            "CPRS CONFIG"
        ]
    },
    "ORQQCN SF513 WINDOWS PRINT": {
        "mn": "ORQQCN",
        "catag": "UTILITY",
        "descr": "Print consults Standard Form 513",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORQQCN SHOW SF513": {
        "mn": "ORQQCN",
        "catag": "CHANGE",
        "descr": "text of form 513 consults and writes audits",
        "files": ["123"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN SIGFIND": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "significant findings",
        "files": ["123"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN STATUS": {
        "mn": "ORQQCN",
        "catag": "READ",
        "files": ["123.1"],
        "descr": "consult statuses currently in use, as reflected in the \"AC\" XREF of ^GMR(123.1. ie/ [K/META]",
        "tags": [
            "K/META",
            "XREF"
        ]
    },
    "ORQQCN SVC W/SYNONYMS": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "does allow DFN/123 pass in but optional. This is 123.5 meta",
        "files": ["123.5"],
        "tags": [
            "K/META"
        ]
    },
    "ORQQCN SVCLIST": {
        "mn": "ORQQCN",
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "ORQQCN SVCTREE": {
        "mn": "ORQQCN",
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "ORQQCN UNRESOLVED": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "USER PER PATIENT CONSULTS unresolved",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "ORQQCN URGENCIES": {
        "mn": "ORQQCN",
        "catag": "READ",
        "descr": "Per user - protocol 101 in play",
        "tags": [
            "DFN"
        ]
    },
    "ORQQCN2 GET CONTEXT": {
        "mn": "ORQQCN2",
        "catag": "READ",
        "descr": "GET^XPAR PARAMETER 'ORCH CONTEXT CONSULTS'",
        "complexity": "LOW",
        "tags": [
            "PARAMETER",
            "S/META"
        ]
    },
    "ORQQCN2 GET PREREQUISITE": {
        "mn": "ORQQCN2",
        "catag": "READ",
        "descr": "blurbs from 123.5"
    },
    "ORQQCN2 SAVE CONTEXT": {
        "mn": "ORQQCN2",
        "catag": "CHANGE",
        "descr": "[DUZ] new view preferences 'ORCH CONTEXT CONSULTS' [PARAMETER] GET|CHG|SAVE",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORQQCN2 SCHEDULE CONSULT": {
        "mn": "ORQQCN2",
        "catag": "CHANGE",
        "descr": "consult to 'scheduled' and optional comment",
        "tags": [
            "DFN"
        ]
    },
    "ORQQLR DETAIL": {
        "catag": "READ",
        "descr": "Details of a lab order",
        "domain": "LAB",
        "tags": [
            "DFN"
        ]
    },
    "ORQQLR SEARCH RANGE INPT": {
        "mn": "ORQQLR",
        "catag": "READ",
        "descr": "lab results search date range for an inpatient",
        "tags": [
            "DFN",
            "PARAMETER"
        ]
    },
    "ORQQLR SEARCH RANGE OUTPT": {
        "mn": "ORQQLR",
        "catag": "READ",
        "parameters": ["ORQQLR SEARCH RANGE OUTPT"],
        "descr": "ala INPT except per user as outpatient location isn't reliable",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORQQPL ADD SAVE": {
        "mn": "ORQQPL",
        "catag": "CHANGE",
        "descr": "[DFN]",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPL AUDIT HIST": {
        "mn": "ORQQPL",
        "catag": "READ",
        "descr": "RETURN PROBLEM AUDIT HISTORY",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPL CHECK DUP": {
        "mn": "ORQQPL",
        "catag": "READ",
        "descr": "Check for duplicate",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPL CLIN FILTER LIST": {
        "catag": "READ",
        "descr": "List of Clinics passed in",
        "tags": [
            "LOCATION",
            "IEN-LOOKUP"
        ]
    },
    "ORQQPL CLIN SRCH": {
        "mn": "ORQQPL",
        "catag": "READ",
        "descr": "clinics (for problem list) - comment says should be replaced by PARAMETER using 'CLIN^ORQPTQ2' but still in use going through names of LOCATIONs",
        "tags": [
            "LOCATION"
        ]
    },
    "ORQQPL DELETE": {
        "mn": "ORQQPL",
        "catag": "CHANGE",
        "descr": "[DFN]",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPL DETAIL": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPL EDIT LOAD": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPL EDIT SAVE": {
        "mn": "ORQQPL",
        "catag": "CHANGE",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPL INACTIVATE": {
        "mn": "ORQQPL",
        "catag": "CHANGE",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPL INIT PT": {
        "mn": "ORQQPL",
        "catag": "READ",
        "descr": "returns death indicator, sc and exposures",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPL INIT USER": {
        "mn": "ORQQPL",
        "catag": "READ",
        "files": ["125.99"],
        "parameters": ["ORCH CONTEXT PROBLEMS"],
        "descr": "user params for problem list. Though pitched as per user, most are global settings from 125.99. Note leaves GMPLUSER on symbol table - is evaluated in EDITSAVE",
        "tags": [
            "REENTRANCY",
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORQQPL LIST": {
        "catag": "READ",
        "descr": "List of problems for patient",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPL PROB COMMENTS": {
        "mn": "ORQQPL",
        "catag": "READ",
        "descr": "Comments of problem",
        "tags": [
            "DFN",
            "JLV"
        ]
    },
    "ORQQPL PROBLEM LEX SEARCH": {
        "mn": "ORQQPL",
        "catag": "READ",
        "descr": "list from clinical lexicon for display in list or combo box",
        "tags": [
            "K/META",
            "LEXICON"
        ]
    },
    "ORQQPL PROBLEM LIST": {
        "catag": "READ",
        "descr": "List of patient problems",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPL PROBLEM NTRT BULLETIN": {
        "mn": "ORQQPL",
        "catag": "UTILITY",
        "parameters": ["OR PROBLEM NTRT BY DIVISION"],
        "descr": "generates a bulletin to the OR CAC Mail Group, indicating that an unresolved term needs to be requested using the New Term Rapid Turnaround website at http://hdrmul7.aac.va.gov:7151/ntrt/.",
        "tags": [
            "BULLETIN",
            "XMB",
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORQQPL PROV FILTER LIST": {
        "catag": "READ",
        "descr": "Like many get provider/location RPCs, shouldn't be specific to a domain",
        "tags": [
            "DUZ"
        ]
    },
    "ORQQPL PROVIDER LIST": {
        "catag": "READ",
        "descr": "Like many get provider/location RPCs, shouldn't be specific to a domain",
        "tags": [
            "DUZ"
        ]
    },
    "ORQQPL REPLACE": {
        "mn": "ORQQPL",
        "catag": "CHANGE",
        "descr": "Replaces a problem that was previously deleted",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPL SAVEVIEW": {
        "mn": "ORQQPL",
        "catag": "CHANGE",
        "files": ["200"],
        "parameters": ["ORCH CONTEXT PROBLEMS"],
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORQQPL SERV FILTER LIST": {
        "catag": "READ",
        "files": ["49"],
        "tags": [
            "K/META"
        ]
    },
    "ORQQPL SRVC SRCH": {
        "mn": "ORQQPL",
        "catag": "READ",
        "files": ["49"],
        "tags": [
            "K/META"
        ]
    },
    "ORQQPL UPDATE": {
        "mn": "ORQQPL",
        "catag": "CHANGE",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPL USER PROB CATS": {
        "mn": "ORQQPL",
        "catag": "READ",
        "descr": "Problem selection lists - globally and in field 125 of user. As a mix of global and user, counts as DUZ and not K/META",
        "files": ["125.1", "200"],
        "tags": [
            "DUZ",
            "REENTRANCY"
        ]
    },
    "ORQQPL USER PROB LIST": {
        "catag": "READ",
        "descr": "Despite name, USER/DUZ not involved",
        "files": ["125.12"],
        "tags": [
            "K/META"
        ]
    },
    "ORQQPL VERIFY": {
        "mn": "ORQQPL",
        "catag": "CHANGE",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPL4 LEX": {
        "mn": "ORQQPL4",
        "catag": "READ",
        "tags": [
            "K/META",
            "LEXICON"
        ]
    },
    "ORQQPP LIST": {
        "mn": "ORQQPP",
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPS DETAIL": {
        "catag": "READ",
        "descr": "Details of a Medication Order - from patient specific but most work is inside PSRX. Note DINUM 55 used too.",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPS LIST": {
        "catag": "READ",
        "descr": "Patient's condensed medication list",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPX GET DEF LOCATIONS": {
        "catag": "READ",
        "parameters": ["ORQQPX DEFAULT LOCATIONS"],
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORQQPX GET FOLDERS": {
        "catag": "READ",
        "parameters": ["ORQQPX REMINDER FOLDERS"],
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORQQPX GET HIST LOCATIONS": {
        "catag": "READ",
        "files": ["9999999.06"],
        "descr": "IHS LOCATION that maps to 4",
        "tags": [
            "LOCATION"
        ]
    },
    "ORQQPX GET NOT PURPOSE": {
        "catag": "READ",
        "tags": [
            "NOT OSEHRA",
            "OUT OF SCOPE"
        ]
    },
    "ORQQPX IMMUN LIST": {
        "catag": "READ",
        "descr": "Patients immunizaton list",
        "files": ["9000010.11"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQPX LVREMLST": {
        "mn": "ORQQPX",
        "catag": "READ",
        "parameters": ["ORQQPX COVER SHEET REM CLASSES", "ORQQPX COVER SHEET REMINDERS"],
        "descr": "cover sheet reminder settings",
        "tags": [
            "PARAMETER",
            "K/META"
        ]
    },
    "ORQQPX NEW COVER SHEET ACTIVE": {
        "mn": "ORQQPX",
        "catag": "READ",
        "parameters": ["ORQQPX NEW REMINDER PARAMS"],
        "descr": "Service section from 200 is used",
        "tags": [
            "PARAMETER",
            "DUZ",
            "IS-A"
        ]
    },
    "ORQQPX NEW COVER SHEET REMS": {
        "mn": "ORQQPX",
        "catag": "READ",
        "parameters": ["ORQQPX SEARCH ITEMS"],
        "descr": "Service section from 200 is used",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORQQPX NEW REMINDERS ACTIVE": {
        "mn": "ORQQPX",
        "catag": "READ",
        "parameters": ["PXRM GUI REMINDERS ACTIVE"],
        "descr": "Service section from 200 is used",
        "tags": [
            "DUZ",
            "PARAMETER",
            "IS-A"
        ]
    },
    "ORQQPX REM INSERT AT CURSOR": {
        "mn": "ORQQPX",
        "catag": "READ",
        "parameters": ["ORQQPX REMINDER TEXT AT CURSOR"],
        "descr": "Service section from 200 is used",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORQQPX REMINDER DETAIL": {
        "catag": "UTILITY",
        "descr": "Utility as so much calculation. Details of a Clinical Reminder - 811.9 is the Reminder Definition",
        "files": ["811.9"],
        "tags": [
            "DFN",
            "JLV",
            "eHMP"
        ]
    },
    "ORQQPX REMINDERS LIST": {
        "catag": "UTILITY",
        "descr": "Utility as so much calculation. Details of a Clinical Reminder - 811.9 is the Reminder Definition",
        "files": ["811.9"],
        "tags": [
            "DFN",
            "eHMP"
        ]
    },
    "ORQQPX SAVELVL": {
        "mn": "ORQQPX",
        "catag": "CHANGE",
        "parameters": ["ORQQPX COVER SHEET REM CLASSES", "ORQQPX COVER SHEET REMINDERS"],
        "descr": "Saves cover sheet settings EN|DEL",
        "tags": [
            "PARAMETER"
        ]
    },
    "ORQQPX SET FOLDERS": {
        "catag": "CHANGE",
        "parameters": "ORQQPX REMINDER FOLDERS",
        "descr": "Sets parameter value for current user",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORQQPXRM CHECK REM VERSION": {
        "mn": "ORQQPXRM",
        "catag": "READ",
        "descr": "Getting version of package ie/ 9.4 (Package Prototype ie/ util though used from Reminder",
        "tags": [
            "S/META"
        ]
    },
    "ORQQPXRM DIALOG ACTIVE": {
        "mn": "ORQQPXRM",
        "catag": "READ",
        "files": ["811.9", "801.41"],
        "descr": "For a list of reminders [#811.9] returns same list with status to indicateif an active dialog exists for the reminder",
        "tags": [
            "K/META"
        ]
    },
    "ORQQPXRM DIALOG PROMPTS": {
        "mn": "ORQQPXRM",
        "catag": "READ",
        "files": ["801.41"],
        "descr": "Additional prompts for a given dialog element",
        "tags": [
            "K/META"
        ]
    },
    "ORQQPXRM EDUCATION SUBTOPICS": {
        "mn": "ORQQPXRM",
        "catag": "READ",
        "files": ["9999999.09"],
        "descr": "subtopics education",
        "tags": [
            "K/META"
        ]
    },
    "ORQQPXRM EDUCATION SUMMARY": {
        "mn": "ORQQPXRM",
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "ORQQPXRM EDUCATION TOPIC": {
        "mn": "ORQQPXRM",
        "catag": "READ",
        "files": ["9999999.09"],
        "descr": "Detailed description of education topic - 9999999_09 is file",
        "tags": [
            "K/META"
        ]
    },
    "ORQQPXRM GEC DIALOG": {
        "mn": "ORQQPXRM",
        "catag": "UTILITY",
        "descr": "this RPC will evaluate the Reminder Dialogs (801.41) - and Reminder Definitions (811.9) - as the Finish button is clickfor the GEC Project. THis RPC will return an error messages if the four GEC Reminder Dialogs are done out of order. This can use Patient Link file (small amount of data in 801.5)",
        "files": ["801.41", "811.9", "801.5"],
        "tags": [
            "DFN",
            "COMPUTATION"
        ]
    },
    "ORQQPXRM GEC FINISHED?": {
        "mn": "ORQQPXRM",
        "catag": "UTILITY",
        "descr": "Clear 801.5 entries for DFN",
        "files": ["801.5"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQPXRM GEC STATUS PROMPT": {
        "mn": "ORQQPXRM",
        "catag": "UTILITY",
        "descr": "Progress check. This remote procedure will return the text value to display in CPRS of the status of the current GEC Referral.",
        "files": ["801.5"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQPXRM GET WH LETTER TEXT": {
        "catag": "READ",
        "files": ["790.404"],
        "descr": "Template note of a particular type",
        "exArgs": "[1]",
        "tags": [
            "K/META"
        ]
    },
    "ORQQPXRM GET WH LETTER TYPE": {
        "catag": "READ",
        "descr": "8994 appears wrong as entry seems to be TYPE and not GETTYPE",
        "files": ["790.403"],
        "tags": [
            "OUT OF SCOPE",
            "NOT OSEHRA"
        ]
    },
    "ORQQPXRM GET WH PROC RESULT": {
        "catag": "READ",
        "tags": [
            "OUT OF SCOPE",
            "NOT OSEHRA"
        ]
    },
    "ORQQPXRM GET WH REPORT TEXT": {
        "catag": "READ",
        "files": ["790.1"],
        "descr": "Womans Health",
        "tags": [
            "DUZ"
        ]
    },
    "ORQQPXRM MENTAL HEALTH": {
        "mn": "ORQQPXRM",
        "catag": "READ",
        "descr": "MH TESTS and SURVEYS",
        "files": ["601.71"],
        "tags": [
            "PATCH",
            "K/META"
        ]
    },
    "ORQQPXRM MENTAL HEALTH RESULTS": {
        "mn": "ORQQPXRM",
        "catag": "READ",
        "descr": "Returns progress note text based on the results of the test.",
        "files": ["801.41"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQPXRM MENTAL HEALTH SAVE": {
        "mn": "ORQQPXRM",
        "catag": "CHANGE",
        "descr": "stores test results responses from reminder dialog",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPXRM MHDLL": {
        "mn": "ORQQPXRM",
        "catag": "READ",
        "descr": "another Reminder score builder",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPXRM MHV": {
        "mn": "ORQQPXRM",
        "catag": "READ",
        "descr": "but like others, a score calc => calculated field",
        "tags": [
            "DFN",
            "PATCH"
        ]
    },
    "ORQQPXRM MST UPDATE": {
        "mn": "ORQQPXRM",
        "catag": "CHANGE",
        "tags": [
            "OUT OF SCOPE",
            "OBSOLETE"
        ]
    },
    "ORQQPXRM PROGRESS NOTE HEADER": {
        "mn": "ORQQPXRM",
        "catag": "READ",
        "parameters": ["PXRM PROGRESS NOTE HEADERS"],
        "tags": [
            "LOCATION",
            "DUZ"
        ]
    },
    "ORQQPXRM REMINDER CATEGORIES": {
        "mn": "ORQQPXRM",
        "catag": "READ",
        "parameters": ["PXRM CPRS LOOKUP CATEGORIES"],
        "tags": [
            "LOCATION",
            "DUZ"
        ]
    },
    "ORQQPXRM REMINDER DETAIL": {
        "catag": "UTILITY",
        "files": ["811.9"],
        "tags": [
            "DFN",
            "UNSTRUCTURED READ"
        ]
    },
    "ORQQPXRM REMINDER DIALOG": {
        "mn": "ORQQPXRM",
        "catag": "READ",
        "files": ["811.9", "801.41"],
        "descr": "Dialog for a given reminder",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPXRM REMINDER EVALUATION": {
        "mn": "ORQQPXRM",
        "catag": "UTILITY",
        "descr": "Allows evaluation of a list of reminders. Returns a list of clinicalreminders due/applicable or not applicable to the patient ie/ Calculation and not stored in a fixed way but as a calc == a change!",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPXRM REMINDER INQUIRY": {
        "mn": "ORQQPXRM",
        "catag": "READ",
        "files": ["811.9"],
        "exArgs": "[1]",
        "descr": "Detailed description of reminder",
        "tags": [
            "K/META"
        ]
    },
    "ORQQPXRM REMINDER WEB": {
        "mn": "ORQQPXRM",
        "catag": "READ",
        "files": ["811.9", "800"],
        "descr": "Web addresses for selected reminder - 800 is a meta file and there's only one",
        "tags": [
            "K/META"
        ]
    },
    "ORQQPXRM REMINDERS APPLICABLE": {
        "mn": "ORQQPXRM",
        "descr": "Evaluate cover sheet reminders",
        "catag": "UTILITY",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPXRM REMINDERS UNEVALUATED": {
        "mn": "ORQQPXRM",
        "catag": "UTILITY",
        "tags": [
            "DFN"
        ]
    },
    "ORQQPXRM WOMEN HEALTH SAVE": {
        "mn": "ORQQPXRM",
        "catag": "CHANGE",
        "files": ["790.1"],
        "descr": "Pass back data to be file in the Women's Health Package file 790.1.",
        "tags": [
            "DFN"
        ]
    },
    "ORQQVI NOTEVIT": {
        "mn": "ORQQVI",
        "catag": "READ",
        "descr": "Patient's vitals from a visit of a note ie/ two lookups",
        "tags": [
            "DFN"
        ]
    },
    "ORQQVI VITALS": {
        "mn": "ORQQVI",
        "catag": "READ",
        "descr": "Most recent vitals (used inside NODEVIT)",
        "tags": [
            "DFN"
        ]
    },
    "ORQQVI VITALS FOR DATE RANGE": {
        "mn": "ORQQVI",
        "catag": "READ",
        "descr": "vitals for date range",
        "tags": [
            "DFN"
        ]
    },
    "ORQQVI1 DETAIL": {
        "mn": "ORQQVI1",
        "catag": "READ",
        "descr": "Detail of Tests. Uses ^PXRMINDX(120.5 etc. ie/ vitals too",
        "tags": [
            "DFN"
        ]
    },
    "ORQQVI1 GRID": {
        "mn": "ORQQVI1",
        "catag": "READ",
        "descr": "^PXRMINDX(120.5 again leveraged",
        "tags": [
            "DFN"
        ]
    },
    "ORQQVI2 VITALS HELP": {
        "mn": "ORQQVI2",
        "catag": "READ",
        "descr": "The list of types are hard coded in the file GMRVPCE0 and the help text is hard coded in GMRVPCE2 (should be in a meta data defn)",
        "exArgs": "[1]",
        "tags": [
            "K/META",
            "HARD CODED",
            "UNSTRUCTURED READ"
        ]
    },
    "ORQQVI2 VITALS RATE CHECK": {
        "mn": "ORQQVI2",
        "catag": "UTILITY",
        "descr": "Rate check including units",
        "tags": [
            "IS-A",
            "HARD CODED"
        ]
    },
    "ORQQVI2 VITALS VAL & STORE": {
        "mn": "ORQQVI2",
        "catag": "CHANGE",
        "descr": "PCE device i/f - see defns - stores into 120.5 if measurements validated",
        "files": ["120.5"],
        "tags": [
            "DFN",
            "EXTERNAL I/F"
        ]
    },
    "ORQQVI2 VITALS VALIDATE": {
        "mn": "ORQQVI2",
        "catag": "UTILITY",
        "descr": "Validates data from external i/f including DFN reference. Subset of VAL and STORE.",
        "tags": [
            "DUZ",
            "HARD CODED",
            "EXTERNAL I/F",
            "IS-A"
        ]
    },
    "ORQQVI2 VITALS VALIDATE TYPE": {
        "mn": "ORQQVI2",
        "catag": "UTILITY",
        "descr": "Validate type is valid - types are hard coded in GMRVPCE0. Would be better in a data definition",
        "tags": [
            "K/META",
            "HARD CODED"
        ]
    },
    "ORQQVS DETAIL NOTES": {
        "catag": "READ",
        "descr": "the progress notes based on patient and visit identifier.",
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "ORQQVS DETAIL SUMMARY": {
        "catag": "READ",
        "descr": "discharge summary for a visit",
        "tags": [
            "DFN"
        ]
    },
    "ORQQVS VISITS/APPTS": {
        "mn": "ORQQVS",
        "catag": "READ",
        "descr": "list of patient appointments and visits for a date/time range.location.",
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "ORQQXMB MAIL GROUPS": {
        "mn": "ORQQXMB",
        "catag": "READ",
        "files": ["3.8"],
        "descr": "Straightforward output from a file, the System wide mail groups file 3.8",
        "tags": [
            "S/META"
        ]
    },
    "ORQQXQA PATIENT": {
        "mn": "ORQQXQA",
        "catag": "READ",
        "descr": "100.9 has notification types. 8992 has user indexed alerts. Notifications per Patient per User - XQALERT leverages 8992, the Alert file which has entry per User and multiple per alert (ie/ hierarchy pattern vs alerts flat and index on user which would be better for MVDM)",
        "files": ["100.9", "8992"],
        "tags": [
            "DFN"
        ]
    },
    "ORQQXQA USER": {
        "mn": "ORQQXQA",
        "catag": "READ",
        "descr": "Notifications for User across all patients ... exs from Patch install issue etc etc beyond PATIENT",
        "files": ["100.9", "8992"],
        "tags": [
            "DFN"
        ]
    },
    "ORRHCQ QRYITR": {
        "mn": "ORRHCQ",
        "catag": "UTILITY",
        "descr": "Query for a patient - more generic approach with ORDERs, VISITs, CONSULTs",
        "tags": [
            "DFN",
            "FMUTILITY"
        ]
    },
    "ORVAA VAA": {
        "mn": "ORVAA",
        "catag": "READ",
        "descr": "VA Advantage policy name - seems to go into PATIENT(2)/2.312 which holds insurance policies.",
        "tags": [
            "DFN",
            "BUSINESS"
        ]
    },
    "ORVW FACLIST": {
        "catag": "UTILITY",
        "descr": "Uses MPI. Wrapper for the TFL^VAFCTFU1 routine, which returns all the treatingfacilities for a given patient DFN. HL7 is involved and the FM file, 391.91, the treating facility list for a patient",
        "files": ["391.91"],
        "tags": [
            "DFN",
            "LOCATION",
            "MPI",
            "OUT OF SCOPE"
        ]
    },
    "ORWCH LDFONT": {
        "mn": "ORWCH",
        "catag": "READ",
        "parameters": ["ORWCH FONT SIZE"],
        "descr": "Simple parameter getter - a user preference",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWCH LOADALL": {
        "mn": "ORWCH",
        "catag": "READ",
        "descr": "size related CPRS GUI chart params for user - rolls up a series of parameters",
        "parameters": ["ORWCH BOUNDS", "ORWCH WIDTHS", "ORWCH COLUMNS"],
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWCH LOADSIZ": {
        "mn": "ORWCH",
        "catag": "READ",
        "descr": "size/bounds for CPRS GUI Control",
        "parameters": ["ORWCH BOUNDS"],
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWCH SAVEALL": {
        "mn": "ORWCH",
        "catag": "CHANGE",
        "descr": "saves user's GUI chart sizes (a number of parameters in one go)",
        "parameters": ["ORWCH BOUNDS", "ORWCH WIDTHS", "ORWCH COLUMNS"],
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWCH SAVECOL": {
        "mn": "ORWCH",
        "catag": "CHANGE",
        "descr": "col width sizes for reports for user",
        "parameters": ["ORWCH COLUMNS REPORTS"],
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWCH SAVESIZ": {
        "mn": "ORWCH",
        "catag": "CHANGE",
        "parameters": ["ORWCH BOUNDS"],
        "descr": "saves bounds for particular gui control",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWCH SAVFONT": {
        "mn": "ORWCH",
        "catag": "CHANGE",
        "descr": "save user's font preference - straight PARAMETER",
        "parameters": ["ORWCH FONT SIZE"],
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWCIRN AUTORDV": {
        "mn": "ORWCIRN",
        "catag": "READ",
        "descr": "Get parameter value for ORWRP CIRN AUTOMATIC.",
        "parameters": ["ORWRP CIRN AUTOMATIC"],
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWCIRN CHECKLINK": {
        "mn": "ORWCIRN",
        "catag": "UTILITY",
        "descr": "Check for active HL7 link",
        "tags": [
            "SYSTEM",
            "HL7"
        ]
    },
    "ORWCIRN FACLIST": {
        "mn": "ORWCIRN",
        "catag": "UTILITY",
        "descr": "Return list of remote facilities for patient - compare to 'ORVW FACLIS'",
        "tags": [
            "DFN",
            "MPI",
            "LOCATION",
            "OUT OF SCOPE"
        ]
    },
    "ORWCIRN HDRON": {
        "mn": "ORWCIRN",
        "catag": "READ",
        "descr": "pure get of 'ORWRP HDR ON'",
        "parameters": ["ORWRP HDR ON"],
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWCIRN WEBADDR": {
        "mn": "ORWCIRN",
        "catag": "READ",
        "parameters": ["ORWRP VISTAWEB ADDRESS"],
        "descr": "Can use parameter value but also has hard coded fall backs",
        "tags": [
            "S/META",
            "PARAMETERS",
            "HARD CODED"
        ]
    },
    "ORWCOM DETAILS": {
        "catag": "READ",
        "descr": "Returns details of COM object when passed in COM IEN. Straight read from file",
        "exArgs": "[1]",
        "files": ["101.15"],
        "tags": [
            "K/META"
        ]
    },
    "ORWCOM GETOBJS": {
        "catag": "READ",
        "descr": "Returns a list of all active COM objects",
        "files": ["101.15"],
        "tags": [
            "K/META",
            "QUERY"
        ]
    },
    "ORWCOM ORDEROBJ": {
        "mn": "ORWCOM",
        "catag": "READ",
        "descr": "Gets 'ORWCOM PATIENT SELECTED' COM object from PARAMETER. Per service and gets service/section (29) from DUZ/200",
        "parameters": ["ORWCOM PATIENT SELECTED"],
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORWCOM PTOBJ": {
        "mn": "ORWCOM",
        "catag": "READ",
        "parameters": ["ORWCOM PATIENT SELECTED"],
        "descr": "Like ORWCOM ORDEROBJ but for a different COM/PARAMETER",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORWCS LIST OF CONSULT REPORTS": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWCS PRINT REPORT": {
        "mn": "ORWCS",
        "catag": "UTILITY",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWCS REPORT TEXT": {
        "mn": "ORWCS",
        "catag": "READ",
        "descr": "Consult report formatted for an end user",
        "tags": [
            "UNSTRUCTURED READ",
            "DFN"
        ]
    },
    "ORWCV DTLVST": {
        "mn": "ORWCV",
        "catag": "READ",
        "descr": "This API returns the text of a progress note or discharge summary relatedto a visit/appointment.",
        "tags": [
            "DFN"
        ]
    },
    "ORWCV LAB": {
        "mn": "ORWCV",
        "catag": "READ",
        "descr": "labs for a patient",
        "tags": [
            "DFN"
        ]
    },
    "ORWCV POLL": {
        "mn": "ORWCV",
        "catag": "UTILITY",
        "descr": "Poll for completed parts of cover sheet",
        "tags": [
            "DFN",
            "REENTRANCY"
        ]
    },
    "ORWCV START": {
        "mn": "ORWCV",
        "catag": "UTILITY",
        "descr": "Start coversheet build in background - goes with POLL and STOP",
        "parameters": ["ORWOR COVER RETRIEVAL"],
        "tags": [
            "PARAMETER",
            "DFN",
            "REENTRANCY"
        ]
    },
    "ORWCV STOP": {
        "mn": "ORWCV",
        "catag": "UTILITY",
        "descr": "Stop coversheet build",
        "tags": [
            "DFN",
            "REENTRANCY"
        ]
    },
    "ORWCV VST": {
        "mn": "ORWCV",
        "catag": "READ",
        "descr": "visits/admissions for a patient",
        "tags": [
            "DFN"
        ]
    },
    "ORWCV1 COVERSHEET LIST": {
        "catag": "READ",
        "parameters": ["ORWCV1 COVERSHEET LIST"],
        "files": ["101.24", "8994"],
        "tags": [
            "PARAMETER",
            "K/META"
        ]
    },
    "ORWD DEF": {
        "catag": "READ",
        "descr": "Returns the formatting definition (field 10) for an ordering dialog from the ORDERDIALOG file (101.41). Straight forward dump of field 10",
        "comlexity": "LOW",
        "exArgs": "[1]",
        "files": ["101.41"],
        "tags": [
            "K/META"
        ]
    },
    "ORWD DT": {
        "mn": "ORWD",
        "catag": "UTILITY",
        "tags": [
            "HARD CODED"
        ]
    },
    "ORWD FORMID": {
        "mn": "ORWD",
        "catag": "READ",
        "descr": "map to windows form for order dialog ... tells the GUI DELPHI code which form to use to process the order dialog ex/ OD_ALLERGY 105 etc. For GUI that isn't in PARAMETERS. Pass in Order to get Order Dialog - ideally would just pass in Order Dialog and then this would be K/META",
        "files": ["100", "101.41", "8989.52"],
        "tags": [
            "DFN",
            "K/META"
        ]
    },
    "ORWD GET4EDIT": {
        "catag": "READ",
        "descr": "Responses in a format that can be used for edit. Starts from 100 which prevents pure meta data",
        "tags": [
            "DFN",
            "K/META"
        ]
    },
    "ORWD KEY": {
        "mn": "ORWD",
        "catag": "READ",
        "descr": "returns a 1 if the user holds the KEY, otherwise a 0 is returned.",
        "tags": [
            "XUSEC",
            "DUZ"
        ]
    },
    "ORWD OI": {
        "mn": "ORWD",
        "catag": "READ",
        "descr": "Orderables (101.43) iterator using named XREF",
        "exArgs": "[\"B\",0,\"A\"]",
        "files": ["101.43"],
        "tags": [
            "K/META"
        ]
    },
    "ORWD PROVKEY": {
        "mn": "ORWD",
        "catag": "READ",
        "descr": "does User possess the \"PROVIDER\" key. Like KEY only for specific KEY",
        "tags": [
            "DUZ",
            "XUSEC"
        ]
    },
    "ORWD SAVE": {
        "mn": "ORWD",
        "catag": "CHANGE",
        "complexity": "HIGH",
        "descr": "save an order. Specific paths for 'PSO OERR' etc",
        "tags": [
            "DUZ"
        ]
    },
    "ORWD SAVEACT": {
        "mn": "ORWD",
        "catag": "CHANGE",
        "complexity": "HIGH",
        "descr": "saves action for an order",
        "tags": [
            "DUZ"
        ]
    },
    "ORWD SIGN": {
        "mn": "ORWD",
        "catag": "CHANGE",
        "complexity": "HIGH",
        "descr": "Changes signature status on a list of orders and optionally releases the orders to their respective services. Checks DUZ has 'ORES' key",
        "keys": ["ORES"],
        "tags": [
            "DFN",
            "XUSEC"
        ]
    },
    "ORWD VALIDACT": {
        "mn": "ORWD",
        "catag": "READ",
        "descr": "is action valid for order",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "ORWD1 COMLOC": {
        "mn": "ORWD1",
        "catag": "READ",
        "descr": "? CHECK IF STRUCT"
    },
    "ORWD1 PARAM": {
        "mn": "ORWD1",
        "catag": "READ",
        "descr": "? CHECK IF STRUCT"
    },
    "ORWD1 PRINTGUI": {
        "catag": "UTILITY",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWD1 RVPRINT": {
        "catag": "UTILITY",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWD1 SIG4ANY": {
        "mn": "ORWD1",
        "catag": "UTILITY",
        "descr": "Does any order need a signature?",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "ORWD1 SIG4ONE": {
        "mn": "ORWD1",
        "catag": "READ",
        "descr": "Does an order need a sig?",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "ORWD1 SVONLY": {
        "mn": "ORWD1",
        "catag": "UTILITY",
        "descr": "print services copy only",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWD2 DEVINFO": {
        "catag": "READ",
        "descr": "Return device info when signing orders. May be out of scope.",
        "tags": [
            "DFN"
        ]
    },
    "ORWD2 MANUAL": {
        "mn": "ORWD2",
        "catag": "READ",
        "descr": "? CHECK IF STRUCT"
    },
    "ORWDAL32 ALLERGY MATCH": {
        "mn": "ORWDAL32",
        "catag": "READ",
        "descr": "Given a text string, return a list of possible matches from severaldifferent sources - K meta for Allergy",
        "tags": [
            "K/META"
        ]
    },
    "ORWDAL32 CLINUSER": {
        "mn": "ORWDAL32",
        "catag": "READ",
        "complexity": "LOW",
        "descr": "Can use mark allergy as EIE? [DUZ] [PARAMETER] - combination of parameters",
        "tags": [
            "DUZ",
            "PARAMETER",
            "IS-A"
        ]
    },
    "ORWDAL32 DEF": {
        "catag": "READ",
        "descr": "Get dialog data for allergies - some hard coded, some from 120.84, some like 'top ten symptoms' reflect system use",
        "files": ["120.84"],
        "complexity": "MEDIUM",
        "tags": [
            "K/META",
            "HARD CODED"
        ]
    },
    "ORWDAL32 LOAD FOR EDIT": {
        "catag": "READ",
        "complexity": "LOW",
        "tags": [
            "DFN"
        ]
    },
    "ORWDAL32 SAVE ALLERGY": {
        "catag": "CHANGE",
        "complexity": "HIGH",
        "descr": "Bulletins by side effect for create allergy and EIE. Also 'fires' protocol for event listeners and med watch updates if drug allergy",
        "tags": [
            "DFN",
            "BULLETIN",
            "PROTOCOL"
        ]
    },
    "ORWDAL32 SEND BULLETIN": {
        "mn": "ORWDAL32",
        "catag": "UTILITY",
        "descr": "Send bulletin if user attempts free text entry - covers DUZ and DFN. Bulletins sent by side effect in SAVE ALLERGY.",
        "tags": [
            "DFN",
            "BULLETIN"
        ]
    },
    "ORWDAL32 SITE PARAMS": {
        "mn": "ORWDAL32",
        "catag": "READ",
        "descr": "Parameters inside 120.84 for the site ie/ domain setting for site (ie/ not for user but for domain). If VISTA consistent then these would go into PARAMETERs ie. not all site or user parameters go into PARAMETERs. In Allergy Sessions, called with no arguments",
        "tags": [
            "I/META"
        ]
    },
    "ORWDAL32 SYMPTOMS": {
        "mn": "ORWDAL32",
        "catag": "READ",
        "files": ["120.83"],
        "exArgs": "[1, 1]",
        "tags": [
            "K/META"
        ]
    },
    "ORWDBA1 BASTATUS": {
        "mn": "ORWDBA1",
        "catag": "READ",
        "descr": "Billing awareness RPC - checks 9.7 to see if 'PX CLINICAL INDICATOR DATA CAPTURE 1.0' installed and checks and even adds a parameter",
        "tags": [
            "PATCH",
            "S/META",
            "PARAMETER"
        ]
    },
    "ORWDBA1 GETORDX": {
        "catag": "READ",
        "descr": "Diagnosis for an Order",
        "tags": [
            "DFN"
        ]
    },
    "ORWDBA1 ORPKGTYP": {
        "mn": "ORWDBA1",
        "catag": "UTILITY",
        "descr": "Hard coded list of packages support billing (PSO etc). See if orders are from one of those",
        "tags": [
            "HARD CODED",
            "DFN",
            "FMUTILITY"
        ]
    },
    "ORWDBA1 RCVORCI": {
        "mn": "ORWDBA1",
        "catag": "CHANGE",
        "descr": "Receive Order Entry Billing Aware data from CPRS.",
        "tags": [
            "DFN"
        ]
    },
    "ORWDBA1 SCLST": {
        "mn": "ORWDBA1",
        "catag": "CHANGE",
        "descr": "For a list of Orders, will add treatment factors from Patient",
        "parameters": ["OR BILLING AWARENESS BY USER"],
        "files": ["100", "9.4"],
        "tags": [
            "DFN",
            "PARAMETER"
        ]
    },
    "ORWDBA2 ADDPDL": {
        "mn": "ORWDBA2",
        "catag": "CHANGE",
        "descr": "change provider's preferences (ICD etc) ie/ profile in 200/200.0351",
        "files": ["200"],
        "tags": [
            "DUZ"
        ]
    },
    "ORWDBA2 DELPDL": {
        "mn": "ORWDBA2",
        "catag": "CHANGE",
        "descr": "personal diag list in 200/200.0351 of User",
        "tags": [
            "DUZ"
        ]
    },
    "ORWDBA2 GETDUDC": {
        "catag": "UTILITY",
        "descr": "Diagnosis codes for Orders placed today",
        "tags": [
            "FMUTILITY",
            "DFN"
        ]
    },
    "ORWDBA2 GETPDL": {
        "catag": "READ",
        "descr": "personal diag list in 200/200.0351 of User",
        "tags": [
            "DUZ"
        ]
    },
    "ORWDBA3 HINTS": {
        "mn": "ORWDBA3",
        "catag": "READ",
        "descr": "Hints for treatment factors - 9.2 HELP Meta",
        "files": ["9.2"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDBA4 GETBAUSR": {
        "catag": "READ",
        "descr": "Simple DUZ-based parameter get",
        "parameters": ["OR BILLING AWARENESS BY USER"],
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORWDBA4 GETTFCI": {
        "catag": "READ",
        "descr": "Roll up of Order Treatment Factors",
        "complexity": "LOW",
        "tags": [
            "DFN"
        ]
    },
    "ORWDBA7 GETIEN9": {
        "catag": "READ",
        "descr": "IEN for an ICD9",
        "tags": [
            "IEN-LOOKUP",
            "K/META"
        ]
    },
    "ORWDBA7 ISWITCH": {
        "mn": "ORWDBA7",
        "catag": "READ",
        "descr": "[DUZ] has insurance?",
        "tags": [
            "DUZ"
        ]
    },
    "ORWDCN32 DEF": {
        "catag": "READ",
        "descr": "Should insurance questions be asked - sees if insurance in 2",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "ORWDCN32 NEWDLG": {
        "mn": "ORWDCN32",
        "catag": "READ",
        "descr": "Lookup particular 101.43",
        "parameters": ["ORWDX NEW PROCEDURE"],
        "files": ["101.41"],
        "tags": [
            "K/META",
            "PARAMETER"
        ]
    },
    "ORWDCN32 ORDRMSG": {
        "mn": "ORWDCN32",
        "catag": "READ",
        "descr": "order message for orderable Meta",
        "files": ["101.43"],
        "complexity": "LOW",
        "tags": [
            "K/META"
        ]
    },
    "ORWDCN32 PROCEDURES": {
        "mn": "ORWDCN32",
        "catag": "READ",
        "descr": "Returns a list of orderable procedures. Same as ORDITM^ORWDX except: 1. Checks inactive date in file 101.43 against NOW instead of DT.2. Checks for at least one service that can perform the procedure.3. Returns variable pointer to procedure in 4th piece of each item.",
        "files": ["101.43"],
        "tags": [
            "K/META",
            "QUERY"
        ]
    },
    "ORWDCSLT DEF": {
        "catag": "READ",
        "files": ["101.43", "101.42"],
        "descr": "See file ORWDCSLT.m",
        "tags": [
            "K/META",
            "HARD CODED"
        ]
    },
    "ORWDCSLT LOOK200": {
        "mn": "ORWDCSLT",
        "catag": "READ",
        "descr": "User in 200",
        "tags": [
            "DUZ"
        ]
    },
    "ORWDFH ADDLATE": {
        "mn": "ORWDFH",
        "catag": "CHANGE",
        "descr": "Diet order - Add late tray order",
        "tags": [
            "DFN"
        ]
    },
    "ORWDFH ATTR": {
        "mn": "ORWDFH",
        "catag": "READ",
        "descr": "for a diet order - repackages raw FM form of 101.43",
        "files": ["101.43"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDFH CURISO": {
        "mn": "ORWDFH",
        "catag": "READ",
        "descr": "Return info on patient's active isolation order if any",
        "tags": [
            "DFN"
        ]
    },
    "ORWDFH CURRENT MEALS": {
        "mn": "ORWDFH",
        "catag": "READ",
        "descr": "list of current meal orders",
        "tags": [
            "DFN"
        ]
    },
    "ORWDFH DIETS": {
        "mn": "ORWDFH",
        "catag": "READ",
        "descr": "Diets available",
        "exArgs": "[1, 1]",
        "tags": [
            "K/META"
        ]
    },
    "ORWDFH FINDTYP": {
        "mn": "ORWDFH",
        "catag": "READ",
        "descr": "Type of dietics order based on display group",
        "files": ["100.98"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDFH ISOIEN": {
        "mn": "ORWDFH",
        "catag": "READ",
        "descr": "101.43 'ISOLATION PROCEDURES' IEN",
        "files": ["101.43"],
        "tags": [
            "K/META",
            "IEN-LOOKUP"
        ]
    },
    "ORWDFH ISOLIST": {
        "catag": "READ",
        "descr": "Dietician reviews - user/patient",
        "files": ["119.4"],
        "tags": [
            "DFN"
        ]
    },
    "ORWDFH NFSLOC READY": {
        "catag": "READ",
        "descr": "OK to order OP Meals from this location",
        "tags": [
            "IS-A",
            "LOCATION",
            "S/META"
        ]
    },
    "ORWDFH OPDIETS": {
        "mn": "ORWDFH",
        "catag": "READ",
        "descr": "list of up to 5 outpatient diets from file 119.9 but seems to just use 101.43",
        "files": ["119.9"],
        "exArgs": "[1, 1]",
        "tags": [
            "K/META"
        ]
    },
    "ORWDFH PARAM": {
        "mn": "ORWDFH",
        "catag": "READ",
        "descr": "dietetics parameters for a patient at a location",
        "tags": [
            "DFN"
        ]
    },
    "ORWDFH QTY2CC": {
        "mn": "ORWDFH",
        "catag": "READ",
        "descr": "cc's given a product, strength, & quantity",
        "files": ["101.43"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDFH TFPROD": {
        "mn": "ORWDFH",
        "catag": "READ",
        "descr": "list of active tubefeeding products",
        "files": ["101.43"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDFH TXT": {
        "mn": "ORWDFH",
        "catag": "READ",
        "descr": "text of the current and any future diets for patients - specific index in 100 ... ie/ will need to analyze indexes",
        "tags": [
            "DFN"
        ]
    },
    "ORWDGX LOAD": {
        "catag": "READ",
        "descr": "Load a list of activity orders",
        "files": ["101.43"],
        "tags": [
            "K/META",
            "PARAMETER"
        ]
    },
    "ORWDGX VMDEF": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "ORWDLR ABBSPEC": {
        "mn": "ORWDLR",
        "catag": "READ",
        "descr": "? CHECK IF STRUCT"
    },
    "ORWDLR ALLSAMP": {
        "mn": "ORWDLR",
        "catag": "READ",
        "descr": "? CHECK IF STRUCT"
    },
    "ORWDLR DEF": {
        "catag": "READ",
        "descr": "get dialog definition specific to lab",
        "tags": [
            "K/META",
            "PARAMETER"
        ]
    },
    "ORWDLR LOAD": {
        "catag": "READ",
        "descr": "Return sample, specimen, & urgency info about a lab test",
        "files": ["101.43"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDLR OIPARAM": {
        "mn": "ORWDLR",
        "catag": "READ",
        "descr": "same as ORWDLR LOAD and no longer used",
        "tags": [
            "DEPRECATED",
            "OUT OF SCOPE"
        ]
    },
    "ORWDLR STOP": {
        "mn": "ORWDLR",
        "catag": "UTILITY",
        "descr": "Calculated stop date - CANDIDATE FOR VDM UTILITY",
        "tags": [
            "HARD CODED"
        ]
    },
    "ORWDLR32 ABBSPEC": {
        "mn": "ORWDLR32",
        "catag": "READ",
        "descr": "specimens with abbreviation (uses 'E' xref)",
        "files": ["61"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDLR32 ALLSAMP": {
        "mn": "ORWDLR32",
        "catag": "READ",
        "descr": "all collection samples",
        "files": ["62", "64.91"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDLR32 ALLSPEC": {
        "mn": "ORWDLR32",
        "catag": "READ",
        "descr": "a set of specimens from topography file",
        "tags": [
            "K/META"
        ]
    },
    "ORWDLR32 DEF": {
        "catag": "READ",
        "descr": "lab order dialog definition - like ORWDLR DEF",
        "tags": [
            "K/META",
            "PARAMETER"
        ]
    },
    "ORWDLR32 GET LAB TIMES": {
        "catag": "READ",
        "descr": "lab collect times for a date and location - LR parameters",
        "tags": [
            "PARAMETER",
            "S/META"
        ]
    },
    "ORWDLR32 IC DEFAULT": {
        "catag": "READ",
        "descr": "default immediate collect time for the user’s division. Uses LABORATORY SITE (69.9) which sets up lab for site.",
        "files": ["69.9"],
        "tags": [
            "DUZ",
            "LOCATION",
            "S/META"
        ]
    },
    "ORWDLR32 IC VALID": {
        "catag": "UTILITY",
        "descr": "Is the time a valid immediate collect time?",
        "files": ["69.9"],
        "tags": [
            "FMUTILITY",
            "IS-A"
        ]
    },
    "ORWDLR32 IMMED COLLECT": {
        "mn": "ORWDLR32",
        "catag": "READ",
        "descr": "help screen showing immediate collect times",
        "tags": [
            "DUZ",
            "UNSTRUCTURED READ",
            "LOCATION",
            "S/META"
        ]
    },
    "ORWDLR32 LAB COLL TIME": {
        "mn": "ORWDLR32",
        "catag": "UTILITY",
        "descr": "is this a routine lab collect time for this location?",
        "tags": [
            "PARAMETER",
            "IS-A"
        ]
    },
    "ORWDLR32 LOAD": {
        "catag": "READ",
        "descr": "sample, specimen, & urgency info about a lab test",
        "files": ["101.43"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDLR32 MAXDAYS": {
        "mn": "ORWDLR32",
        "catag": "UTILITY",
        "descr": "max number of days for a continuing order - location and schedule passed in, not Order itself",
        "tags": [
            "LOCATION",
            "PARAMETER"
        ]
    },
    "ORWDLR32 ONE SAMPLE": {
        "mn": "ORWDLR32",
        "catag": "READ",
        "descr": "data for one colelction sample",
        "files": ["62", "61"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDLR32 ONE SPECIMEN": {
        "mn": "ORWDLR32",
        "catag": "READ",
        "descr": "one specimen",
        "files": ["61"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDLR32 STOP": {
        "mn": "ORWDLR32",
        "catag": "UTILITY",
        "descr": "a calculated stop time",
        "tags": [
            "HARD CODED"
        ]
    },
    "ORWDLR33 FUTURE LAB COLLECTS": {
        "mn": "ORWDLR33",
        "catag": "READ",
        "descr": "number of days in the future to allow Lab Collects",
        "parameters": ["LR LAB COLLECT FUTURE"],
        "tags": [
            "PARAMETER",
            "LOCATION"
        ]
    },
    "ORWDLR33 LASTTIME": {
        "mn": "ORWDLR33",
        "catag": "UTILITY",
        "descr": "Goes into 101.41 but also read TMP(ORECALL) set earlier for 'last collection time used'",
        "tags": [
            "REENTRANCY"
        ]
    },
    "ORWDLR33 LC TO WC": {
        "mn": "ORWDLR33",
        "catag": "READ",
        "descr": "text instructing user when LC changed to WC on accept/release - path from DUZ(2) so location based",
        "parameters": ["ORWLR LC CHANGED TO WC"],
        "tags": [
            "PARAMETER",
            "DUZ",
            "LOCATION"
        ]
    },
    "ORWDOR LKSCRN": {
        "mn": "ORWDOR",
        "catag": "READ",
        "files": ["101.41"],
        "descr": "off XREF of 100",
        "tags": [
            "QUERY",
            "K/META"
        ]
    },
    "ORWDOR VALNUM": {
        "mn": "ORWDOR",
        "catag": "UTILITY",
        "descr": "Validate num form - CANDIDATE FOR VDM UTILITY",
        "tags": [
            "HARD CODED"
        ]
    },
    "ORWDOR VMSLCT": {
        "mn": "ORWDOR",
        "catag": "READ",
        "descr": "Default list for the vitals dialog",
        "files": ["101.43"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS1 CHK94": {
        "mn": "ORWDPS1",
        "catag": "UTILITY",
        "descr": "has a patch been installed. Crude check if index present",
        "files": ["101.41"],
        "tags": [
            "S/META",
            "PATCH"
        ]
    },
    "ORWDPS1 DFLTSPLY": {
        "mn": "ORWDPS1",
        "catag": "UTILITY",
        "descr": "off K - days supply given quantity for med",
        "files": ["101.43"],
        "complexity": "MEDIUM",
        "tags": [
            "K/META",
            "FMUTILITY"
        ]
    },
    "ORWDPS1 DOSEALT": {
        "mn": "ORWDPS1",
        "catag": "READ",
        "descr": "dose alternatives - all from 101.43 lookup (part of Pharmacy/Med prototype scope)",
        "files": ["101.43"],
        "complexity": "MEDIUM",
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS1 DOWSCH": {
        "mn": "ORWDPS1",
        "catag": "READ",
        "descr": "all schedules - though can't see DFN use quickly (revisit)",
        "tags": [
            "DFN"
        ]
    },
    "ORWDPS1 FAILDEA": {
        "mn": "ORWDPS1",
        "catag": "UTILITY",
        "descr": "combo of nature of 101.43 and the provider and has to be on the fly due to combos. Genuine",
        "tags": [
            "FMUTILITY",
            "IS-A",
            "DUZ"
        ]
    },
    "ORWDPS1 FORMALT": {
        "mn": "ORWDPS1",
        "catag": "READ",
        "descr": "101.43, formulary alternatives",
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS1 HASOIPI": {
        "mn": "ORWDPS1",
        "catag": "READ",
        "descr": "101.41 - put orderable into SIG (may be a parameter in other domains but per orderable here)",
        "files": ["101.41"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS1 HASROUTE": {
        "mn": "ORWDPS1",
        "catag": "READ",
        "descr": "101.41, routes",
        "files": ["101.41"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS1 IVDEA": {
        "mn": "ORWDPS1",
        "catag": "UTILITY",
        "descr": "'only be called for an outpaitent and IV dialog' - 101.43 and DUZ ie/ user's detox. COMPUTED - light combo of meta and user LOGIC",
        "tags": [
            "DUZ",
            "FMUTILITY"
        ]
    },
    "ORWDPS1 LOCPICK": {
        "mn": "ORWDPS1",
        "catag": "READ",
        "parameters": ["ORWDPS ROUTING DEFAULT"],
        "descr": "value is mapped but pure XPAR on 'ORWDPS ROUTING DEFAULT' per location (passed in) ie/ [LOCATION] preference for where pick up happens (Window or By Mail or In clinic) etc.",
        "tags": [
            "PARAMETER",
            "LOCATION"
        ]
    },
    "ORWDPS1 ODSLCT": {
        "mn": "ORWDPS1",
        "catag": "READ",
        "descr": "fixed values in code for DEFAULTs with a few variables check (location etc). This would go to pure JS or preferably a config meta defn. ie/ dialog defaults.",
        "files": ["101.42"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS1 QOMEDALT": {
        "mn": "ORWDPS1",
        "catag": "READ",
        "descr": "K/META per package 9.4 off 101.41, 101.43 ? on whether COMPUTED or plain get(s)",
        "files": ["101.41", "101.43", "9.4"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS1 SCHALL": {
        "mn": "ORWDPS1",
        "catag": "READ",
        "descr": "[DFN] all schedules [LOCATION]",
        "tags": [
            "DFN",
            "LOCATION"
        ]
    },
    "ORWDPS2 ADMIN": {
        "mn": "ORWDPS2",
        "catag": "READ",
        "descr": "[DFN] but 101.43 and [LOCATION] too",
        "tags": [
            "DFN",
            "LOCATION"
        ]
    },
    "ORWDPS2 CHKGRP": {
        "mn": "ORWDPS2",
        "catag": "READ",
        "descr": "[DFN] indirectly ie/ concrete order categorized [COMPUTED] ... legimate computed property",
        "tags": [
            "DFN",
            "COMPUTED"
        ]
    },
    "ORWDPS2 CHKPI": {
        "mn": "ORWDPS2",
        "catag": "READ",
        "descr": "[DFN] pre-existing patient instruction",
        "tags": [
            "DFN"
        ]
    },
    "ORWDPS2 DAY2QTY": {
        "mn": "ORWDPS2",
        "catag": "UTILITY",
        "descr": "pure JS candidate from input arguments",
        "tags": [
            "HARD CODED"
        ]
    },
    "ORWDPS2 MAXREF": {
        "mn": "ORWDPS2",
        "catag": "READ",
        "descr": "maximum # of refills",
        "tags": [
            "DFN"
        ]
    },
    "ORWDPS2 OISLCT": {
        "mn": "ORWDPS2",
        "catag": "READ",
        "descr": "defaults for 101.43 values. Should be in parameter/config file - K meta",
        "tags": [
            "HARD CODED",
            "K/META"
        ]
    },
    "ORWDPS2 QOGRP": {
        "mn": "ORWDPS2",
        "catag": "READ",
        "descr": "If quick order belong to Inpatient Med Order Group: return 1",
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS2 QTY2DAY": {
        "mn": "ORWDPS2",
        "catag": "UTILITY",
        "descr": "calculate quantity in days given arguments ie/ [COMPUTED]",
        "tags": [
            "DFN"
        ]
    },
    "ORWDPS2 REQST": {
        "mn": "ORWDPS2",
        "catag": "READ",
        "descr": "[DFN] calculated from [LOCATION] and 101.43 meta",
        "tags": [
            "DFN",
            "LOCATION"
        ]
    },
    "ORWDPS2 SCHREQ": {
        "mn": "ORWDPS2",
        "catag": "READ",
        "descr": "[K/META] - is schedule required [IS-A] for a combination of orderable item, route, specific drug",
        "tags": [
            "K/META",
            "IS-A"
        ]
    },
    "ORWDPS32 ALLIVRTE": {
        "mn": "ORWDPS32",
        "catag": "READ",
        "descr": "[K/META] Route 51.2",
        "files": ["51.2"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS32 ALLROUTE": {
        "mn": "ORWDPS32",
        "catag": "READ",
        "files": ["51.2"],
        "descr": "list of all available med routes",
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS32 AUTH": {
        "mn": "ORWDPS32",
        "catag": "READ",
        "descr": "Checks restrictions for entering inpatient meds. If no restrictions, a 0is returned. If there is a restriction, it is returned in the format: 1^restriction text",
        "parameters": ["OR OREMAS MED ORDERS"],
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWDPS32 AUTHNVA": {
        "mn": "ORWDPS32",
        "catag": "READ",
        "descr": "checks restrictions for entering non-VA meds. If no restrictions, a 0 isreturned. If there is a restriction, it is returned in the format:1^restriction text",
        "parameters": ["OR OREMAS NON-VA MED ORDERS"],
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWDPS32 DLGSLCT": {
        "mn": "ORWDPS32",
        "catag": "READ",
        "descr": "default lists for order dialogs in CPRS GUI.",
        "complexity": "HIGH",
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS32 DOSES": {
        "mn": "ORWDPS32",
        "catag": "READ",
        "descr": "Doses for an orderable",
        "files": ["101.43"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS32 DRUGMSG": {
        "mn": "ORWDPS32",
        "catag": "READ",
        "descr": "Local Drug definition 50",
        "files": ["50"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS32 FORMALT": {
        "mn": "ORWDPS32",
        "catag": "READ",
        "descr": "list of formulary alternatives",
        "files": ["101.43"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS32 ISSPLY": {
        "mn": "ORWDPS32",
        "catag": "READ",
        "files": ["101.43"],
        "descr": "is orderable item a supply?",
        "tags": [
            "K/META",
            "IS-A"
        ],
        "complexity": "LOW"
    },
    "ORWDPS32 IVAMT": {
        "mn": "ORWDPS32",
        "catag": "READ",
        "files": ["101.43"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS32 MEDISIV": {
        "mn": "ORWDPS32",
        "catag": "READ",
        "descr": "true if orderable item is IV medication",
        "complexity": "LOW",
        "files": ["101.43"],
        "tags": [
            "K/META",
            "IS-A"
        ]
    },
    "ORWDPS32 OISLCT": {
        "mn": "ORWDPS32",
        "catag": "READ",
        "descr": "defaults for pharm OI - list of options",
        "complexity": "MEDIUM",
        "files": ["101.43"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS32 SCSTS": {
        "mn": "ORWDPS32",
        "catag": "READ",
        "descr": "service connected eligibility for a patient - one path goes to billing API",
        "tags": [
            "DFN"
        ]
    },
    "ORWDPS32 VALQTY": {
        "mn": "ORWDPS32",
        "catag": "UTILITY",
        "descr": "Number range check - validate a medication quantity and return a 1 if it is valid, otherwisereturn 0. Calls into a routine which is billed as an input transform",
        "tags": [
            "HARD CODED",
            "IS-A"
        ]
    },
    "ORWDPS32 VALRATE": {
        "mn": "ORWDPS32",
        "catag": "UTILITY",
        "descr": "1 (true) if IV rate text is valid",
        "tags": [
            "HARD CODED",
            "IS-A"
        ]
    },
    "ORWDPS32 VALROUTE": {
        "mn": "ORWDPS32",
        "catag": "UTILITY",
        "descr": "validates route name & returns IEN + abbreviation",
        "files": ["51.2"],
        "complexity": "MEDIUM",
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS32 VALSCH": {
        "mn": "ORWDPS32",
        "catag": "UTILITY",
        "descr": "validate a schedule, return 1 if valid, 0 if not",
        "tags": [
            "IS-A",
            "HARD CODED"
        ]
    },
    "ORWDPS33 COMPLOC": {
        "mn": "ORWDPS33",
        "catag": "READ",
        "descr": "[IS-A] [DFN] as about an order and its [LOCATION]",
        "tags": [
            "IS-A",
            "DFN",
            "LOCATION"
        ]
    },
    "ORWDPS33 GETADDFR": {
        "catag": "READ",
        "descr": "takes an Additive Orderable ITEM IEN and it returns the defaultadditive frequency defined to the additive file.",
        "tags": [
            "K/META"
        ]
    },
    "ORWDPS33 IVDOSFRM": {
        "mn": "ORWDPS33",
        "catag": "READ",
        "descr": "NEEDs WORK: going through elements in an Order (according to comments)",
        "tags": [
            "DFN"
        ]
    },
    "ORWDPS4 CPINFO": {
        "mn": "ORWDPS4",
        "catag": "CHANGE",
        "descr": "Save reponses to CP questions",
        "tags": [
            "DFN"
        ]
    },
    "ORWDPS4 CPLST": {
        "mn": "ORWDPS4",
        "catag": "READ",
        "descr": "get 'copay' questions DFN on 100",
        "tags": [
            "DFN"
        ]
    },
    "ORWDPS4 IPOD4OP": {
        "mn": "ORWDPS4",
        "catag": "READ",
        "descr": "is an Inpt (IV OI) order on an OutPatient",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "ORWDPS4 ISUDIV": {
        "mn": "ORWDPS4",
        "catag": "READ",
        "descr": "OI of the order is for both UD and IV",
        "complexity": "LOW",
        "tags": [
            "IS-A",
            "DFN"
        ]
    },
    "ORWDPS4 UPDTDG": {
        "mn": "ORWDPS4",
        "catag": "CHANGE",
        "descr": "Update Inpt order for outpatient DG to Inpt DG",
        "complexity": "LOW",
        "tags": [
            "DFN"
        ]
    },
    "ORWDPS5 ISVTP": {
        "mn": "ORWDPS5",
        "catag": "READ",
        "descr": "is verbalTelephonedOrPolicy ie/ should be an enum, added in RPC",
        "tags": [
            "DFN",
            "IS-A",
            "COMPUTED"
        ]
    },
    "ORWDPS5 LESAPI": {
        "mn": "ORWDPS5",
        "catag": "READ",
        "descr": "Call LES Api (LES Api not in OSEHRA) from inside CPRS for validating changed lab order",
        "tags": [
            "DFN",
            "OUT OF SCOPE",
            "NOT OSEHRA"
        ]
    },
    "ORWDPS5 LESGRP": {
        "mn": "ORWDPS5",
        "catag": "READ",
        "descr": "Return all of the orders' display groups LES checked - hard coded list keys off 100.98 DISPLAY GROUP. In prep for LES Api call. LES Api is not in OSEHRA",
        "tags": [
            "HARD CODED",
            "K/META"
        ]
    },
    "ORWDRA DEF": {
        "catag": "READ",
        "descr": "Get Dialog Data for Radiology - like others for other Orderable types, takes arguments for different data ('modifiers', 'urgencies' etc)",
        "complexity": "MEDIUM",
        "files": ["101.42", "101.43"],
        "tags": [
            "HARD CODED",
            "K/META"
        ]
    },
    "ORWDRA32 APPROVAL": {
        "mn": "ORWDRA32",
        "catag": "READ",
        "descr": "[DUZ] radiologists who can approve a procedure ie/ [QUERY]",
        "tags": [
            "DUZ",
            "QUERY"
        ]
    },
    "ORWDRA32 DEF": {
        "catag": "READ",
        "descr": "Argument decides which of the (hard coded) meta data you want to see",
        "tags": [
            "K/META",
            "HARD CODED"
        ]
    },
    "ORWDRA32 IMTYPSEL": {
        "mn": "ORWDRA32",
        "catag": "READ",
        "descr": "List of active imaging types - 79.2 but keys off a check to 101.43 of $D(^ORD(101.43,\"S.\"_ORX)) which seems to be id's of imaging types that can be ordered.",
        "files": ["101.42", "79.3"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDRA32 ISOLATN": {
        "mn": "ORWDRA32",
        "catag": "READ",
        "descr": "is a patient on isolation procedures? [COMPUTED]",
        "tags": [
            "DFN",
            "IS-A",
            "COMPUTED"
        ]
    },
    "ORWDRA32 LOCTYPE": {
        "mn": "ORWDRA32",
        "catag": "READ",
        "descr": "location type - easy one field read",
        "complexity": "LOW",
        "tags": [
            "LOCATION"
        ]
    },
    "ORWDRA32 PROCMSG": {
        "mn": "ORWDRA32",
        "catag": "READ",
        "descr": "order message for procedure 101.43 but none in nodeVISTA (bound(8))",
        "complexity": "LOW",
        "tags": [
            "K/META"
        ]
    },
    "ORWDRA32 RADSRC": {
        "mn": "ORWDRA32",
        "catag": "READ",
        "descr": "contract agreements of type SHARING or CONTRACT file 34. empty in nodeVISTA. Referenced by rad/med orders",
        "files": ["34"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDRA32 RAORDITM": {
        "mn": "ORWDRA32",
        "catag": "READ",
        "descr": "subset of orderable imaging types",
        "tags": [
            "K/META"
        ]
    },
    "ORWDX AGAIN": {
        "mn": "ORWDX",
        "domain": "ORDER",
        "catag": "READ",
        "complexity": "LOW",
        "descr": "Property of 101.41 dictates whether this dialog leads to another",
        "tags": [
            "K/META",
            "IS-A"
        ]
    },
    "ORWDX CHANGE": {
        "mn": "ORWDX",
        "catag": "CHANGE",
        "complexity": "MEDIUM",
        "descr": "First Parameter is list of Order IENs separated by semicolons; DFN is next; boolean for IMO order or not. Boolean true means check for quick order dialog; false means add treating specialist if INPATIENT. In CPRS description, use to change location if ward is selected",
        "tags": [
            "DFN"
        ]
    },
    "ORWDX DGNM": {
        "mn": "ORWDX",
        "catag": "READ",
        "complexity": "LOW",
        "descr": "100.98 display group by name",
        "tags": [
            "K/META",
            "IEN-LOOKUP"
        ]
    },
    "ORWDX DGRP": {
        "mn": "ORWDX",
        "catag": "READ",
        "complexity": "LOW",
        "descr": "Like DGNM except allowed to pass tick mark and IEN of 100.48 too",
        "tags": [
            "K/META",
            "IEN-LOOKUP"
        ]
    },
    "ORWDX DISMSG": {
        "mn": "ORWDX",
        "catag": "READ",
        "complexity": "LOW",
        "descr": "Return 'disabled message' for 101.41 dialog if available (none in nodeVISTA)",
        "tags": [
            "K/META"
        ]
    },
    "ORWDX DLGDEF": {
        "catag": "READ",
        "complexity": "LOW",
        "descr": "Name of 101.41 will return a dialog definition",
        "tags": [
            "K/META"
        ]
    },
    "ORWDX DLGID": {
        "mn": "ORWDX",
        "catag": "READ",
        "descr": "Get IEN of Dialog of Order",
        "complexity": "LOW",
        "tags": [
            "DFN"
        ]
    },
    "ORWDX DLGQUIK": {
        "mn": "ORWDX",
        "catag": "READ",
        "descr": "Pass in either X + IEN of Order or IEN of cached quick order or IEN of orderable (101.43) and get responses for an orderable. Normally never mix DFN and K/META but here K/META comes indirectly from 100 if that is used instead of orderable reference directly",
        "tags": [
            "DFN",
            "K/META"
        ]
    },
    "ORWDX FORMID": {
        "mn": "ORWDX",
        "catag": "READ",
        "descr": "Pass IEN of Order and get form id of the base dialog of the order. Only means something to Delphi. Another example of 100 Id leading into K/META when should have started in K/META id",
        "tags": [
            "DFN",
            "K/META"
        ]
    },
    "ORWDX LOADRSP": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "ORWDX LOCK": {
        "catag": "UTILITY",
        "descr": "Locks at patient level - this type of locks is stored in ^XTMP('ORPTLK-'_DFN,1). Used for Allergies as well as Orders",
        "tags": [
            "LOCK"
        ]
    },
    "ORWDX LOCK ORDER": {
        "catag": "UTILITY",
        "descr": "Lock at Order level (as opposed to plain LOCK which locks at patient level)",
        "tags": [
            "LOCK"
        ]
    },
    "ORWDX MSG": {
        "mn": "ORWDX",
        "catag": "READ",
        "descr": "Message text of 101.43 orderable",
        "tags": [
            "K/META"
        ]
    },
    "ORWDX ORDITM": {
        "mn": "ORWDX",
        "catag": "READ",
        "descr": "subset of orderable items - starting value for looping index, direction, index name",
        "tags": [
            "K/META",
            "QUERY"
        ]
    },
    "ORWDX SAVE": {
        "catag": "CHANGE",
        "descr": "Create an Order",
        "tags": [
            "DFN"
        ]
    },
    "ORWDX SEND": {
        "mn": "ORWDX",
        "catag": "CHANGE",
        "descr": "Sign a list of orders with DFN, DUZ, encrypted code etc",
        "tags": [
            "DFN"
        ]
    },
    "ORWDX SENDED": {
        "mn": "ORWDX",
        "catag": "CHANGE",
        "tags": [
            "DFN"
        ]
    },
    "ORWDX SENDP": {
        "mn": "ORWDX",
        "catag": "CHANGE",
        "descr": "Ala ORWDX SEND but print devices specified - can't see in nodeVISTA",
        "tags": [
            "DFN",
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWDX UNLKOTH": {
        "mn": "ORWDX",
        "catag": "UTILITY",
        "descr": "^XTMP('ORPTLK-'_DFN)'",
        "tags": [
            "LOCK",
            "DFN"
        ]
    },
    "ORWDX UNLOCK": {
        "catag": "UTILITY",
        "descr": "^XTMP('ORPTLK-'_DFN) - patient unlock if lock 'owned' by current process",
        "tags": [
            "LOCK"
        ]
    },
    "ORWDX UNLOCK ORDER": {
        "catag": "UTILITY",
        "descr": "^XTMP('ORLK-'_ORDER,0)",
        "tags": [
            "LOCK"
        ]
    },
    "ORWDX WRLST": {
        "mn": "ORWDX",
        "catag": "READ",
        "descr": "list of dialogs for writing orders. One optional argument is LOCATION.",
        "tags": [
            "K/META",
            "LOCATION"
        ]
    },
    "ORWDX1 DCORIG": {
        "mn": "ORWDX1",
        "catag": "CHANGE",
        "descr": "Discontinues an Order",
        "tags": [
            "DFN"
        ]
    },
    "ORWDX1 DCREN": {
        "mn": "ORWDX1",
        "catag": "CHANGE",
        "descr": "Pass in array of 100s; original orders returned",
        "tags": [
            "DFN"
        ]
    },
    "ORWDX1 ORDMATCH": {
        "mn": "ORWDX1",
        "catag": "UTILITY",
        "descr": "list of order and assumed status - returns false for mismatched values ie/ a remote",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "ORWDX1 PATWARD": {
        "mn": "ORWDX1",
        "catag": "READ",
        "descr": "patient ward",
        "tags": [
            "DFN"
        ]
    },
    "ORWDX1 STCHANGE": {
        "mn": "ORWDX1",
        "catag": "UTILITY",
        "complexity": "MEDIUM",
        "descr": "Order/Status combinations to check",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "ORWDX1 UNDCORIG": {
        "mn": "ORWDX1",
        "catag": "CHANGE",
        "complexity": "LOW",
        "descr": "List of Orders and set original order value to null - bug in implementation as returns nothing",
        "tags": [
            "DFN",
            "OUT OF SCOPE",
            "BUG"
        ]
    },
    "ORWDX2 DCREASON": {
        "mn": "ORWDX2",
        "catag": "READ",
        "complexity": "LOW",
        "descr": "List of valid discontinuation reasons from 100.03.",
        "tags": [
            "K/META",
            "QUERY"
        ]
    },
    "ORWDXA ALERT": {
        "mn": "ORWDXA",
        "catag": "CHANGE",
        "complexity": "LOW",
        "descr": "set order to send alert when resulted ie/ sets field in 100",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXA COMPLETE": {
        "mn": "ORWDXA",
        "catag": "CHANGE",
        "complexity": "MEDIUM",
        "descr": "Complete an order",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXA DC": {
        "mn": "ORWDXA",
        "catag": "CHANGE",
        "complexity": "HIGH",
        "descr": "discontinue, cancel, or delete an existing order.",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXA DCREQIEN": {
        "mn": "ORWDXA",
        "catag": "READ",
        "complexity": "LOW",
        "descr": "IEN for Requesting Physician Cancelled reason 100.03",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXA FLAG": {
        "mn": "ORWDXA",
        "catag": "CHANGE",
        "descr": "flag an order",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXA FLAGTXT": {
        "mn": "ORWDXA",
        "catag": "READ",
        "descr": "text of flag on order",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXA HOLD": {
        "mn": "ORWDXA",
        "catag": "CHANGE",
        "descr": "hold an order - adds action (100.008)",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXA ISACTOI": {
        "mn": "ORWDXA",
        "catag": "READ",
        "complexity": "LOW",
        "files": ["101.43"],
        "descr": "is order item 101.43 active?",
        "tags": [
            "K/META",
            "IS-A"
        ]
    },
    "ORWDXA OFCPLX": {
        "mn": "ORWDXA",
        "catag": "READ",
        "descr": "is order a parent?",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "ORWDXA UNFLAG": {
        "mn": "ORWDXA",
        "catag": "CHANGE",
        "descr": "Unflag an existing order. Involves IEN of sub record?",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXA UNHOLD": {
        "mn": "ORWDXA",
        "catag": "CHANGE",
        "descr": "Unhold",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXA VALID": {
        "catag": "UTILITY",
        "descr": "is action valid for Order",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "ORWDXA VERIFY": {
        "mn": "ORWDXA",
        "catag": "CHANGE",
        "descr": "Verify an order",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXA WCGET": {
        "catag": "READ",
        "descr": "matches WCPUT - returns WARD COMMENTs for an Order",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXA WCPUT": {
        "mn": "ORWDXA",
        "catag": "CHANGE",
        "descr": "Set ward comments for an order.",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXC ACCEPT": {
        "mn": "ORWDXC",
        "catag": "UTILITY",
        "descr": "order checks - calculations from data, not straight FM data. Variation of DISPLAY for accepted orders.",
        "tags": [
            "DFN",
            "REENTRANCY",
            "PARAMETER"
        ]
    },
    "ORWDXC DELAY": {
        "mn": "ORWDXC",
        "catag": "UTILITY",
        "descr": "order checks - calculations from data, not straight FM data. Variation of DISPLAY for delayed orders.",
        "tags": [
            "DFN",
            "REENTRANCY",
            "PARAMETER"
        ]
    },
    "ORWDXC DELORD": {
        "mn": "ORWDXC",
        "catag": "CHANGE",
        "descr": "Deletes Order in some circumstances? (hence catag of CHANGE). Part of TMP using Order checks. Delete order checks. Effects 100.05 which caches checks",
        "tags": [
            "DFN",
            "REENTRANCY"
        ]
    },
    "ORWDXC DISPLAY": {
        "mn": "ORWDXC",
        "catag": "UTILITY",
        "descr": "order checks - calculations from data, not straight FM data. Different for Pharmacy and Lab and uses XTMP to log if PARAMETER set",
        "tags": [
            "DFN",
            "REENTRANCY",
            "PARAMETER"
        ]
    },
    "ORWDXC FILLID": {
        "mn": "ORWDXC",
        "catag": "READ",
        "descr": "Filler ID (namespace) for a dialog. 101.41/100.98 - part of Order Checks",
        "files": ["101.41", "100.98"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDXC ON": {
        "mn": "ORWDXC",
        "catag": "READ",
        "descr": "ORK SYSTEM ENABLE/DISABLE ie/ if order checking on",
        "tags": [
            "PARAMETER",
            "IS-A"
        ]
    },
    "ORWDXC SAVECHK": {
        "catag": "UTILITY",
        "descr": "Moves Order Checks in ORMONOGRAPH over to 100.05. Calling a UTILITY as part of a set of TMP using RPCs as opposed to straight data being sent and FM being updated",
        "tags": [
            "DFN",
            "REENTRANCY"
        ]
    },
    "ORWDXC SESSION": {
        "mn": "ORWDXC",
        "catag": "UTILITY",
        "descr": "Return list of Order Checks on Release Order - calls SESSION^ORCHECK which checks ORK SYSTEM ENABLE/DISABLE and sets up ORMONOGRAPH from 100.05",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXM AUTOACK": {
        "mn": "ORWDXM",
        "catag": "CHANGE",
        "descr": "Place a quick order (101.41 must have default dialog field and few in nodeVISTA) in CPRS GUI without the verify step.",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXM DLGNAME": {
        "mn": "ORWDXM",
        "catag": "READ",
        "descr": "name(s) of dialog & base dialog given IEN",
        "tags": [
            "K/META",
            "IEN-LOOKUP"
        ]
    },
    "ORWDXM FORMID": {
        "mn": "ORWDXM",
        "catag": "READ",
        "descr": "the FormID for a dialog 101.41",
        "files": ["101.41"],
        "tags": [
            "K/META"
        ]
    },
    "ORWDXM LOADSET": {
        "catag": "READ",
        "descr": "Contents of an Order Set 101.41",
        "tags": [
            "K/META"
        ]
    },
    "ORWDXM MENU": {
        "mn": "ORWDXM",
        "catag": "READ",
        "descr": "menu contents for an order dialog",
        "tags": [
            "K/META"
        ]
    },
    "ORWDXM MSTYLE": {
        "mn": "ORWDXM",
        "catag": "READ",
        "descr": "the menu style for the system PARAMETER at system level",
        "tags": [
            "PARAMETER",
            "S/META"
        ]
    },
    "ORWDXM PROMPTS": {
        "mn": "ORWDXM",
        "catag": "READ",
        "descr": "101.41 ... record summary",
        "tags": [
            "K/META"
        ]
    },
    "ORWDXM1 BLDQRSP": {
        "mn": "ORWDXM1",
        "catag": "UTILITY",
        "descr": "Build responses for an order - formal input nicely defined",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXM1 SVRPC": {
        "mn": "ORWDXM1",
        "catag": "READ",
        "descr": "PARAMETER 'OR RA RFS CARRY ON' - should 'study' continue?",
        "tags": [
            "PARAMETER",
            "DUZ",
            "IS-A"
        ]
    },
    "ORWDXM2 CLRRCL": {
        "mn": "ORWDXM2",
        "catag": "UTILITY",
        "descr": "clears a TMP ORECALL - so part of a transaction sequence"
    },
    "ORWDXM3 ISUDQO": {
        "mn": "ORWDXM3",
        "catag": "READ",
        "descr": "is this a unit dose quick order ie/ set of &'s. COMPUTED or could have a set of classifications that are calculated",
        "tags": [
            "IS-A",
            "K/META"
        ]
    },
    "ORWDXQ DLGNAME": {
        "mn": "ORWDXQ",
        "catag": "READ",
        "descr": "101.41 name",
        "tags": [
            "K/META"
        ]
    },
    "ORWDXQ DLGSAVE": {
        "catag": "CHANGE",
        "descr": "One of few change K/META's - makes QUICK ORDER from ORDERABLE",
        "tags": [
            "K/META"
        ]
    },
    "ORWDXQ GETQLST": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "ORWDXQ GETQNAM": {
        "catag": "READ",
        "descr": "More Quick order stuff",
        "tags": [
            "K/META"
        ]
    },
    "ORWDXQ PUTQLST": {
        "mn": "ORWDXQ",
        "catag": "CHANGE",
        "descr": "Save quick order list - per DUZ too?",
        "tags": [
            "K/META"
        ]
    },
    "ORWDXQ PUTQNAM": {
        "mn": "ORWDXQ",
        "catag": "CHANGE",
        "descr": "Save display name for quick order dialog. RPC just has Q - does nothing",
        "tags": [
            "K/META",
            "HARD CODED"
        ]
    },
    "ORWDXR CANRN": {
        "mn": "ORWDXR",
        "catag": "UTILITY",
        "descr": "DFN IS-A can you renew? Could be COMPUTED?",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "ORWDXR GETPKG": {
        "catag": "READ",
        "descr": "(prefix of) Package 9.4 to which Order is related (should really be on Orderable?)",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXR GTORITM": {
        "mn": "ORWDXR",
        "catag": "READ",
        "complexity": "LOW",
        "descr": "return orderable item",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXR ISCPLX": {
        "mn": "ORWDXR",
        "catag": "READ",
        "descr": "DFN - is it complex? IS-A COMPUTED",
        "tags": [
            "DFN",
            "IS-A",
            "COMPUTED"
        ]
    },
    "ORWDXR ISNOW": {
        "mn": "ORWDXR",
        "catag": "READ",
        "descr": "DFN - is first time for Order, NOW?",
        "tags": [
            "DFN",
            "IS-A",
            "COMPUTED"
        ]
    },
    "ORWDXR ISREL": {
        "mn": "ORWDXR",
        "catag": "READ",
        "descr": "has 100 been released?",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "ORWDXR ORCPLX": {
        "mn": "ORWDXR",
        "catag": "READ",
        "descr": "children orders of a complex order",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXR RENEW": {
        "mn": "ORWDXR",
        "catag": "CHANGE",
        "descr": "Renew an existing order.",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXR RNWFLDS": {
        "mn": "ORWDXR",
        "catag": "READ",
        "descr": "return fields for the renew action",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXR01 CANCHG": {
        "mn": "ORWDXR01",
        "catag": "READ",
        "descr": "can edit?",
        "tags": [
            "DFN",
            "IS-A",
            "COMPUTED"
        ]
    },
    "ORWDXR01 ISSPLY": {
        "mn": "ORWDXR01",
        "catag": "READ",
        "descr": "is PLO SUPPLY DIALOG?",
        "tags": [
            "IS-A",
            "K/META"
        ]
    },
    "ORWDXR01 OXDATA": {
        "mn": "ORWDXR01",
        "catag": "READ",
        "descr": "order check usage",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXR01 SAVCHG": {
        "catag": "CHANGE",
        "descr": "Save refills",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXVB COMPORD": {
        "mn": "ORWDXVB",
        "catag": "READ",
        "descr": "Get sequence order of Blood Components for selection. Returns 101.43 in sequence and 101.43 walk summarizes these components",
        "files": ["101.43"],
        "tags": [
            "K/META",
            "PARAMETER"
        ]
    },
    "ORWDXVB GETALL": {
        "catag": "READ",
        "descr": "Patient's blood bank activity",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXVB NURSADMN": {
        "mn": "ORWDXVB",
        "catag": "READ",
        "descr": "This procedure checks the parameter OR VBECS SUPPRESS NURS ADMIN to seeif the Nursing Administration Order prompt/pop-up should be supressedafter a VBECS Blood Bank order has been created.",
        "parameters": ["OR VBECS SUPPRESS NURS ADMIN"],
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWDXVB RAW": {
        "mn": "ORWDXVB",
        "catag": "READ",
        "descr": "Return raw Lab Test Results associated with Blood Bank order - pass in test 60s too",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXVB RESULTS": {
        "mn": "ORWDXVB",
        "catag": "READ",
        "descr": "Return patient's Lab Test Results associated with Blood Bank order",
        "tags": [
            "DFN"
        ]
    },
    "ORWDXVB STATALOW": {
        "mn": "ORWDXVB",
        "catag": "READ",
        "descr": "Check to see if user is allowed to order STAT orders through VBECS.Checks users with parameter: OR VBECS STAT USER ie/ USER PROFILE",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWDXVB SUBCHK": {
        "mn": "ORWDXVB",
        "catag": "READ",
        "descr": "Check to see if selected test is a Blood Component or a Diagnostic Test. 101.43",
        "tags": [
            "K/META",
            "COMPUTED"
        ]
    },
    "ORWDXVB VBTNS": {
        "mn": "ORWDXVB",
        "catag": "READ",
        "descr": "days back to check 'ORWDXVB VBECS TNS CHECK'",
        "parameters": ["ORWDXVB VBECS TNS CHECK"],
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWDXVB3 COLLTIM": {
        "mn": "ORWDXVB3",
        "catag": "READ",
        "descr": "This RPC checks the value of the parameter OR VBECS REMOVE COLL TIMEto determine if a default collection time should be presented on theVBECS order dialog.",
        "parameters": ["OR VBECS REMOVE COLL TIME"],
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWDXVB3 DIAGORD": {
        "mn": "ORWDXVB3",
        "catag": "READ",
        "descr": "Get sequence order of Diagnostic Tests for selection. List kept in PRAMETER and walks 101.43 for Diagnostic tests. Like 'ORWDXVB COMPORD'",
        "tags": [
            "PARAMETER",
            "K/META"
        ]
    },
    "ORWDXVB3 SWPANEL": {
        "mn": "ORWDXVB3",
        "catag": "READ",
        "descr": "This RPC checks the value of the parameter OR VBECS DIAGNOSTIC PANEL 1STto determine the location of the Diagnostic and Component panels on theVBECS order dialog.",
        "parameters": ["OR VBECS DIAGNOSTIC PANEL 1ST"],
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWGEPT CLINRNG": {
        "mn": "ORWGEPT",
        "catag": "READ",
        "tags": [
            "OUT OF SCOPE",
            "NOT OSEHRA"
        ]
    },
    "ORWGN AUTHUSR": {
        "mn": "ORWGN",
        "catag": "READ",
        "descr": "can a user access group notes ie/ USER PREFERENCE",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORWGN GNLOC": {
        "mn": "ORWGN",
        "catag": "READ",
        "descr": "is valid GN location",
        "parameters": ["OR GN LOCATIONS"],
        "tags": [
            "PARAMETER",
            "IS-A"
        ]
    },
    "ORWGN IDTVALID": {
        "mn": "ORWGN",
        "catag": "READ",
        "descr": "Returns Implementation date of the ICD code set",
        "tags": [
            "K/META"
        ]
    },
    "ORWGN MAXFRQ": {
        "mn": "ORWGN",
        "catag": "READ",
        "descr": "Lexicon - checks if the frequency of an ICD-10 search term is than the maximum allowed ICD-10 return values. (strange in group note utils)",
        "tags": [
            "K/META"
        ]
    },
    "ORWGRPC ALLITEMS": {
        "mn": "ORWGRPC",
        "catag": "READ",
        "descr": "patient summary - all items",
        "tags": [
            "DFN"
        ]
    },
    "ORWGRPC ALLVIEWS": {
        "mn": "ORWGRPC",
        "catag": "READ",
        "descr": "all views of user - USER PREFERENCE",
        "tags": [
            "DUZ"
        ]
    },
    "ORWGRPC CLASS": {
        "mn": "ORWGRPC",
        "catag": "READ",
        "descr": "classifications from 50.605 etc",
        "tags": [
            "K/META"
        ]
    },
    "ORWGRPC DATEITEM": {
        "mn": "ORWGRPC",
        "catag": "READ",
        "descr": "patient items in date range",
        "tags": [
            "DFN"
        ]
    },
    "ORWGRPC DELVIEWS": {
        "mn": "ORWGRPC",
        "catag": "CHANGE",
        "descr": "delete view",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWGRPC DETAIL": {
        "catag": "READ",
        "descr": "get all reports for types of data",
        "tags": [
            "DFN"
        ]
    },
    "ORWGRPC DETAILS": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWGRPC FASTDATA": {
        "mn": "ORWGRPC",
        "catag": "READ",
        "descr": "[DFN] all non graph data on patient",
        "tags": [
            "DFN"
        ]
    },
    "ORWGRPC FASTITEM": {
        "mn": "ORWGRPC",
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWGRPC FASTLABS": {
        "mn": "ORWGRPC",
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWGRPC FASTTASK": {
        "mn": "ORWGRPC",
        "catag": "UTILITY",
        "descr": "setup items - task XTMP et al",
        "tags": [
            "DFN",
            "REENTRANCY",
            "TASK"
        ]
    },
    "ORWGRPC GETDATES": {
        "catag": "UTILITY",
        "files": ["101.24"],
        "parameters": ["ORWRP TIME/OCC LIMITS INDV"],
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWGRPC GETPREF": {
        "catag": "UTILITY",
        "tags": [
            "PARAMETER",
            "FMUTILITY"
        ]
    },
    "ORWGRPC GETSIZE": {
        "catag": "UTILITY",
        "tags": [
            "FMUTILITY",
            "PARAMETER"
        ]
    },
    "ORWGRPC GETVIEWS": {
        "catag": "UTILITY",
        "tags": [
            "FMUTILITY",
            "PARAMETER"
        ]
    },
    "ORWGRPC ITEMDATA": {
        "mn": "ORWGRPC",
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWGRPC ITEMS": {
        "mn": "ORWGRPC",
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWGRPC LOOKUP": {
        "mn": "ORWGRPC",
        "catag": "READ",
        "descr": "item names for long lookup",
        "tags": [
            "DFN"
        ]
    },
    "ORWGRPC PUBLIC": {
        "mn": "ORWGRPC",
        "catag": "READ",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWGRPC RPTPARAM": {
        "mn": "ORWGRPC",
        "catag": "READ",
        "descr": "OE/RR REPORT",
        "files": ["101.24"],
        "tags": [
            "K/META"
        ]
    },
    "ORWGRPC SETPREF": {
        "catag": "CHANGE",
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWGRPC SETSIZE": {
        "catag": "CHANGE",
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWGRPC SETVIEWS": {
        "catag": "CHANGE",
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWGRPC TAX": {
        "mn": "ORWGRPC",
        "catag": "READ",
        "descr": "reminder taxonomies",
        "tags": [
            "K/META"
        ]
    },
    "ORWGRPC TESTING": {
        "mn": "ORWGRPC",
        "catag": "UTILITY"
    },
    "ORWGRPC TESTSPEC": {
        "mn": "ORWGRPC",
        "catag": "READ",
        "descr": "Test spec data for lab tests",
        "tags": [
            "K/META"
        ]
    },
    "ORWGRPC TYPES": {
        "mn": "ORWGRPC",
        "catag": "READ",
        "descr": "all types of data on a patient",
        "tags": [
            "DFN"
        ]
    },
    "ORWLEX GETFREQ": {
        "catag": "UTILITY",
        "tags": [
            "HARD CODED"
        ]
    },
    "ORWLEX GETI10DX": {
        "catag": "UTILITY",
        "tags": [
            "FMUTILITY"
        ]
    },
    "ORWLR CUMULATIVE REPORT": {
        "mn": "ORWLR",
        "catag": "UTILITY",
        "descr": "This call returns an up to date laboratory cumulative report for a given patient.",
        "tags": [
            "DFN"
        ]
    },
    "ORWLR CUMULATIVE SECTION": {
        "mn": "ORWLR",
        "catag": "READ",
        "descr": "This rpc retrieves the part of the lab cumulative report selected by the user on the Labs tab.",
        "tags": [
            "DFN"
        ]
    },
    "ORWLR REPORT LISTS": {
        "catag": "UTILITY",
        "tags": [
            "FMUTILITY"
        ]
    },
    "ORWLRR ALLTESTS": {
        "mn": "ORWLRR",
        "catag": "READ",
        "files": ["60"],
        "descr": "lab results",
        "tags": [
            "K/META"
        ]
    },
    "ORWLRR ATESTS": {
        "mn": "ORWLRR",
        "catag": "READ",
        "descr": "lab",
        "files": ["60"],
        "tags": [
            "K/META"
        ]
    },
    "ORWLRR ATG": {
        "mn": "ORWLRR",
        "catag": "READ",
        "descr": "[DUZ] lab",
        "files": ["60", "69.2", "68"],
        "tags": [
            "DUZ",
            "K/META"
        ]
    },
    "ORWLRR ATOMICS": {
        "mn": "ORWLRR",
        "catag": "READ",
        "descr": "lab",
        "files": ["60"],
        "tags": [
            "K/META"
        ]
    },
    "ORWLRR CHART": {
        "mn": "ORWLRR",
        "catag": "READ",
        "descr": "lab",
        "tags": [
            "DFN"
        ]
    },
    "ORWLRR CHEMTEST": {
        "mn": "ORWLRR",
        "catag": "READ",
        "descr": "lab",
        "files": ["60"],
        "exArgs": "[1, 1]",
        "tags": [
            "K/META"
        ]
    },
    "ORWLRR GRID": {
        "mn": "ORWLRR",
        "catag": "READ",
        "descr": "lab",
        "tags": [
            "DFN"
        ]
    },
    "ORWLRR INFO": {
        "catag": "READ",
        "files": ["60"],
        "tags": [
            "K/META"
        ]
    },
    "ORWLRR INTERIM": {
        "mn": "ORWLRR",
        "catag": "READ",
        "descr": "Interim Report [DFN]",
        "tags": [
            "DFN"
        ]
    },
    "ORWLRR INTERIMG": {
        "mn": "ORWLRR",
        "catag": "READ",
        "descr": "lab [DFN]",
        "tags": [
            "DFN"
        ]
    },
    "ORWLRR INTERIMS": {
        "mn": "ORWLRR",
        "catag": "READ",
        "descr": "lab [DFN]",
        "tags": [
            "DFN"
        ]
    },
    "ORWLRR MICRO": {
        "mn": "ORWLRR",
        "catag": "READ",
        "descr": "lab [DFN]",
        "tags": [
            "DFN"
        ]
    },
    "ORWLRR NEWOLD": {
        "mn": "ORWLRR",
        "catag": "READ",
        "descr": "lab [DFN]",
        "tags": [
            "DFN"
        ]
    },
    "ORWLRR PARAM": {
        "mn": "ORWLRR",
        "catag": "READ",
        "descr": "lab site setup file",
        "files": ["69.9"],
        "tags": [
            "S/META"
        ]
    },
    "ORWLRR SPEC": {
        "mn": "ORWLRR",
        "catag": "READ",
        "files": ["61"],
        "tags": [
            "K/META"
        ]
    },
    "ORWLRR TG": {
        "mn": "ORWLRR",
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWLRR USERS": {
        "mn": "ORWLRR",
        "catag": "READ",
        "descr": "lab",
        "files": ["68"],
        "tags": [
            "QUERY",
            "DUZ"
        ]
    },
    "ORWLRR UTGA": {
        "mn": "ORWLRR",
        "catag": "READ",
        "tags": [
            "QUERY",
            "DUZ"
        ]
    },
    "ORWLRR UTGD": {
        "mn": "ORWLRR",
        "catag": "READ",
        "descr": "lab",
        "tags": [
            "QUERY",
            "DUZ"
        ]
    },
    "ORWLRR UTGR": {
        "mn": "ORWLRR",
        "catag": "READ",
        "descr": "lab",
        "tags": [
            "QUERY",
            "DUZ"
        ]
    },
    "ORWMC PATIENT PROCEDURES": {
        "mn": "ORWMC",
        "catag": "READ",
        "descr": "returns a list of patient procedures for a specific patient.",
        "tags": [
            "DFN"
        ]
    },
    "ORWMC PATIENT PROCEDURES1": {
        "mn": "ORWMC",
        "catag": "READ",
        "descr": "This remote procedure call returns a list of patient procedures for a specific patient.",
        "tags": [
            "DFN"
        ]
    },
    "ORWMHV MHV": {
        "mn": "ORWMHV",
        "catag": "UTILITY",
        "descr": "return if patient has MyHeatheVet (remote) data",
        "tags": [
            "OUT OF SCOPE"
        ]
    },
    "ORWNSS CHKSCH": {
        "mn": "ORWNSS",
        "catag": "UTILITY",
        "descr": "schedule validator",
        "tags": [
            "HARD CODED"
        ]
    },
    "ORWNSS NSSMSG": {
        "mn": "ORWNSS",
        "catag": "READ",
        "descr": "DUZ to Service for parameter lookup",
        "complexity": "LOW",
        "parameters": ["ORWIM NSS MESSAGE"],
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORWNSS QOSCH": {
        "mn": "ORWNSS",
        "catag": "READ",
        "descr": "101.41 [K/META]",
        "tags": [
            "K/META"
        ]
    },
    "ORWNSS VALSCH": {
        "mn": "ORWNSS",
        "catag": "READ",
        "descr": "Validate a schedule for IM order",
        "tags": [
            "IS-A",
            "DFN"
        ]
    },
    "ORWOR ACTION TEXT": {
        "mn": "ORWOR",
        "catag": "READ",
        "descr": "Return detail action information",
        "tags": [
            "DFN"
        ]
    },
    "ORWOR EXPIRED": {
        "mn": "ORWOR",
        "catag": "UTILITY",
        "parameters": ["ORWOR EXPIRED ORDERS"],
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWOR PKISITE": {
        "mn": "ORWOR",
        "catag": "READ",
        "descr": "100.7 SITE PARAMETER not in parameter by [LOCATION] as accesses site set global",
        "tags": [
            "LOCATION"
        ]
    },
    "ORWOR PKIUSE": {
        "mn": "ORWOR",
        "catag": "READ",
        "descr": "user can use PKI Digital Signature?",
        "tags": [
            "DUZ"
        ]
    },
    "ORWOR RESULT": {
        "mn": "ORWOR",
        "catag": "READ",
        "descr": "Results of order identified by ID",
        "tags": [
            "DFN"
        ]
    },
    "ORWOR RESULT HISTORY": {
        "mn": "ORWOR",
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWOR SHEETS": {
        "mn": "ORWOR",
        "catag": "READ",
        "descr": "order sheets for a patient",
        "tags": [
            "DFN"
        ]
    },
    "ORWOR TSALL": {
        "mn": "ORWOR",
        "catag": "READ",
        "descr": "treating specialities straight return",
        "files": ["45.7"],
        "tags": [
            "K/META"
        ]
    },
    "ORWOR UNSIGN": {
        "mn": "ORWOR",
        "catag": "READ",
        "descr": "return unsigned orders",
        "tags": [
            "DFN"
        ]
    },
    "ORWOR VWGET": {
        "catag": "READ",
        "descr": "Get preferred view for orders",
        "parameters": ["ORCH CONTEXT ORDERS"],
        "tags": [
            "PARAMETERS",
            "K/META"
        ]
    },
    "ORWOR VWSET": {
        "catag": "CHANGE",
        "descr": "Set preferred view for orders",
        "parameters": ["ORCH CONTEXT ORDERS"],
        "tags": [
            "PARAMETERS",
            "K/META"
        ]
    },
    "ORWOR1 CHKDIG": {
        "mn": "ORWOR1",
        "catag": "READ",
        "descr": "is digital sig required",
        "tags": [
            "DFN"
        ]
    },
    "ORWOR1 GETDEA": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWOR1 GETDSCH": {
        "catag": "READ",
        "complexity": "LOW",
        "descr": "Check if order is drug schedule",
        "tags": [
            "DFN"
        ]
    },
    "ORWOR1 GETDSIG": {
        "catag": "READ",
        "complexity": "LOW",
        "descr": "Get digital signature from order",
        "tags": [
            "DFN"
        ]
    },
    "ORWOR1 GETDTEXT": {
        "catag": "READ",
        "complexity": "LOW",
        "descr": "Get text from order",
        "tags": [
            "DFN"
        ]
    },
    "ORWOR1 SETDTEXT": {
        "mn": "ORWOR1",
        "catag": "CHANGE",
        "tags": [
            "DFN"
        ]
    },
    "ORWOR1 SIG": {
        "mn": "ORWOR1",
        "catag": "CHANGE",
        "descr": "store the sig - in 101.52 but in XTMP too",
        "tags": [
            "DFN",
            "REENTRANCY"
        ]
    },
    "ORWORB AUTOUNFLAG ORDERS": {
        "mn": "ORWORB",
        "catag": "CHANGE",
        "descr": "Auto unflag orders/delete alert.",
        "tags": [
            "DFN"
        ]
    },
    "ORWORB FASTUSER": {
        "mn": "ORWORB",
        "catag": "READ",
        "descr": "'notifications for current user', across all patients (note: need to get into notifications)",
        "tags": [
            "DFN"
        ]
    },
    "ORWORB GET TIU ALERT INFO": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWORB GETDATA": {
        "catag": "READ",
        "files": ["8992"],
        "descr": "XQADATA for an alert",
        "tags": [
            "DFN"
        ]
    },
    "ORWORB GETSORT": {
        "mn": "ORWORB",
        "catag": "READ",
        "descr": "'method for sorting gui display' - PARAMETER !",
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWORB KILL EXPIR MED ALERT": {
        "mn": "ORWORB",
        "catag": "CHANGE",
        "descr": "100.9 Evaluate expiring med orders.  If none remain, kill current alert forcurrent user.  Kill for other users if alert so defined.",
        "tags": [
            "DFN"
        ]
    },
    "ORWORB KILL EXPIR OI ALERT": {
        "mn": "ORWORB",
        "catag": "CHANGE",
        "descr": "Evaluate expiring flagged orderable item orders. If none remain, killcurrent alert for current user.  Kill for other users if alert so defined.",
        "tags": [
            "DFN"
        ]
    },
    "ORWORB KILL UNSIG ORDERS ALERT": {
        "mn": "ORWORB",
        "catag": "CHANGE",
        "descr": "Check patient's unsigned orders, and kill unsigned orders alert for thisuser if no unsigned orders remain for his/her signature.",
        "tags": [
            "DFN"
        ]
    },
    "ORWORB KILL UNVER MEDS ALERT": {
        "mn": "ORWORB",
        "catag": "CHANGE",
        "descr": "Delete UNVERIFIED MEDS notification if none remaining within current admission/30 days",
        "tags": [
            "DFN"
        ]
    },
    "ORWORB KILL UNVER ORDERS ALERT": {
        "mn": "ORWORB",
        "catag": "CHANGE",
        "descr": "Delete UNVERIFIED ORDER notification if none remaining within current admission/30 days",
        "tags": [
            "DFN"
        ]
    },
    "ORWORB SETSORT": {
        "mn": "ORWORB",
        "catag": "CHANGE",
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWORB TEXT FOLLOWUP": {
        "mn": "ORWORB",
        "catag": "READ",
        "descr": "Returns text for notifications/alerts with a simple text message follow-upaction."
    },
    "ORWORB UNSIG ORDERS FOLLOWUP": {
        "mn": "ORWORB",
        "catag": "CHANGE",
        "descr": "After viewing unsigned orders for a patient via an alert, evaluateswhether the alert should be deleted for the current user. The following two exception conditions exist when determining how alertdeletion will occur.  In all other cases, alert deletion will occur whenthe patient has no unsigned orders. 1)      If the recipient of this alert does NOT have the ORES key, thealert will be deleted for that recipient after he reviews the unsignedorders.  2)      If the recipient has the ORES key and is NOT linked to the patientas attending, inpatient primary provider or via OE/RR teams, his alertwill be deleted when his unsigned orders are signed.  (If unsigned orderswritten by other providers for the patient remain, alerts for these other providers will not be deleted.)  For example, a consulting surgeon (withORES) places three unsigned orders for a patient.  He then receives an \"Order requires electronic signature\" alert for the patient.  He uses the View Alerts follow-up action and is presented with ten unsigned orders forthe patient.  Only three of the ten orders are his.  The surgeon signs histhree unsigned orders.  If the surgeon is not linked to the patient asattending, inpatient primary providers or via OE/RR teams, the alert will be deleted (for him only.)   In most cases alert deletion will occur when the patient has no unsignedorders.  For example, if a recipient has the ORES key and is linked to thepatient as attending, inpatient primary provider or via OE/RR teams, allunsigned orders for the patient must be signed before his alert isdeleted.",
        "tags": [
            "DFN"
        ]
    },
    "ORWORDG ALLTREE": {
        "mn": "ORWORDG",
        "catag": "READ",
        "files": ["100.98"],
        "tags": [
            "K/META"
        ]
    },
    "ORWORDG GRPSEQB": {
        "mn": "ORWORDG",
        "catag": "READ",
        "files": ["100.98"],
        "parameters": ["ORWOR CATEGORY SEQUENCE"],
        "tags": [
            "K/META",
            "PARAMETER"
        ]
    },
    "ORWORDG IEN": {
        "mn": "ORWORDG",
        "catag": "READ",
        "descr": "lookup 100.98 by name",
        "tags": [
            "K/META",
            "IEN-LOOKUP"
        ]
    },
    "ORWORDG MAPSEQ": {
        "mn": "ORWORDG",
        "catag": "READ",
        "descr": "DISPLAY GROUP GROUPED",
        "files": ["100.98"],
        "tags": [
            "K/META",
            "PARAMETER"
        ]
    },
    "ORWORDG REVSTS": {
        "mn": "ORWORDG",
        "catag": "READ",
        "descr": "Return the status flags available for review orders",
        "tags": [
            "K/META"
        ]
    },
    "ORWORR AGET": {
        "catag": "READ",
        "descr": "Get abbrev. event delayed order list for patient",
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "ORWORR GET": {
        "catag": "READ",
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "ORWORR GET4LST": {
        "catag": "UTILITY",
        "descr": "Get order fields for a list of orders",
        "tags": [
            "DFN",
            "FMUTILITY"
        ]
    },
    "ORWORR GETBYIFN": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWORR GETTXT": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWORR RGET": {
        "catag": "READ",
        "descr": "Orders of AutoDC/Release Event",
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "ORWPCE ACTIVE CODE": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "is code active at a particular date - ICD/CPT etc",
        "tags": [
            "K/META"
        ]
    },
    "ORWPCE ACTIVE PROV": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "Provider active for PCE for a visit date ie/ not a particular visit?",
        "tags": [
            "DUZ",
            "IS-A"
        ]
    },
    "ORWPCE ACTPROB": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "Build list of active problems for patient.",
        "tags": [
            "DFN"
        ]
    },
    "ORWPCE ALWAYS CHECKOUT": {
        "mn": "ORWPCE",
        "catag": "READ",
        "parameters": ["ORWPCE DISABLE AUTO CHECKOUT"],
        "descr": "DUZ for service for lookup",
        "tags": [
            "PARAMETER",
            "IS-A",
            "DUZ"
        ]
    },
    "ORWPCE ANYTIME": {
        "mn": "ORWPCE",
        "catag": "READ",
        "parameters": ["ORWPCE ANYTIME ENCOUNTERS"],
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWPCE ASKPCE": {
        "mn": "ORWPCE",
        "catag": "READ",
        "parameters": ["ORWPCE ASK ENCOUNTER UPDATE"],
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWPCE AUTO VISIT TYPE SELECT": {
        "catag": "READ",
        "tags": [
            "DUZ",
            "PARAMETER",
            "IS-A"
        ]
    },
    "ORWPCE CPTMODS": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "modifiers for CPT",
        "tags": [
            "K/META"
        ]
    },
    "ORWPCE CPTREQD": {
        "mn": "ORWPCE",
        "catag": "READ",
        "tags": [
            "IS-A",
            "DFN"
        ]
    },
    "ORWPCE CXNOSHOW": {
        "mn": "ORWPCE",
        "catag": "READ",
        "tags": [
            "IS-A",
            "DFN"
        ]
    },
    "ORWPCE DELETE": {
        "catag": "CHANGE",
        "descr": "Delete PCE information related to a note being deleted.",
        "tags": [
            "DFN"
        ]
    },
    "ORWPCE DIAG": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "get list of diagnoses for clinic",
        "tags": [
            "K/META",
            "LOCATION",
            "HARD CODED"
        ]
    },
    "ORWPCE FORCE": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "Retrieve FORCE GUI PCE Entry for a given User/Location",
        "tags": [
            "DUZ",
            "LOCATION",
            "PARAMETER"
        ]
    },
    "ORWPCE GAFOK": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "patch - true if all supporting MH GAF Code exists",
        "tags": [
            "IS-A",
            "PATCH"
        ]
    },
    "ORWPCE GAFURL": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "returns MH url which is in YTAPI5.m",
        "tags": [
            "HARD CODED",
            "S/META"
        ]
    },
    "ORWPCE GET DX TEXT": {
        "catag": "UTILITY",
        "tags": [
            "K/META",
            "FMUTILITY"
        ]
    },
    "ORWPCE GET EDUCATION TOPICS": {
        "catag": "READ",
        "tags": [
            "QUERY",
            "K/META"
        ]
    },
    "ORWPCE GET EXAM TYPE": {
        "catag": "READ",
        "tags": [
            "QUERY",
            "K/META"
        ]
    },
    "ORWPCE GET EXCLUDED": {
        "catag": "READ",
        "descr": "List of excluded PCE entries - for user, kept in PARAMETER",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORWPCE GET HEALTH FACTORS TY": {
        "catag": "READ",
        "tags": [
            "QUERY",
            "K/META"
        ]
    },
    "ORWPCE GET IMMUNIZATION TYPE": {
        "catag": "READ",
        "descr": "Active immunizations",
        "tags": [
            "QUERY",
            "K/META"
        ]
    },
    "ORWPCE GET SET OF CODES": {
        "catag": "READ",
        "tags": [
            "QUERY",
            "K/META"
        ]
    },
    "ORWPCE GET SKIN TEST TYPE": {
        "catag": "READ",
        "descr": "Active entries in 9999999.28",
        "tags": [
            "QUERY",
            "K/META"
        ]
    },
    "ORWPCE GET TREATMENT TYPE": {
        "catag": "READ",
        "descr": "TREATMENT (9999999_17) listing",
        "tags": [
            "QUERY",
            "K/META"
        ]
    },
    "ORWPCE GET VISIT": {
        "catag": "READ",
        "tags": [
            "DFN",
            "IEN-LOOKUP"
        ]
    },
    "ORWPCE GETMOD": {
        "catag": "READ",
        "descr": "Info for a specified modifier",
        "tags": [
            "K/META"
        ]
    },
    "ORWPCE GETSVC": {
        "catag": "UTILITY",
        "descr": "Right service connected category",
        "tags": [
            "LOCATION"
        ]
    },
    "ORWPCE HASCPT": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "type maps to CPT through 811_1 (leverages meta)",
        "tags": [
            "K/META"
        ]
    },
    "ORWPCE HASVISIT": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "doc has visit",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "ORWPCE HF": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "Part of set like IMM ... list of health factors for clinic",
        "tags": [
            "LOCATION",
            "K/META"
        ]
    },
    "ORWPCE HNCOK": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "true if Head and/or Neck Cancer is enabled ... PATCH checker",
        "tags": [
            "IS-A",
            "PATCH",
            "S/META"
        ]
    },
    "ORWPCE I10IMPDT": {
        "mn": "ORWPCE",
        "catag": "READ",
        "tags": [
            "HARD CODED",
            "S/META"
        ]
    },
    "ORWPCE ICDVER": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "System config - ICD code version 9 or 10",
        "tags": [
            "HARD CODED",
            "S/META"
        ]
    },
    "ORWPCE IMM": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "list of immunizations for clinic - calls into 357.6 PACKAGE INTERFACE, 357.2 SELECTION LIST etc. Not Parameter as would seem to fit",
        "tags": [
            "K/META",
            "LOCATION"
        ]
    },
    "ORWPCE ISCLINIC": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "is it a clinic?",
        "tags": [
            "LOCATION",
            "IS-A"
        ]
    },
    "ORWPCE LEX": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "lexicon",
        "tags": [
            "K/META"
        ]
    },
    "ORWPCE LEXCODE": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "lexicon",
        "tags": [
            "K/META"
        ]
    },
    "ORWPCE LOADGAF": {
        "catag": "READ",
        "descr": "GAF score Patient",
        "tags": [
            "DFN",
            "REDACTED",
            "OUT OF SCOPE"
        ]
    },
    "ORWPCE MH TEST AUTHORIZED": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "Indicates if a given mental health test can be given by the given user.",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWPCE MHCLINIC": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "if mental health clinic",
        "tags": [
            "LOCATION",
            "IS-A"
        ]
    },
    "ORWPCE MHTESTOK": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "mental health APIs active and user allowed",
        "tags": [
            "DUZ",
            "PARAMETER",
            "IS-A"
        ]
    },
    "ORWPCE NOTEVSTR": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "visit - author for note",
        "tags": [
            "DFN"
        ]
    },
    "ORWPCE PCE4NOTE": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "encounter for note",
        "tags": [
            "DFN"
        ]
    },
    "ORWPCE PED": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "list of education topics for a clinic",
        "tags": [
            "LOCATION",
            "K/META"
        ]
    },
    "ORWPCE PROC": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "list of procedures for a clinic",
        "tags": [
            "LOCATION",
            "K/META"
        ]
    },
    "ORWPCE SAVE": {
        "catag": "CHANGE",
        "descr": "Save PCE info from CPRS to PCE with visit string passed in",
        "tags": [
            "DFN"
        ]
    },
    "ORWPCE SAVEGAF": {
        "catag": "CHANGE",
        "descr": "Save new GAF score - mental health but redacted in OSEHRA",
        "tags": [
            "DFN",
            "REDACTED",
            "OUT OF SCOPE"
        ]
    },
    "ORWPCE SCDIS": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "service connected and rated disabilities",
        "tags": [
            "DFN"
        ]
    },
    "ORWPCE SCSEL": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "sc conditions that may be selected for patient",
        "tags": [
            "DFN"
        ]
    },
    "ORWPCE SK": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "skin tests for a clinic",
        "tags": [
            "LOCATION",
            "K/META"
        ]
    },
    "ORWPCE TRT": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "treatment types for a clinic",
        "tags": [
            "LOCATION",
            "K/META"
        ]
    },
    "ORWPCE VISIT": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "visit types for a clinic",
        "tags": [
            "LOCATION",
            "K/META"
        ]
    },
    "ORWPCE XAM": {
        "mn": "ORWPCE",
        "catag": "READ",
        "descr": "exams for a clinic",
        "tags": [
            "LOCATION",
            "K/META"
        ]
    },
    "ORWPCE1 NONCOUNT": {
        "mn": "ORWPCE1",
        "catag": "READ",
        "descr": "Is a given HOSPITAL LOCATION (file 44) a non-count clinic?  (DBIA #964) [LOCATION]",
        "tags": [
            "LOCATION",
            "IS-A"
        ]
    },
    "ORWPCE4 LEX": {
        "mn": "ORWPCE4",
        "catag": "READ",
        "tags": [
            "QUERY",
            "K/META"
        ]
    },
    "ORWPFSS IS PFSS ACTIVE?": {
        "mn": "ORWPFSS",
        "catag": "READ",
        "descr": "should you pass visit string with order - PATCH check and others",
        "tags": [
            "IS-A",
            "PATCH",
            "S/META"
        ]
    },
    "ORWPS ACTIVE": {
        "mn": "ORWPS",
        "catag": "READ",
        "descr": "listing of a patient’s active inpatient and outpatientmedications.",
        "tags": [
            "DFN"
        ]
    },
    "ORWPS COVER": {
        "mn": "ORWPS",
        "catag": "READ",
        "descr": "list of medications to display on the CPRS GUI cover sheet for apatient.",
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "ORWPS DETAIL": {
        "catag": "READ",
        "descr": "Med Order Detail",
        "tags": [
            "DFN"
        ]
    },
    "ORWPS MEDHIST": {
        "mn": "ORWPS",
        "catag": "READ",
        "descr": "Show admin history for a med - uses Orders (100)",
        "tags": [
            "DFN"
        ]
    },
    "ORWPS REASON": {
        "mn": "ORWPS",
        "catag": "READ",
        "descr": "non va med reasons - reasons/meta stored in PARAMETER. Could have been K/META file. ex/ \"1^Non-VA medication not recommended by VA provider.\"",
        "tags": [
            "PARAMETER",
            "K/META"
        ]
    },
    "ORWPS1 NEWDLG": {
        "mn": "ORWPS1",
        "catag": "READ",
        "descr": "Return order dialog info for New Medication, in or outpatient - D NEWDLG^ORWPS1(.X,0) works - 101_41-147 to PSO OERR",
        "tags": [
            "PARAMETER",
            "K/META"
        ]
    },
    "ORWPS1 PICKUP": {
        "mn": "ORWPS1",
        "catag": "READ",
        "descr": "file 550 CMOP Setup/Config (disabled in nodeVISTA - out of scope?) - simple two value setting",
        "tags": [
            "S/META"
        ]
    },
    "ORWPS1 REFILL": {
        "mn": "ORWPS1",
        "catag": "CHANGE",
        "descr": "RPC to submit a request for a refill.",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT ADMITLST": {
        "mn": "ORWPT",
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT APPTLST": {
        "mn": "ORWPT",
        "catag": "READ",
        "descr": "date ranges for clinic appointments",
        "tags": [
            "DFN",
            "LOCATION"
        ]
    },
    "ORWPT BYWARD": {
        "mn": "ORWPT",
        "catag": "READ",
        "descr": "list of patients in a ward (file 42)",
        "tags": [
            "DFN",
            "LOCATION"
        ]
    },
    "ORWPT CLINRNG": {
        "mn": "ORWPT",
        "catag": "READ",
        "descr": "date ranges for clinic appointments",
        "tags": [
            "K/META",
            "HARD CODED",
            "LOCATION"
        ]
    },
    "ORWPT CWAD": {
        "mn": "ORWPT",
        "catag": "READ",
        "descr": "CWAD flags for patient - relies on TIU and its indexes (hence A shows). Put into Doc Issue.",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT DFLTSRC": {
        "mn": "ORWPT",
        "catag": "READ",
        "parameters": ["ORLP DEFAULT LIST SOURCE"],
        "descr": "Users default patient list source - parameter 'ORLP DEFAULT LIST SOURCE' used",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORWPT DIEDON": {
        "mn": "ORWPT",
        "catag": "READ",
        "descr": "Date of death if expired.",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT DISCHARGE": {
        "mn": "ORWPT",
        "catag": "READ",
        "descr": "given a patient and an admission date, return the discharge date/time.",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT ENCTITL": {
        "mn": "ORWPT",
        "catag": "READ",
        "descr": "Values to display for encounter (LOCNAME^LOCABBR^ROOMBED^PROVNAME)",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT FULLSSN": {
        "mn": "ORWPT",
        "catag": "READ",
        "descr": "SSN in the format 999999999(P), return a list of matchingpatients.",
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "ORWPT FULLSSN RPL": {
        "mn": "ORWPT",
        "catag": "READ",
        "descr": "an SSN in the format 999999999(P), return a list of matching patients based on Restricted Patient List. From Users 101.21 and OE/RR LIST",
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "ORWPT ID INFO": {
        "catag": "READ",
        "descr": "identifying information for a patient - series of values from Patient (2)",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT INPLOC": {
        "mn": "ORWPT",
        "catag": "READ",
        "descr": "Patient location keys off .102, patient movement in PATIENT (2)",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT LAST5": {
        "mn": "ORWPT",
        "catag": "READ",
        "descr": "list of patients by matching A9999 identifiers",
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "ORWPT LAST5 RPL": {
        "mn": "ORWPT",
        "descr": "Takes DUZ and returns list from User record either its fixed 101.02 patient selection list OR from its OE/RR LIST (100_21) list",
        "catag": "READ",
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "ORWPT LEGACY": {
        "mn": "ORWPT",
        "catag": "UTILITY",
        "descr": "Remote access: checks legacy systems (out of VDP scope)",
        "tags": [
            "DFN",
            "REMOTE",
            "OUT OF SCOPE"
        ]
    },
    "ORWPT LIST ALL": {
        "catag": "READ",
        "descr": "Return a bolus of patient names.  From is either Name or IEN^Name.",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT PTINQ": {
        "mn": "ORWPT",
        "catag": "READ",
        "descr": "Returns formatted patient inquiry text for display in GUI environment.",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT SAVDFLT": {
        "catag": "CHANGE",
        "descr": "Save new default patient list - sets a series of PARAMETERs",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWPT SELCHK": {
        "mn": "ORWPT",
        "catag": "CHANGE",
        "descr": "sensitive patient check - 38.1 has entry per sensitive patient and access logs are recorded/created here too. This RPC sees is sensitive set for the patient.",
        "keys": [
            "DFN"
        ]
    },
    "ORWPT SELECT": {
        "mn": "ORWPT",
        "catag": "CHANGE",
        "descr": "Returns info from PATIENT(2), if patient sensitive then logs in 38.1 and sends bulletin and also sets DISV which is picked up in TOP (and returns demographic data but set is key)",
        "tags": [
            "DFN",
            "REENTRANCY",
            "BULLETIN"
        ]
    },
    "ORWPT SHARE": {
        "mn": "ORWPT",
        "catag": "UTILITY",
        "descr": "\"SET GLOBAL 'ORWCHART' to share patient with other apps! ie/ key tmp",
        "tags": [
            "DFN",
            "REENTRANCY"
        ]
    },
    "ORWPT TOP": {
        "mn": "ORWPT",
        "catag": "READ",
        "descr": "'last selected patient' => profile? stored in GLOBAL DISV! (implicltly per user). ORWPT SELECT sets",
        "tags": [
            "DFN",
            "REENTRANCY"
        ]
    },
    "ORWPT1 PCDETAIL": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT1 PRCARE": {
        "mn": "ORWPT1",
        "catag": "READ",
        "descr": "Primary care info",
        "tags": [
            "DFN",
            "JLV"
        ]
    },
    "ORWPT16 ADMITLST": {
        "mn": "ORWPT16",
        "catag": "READ",
        "descr": "Return a list of admissions per patient (relies on 42 and 405 - see ADMITLST^ORWPT)",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT16 APPTLST": {
        "mn": "ORWPT16",
        "catag": "READ",
        "descr": "Return list of appointments per patient. Done in VISIT prototype as goes there.",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT16 DEMOG": {
        "mn": "ORWPT16",
        "catag": "READ",
        "descr": "Return common patient demographic info - nice and easy - straight out of DPT(2)/PATIENT. See DEMOG^ORWPT16",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT16 GETVSIT": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT16 ID INFO": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT16 LIST ALL": {
        "catag": "READ",
        "descr": "Bolus of patient names",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT16 LOOKUP": {
        "mn": "ORWPT16",
        "catag": "READ",
        "descr": "Return a set of patient names - uses FM API on PATIENT (2) - should be easy to lock. LOOKUP^ORWPT16",
        "tags": [
            "DFN"
        ]
    },
    "ORWPT16 PSCNVT": {
        "mn": "ORWPT16",
        "catag": "READ",
        "descr": "seems to do nothing S VAL=0",
        "tags": [
            "DFN",
            "OUT OF SCOPE"
        ]
    },
    "ORWRA DEFAULT EXAM SETTINGS": {
        "catag": "READ",
        "parameters": ["ORCH CONTEXT REPORTS"],
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWRA IMAGING EXAMS": {
        "mn": "ORWRA",
        "catag": "READ",
        "descr": "This remote procedure call returns a list on imaging exams for aspecific patient.",
        "tags": [
            "DFN"
        ]
    },
    "ORWRA IMAGING EXAMS1": {
        "mn": "ORWRA",
        "catag": "READ",
        "descr": "This remote procedure call returns a list on imaging exams for aspecific patient.",
        "tags": [
            "DFN"
        ]
    },
    "ORWRA PRINT REPORT": {
        "catag": "UTILITY",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWRA REPORT TEXT": {
        "mn": "ORWRA",
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWRA REPORT TEXT1": {
        "mn": "ORWRA",
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWRP COLUMN HEADERS": {
        "mn": "ORWRP",
        "catag": "READ",
        "descr": "Get list of Column headers for a ListView type report from file 101.24.",
        "tags": [
            "K/META"
        ]
    },
    "ORWRP GET DEFAULT PRINTER": {
        "mn": "ORWRP",
        "catag": "UTILITY",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWRP LAB REPORT LISTS": {
        "catag": "READ",
        "parameters": ["ORWRP REPORT LAB LIST"],
        "files": ["101.24"],
        "tags": [
            "PARAMETER",
            "K/META"
        ]
    },
    "ORWRP PRINT LAB REMOTE": {
        "catag": "UTILITY",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWRP PRINT LAB REPORTS": {
        "catag": "UTILITY",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWRP PRINT REMOTE REPORT": {
        "catag": "UTILITY",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWRP PRINT REPORT": {
        "catag": "UTILITY",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWRP PRINT V REPORT": {
        "catag": "UTILITY",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWRP PRINT WINDOWS LAB REMOTE": {
        "catag": "UTILITY",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWRP PRINT WINDOWS REMOTE": {
        "catag": "UTILITY",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWRP PRINT WINDOWS REPORT": {
        "catag": "UTILITY",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWRP REPORT LISTS": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "ORWRP REPORT TEXT": {
        "mn": "ORWRP",
        "catag": "READ",
        "descr": "This rpc retrieves the report text for a report selected onthe Report tab.the report format on the roll n scroll version of CPRS.",
        "tags": [
            "DFN"
        ]
    },
    "ORWRP SAVE DEFAULT PRINTER": {
        "catag": "CHANGE",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWRP WINPRINT DEFAULT": {
        "catag": "UTILITY",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWRP WINPRINT LAB REPORTS": {
        "catag": "UTILITY",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWRP1 LISTNUTR": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWRP16 REPORT LISTS": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "ORWRP16 REPORT TEXT": {
        "mn": "ORWRP16",
        "catag": "READ",
        "descr": "VITALS CUMMULATE/ HEALTH SUMMARY etc as options",
        "tags": [
            "K/META"
        ]
    },
    "ORWRP2 COMPABV": {
        "mn": "ORWRP2",
        "catag": "READ",
        "descr": "[K/META] This RPC returns an array of the ADHOC Health Summary components by abbreviation. 142 Health Summary Type - a hard coded 'GMTS HS ADHOC OPTION' id for health summary which gathers others.",
        "tags": [
            "K/META"
        ]
    },
    "ORWRP2 COMPDISP": {
        "mn": "ORWRP2",
        "catag": "READ",
        "descr": "[K/META] This RPC returns an array of the ADHOC Health Summary components by display name. Ala COMPABV, different form",
        "tags": [
            "K/META"
        ]
    },
    "ORWRP2 GETLKUP": {
        "mn": "ORWRP2",
        "catag": "READ",
        "parameters": ["ORWRP ADHOC LOOKUP"],
        "descr": "not per user 'ORWRP ADHOC LOOKUP' global",
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWRP2 HS COMP FILES": {
        "mn": "ORWRP2",
        "catag": "READ",
        "descr": "This RPC gets a list of files to select from for the ADHOC Health Summary. 142.5",
        "files": ["142.5"],
        "tags": [
            "K/META"
        ]
    },
    "ORWRP2 HS COMPONENT SUBS": {
        "mn": "ORWRP2",
        "catag": "READ",
        "descr": "This RPC returns an array of ADHOC Health Summary subcomponents. Particular subcomponent",
        "tags": [
            "K/META"
        ]
    },
    "ORWRP2 HS COMPONENTS": {
        "mn": "ORWRP2",
        "catag": "READ",
        "descr": "This RPC returns an array of the ADHOC Health Summary components.",
        "tags": [
            "K/META"
        ]
    },
    "ORWRP2 HS FILE LOOKUP": {
        "mn": "ORWRP2",
        "catag": "READ",
        "descr": "This RPC gets the list of file entries for the file defined for a specificHealth Summary component on the ADHOC Health Summary.  Current choicesinclude files 60, 9999999.64, 811.9 (reminder defn), 8925.1, 81, and possibly others(handled generically).  The file entries are used to populate a combo boxon the form.",
        "tags": [
            "K/META"
        ]
    },
    "ORWRP2 HS REPORT TEXT": {
        "mn": "ORWRP2",
        "catag": "READ",
        "descr": "uses HEALTH SUMMARY META file 142 ie/ key HEALTH SUMMARY REPORT",
        "tags": [
            "DFN"
        ]
    },
    "ORWRP2 HS SUBITEMS": {
        "mn": "ORWRP2",
        "catag": "READ",
        "descr": "This RPC expands a Laboratory Test panel to all it's sub-components forselection in the ADHOC Health Summary. ie/ type 60",
        "tags": [
            "K/META"
        ]
    },
    "ORWRP2 SAVLKUP": {
        "mn": "ORWRP2",
        "catag": "CHANGE",
        "descr": "'ORWRP ADHOC LOOKUP' ad hoc lookup for a user",
        "parameters": ["ORWRP ADHOC LOOKUP"],
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORWRP3 EXPAND COLUMNS": {
        "mn": "ORWRP3",
        "catag": "READ",
        "descr": "This RPC loads and expands nested reports defined in the OE/RR Reportsfile (#101.24) for use on the Reports Tab in CPRS.",
        "tags": [
            "K/META",
            "PARAMETER"
        ]
    },
    "ORWRP4 HDR MODIFY": {
        "mn": "ORWRP4",
        "catag": "UTILITY",
        "descr": "This RPC looks at data returned from the HDR and makes any modifications necessary to make the data compatible with CPRS Reports. OE/RR REPORT (101_24) related. NEEDS MORE ANALYSIS - is this K/META?",
        "files": ["101.24"],
        "tags": [
            "DFN"
        ]
    },
    "ORWSR CASELIST": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWSR GET SURG CONTEXT": {
        "catag": "READ",
        "parameters": ["ORCH CONTEXT SURGERY"],
        "complexity": "LOW",
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWSR IS NON-OR PROCEDURE": {
        "mn": "ORWSR",
        "catag": "READ",
        "descr": "Surgery - is case non-OR or not",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "ORWSR LIST": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWSR ONECASE": {
        "mn": "ORWSR",
        "catag": "READ",
        "descr": "Given a TIU document IEN, return the surgical case record and all otherdocuments related to the case, for display in the GUI treeview.",
        "tags": [
            "DFN"
        ]
    },
    "ORWSR RPTLIST": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWSR SAVE SURG CONTEXT": {
        "catag": "CHANGE",
        "parameters": ["ORCH CONTEXT SURGERY"],
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORWSR SHOW OPTOP WHEN SIGNING": {
        "mn": "ORWSR",
        "catag": "READ",
        "descr": "Hard coded to 0",
        "tags": [
            "HARD CODED"
        ]
    },
    "ORWSR SHOW SURG TAB": {
        "mn": "ORWSR",
        "catag": "READ",
        "parameters": ["ORWOR SHOW SURGERY TAB"],
        "complexity": "LOW",
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWTIU CANLINK": {
        "mn": "ORWTIU",
        "catag": "READ",
        "descr": "Given a title, call CANLINK^TIULP to determine whether this title can use linked as an Interdisciplinary child note. dbia #2322 - error messages if can't link document",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTIU CHKTXT": {
        "mn": "ORWTIU",
        "catag": "READ",
        "descr": "Check for existence of text in TIU(8925,TIUDA, either in \"TEXT\" or \"TEMP\" nodes, before allowing signature. (should be easy to try)",
        "tags": [
            "DFN"
        ]
    },
    "ORWTIU GET DCSUMM CONTEXT": {
        "catag": "READ",
        "parameters": ["ORCH CONTEXT SUMMRIES"],
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWTIU GET LISTBOX ITEM": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWTIU GET SAVED CP FIELDS": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "ORWTIU GET TIU CONTEXT": {
        "catag": "READ",
        "parameters": ["ORCH CONTEXT NOTES"],
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORWTIU IDNOTES INSTALLED": {
        "mn": "ORWTIU",
        "catag": "READ",
        "descr": "[PATCH] check if patch installed [IS-A] - returned 1 on OSEHRA",
        "tags": [
            "PATCH",
            "IS-A"
        ]
    },
    "ORWTIU SAVE DCSUMM CONTEXT": {
        "catag": "CHANGE",
        "parameters": ["ORCH CONTEXT SUMMRIES"],
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWTIU SAVE TIU CONTEXT": {
        "catag": "CHANGE",
        "parameters": ["ORCH CONTEXT NOTES"],
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWTIU WINPRINT NOTE": {
        "catag": "UTILITY",
        "tags": [
            "PRINT",
            "OUT OF SCOPE"
        ]
    },
    "ORWTPD ACTDF": {
        "mn": "ORWTPD",
        "catag": "CHANGE",
        "descr": "[DUZ] Make default time/occ setting take action on each report - [PARAMETER]",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWTPD DELDFLT": {
        "mn": "ORWTPD",
        "catag": "CHANGE",
        "descr": "[DUZ] [PARAMETER] Delete user level's specific health summary component setting( date range and max occurences) ie/ profile stuff",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWTPD GETDFLT": {
        "catag": "READ",
        "complexity": "LOW",
        "parameters": ["ORWRP TIME/OCC LIMITS ALL"],
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWTPD GETIMG": {
        "catag": "UTILITY",
        "files": ["101.24"],
        "descr": "TODO more",
        "tags": [
            "K/META"
        ]
    },
    "ORWTPD GETOCM": {
        "catag": "READ",
        "parameters": ["ORCH CONTEXT MEDS"],
        "complexity": "LOW",
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWTPD GETSETS": {
        "catag": "READ",
        "files": ["101.24"],
        "tags": [
            "K/META"
        ]
    },
    "ORWTPD PUTOCM": {
        "mn": "ORWTPD",
        "catag": "CHANGE",
        "params": ["ORCH CONTEXT MEDS"],
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORWTPD RSDFLT": {
        "mn": "ORWTPD",
        "catag": "READ",
        "descr": "get system or package level default setting for all repors.",
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWTPD SUDF": {
        "mn": "ORWTPD",
        "catag": "CHANGE",
        "descr": "Set user level default time/occ limits for all reports",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWTPD SUINDV": {
        "mn": "ORWTPD",
        "catag": "CHANGE",
        "descr": "set user level individual report's time/occ setting",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWTPD1 GETCSDEF": {
        "catag": "READ",
        "parameters": ["ORQQCSDR CS RANGE START", "ORQQCSDR CS RANGE STOP"],
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWTPD1 GETCSRNG": {
        "catag": "READ",
        "parameters": ["ORQQCSDR CS RANGE START", "ORQQCSDR CS RANGE STOP"],
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORWTPD1 GETEAFL": {
        "catag": "READ",
        "parameters": ["ORQQEAFL ENC APPT FUTURE LIMIT"],
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWTPD1 GETEDATS": {
        "catag": "READ",
        "parameters": ["ORQQEAPT ENC APPT START", "ORQQEAPT ENC APPT STOP"],
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORWTPD1 GETEFDAT": {
        "catag": "READ",
        "parameters": ["ORQQEAPT ENC APPT START", "ORQQEAPT ENC APPT STOP"],
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWTPD1 PUTCSRNG": {
        "mn": "ORWTPD1",
        "catag": "CHANGE",
        "descr": "Save user's Cover Sheet data range defaults.",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWTPD1 PUTEDATS": {
        "mn": "ORWTPD1",
        "catag": "CHANGE",
        "descr": "Save Encounter app't date range params at user level.",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWTPN GETCLASS": {
        "catag": "READ",
        "files": ["8925.1"],
        "tags": [
            "K/META"
        ]
    },
    "ORWTPN GETTC": {
        "catag": "READ",
        "files": ["8925.1"],
        "tags": [
            "K/META"
        ]
    },
    "ORWTPO CSARNGD": {
        "mn": "ORWTPO",
        "catag": "READ",
        "parameters": ["ORQQCSDR CS RANGE START", "ORQQCSDR CS RANGE STOP"],
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWTPO CSLABD": {
        "mn": "ORWTPO",
        "catag": "READ",
        "descr": "lab results",
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWTPO GETIMGD": {
        "catag": "READ",
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWTPO GETTABS": {
        "catag": "READ",
        "files": ["8989.51"],
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWTPP ADDLIST": {
        "catag": "READ",
        "descr": "adds current user to a team - TODO? need to change to DUZ as teams reference patients",
        "files": ["100.21"],
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP CHKSURR": {
        "mn": "ORWTPP",
        "catag": "READ",
        "descr": "check if current user's surrogate is valid",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORWTPP CLDAYS": {
        "mn": "ORWTPP",
        "catag": "READ",
        "descr": "get user's clinic defaults",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORWTPP CLEARNOT": {
        "mn": "ORWTPP",
        "catag": "CHANGE",
        "descr": "clear current user's notifications - gets into Alert Tracking 8992.1",
        "files": ["8992.1"],
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP CLRANGE": {
        "mn": "ORWTPP",
        "catag": "READ",
        "descr": "get current user's default clinic start, stop dates",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWTPP CSARNG": {
        "mn": "ORWTPP",
        "catag": "READ",
        "descr": "get current user's start, stop defaults",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWTPP CSLAB": {
        "mn": "ORWTPP",
        "catag": "READ",
        "descr": "get user's lab date range defaults",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "ORWTPP DELLIST": {
        "catag": "READ",
        "files": ["100.21"],
        "descr": "TODO? should be DFN and DFN/DUZ joining list?",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP GETCOMBO": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP GETCOS": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP GETDCOS": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP GETIMG": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP GETNOT": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP GETNOTO": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP GETOC": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP GETOTHER": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP GETREM": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP GETSUB": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP GETSURR": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP GETTD": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP GETTU": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP LSDEF": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP NEWLIST": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP PLISTS": {
        "catag": "READ",
        "files": ["100.21"],
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP PLTEAMS": {
        "mn": "ORWTPP",
        "catag": "READ",
        "files": ["100.21"],
        "descr": "get current user's teams and personal lists - uses OE/RR LIST (100_21) which links providers and patients",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP REMLIST": {
        "catag": "CHANGE",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP SAVECD": {
        "catag": "CHANGE",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP SAVECS": {
        "catag": "CHANGE",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP SAVELIST": {
        "catag": "CHANGE",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP SAVENOT": {
        "catag": "CHANGE",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP SAVENOTO": {
        "catag": "CHANGE",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP SAVEOC": {
        "catag": "CHANGE",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP SAVEPLD": {
        "catag": "CHANGE",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP SAVESURR": {
        "catag": "CHANGE",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP SAVET": {
        "catag": "CHANGE",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP SETCOMBO": {
        "catag": "UTILITY",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP SETDCOS": {
        "catag": "UTILITY",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP SETIMG": {
        "catag": "UTILITY",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP SETOTHER": {
        "catag": "UTILITY",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP SETREM": {
        "catag": "UTILITY",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP SETSUB": {
        "catag": "UTILITY",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP SORTDEF": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPP TEAMS": {
        "mn": "ORWTPP",
        "catag": "READ",
        "descr": "[DUZ] all teams a user is a member of (exculdes personal lists) - 100.21 (should be pure get but 'c' index used seems to be a MUMPS index)",
        "tags": [
            "DUZ"
        ]
    },
    "ORWTPR NOTDESC": {
        "mn": "ORWTPR",
        "catag": "READ",
        "descr": "OE/RR NOTIFICATIONS ie/ used to generate notifications [K/META]",
        "tags": [
            "K/META"
        ]
    },
    "ORWTPR OCDESC": {
        "mn": "ORWTPR",
        "catag": "READ",
        "descr": "Order checks 100_8 (ex duplicate drug) - gets text [K/META]",
        "tags": [
            "K/META"
        ]
    },
    "ORWTPT ATEAMS": {
        "mn": "ORWTPT",
        "catag": "READ",
        "descr": "100.21 all teams available to subscribe to [I/META]",
        "tags": [
            "I/META"
        ]
    },
    "ORWTPT GETTEAM": {
        "catag": "READ",
        "files": ["100.21"],
        "tags": [
            "DUZ"
        ]
    },
    "ORWU CLINLOC": {
        "mn": "ORWU",
        "catag": "READ",
        "descr": "[LOCATION] set of clinics",
        "tags": [
            "LOCATION"
        ]
    },
    "ORWU DEFAULT DIVISION": {
        "catag": "READ",
        "tags": [
            "DUZ",
            "LOCATION"
        ]
    },
    "ORWU DEVICE": {
        "mn": "ORWU",
        "catag": "READ",
        "descr": "subset of entries from the device file [I/META]",
        "tags": [
            "I/META"
        ]
    },
    "ORWU DT": {
        "mn": "ORWU",
        "catag": "UTILITY",
        "descr": "lot's of nuance - see www.hardhats.org/fileman/pm/cl_dt1.htm",
        "exArgs": "[\"NOW\"]",
        "tags": [
            "HARD CODED"
        ]
    },
    "ORWU EXTNAME": {
        "mn": "ORWU",
        "catag": "UTILITY",
        "descr": "external form of a pointer",
        "tags": [
            "FMUTILITY"
        ]
    },
    "ORWU GBLREF": {
        "mn": "ORWU",
        "catag": "UTILITY",
        "descr": "global reference for a file number",
        "tags": [
            "FMUTILITY"
        ]
    },
    "ORWU GENERIC": {
        "mn": "ORWU",
        "catag": "UTILITY",
        "descr": "[UTILITY] set of entries from any XREF",
        "tags": [
            "FMUTILITY"
        ]
    },
    "ORWU HAS OPTION ACCESS": {
        "mn": "ORWU",
        "catag": "READ",
        "descr": "does a user have access to a specified menu option",
        "tags": [
            "DUZ"
        ]
    },
    "ORWU HASKEY": {
        "mn": "ORWU",
        "catag": "READ",
        "descr": "does user possess a security key?",
        "tags": [
            "DUZ"
        ]
    },
    "ORWU HOSPLOC": {
        "mn": "ORWU",
        "catag": "READ",
        "descr": "a set of locations from HOSPITAL LOCATION",
        "tags": [
            "LOCATION"
        ]
    },
    "ORWU INPLOC": {
        "mn": "ORWU",
        "catag": "READ",
        "descr": "a set of wards from HOSPITAL LOCATION",
        "tags": [
            "LOCATION"
        ]
    },
    "ORWU NEWPERS": {
        "mn": "ORWU",
        "catag": "READ",
        "descr": "returns set of names from 200",
        "tags": [
            "DUZ"
        ]
    },
    "ORWU NPHASKEY": {
        "mn": "ORWU",
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "ORWU PARAM": {
        "mn": "ORWU",
        "catag": "READ",
        "descr": "Simple call to return a parameter value.  The call assumes the currentuser, defaultable entities, and one instance.",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWU PARAMS": {
        "mn": "ORWU",
        "catag": "READ",
        "descr": "Simple call to return a list of parameter values using GETLST",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWU PATCH": {
        "mn": "ORWU",
        "catag": "UTILITY",
        "descr": "Patch No for code - path ends up looking in 9.4 etc. TODO: inventory what uses underlying call too",
        "tags": [
            "PATCH"
        ]
    },
    "ORWU TOOLMENU": {
        "mn": "ORWU",
        "catag": "READ",
        "descr": "number of items for tool menu",
        "tags": [
            "DUZ",
            "PARAMETER"
        ]
    },
    "ORWU USERINFO": {
        "mn": "ORWU",
        "catag": "READ",
        "descr": "User Parameters ie/ add to User Prototype",
        "tags": [
            "DUZ"
        ]
    },
    "ORWU VALDT": {
        "catag": "UTILITY",
        "exArgs": "[\"Aug 4,2016@21:57\", \"TS\"]",
        "tags": [
            "HARD CODED"
        ]
    },
    "ORWU VALIDSIG": {
        "mn": "ORWU",
        "catag": "UTILITY",
        "tags": [
            "DUZ"
        ]
    },
    "ORWU VERSION": {
        "mn": "ORWU",
        "catag": "READ",
        "descr": "version number of package or namespace [SYS]",
        "tags": [
            "S/META"
        ]
    },
    "ORWU VERSRV": {
        "mn": "ORWU",
        "catag": "READ",
        "descr": "[K/META] server version of option name",
        "tags": [
            "K/META"
        ]
    },
    "ORWU1 NAMECVT": {
        "mn": "ORWU1",
        "catag": "READ",
        "descr": "[DUZ] 200/20.2 (sig block)",
        "tags": [
            "DUZ"
        ]
    },
    "ORWU1 NEWLOC": {
        "mn": "ORWU1",
        "catag": "READ",
        "descr": "Return \"CZ\" locations from HOSPITAL LOCATION file [LOCATION]",
        "tags": [
            "LOCATION"
        ]
    },
    "ORWU16 DEVICE": {
        "mn": "ORWU16",
        "catag": "READ",
        "descr": "devices",
        "tags": [
            "S/META"
        ]
    },
    "ORWU16 HOSPLOC": {
        "mn": "ORWU16",
        "catag": "READ",
        "descr": "Return a bolus from the HOSPITAL LOCATION file",
        "tags": [
            "QUERY",
            "LOCATION"
        ]
    },
    "ORWU16 NEWPERS": {
        "mn": "ORWU16",
        "catag": "READ",
        "descr": "Return a bolus from the NEW PERSON file [QUERY] 200 but not for particular user. KEY used to filter list (who has key?)",
        "tags": [
            "QUERY",
            "DUZ"
        ]
    },
    "ORWU16 USERINFO": {
        "mn": "ORWU16",
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "ORWU16 VALDT": {
        "catag": "UTILITY",
        "tags": [
            "HARD CODED"
        ]
    },
    "ORWU16 VALIDSIG": {
        "mn": "ORWU16",
        "catag": "UTILITY",
        "tags": [
            "DUZ"
        ]
    },
    "ORWU2 COSIGNER": {
        "mn": "ORWU2",
        "catag": "READ",
        "descr": "cosigner 200 in TIUs",
        "tags": [
            "DFN"
        ]
    },
    "ORWUH POPUP": {
        "mn": "ORWUH",
        "catag": "READ",
        "descr": "instructions for given control",
        "parameters": ["ORWUH WHATSTHIS"],
        "tags": [
            "PARAMETER"
        ]
    },
    "ORWUL FV4DG": {
        "mn": "ORWUL",
        "catag": "READ",
        "files": ["101.44", "101.43"],
        "descr": "quick and orderables",
        "tags": [
            "K/META",
            "QUERY"
        ]
    },
    "ORWUL FVIDX": {
        "mn": "ORWUL",
        "catag": "READ",
        "files": ["101.43"],
        "descr": "101.43 return index of item beginning with FROM",
        "tags": [
            "K/META",
            "QUERY"
        ]
    },
    "ORWUL FVSUB": {
        "mn": "ORWUL",
        "catag": "READ",
        "descr": "subset of orders in view",
        "files": ["101.44"],
        "tags": [
            "K/META",
            "QUERY"
        ]
    },
    "ORWUL QV4DG": {
        "mn": "ORWUL",
        "catag": "READ",
        "descr": "the quick order list, given a display group name ... checks parameter ORWDQ QUICK VIEW for permission and group from 100.98",
        "parameters": ["ORWDQ QUICK VIEW"],
        "tags": [
            "QUERY",
            "PARAMETER",
            "K/META"
        ]
    },
    "ORWUL QVIDX": {
        "mn": "ORWUL",
        "catag": "READ",
        "files": ["101.44"],
        "tags": [
            "K/META",
            "QUERY"
        ]
    },
    "ORWUL QVSUB": {
        "mn": "ORWUL",
        "catag": "READ",
        "descr": "subset of orders in view",
        "files": ["101.44"],
        "tags": [
            "QUERY",
            "K/META"
        ]
    },
    "ORWUX SYMTAB": {
        "mn": "ORWUX",
        "catag": "UTILITY",
        "descr": "the current symbol table - be inside a TMP!",
        "tags": [
            "HARD CODED"
        ]
    },
    "ORWUXT LST": {
        "mn": "ORWUXT",
        "catag": "READ",
        "descr": "just Q",
        "tags": [
            "HARD CODED",
            "OUT OF SCOPE"
        ]
    },
    "ORWUXT REF": {
        "mn": "ORWUXT",
        "catag": "READ",
        "descr": "just Q",
        "tags": [
            "HARD CODED",
            "OUT OF SCOPE"
        ]
    },
    "ORWUXT VAL": {
        "mn": "ORWUXT",
        "catag": "READ",
        "descr": "just Q",
        "tags": [
            "HARD CODED",
            "OUT OF SCOPE"
        ]
    },
    "PXRM REMINDER CATEGORY": {
        "mn": "PXRM",
        "catag": "READ",
        "descr": "811.7 List reminders and categories in display order for a reminder category.",
        "tags": [
            "K/META"
        ]
    },
    "PXRM REMINDER DIALOG (TIU)": {
        "mn": "PXRM",
        "catag": "UTILITY",
        "descr": "801.41 used to build - loads dialog for a user and evaluates it (eventually EVALTERM^PXRMTERM) [DFN]",
        "tags": [
            "DFN"
        ]
    },
    "PXRM REMINDERS AND CATEGORIES": {
        "mn": "PXRM",
        "catag": "READ",
        "descr": "gives list of reminder types - straight IEN^NAME ie/ ala SELECT in FMQL [QUERY] allows paging",
        "tags": [
            "K/META",
            "QUERY"
        ]
    },
    "TIU AUTHORIZATION": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "[DUZ] allows the calling application to evaluate privilege to performany ASU-mediated action on a TIU document. [IS-A] - logic on property combinations",
        "tags": [
            "DUZ",
            "IS-A"
        ]
    },
    "TIU CAN CHANGE COSIGNER?": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "[DUZ] [IS-A] BOOLEAN RPC to evaluate user's privilege to modify the expected cosigner, given the current status of the document, and the user's role with respect to it.",
        "tags": [
            "DUZ",
            "IS-A"
        ]
    },
    "TIU CREATE ADDENDUM RECORD": {
        "catag": "CHANGE",
        "tags": [
            "DFN"
        ]
    },
    "TIU CREATE RECORD": {
        "catag": "CHANGE",
        "tags": [
            "DFN"
        ]
    },
    "TIU DELETE RECORD": {
        "catag": "CHANGE",
        "tags": [
            "DFN"
        ]
    },
    "TIU DETAILED DISPLAY": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "TIU DIV AND CLASS INFO": {
        "mn": "TIU",
        "descr": "a list of Divisions and User Classes for a specific User.",
        "catag": "READ",
        "tags": [
            "DUZ",
            "K/META"
        ]
    },
    "TIU DOCUMENTS BY CONTEXT": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "documents by context",
        "tags": [
            "QUERY",
            "DFN"
        ]
    },
    "TIU FIELD CAN EDIT": {
        "catag": "READ",
        "descr": "TRUE if the current user is allowed to edit template fields.",
        "tags": [
            "DUZ",
            "IS-A"
        ]
    },
    "TIU FIELD CHECK": {
        "mn": "TIU",
        "catag": "UTILITY",
        "descr": "Very similar to IMPORT^TIUSRVF, except does not save template fields.Resolves self referencing loops, and takes into account fields withthe same name already saved. rename XML fields",
        "tags": [
            "HARD CODED"
        ]
    },
    "TIU FIELD DELETE": {
        "catag": "CHANGE",
        "files": ["8927.1"],
        "tags": [
            "K/META"
        ]
    },
    "TIU FIELD DOLMTEXT": {
        "mn": "TIU",
        "catag": "UTILITY",
        "descr": "Reads through an array of text and converts all entries of templatefields to their assocaited List Manager text values. ie/ fills in text in template places - would be user independent",
        "tags": [
            "FMUTILITY"
        ]
    },
    "TIU FIELD EXPORT": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "Exports Template Fields in XML format 8927.1 - [K/META] ... kind of utility",
        "tags": [
            "K/META",
            "XML"
        ]
    },
    "TIU FIELD IMPORT": {
        "mn": "TIU",
        "catag": "CHANGE",
        "descr": "Imports Template Fields from XML format [K/META]",
        "tags": [
            "K/META",
            "XML"
        ]
    },
    "TIU FIELD LIST": {
        "catag": "READ",
        "files": ["8927.1"],
        "tags": [
            "K/META"
        ]
    },
    "TIU FIELD LIST ADD": {
        "catag": "UTILITY",
        "tags": [
            "REENTRANCY"
        ]
    },
    "TIU FIELD LIST IMPORT": {
        "catag": "CHANGE",
        "files": ["8927.1"],
        "descr": "Takes TMP filled in with LIST ADD",
        "tags": [
            "K/META",
            "REENTRANCY"
        ]
    },
    "TIU FIELD LOAD": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "TIU FIELD LOAD BY IEN": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "TIU FIELD LOCK": {
        "catag": "UTILITY",
        "tags": [
            "LOCK"
        ]
    },
    "TIU FIELD NAME IS UNIQUE": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "[IS-A] [K/META] Returns TRUE if the template field name is unique 8927.1",
        "files": ["8927.1"],
        "tags": [
            "IS-A",
            "K/META"
        ]
    },
    "TIU FIELD SAVE": {
        "catag": "CHANGE",
        "files": ["8927.1"],
        "tags": [
            "K/META"
        ]
    },
    "TIU FIELD UNLOCK": {
        "catag": "UTILITY",
        "tags": [
            "LOCK"
        ]
    },
    "TIU GET ADDITIONAL SIGNERS": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "TIU GET ALERT INFO": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "TIU GET BOILERPLATE": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "TIU GET DEFAULT PROVIDER": {
        "catag": "READ",
        "tags": [
            "DUZ",
            "S/META"
        ]
    },
    "TIU GET DOCUMENT PARAMETERS": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "TIU GET DOCUMENT STATUS": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "TIU GET DOCUMENT TITLE": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "TIU GET DOCUMENTS FOR REQUEST": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "TIU GET DS TITLES": {
        "catag": "READ",
        "files": ["8925.98"],
        "tags": [
            "DUZ",
            "K/META"
        ]
    },
    "TIU GET DS URGENCIES": {
        "catag": "READ",
        "descr": "unusual as comes from doc dd",
        "tags": [
            "K/META",
            "HARD CODED"
        ]
    },
    "TIU GET LINKED PRF NOTES": {
        "catag": "READ",
        "descr": "Represents a complex set of filters to get meta on notes wanted. Tie into PRF - one of two in TIU.",
        "tags": [
            "DFN"
        ]
    },
    "TIU GET LIST OF OBJECTS": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "TIU GET PERSONAL PREFERENCES": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "TIU GET PN TITLES": {
        "catag": "READ",
        "tags": [
            "DUZ",
            "K/META"
        ]
    },
    "TIU GET PRF ACTIONS": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "TIU GET PRF TITLE": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "TIU GET PRINT NAME": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "TIU GET RECORD TEXT": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "TIU GET REQUEST": {
        "catag": "READ",
        "descr": "returns the variable pointer to the REQUESTINGPACKAGE REFERENCE (File #8925, Field #1405). This would be the record inthe Requesting Package (e.g., Consult/Request Tracking or Surgery) forwhich the resulting document has been entered in TIU.",
        "tags": [
            "DFN"
        ]
    },
    "TIU GET SITE PARAMETERS": {
        "catag": "READ",
        "tags": [
            "S/META",
            "LOCATION"
        ]
    },
    "TIU HAS AUTHOR SIGNED?": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "has author signed",
        "tags": [
            "IS-A",
            "DFN"
        ]
    },
    "TIU ID ATTACH ENTRY": {
        "mn": "TIU",
        "catag": "CHANGE",
        "descr": "This RPC will attach a a document as an Interdisciplinary (ID) entry to anID Parent document. [DUZ] sends alert too",
        "tags": [
            "DFN"
        ]
    },
    "TIU ID CAN ATTACH": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "This BOOLEAN RPC evaluates the question of whether a particular documentmay be attached as an entry to an Interdisciplinary Note (i.e., can thisdocument be an ID Child?). Based on doc types",
        "tags": [
            "IS-A",
            "K/META"
        ]
    },
    "TIU ID CAN RECEIVE": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "This BOOLEAN RPC evaluates the question of whether a particular documentmay receive an entry as an Interdisciplinary Parent Note (i.e., can thisdocument be an ID Parent?). [DFN] [IS-A]",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "TIU ID DETACH ENTRY": {
        "mn": "TIU",
        "catag": "CHANGE",
        "descr": "This call will remove an ID Entry from an Interdisciplinary Note.",
        "tags": [
            "DFN"
        ]
    },
    "TIU IDENTIFY CLINPROC CLASS": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "This RPC gets the CLINICAL PROCEDURES TIU Document Definitionfile (#8925.1) IEN.",
        "tags": [
            "K/META"
        ]
    },
    "TIU IDENTIFY CONSULTS CLASS": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "This RPC returns the record number of the class CONSULTS in the TIUDOCUMENT DEFINITION file (#8925.1). [QUERY] [K/META]",
        "tags": [
            "K/META",
            "IEN-LOOKUP"
        ]
    },
    "TIU IDENTIFY SURGERY CLASS": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "This RPC returns the record number of the class identified by the CLNAMEparameter in the TIU DOCUMENT DEFINITION file (#8925.1).",
        "tags": [
            "IEN-LOOKUP",
            "K/META"
        ]
    },
    "TIU IS THIS A CLINPROC?": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "This RPC evaluates whether or not a Title is under theCLINICAL PROCEDURES Class.",
        "tags": [
            "IS-A",
            "K/META"
        ]
    },
    "TIU IS THIS A CONSULT?": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "BOOLEAN RPC which evaluates whether the title indicated is that of aconsult.",
        "tags": [
            "IS-A",
            "K/META"
        ]
    },
    "TIU IS THIS A SURGERY?": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "BOOLEAN RPC which evaluates whether the title indicated is that of aSURGICAL REPORT or PROCEDURE REPORT (NON-O.R.).",
        "tags": [
            "IS-A",
            "K/META"
        ]
    },
    "TIU IS USER A PROVIDER?": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "This Boolean RPC returns TRUE if the user was a known provider on the date specified - Checks USR CLASS PROVIDER AND 200 Person Class.",
        "tags": [
            "DUZ",
            "IS-A"
        ]
    },
    "TIU IS USER A USR PROVIDER": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "This Boolean RPC returns TRUE if the user was a member of USR CLASS PROVIDER on the date specified.",
        "tags": [
            "DUZ",
            "IS-A"
        ]
    },
    "TIU ISPRF": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "This RPC is to check to see if the passed in TIU DOCUMENT TITLE IEN is a Patient Record Flag TITLE. IEN lookup that is more complicated than most taking. PRF docs PATIENT RECORD FLAG CAT I and PATIENT RECORD FLAG CAT II",
        "tags": [
            "IS-A",
            "K/META",
            "IEN-LOOKUP"
        ]
    },
    "TIU JUSTIFY DELETE?": {
        "mn": "TIU",
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "TIU LINK TO FLAG": {
        "mn": "TIU",
        "catag": "CHANGE",
        "descr": "This RPC is used to link a Progress Note to a Patient Record Flag",
        "tags": [
            "DFN"
        ]
    },
    "TIU LOAD BOILERPLATE TEXT": {
        "catag": "UTILITY",
        "tags": [
            "K/META"
        ]
    },
    "TIU LOAD RECORD FOR EDIT": {
        "catag": "READ",
        "tags": [
            "DFN"
        ]
    },
    "TIU LOCK RECORD": {
        "catag": "UTILITY",
        "tags": [
            "LOCK"
        ]
    },
    "TIU LONG LIST BOILERPLATED": {
        "catag": "READ",
        "tags": [
            "HEURISTIC"
        ]
    },
    "TIU LONG LIST CLINPROC TITLES": {
        "catag": "READ",
        "files": ["8925.1"],
        "tags": [
            "K/META"
        ]
    },
    "TIU LONG LIST CONSULT TITLES": {
        "catag": "READ",
        "files": ["8925.1"],
        "tags": [
            "K/META"
        ]
    },
    "TIU LONG LIST OF TITLES": {
        "catag": "READ",
        "files": ["8925.1"],
        "tags": [
            "K/META"
        ]
    },
    "TIU LONG LIST SURGERY TITLES": {
        "catag": "READ",
        "files": ["8925.1"],
        "tags": [
            "K/META"
        ]
    },
    "TIU NOTES": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "This API gets lists of progress notes for a patient, with optional parameters for STATUS, EARLY DATE/TIME, and LATE DATE/TIME. [DFN] [QUERY]",
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "TIU NOTES 16 BIT": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "This API gets lists of progress notes for a patient, with optional parameters for STATUS, EARLY DATE/TIME, and LATE DATE/TIME. [DFN] [QUERY]",
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "TIU NOTES BY VISIT": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "This API gets lists of Progress Notes by visit from TIU. [DFN] [QUERY]",
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "TIU ONE VISIT NOTE?": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "Boolean RPC to evaulate if note has a corresponding visit. [DFN] [IS-A]",
        "tags": [
            "DFN",
            "IS-A"
        ]
    },
    "TIU PERSONAL TITLE LIST": {
        "catag": "READ",
        "tags": [
            "DUZ"
        ]
    },
    "TIU PRINT RECORD": {
        "catag": "UTILITY",
        "tags": [
            "OUT OF SCOPE",
            "PRINT"
        ]
    },
    "TIU REM DLG OK AS TEMPLATE": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "TRUE is the passed in reminder dialog is allowed to be used ina TIU Template.",
        "tags": [
            "IS-A",
            "K/META"
        ]
    },
    "TIU REMINDER DIALOGS": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "a list of reminder dialogs allowed for use as Templates.",
        "tags": [
            "K/META"
        ]
    },
    "TIU REQUIRES COSIGNATURE": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "This Boolean RPC simply evaluates whether the current user requirescosignature for TIU DOCUMENTS, and returns a 1 if true, or a 0 if false.",
        "tags": [
            "DUZ",
            "IS-A"
        ]
    },
    "TIU SET ADMINISTRATIVE CLOSURE": {
        "catag": "CHANGE",
        "tags": [
            "DFN"
        ]
    },
    "TIU SET DOCUMENT TEXT": {
        "mn": "TIU",
        "catag": "UTILITY",
        "descr": "buffers text transmission",
        "tags": [
            "REENTRANCY",
            "DFN"
        ]
    },
    "TIU SIGN RECORD": {
        "mn": "TIU",
        "catag": "CHANGE",
        "descr": "This API Supports the application of the user's electronic signature to aTIU document while evaluating authorization, and validating the user selectronic signature.",
        "tags": [
            "DFN"
        ]
    },
    "TIU SUMMARIES": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "This API gets lists of Discharge Summaries for a patient, with optional parameters for STATUS, EARLY DATE/TIME, and LATE DATE/TIME.",
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "TIU SUMMARIES BY VISIT": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "This API returns lists of Discharge Summaries by visit.",
        "tags": [
            "DFN",
            "QUERY"
        ]
    },
    "TIU TEMPLATE ACCESS LEVEL": {
        "mn": "TIU",
        "catag": "READ",
        "tags": [
            "PARAMETER",
            "DUZ"
        ]
    },
    "TIU TEMPLATE ALL TITLES": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "[K/META] Returns a long list of all active titles.",
        "tags": [
            "K/META"
        ]
    },
    "TIU TEMPLATE CHECK BOILERPLATE": {
        "mn": "TIU",
        "catag": "UTILITY",
        "descr": "This RPC will evaluate boilerplate passed in the input array, checking tosee whether any of the embedded objects are inactive, faulty, orambiguous.",
        "tags": [
            "K/META"
        ]
    },
    "TIU TEMPLATE CREATE/MODIFY": {
        "catag": "CHANGE",
        "tags": [
            "K/META"
        ]
    },
    "TIU TEMPLATE DELETE": {
        "catag": "CHANGE",
        "tags": [
            "K/META"
        ]
    },
    "TIU TEMPLATE GET DEFAULTS": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "TIU TEMPLATE GET DESCRIPTION": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "TIU TEMPLATE GETBOIL": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "TIU TEMPLATE GETITEMS": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "TIU TEMPLATE GETLINK": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "TIU TEMPLATE GETPROOT": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "TIU TEMPLATE GETROOTS": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "TIU TEMPLATE GETTEXT": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "TIU TEMPLATE ISEDITOR": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "TIU TEMPLATE LISTOWNR": {
        "catag": "READ",
        "tags": [
            "K/META"
        ]
    },
    "TIU TEMPLATE LOCK": {
        "catag": "UTILITY",
        "tags": [
            "LOCK"
        ]
    },
    "TIU TEMPLATE PERSONAL OBJECTS": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "a list or Patient Data Objects allowed in Personal Templates [DUZ]",
        "tags": [
            "DUZ"
        ]
    },
    "TIU TEMPLATE SET DEFAULTS": {
        "catag": "CHANGE",
        "tags": [
            "K/META"
        ]
    },
    "TIU TEMPLATE SET ITEMS": {
        "catag": "CHANGE",
        "tags": [
            "K/META"
        ]
    },
    "TIU TEMPLATE UNLOCK": {
        "catag": "UTILITY",
        "tags": [
            "LOCK"
        ]
    },
    "TIU UNLOCK RECORD": {
        "catag": "UTILITY",
        "tags": [
            "LOCK"
        ]
    },
    "TIU UPDATE ADDITIONAL SIGNERS": {
        "mn": "TIU",
        "catag": "CHANGE",
        "tags": [
            "DFN"
        ]
    },
    "TIU UPDATE RECORD": {
        "mn": "TIU",
        "catag": "CHANGE",
        "tags": [
            "DFN"
        ]
    },
    "TIU USER CLASS LONG LIST": {
        "catag": "READ",
        "files": ["8930"],
        "tags": [
            "K/META"
        ]
    },
    "TIU USER INACTIVE?": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "[IS-A] [DUZ] evaluates user's DIUSER status and termination status when selected.Returns 0 if active 1 if inactive",
        "tags": [
            "IS-A",
            "DUZ"
        ]
    },
    "TIU WAS THIS SAVED?": {
        "catag": "CHANGE",
        "tags": [
            "DFN"
        ]
    },
    "TIU WHICH SIGNATURE ACTION": {
        "mn": "TIU",
        "catag": "READ",
        "descr": "This RPC infers whether the user is trying to sign or cosign the docuementin question, and indicates which ASU ACTION the GUI should pass to the TIUAUTHORIZATION RPC.",
        "tags": [
            "DFN"
        ]
    },
    "VAFCTFU CONVERT ICN TO DFN": {
        "mn": "VAFCTFU",
        "catag": "READ",
        "descr": "Given a patient Integration Control Number (ICN), this will returnthe patient Internal Entry Number (IEN) from the PATIENT file (#2). [QUERY] [DFN]",
        "tags": [
            "QUERY",
            "DFN"
        ]
    },
    "XUS AV CODE": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XUS AV HELP": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XUS CCOW VAULT PARAM": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XUS CVC": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XUS DIVISION GET": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XUS DIVISION SET": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XUS GET CCOW TOKEN": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XUS GET TOKEN": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XUS GET USER INFO": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XUS INTRO MSG": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XUS PKI GET UPN": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XUS PKI SET UPN": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XUS SIGNON SETUP": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XWB CREATE CONTEXT": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XWB DEFERRED CLEARALL": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XWB DIRECT RPC": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XWB GET BROKER INFO": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XWB GET VARIABLE VALUE": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XWB IM HERE": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XWB REMOTE CLEAR": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XWB REMOTE GETDATA": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XWB REMOTE RPC": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "XWB REMOTE STATUS CHECK": {
        "catag": "AUTHENTICATION",
        "tags": [
            "AUTHENTICATION"
        ]
    },
    "YS GAF API": {
        "mn": "YS",
        "catag": "READ",
        "descr": "Mental Health [DFN]",
        "tags": [
            "DFN"
        ]
    }
};

try {
    module.exports = rpcsCategorized;
}
catch(exception) {
    //will fail in browser - config is referenced by browser client for convenience
}
