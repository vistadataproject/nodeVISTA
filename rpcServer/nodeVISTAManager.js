#!/usr/bin/env node
'use strict';

var express = require('express');
var _ = require('lodash');
var app = express();
var expressWs = require('express-ws')(app);
var cors = require('cors')
var bodyParser = require('body-parser');
var moment = require('moment');
var path = require('path');
var CONFIG = require('./cfg/clientConfig.js');
var LOGGER = require('./logger.js');
var mvdmManagement = require('./mvdmManagement');
var EventManager = require('./eventManager');
var rpcsCategorized = require('./cfg/rpcsCategorized');
var ProcessAdapter = require('./processAdapter');

var emulatedRPCList = [];

// Initialize the process adapter, which ties this back into the RPC Server
const processAdapter = new ProcessAdapter();
processAdapter.bindEventManager(EventManager);

function init() {
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));

    // CORS needed to allow single page application access
    app.use(cors());

    // parse application/json
    app.use(bodyParser.json());


    //default path goes to index.html
    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname + '/client/index.html'));
    });

    //get management settings
    app.get('/management', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(mvdmManagement));
    });

    //update management settings
    app.put('/management', function(req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }

        var settings = req.body;

        if (_.has(settings, 'isRPCEmulated')) {
            mvdmManagement.isRPCEmulated = settings.isRPCEmulated;
            processAdapter.setRPCEmulated(settings.isRPCEmulated);
        }

        return res.sendStatus(200);
    });

    app.get('/emulatedRPCList', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(emulatedRPCList));
    });

    app.get('/rpcList', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(rpcList));
    });

    var mvdmClients = [];

    //mvdm events socket
    app.ws('/mvdmEvents', function(ws, req) {
        mvdmClients.push(ws);

        ws.on('close', function(){
            handleSocketClose(ws, mvdmClients);
        });

    });

    var rpcClients = [];

    //rpc events socket
    app.ws('/rpcEvents', function(ws, req) {

        rpcClients.push(ws);

        ws.on('close', function(){
            handleSocketClose(ws, rpcClients);
        });
    });

    initMVDMEventListeners(mvdmClients);
    initRPCEventListeners(rpcClients);

    //listen for emulated RPC List
    EventManager.on('emulatedRPCList', function(event) {
        emulatedRPCList = event.list.map(function(rpcName) {return {name: rpcName, count: 0};});
        emulatedRPCList.forEach(function(rpc) {
            var category = rpcsCategorized[rpc.name];
            if (category) {
                rpc = _.extend(rpc, category);
            }
        });

    });

    var port = CONFIG.port;
    app.listen(port, function () {
        LOGGER.info('nodeVISTA Manager listening on port ' + port);
    });

    //static files
    app.use(express.static(__dirname + "/client")); //use web client files in ROOT/public folder
    app.use(express.static(__dirname + "/node_modules")); //expose node_modules for bootstrap, jquery, underscore, etc.
}

function handleSocketClose(ws, clients) {
    for(var i = 0; clients.length; i++) {
        if (clients[i] === ws) {
            clients.splice(i, 1);
            break;
        }
    }
}

function initMVDMEventListeners(mvdmClients) {
    //handle socket request
    EventManager.on('mvdmCreate', function(event) {
        processEvent(mvdmClients, 'MVDM', event);
    });

    EventManager.on('mvdmDescribe', function(event) {
        processEvent(mvdmClients, 'MVDM', event);
    });

    EventManager.on('mvdmList', function(event) {
        processEvent(mvdmClients, 'MVDM', event);
    });

    EventManager.on('mvdmUpdate', function(event) {
        processEvent(mvdmClients, 'MVDM', event);
    });

    EventManager.on('mvdmRemove', function(event) {
        processEvent(mvdmClients, 'MVDM', event);
    });

    EventManager.on('mvdmUnremoved', function(event) {
        processEvent(mvdmClients, 'MVDM', event);
    });

    EventManager.on('mvdmDelete', function(event) {
        processEvent(mvdmClients, 'MVDM', event);
    });
}

function initRPCEventListeners(rpcClients) {
    EventManager.on('rpcCall', function(event) {
        processEvent(rpcClients, 'RPC', event);
    });
}

function processEvent(clients, eventCategory, event) {

    var resObj = {
        type: 'socketMessage_' + eventCategory,
        eventCategory: eventCategory,
        data: event
    };

    //broadcast event to clients
    _.forEach(clients, function (client) {
        client.send(JSON.stringify(resObj));
    });
}

module.exports.init = init;
