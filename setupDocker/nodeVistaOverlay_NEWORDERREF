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
# Note: NV Docker VERSION 2 may just reuse nodevista user for all
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
# Note: NV Docker VERSION 2 should have fmqlServer.js (as opposed to 
# underlying FMQL addition in a separate container. May also load KIDS?
#
echo "Installing FMQL ..."
cd $vdphome
wget https://demoservices.vistadataproject.info/files/data/FMQL.zip
unzip FMQL.zip
rm FMQL.zip
chown -R vdp:vdp FMQL
su vdp -c "cp FMQL/MUMPS/*.m $basedir/p"
cd FMQL/webservice
mv ../webclients static
mv static/blueversion/* static/.
rmdir static/blueversion
chown -R vdp:vdp static
su vdp -c "source $basedir/etc/env && npm install"
echo "FMQL successfully installed - for use under MVDM"

#
# VISTA Configuration - mainly JS (VDP/VDM) but some residue of Roll'nS Py-based configuration
#
# Note: NV Docker VERSION 2 should do less installation of Patient data, leaving Patient
# data insertion to other images based on a base image AND move at least clinic setup to
# JS and preferably user/patient setup too (even if that requires MUMPS wrappers on
# calls RnS reduces too) ie/ nix Roll and Scroll use all together. 
#

# Copy configurers from /opt/vista into vdp
echo "Copying NV configer from nodeVISTA git ..."
mkdir $vdphome/nvconfiger
nvconfiger="$vdphome/nvconfiger"
cp -r /opt/vista/pySetup $nvconfiger
cp -r /opt/vista/vdpCorrections $nvconfiger
cp -r /opt/vista/jsSetup $nvconfiger
chown -R vdp:vdp $vdphome/nvconfiger

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

jsSetup="$nvconfiger/jsSetup"
cd $jsSetup
su vdp -c "source $basedir/etc/env && npm install --quiet >> /home/vdp/logs/jsNPMInstall.log"
cd $jsSetup/system
echo "setting up Institution, DEVICEs and SYS level parameters ..."
su $vdpid -c "source $basedir/etc/env && node deviceSetup.js &>> $vdplogs/deviceSetup.log"
su $vdpid -c "source $basedir/etc/env && node kspSetup.js &>> $vdplogs/kspSetup.log"
su $vdpid -c "source $basedir/etc/env && node institutionSetup.js &>> $vdplogs/institutionSetup.log"
su $vdpid -c "source $basedir/etc/env && node domainSetup.js &>> $vdplogs/domainSetup.log"
su $vdpid -c "source $basedir/etc/env && node registerVitalsCPRS.js &>> $vdplogs/registerVitalsCPRS.log"

# Py part - Patient reg, User add and FM reinit still done thru Py driven roll and scroll
cd $nvconfiger/pySetup
echo "[py] FM and Patient, User setup not yet in VDM ..."
# su $instance -c "source $basedir/etc/env && python pySetupBasics.py"
su $instance -c "source $basedir/etc/env && python pySetupUserPatient.py"

# Pharmacy setup (maybe CPT in future)
cd $jsSetup/pharmacy
echo "installing system pharmacy"
su $vdpid -c  "source $basedir/etc/env && node pharmacySiteSetup.js &>> $vdplogs/pharmacySiteSetup.log"
su $vdpid -c  "source $basedir/etc/env && node pharmacySystemSetup.js &>> $vdplogs/pharmacySystemSetup.log"
su $vdpid -c  "source $basedir/etc/env && node vdmMedMetaLoad.js &>> $vdplogs/vdmMedMetaLoad.log"
# Not for now - create CPT codes for all terms in the system. This takes a long time, so we only build this
# cd $vdphome/nodevista/setup/jsSetup/cptcodes
# echo "run CPTCodeGenerator.js - Full Install"
# su $vdpid -c  "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && nvm use $nodever && node CPTCodeGenerator.js | tee -a $vdphome/logs/CPTCodeGenerator.log"

# Finish off User and Patient (when both fully in JS, PY roll won't intervene)
echo "Finishing users and patients ..."
cd $jsSetup/user
su $vdpid -c "source $basedir/etc/env && node addUserSettings.js &>> $vdplogs/addUserSettings.log"
su $vdpid -c "source $basedir/etc/env && node updateUserParameters.js &>> $vdplogs/updateUserParameters.log"
cd $jsSetup/patient
su $vdpid -c  "source $basedir/etc/env && node enhanceCarterDavid.js &>> $vdplogs/enhanceCarterDavid.log"
su $vdpid -c  "source $basedir/etc/env && node ppCarterDavidSetup.js &>> $vdplogs/ppCarterDavidSetup.log"

# Back to Py (first thing to go to JS in V2), add clinics required for VDM problem tests that rely on User RA
cd $nvconfiger/pySetup
echo "[py] Clinics too - needed for Problem Tests ..."
su $instance -c "source $basedir/etc/env && python clinicsSetup.py"

#
# Mv entryfile and cleanup scriptdir (/opt/vista) and the usr/local/src entry
#
# ... leaving nvconfiger for use by future scripts that can add more patient and meta data
#
mv $scriptdir/entryCombo.sh $basedir/bin # file required until split out FMQL
chmod a+x $basedir/bin/entryCombo.sh
rm -rf /usr/local/src/VistA-Source
rm -rf $scriptdir


