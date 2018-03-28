#!/usr/bin/env node

'use strict';

const utils = require('./nodeVISTAUtils');
const VDM = require('mvdm/vdm');

utils.init();

/*
 * Domain (object) setup:
 * - new domain object if necessary (just adding name - no email setup)
 * - RPC Broker Site Parameters (8994.1) to this domain
 * - Kernel System Parameters (8993_1) to this domain
 *
 * TODO: Mailman Site Parameters (4_3) too?
 *
 * Domain name/url as text - in [a] FileMan Init and [b] XMCHRIS (christen system) - will be setup in Py
 * driven roll and scroll. This is for domain file entry and reference setup
 */
function setupDomain(domainURL) {

    let domainRef;
    try {
        domainRef = VDM.lookupIdByLabel("Domain-4_2", domainURL);
    } catch(e) { // no entry
        let dcres = VDM.create({
            type: "Domain-4_2",
            name: domainURL
        });
        domainRef = { id: dcres.id, label: dcres.label };
    }

    let ures1 = VDM.update({
        id: '8989_3-1',
        type: 'Kernel_System_Parameters-8989_3',
        domain_name: domainRef
    });

    let ures2 = VDM.update({
        id: '8994_1-1',
        type: 'Rpc_Broker_Site_Parameters-8994_1',
        domain_name: domainRef
    });

}

const DOMAINURL = "DEMO.NODEVISTA.ORG";
setupDomain(DOMAINURL);
