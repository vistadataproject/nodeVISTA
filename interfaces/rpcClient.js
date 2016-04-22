var request = require('request');

request.post({
        url: 'http://localhost:9001/vista/login',
        json: {
            "accessCode": "fakenurse1",
            "verifyCode": "NEWVERIFY1!"
        }
    },
    function(error, response, body) {
        if (error) {
            return console.error(' failed:', error);
        }
        if (!error && response.statusCode == 200) {
            console.log(response)
            var token = response.body.token;
            runRPC('ORWU USERINFO', token);
        }
    }
);


function runRPC(rpc, authToken) {
    request.post({
        url: 'http://localhost:9001/vista/runRPC/' + rpc,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
        }
    },
    function(error, response, body) {
        if (error) {
            return console.error(' failed:', error);
        }
        if (!error && response.statusCode == 200) {
            //console.log(response);
            console.log(body);
        }
    }
);
}