vdp@vagrant-ubuntu-precise-64:~/interfaces/rpcClient$ node rpcJobServerClientAllergies.js 


=== Login and call patient information RPCs over EWD-enabled RPC Job Server ===

... note asking for GLOBAL ARRAYS to be parsed and SINGLE VALUES to be sent back 'raw'



----------
First Logging in ...


Login response:

{ token: 'aa5b2fc7-0d74-494e-9ba0-c4deb110d1c9',
  displayName: 'SMITH,MARY',
  greeting: 'Good morning SMITH,MARY',
  lastSignon: '     You last signed on today at 05:40',
  messages: [ '     You last signed on today at 05:40' ],
  duz: 55 }

RPC called: ORWDAL32 SAVE ALLERGY | rpcArgs: [{"type":"LITERAL","value":""},{"type":"LITERAL","value":"1"},{"type":"LIST","value":{"GMRAGNT":"PENICILLINS AND BETA-LACTAM ANTIMICROBIALS^11;PS(50.605,","GMRATYPE":"D","GMRANATR":"U","GMRAORIG":"55","GMRAORDT":"3160218.173200","GMRAOBHX":"h"}}]

RPC called: ORQQAL DETAIL | rpcArgs: [{"type":"LITERAL","value":1},{"type":"LITERAL","value":1}]

RPC called: ORWDAL32 LOAD FOR EDIT | rpcArgs: [{"type":"LITERAL","value":1}]

RPC response:

{ type: 'SINGLE VALUE', value: 0 }

{ type: 'SINGLE VALUE', value: 0 }

RPC response:

{ type: 'ARRAY',
  value: 
   { '1': '    Causative agent: PENICILLINS AND BETA-LACTAM ANTIMICROBIALS',
     '2': ' Nature of Reaction: Unknown',
     '3': ' ',
     '4': '       Drug Classes: PENICILLINS AND BETA-LACTAM ANTIMICROBIALS',
     '5': ' ',
     '6': '         Originator: SMITH,MARY',
     '7': '         Originated: Feb 18, 2016@17:32',
     '8': '           Verified: <auto-verified>',
     '9': 'Observed/Historical: Historical' } }

{ type: 'ARRAY',
  value: 
   { '1': '    Causative agent: PENICILLINS AND BETA-LACTAM ANTIMICROBIALS',
     '2': ' Nature of Reaction: Unknown',
     '3': ' ',
     '4': '       Drug Classes: PENICILLINS AND BETA-LACTAM ANTIMICROBIALS',
     '5': ' ',
     '6': '         Originator: SMITH,MARY',
     '7': '         Originated: Feb 18, 2016@17:32',
     '8': '           Verified: <auto-verified>',
     '9': 'Observed/Historical: Historical' } }

RPC response:

{ type: 'GLOBAL ARRAY',
  value: 
   { 'ORWDAL32 LOAD FOR EDIT': 
      [ '~CAUSATIVE AGENT',
        'dPENICILLINS AND BETA-LACTAM ANTIMICROBIALS',
        '~ALLERGY TYPE',
        'dD^DRUG',
        '~NATURE OF REACTION',
        'dU^UNKNOWN',
        '~SIGN/SYMPTOMS',
        '~ORIGINATOR',
        'd55^SMITH,MARY',
        '~ORIGINATED',
        'd3160218.173200',
        '~COMMENTS',
        '~ID BAND MARKED',
        '~CHART MARKED',
        '~VERIFIER',
        '~VERIFIED',
        'dYES^3160516.054251',
        '~ENTERED IN ERROR',
        'dNO',
        '~OBS/HIST',
        'dh^HISTORICAL' ] } }

{ type: 'GLOBAL ARRAY',
  value: 
   { 'ORWDAL32 LOAD FOR EDIT': 
      [ '~CAUSATIVE AGENT',
        'dPENICILLINS AND BETA-LACTAM ANTIMICROBIALS',
        '~ALLERGY TYPE',
        'dD^DRUG',
        '~NATURE OF REACTION',
        'dU^UNKNOWN',
        '~SIGN/SYMPTOMS',
        '~ORIGINATOR',
        'd55^SMITH,MARY',
        '~ORIGINATED',
        'd3160218.173200',
        '~COMMENTS',
        '~ID BAND MARKED',
        '~CHART MARKED',
        '~VERIFIER',
        '~VERIFIED',
        'dYES^3160516.054251',
        '~ENTERED IN ERROR',
        'dNO',
        '~OBS/HIST',
        'dh^HISTORICAL' ] } }
