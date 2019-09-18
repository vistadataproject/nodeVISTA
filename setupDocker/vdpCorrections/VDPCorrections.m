VDPCorrections ;
 ;
CORRECT()
 ;
 ; Changes to be effected:
 ;
 ; 1. Piece number in error
 If $Get(^DD(125.8,10,0))="OLD PROBLEM ENTRY^F^^1;1^K:$L(X)>150!($L(X)<1) X" Do
 . Set ^DD(125.8,10,0)="OLD PROBLEM ENTRY^F^^1;3^K:$L(X)>150!($L(X)<1) X"
 ;
 ; 2. <Syntax> error at EN+14^DGRPD
 Kill find,replace
 Set find(1)=" N DGSKIP S DGSKIP=$S(DGFORGN:""!,?42,""""From/To: """""",1:""?42, """"From/To: """""")"
 Set replace(1)=" N DGSKIP S DGSKIP=$S(DGFORGN:""!,?42,""""From/To: """""",1:""?42,""""From/To: """""")"
 Do FixRoutine("DGRPD",.find,.replace)
 ;
 ; 3. AC cross-reference in file #8989.5 (Parameters)
 ;    Step 1: find domain in Kernel Site Parameters
 Set ksp=$Piece($Get(^XTV(8989.3,1,0)),"^",1)
 Set domain=$Piece($Get(^DIC(4.2,ksp,0)),"^",1)
 ;    Step 2: find entry in Parameter Definition (file #8989.51)
 Set xu=$Order(^XTV(8989.51,"B","XU522",""))
 ;    Step 3: find entry in Parameters (file #8989.5) to be corrected:
 Set D0=0
 Set i=0 For  Set i=$Order(^XTV(8989.5,i)) Quit:'i  Do  Quit:D0
 . Set x=$g(^XTV(8989.5,i,0)) i $p(x,"^",2)=xu Set D0=i
 . Quit
 ;    Step 4: Use FileMan to Set .01 field in #8989.5 for this entry to the value of 'ksp'
 Do
 . New DUZ,DT,err,fda,file,iens,IO,U
 . Set DUZ=1,U="^",DT=$$DT^XLFDT
 . Set iens="+"_D0_",",file=8989.5
 . Set fda(file,iens,0.01)=ksp_";DIC(4.2"
 . Set fda(file,iens,0.02)=xu
 . Set fda(file,iens,0.03)=$Piece(^XTV(8989.5,D0,0),"^",3)
 . Do UPDATE^DIE("","fda",,"err")
 . If $Data(err) Write ! Zwrite err Write !
 . Quit
 ;
 ; 4. <Undefined> error at VALID+3^ORCACT0
 Kill find,replace
 Set find(1)=" S ORENVIR=$S($D(XQY0)&($P(XQY0,U)=""OR CPRS GUI CHART""):""GUI"",1:"""")"
 Set replace(1)=" S ORENVIR="""""
 Set replace(2)=" I $D(XQY0),$P(XQY0,U,1)=""OR CPRS GUI CHART"" S ORENVIR=""GUI"""
 Do FixRoutine("ORCACT0",.find,.replace)
 ;
 ; 5. Too many quotes in input transformation 52.07, 3 (QUANTITY)
 Do
 . New p,x
 . Set x=$Get(^DD(52.07,3,0)),p=$Piece(x,"^",5,999)
 . Quit:p'="K:(+X'>0)!(+X>99999999)!(X'?.8N.1""""."""".2N)!($L(X)>11) X"
 . Set p="K:(+X'>0)!(+X>99999999)!(X'?.8N.1""."".2N)!($L(X)>11) X"
 . Set $Piece(x,"^",5,999)=p
 . Set ^DD(52.07,3,0)=x
 . Quit
 ;
 ; 6. Too many quotes in input transformation 52.6, 19 (STRENGTH)
 Do
 . New p,x
 . Set x=$Get(^DD(52.6,19,0)),p=$Piece(x,"^",5,999)
 . Quit:p'="K:X>99999999!(X<0)!(X?.E1"""".""""9N.N) X"
 . Set p="K:X>99999999!(X<0)!(X?.E1"".""9N.N) X"
 . Set $Piece(x,"^",5,999)=p
 . Set ^DD(52.6,19,0)=x
 . Quit
 ;
 ; 7. Error in input transformation 130.03, 4 (ZIP CODE)
 Do
 . New p,x
 . Set x=$Get(^DD(130.03,4,0)),p=$Piece(x,"^",5,999)
 . Quit:p'="K:$L(X)>10!($L(X)<5)!'(X?.N) X"
 . Set p="K:X'?1(5N,5N1""-""4N) X"
 . Set $Piece(x,"^",5,999)=p
 . Set ^DD(130.03,4,0)=x
 . Quit
 ;
 ; 8. Error in input transformation 2100, 460.2 (VEND ZIP 2)
 Do
 . New p,x
 . Set x=$Get(^DD(2100,460.2,0)),p=$Piece(x,"^",5,999)
 . Quit:p'="K:$L(X)>4!($L(X)<1)!'(X'?1P.E) X"
 . Set p="K:X'?5N X"
 . Set $Piece(x,"^",5,999)=p
 . Set ^DD(2100,460.2,0)=x
 . Quit
 ;
 ; 9. Error in input transform 9.8, 1.4 (DATE OF %INDEX RUN)
 Do
 . New p,x
 . Set x=$Get(^DD(9.8,1.4,0)),p=$Piece(x,"^",5,999)
 . Quit:p'="S %DT=""ETX"" D ^%DT S X=Y K:3000000<X!(2000000>X) X"
 . Set p="S %DT=""ETX"" D ^%DT S X=Y K:X<2800101 X"
 . Set $p(x,"^",5,999)=p
 . Set ^DD(9.8,1.4,0)=x
 . Quit
 ;
 ; 10. Bad Identifier in File 52 (field 108 is not an identifier)
 Kill ^DD(52,0,"ID",108)
 ;
 ; 11. Cross-reference on File #100, field #.01
 Do
 . New count,ii,next,x
 . Set x=$Get(^DD(100,.01,1,1,1))
 . Quit:x'="S ^OR(100,""AZ"",DA,$P(^OR(100,DA,0),U,2))="""""
 . Set x="N Y2 S Y2=$P(^OR(100,DA,0),U,2) S:Y2'="""" ^OR(100,""AZ"",DA,Y2)="""""
 . Set ^DD(100,.01,1,1,1)=x
 . ;
 . ; Add companion cross-reference on field .02:
 . Set next=$Order(^DD(100,0.02,1," "),-1)+1
 . Set ^DD(100,0.02,1,next,0)="100^AZ^MUMPS"
 . Set ^DD(100,0.02,1,next,1)="S:X'="""" ^OR(100,""AZ"",DA,X)="""""
 . Set ^DD(100,0.02,1,next,2)="Q"
 . Set (ii,count)=0 For  Set ii=$Order(^DD(100,0.02,1,ii)) Quit:'ii  Set count=count+1
 . Set ^DD(100,0.02,1)="^.1^"_next_"^"_count
 . Quit
 ;
 ; 12. Check whether variable exists in ORDD100.
 Kill find,replace
 Set find(1)=" I ORACT'=ORCACT D  Q  ; not Current action"
 Set replace(1)=" I $G(ORCACT),ORACT'=ORCACT D  Q  ; not Current action"
 Do FixRoutine("ORDD100",.find,.replace)
 ;
 ; 13. Check whether global variable exists in file #51.41, field #15
 Do
 . New x
 . Set x=$Get(^DD(52.41,15,1,1,1))
 . Do:x="I $P(^PS(52.41,DA,0),""^"",3)=""NW""!($P(^(0),""^"",3)=""RNW"")!($P(^(0),""^"",3)=""RF"") S ^PS(52.41,""AD"",X,$P(^PS(52.41,DA,""INI""),""^""),DA)="""""
 . . Set x="N Y1 S Y1=$P($G(^PS(52.41,DA,""INI"")),""^"",1) I Y1'="""",$P(^PS(52.41,DA,0),""^"",3)=""NW""!($P(^(0),""^"",3)=""RNW"")!($P(^(0),""^"",3)=""RF"") S ^PS(52.41,""AD"",X,Y1,DA)="""""
 . . Set ^DD(52.41,15,1,1,1)=x
 . . Quit
 . Set x=$Get(^DD(52.41,15,1,1,2))
 . Do:x="K ^PS(52.41,""AD"",X,$P(^PS(52.41,DA,""INI""),""^""),DA)"
 . . Set x="N Y1 S Y1=$P($G(^PS(52.41,DA,""INI"")),""^"",1) I Y1'="""" K ^PS(52.41,""AD"",X,Y1,DA)"
 . . Set ^DD(52.41,15,1,1,2)=x
 . . Quit
 . Quit
 ;
 ; 14. Check whether field is populated in file #52, field #6
 ;     as well as its companion-field in file #52, field #22
 Do
 . New x
 . Set x=$Get(^DD(52,6,1,1,1))
 . Do:x="I X,$P(^PSRX(DA,2),""^"",2) S ^PSRX(""ADL"",$P(^PSRX(DA,2),""^"",2),X,DA)="""""
 . . Set x="N Y1 S Y1=$P($G(^PSRX(DA,2)),""^"",2) I X,Y1 S ^PSRX(""ADL"",Y1,X,DA)="""""
 . . Set ^DD(52,6,1,1,1)=x
 . . Quit
 . Set x=$Get(^DD(52,6,1,1,2))
 . Do:x="I X,$P(^PSRX(DA,2),""^"",2) K ^PSRX(""ADL"",$P(^PSRX(DA,2),""^"",2),X,DA)"
 . . Set x="N Y1 S Y1=$P($G(^PSRX(DA,2)),""^"",2) I X,Y1 K ^PSRX(""ADL"",Y1,X,DA)"
 . . Set ^DD(52,6,1,1,2)=x
 . . Quit
 . Set x=$Get(^DD(52,22,1,5,1))
 . Do:x="I X,$P(^PSRX(DA,0),""^"",6) S ^PSRX(""ADL"",X,$P(^PSRX(DA,0),""^"",6),DA)="""""
 . . Set x="N Y1 S Y1=$P($G(^PSRX(DA,0)),""^"",6) I X,Y1 S ^PSRX(""ADL"",X,Y1,DA)="""""
 . . Set ^DD(52,22,1,5,1)=x
 . . Quit
 . Set x=$Get(^DD(52,22,1,5,2))
 . Do:x="I X,$P(^PSRX(DA,0),""^"",6) K ^PSRX(""ADL"",X,$P(^PSRX(DA,0),""^"",6),DA)"
 . . Set x="N Y1 S Y1=$P($G(^PSRX(DA,0)),""^"",6) I X,Y1 K ^PSRX(""ADL"",X,Y1,DA)"
 . . Set ^DD(52,22,1,5,2)=x
 . . Quit
 . Quit
 ;
 ; 15. Remove unused (and conflicting) field in File #52.04, field #1
 Do
 . New count,ii,last,x
 . Quit:$Piece($Get(^DD(52.04,0)),"^",1)'="SIG1 SUB-FIELD"
 . Quit:$Piece($Get(^DD(52.04,1,0)),"^",1)'="SIG1"
 . Kill ^DD(52.04,1)
 . Kill ^DD(52.04,"B","SIG1",1)
 . Kill ^DD(52.04,"GL",0,1,1)
 . Set (count,ii,last)=0 For  Set ii=$Order(^DD(52.04,ii)) Quit:'ii  Set last=ii,count=count+1
 . Set ^DD(52.04,0)="SIG1 SUB-FIELD^^"_last_"^"_count
 . Quit
 ;
 ; 16. [9/19] Bad Trigger in DD 50 that causes insert of entries to fail - DIH=50,DIG=30 D ^DICR where 50/30 isn't valid 
 Kill ^DD(50,13,1,30)
 ;
 ;
 ; ...not clear is #99 is a correction that should be made
 ; disabled this one for now...
 ; 99. Uncertainty about which file is being pointed to in 53.51, 0.01 (PATIENT)
 Do
 . Quit  ; Don't make this change for the time being
 . New p,x
 . Set x=$Get(^DD(53.51,.01,0)),p=$Piece(x,"^",3)
 . Quit:p'="PS(55,"
 . Set p="^DPT("
 . Set $Piece(x,"^",3)=p
 . Set ^DD(53.51,.01,0)=x
 . Quit
 ;
 Quit
 ;
FixRoutine(name,find,replace) ;
 If $ZVersion["GT.M" Do FixGTMRoutine^VDPCorrectionsGTM(.name,.find,.replace) Quit
 If $ZVersion["Cache" Do FixCacheRoutine^VDPCorrectionsCache(.name,.find,.replace) Quit
 Write !!,"Current system is "_$ZVersion
 Write !,"Cannot fix routine "_name_".",!
 Quit
 ;
