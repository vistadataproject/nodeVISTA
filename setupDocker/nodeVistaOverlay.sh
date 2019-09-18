#!/bin/bash

echo "================== now in nodeVISTAOverlay ================"

# This is an overlay on a basic OSEHRA VISTA install and $basedir, $instance etc should be set
# Expect node and pm2 to be installed aswell on a gcc-c++ (for nodem compile) supporting Linux
scriptdir=/opt/vista
instance=nodevista
basedir=/home/$instance
source $basedir/etc/env

# Add node support to GTM-based nodeVISTA 
cd /home/nodevista 
su $instance -c "npm install --quiet nodem >> log/nodemInstall.log"
chmod a+w /home/nodevista/node_modules/nodem/src
calltab=$(ls -1 /home/nodevista/node_modules/nodem/resources/*.ci)
echo "export GTMCI=$calltab" >> /home/nodevista/etc/env
echo "export gtmroutines=\"\${gtmroutines}\"\" \"\/home/nodevista/node_modules/nodem/src" >> /home/nodevista/etc/env
# env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u vdp --hp /home/vdp ... for PM2 TODO
# https://serverfault.com/questions/824975/failed-to-get-d-bus-connection-operation-not-permitted to fix error

# Add vdp user and ensure same setup as nodevista user
useradd -c "VDP User" -m -U "vdp" -s /bin/bash -G nodevista
echo vdp:vdp | chpasswd
echo "source /home/nodevista/etc/env" >> /home/vdp/.bashrc
mkdir /home/vdp/logs
chown -R vdp:vdp /home/vdp/logs
vdpid="vdp"
vdphome="/home/vdp"
vdplogs="/home/vdp/logs"

#
# FMQL setup and start - move AFTER VISTA setup AND start from docker
#
# TODO: move out to own docker as a service BUT do need need for MVDM
# load to work (need to install it in node_modules ala mvdm install
# a/cing for MUMPS copy too. Pkg MUMPS in full install too)
#
echo "Installing FMQL ..."
cd $vdphome
# wget https://demoservices.vistadataproject.info/files/data/FMQL.zip
git clone https://github.com/caregraf/FMQLv1.git
cd FMQLv1/Releases
mv FMQL.zip ../../
cd $vdphome
rm -rf FMQLv1
unzip FMQL.zip
rm -f FMQL.zip
chown -R vdp:vdp FMQL
su vdp -c "cp FMQL/MUMPS/*.m $basedir/p"
cd FMQL/webservice
# mv ../webclients static
# mv static/blueversion/* static/.
# rmdir static/blueversion
chown -R vdp:vdp static
# mv $scriptdir/fmqlPackage.json package.json
# chown vdp:vdp package.json
su vdp -c "source $basedir/etc/env && npm install"
echo "FMQL successfully installed - for use under MVDM"

#
# VISTA Configuration - both Python and JS (VDP/VDM) based configuration
#
# Note: NV Docker VERSION 2 should do less installation of Patient data, leaving Patient
# data insertion to other images based on a base image. Only NULL device, domain,
# KSP etc should be setup in the base image along with a well structured multi-division
# hospital.
#

# Copy configurers from /opt/vista into vdp
mkdir $vdphome/nvconfiger
nvconfiger="$vdphome/nvconfiger"
cp -r /opt/vista/pySetup $nvconfiger
cp -r /opt/vista/vdpCorrections $nvconfiger
cp -r /opt/vista/jsSetup $nvconfiger
cp -r /opt/vista/jsSetupNew $nvconfiger
chown -R vdp:vdp $vdphome/nvconfiger

# First Python-based simple setup relying on old OSEHRA utilities
cd $nvconfiger/pySetup
echo "[py] basic setup (device, domain etc)"
su $instance -c "source $basedir/etc/env && python simpleSetup.py"
echo "[py] add users, patients"
su $instance -c "source $basedir/etc/env && python simpleSetup2.py"
echo "[py] add clinics"
su $instance -c "source $basedir/etc/env && python clinicsSetup.py" # docker v2 cleanup 

# Need VDM git M utilities into NV to support use of (M)VDM for configuration.
# The mvdm module (MVDM git) is used in configure below. Should be separate M under docker nv setup 
# but want to ensure get latest from VDM for now
cd $vdphome
git clone -q https://github.com/vistadataproject/VDM.git
chown -R vdp:vdp VDM
su vdp -c "cp $vdphome/VDM/prototypes/*.m /home/nodevista/p"
rm -rf $vdphome/VDM 

cd $nvconfiger/vdpCorrections
echo "Applying data dictionary and GT/M portability fixes to FOIA"
su vdp -c "source $basedir/etc/env && npm install --quiet >> /home/vdp/logs/vdpCNPMInstall.log"
su vdp -c "source $basedir/etc/env && node vdpCorrections.js &>> /home/vdp/logs/vdpCorrections.log"

# Interleave new and old jsSetup - need to move completely to new in Docker V2
jsSetup="$nvconfiger/jsSetup"
cd $jsSetup
su vdp -c "source $basedir/etc/env && npm install --quiet >> /home/vdp/logs/jsSetupNPMInstall.log"
jsSetupNew="$nvconfiger/jsSetupNew"
cd $jsSetupNew
su vdp -c "source $basedir/etc/env && npm install --quiet >> /home/vdp/logs/jsSetupNewNPMInstall.log"

cd $jsSetup
# using parameter service to inject user level settings
echo "run addUserSettings.js"
su $vdpid -c "source $basedir/etc/env && node addUserSettings.js &>> $vdplogs/addUserSettings.log"
# using parameter service to inject system level settings
echo "run registerVitalsCPRS.js"
su $vdpid -c "source $basedir/etc/env && node registerVitalsCPRS.js &>> $vdplogs/registerVitalsCPRS.log"
# inject additional nodeVista parameters
cd $jsSetup/parameters
echo "run updateNodeVISTAParameters.js"
su $vdpid -c "source $basedir/etc/env && node updateNodeVISTAParameters.js &>> $vdplogs/updateNodeVISTAParameters.log"
# setup splash screen
cd $jsSetupNew/system
echo "run (new) ksp setup ..."
su $vdpid -c "source $basedir/etc/env && node kspSetup.js &>> $vdplogs/kspSetup.log"
echo "run (new) institution setup ..."
su $vdpid -c "source $basedir/etc/env && node institutionSetup.js &>> $vdplogs/institutionSetup.log"
echo "run (new) device setup ..."
su $vdpid -c "source $basedir/etc/env && node deviceSetup.js &>> $vdplogs/deviceSetup.log"
# Removed Install of Pharmacy (for now) due to 50 update error (see README in directory) 9/19
# echo "installing pharmacy"
# cd $jsSetup/pharmacy
# su $vdpid -c  "source $basedir/etc/env && node pharmacySiteSetup.js &>> $vdplogs/pharmacySiteSetup.log"
# su $vdpid -c  "source $basedir/etc/env && node pharmacySystemSetup.js &>> $vdplogs/pharmacySystemSetup.log"
# su $vdpid -c  "source $basedir/etc/env && node vdmMedMetaLoad.js &>> $vdplogs/vdmMedMetaLoad.log"
# su $vdpid -c  "source $basedir/etc/env && node ppCarterDavidSetup.js &>> $vdplogs/ppCarterDavidSetup.log"
# update patient records
echo "run updatePatients.js"
cd $jsSetup/patient
su $vdpid -c  "source $basedir/etc/env && node updatePatients.js &>> $vdplogs/updatePatients.log"
# Not for now - create CPT codes for all terms in the system. This takes a long time, so we only build this
# cd $vdphome/nodevista/setup/jsSetup/cptcodes
# echo "run CPTCodeGenerator.js - Full Install"
# su $vdpid -c  "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && nvm use $nodever && node CPTCodeGenerator.js | tee -a $vdphome/logs/CPTCodeGenerator.log"

#
# Mv entryfile and cleanup scriptdir (/opt/vista) and the usr/local/src entry
#
# ... leaving nvconfiger for use by future scripts that can add more patient and meta data
#
mv $scriptdir/entryCombo.sh $basedir/bin # file required until split out FMQL
chmod a+x $basedir/bin/entryCombo.sh
rm -rf /usr/local/src/VistA-Source
rm -rf $scriptdir


