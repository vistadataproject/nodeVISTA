'use strict';

var net = require('net');
var CONFIG = require('./cfg/testconfig.js');

var Promise = require('promise');

var NUL = '\u0000';
var SOH = '\u0001';
var EOT = '\u0004';
var ENQ = '\u0005';

function Clients(numClients, port, host) {
    if (numClients === undefined
        || (isNaN(numClients) || parseInt(Number(numClients)) !== numClients || isNaN(parseInt(numClients, 10)))) {

        numClients = 1;
    }
    if (!(this instanceof Clients)) {
        return new Clients(numClients, port, host);
    }

    this.clients = [];
    this.chunks = [];
    for (var i = 0; i < numClients; i++) {
        this.clients[i] = new net.Socket();
        this.chunks[i] = '';

        this.clients[i].on('error', function(error) {
            console.log(error);
            this.clients[i].end();
        });
    }

    if (port !== undefined) {
        this.serverPort = port;
    } else {
        this.serverPort = CONFIG.rpcServer.port;
    }
    if (host !== undefined) {
        this.serverHost = host;
    } else {
        this.serverHost = CONFIG.rpcServer.host;
    }

    //this.sendRpc = this.sendRpc.bind(this);
}


/**
 * Passes the rpc to the socket for the specified client. sets up handlers for the promise.
 * Returns the promise
 *
 * @param client net.Socket
 * @param rpc rpcString
 * @returns promise {*|exports|module.exports}
 */
Clients.prototype = {
    constructor: Clients,

    sendRpc: function (clientNum, rpc) {
        var self = this;
        self.chunks[clientNum] = '';

        return new Promise(function (fulfill, reject) {

            function errorFunction(error) {
                reject(error);
            }

            function dataFunction(data) {
                // clean up the 'data' and 'error' listeners for the next step through
                self.clients[clientNum].removeListener('data', dataFunction);
                self.clients[clientNum].removeListener('error', errorFunction);

                fulfill(receiveData(self.chunks[clientNum], data));
            }

            self.clients[clientNum].on('data', dataFunction);
            self.clients[clientNum].on('error', errorFunction);

            var rpcBuffer = new Buffer(rpc, 'binary');
            self.clients[clientNum].write(rpcBuffer);
        });
    },

    startAllClients: function() {
        for (var i = 0; i < this.clients.length; i++) {
            this.clients[i].connect(this.serverPort, this.serverHost);
        }
    },

    startClient: function(clientNum) {
        this.clients[clientNum].connect(this.serverPort, this.serverHost);
    },

    setClientTest: function(clientNum, testFunction) {
        this.clients[clientNum].on('connect', testFunction);
    },

    closeClient: function(clientNum) {
        this.clients[clientNum].end();
    },

    closeAllClients: function() {
        for (var i = 0; i < this.clients.length; i++) {
            this.clients[i].end();
        }
    },

    throwError: function (rpcName, response) {
        throw new Error(rpcName + " Error: " + response);
    },

    getClient: function(clientNum) {
        return this.clients[clientNum];
    }

}

function receiveData(chunk, data) {
    chunk += data;
    // find the end of a RPC packet
    var eotIndex = chunk.indexOf(EOT);

    // loop for each packet in the data chunk
    while (eotIndex > -1) {
        var response = '';

        // get a packet from the chunk (without the EOT)
        var recievedPacket = chunk.substr(0, eotIndex + 1);
        // remove the RPC packet from the chunk
        chunk = chunk.substring(eotIndex + 1);
        // find the end of the next RPC packet
        eotIndex = chunk.indexOf(EOT);
    }

    return recievedPacket;

}

module.exports.Clients = Clients;
