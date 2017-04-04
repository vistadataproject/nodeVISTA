'use strict';

// nodeVISTA Manager configuration settings that will be copied into the client/ directory upon post npm install
const config = {
    httpProtocol: 'http',
    host: '10.2.2.100',
    port: 9020,
};

try {
    module.exports = config;
}
catch(exception) {
    // will fail in browser - config is referenced by browser client for convenience
}
