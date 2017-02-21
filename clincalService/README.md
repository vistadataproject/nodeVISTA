
# Clinical REST Service

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

