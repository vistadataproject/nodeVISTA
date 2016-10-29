#!/usr/bin/env bash
# Prepares the CentOS operating system for Cache/user installation

# Make sure we are root
if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root" 1>&2
    exit 1
fi

# Install the epel repo (needed for cmake28)
echo "Updating the CentOS operating system..."
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

echo "Installing utilities..."
yum install -y http://libslack.org/daemon/download/daemon-0.6.4-1.i686.rpm > /dev/null
yum install -y unzip nodejs npm > /dev/null


# Bootstrap the system
echo "Bootstrapping operating system..."
cd /vagrant/VistA/Scripts/Install
./RHEL/bootstrapRHELserver.sh

# Manually add the 'wheel' group to the sudoers list
echo "%wheel       	ALL=(ALL)      	NOPASSWD: ALL" | (EDITOR="tee -a" visudo)

echo "Operating system update complete!"