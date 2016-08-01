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
}
config.FILE.defaultCaptureFile = './log/capture.txt';

// serverSocket
config.sniffer = {}
config.sniffer.port = 9000;

config.client = {};
config.client.defaultName = "CPRS";

// connection to legacy broker
config.vistaRpcBroker = {}
config.vistaRpcBroker.configuration = {
    host: '10.2.100.101',
    port: 9210
}
config.vistaRpcBroker.connectPollInterval = 100;
config.vistaRpcBroker.connectPollTimeout = 10000;




module.exports = config;