'use strict';

var util = require('util');
var _ = require('underscore');
var clc = require('cli-color');
var moment = require('moment');
var VistaJS = require('./VistaJS');
var logger = require('bunyan').createLogger({
    name: 'RpcClient',
    level: 'debug'
})

function inspect(obj) {
    return obj ? util.inspect(obj, {
        depth: null
    }) : '';
}

function printResult(error, result) {
    console.log(clc.red(inspect(error)));
    console.log(clc.cyan(inspect(result)));
}

function printJsonResult(error, result) {
    console.log(clc.red(inspect(error)));

    var output = result;
    try {
        output = JSON.parse(result);
    } catch (err) {
        // use default
    }

    console.log(clc.cyan(inspect(output)));
}

var context = 'OR CPRS GUI CHART';

var configuration = {
    context: context, //'HMP UI CONTEXT',
    host: '10.0.2.15',
    // host: 'localhost',
    port: 9430,
    accessCode: 'fakenurse1',
    verifyCode: 'NEWVERIFY1!',
    localIP: '127.0.0.1',
    localAddress: 'localhost'
};

VistaJS.callRpc(logger, configuration, 'ORWU USERINFO', printResult);
