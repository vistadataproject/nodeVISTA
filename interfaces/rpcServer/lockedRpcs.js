var HashMap = require('hashmap');

// RpcLDomain helper
var rpcLProblems = require('./rpcLDomains/problems/rpcLProblems.js');

// Add Supported emulated RPCs to a map
var emulatedRPCs = new HashMap();

emulatedRPCs.set('ORQQPL ADD SAVE', rpcLProblems);
emulatedRPCs.set('ORQQPL DETAIL', rpcLProblems);
emulatedRPCs.set('ORQQPL PROBLEM LIST', rpcLProblems);
emulatedRPCs.set('ORQQPL EDIT SAVE', rpcLProblems);
emulatedRPCs.set('ORQQPL UPDATE', rpcLProblems);
emulatedRPCs.set('ORQQPL DELETE', rpcLProblems);
emulatedRPCs.set('ORQQPL REPLACE', rpcLProblems);

module.exports = emulatedRPCs;