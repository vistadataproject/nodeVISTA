#!/usr/bin/env bash
# Prepares the CentOS operating system for Cache/user installation

checkSuccess() {
    if [ $? != 0 ]; then
        echo "*** $1 failed with an error (code $?) ***"
        exit $?
    else
        echo "$1 successful!"
    fi
}

# Make sure we are root
if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root" 1>&2
    exit 1
fi

# Install the epel repo (needed for cmake28)
echo "Updating the CentOS operating system..."

# Check to see if we've already run this script. We do this by checking to see if the bootstrapping
# function has been executed successfully; if so, just exit nicely
command -v unzip > /dev/null 2>&1
if [ $? == 0 ]; then
    echo "The CentOS operating system has already been installed!"
    exit 0
fi

cat > /etc/yum.repos.d/epel.repo << EOF
[epel]
name=epel
baseurl=http://download.fedoraproject.org/pub/epel/6/\$basearch
enabled=1
gpgcheck=0
EOF

# Install extra utilities
echo "Updating yum..."
yum update -y
checkSuccess "CentOS package manager update"

echo "Installing utilities..."
yum install -y http://libslack.org/daemon/download/daemon-0.6.4-1.i686.rpm > /dev/null
checkSuccess "Daemon utility install"

yum install -y unzip nodejs npm > /dev/null
checkSuccess "Linux utility (unzip, nodejs, npm) install"


# Bootstrap the system
echo "Bootstrapping operating system..."
cd /vagrant/VistA/Scripts/Install
./RHEL/bootstrapRHELserver.sh
checkSuccess "CentOS bootstrapping"

# Manually add the 'wheel' group to the sudoers list
echo "%wheel       	ALL=(ALL)      	NOPASSWD: ALL" | (EDITOR="tee -a" visudo)

echo "Operating system update complete!"