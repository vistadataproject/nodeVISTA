#~/bin/bash

# ------------------------------------------- UTILITIES --------------------------------------------
prompt="Cache VistA =>"

log() {
    echo $prompt $1
}

check_if_tool_is_installed() {
    name=$1
    command -v $name >/dev/null 2>&1 || { log "'$name' is not installed. Aborting!"; exit 1; }
    log "'$name' is installed"
}

# --------------------------------------------------------------------------------------------------
# Ensure we have all the tools and resource necessary to run this script
log "Checking if required tools are installed..."
check_if_tool_is_installed git
check_if_tool_is_installed vagrant

log "Check if required resources are installed..."
# TODO: Check resources

# Clone the base OSEHRAVistA project.  We'll be using installation scripts
log "Checking for base VM project..."
if [ ! -d "./VistA" ]; then
    log "Cloning the base VM project for installation..."
    git clone https://github.com/OSEHRA/VistA.git
else
    log "base VM project already exists!"
fi

# Delegate the requested action to vagrant
vagrant up

# Clean up what we just installed
# TODO: Clean up