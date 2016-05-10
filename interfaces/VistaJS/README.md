__From:__ _VA Code in Flight Submission - Enterprise Health M/ehmp-r1.2.0/ehmp_1.2.0/rdk_1.2.0/rdk_1.2.0/rdk/product/production/rdk/VistaJS_ (eHMP from OSEHRA)

VistaJS: a Javascript equivalent to various RPC Broker client side libraries in Python (in FMQL) and Java (in MDWS). 

Note: __not node.js Vista.js__ - a separate project to provide a node.js module for node on VistA. There's a lot of unfortunate name reuse in VistA now. 

TODO: get v1.3 version

__Relevance__: no direct relevance to VDP. VDP calls are inside VISTA, relying on _cache.node_/_nodem_. Anything you can do over the broker using this Vista.js or its equivalents can be done directly inside VISTA.

## CHANGES Made by VDP

 VistAJsLibrary_ supports both the VA and OSEHRA Ciphers - the OSEHRA cipher is the default in our version.
