var HashMap = require('hashmap');

// RpcEDomain helper
var rpcEProblems = require('./rpcEDomains/problems/rpcEProblems.js');




// Add Supported emulated RPCs to a map
var emulatedRPCs = new HashMap();

emulatedRPCs.set('ORQQPL ADD SAVE', rpcEProblems);
emulatedRPCs.set('ORQQPL DETAIL', rpcEProblems);
//emulatedRPCs.set('ORQQPL PROBLEM LIST', rpcEProblems);
//emulatedRPCs.set('ORQQPL EDIT SAVE', rpcEProblems);
//emulatedRPCs.set('ORQQPL UPDATE', rpcEProblems);
//emulatedRPCs.set('ORQQPL DELETE', rpcEProblems);
//emulatedRPCs.set('ORQQPL REPLACE', rpcEProblems);

module.exports = emulatedRPCs;