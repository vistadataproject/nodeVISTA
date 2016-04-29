var util = require('util');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var request = require('request');

//rpc = process.argv[2] || 'XUS GET USER INFO';
rpc = process.argv[2] || 'ORWPT LIST ALL';
rpcArgs = process.argv[3];

function login(callback) {
    request.defaults({
      strictSSL: false, // allow us to use our self-signed cert for testing
      rejectUnauthorized: false
    });

    console.log("\nLogin called\n");
    request.post({
            strictSSL: false, // allow us to use our self-signed cert for testing
            rejectUnauthorized: false,

            url: 'https://localhost:9001/vista/login',
            rejectUnhauthorized : false,
            json: {
                "accessCode": "fakenurse1", //"fakenurse1",
                "verifyCode": "NEWVERIFY1!"
            }
        },
        function(error, response, body) {
            if (error) {
                console.log("\n *********login client body log: "+ body);
                return console.error(' failed:', error);
            }
            if (!error && response.statusCode == 200) {
                console.log("\nLogin response:");
                console.dir(response.body, {depth: null, colors: true});
                var token = response.body.token;
                if (callback) callback(rpc, token);
            }
        }
    );
}

function runRPC(rpc, authToken) {
    console.log("\nRPC called: %s (authToken %s)", rpc, authToken);
    // request.defaults({
    //   strictSSL: false, // allow us to use our self-signed cert for testing
    //   rejectUnauthorized: false
    // });
    var rpcArgs = [{"type": "LITERAL", "value": 1}, {"type": "LITERAL", "value": 1}];
    request.post({
            url: 'https://localhost:9001/vista/runRPC/' + rpc,
            //      strictSSL: false, // allow us to use our self-signed cert for testing
            //rejectUnhauthorized : false,
            headers: {
                'Authorization': authToken,
            },
            json: rpcArgs
        },
        function(error, response, body) {
            if (error) {
                return console.error(' failed:', error);
            }
            if (!error && response.statusCode == 200) {
                console.log("\nRPC response:");
                console.dir(response.body, {depth: null, colors: true});
            }
        }
    );
}

login(runRPC);
