var net = require('net');
var async = require('async');
var parser = require('./rpcParser');
var LOGGER = require('./logger.js');
var CONFIG = require('./config.js');
var VistaJS = require('../VistaJS/VistaJS.js');
var VistaJSLibrary = require('../VistaJS/VistaJSLibrary.js');

var EOT = '\u0004';

var context = 'OR CPRS GUI CHART';

var configuration = {
    context: context,
    host: '10.2.100.101',
    port: 9210,
    accessCode: 'pu1234',
    verifyCode: 'pu1234!!',
    localIP: '127.0.0.1',
    localAddress: 'localhost'
};


server = net.createServer();

server.on('connection', handleConnection);

server.listen(9000, function() {
    console.log('server listening to %j', server.address());
});

function handleConnection(conn) {
    var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
    console.log('new client connection from %s', remoteAddress);
    var chunk = '';

    conn.on('data', onConnectedData);
    conn.on('close', onConnectedClose);
    conn.on('error', onConnectedError);

    var brokerSocket = new net.Socket();
    brokerSocket.isConnected = false;
    var self = this;
    brokerSocket.on('error', onBrokerConnectionError);
    brokerSocket.on('close', onBrokerConnectionClose);
    brokerSocket.setEncoding('utf8');
    brokerSocket.connect(configuration.port, configuration.host, function() {
        brokerSocket.isConnected = true;
    });

    function onConnectedData(data) {
        chunk += data;
        // find the end of a RPC packet
        var eotIndex = chunk.indexOf(EOT);

        var commandList = VistaJSLibrary.buildConnectionCommandList(LOGGER, configuration);



        // loop for each packet in the data chunk
        while (eotIndex > -1) {
            // get a packet from the chunk (without the EOT)
            var rpcPacket = chunk.substr(0, eotIndex + 1);
            // remove the RPC packet from the chunk
            chunk = chunk.substring(eotIndex + 1)
            // find the end of the next RPC packet
            eotIndex = chunk.indexOf(EOT);

            // process the packet
            LOGGER.info('connection data from %s: %s', remoteAddress, data);
            var rpcObject = parser.parseRawRPC(rpcPacket);
            LOGGER.info("RPC name: %s", rpcObject.rpcName);
            if (rpcObject.parameters) {
                LOGGER.info("RPC parameters: %j", rpcObject.parameters);
            }

            // check if RPC is supported to pass to MVDM

            // pass the unsupported RPC to the legacy broker
            if (brokerSocket.isConnected) {
                brokerSocket.on('data', onBrokerConnectionData);
                LOGGER.info("Writing from sniffer to broker message: %s, length %s", rpcPacket, rpcPacket.length);
                brokerSocket.write(rpcPacket);
            }

        }

    }

    function onConnectedClose() {
        onBrokerConnectionClose();
        LOGGER.info('connection from %s closed', remoteAddress);
        conn.removeAllListeners();
        conn.end();
        conn.destroy();
        onBrokerConnectionClose();
    }

    function onConnectedError(err) {
        onBrokerConnectionClose();
        LOGGER.error('Connection %s error: %s', remoteAddress, err.message);
        conn.removeAllListeners();
        conn.end();
        conn.destroy();
    }

    var buffer = '';

    function onBrokerConnectionData(data) {
        LOGGER.debug('RpcClient.receive()');
        var result;
        var error;

        buffer += data;

        if (buffer.indexOf(EOT) !== -1) {
            //if (buffer[0] !== NUL) {
            //    LOGGER.trace(data);
            //    error = new Error('VistA SECURITY error: ' + extractSecurityErrorMessage(buffer));
            //} else if (buffer[1] !== NUL) {
            //    LOGGER.trace(data);
            //    error = new Error('VistA APPLICATION error: ' + buffer);
            //}

            //buffer = buffer.substring(2);

            //if (buffer.indexOf('M  ERROR') !== -1) {
            //    LOGGER.trace(buffer);
            //    error = new Error(buffer);
            //}

            result = buffer.substring(0, buffer.indexOf(EOT) + 1);
            brokerSocket.removeAllListeners('data');
            buffer = '';
            if (!error) {
                LOGGER.info("Read from BrokerConnection result: %s, length: %s", result, result.length);
                conn.write(result);
            }

            //LOGGER.trace(error);
            //LOGGER.trace('RpcClient result: ' + util.inspect(result, {
            //        depth: null
            //    }));

            //this.callback(error, result);
        }

    }

    function onBrokerConnectionClose() {
        LOGGER.info('BrokerConnection closed');
        brokerSocket.isConnected = false;
        brokerSocket.removeAllListeners();
        brokerSocket.end();
        brokerSocket.destroy();
    }

    function onBrokerConnectionError(err) {
        LOGGER.error('BrokerConnection error: %s', err.message);
        brokerSocket.isConnected = false;
        brokerSocket.removeAllListeners();
        brokerSocket.end();
        brokerSocket.destroy();
    }


    function buildRPCArgs(parameters) {
        var rpcArgs = [];
        for (var i = 0; i < parameters.length; i++) {
            if (parameters[i].type === '0') {
                rpcArgs.push(VistaJS.RpcParameter.literal(parameters[i].parameter));
            } else if (parameters[i].type === '1') {
                rpcArgs.push(VistaJS.RpcParameter.reference(parameters[i].parameter));
            } else if (parameters[i].type === '2') {
                rpcArgs.push(VistaJS.RpcParameter.list(parameters[i].parameter));
            }
        }

    }

    function passToBroker(rpcCommand) {

    }

}





