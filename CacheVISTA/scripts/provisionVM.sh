#!/usr/bin/env bash
# VistA Caché VM provisioner script, run by Vagrant

# Make sure we are root
if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root" 1>&2
    exit 1
fi

yum install -y dos2unix

echo "Fixing script files for Linux..."
find /vagrant/scripts -name "*.sh" -type f | xargs dos2unix
find /vagrant/VistA -name "*.sh" -type f | xargs dos2unix
find /vagrant/VistA -name "cache" -type f | xargs dos2unix

# Install software for CentOS
cd /vagrant/scripts
./installCentOS.sh
./installCache.sh
./installUser.sh