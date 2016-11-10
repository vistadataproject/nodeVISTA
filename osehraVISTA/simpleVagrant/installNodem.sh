#!/usr/bin/env bash
#---------------------------------------------------------------------------
# Copyright 2011-2014 The Open Source Electronic Health Record Agent
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#---------------------------------------------------------------------------

# TODO
# - should GTMCI be just set in vdp for self when installs nodem?

# VDP modify:
# Script to install node.js and nodem for VISTA/GT.M - based on OSEHRA EWD.js install

# Ensure presence of required variables
if [[ -z $instance && $gtmver && $gtm_dist && $basedir ]]; then
    echo "The required variables are not set (instance, gtmver, gtm_dist)"
fi

# Options
# instance = name of instance
# used http://rsalveti.wordpress.com/2007/04/03/bash-parsing-arguments-with-getopts/
# for guidance

usage()
{
    cat << EOF
    usage: $0 options

    This script will automatically install node.js and nodem for VISTA/GT.M

    DEFAULTS:
      Node Version = Latest 12.x

    OPTIONS:
      -h    Show this message
      -v    Node Version to install

EOF
}

while getopts ":hv:" option
do
    case $option in
        h)
            usage
            exit 1
            ;;
        v)
            nodever=$OPTARG
            ;;
    esac
done

echo "nodever $nodever"

# Set defaults for options
if [ -z $nodever ]; then
    nodever="0.12"
fi

# Set the node version
shortnodever=$(echo $nodever | cut -d'.' -f 2)

# set the arch
arch=$(uname -m | tr -d _)

# This should be ran as the instance owner to keep all of VistA together
if [[ -z $basedir ]]; then
    echo "The required variable \$instance is not set"
fi

echo "Installing node.js"

# VDP nix EWD special
# Copy init.d scripts to VistA etc directory
# su $instance -c "cp -R etc $basedir"

# Download installer in tmp directory
cd $basedir/tmp

# Install node.js using NVM (node version manager)
echo "Downloading NVM installer"
curl -s -k --remote-name -L  https://raw.githubusercontent.com/creationix/nvm/master/install.sh
echo "Done downloading NVM installer"

# Execute it
chmod +x install.sh
su $instance -c "./install.sh"

# Remove it
rm -f ./install.sh

# move to $basedir
cd $basedir

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

# Install nodem (node_modules in basedir)
su $instance -c "source $basedir/.nvm/nvm.sh && source $basedir/etc/env && nvm use $nodever && npm install --quiet nodem >> $basedir/log/nodemInstall.log"

# Copy the right mumps$shortnodever.node_$arch
su $instance -c "cp $basedir/node_modules/nodem/lib/mumps"$nodever".node_$arch $basedir/mumps.node"
su $instance -c "mv $basedir/node_modules/nodem/lib/mumps"$nodever".node_$arch $basedir/node_modules/nodem/lib/mumps.node"

# Setup GTM C Callin
# with nodem 0.3.3 the name of the ci has changed. Determine using ls -1
# VDP: will be inherited by vdp user as takes osehra setup - TODO: just set by vdp for self?
calltab=$(ls -1 $basedir/node_modules/nodem/resources/*.ci)
echo "export GTMCI=$calltab" >> $basedir/etc/env

echo "Done installing node.js and nodem"
