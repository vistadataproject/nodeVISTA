#!/usr/bin/env bash

vdpid=vdp
vdphome=/home/$vdpid
nodevistahome=/home/nodevista
nodever="4.7.0"

echo "npm install nodevista/setup/jsSetup..."
cd $vdphome/nodevista/setup/jsSetup
su $vdpid -c  "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && nvm use $nodever && npm install --quiet >> $vdphome/logs/jsScriptsNpmInstall.log"

# Create CPT codes for all terms in the system. This takes a long time, so we only build this
# if we're creating a snapshot image
cd $vdphome/nodevista/setup/jsSetup/cptcodes
echo "run CPTCodeGenerator.js - Full Install"
su $vdpid -c  "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && nvm use $nodever && node CPTCodeGenerator.js | tee -a $vdphome/logs/CPTCodeGenerator.log"
