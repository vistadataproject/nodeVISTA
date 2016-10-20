#!/usr/bin/env bash
# Installs Intersystems Caché in an automated way

# This utility requires root privliges
if [[ $EUID -ne 0 ]]; then
    echo "This script must be run as root" 1>&2
    exit 1
fi

# Hack for CentOS
cp /etc/redhat-release /etc/redhat-release.orig
echo "Red Hat Enterprise Linux (Santiago) release 6" > /etc/redhat-release

# ============================= Install clean copy of Cache from kit ===============================
instance=cache
scriptdir=`dirname $0`
cache_home=/opt/cachesys/$instance

cache_package_file=`ls -1 /vagrant/resources/*lnxrhx64.tar.gz | head -n 1`
if [[ -z $cache_package_file ]]; then
    echo "Couldn't find Cache Installer package!"
    exit 1
fi
cache_package_file_name="${cache_package_file##*/}"
cache_package_name="${cache_package_file_name%.tar.gz}"

# Unzip the cachekit in a temp directory
tempdir=/tmp/$cache_package_name
mkdir $tempdir
chmod og+rx $tempdir
cd $tempdir
tar xzf $cache_package_file

# Install Caché using the silent installer, per the Cache documentation
cd $cache_package_name
ISC_PACKAGE_INSTANCENAME="$instance" ISC_PACKAGE_INSTALLDIR="$cache_home" ./cinstall_silent

# Copy init scripts to $cache_home
mkdir $cache_home/etc && mkdir $cache_home/etc/init.d
sed 's/cacheprod/cache/g; s/prod/cache/g' /vagrant/VistA/Scripts/Install/Cache/etc/init.d/cache > $cache_home/etc/init.d/cache

ln -s $cache_home/etc/init.d/cache /etc/init.d/cache
chmod 755 /etc/init.d/cache

# shutdown cache manually
ccontrol stop $instance quietly

# use init script to start Caché again
chkconfig --add cache
chkconfig cache on
service cache start

# Clean up from install
mv /etc/redhat-release.orig /etc/redhat-release

# Poke holes in the CentOS firewall
/vagrant/VistA/Scripts/Install/Cache/configureFirewall.sh
iptables -I INPUT 1 -p tcp --dport 57772 -j ACCEPT # System Management Portal
iptables -I INPUT 1 -p tcp --dport 1972  -j ACCEPT # SuperServer
iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT    # Web access
iptables -I INPUT 1 -p tcp --dport 9430 -j ACCEPT  # RPC Broker
service iptables save

# ============================ Set the VistA up using a CACHE.DAT file =============================
cache_dat_file=DBA_VISTA_FOIA_20161007-CACHEv2014.zip
cache_dat_baseurl=http://foia-vista.osehra.org/DBA_VistA_FOIA_System_Files

# Before we do anything, we stop the Cache service
service cache stop

# Setup the VistA installation directory and bring in the configuration file
cache_vista_dir=/opt/cachesys/cache/mgr/VistA
mkdir $cache_vista_dir
chgrp cacheusr $cache_vista_dir
chmod g+w $cache_vista_dir

# Copy the pre-fabricated Cache parameter file to the Cache home directory
cp $cache_home/cache.cpf $cache_home/cache.cpf.save
cp /vagrant/resources/cache.cpf $cache_home
chgrp cacheusr $cache_home/cache.cpf

# Retrieve, extract and copy the CACHE.DAT save file into the Cache instance
tmp_cache_dat_dir=/tmp/cache_dat
mkdir $tmp_cache_dat_dir
cd $tmp_cache_dat_dir

# If we have a CACHE.DAT file in our "resources" directory, use that. If not, pull an
# OSEHRA FOIA VistA CACHE.DAT from the OSEHRA archive
if [[ -f /vagrant/resources/CACHE.DAT ]]; then
    cp /vagrant/resources/CACHE.DAT .
else
    wget $cache_dat_baseurl/$cache_dat_file

    if [[ ! -f $cache_dat_file ]]; then
        echo "For some reason, we couldn't download the CACHE.DAT archive! ($cache_dat_baseurl/$cache_dat_file)"
        exit 1
    fi

    fresh_install=true
    unzip $cache_dat_file
fi

# Backup the existing CACHE.DAT file, just to be safe
if [[ -f $cache_home/mgr/VistA/CACHE.DAT ]]; then
    cp $cache_home/mgr/VistA/CACHE.DAT $cache_home/VistACACHE-`date +%m%d%Y`.DAT
fi

cp -rf ./CACHE.DAT $cache_home/mgr/VistA

# Restart the Cache service
service cache start

cd $scriptdir
rm -rf $tmpdir
rm -rf $tmp_cache_dat_dir


# Run the post-install python scripts if this was a fresh CACHE.DAT file
# if [[ -n $fresh_install]]; then
#     python /vagrant/scripts/PostImportSetupScript.py
#     python /vagrant/scripts/ImportPats.py
#     python /vagrant/scripts/ClinicSetup.py
# fi