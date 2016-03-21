import json
import os
import sys
import re

"""
Parse eHMP MUMPS code for key information

Particulars:
- copy from VPR from original HMP KEY SPLIT
- all RPCs (compare to static list)
- ALL triggers KEY KEY
- dates on files 
- who wrote (AGILEX etc)

TODO: use KIDS parsers to do rawer parse
... there was a fork of VPR (52 files), SLC did trigger and other files (gotta break down) and Agilex added some more
... 
"""

EHMP_MUMPS_DIR = "HMPMUMPS"
VPR_MUMPS_DIR = "../VPRMUMPS"

"""
HMP MUMPS Files 148
VPR copies 52
Non HMP NS files 3
HMP Non VPR Copies 96
	Of Agilex 8
	Of SLC 73
	Of Other 15
"""
def describeFiles():

    vprFilesLessNS = set(re.sub(r'^VPR', '', f) for f in os.listdir(VPR_MUMPS_DIR) if re.match(r'VPR', f))
    
    hmpFiles = set()
    hmpVPRCopies = set()
    hmpNonNSFiles = set()
    for f in os.listdir(EHMP_MUMPS_DIR):
        if not re.search(r'\.m$', f):
            continue
        hmpFiles.add(f)
        if not re.match(r'HMP', f):
            hmpNonNSFiles.add(f)
            continue
        fLessNS = re.sub(r'^HMP', '', f)
        if fLessNS in vprFilesLessNS:
            hmpVPRCopies.add(f)
    
    print "HMP MUMPS Files", len(hmpFiles)
    print "VPR copies", len(hmpVPRCopies)
    print "Non HMP NS files", len(hmpNonNSFiles)
    
    hmpNonVPRCopies = hmpFiles - hmpVPRCopies
    fmeta = {}
    for f in hmpNonVPRCopies:
        fmeta[f] = {}
        for l in open(EHMP_MUMPS_DIR + "/" + f):
            dtSearch = re.search(r'([A-Za-z\d \@\:\/\,]+)$', l)
            if dtSearch and re.search(r'\d', dtSearch.group(1)):
                fmeta[f]["date"] = dtSearch.group(1)
            if re.search("SLC", l):
                fmeta[f]["creator"] = "SLC"
            elif re.search(r'(AGILEX|Agilex)', l):
                fmeta[f]["creator"] = "AGILEX"
            else:
                fmeta[f]["creator"] = "OTHER"
            break
    # TODO: fix dates better and report 13/14/15/16 ...
    print "HMP Non VPR Copies", len(hmpNonVPRCopies)
    print "\tOf Agilex", sum(1 for f in fmeta if fmeta[f]["creator"] == "AGILEX")
    print "\tOf SLC", sum(1 for f in fmeta if fmeta[f]["creator"] == "SLC")
    print "\tOf Other", sum(1 for f in fmeta if fmeta[f]["creator"] == "OTHER")
    print
    for f in fmeta:
        print f, "" if "date" not in fmeta[f] else fmeta[f]["date"]
    
def main():

    describeFiles()
    
if __name__ == "__main__":
    main()
