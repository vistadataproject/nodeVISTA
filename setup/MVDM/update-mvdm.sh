#!/usr/bin/env bash

echo "Clone the MVDM target repository"
git clone https://github.com/vistadataproject/MVDM.git

echo "Copy files from the VDM soruce repository"
git clone https://github.com/vistadataproject/VDM.git
cd VDM/prototypes
npm install --only=dev
npm run mvdm
cd ../..

echo "Copy files from the nonClinicalRPCs target repository"
git clone https://github.com/vistadataproject/nonClinicalRPCs.git
cd nonClinicalRPCs
npm install --only=dev
npm run mvdm
cd ..

echo "Clean up the source file repositories"
rm -rf VDM
rm -rf nonClinicalRPCs

echo "Commit and push the MVDM updates to the remote"
cd MVDM
git add -A
datestamp="$(date +"%m-%d-%Y")"
timestamp="$(date +"%H:%M:%S")"
commit_message="Update MVDM from sources on $datestamp at $timestamp"
git commit -m "$commit_message"
git push origin

echo "Clean up the target file repository"
cd ..
rm -rf MVDM