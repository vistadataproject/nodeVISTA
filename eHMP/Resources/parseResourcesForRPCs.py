#i!/usr/bin/env python

import os
import re 
import sys
import json

"""
Quick and dirty parse of RPC calls out of R1.3 eHMP RDK resources

Produces both .json and a .md summary
"""

def parseFromDir(d="", found={}, filesConsidered=set()):
    for f in os.listdir("." if not d else d):
        if os.path.isdir(f):
            parseFromDir(d + f + "/", found, filesConsidered)
            continue
        if not re.search(r'\.js$', f):
            continue 
        filesConsidered.add(d + f)
        parseFromFile(d + f, found)
    return found, filesConsidered

SUPPRESS_WARN = ["vista-resource.js", "writebacknote/signnoteResource.js", "writebacknote/createnoteResource.js"]

def warn(f, message):
    if f in SUPPRESS_WARN:
        return 
    print
    print "*** Warning", f, message
    print

def parseFromFile(f, foundByRPC={}):
    """
    FORM: 
        VistaJS.callRpc(req.logger, getVistaRpcConfiguration(req.app.config, req.session.user.site), 'ORWDPS2 OISLCT'
                   OR
        var rpcName = 'XXXXXX'
    """
    def findRPC(line):
        rpcFind = re.search(r'\'([A-Z\d\/ ]{4,})\'', line)
        if not rpcFind:
            return ""
        return rpcFind.group(1)

    def markRPCFound(rpc, f):
        if rpc in foundByRPC:
            if f not in foundByRPC[rpc]["file"]:
                foundByRPC[rpc]["file"].append(f)
        else:
            foundByRPC[rpc] = {"rpc": rpc, "file": [f]}

    callRPCLine = "" # multi-line calls
    for line in open(f):
        # Right now only in health-summaries-resource.js has specials - REPORTX...
        rpcNameSearch = re.search(r'var (REPORTLISTRPC|REPORTCONTENTRPC|rpcName) \= \'([^\']+)\'', line)
        if rpcNameSearch:
            markRPCFound(rpcNameSearch.group(2), f)
            continue
        # Only try to parse callRpc if holds concrete RPC name
        if re.search(r'VistaJS.callRpc\(', line) and not re.search(r'(rpcName|REPORTLISTRPC|REPORTCONTENTRPC)', line):
            rpc = findRPC(line)
            if not rpc: # assume multi-line
                callRPCLine = line
                continue
            markRPCFound(rpc, f)
        elif callRPCLine:
            rpc = findRPC(line)
            if rpc:
                markRPCFound(rpc, f)
            # if rpcName used in a callRpc, we're ok as parsed elsewhere
            elif not re.search(r'rpcName', line):
                warn(f, "First line: " + callRPCLine + " - but not in second line: " + line)
            callRPCLine = ""

def markdownResults(found, filesConsidered):
    mu = "### RPCs in eHMP Resources\n\n"
    mu += "From: parseResourcesForRPCs.py\n\n"
    mu += "Number of files considered - " + str(len(filesConsidered)) + " vs matched - " + str(len(set(f for k in found for f in found[k]["file"]))) + "\n\n"
    mu += "\# | RPC | File(s)\n"
    mu += ":---: | :--- | ---\n"
    for i, rpc in enumerate(sorted(found.keys()), 1):
        mu += str(i) + " | " + rpc + " | " + "<br>".join(found[rpc]["file"]) + "\n"
    mu += "\n"
    open("eHMPRPCs.md", "w").write(mu)

def serializeResults(found): 
    olist = []
    for i, rpc in enumerate(sorted(found.keys()), 1):
        olist.append(found[rpc])
    json.dump(olist, open("eHMPRPCs.json", "w"), indent=2)

def main():
    found, filesConsidered = parseFromDir()
    mu = markdownResults(found, filesConsidered)
    serializeResults(found)
    print "Made MU and serialized to JSON"

if __name__ == "__main__":
    main()
