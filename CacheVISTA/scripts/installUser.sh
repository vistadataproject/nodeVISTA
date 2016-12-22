#!/usr/bin/env bash
# Creates a development user and preps the environment

user_id=vistad
user_home=/home/$user_id
user_uid=1100

# Create the 'vistad' user with all rights, privileges and configuration
echo "Creating user '$user_id'..."
id -u $user_id > /dev/null 2>&1
if [ $? == 0 ]; then
    echo "The user $user_id has already been installed!"
    exit 0
fi

sudo groupadd -g $user_uid $user_id
sudo useradd -c "VistA Dev User" -m -u $user_uid -s /bin/bash -g $user_id -G wheel,cacheusr $user_id
echo $user_id:vistaisdata | sudo chpasswd
chmod -R g+rw $user_home

cd $user_home
echo "Cloning client code for use by $user_id..."
git clone -q https://github.com/vistadataproject/nodeVISTA.git
git clone https://github.com/caregraf/FMQL.git

# Set up the shared development directories
echo
echo "Setting up Development environment..."
# TODO: Do that here