
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
## Using the service
### Authenticate
```text
curl -v -X POST -H "Content-Type: application/x-www-form-urlencoded" -d 'userId=200-62&facilityId=4-2957' "http://10.2.2.100:9030/auth/"

Note: Unnecessary use of -X or --request, POST is already inferred.
*   Trying 10.2.2.100...
* Connected to 10.2.2.100 (10.2.2.100) port 9030 (#0)
> POST /auth/ HTTP/1.1
> Host: 10.2.2.100:9030
> User-Agent: curl/7.47.0
> Accept: */*
> Content-Type: application/x-www-form-urlencoded
> Content-Length: 31
> 
* upload completely sent off: 31 out of 31 bytes
< HTTP/1.1 200 OK
< X-Powered-By: Express
< x-access-token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMDAtNjIiLCJmYWNpbGl0eUlkIjoiNC0yOTU3IiwiaWF0IjoxNDg3NzE2NTgzLCJleHAiOjE0ODc3MTc0ODMsInN1YiI6ImFjY2Vzc1Rva2VuIn0.hWI1n1Um2wN_xVbN4WPjnJBgkXEmlilAxbaVPtPL4S_YTL9N6SZZ5hgRSGHOvOL3yLeuUs93zVwJlFo5d_qKgpzfWfGVom8PtnmUDSD_Dsh5fnypllkdf9ORNmMs-8GO7ejH-hAMC36W5BsYPC9YkGkg3T--d-TGb_YbsWOUilUEF5sO7tCt34RABvJR4QsXkprxzQ8VP__o110ejNfx4W_Eo54ljsRVhsLGfji-zhQ4LoFq2Tth5dgdl51WzwdGG_wRE1-8ii3W80V07rF6VZpuXoSbhCbtrO50dH39LcF3O-nn_oFy3-M84xjwo7Klu3N3uUGDcFv841Y0MdhZh3sP6i4RUT_oarrk47JhQ03EDb_yjEas-R_n7wax-lTJWyPsW5OfIsCEpIh9BKHOi6DwxZtmiJDuvn8l8WjZ98kM0bRiQN8RcFxpZtXDqLl5aw9P-o-Jig4Fe_nCiHgP0LUFEQmloHUMyozqf6_uXEhAMDVAUOjzom1nK6EVd3nDAeu4aLnQpv1vgbURa2fvYukR_h2EeL9QKhPMsDvtAgsFhRCNfUdRIIGLyoYjoc-qurTh6f5XkStd2T0Kh7L7yp0sgKNgmeXYJWyvfwCCriLQNlIHaYkQ3ZoL8IPZimxAIOv2ulRuX2qEO0hjLP5Lb-k5bVwAn32wzwxnQRGQRJc
< x-refresh-token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMDAtNjIiLCJmYWNpbGl0eUlkIjoiNC0yOTU3IiwiaWF0IjoxNDg3NzE2NTgzLCJleHAiOjE0ODc3MjAxODMsInN1YiI6InJlZnJlc2hUb2tlbiJ9.Y2LBiF_R5GV66iWtcXZwEv09R3QShqpAhdNi1OwHPXs-XUHQSKGsQJSNcx-bYLnyuMmIh2Byj1gW-FqVASdP-tzB4UcRUgz3ehZINa2f_r-g2rsYoqqTq1lAjo5O-Mp5rl-e4NHh-htcKS_wDlZaXh4z_FXI4KWA75e_rDwjeMyLfXQFDxjQRKIUvrutzA5lFOQ_s6UWSwNVrm9moOt3eIXDwBCkjJO7FbAmUF06tDeHC9HUPUMrcjOMIZhw_wzg-0JJuM8YcVw1OfkLCOQxxFuHu1cGIzOKKJs73V9zCKqUQabA7cwafaLffSL-StoRFeKUlBFlgR9Wv-SBjmA5GiE9U670DRbtf1vpg_QbVt5ew4Eem-UfZ3xjfKeLoKtyPAPRGev5QaxRzpu9EOrZ3qY7gteKDfLL1HyHcfZvcXZsBFHdu-Y3tZZvyU5_DOgPKYeUwwydLBXMnW2fTKVJpRC4mfellMvLkXciOYd2R0QD8jeJy9y01rCyunuHeKaa_yjiLx7QZQHg6ZOU34rYqz609Nl0hgEadqh7f2QZtvavl7qriQQ5XH5GFdd2iY8Du1MKxLWR_9lkaTuaMzyPVKUDkEchPqQQ5YLXson2gNdd7fyhOAkkFqPozlJ6m7tYkaTdRUXu1g23eS5seJsHzYIBKapPBaGudzZoJWf0O8I
< Content-Type: text/plain; charset=utf-8
< Content-Length: 2
< ETag: W/"2-4KoCHiHd29bYzs7HHpz1ZA"
< Date: Tue, 21 Feb 2017 22:36:23 GMT
< Connection: keep-alive
< 
* Connection #0 to host 10.2.2.100 left intact
OK
```
Hold onto access and refresh tokens. The auth token will be used to make subsequent clinical service requests. The refresh token is needed when the access token expires.


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

