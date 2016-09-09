var config = {};

config.USER = {};
config.USER.DUZ = 55;

config.FACILITY = {};
config.FACILITY.ID = 2957;

try {
    module.exports = config;
}
catch(exception) {
    //will fail in browser - config is referenced by browser client for convenience
}

