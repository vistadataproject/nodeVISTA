var config = {};

config.vistaRpcBroker = {};
config.vistaRpcBroker.ip = "10.2.100.101";
config.vistaRpcBroker.port = "9210";

config.LOGGER = {};
config.LOGGER.name = 'serverExperiment';
config.LOGGER.infoFile = './log/serverExperimentInfo.log';
config.LOGGER.debugFile = './log/serverExperimentDebug.log';
config.LOGGER.errorFile = './log/serverExperimentError.log';

module.exports = config;