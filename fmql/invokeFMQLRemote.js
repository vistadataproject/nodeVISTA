#!/usr/bin/env node

/**
 * Goes with fmqlServer.js (that works with CHCS/Cache, GTM etc)
 *
 * Peer of fmqlInvoke which invokes DB in process
 *
 * Will evolve into cacher and will investigate web sockets too
 */
var http = require('http');

var args = process.argv.slice(2);
if (args.length != 1) {
  console.error('You must pass in an FMQL Query (and no more).');
  process.exit(1);
}

var query = args[0];

var options = {
    host: '10.255.167.116',
    port: 9000,
    path: '/fmqlEP?query=' + encodeURIComponent(query),
    method: 'GET'
  };

http.get(options, function(res) {
    var pageData = "";

    res.on('data', function (chunk) {
        pageData += chunk;
    });

    res.on('end', function(){
        console.log(pageData);
    });
});
