## Resources

__From:__ _VA\ Code\ in\ Flight\ Submission\ -\ Enterprise\ Health\ M/ehmp-r1.2.0/ehmp_1.2.0/rdk_1.2.0/rdk_1.2.0/rdk/product/production/rdk/resources_

"Resources" appear to be hand written node.js modules that implement express server supported REST calls, some against JDS, some using VistA RPCs ("RPC-backed Resources"). The Project is interested in the RPC wrappers in order to compare VDM(N), data-centric write-back with the RPC alternative. 

Directory Tests has tests for some of these resources.

### Which Resources are RPC-backed

We ran a simple grep: _grep -rnw 'Resources' -e "VistaJS.callRpc"_ to get the data for ...

We only copied these Resources from eHMP's OSEHRA release.

Resource Module | RPC | Comment
:---: | :---: | ---
_example/exampleVistaResource.js:53 | 'ORWPT CWAD' | Example invocation
&nbsp; | &nbsp; |
cdsadvice/getCDSAdviceDetail.js:113 | 'ORQQPX REMINDER DETAIL'
cdsadvice/getCDSAdviceList.js:171 | 'ORQQPX REMINDERS LIST'
&nbsp; | &nbsp; |
__clinicalreminders__/getClinicalReminderDetail.js:65 | 'ORQQPX REMINDER DETAIL'
clinicalreminders__/getClinicalReminderList.js:58 | 'ORQQPX REMINDERS LIST'
&nbsp; | &nbsp; |
__healthsummaries__/healthSummariesResource.js:79 | REPORTLISTRPC
__healthsummaries__/healthSummariesResource.js:268 | REPORTCONTENTRPC
&nbsp; | &nbsp; |
__immunizations__/immunizationResource.js:174, 184, 194 | 'PX SAVE DATA'
&nbsp; | &nbsp; |
patientsearch/defaultSearch.js:27: 'HMPCRPC RPC' | HMP specific RPC and Resource uses JDS too
&nbsp; | &nbsp; |
__problems__/problemsResource.js:518 | 'ORQQPL4 LEX'
__problems__/problemsResource.js:751 | 'ORQQPL EDIT SAVE'
__problems__/problemsResource.js:839 | 'ORQQPL DELETE'
__problems__/problemsResource.js:1009 | 'ORQQPL ADD SAVE'
&nbsp; | &nbsp; |
singleorder/orderDetail.js:80 | 'ORQOR DETAIL' | Just a Read
&nbsp; | &nbsp; |
supportdata/locationsResource.js | 'ORQPT CLINIC PATIENTS', 'ORWPT BYWARD' | parsed manually from file. Has JDS too. Uses _async.waterfall_
&nbsp; | &nbsp; |
vistaResource.js:31 | &nbsp; | runs ANY RPC - wrapper on VistaJS
&nbsp; | &nbsp; |
__vitals__/enteredinerrorResource.js:79 | 'GMV MARK ERROR'
__vitals__/vitalsResource.js:183 | 'GMV CLOSEST READING'
__vitals__/vitalsResource.js:228 | 'GMV V/M ALLDATA' | 
__vitals__/vitalsResource.js:230, 501 | 'GMV VITALS/CAT/QUAL' |
__vitals__/writebackvitalssaveResource.js:228 | 'GMV ADD VM' |
&nbsp; | &nbsp; |
writeback__allergy__/enteredinerrorResource.js:100 | 'ORWDAL32 SAVE ALLERGY'
writeback__allergy__/enteredinerrorResource.js:155 | 'ORWDAL32 CLINUSER'
writeback__allergy__/operationaldataResource.js:103 | 'ORWDAL32 ALLERGY MATCH'
writeback__allergy__/operationaldataResource.js:131 | 'ORWDAL32 SYMPTOMS'
writeback__allergy__/writebackallergysaveResource.js:331 | 'ORWDAL32 SAVE ALLERGY'
&nbsp; | &nbsp; |
writeback__med__/operationaldataResource.js:479 | 'ORWDX LOADRSP'
writeback__med__/operationaldataResource.js:567 | 'ORWUL FVIDX'
writeback__med__/operationaldataResource.js:725 | getVistaRpcConfiguration(req.app.config, req.session.user.site),
writeback__med__/operationaldataResource.js:804 | 'ORWDPS2 OISLCT'
writeback__med__/operationaldataResource.js:879 | 'ORWDX DLGDEF'
writeback__med__/operationaldataResource.js:915 | 'ORWDX2 DCREASON'
writeback__med__/operationaldataResource.js:972 | 'ORWDPS2 DAY2QTY'
writeback__med__/writebackmedicationsaveResource.js:127 | 'ORWDXA DC'
writeback__med__/writebackmedicationsaveResource.js:214 | 'ORWDX SAVE'
writeback__med__/writebackmedicationsaveResource.js:247 | 'ORWDX SEND'
writeback__med__/writebackopmedorderResource.js:126 | 'ORWDX SAVE' | outpatient med is like vital, a one-file, stateless record
writeback__med__/writebackopmedorderResource.js:156 | 'ORWDX SEND'
writeback__med__/writebackopmedorderResource.js:254 | 'ORWUL FV4DG'
writeback__med__/writebackopmedorderResource.js:262 | 'ORWUL FVIDX'
writeback__med__/writebackopmedorderResource.js:281 | 'ORWUL FVSUB'
&nbsp; | &nbsp; |

