#!/usr/bin/env node

'use strict';

const utils = require('./nodeVISTAUtils');
const VDM = require('mvdm/vdm');

utils.init();

const banner = `
                               _    _      ________________  _
               _ __   ___   __| | __\\ \\   / /_ _/ ___|_   _|/ \\
              | '_ \\ / _ \\ / _\` |/ _ \\ \\ / / | |\\___ \\ | | / _ \\
              | | | | (_) | (_| |  __/\\ V /  | | ___) || |/ ___ \\
              |_| |_|\\___/ \\__,_|\\___| \\_/  |___|____/ |_/_/   \\_\\
`;

const text = 'Welcome! You are logging into a node.js-enabled VISTA, nodeVISTA, a test system for development and testing and demonstration. \r \r This VISTA has been seeded with Users and test Patient Data using mechanisms developed during the VISTA Data Project (vistadataproject.info). \r';

VDM.update({ id: '8989_3-1', type: 'Kernel_System_Parameters-8989_3', intro_message: `${banner}\r\r${text}` });
