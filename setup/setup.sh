#!/usr/bin/env bash

# Make sure we are root
if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root" 1>&2
    exit 1
fi

#set variables
instance = "osehra"
repoPath = "https://github.com/OSEHRA/VistA-M.git"


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
# Note: Amazon EC2 requires two apt-get update commands to get everything
echo "Updating operating system"
apt-get update -qq > /dev/null
apt-get update -qq > /dev/null
apt-get install -qq -y build-essential cmake-curses-gui git dos2unix daemon > /dev/null

# Clone repos
cd /usr/local/src
git clone -q https://github.com/OSEHRA/VistA -b dashboard VistA-Dashboard

#assumes script is using vagrant
test -d /home/$instance/g &&
scriptdir=/vagrant

# Fix line endings
find /vagrant -name \"*.sh\" -type f -print0 | xargs -0 dos2unix > /dev/null 2>&1
dos2unix /vagrant/EWD/etc/init.d/ewdjs > /dev/null 2>&1
dos2unix /vagrant/GTM/etc/init.d/vista > /dev/null 2>&1
dos2unix /vagrant/GTM/etc/xinetd.d/vista-rpcbroker > /dev/null 2>&1
dos2unix /vagrant/GTM/etc/xinetd.d/vista-vistalink > /dev/null 2>&1
dos2unix /vagrant/GTM/gtminstall_SHA1 > /dev/null 2>&1

