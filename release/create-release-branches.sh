#!/usr/bin/env bash

function usage {
  echo ""
  echo "SYNOPSIS"
  echo "    create-release-branches.sh [-h] branch-name"
  echo ""
  echo "DESCRIPTION"
  echo "    Create release branches in the prototype repositories ('VDM', 'nonClinicalRPCs')"
  echo "    'branch-name' argument is *required* here."
  echo ""
  echo "OPTIONS"
  echo "    -h   Print this message"
  echo ""
  echo "EXAMPLES"
  echo "    create-release-branches.sh v1.3.0"
  echo ""
  exit 1
}

while getopts "h" opt; do
  case $opt in
    h)
      usage
      ;;
    \?)
      usage
      ;;
  esac
done

shift $((OPTIND-1))

if [ $# -eq 0 ]
  then
    echo "No arguments supplied; 'branch-name' argument is *required*"
    usage
fi

BRANCH=$1
echo "Creating release branches: $BRANCH"

echo "Creating release branch '$BRANCH' in the 'VDM' repository..."
git clone https://github.com/vistadataproject/VDM.git
cd VDM
git checkout -b $BRANCH
git push origin
cd ..

echo "Creating release branch '$BRANCH' in the 'nonClinicalRPCs' repository..."
git clone https://github.com/vistadataproject/nonClinicalRPCs.git
cd nonClinicalRPCs
git checkout -b $BRANCH
git push origin
cd ..

echo "Cleaning up the source file repositories..."
rm -rf VDM
rm -rf nonClinicalRPCs

echo "Successfully created release branches: $BRANCH!"
