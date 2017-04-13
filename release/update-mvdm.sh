#!/usr/bin/env bash

function usage {
  echo ""
  echo "SYNOPSIS"
  echo "    update-mvdm.sh [-nva[branch]]"
  echo ""
  echo "DESCRIPTION"
  echo "    Update the MVDM repository with prototypes from both the 'VDM' and 'nonClinicalRPCs' repos"
  echo ""
  echo "OPTIONS"
  echo "    -n   Sets the branch to checkout from the 'nonClinicalRPCs' repo (default: master)"
  echo "    -v   Sets the branch to checkout from the 'VDM' repo (default: master)"
  echo "    -a   Sets the branch to checkout from both the 'nonClinicalRPCs' and 'VDM' repo"
  echo "    -h   Print this message"
  echo ""
  echo "EXAMPLES"
  echo "    update-mvdm.sh"
  echo "    update-mvdm.sh -n v1.2.0 -v mybranch"
  echo "    update-mvdm.sh -a v1.2.0"
  echo ""
  exit 1
}

NC_BRANCH="master"
VDM_BRANCH="master"

while getopts "v:n:a:h" opt; do
  case $opt in
    v)
      VDM_BRANCH=$OPTARG
      echo "Setting 'VDM' checkout branch to '$VDM_BRANCH'" >&2
      ;;
    n)
      NC_BRANCH=$OPTARG
      echo "Setting 'nonClinicalRPCs' checkout branch to '$NC_BRANCH'" >&2
      ;;
    a)
      VDM_BRANCH=$OPTARG
      NC_BRANCH=$OPTARG
      echo "Setting 'VDM' checkout branch to '$VDM_BRANCH'" >&2
      echo "Setting 'nonClinicalRPCs' checkout branch to '$NC_BRANCH'" >&2
      ;;
    h)
      usage
      ;;
    \?)
      usage
      ;;
  esac
done


echo "Copying VDM:$VDM_BRANCH and nonClinicalRPCs:$NC_BRANCH into MVDM:master..."

echo "Cloning the MVDM target repository..."
git clone https://github.com/vistadataproject/MVDM.git

echo "Copying files from the 'VDM' repository (branch: $VDM_BRANCH)..."
git clone -b $VDM_BRANCH https://github.com/vistadataproject/VDM.git
cd VDM/prototypes
npm install --only=dev
npm run mvdm
cd ../..

echo "Copying files from the 'nonClinicalRPCs' repository (branch: $NC_BRANCH)..."
git clone -b $NC_BRANCH https://github.com/vistadataproject/nonClinicalRPCs.git
cd nonClinicalRPCs
npm install --only=dev
npm run mvdm
cd ..

echo "Cleaning up the source file repositories..."
rm -rf VDM
rm -rf nonClinicalRPCs

echo "Commiting and pushing the MVDM updates to the remote..."
cd MVDM
git add -A
commit_message="Update MVDM with the latest prototypes"
git commit -m "$commit_message"
git push origin

echo "Cleaning up the target file repository..."
cd ..
rm -rf MVDM

echo "Successfully updated the MVDM repository master branch!"
