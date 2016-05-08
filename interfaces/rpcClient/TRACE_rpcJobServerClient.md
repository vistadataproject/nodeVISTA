

=== Login and call patient information RPCs over EWD-enabled RPC Job Server ===

... note asking for GLOBAL ARRAYS to be parsed and SINGLE VALUES to be sent back 'raw'



----------
First Logging in ...


Login response:
[31m[39m
[36m{ token: '88c20888-07fa-41f5-ab79-eba339ed8c81',
  displayName: 'SMITH,MARY',
  greeting: 'Good morning SMITH,MARY',
  lastSignon: '     You last signed on today at 01:00',
  messages: [ '     You last signed on today at 01:00' ],
  duz: 55 }[39m


----------
First list Patients
... note that return type is array and that is parsed automatically.


RPC called: ORWPT LIST ALL | rpcArgs: [{"type":"LITERAL","value":1},{"type":"LITERAL","value":1}]

RPC response:
[31m[39m
[36m{ type: 'ARRAY',
  value: 
   { '1': '1^CARTER,DAVID JR^^^^CARTER,DAVID JR',
     '2': '18^EIGHT,PATIENT H^^^^EIGHT,PATIENT H',
     '3': '23^EIGHTEEN,PATIENT R^^^^EIGHTEEN,PATIENT R',
     '4': '6^ELEVEN,PATIENT K^^^^ELEVEN,PATIENT K',
     '5': '19^FIFTEEN,PATIENT O^^^^FIFTEEN,PATIENT O',
     '6': '21^FIVE,PATIENT E^^^^FIVE,PATIENT E',
     '7': '25^FOUR,PATIENT D^^^^FOUR,PATIENT D',
     '8': '2^FOURTEEN,PATIENT N^^^^FOURTEEN,PATIENT N',
     '9': '5^NINE,PATIENT I^^^^NINE,PATIENT I',
     '10': '9^NINETEEN,PATIENT S^^^^NINETEEN,PATIENT S',
     '11': '4^ONE,PATIENT A^^^^ONE,PATIENT A',
     '12': '3^SEVEN,PATIENT G^^^^SEVEN,PATIENT G',
     '13': '16^SEVENTEEN,PATIENT Q^^^^SEVENTEEN,PATIENT Q',
     '14': '7^SIX,PATIENT F^^^^SIX,PATIENT F',
     '15': '17^SIXTEEN,PATIENT P^^^^SIXTEEN,PATIENT P',
     '16': '15^TEN,PATIENT J^^^^TEN,PATIENT J',
     '17': '24^THIRTEEN,PATIENT M^^^^THIRTEEN,PATIENT M',
     '18': '10^THREE,PATIENT C^^^^THREE,PATIENT C',
     '19': '20^TWELVE,PATIENT L^^^^TWELVE,PATIENT L',
     '20': '12^TWENTY,PATIENT T^^^^TWENTY,PATIENT T',
     '21': '13^TWENTYFOUR,PATIENT X^^^^TWENTYFOUR,PATIENT X',
     '22': '22^TWENTYONE,PATIENT U^^^^TWENTYONE,PATIENT U',
     '23': '14^TWENTYTHREE,PATIENT W^^^^TWENTYTHREE,PATIENT W',
     '24': '8^TWENTYTWO,PATIENT V^^^^TWENTYTWO,PATIENT V',
     '25': '11^TWO,PATIENT B^^^^TWO,PATIENT B' } }[39m


Get details about first two patients ...


----------
Process Patient: 1^CARTER,DAVID JR^^^^CARTER,DAVID JR


RPC called: ORWPT SELECT | rpcArgs: [{"type":"LITERAL","value":"1"}]

RPC response:
[31m[39m
[36m{ type: 'SINGLE VALUE',
  value: 'CARTER,DAVID JR^M^3010302^000000113^^^^^0^^0^0^^^15^0' }[39m

RPC called: ORWPT1 PRCARE | rpcArgs: [{"type":"LITERAL","value":"1"}]

RPC response:
[31m[39m
[36m{ type: 'SINGLE VALUE', value: '^^^^^' }[39m

RPC called: GMV V/M ALLDATA | rpcArgs: [{"type":"LITERAL","value":"1"}]

RPC response:
[31m[39m
[36m{ type: 'GLOBAL ARRAY',
  value: 
   { 'GMV V/M ALLDATA': 
      { '1': 'CARTER,DAVID JR  0113  MAR 2,2001  15 (Yrs)  MALE',
        '2': 'Unit:    Room: ',
        '3': 'Division: ',
        '4': ' - ',
        '5': 'NO DATA',
        result: { type: 'GLOBAL ARRAY', value: '^TMP(26909)' } } } }[39m

RPC called: ORQQAL LIST | rpcArgs: [{"type":"LITERAL","value":"1"}]

RPC response:
[31m[39m
[36m{ type: 'ARRAY', value: { '1': '^No Allergy Assessment' } }[39m

RPC called: VPR GET PATIENT DATA | rpcArgs: [{"type":"LITERAL","value":"1"},{"type":"LITERAL","value":"demographic;vital;allergy"}]

RPC error:
[31m'-4 RPC [VPR GET PATIENT DATA] is not allowed to be run: The remote procedure VPR GET PATIENT DATA is not registered to the option OR CPRS GUI CHART.'[39m
[36m[39m

... finished processing one (more) patient.




----------
Process Patient: 18^EIGHT,PATIENT H^^^^EIGHT,PATIENT H


RPC called: ORWPT SELECT | rpcArgs: [{"type":"LITERAL","value":"18"}]

RPC response:
[31m[39m
[36m{ type: 'SINGLE VALUE',
  value: 'EIGHT,PATIENT H^M^2330401^655447777^^^^^0^^0^1^^^83^0' }[39m

RPC called: ORWPT1 PRCARE | rpcArgs: [{"type":"LITERAL","value":"18"}]

RPC response:
[31m[39m
[36m{ type: 'SINGLE VALUE', value: '^^^^^' }[39m

RPC called: GMV V/M ALLDATA | rpcArgs: [{"type":"LITERAL","value":"18"}]

RPC response:
[31m[39m
[36m{ type: 'GLOBAL ARRAY',
  value: 
   { 'GMV V/M ALLDATA': 
      { '1': 'EIGHT,PATIENT H  7777  APR 1,1933  83 (Yrs)  MALE',
        '2': 'Unit:    Room: ',
        '3': 'Division: ',
        '4': ' - ',
        '5': 'NO DATA',
        result: { type: 'GLOBAL ARRAY', value: '^TMP(26909)' } } } }[39m

RPC called: ORQQAL LIST | rpcArgs: [{"type":"LITERAL","value":"18"}]

RPC response:
[31m[39m
[36m{ type: 'ARRAY', value: { '1': '^No Allergy Assessment' } }[39m

RPC called: VPR GET PATIENT DATA | rpcArgs: [{"type":"LITERAL","value":"18"},{"type":"LITERAL","value":"demographic;vital;allergy"}]

RPC error:
[31m'-4 RPC [VPR GET PATIENT DATA] is not allowed to be run: The remote procedure VPR GET PATIENT DATA is not registered to the option OR CPRS GUI CHART.'[39m
[36m[39m

... finished processing one (more) patient.





====== 
all done.

