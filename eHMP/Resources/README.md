## RPC-backed, Patient (P) Resources

__From:__ _VA\ Code\ in\ Flight\ Submission\ -\ Enterprise\ Health\ M/eHMP/rdk-r1.3.M1/rdk/product/production/rdk/src/resources_ (more recent: Oct 2015)

__MORE INFO__: [VISTA Sandbox's VXAPI Hosting](https://ehmp.vaftl.us/resource/docs/vx-api/) has a lot more docs.

### The Resource Pattern

"Resources" are hand written node.js modules that implement REST calls running in an express server - the [express framework](http://expressjs.com/en/index.html) is the most widely used node.js web framework. Some use JDS, some use VistA RPCs ("RPC-backed Resources"). The name "Resource" comes from eHMP's _Resource Development Kit (RDK)_. 

__KRM__, a contractor on eHMP, host an older version of OSEHRA's eHMP release (v1.2) on their [own git](https://github.com/KRMAssociatesInc/eHMP/tree/master/rdk/product/production/rdk) and started some badly needed documentation ...

> A resource is a single web service (allergies, or "save allergies"). ... A resource is responsible for receiving an HTTP request, performing the processing by interacting with other subsystems [VistA, JDS], and then returning an HTTP response. ... A resource server is a deployable unit, including a set of resource and specific configuration. ... the VistA Core ecosystem has one single resource server, _VistA Exchange API Resource Server_.

This _Resource Pattern_ and its supporting utilities is eHMP's main addition to _express_ and other common node.js modules to discipline the development of VistA and JDS services. It is appropriate that the "RDK" is called __node-vistaexpress__ in its package.json (see copies of server setup and scripts in _RDKServer_). 

A bit more context:
  * __Server Framework__: _RDK/node-vistaexpress_ is a peer of [EWD](https://github.com/robtweed/ewd.js/tree/master), a VistA and NoSQL-aware node.js server framework. While _RDK_ is "express (async) with a design pattern", EWD is more task oriented and focused on synchronous, process bound services, a pattern required by non thread safe VistA. 
  * __Service or Object Framework__: the _Resource Pattern_ implementation is akin to the [mongoose](http://mongoosejs.com/) object framework, a node.js framework for object oriented application development over MongoDB, the noSQL database. As expected of a widely used framework, _mongoose_ presents a more finished face and unlike the service-by-service orientation of _Resources_, _mongoose_ presents Objects with well defined data definitions (schemas). Such a data and schema focus will also be taken in the Project's VDM and MVDM modules.

The Project is only interested in the RPC-backed Resources, the ones that talk to VistA. We will compare VDM(N), data-centric write-back with the RPC alternative. Is _symmetric data-driven read-write_ better?

The directory "Tests" has eHMP's tests for some of these resources.

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

### RPCs in eHMP Resources

From: parseResourcesForRPCs.py

Number of files considered - 170 vs matched - 22

\# | RPC | where
:---: | :--- | ---
1 | GMV ADD VM | vitals/writebackvitalssaveResource.js
2 | GMV CLOSEST READING | vitals/vitals-resource.js
3 | GMV MARK ERROR | vitals/entered-in-error-resource.js
4 | GMV V/M ALLDATA | vitals/vitals-resource.js
5 | GMV VITALS/CAT/QUAL | vitals/vitals-resource.js
6 | HMPCRPC RPC | patient-search/default-search.js
7 | ORQOR DETAIL | order-detail-resource.js
8 | ORQQPL ADD SAVE | problems-resource.js
9 | ORQQPL DELETE | problems-resource.js
10 | ORQQPL EDIT SAVE | problems-resource.js
11 | ORQQPL4 LEX | problems-resource.js
12 | ORQQPX REMINDER DETAIL | cdsadvice/get-cds-advice-detail.js<br>clinical-reminders/get-clinical-reminder-detail.js
13 | ORQQPX REMINDERS LIST | cdsadvice/get-cds-advice-list.js<br>clinical-reminders/get-clinical-reminder-list.js
14 | ORWDAL32 ALLERGY MATCH | writebackallergy/operationaldataResource.js
15 | ORWDAL32 CLINUSER | writebackallergy/enteredinerrorResource.js
16 | ORWDAL32 SAVE ALLERGY | writebackallergy/enteredinerrorResource.js<br>writebackallergy/writebackallergysaveResource.js
17 | ORWDAL32 SYMPTOMS | writebackallergy/operationaldataResource.js
18 | ORWDPS1 DFLTSPLY | writebackmed/operationaldataResource.js
19 | ORWDPS2 DAY2QTY | writebackmed/operationaldataResource.js
20 | ORWDPS2 OISLCT | writebackmed/operationaldataResource.js
21 | ORWDX DLGDEF | writebackmed/operationaldataResource.js
22 | ORWDX LOADRSP | writebackmed/operationaldataResource.js
23 | ORWDX LOCK ORDER | writebackorder/signorderResource.js
24 | ORWDX SAVE | writebackmed/writebackmedicationsaveResource.js<br>writebackmed/writebackopmedorderResource.js
25 | ORWDX SEND | writebackmed/writebackmedicationsaveResource.js<br>writebackmed/writebackopmedorderResource.js<br>writebackorder/signorderResource.js
26 | ORWDX UNLOCK ORDER | writebackorder/signorderResource.js
27 | ORWDX2 DCREASON | writebackmed/operationaldataResource.js
28 | ORWDXA DC | writebackmed/writebackmedicationsaveResource.js
29 | ORWDXA VALID | writebackorder/signorderResource.js
30 | ORWPCE GETSVC | visits/visit-service-category-resource.js
31 | ORWPT CWAD | _example/example-vista-resource.js
32 | ORWRP REPORT LISTS | health-summaries-resource.js
33 | ORWRP REPORT TEXT | health-summaries-resource.js
34 | ORWU NPHASKEY | writebackorder/signorderResource.js
35 | ORWU VALIDSIG | writebacknote/signnoteResource.js<br>writebackorder/signorderResource.js
36 | ORWUL FV4DG | writebackmed/writebackopmedorderResource.js
37 | ORWUL FVIDX | writebackmed/operationaldataResource.js<br>writebackmed/writebackopmedorderResource.js
38 | ORWUL FVSUB | writebackmed/writebackopmedorderResource.js
39 | TIU AUTHORIZATION | writebacknote/signnoteResource.js
40 | TIU CREATE RECORD | writebacknote/createnoteResource.js
41 | TIU LOCK RECORD | writebacknote/signnoteResource.js
42 | TIU SIGN RECORD | writebacknote/signnoteResource.js
43 | TIU UNLOCK RECORD | writebacknote/signnoteResource.js
44 | TIU UPDATE RECORD | writebacknote/signnoteResource.js
45 | TIU WHICH SIGNATURE ACTION | writebacknote/signnoteResource.js


