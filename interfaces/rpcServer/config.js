var config = {};

config.vistaRpcBroker = {};
config.vistaRpcBroker.ip = "10.2.100.101";
config.vistaRpcBroker.port = "9210";

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
config.server = {}
config.server.port = 9000;

config.client = {};
config.client.defaultName = "CPRS";

// connection to legacy broker
config.brokerClient = {}
config.brokerClient.configuration = {
    host: '10.2.100.101',
    port: 9210,
    accessCode: 'pu1234',
    verifyCode: 'pu1234!!',
    localIP: '127.0.0.1',
    localAddress: 'localhost'
}
config.brokerClient.connectPollInterval = 100;
config.brokerClient.connectPollTimeout = 10000;




module.exports = config;