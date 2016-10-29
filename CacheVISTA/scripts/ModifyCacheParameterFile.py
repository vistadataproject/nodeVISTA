from os import path
import sys
import shutil
from datetime import date

if len(sys.argv) < 2:
    print "%s usage: %s <Path to original cache.cpf file>" % (sys.argv[0], sys.argv[0])
    sys.exit(1)

# Get path information from the specified original file
originalFile = path.abspath(sys.argv[1])
absoluteDirName = path.dirname(originalFile)
tempFile = absoluteDirName + '/cache.cpf.temp'

# Rewrite the CPF file, including VistA instance in the configuration
inDatabaseSection = False
inNamespacesSection = False

print "Opening Cache CPF file %s, writing to temporary file %s" % (originalFile, tempFile)
with open(originalFile) as origFile:
    with open(tempFile, "w") as newFile:
        for line in origFile:

            line = line.strip()

            # Look for the '[Databases]' string in the stream of lines, scroll past the existing list
            # then add the VistA entry
            if line.find("[Databases]") >= 0:
                print "Found databases section!"
                inDatabaseSection = True
                newFile.write(line + "\n")
                continue

            if inDatabaseSection and not line:
                print "Inserting VistA into the database section..."
                newFile.write("VISTA=/opt/cachesys/cache/mgr/VistA/,,1\n\n")
                inDatabaseSection = False
                continue


            # Look for the '[Namespaces]' string in the stream of lines, scroll past the existing list
            # then add the VistA namespace, then add the VistA global/routine mappings
            if line.find("[Namespaces]") >= 0:
                print "Found namespaces section!"
                inNamespacesSection = True
                newFile.write(line + "\n")
                continue

            if inNamespacesSection and not line:
                print "Inserting VistA into the namespace section and creating Global/Routine mappings..."
                newFile.write("VISTA=VISTA\n\n")
                newFile.write("[Map.VISTA]\n")
                newFile.write("Global_%Z*=VISTA\n")
                newFile.write("Global_%z*=VISTA\n")
                newFile.write("Routine_%DT*=VISTA\n")
                newFile.write("Routine_%HOSTCMD=VISTA\n")
                newFile.write("Routine_%INET=VISTA\n")
                newFile.write("Routine_%RCR=VISTA\n")
                newFile.write("Routine_%XB*=VISTA\n")
                newFile.write("Routine_%XU*=VISTA\n")
                newFile.write("Routine_%ZDEBUG*=VISTA\n")
                newFile.write("Routine_%ZG=VISTA\n")
                newFile.write("Routine_%ZIS*=VISTA\n")
                newFile.write("Routine_%ZI*=VISTA\n")
                newFile.write("Routine_%ZO*=VISTA\n")
                newFile.write("Routine_%ZT*=VISTA\n")
                newFile.write("Routine_%ZV*=VISTA\n\n")
                inNamespacesSection = False
                continue

            # Otherwise, just write to the output file
            newFile.write(line + "\n")


# Move the original file to a save file, then make the temporary file the real CPF file
saveFile = absoluteDirName + '/cache.cpf.origsave.' + date.today().strftime("%Y%m%d")
print "Moving %s to %s..." % (originalFile, saveFile)
shutil.move(originalFile, saveFile)

print "Moving %s to %s..." % (tempFile, originalFile)
shutil.move(tempFile, originalFile)