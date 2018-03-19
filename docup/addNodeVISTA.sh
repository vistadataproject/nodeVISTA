#
# Add nodeVISTA enhancements to the OSEHRA base
#
# 1. add node-support and FMQL
# 2. add nodeVISTA configurations using VDM
#

# #################### 1. node + FMQL #######################

# basedir is set to /home/osehra
# Add p,s for dev MUMPS to VISTA in /home/osehra
mkdir $basedir/{p,p/$gtmver,s,s/$gtmver}
# assuming 6.2 GTM - make sure gtm knows about p and s and uses p before r
perl -pi -e 's#export gtmroutines=\"#export gtmroutines=\"\$basedir/p/\$gtmver\*(\$basedir/p\) \$basedir/s/\$gtmver\*(\$basedir/s\) #' $basedir/etc/env

# Add gcc for nodem (node support for MUMPS)
yum install gcc-c++

# Install node globally (4.* compatible with nodem)
curl --silent --location https://rpm.nodesource.com/setup_4.x | bash -
yum install -y nodejs

# pm2 for managing fmql server
npm install --quiet pm2 -g

# osehra user - add to its GT/M to support nodem
su osehra
# Setup GTM C Callin
# with nodem 0.8.1 the name of the ci has changed. Determine using ls -1
calltab=$(ls -1 $basedir/node_modules/nodem/resources/*.ci)
echo "export GTMCI=$calltab" >> $basedir/etc/env
echo "export gtmroutines=\"\${gtmroutines}\"\" \"\$basedir/node_modules/nodem/src" >> $basedir/etc/env
exit

# Add VDP User (will install nodevista specials and FMQL here)
useradd -c "VDP User" -m -U "vdp" -s /bin/bash -G osehra
echo vdp:vdp | chpasswd

# In /home/vdp
su vdp
cd 
echo "source $basedir/etc/env" >> ~/.bashrc
source .bashrc
mkdir logs

# put support for nodem right in vdp 
npm install --quiet nodem >> logs/nodemInstall.log 

# FMQL setup and start
wget https://demoservices.vistadataproject.info/files/data/FMQL.zip
unzip FMQL.zip
cd FMQL/webservice
mv ../webclients static
npm install
pm2 start fmqlServer.js && pm2 save >> ~/logs/fmqlStartup.log

# ############## 2. install nodeVISTA configurations using VDM ############

# still vdp in /home/vdp
cd
git clone -q https://github.com/vistadataproject/VDM.git
cp VDM/prototypes/*.m $basedir/p/.
# chown osehra:osehra /home/osehra/p/VDP* <---- have to be SU ... ie/ back to root
cd VDM/prototypes
npm install --quiet >> ~/logs/VDMNpmInstall.log

# Setups (inside nodeVISTA - TODO: isolate setups)
cd
git clone -q https://github.com/vistadataproject/nodevista.git
cd ~/nodevista/setup
npm install --quiet nodem >> logs/nodemInstall.log

cd /home/vdp/nodevista/setup/vdpCorrections
# PROBLEM: VDPCorrectionsGTM.m ... hard coded to /home/nodevista ... /home/osehra unless we change on entry
node vdpCorrections.js >> ~/logs/vdpCorrections.log
cd ../jsSetup
node addUserSettings.js >> ~/logs/addUserSettings.log
node registerVitalsCPRS.js >> ~/logs/registerVitalsCPRS.log
cd parameters
node updateNodeVISTAParameters.js >> ~/logs/updateNodeVISTAParameters.log
cd ../system
node introMsg.js >> ~/logs/introMsg.log
cd ../pharmacy
node pharmacySiteSetup.js >> ~/logs/pharmacySiteSetup.log
node pharmacySystemSetup.js >> ~/logs/pharmacySystemSetup.log
node vdmMedMetaLoad.js >> ~/logs/vdmMedMetaLoad.log
node ppCarterDavidSetup.js >> ~/logs/ppCarterDavidSetup.log
cd ../patient
node updatePatients.js >> ~/logs/updatePatients.log

