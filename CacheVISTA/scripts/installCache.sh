#!/usr/bin/env bash
# Installs Intersystems Caché in an automated way

# This utility requires root privliges
if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root" 1>&2
    exit 1
fi

# Hack for CentOS to make the Cache installer think we're installing on RHEL
cp /etc/redhat-release /etc/redhat-release.orig
echo "Red Hat Enterprise Linux (Santiago) release 6" > /etc/redhat-release



# Install a clean copy of Cache from an installer package
instance=cache
scriptdir=`dirname $0`
cache_home=/opt/cachesys/$instance

# Check to see if the Cache RHEL x64 installer is present in the "resources" directory
echo "Checking for Caché installer..."
cache_package_file=`ls -1 /vagrant/resources/*lnxrhx64.tar.gz | head -n 1`
if [[ -z $cache_package_file ]]; then
    echo "Couldn't find Cache Installer package!"
    exit 1
fi
cache_package_file_name="${cache_package_file##*/}"
cache_package_name="${cache_package_file_name%.tar.gz}"
echo "Found $cache_package_file_name!"

# Extract and install Caché from the installer package
temp_cache_install_dir=/tmp/cache_install
echo "Extracting Caché installer to $temp_cache_install_dir..."
mkdir $temp_cache_install_dir
chmod og+rx $temp_cache_install_dir
cd $temp_cache_install_dir
tar xzf $cache_package_file

# Install Caché using the silent installer, per the Caché documentation
echo "Installing Caché to $cache_home..."
ISC_PACKAGE_INSTANCENAME="$instance" ISC_PACKAGE_INSTALLDIR="$cache_home" ./cinstall_silent

# Copy init scripts to $cache_home
echo "Setting up Caché service scripts..."
mkdir $cache_home/etc && mkdir $cache_home/etc/init.d
sed 's/cacheprod/cache/g; s/prod/cache/g' /vagrant/VistA/Scripts/Install/Cache/etc/init.d/cache > $cache_home/etc/init.d/cache
ln -s $cache_home/etc/init.d/cache /etc/init.d/cache
chmod 755 /etc/init.d/cache

# shutdown cache manually and setup the Caché service
ccontrol stop $instance quietly
chkconfig --add cache
chkconfig cache on



# Setup the VistA installation directory and bring in the configuration file
cache_dat_file=DBA_VISTA_FOIA_20161007-CACHEv2014.zip
cache_dat_baseurl=http://foia-vista.osehra.org/DBA_VistA_FOIA_System_Files

echo "Setting up Cache VistA configuration..."
cache_vista_dir=$cache_home/mgr/VistA
mkdir $cache_vista_dir
chgrp cacheusr $cache_vista_dir
chmod g+w $cache_vista_dir

# Copy the pre-fabricated Cache parameter file to the Cache home directory
echo "Configuring the VistA Cache parameter file..."
cp $cache_home/cache.cpf $cache_home/cache.cpf.save
cp /vagrant/resources/cache.cpf $cache_home
chgrp cacheusr $cache_home/cache.cpf

# Retrieve, extract and copy the CACHE.DAT save file into the Cache instance
temp_cache_dat_dir=/tmp/cache_dat
mkdir $temp_cache_dat_dir
cd $temp_cache_dat_dir

# If we have a CACHE.DAT file in our "resources" directory, use that. If not, pull an
# OSEHRA FOIA VistA CACHE.DAT from the OSEHRA archive
echo "Importing CACHE.DAT..."
if [[ -f /vagrant/resources/CACHE.DAT ]]; then
    echo "Found CACHE.DAT in the 'resources' directory!"
    cp /vagrant/resources/CACHE.DAT .
else
    echo "Retrieving CACHE.DAT archive ($cache_dat_file) from OSEHRA..."
    wget -q $cache_dat_baseurl/$cache_dat_file > /dev/null

    if [[ ! -f $cache_dat_file ]]; then
        echo "For some reason, we couldn't download the CACHE.DAT archive! ($cache_dat_baseurl/$cache_dat_file)"
        exit 1
    fi

    fresh_install=true
    unzip $cache_dat_file
fi

# Backup the existing CACHE.DAT file, just to be safe
if [[ -f $cache_home/mgr/VistA/CACHE.DAT ]]; then
    echo "Backing up the existing CACHE.DAT file..."
    cp $cache_home/mgr/VistA/CACHE.DAT $cache_home/VistACACHE-`date +%m%d%Y`.DAT
fi

cp -rf ./CACHE.DAT $cache_home/mgr/VistA
chmod 755 $cache_home/mgr/VistA/CACHE.DAT
chgrp cacheusr $cache_home/mgr/VistA/CACHE.DAT

if [[ -f /vagrant/resources/cache.key ]]; then
    echo "Importing the Cache license key..."
    cp /vagrant/resources/cache.key $cache_home/mgr
fi

# Poke holes in the CentOS firewall
echo "Configuring firewall to allow access to key Cache ports..."
/vagrant/VistA/Scripts/Install/Cache/configureFirewall.sh
iptables -I INPUT 1 -p tcp --dport 57772 -j ACCEPT # System Management Portal
iptables -I INPUT 1 -p tcp --dport 1972  -j ACCEPT # SuperServer
iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT    # Web access
iptables -I INPUT 1 -p tcp --dport 9430 -j ACCEPT  # RPC Broker
service iptables save

# Restart the Cache service
echo "Restarting Cache!"
service cache start


# Post-installation procedures
echo "Running post-install tasks..."
mkdir -p /tmp/post-install/VistA/bin/Testing/Log
cd /tmp/post-install
python /vagrant/scripts/PostImportSetupScript.py

mkdir -p $cache_home/csp/fmquery
chmod g+w $cache_home/csp/fmquery
chgrp cacheusr $cache_home/csp/fmquery

# Clean up from install
echo "Cleaning up install..."
mv /etc/redhat-release.orig /etc/redhat-release

cd $scriptdir
rm -rf $temp_cache_install_dir
rm -rf $temp_cache_dat_dir

echo "Cache installation and configuration complete!"