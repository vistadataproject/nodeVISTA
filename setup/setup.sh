#!/usr/bin/env bash

SECONDS=0

# Make sure we are root
if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root" 1>&2
    exit 1
fi

#install node 4.7.0 (nodem supports up to 4.7.0)
nodever="4.7.0"

# Set the node version
shortnodever=$(echo $nodever | cut -d'.' -f 2)

# set the arch
arch=$(uname -m | tr -d _)

# This should be ran as the instance owner to keep all of VistA together
if [[ -z $basedir ]]; then
    echo "The required variable \$instance is not set"
fi

echo "Installing node.js via NVM (node version manager)"

cd $basedir

#install vim as convenient editor
sudo apt-get update
sudo apt-get -y install vim

#set variables
instance="nodevista"
repoPath="https://github.com/OSEHRA/VistA-M.git"
nodever="4.7.0"
nodemver="0.8.1"

# Get primary username if using sudo, default to $username if not sudo'd
if [[ -n "$SUDO_USER" ]]; then
    primaryuser=$SUDO_USER
elif [[ -n "$USERNAME" ]]; then
    primaryuser=$USERNAME
else
    echo Cannot find a suitable username to add to VistA group
    exit 1
fi

echo This script will add $primaryuser to the VistA group

# Abort provisioning if it appears that an instance is already installed.
test -d /home/$instance/g &&
{ echo "VistA already Installed. Aborting."; exit 0; }


# control interactivity of debian tools
export DEBIAN_FRONTEND="noninteractive"

# extra utils - used for cmake and dashboards and initial clones
echo "Updating operating system"
apt-get update -qq > /dev/null
apt-get install -qq -y build-essential cmake-curses-gui git dos2unix daemon > /dev/null

# Clone repos
cd /usr/local/src
git clone -q https://github.com/OSEHRA/VistA -b dashboard VistA-Dashboard

#assumes script is using vagrant
if ! [ -d /vagrant ]; then
    echo "This scripts assumes you are utilizing Vagrant. Terminating install."; exit 0;
fi

scriptdir=/vagrant

# Fix line endings
find /vagrant -name \"*.sh\" -type f -print0 | xargs -0 dos2unix > /dev/null 2>&1
dos2unix /vagrant/GTM/etc/init.d/vista > /dev/null 2>&1
dos2unix /vagrant/GTM/etc/xinetd.d/vista-rpcbroker > /dev/null 2>&1
dos2unix /vagrant/GTM/etc/xinetd.d/vista-vistalink > /dev/null 2>&1
dos2unix /vagrant/GTM/gtminstall_SHA1 > /dev/null 2>&1

# bootstrap the system
cd $scriptdir

# Update the server from repositories
apt-get -y -qq update > /dev/null
apt-get -y -qq upgrade > /dev/null

# Install baseline packages
apt-get install -y -qq git xinetd perl wget curl python ssh mysql-server default-jdk maven sshpass > /dev/null

# Ensure scripts know that we are installing for ubuntu
export ubuntu=true;

# Install GTM
cd GTM
./install.sh -v V6.2-000

# Create the VistA instance
./createVistaInstance.sh -i $instance

# Modify the primary user to be able to use the VistA instance
usermod -a -G $instance $primaryuser
chmod g+x /home/$instance

# Setup environment variables so the dashboard can build
# have to assume $basedir since this sourcing of this script will provide it in
# future commands
source /home/$instance/etc/env

# Get running user's home directory
# http://stackoverflow.com/questions/7358611/bash-get-users-home-directory-when-they-run-a-script-as-root
USER_HOME=$(getent passwd $SUDO_USER | cut -d: -f6)

# source env script during running user's login
echo "source $basedir/etc/env" >> $USER_HOME/.bashrc

#Install node.js using NVM (node version manager)
echo "Installing NVM"
su $instance -c  "curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash"
su $instance -c  "export NVM_DIR=\"$basedir/.nvm\""
su $instance -c  "[ -s \"$NVM_DIR/nvm.sh\" ] && \. \"$NVM_DIR/nvm.sh\"  # This loads nvm"
echo "Done installing NVM"

# Install node
su $instance -c "source $basedir/.nvm/nvm.sh && nvm install $nodever && nvm alias default $nodever && nvm use default"

# Tell $basedir/etc/env our nodever
echo "export nodever=$nodever" >> $basedir/etc/env

# Tell nvm to use the node version in .profile or .bash_profile
if [ -s $basedir/.profile ]; then
    echo "source \$HOME/.nvm/nvm.sh" >> $basedir/.profile
    echo "nvm use $nodever" >> $basedir/.profile
fi

if [ -s $basedir/.bash_profile ]; then
    echo "source \$HOME/.nvm/nvm.sh" >> $basedir/.bash_profile
    echo "nvm use $nodever" >> $basedir/.bash_profile
fi

# Create directories for node
su $instance -c "source $basedir/etc/env"

