#!/usr/bin/env bash

# Make sure we are root
if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root" 1>&2
    exit 1
fi

while getopts ":p:" option
do
    case $option in
        p)
            project=$OPTARG
            ;;
    esac
done

# Install software for CentOS
cd /vagrant/scripts
./installCentOS.sh
./installCache.sh
./installUser.sh