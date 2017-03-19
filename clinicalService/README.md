
# Clinical REST Service

The clinical REST service provides a way to access VistA clinical data using underline MVDM services. The service is secured by JSON web tokens. See [JWT](https://jwt.io/).

## Executing the service
#### Make configuration changes in config/config.js

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

#### Run the service
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
## Using the service
### Authenticate POST /auth

Authenticate with the service by making a POST request with a userId and facilityId to the auth endpoint. In the future, the service may accept an access/verify codes. 

After receiving a response, extract JWT access and refresh tokens from the response header and hold onto them. The auth token will be used to make subsequent clinical service requests. The refresh token is needed when the access token expires.

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
### Patient Selection POST /patient/select

A patient token is required to retrieve any patient clinical data. Use the patient select service to retrieve a patient token. Don't forget to include the access token in your request header.

```text
curl -v -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMDAtNjIiLCJmYWNpbGl0eUlkIjoiNC0yOTU3IiwiaWF0IjoxNDg3NzE2NTgzLCJleHAiOjE0ODc3MTc0ODMsInN1YiI6ImFjY2Vzc1Rva2VuIn0.hWI1n1Um2wN_xVbN4WPjnJBgkXEmlilAxbaVPtPL4S_YTL9N6SZZ5hgRSGHOvOL3yLeuUs93zVwJlFo5d_qKgpzfWfGVom8PtnmUDSD_Dsh5fnypllkdf9ORNmMs-8GO7ejH-hAMC36W5BsYPC9YkGkg3T--d-TGb_YbsWOUilUEF5sO7tCt34RABvJR4QsXkprxzQ8VP__o110ejNfx4W_Eo54ljsRVhsLGfji-zhQ4LoFq2Tth5dgdl51WzwdGG_wRE1-8ii3W80V07rF6VZpuXoSbhCbtrO50dH39LcF3O-nn_oFy3-M84xjwo7Klu3N3uUGDcFv841Y0MdhZh3sP6i4RUT_oarrk47JhQ03EDb_yjEas-R_n7wax-lTJWyPsW5OfIsCEpIh9BKHOi6DwxZtmiJDuvn8l8WjZ98kM0bRiQN8RcFxpZtXDqLl5aw9P-o-Jig4Fe_nCiHgP0LUFEQmloHUMyozqf6_uXEhAMDVAUOjzom1nK6EVd3nDAeu4aLnQpv1vgbURa2fvYukR_h2EeL9QKhPMsDvtAgsFhRCNfUdRIIGLyoYjoc-qurTh6f5XkStd2T0Kh7L7yp0sgKNgmeXYJWyvfwCCriLQNlIHaYkQ3ZoL8IPZimxAIOv2ulRuX2qEO0hjLP5Lb-k5bVwAn32wzwxnQRGQRJc" -d 'patientId=2-25' "http://10.2.2.100:9030/patient/select"

Note: Unnecessary use of -X or --request, POST is already inferred.
*   Trying 10.2.2.100...
* Connected to 10.2.2.100 (10.2.2.100) port 9030 (#0)
> POST /patient/select HTTP/1.1
> Host: 10.2.2.100:9030
> User-Agent: curl/7.47.0
> Accept: */*
> Content-Type: application/x-www-form-urlencoded
> Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMDAtNjIiLCJmYWNpbGl0eUlkIjoiNC0yOTU3IiwiaWF0IjoxNDg3NzE2NTgzLCJleHAiOjE0ODc3MTc0ODMsInN1YiI6ImFjY2Vzc1Rva2VuIn0.hWI1n1Um2wN_xVbN4WPjnJBgkXEmlilAxbaVPtPL4S_YTL9N6SZZ5hgRSGHOvOL3yLeuUs93zVwJlFo5d_qKgpzfWfGVom8PtnmUDSD_Dsh5fnypllkdf9ORNmMs-8GO7ejH-hAMC36W5BsYPC9YkGkg3T--d-TGb_YbsWOUilUEF5sO7tCt34RABvJR4QsXkprxzQ8VP__o110ejNfx4W_Eo54ljsRVhsLGfji-zhQ4LoFq2Tth5dgdl51WzwdGG_wRE1-8ii3W80V07rF6VZpuXoSbhCbtrO50dH39LcF3O-nn_oFy3-M84xjwo7Klu3N3uUGDcFv841Y0MdhZh3sP6i4RUT_oarrk47JhQ03EDb_yjEas-R_n7wax-lTJWyPsW5OfIsCEpIh9BKHOi6DwxZtmiJDuvn8l8WjZ98kM0bRiQN8RcFxpZtXDqLl5aw9P-o-Jig4Fe_nCiHgP0LUFEQmloHUMyozqf6_uXEhAMDVAUOjzom1nK6EVd3nDAeu4aLnQpv1vgbURa2fvYukR_h2EeL9QKhPMsDvtAgsFhRCNfUdRIIGLyoYjoc-qurTh6f5XkStd2T0Kh7L7yp0sgKNgmeXYJWyvfwCCriLQNlIHaYkQ3ZoL8IPZimxAIOv2ulRuX2qEO0hjLP5Lb-k5bVwAn32wzwxnQRGQRJc
> Content-Length: 14
> 
* upload completely sent off: 14 out of 14 bytes
< HTTP/1.1 200 OK
< X-Powered-By: Express
< x-patient-token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXRpZW50SWQiOiIyLTI1IiwiaWF0IjoxNDg3NzE3MzY1LCJleHAiOjE0ODc3MTgyNjUsInN1YiI6InBhdGllbnRUb2tlbiJ9.SLlayH3Kv9rf2pIITuQkIKH5CWyyKVreLvg4QQDQwaACzpTeTtU8AUKGm9Hh5WFbLqpU4nEF21_9v7nUW0dVBNbwlvr2cm3M64ZlvhuWjAER7F6M8A0HZDIc2mpAp3ut35_QXPmiD_ojBwimuboiuy2v8rpGJAJG9anbmOvdH5sl5VStmNncEOCMRwNY6rM40PMaT3ruRbuGs2svfUEtTAa_9gx7c87Va5DVJXtZvlXklFX3h9AlSsfE04WkM47JAZ2sV7462VZIxg6WVIzKFXycrufbj95ti-m3PslnQ--x2VSqrxwdzukTGEalFQhZfjh3Um-uGc-nzIwlmBleUok_SHMyAENMXdS2pwhcFPWr1GgTpFotkitfpKDuGcdnvTQpC-z-6VpiurBD85XMTA0xO-s06BRXOCm9d5bfHWVKS9ynf4afilWui3ns79F76sl2VT8Q-KUsUZV0TWjOUeK_4uY1dntuk_y0Ffgx1yvPfhnnZma0bw0aM-0czJiUfQ3nTb9FK1YHy3p6dDJFBsWp5eXZLUg3zTjiIauxKNzaw1dhwwSuik8-DXIEFPw5cDeoqqLGoJotdTwzJYJLs85eQuW1LoKGqSH2cTxuUKKJpmgrYja4UkxyCxViDqhnBtClU_O_3B2TNctnvu4SIar_O4Rnv_9pZODSOS3r0dg
< Content-Type: text/plain; charset=utf-8
< Content-Length: 2
< ETag: W/"2-4KoCHiHd29bYzs7HHpz1ZA"
< Date: Tue, 21 Feb 2017 22:49:25 GMT
< Connection: keep-alive
< 
* Connection #0 to host 10.2.2.100 left intact
OK
```
### Allergy Domain
The following commands are used to perform Allergy operations.
#### Create an allergy
```text
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <access-token>" 
-H "x-patient-token: <patient-token>"  -d '{
  "type": "Allergy",
  "reactant": {
    "id": "120_82-3",
    "sameAs": "vuid:4636681",
    "label": "CHOCOLATE"
  },
  "allergyType": "DRUG, FOOD",
  "dateOccurred": "2016-02-18T00:00:00.000Z",
  "observedOrHistorical": "OBSERVED",
  "mechanism": "ALLERGY",
  "reactions": [
    "120_83-1",
    "120_83-2"
  ],
  "allergySeverity": "MODERATE",
  "comments": [
    "unfortunate fellow\nbut mannerly!"
  ]
}' "http://10.2.2.100:9030/allergy"
```
#### Describe an allergy
```text
curl -X GET -H "Content-Type: application/json" 
-H "Authorization: Bearer <access-token>" -H "x-patient-token: <patient-token>" 
"http://10.2.2.100:9030/allergy/120_8-1"
```
#### List allergies
```text
curl -X GET -H "Content-Type: application/json" 
-H "Authorization: Bearer <access-token>" -H "x-patient-token: <patient-token>" 
"http://10.2.2.100:9030/allergy/"
```
#### Mark as entered in error (remove)
```text
curl -X PUT -H "Content-Type: application/x-www-form-urlencoded" 
-H "Authorization: Bearer <access-token>" -H "x-patient-token: <patient-token>" 
-d 'id=120_8-2&comment=by mistake' "http://10.2.2.100:9030/allergy/remove"
```
### Problem Domain
The following commands are used to perform Problem operations.
#### Create a problem
```text
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <access-token>" 
-H "x-patient-token: <patient-token>"  -d '{
  diagnosis: '80-521774',
  providerNarrative: 'Diabetes mellitus',
  problemStatus: 'ACTIVE',
  problem: '757_01-7130783',
  clinic: '44-8',
  snomedCTConceptCode: '73211009',
  snomedCTDesignationCode: '121589010',
  codingSystem: '10D'
}' "http://10.2.2.100:9030/problem"
```
#### Update a problem
```text
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <access-token>" 
-H "x-patient-token: <patient-token>"  -d '{
  id: 9000011-1, 
  onsetDate: '2016-03-01' 
}' "http://10.2.2.100:9030/problem"
```
#### Describe a problem
```text
curl -X GET -H "Content-Type: application/json" 
-H "Authorization: Bearer <access-token>" -H "x-patient-token: <patient-token>" 
"http://10.2.2.100:9030/problem/9000011-1"
```
#### List problems
```text
curl -X GET -H "Content-Type: application/json" 
-H "Authorization: Bearer <access-token>" -H "x-patient-token: <patient-token>" 
"http://10.2.2.100:9030/problem?filter=both"
```
#### Remove a problem
```text
curl -X PUT -H "Content-Type: application/x-www-form-urlencoded" 
-H "Authorization: Bearer <access-token>" -H "x-patient-token: <patient-token>" 
-d 'id=9000011-1' "http://10.2.2.100:9030/problem/remove"
```
#### Unremove a problem
```text
curl -X PUT -H "Content-Type: application/x-www-form-urlencoded" 
-H "Authorization: Bearer <access-token>" -H "x-patient-token: <patient-token>" 
-d 'id=9000011-1' "http://10.2.2.100:9030/problem/unremove"
```
#### Delete a comment
```text
curl -X DELETE -H "Content-Type: application/x-www-form-urlencoded" 
-H "Authorization: Bearer <access-token>" -H "x-patient-token: <patient-token>" 
-d 'id=9000011-1&commentIds=1&commentIds=2' "http://10.2.2.100:9030/problem/deleteComments"
```
### Vitals Domain
The following commands are used to perform Vitals operations.
#### Create a vital
```text
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <access-token>" 
-H "x-patient-token: <patient-token>"  -d '{
  vitalsTakenDateTime: 2016-02-18T00:00:00,
  vitalType: '120_51-1',
  hospitalLocation: '44-6',
  value: '120/80'
}' "http://10.2.2.100:9030/vitals"
```
#### Describe a vital
```text
curl -X GET -H "Content-Type: application/json" 
-H "Authorization: Bearer <access-token>" -H "x-patient-token: <patient-token>" 
"http://10.2.2.100:9030/vitals/120_5-1"
```
#### List vitals
```text
curl -X GET -H "Content-Type: application/json" 
-H "Authorization: Bearer <access-token>" -H "x-patient-token: <patient-token>" 
"http://10.2.2.100:9030/vitals?startDate=2017-01-01T08:30:00&endDate=2017-01-31T08:30"
```
#### List most recent vitals
```text
curl -X GET -H "Content-Type: application/json" 
-H "Authorization: Bearer <access-token>" -H "x-patient-token: <patient-token>" 
"http://10.2.2.100:9030/vitals/mostRecent"
```
#### Remove a vital
```text
curl -X PUT -H "Content-Type: application/x-www-form-urlencoded" 
-H "Authorization: Bearer <access-token>" -H "x-patient-token: <patient-token>" 
-d 'id=120_5-1&reason=INCORRECT READING' "http://10.2.2.100:9030/vitals/remove"
```
