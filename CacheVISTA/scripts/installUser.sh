# After 'vagrant up' first but want in post hook of osehra setup
# and want -s to skip testing, -p for post hook, -e (ewd) as want npm for now
# and leave instance as osehra ... go 2 can change it
# ... one issue: why npm install for fmqlServer doesn't reuse top level node_modules nodem
# ... another: recheck FMQL MUMPS copying

user_id=vistad
user_home=/home/$user_id
user_uid=1100


nodever="0.12"

# Create the 'vistad' user with all rights, privileges and configuration
echo
echo "========== Creating LDSR user '$user_id' =========="
#test -d $user_home && { echo "LDSR user $user_id already Installed. Aborting."; exit 0; }
echo "Mimicing the .profile and .bashrc of user osehra"

# Create $user_id user - make sure it is in the osehra group
sudo groupadd -g $user_uid $user_id
sudo useradd -c "VistA Dev User" -m -u $user_uid -s /bin/bash -g $user_id -G wheel $user_id
echo $user_id:vistaisdata | sudo chpasswd


# Install nvm, Node.js and npm
echo
echo "========== Installing NVM/Node.js (v$nodever) =========="
cd $user_home
echo "Downloading NVM installer..."
curl -s -k --remote-name -L  https://raw.githubusercontent.com/creationix/nvm/master/install.sh
echo "Done downloading NVM installer!"

# Execute the installer script then remove it
chmod +x install.sh
su $user_id -c "./install.sh"
rm -f ./install.sh

# Install node via nvm
cd $user_home
su $user_id -c "source $user_home/.nvm/nvm.sh && nvm install $nodever && nvm alias default $nodever && nvm use default"
echo "Successfully installed NVM/Node.js!"

# Update bashrc and profile
echo "" >> $user_home/.bashrc
echo "export NVM_DIR=\"$user_home/.nvm\"" >> $user_home/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"' >> $user_home/.bashrc

echo "source $user_home/.nvm/nvm.sh" >> $user_home/.profile
echo "nvm use $nodever" >> $user_home/.profile
echo "Successfully created user $user_id!"


echo "Cloning nodeVISTA client code for use by $vdpid"
git clone -q https://github.com/vistadataproject/nodeVISTA.git
su $user_id -c "cp -r nodeVISTA/nodemExamples ."
su $user_id -c "cp -r nodeVISTA/fmql ."
su $user_id -c "cp -r nodeVISTA/Commands ."
rm -rf nodeVISTA

# Add FMQL x 2
echo
echo "========== Cloning FMQL MUMPS =========="
git clone https://github.com/caregraf/FMQL.git
echo "Adding FMQL (MUMPS) to osehraVISTA"


# TODO: check if this removes NPM install step from fmql server setup
# cd fmql
# su $user_id npm install
# Note: took fmqlServer above from the copy in nodeVISTA git

#
# Set up the FMQL web service
echo
echo "========== Setting up FMQL Web Service =========="
su $user_id -c "mkdir -p fmql/webservice/static"
su $user_id -c "cp FMQL/webservice/* fmql/webservice/"
su $user_id -c "cp FMQL/webclients/* fmql/webservice/static/"
# rm -rf FMQL


# Set up the shared development directories
echo
echo "========== Setting up Development environment =========="
# Ensure group permissions are correct
chmod -R g+rw $user_home