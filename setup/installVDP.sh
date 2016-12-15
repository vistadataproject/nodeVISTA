#!/usr/bin/env bash
# After 'vagrant up' first but want in post hook of osehra setup
# and want -s to skip testing, -p for post hook, -e (ewd) as want npm for now
# and leave instance as osehra ... go 2 can change it
# ... one issue: why npm install for fmqlServer doesn't reuse top level node_modules nodem
# ... another: recheck FMQL MUMPS copying

#
# TODO: move over to new form of nodeVISTA and VDM + extra steps like osehra vista key change
#

vdpid=vdp
test -d /home/$vdpid &&
{ echo "VISTA Data Project user $vdpid already Installed. Aborting."; exit 0; }
echo "Creating VISTA Data Project user, $vdpid"
vdphome=/home/$vdpid
osehrahome=/home/osehra

echo "Mimicing the .profile and .bashrc of user osehra"

# Create $vdpid user - make sure it is in the osehra group
sudo useradd -c "VDP User" -m -U "$vdpid" -s /bin/bash -G sudo,osehra
echo $vdpid:vistaisdata | sudo chpasswd

# Copy unique end of .bashrc of /home/osehra and add an extra
echo "" >> $vdphome/.bashrc
echo "source $osehrahome/etc/env" >> $vdphome/.bashrc
# osehra uses Node Version Manager (EWD sets it up)
echo "export NVM_DIR=\"$osehrahome/.nvm\"" >> $vdphome/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"' >> $vdphome/.bashrc 
# VDP Extra: override 'gtm_tmp' to /tmp to avoid write/link errors"
echo "export gtm_tmp=/tmp" >> $vdphome/.bashrc
# Copy unique end of .profile of osehra
echo "source $osehrahome/.nvm/nvm.sh" >> $vdphome/.profile
# Set nodever ala EWD/ewd.js. Otherwise $nodever .profile won't exist and npm install below will fail
nodever="4.7.0"
echo "nvm use $nodever" >> $vdphome/.profile

cd $vdphome

# install nodem in node_modules in $HOME
echo "Installing 'nodem' for $vdpid - slowest piece"
su $vdpid -c "mkdir logs"
su $vdpid -c "source $osehrahome/.nvm/nvm.sh && source $osehrahome/etc/env && nvm use $nodever && npm install --quiet nodem >> $vdphome/nodemInstall.log"

echo "Cloning nodeVISTA and VDM for use by $vdpid"
git clone -q https://github.com/vistadataproject/nodeVISTA.git
git clone -q https://github.com/vistadataproject/VDM.git

# Add FMQL x 2
echo "Cloning FMQL MUMPS and One Page Clients for use by $vdpid"
git clone -q https://github.com/caregraf/FMQL.git

#change ownership of git clones to vdp
chown -R vdp:vdp nodeVISTA
chown -R vdp:vdp VDM
chown -R vdp:vdp FMQL

# echo "Adding FMQL (MUMPS) to osehraVISTA"
su $vdpid -c "cp FMQL/MUMPS/*.m $osehrahome/p"
echo "... further FMQL steps need to be done manually - will be automated by Dec 16th"

#install pm2 (production process manager for node see pm2.keymetrics.io)
su $vdpid -c "source $osehrahome/.nvm/nvm.sh && source $osehrahome/etc/env && nvm use $nodever && npm install --quiet pm2 -g >> $vdphome/pm2Install.log"

#install FMQL node package
su $vdpid -c "source $osehrahome/.nvm/nvm.sh && source $osehrahome/etc/env && cd $vdphome/FMQL/webservice && nvm use $nodever && npm install --quiet >> $vdphome/logs/fmqlInstall.log"

#copy in webclient files, rename to directory to static
cd $vdphome/FMQL/webservice
cp -r ../webclients .
mv webclients static
chown -R vdp:vdp static

cd $vdphome

#start up fmqlServer using pm2 and save settings
su $vdpid -c "source $osehrahome/.nvm/nvm.sh && source $osehrahome/etc/env && pm2 start fmqlServer.js && pm2 save >> $vdphome/logs/fmqlStartup.log"

#make pm2 startup automatically
sudo su -c "env PATH=$PATH:/home/osehra/.nvm/versions/node/v4.7.0/bin /home/osehra/.nvm/versions/node/v4.7.0/lib/node_modules/pm2/bin/pm2 startup systemd -u vdp --hp /home/vdp"


# Ensure group permissions are correct
chmod -R g+rw /home/$vdpid

echo "User $vdpid created"
