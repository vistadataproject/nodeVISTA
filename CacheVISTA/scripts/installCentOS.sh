#!/usr/bin/env bash

# Make sure we are root
if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root" 1>&2
    exit 1
fi

instance="osehra"

# Abort provisioning if it appears that an instance is already installed.
test -d /home/$instance/g &&
{ echo "VistA already Installed. Aborting."; exit 0; }

# Install the epel repo (needed for cmake28)
cat > /etc/yum.repos.d/epel.repo << EOF
[epel]
name=epel
baseurl=http://download.fedoraproject.org/pub/epel/6/\$basearch
enabled=1
gpgcheck=0
EOF

# extra utils - used for cmake and dashboards and initial clones
echo "Updating operating system"
yum update -y > /dev/null
yum install -y cmake28 git dos2unix > /dev/null
yum install -y http://libslack.org/daemon/download/daemon-0.6.4-1.i686.rpm > /dev/null
yum install -y unzip > /dev/null

# Fix cmake28 links
ln -s /usr/bin/cmake28 /usr/bin/cmake
ln -s /usr/bin/ctest28 /usr/bin/ctest
ln -s /usr/bin/ccmake28 /usr/bin/ccmake
ln -s /usr/bin/cpack28 /usr/bin/cpack

# See if vagrant folder exists if it does use it. if it doesn't clone the repo
if [ -d /vagrant ]; then
    scriptdir=/vagrant/VistA/Scripts/Install
else
    git clone -q https://github.com/OSEHRA/VistA
    scriptdir=/usr/local/src/VistA/Scripts/Install
fi

echo "%wheel       	ALL=(ALL)      	NOPASSWD: ALL" | (EDITOR="tee -a" visudo)

# bootstrap the system
cd $scriptdir
./RHEL/bootstrapRHELserver.sh
