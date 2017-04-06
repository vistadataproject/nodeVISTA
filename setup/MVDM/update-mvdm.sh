#!/usr/bin/env bash

NC_BRANCH="master"
VDM_BRANCH="master"

while [[ $# -gt 1 ]]
    do
    key="$1"

    case $key in
        -n|--ncbranch)
        NC_BRANCH="$2"
        shift # past argument
        ;;
        -v|--vdmbranch)
        VDM_BRANCH="$2"
        shift # past argument
        ;;
        *)
                # unknown option
        ;;
    esac
done

echo "Clone the MVDM target repository"
git clone https://github.com/mfuroyama/MVDM.git

echo "Copy files from the VDM soruce repository (branch: $VDM_BRANCH)"
git clone -b $VDM_BRANCH https://github.com/vistadataproject/VDM.git
cd VDM/prototypes
npm install --only=dev
npm run mvdm
cd ../..

echo "Copy files from the nonClinicalRPCs target repository (branch: $NC_BRANCH)"
git clone -b $NC_BRANCH https://github.com/vistadataproject/nonClinicalRPCs.git
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
commit_message="Update MVDM with the latest prototypes"
git commit -m "$commit_message"
git push origin

echo "Clean up the target file repository"
cd ..
rm -rf MVDM
