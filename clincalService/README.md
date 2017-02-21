
# Clinical REST Service

## Executing the service
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