/***************** STUFF COPIED FROM VISTAJSLIBRARY *************************/
function RpcClient(logger, configuration, rpcCommandList, callback) {
    if (!(this instanceof RpcClient)) {
        return new RpcClient(logger, configuration, rpcCommandList, callback);
    }

    this.logger = logger || require('bunyan').createLogger({
            name: 'RpcClient',
            level: 'info'
        });
    this.configuration = configuration;
    this.rpcTaskList = [];
    this.execList = [];
    this.callback = callback;
    this.socket = new net.Socket();

    if (!rpcCommandList || !_.isArray(rpcCommandList)) {
        throw new Error('RpcCommandList must be an array of RpcCommand objects');
    }

    var self = this;
    rpcCommandList.forEach(function(rpcCommand) {
        var rpcTask = new RpcTask(self.logger, rpcCommand, self.socket);
        self.rpcTaskList.push(rpcTask);
        self.execList.push(rpcTask.execute.bind(rpcCommand));
    });

}

RpcClient.prototype = {
    constructor: RpcClient,

    complete: function(error, results) {
        this.logger.debug('RpcClient.complete()');
        this.close();
        this.callback(error, results);
        // if !error, get last - 1 result and callback
    },

    onError: function(error) {
        this.logger.debug('RpcClient.onError()');
        this.close();
        this.callback(error, null);
    },

    onClose: function() {
        this.logger.debug('RpcClient.onClose()');
        this.close();
    },

    close: function() {
        this.logger.debug('RpcClient.close()');
        this.socket.removeAllListeners();
        this.socket.end();
        this.socket.destroy();
    },

    start: function() {
        this.logger.debug('RpcClient.start()');
        var self = this;

        this.socket.on('error', this.onError.bind(this));
        this.socket.on('close', this.onClose.bind(this));

        this.socket.setEncoding('utf8');
        this.socket.connect(this.configuration.port, this.configuration.host, function() {
            async.series(self.execList, self.complete.bind(self));
        });
    },
};


function RpcTask(logger, rpcCommand, socket) {
    if (!(this instanceof RpcTask)) {
        return new RpcTask(logger, rpcCommand, socket);
    }

    this.logger = logger || require('bunyan').createLogger({
            name: 'RpcClient',
            level: 'info'
        });
    this.buffer = '';
    this.socket = socket;
    this.rpcCommand = rpcCommand;

    this.execute = this.execute.bind(this);
    this.receive = this.receive.bind(this);
}

RpcTask.prototype = {
    constructor: RpcTask,

    execute: function(callback) {
        this.logger.debug('RpcClient.execute()');
        this.callback = callback;
        this.socket.on('data', this.receive.bind(this));
        this.logger.debug(this.rpcCommand.rpc.replace(/[^ -~]+/, '')); // /[\cA-\cZ]+/  /[\x00-\x1F]+/
        this.socket.write(this.rpcCommand.rpc);
    },

    receive: function(data) {
        this.logger.debug('RpcClient.receive()');
        var result;
        var error;

        this.buffer += data;

        if (this.buffer.indexOf(EOT) !== -1) {
            if (this.buffer[0] !== NUL) {
                this.logger.trace(data);
                error = new Error('VistA SECURITY error: ' + extractSecurityErrorMessage(this.buffer));
            } else if (this.buffer[1] !== NUL) {
                this.logger.trace(data);
                error = new Error('VistA APPLICATION error: ' + this.buffer);
            }

            this.buffer = this.buffer.substring(2);

            if (this.buffer.indexOf('M  ERROR') !== -1) {
                this.logger.trace(this.buffer);
                error = new Error(this.buffer);
            }

            result = this.buffer.substring(0, this.buffer.indexOf(EOT));
            this.socket.removeAllListeners('data');
            this.buffer = '';
            if (!error) {
                try {
                    result = this.rpcCommand.process(result);
                } catch (err) {
                    error = err;
                }
            }

            this.logger.trace(error);
            this.logger.trace('RpcClient result: ' + util.inspect(result, {
                    depth: null
                }));

            this.callback(error, result);
        }
    }
};










//var rpcClient = new net.Socket();
//client.connect()