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

    request.post({
            strictSSL: false, // allow us to use our self-signed cert for testing
            rejectUnauthorized: false,

            url: 'https://localhost:9001/vista/login',
            rejectUnhauthorized : false,
            json: {
                "accessCode": "fakedoc1", //"fakenurse1",
                "verifyCode": "NEWVERIFY1!"
            }
        },
        function(error, response, body) {
            if (error) {
                return console.error(' failed:', error);
            }
            if (!error && response.statusCode == 200) {
                // console.log(response)
                var token = response.body.token;
                if (callback) callback(rpc, token);
            }
        }
    );
}

function runRPC(rpc, authToken) {
    request.defaults({
      strictSSL: false, // allow us to use our self-signed cert for testing
      rejectUnauthorized: false
    });
    request.post({
            url: 'https://localhost:9001/vista/runRPC/' + rpc,
            //      strictSSL: false, // allow us to use our self-signed cert for testing
            //rejectUnhauthorized : false,
            headers: {
              //  'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': authToken,
            },
            json: { "input" : "1", 
                   "input" : "1" }
            //json: rpcArgs
            //formData: {rpcArgs: rpcArgs}
        },
        function(error, response, body) {
            if (error) {
                return console.error(' failed:', error);
            }
            if (!error && response.statusCode == 200) {
                //console.log(response);
                console.log("/n *********client body log: "+ body);
            }
        }
    );
}

login(runRPC);