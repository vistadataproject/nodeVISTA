'use strict';

// Test rig for nodeVistaManagementProcess - "Server Side"
const chalk = require('chalk');
const ProcessAdapter = require('./processAdapter');
const EventManager = require('./eventManager');
const MVDMManagement = require('./mvdmManagement');

// This is the new stuff...pretty non-intrusive. 'init' sets up the child process
const nvmProcess = new ProcessAdapter();
nvmProcess.init();
nvmProcess.bindEventManager(EventManager);

// Register handling of child events
nvmProcess.registerChildEventHandler('isRPCLocked', (isRPCLocked) => {
    MVDMManagement.isRPCLocked = isRPCLocked;
    console.log(`${chalk.green('Child')} requested that MVDM Management "isRPCLocked" be set to ${MVDMManagement.isRPCLocked}`);
});


// Once you're set up, everything is done through the event manager, like before!
EventManager.emit('rpcCall', { name: 'ORWU DT', args: 'bar' });
EventManager.emit('mvdmCreate', { domain: 'ORDERS', args: 'something' });
