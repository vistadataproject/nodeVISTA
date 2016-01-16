# After 'vagrant up' first but want in post hook of osehra setup
# and want -s to skip testing, -p for post hook, -e (ewd) as want npm for now
# and leave instance as osehra ... go 2 can change it

vdpid=vdp9
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
echo "nvm use $nodever" >> $vdphome/.profile

cd $vdphome

# git clone nodeVISTA into /tmp and take parts
echo "Cloning nodeVISTA client code for use by $vdpid"
git clone -q https://github.com/vistadataproject/nodeVISTA.git
su $vdpid -c "cp -r nodeVISTA/nodemExamples ."
su $vdpid -c "cp -r nodeVISTA/fmql ."
su $vdpid -c "cp -r nodeVISTA/Commands ."
rm -rf nodeVISTA

# install nodem in node_modules in $HOME
echo "Installing 'nodem' for $vdpid"
su $vdpid -c "mkdir logs"
su $vdpid -c "source $osehrahome/.nvm/nvm.sh && source $osehrahome/etc/env && nvm use $nodever && npm install --quiet nodem >> logs/nodemInstall.log"

# copy in FMQL MUMPS directly into OSEHRA VISTA p
# echo "Adding FMQL (MUMPS) to osehraVISTA"
# git clone -q https://github.com/caregraf/FMQL.git
# su $vdpid -c "cp FMQL/MUMPS/*.m $osehrahome/p"
# su $vdpid -c "chown osehra:osehra $osehrahome/p/FMQL*"
# rm -r FMQL

# Ensure group permissions are correct
chmod -R g+rw /home/$vdpid

echo "User $vdpid created"