# Install required node modules
cd $basedir
su $instance -c "source $basedir/.nvm/nvm.sh && source $basedir/etc/env && nvm use $nodever && npm install --quiet nodem@$nodemver >> $basedir/log/nodemInstall.log"

# Setup GTM C Callin
# with nodem 0.8.1 the name of the ci has changed. Determine using ls -1
calltab=$(ls -1 $basedir/node_modules/nodem/resources/*.ci)
echo "export GTMCI=$calltab" >> $basedir/etc/env

# Ensure nodem routines are in gtmroutines search path
echo "export gtmroutines=\"\${gtmroutines}\"\" \"\$basedir/node_modules/nodem/src" >> $basedir/etc/env

echo "Done installing node.js"

# Replace dashboard test with straight non test installation
# Clone VistA-M repo
cd /usr/local/src
git clone --depth 1 $repoPath VistA-Source

#keep in order to speed up deployment in (development) by copying from local/VistA-Source to vm instead of using git clone
#sudo mkdir /usr/local/src/VistA-Source
#sudo cp -rf /vagrant/VistA-Source/. /usr/local/src/VistA-Source

# Not Ideal - nodevista for pyVISTA - .mjo etc written in here by GTM as runs Py scripts
#git clone https://github.com/vistadataproject/nodevista.git
git clone -b replacing-python-xpar-with-parameter-service --single-branch https://github.com/vistadataproject/nodevista.git

#install vdp
vdpid=vdp
test -d /home/$vdpid &&
{ echo "VISTA Data Project user $vdpid already Installed. Aborting."; exit 0; }
echo "Creating VISTA Data Project user, $vdpid"
vdphome=/home/$vdpid
nodevistahome=/home/nodevista

echo "Mimicing the .profile and .bashrc of user nodevista"

# Create $vdpid user - make sure it is in the nodevista group
sudo useradd -c "VDP User" -m -U "$vdpid" -s /bin/bash -G sudo,nodevista
echo $vdpid:vdp | sudo chpasswd

# Copy unique end of .bashrc of /home/nodevista and add an extra
echo "" >> $vdphome/.bashrc
echo "source $nodevistahome/etc/env" >> $vdphome/.bashrc
# nodevista uses Node Version Manager 
echo "export NVM_DIR=\"$nodevistahome/.nvm\"" >> $vdphome/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"' >> $vdphome/.bashrc
# VDP Extra: override 'gtm_tmp' to /tmp to avoid write/link errors"
echo "export gtm_tmp=/tmp" >> $vdphome/.bashrc
# Copy unique end of .profile of nodevista
echo "source $nodevistahome/.nvm/nvm.sh" >> $vdphome/.profile
# Set nodever. Otherwise $nodever .profile won't exist and npm install below will fail
echo "nvm use $nodever" >> $vdphome/.profile

cd $vdphome

# install nodem in node_modules in $HOME
echo "Installing 'nodem' for $vdpid - slowest piece"
su $vdpid -c "mkdir logs"
su $vdpid -c "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && nvm use $nodever && npm install --quiet nodem@$nodemver >> $vdphome/nodemInstall.log"

echo "Cloning nodevista and VDM for use by $vdpid"
#git clone -q https://github.com/vistadataproject/nodevista.git
git clone -b replacing-python-xpar-with-parameter-service --single-branch https://github.com/vistadataproject/nodevista.git
git clone -q https://github.com/vistadataproject/VDM.git

echo "running my node.js parameter service setup scripts"
echo "npm install..."

# Add FMQL x 2
echo "Cloning FMQL MUMPS and One Page Clients for use by $vdpid"
git clone -q https://github.com/caregraf/FMQL.git

#change ownership of git clones to vdp
chown -R vdp:vdp nodevista
chown -R vdp:vdp VDM
chown -R vdp:vdp FMQL

cd $vdphome

echo "Installing FMQL"
#install pm2 (production process manager for node see pm2.keymetrics.io)
su $vdpid -c "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && nvm use $nodever && npm install --quiet pm2 -g >> $vdphome/pm2Install.log"

#make pm2 startup automatically
sudo su -c "env PATH=$PATH:/home/nodevista/.nvm/versions/node/v4.7.0/bin /home/nodevista/.nvm/versions/node/v4.7.0/lib/node_modules/pm2/bin/pm2 startup systemd -u vdp --hp /home/vdp"

#install FMQL node package
su $vdpid -c "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && cd $vdphome/FMQL/webservice && nvm use $nodever && npm install --quiet >> $vdphome/logs/fmqlInstall.log"

#copy in webclient files, rename to directory to static
cd $vdphome/FMQL/webservice
cp -r ../webclients .
mv webclients static
chown -R vdp:vdp static

#install jasmine
echo "Installing Jasmine"
su $vdpid -c "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && nvm use $nodever && npm install --quiet jasmine -g >> $vdphome/nodemInstall.log"

#install bower
echo "Installing Bower"
su $vdpid -c "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && nvm use $nodever && npm install --quiet bower -g >> $vdphome/nodemInstall.log"

#copy over /vagrant/utils - for fixes that go through JS and not pySetup
cd $vdphome
cp -r /vagrant/utils .
chown -R vdp:vdp utils

echo "User $vdpid created"

echo "Running npm install on /vagrant/utils"
su $vdpid -c "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && cd $vdphome/utils && nvm use $nodever && npm install --quiet >> $vdphome/logs/utilsNPMInstall.log"

#apply problem data dictionary fix
echo "Applying problem data dictionary fix (fixDD.js)"
su $vdpid -c "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && cd $vdphome/utils && nvm use $nodever && node fixProblemAuditDD.js >> $vdphome/logs/fixProblemAuditDD.log"

rm -rf utils

# Ensure group permissions are correct
chmod -R g+rw /home/$vdpid

#***
cd $basedir
su $instance -c "source $basedir/etc/env && $scriptdir/GTM/importVistA.sh"

# Python and RAS driven changes (note: some JS parameters settings below. Should combine)
cd /usr/local/src/nodevista/setup/pySetup
mkdir /usr/local/src/nodevista/setup/pySetup/logs
chmod a+w /usr/local/src/nodevista/setup/pySetup
chmod a+w /usr/local/src/nodevista/setup/pySetup/logs
# NB: this has to run BEFORE gtmroutines is changed as MUMPS is hardcoded to see /r in first position
su $instance -c "source $basedir/etc/env && python ZTMGRSET.py"
# TODO: should exit if simpleSetup.py fails
su $instance -c "source $basedir/etc/env && python simpleSetup.py"
#su $instance -c "source $basedir/etc/env && python clinicsSetup.py"

# enable journaling
su $instance -c "source $basedir/etc/env && $basedir/bin/enableJournal.sh"

#npm install on VDM prototypes
echo "npm install VDM prototypes..."
cd $vdphome/VDM/prototypes
su $vdpid -c  "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && nvm use $nodever && npm install --quiet >> $vdphome/logs/VDMNpmInstall.log"

echo "npm install nodevista/setup/jsSetup..."
cd $vdphome/nodevista/setup/jsSetup
su $vdpid -c  "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && nvm use $nodever && npm install --quiet >> $vdphome/logs/registerVitalsSetupNpmInstall.log"

# using parameter service to inject user level settings
echo "run addUserSettings.js"
su $vdpid -c  "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && nvm use $nodever && node addUserSettings.js >> $vdphome/logs/addUserSettings.log"

# using parameter service to inject system level settings
echo "run registerVitalsCPRS.js"
su $vdpid -c  "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && nvm use $nodever && node registerVitalsCPRS.js >> $vdphome/logs/registerVitalsCPRS.log"

cd $basedir
cd /usr/local/src/nodevista/setup/pySetup
su $instance -c "source $basedir/etc/env && python clinicsSetup.py"

echo "Restarting xinetd"
service xinetd restart
echo "Done restarting xinetd"

# Add p and s directories to gtmroutines environment variable
su $instance -c "mkdir $basedir/{p,p/$gtmver,s,s/$gtmver}"
if [[ $gtmver == *"6.2"* ]]; then
    echo "Adding Development directories for GT.M 6.2"
    perl -pi -e 's#export gtmroutines=\"#export gtmroutines=\"\$basedir/p/\$gtmver\*(\$basedir/p\) \$basedir/s/\$gtmver\*(\$basedir/s\) #' $basedir/etc/env
else
    echo "Adding Development directories for GT.M <6.2"
    perl -pi -e 's#export gtmroutines=\"#export gtmroutines=\"\$basedir/p/\$gtmver\(\$basedir/p\) \$basedir/s/\$gtmver\(\$basedir/s\) #' $basedir/etc/env
fi

cd $vdphome

# echo "Adding FMQL (MUMPS) to nodevistaVISTA"
su $vdpid -c "cp FMQL/MUMPS/*.m $nodevistahome/p"
#***

cd $vdphome/FMQL/webservice
#start up fmqlServer using pm2 and save settings
echo "Running FMQL as a service via pm2"
su $vdpid -c "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && pm2 start fmqlServer.js && pm2 save >> $vdphome/logs/fmqlStartup.log"

echo "Restarting nodevista"
service nodevista restart
echo "Done restarting nodevista"

#start up rpcServer using pm2 and save settings
echo "Running rpcServer as a service via pm2"
su $vdpid -c "source $nodevistahome/.nvm/nvm.sh && source $nodevistahome/etc/env && cd $vdphome/nodevista/rpcServer && npm install --quiet && bower install --quiet && pm2 start rpcServer.js && pm2 save >> $vdphome/logs/rpcServerStartup.log"

duration=$SECONDS
echo "$(($duration / 3600)) hours, $((($duration / 60) % 60)) minutes and $(($duration % 60)) seconds elapsed."
echo "Setup Complete"
