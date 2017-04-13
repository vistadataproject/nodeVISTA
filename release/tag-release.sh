#!/usr/bin/env bash

function usage {
  echo ""
  echo "SYNOPSIS"
  echo "    tag-release.sh [-h] tag-name"
  echo ""
  echo "DESCRIPTION"
  echo "    Tag releases branches in the VISTA Data Project repositories"
  echo "    'tag-name' argument is *required* here."
  echo ""
  echo "OPTIONS"
  echo "    -h   Print this message"
  echo ""
  echo "EXAMPLES"
  echo "    tag-release.sh v1.3.0"
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
    echo "No arguments supplied; 'tag-name' argument is *required*"
    usage
fi

TAG=$1
echo "Tagging release: $TAG"

echo "Tagging 'VDM' repository release branch with $TAG..."
git clone -b $TAG https://github.com/vistadataproject/VDM.git
cd VDM
git tag -d $TAG
git push origin :refs/tags/$TAG
git tag $TAG
git push origin --tags
cd ..

echo "Tagging 'nonClinicalRPCs' repository release branch with $TAG..."
git clone -b $TAG https://github.com/vistadataproject/nonClinicalRPCs.git
cd nonClinicalRPCs
git tag -d $TAG
git push origin :refs/tags/$TAG
git tag $TAG
git push origin --tags
cd ..

echo "Tagging 'MVDM' repository with $TAG..."
git clone https://github.com/vistadataproject/MVDM.git
cd MVDM
git tag -d $TAG
git push origin :refs/tags/$TAG
git tag $TAG
git push origin --tags
cd ..

echo "Tagging 'nodeVISTA' repository with $TAG..."
git clone https://github.com/vistadataproject/nodeVISTA.git
cd nodeVISTA
git tag -d $TAG
git push origin :refs/tags/$TAG
git tag $TAG
git push origin --tags
cd ..

echo "Tagging 'vistadataproject.github.io' repository with $TAG..."
git clone https://github.com/vistadataproject/vistadataproject.github.io.git
cd vistadataproject.github.io
git tag -d $TAG
git push origin :refs/tags/$TAG
git tag $TAG
git push origin --tags
cd ..

echo "Cleaning up the source file repositories..."
rm -rf VDM
rm -rf nonClinicalRPCs
rm -rf MVDM
rm -rf nodeVISTA
rm -rf vistadataproject.github.io

echo "Successfully tagged repositories: $TAG!"
