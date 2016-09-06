var HashMap = require('hashmap');

// RpcLDomain helper
var rpcLProblems = require('./rpcLDomains/problems/rpcLProblems.js');

// Add Supported emulated RPCs to a map
var lockedRPCs = new HashMap();

lockedRPCs.set('ORQQPL ADD SAVE', rpcLProblems);
lockedRPCs.set('ORQQPL DETAIL', rpcLProblems);
lockedRPCs.set('ORQQPL PROBLEM LIST', rpcLProblems);
lockedRPCs.set('ORQQPL EDIT SAVE', rpcLProblems);
lockedRPCs.set('ORQQPL UPDATE', rpcLProblems);
lockedRPCs.set('ORQQPL DELETE', rpcLProblems);
lockedRPCs.set('ORQQPL REPLACE', rpcLProblems);

module.exports = lockedRPCs;