#!/usr/bin/env node

'use strict';

const utils = require('./nodeVISTAUtils');
const VDM = require('mvdm/vdm');

utils.init();

/*
 * Set:
 * - intro banner
 * - PRIMARY HFS DIRECTORY (/tmp)
 * - default auto menu yes
 * - DNS IP: 8.8.8.8
 *
 * Not setting:
 * - volume set ROU (will have to delete old and add this) [for now just there so keep as is]
 * leaving AGENCY CODE as VA but may revisit later
 * - default institution: setup in setupInstitution
 * - domain: setup in setupDomain
 */

function setupKSP() {

    const bannerOld = `
                               _    _      ________________  _
               _ __   ___   __| | __\\ \\   / /_ _/ ___|_   _|/ \\
              | '_ \\ / _ \\ / _\` |/ _ \\ \\ / / | |\\___ \\ | | / _ \\
              | | | | (_) | (_| |  __/\\ V /  | | ___) || |/ ___ \\
              |_| |_|\\___/ \\__,_|\\___| \\_/  |___|____/ |_/_/   \\_\\
`;
    /* from https://www.ascii-art-generator.org */
    const banner = `
                      __                ___    ___      __  ___ 
                _____/ /___  __  ______/ / |  / (_)____/ /_/   |
               / ___/ / __ \/ / / / __  /| | / / / ___/ __/ /| |
              / /__/ / /_/ / /_/ / /_/ / | |/ / (__  ) /_/ ___ |
              \___/_/\____/\__,_/\__,_/  |___/_/____/\__/_/  |_|
`;

    const text = 'Welcome! You are logging into cloudVistA, a test system for development, testing and demonstration of VistA in the Cloud. \r \r This VistA has been seeded with Users and test Patient Data using mechanisms developed during the _VISTA Data_ and _VAM_ Projects (vistadataproject.info). \r';

    let res = VDM.update({
        id: '8989_3-1',
        type: 'Kernel_System_Parameters-8989_3',
        primary_hfs_directory: "/tmp",
        dns_ip: "8.8.8.8",
        default_automenu: false, // mean true but MVDM has bug, mapping true to 0 and false to 1!
        intro_message: `${banner}\r\r${text}`
    });

}

setupKSP();
