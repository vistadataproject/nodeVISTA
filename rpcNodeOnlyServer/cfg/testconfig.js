var config = {};

config.rpcServer = {};
config.rpcServer.host = '10.2.2.100';
config.rpcServer.port = 9010;


// change for local VistA
config.robertSSN = '000000029';
config.robertName = "ALEXANDER,ROBERT";
config.robertIEN = '61';
config.robertAccess = 'fakedoc1';
config.robertVerify = '1Doc!@#$';


config.marySSN = '000000030';
config.maryName = "SMITH,MARY";
config.maryIEN = '62';
config.maryAccess = 'fakenurse1';
config.maryVerify = '1Nur!@#$';

try {
    module.exports = config;
}
catch(exception) {
    //will fail in browser - config is referenced by browser client for convenience
}

