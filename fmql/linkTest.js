var nodem = require('nodem')
var db = new nodem.Gtm();
db.open();
var res= db.function({function: "ewdSymbolTable^getSessionSymbolTable", arguments: ["1"]});
console.log(res);
