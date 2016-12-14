#!/usr/bin/env bash

usage()
{
    cat << EOF
    usage: $0 options

    This script will automatically install node via Node Version Manager (nvm)

    DEFAULTS:
      Node Version = 6.9.2 (LTS)

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
    nodever="6.9.2"
fi

echo "Installing Node via Node Version Manager (nvm)"

instance=osehra
basedir=/home/osehra

# Download installer in tmp directory
tmp_dir=$basedir/tmp
cd $tmp_dir

# Install node.js using NVM (node version manager)
echo "Downloading NVM installer"
curl -s -k --remote-name -L  https://raw.githubusercontent.com/creationix/nvm/master/install.sh

if [ -f $tmp_dir/install.sh ];
then
    echo "Done downloading NVM installer"
else
    echo "NVM installer download failed.."
    exit 1
fi

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

#install nodem
su $instance -c "source $basedir/.nvm/nvm.sh && source $basedir/etc/env && nvm use $nodever && npm install --quiet nodem >> $basedir/log/nodemInstall.log"

# Setup GTM C Callin
# with nodem 0.3.3 the name of the ci has changed. Determine using ls -1
calltab=$(ls -1 $basedir/node_modules/nodem/resources/*.ci)
echo "export GTMCI=$calltab" >> $basedir/etc/env

# Ensure nodem routines are in gtmroutines search path
echo "export gtmroutines=\"\${gtmroutines}\"\" \"\$basedir/node_modules/nodem/src" >> $basedir/etc/env
