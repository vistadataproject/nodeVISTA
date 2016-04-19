var nodem = require('nodem');
try {
    var db = new nodem.Gtm();
    db.open();
    var res = db.function({function: "getSessionSymbolTable^ewdSymbolTable", arguments: ["1"]});
    console.log(res);
}
catch(e) {
   console.log("ERROR", e);
}
db.close();