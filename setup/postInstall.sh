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

# Reduce the size of the VM box image a little
# Credits to:
#  - http://vstone.eu/reducing-vagrant-box-size/
#  - https://github.com/mitchellh/vagrant/issues/343

# Remove APT cache
apt-get clean -y
apt-get autoclean -y

# Zero free space to aid VM compression
dd if=/dev/zero of=/EMPTY bs=1M
rm -f /EMPTY

# Remove bash history
unset HISTFILE
rm -f /root/.bash_history
rm -f /home/vagrant/.bash_history

# Cleanup log files
find /var/log -type f | while read f; do echo -ne '' > $f; done;

# What the following commands are doing is simply writing zero bytes to the wipefile in chunks of
# 1024 bytes until there is no disk space left in your VM’s disk. Then it is removing the wipefile.
# This basically leaves all those excess bytes zero’d out.
# Whiteout root
count=`df --sync -kP / | tail -n1  | awk -F ' ' '{print $4}'`;
let count--
dd if=/dev/zero of=/tmp/whitespace bs=1024 count=$count;
rm /tmp/whitespace;

# Whiteout /boot
count=`df --sync -kP /boot | tail -n1 | awk -F ' ' '{print $4}'`;
let count--
dd if=/dev/zero of=/boot/whitespace bs=1024 count=$count;
rm /boot/whitespace;

swappart=`cat /proc/swaps | tail -n1 | awk -F ' ' '{print $1}'`
swapoff $swappart;
dd if=/dev/zero of=$swappart;
mkswap $swappart;
swapon $swappart;
