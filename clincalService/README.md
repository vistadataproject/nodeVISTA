
# Clinical REST Service

## Executing the service
Make configuration changes in config/config.js:

```javascript
const config = {
    logger: {               <--- logging configurations
        name: 'clinicalService',
        infoFile: './log/clinicalService.log',
        debugFile: './log/clinicalService-debug.log',
        errorFile: './log/clinicalService-error.log',
    },

    port: 9030, // service listens on this port

    // JWT    
    jwt: {    <-- JSON web token settings 
        publicKey: './config/jwtRS256.key.pub',
        privateKey: './config/jwtRS256.key',
        algorithm: 'RS256',
        expiresIn: '15m', // access / patient token has a short expiration of 15 minutes
        refreshExpiresIn: '1h', // refresh token expires after an hour
    },

    workerQ: { <-- worker process configuration
        size: 1,
    },
};
```

Utilize [jwtRS256.sh](https://github.com/vistadataproject/nodeVISTA/blob/master/clincalService/config/jwtRS256.sh) to generate a public/private keypair.

```text
$ npm install
$ node index.js

{"name":"clinicalService","hostname":"addgene-ubuntu-1604-vbox","pid":29869,"level":30,"msg":"Clinical Service listening on port 9030","time":"2017-02-21T22:01:47.762Z","v":0}
```

## Running integration tests

The Clinical REST service tests utilize [Mocha](https://mochajs.org/) to execute the tests, [Chai expects](http://chaijs.com/guide/styles/#expect) for assertions, and [chai-http](https://github.com/chaijs/chai-http) to excute test code against an instance of the REST service.

* Install Mocha 
```text
$ npm install mocha -g <-- installs mocha globally
```

* Execute a test
```text
$ mocha spec/authRotuer-spec.js
```
* Execute all tests
```test
$ npm test
```

