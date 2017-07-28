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

const text = 'Welcome! You are currently viewing the nodeVISTA demo for the VISTA Data Project (VDP). \r \r  Where nodeVISTA provided secure and consistent read-write interface for VISTA, VDP further enhances the usablity by connecting the fragmented VISTA networks under one standardized data model. A single, industry-standard model provides increased accessibility, data integrity and ease of information access across all VA VISTA systems, providing better and more effecient service. For further information, please visit:\r \r http://vistadataproject.info/\r \r VISTA Data Project is currently managed by HRG Technologies LLC. \r ';

VDM.update({ id: '8989_3-1', type: 'Kernel_System_Parameters-8989_3', intro_message: `${banner}\r\r${text}` });
