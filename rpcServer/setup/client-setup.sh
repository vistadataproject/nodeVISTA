#!/usr/bin/env bash
echo "Client Setup..\n\n"

if [ -d "nodeVISTAClients" ]; then
    echo "Removing previous nodeVISTAClients directory\n\n"
    rm -rf ./nodeVISTAClients
fi

echo "Cloning Node VISTA Clients repository\n\n"

git clone https://github.com/vistadataproject/nodeVISTAClients.git

if [ -d "client" ]; then
    echo "Removing previous client directory"
    rm -rf ./client
fi

echo "Copying the Node VISTA Manager directory to clients\n\n"

mkdir ./client
cp -r nodeVISTAClients/nodeVISTAManager/* ./client
rm -rf nodeVISTAClients

echo "Copying client config\n\n"
cp cfg/clientConfig.js ./client/js/config.js

cd ./client

echo "Installing web javascript dependencies"

bower install
