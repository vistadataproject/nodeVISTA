var config = {};

config.LOGGER = {};
config.LOGGER.name = 'sniffer';
config.LOGGER.infoFile = './log/snifferInfo.log';
config.LOGGER.debugFile = './log/snifferDebug.log';
config.LOGGER.errorFile = './log/snifferError.log';

config.FILE = {};
config.FILE.options = {
    flags: 'w',
    defaultEncoding: 'utf8',
    fd: null,
    mode: 0666,
    autoClose: true
};
config.FILE.defaultCaptureFile = './log/capture.txt';

config.USER = {};
config.USER.DUZ = 57;

config.FACILITY = {};
config.FACILITY.ID = 2957;

// serverSocket
config.sniffer = {};
config.sniffer.port = 9010;

//admin socket
config.admin = {};
config.admin.host = 'localhost';
config.admin.port = 9020;

config.client = {};
config.client.defaultName = "CPRS";

config.vistaRpcBroker.connectPollInterval = 100;
config.vistaRpcBroker.connectPollTimeout = 10000;


try {
    module.exports = config;
}
catch(exception) {
    //will fail in browser - config is referenced by browser client for convenience
}

