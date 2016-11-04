#!/usr/bin/env bash
# VistA Caché VM provisioner script, run by Vagrant

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

yum install -y dos2unix
checkSuccess "Installation of 'dos2unix' utility"

echo "Fixing script files for Linux..."
find /vagrant/scripts -name "*.sh" -type f | xargs dos2unix > /dev/null 2>&1
find /vagrant/VistA -name "*.sh" -type f | xargs dos2unix > /dev/null 2>&1
find /vagrant/VistA -name "cache" -type f | xargs dos2unix > /dev/null 2>&1

# Install software for CentOS
cd /vagrant/scripts

./installCentOS.sh
checkSuccess "CentOS installation script"

./installCache.sh
checkSuccess "Cache installation script"

./installUser.sh
checkSuccess "User setup installation script"