Notes:
  * Tests: _writebackopmedorderResource.js_, writebackmedicationsaveResource-spec.js and _writebackvitalResource-spec.js_ just test _verifyInput_
  * Tests: writebackmed_operationaldataResource-spec.js, _writebackallergysaveResource_ lead to RPC invocations
  * _labs_ and _radiology_ just have placeholders for VistA interaction ("production code"). Left in as presume these will be/have been fleshed out
  * _visits_ is just JDS and so isn't here

### A RPC-backed Resource - Vitals

Vitals get three "resources". Two allow write back (entered in error and save resource) and one allows a variety of reads. All three in _resources/vitals_.

The relatively simple _vitals/enteredinerrorResource.js_ allows a Javascript client to mark a VistA Vital Record (File 120.5) as "entered in error". It shows all the features of these "resource modules":
  
  * a _getResourceConfig_ function describes the operations a resource supports. In this case, there's one operation, a _put_, called _deleteVital_
    * the embedded _params_ objects defines the parameters of the operation, providing just two pieces of information: a human-readable description and whether the parameters are mandatory or not. It is notable that the type of the property is not formally defined
    * there is a VistA-like key defined for the operation ("remove-patient-vital"). Presumably this is used to control whether a user can invoke the operation. Like VistA RPC security, this is 
  * a _verifyInput_ function tests input data. This is procedural code - the _params_ declaration in _getResourceConfig_ isn't leveraged to enforce that mandatory parameters are present. And it performs range checks, something _params_ doesn't help with.
  * the implementation of the resource's one operation, _deleteVital_
    * uses VistaJS to call an RPC, _GMV MARK ERROR_. Invocation is synchronous. _async_ isn't used. _getVistaRpcConfiguration_ is used to put together different parts of the RPC string
    * has a javadoc like documentation banner (/** ...) which seems to be setup for JSDoc - YUIDoc needs @class declarations and those are missing. There's no @tutorial so they must just provide basic JSDoc's. The _param_ assertion in this banner seems to come from the same source as _params_ of _getResourceConfig_ as quirks in spacing of descriptions match up 
    * calls _verifyInput_ near the start and logs its activities 
    * invoked behind REST and uses _req.logger_ and takes user id (DUZ) from the user session accessible from _req_
  * the end of this node.js module exports _getResourceConfig_ and the one operation, _deleteVital_. It doesn't export _verifyInput_ though its peers do for their __verifyInput_.
  * the _jslint node: true_ at the top of the file shows _jslint_ is used. This directive tells jslint that this is a node module that gets access to built-in node.js modules by default.
  
What's most notable is how "padded" all this is. No aspect is data-driven. Instead, inline procedural code is hand crafted. 

Moving on to _vitals/writebackvitalssaveResource_. It has the same triple a _enteredinerrorResource.js_. 

  * _getResourceConfig_ (again) declares one operation but this time invoked with 'push' and not 'put'
    * the parameter list of its one operation, _writeBackVitals_, is longer and has optional as well as mandatory parameters. 
    * the security key is "add-patient-vital"
    * unlike the VistA native model, they distinguish types of value ("reading", "flowRate", "o2Concentration") and use metric and not imperial units. Translation to imperial is performed in _writeBackVitals_ before it invokes the VistA RPC
    * a lot of IENS (locIEN, fileIEN, dfn, duz). Contrast this with the VPR JSON for vitals where URNs are used
  * _verifyInput_ only validates the presence of required parameters. It doesn't enforce ranges and so could have been data driven and used _params_ from _getResourceConfig_.
  * _writeBackVitals_ invokes its RPC multiple times, once for each vital in the input data
    * RPC invocation is inside _async_
    * current time, something in many VistA file entries, is calculated and added first the RPC values
    * there is a value translation (metric to imperial) using both commonplace (_mathjs_) and VistA specific modules (_filemanDateUtil_, _paramUtil_)
    * much of the code is for RPC value formatting 
    * the operation is invoked behind _express_ with its _req_ and _resp_ arguments. 
      * _rdk_ provides utilities for REST
      * authentication is performed and a user identified from the session id
  * The resource's _verifyInput_ is tested in the test code _writebackvitalResource-spec.js_ which tries an input without a mandatory parameter, adds it and tries again
  
These two write resources have a _get_ sibling, _vitalsResource.js_.
  * has four operations in getResourceConfig and the configs have 'name' and 'path' filled in, something that is empty in the write-back configs
  * uses two RPCs (_GMV V/M ALLDATA_, _GMV VITALS/CAT/QUAL_) in its operations 
  * reformats replies into "nice" JSON
  * _apiDocs_ is "new" - the write backs don't have it.

### Summary

  * invocation is behind an express-implemented REST interface (RDF Fetch Server?)
  * that interface sometimes goes to JDS-backed Resources, sometimes to RPC-backed Resources
  * the method parameter definitions lack commonplaces of data modeling like ranges, something that prevents data-driving the code
  * each RPC needs a custom parser and formatter to become JSON-enabled. That's a lot of custom wrapper code!
    * could get some automation by using VistA's file 8994 (remote procedure). It breaks out RPC parameters formally. Even though
      this would only allow _native RPC JSON_, it would be a starting point
  * as if VPR RPC doesn't exist
    * RPC Resource's get responses differ from VPR equivalents
    * IEN based, not URN based
  * only some have test code 
  * there are placeholders in this _production code_: see _lab_ writebacks

