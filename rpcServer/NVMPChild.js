'use strict';

// Test rig for nodeVistaManagementProcess - "Child Side"
const util = require('util');
const chalk = require('chalk');
const ProcessAdapter = require('./processAdapter');
const EventManager = require('./eventManager');

// On the child side, this is pretty much all you need to do, in terms of new code
const nvmProcess = new ProcessAdapter();
nvmProcess.init();
nvmProcess.bindEventManager(EventManager);

// Everything else here is business as usual
function processEvent(type, event) {
    console.log(`${chalk.green('Child')} processed event ${type}: ${util.inspect(event, { depth: null, colors: true })}`);
}

EventManager.on('mvdmCreate', (event) => {
    processEvent('MVDM', event);
});

EventManager.on('mvdmDescribe', (event) => {
    processEvent('MVDM', event);
});

EventManager.on('mvdmList', (event) => {
    processEvent('MVDM', event);
});

EventManager.on('mvdmUpdate', (event) => {
    processEvent('MVDM', event);
});

EventManager.on('mvdmRemove', (event) => {
    processEvent('MVDM', event);
});

EventManager.on('mvdmUnremoved', (event) => {
    processEvent('MVDM', event);
});

EventManager.on('mvdmDelete', (event) => {
    processEvent('MVDM', event);
});

EventManager.on('rpcCall', (event) => {
    processEvent('RPC', event);
});

nvmProcess.setRPCLocked(true);
nvmProcess.setRPCLocked(false);
