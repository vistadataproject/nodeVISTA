VDPCorrections ;
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
 . Set x=$Get(^DD(2100,460.2,0),p=$Piece(x,"^",5,999)
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
 ; 10. Error in cross-reference 52, 6: undefined variable
 Do
 . New p,x
 . Set x=$Get(^DD(52,6,1,1,1))
 . Quit:x'="I X,$P(^PSRX(DA,2),""^"",2) S ^PSRX(""ADL"",$P(^PSRX(DA,2),""^"",2),X,DA)=""""
 . Set x="I X,$P($G(^PSRX(DA,2)),""^"",2) S ^PSRX(""ADL"",$P(^PSRX(DA,2),""^"",2),X,DA)=""""
 . Set ^DD(52,6,1,1,1)=x
 . Quit
 Do
 . New p,x
 . Set x=$Get(^DD(52,6,1,1,2))
 . Quit:x'="I X,$P(^PSRX(DA,2),""^"",2) K ^PSRX(""ADL"",$P(^PSRX(DA,2),""^"",2),X,DA)"
 . Set x="I X,$P($G(^PSRX(DA,2)),""^"",2) K ^PSRX(""ADL"",$P(^PSRX(DA,2),""^"",2),X,DA)"
 . Set ^DD(52,6,1,1,2)=x
 . Quit
 ;
 ; 11. Fields should not be Required in File 52 (fields 99, 99.1, 99.2 and 108)
 Do
 . New field,p,x
 . For field=99,99.1,99.2,108 Do
 . . Set x=$Get(^DD(52,field,0)),p=$Piece(x,"^",3)
 . . Quit:p'["R"
 . . Set $Piece(x,"^",2)=$Translate(p,"R")
 . . Set ^DD(52,field,0)=x
 . . Quit
 . Quit
 ;
 ; ...not clear is #12 is a correction that should be made
 ; disabled this one for now...
 ; 12. Uncertainty about which file is being pointed to in 53.51, 0.01 (PATIENT)
 Do
 . Quit  ; Don't make this change for the time being
 . New p,x
 . Set x=$Get(^DD(53.51,.01,0)),p=$Piece(x,"^",3)
 . Quit:p'="PS(55,"
 . Set p="^DPT("
 . Set $Pece(x,"^",3)=p
 . Set ^DD(53.51,.01,0)=x
 . Quit
 ;
 ; 13. Cross-reference on File #100, field #.01
 Do
 . New count,ii,next,x
 . Set x=$Get(^DD(100,.01,1,1,1))
 . Quit:x'="S ^OR(100,""AZ"",DA,$P(^OR(100,DA,0),U,2))="""""
 . Set x="N Y2 S Y2=$P(^OR(100,DA,0),U,2) S:Y2'="""" S ^OR(100,""AZ"",DA,Y2)="""""
 . Set ^DD(100,.01,1,1,1)=x
 . ;
 . ; Add companion cross-reference on field .02:
 . Set next=$Order(^DD(100,0.02,1," "),-1)+1
 . Set ^DD(100,0.02,1,next,0)="100^AZ^MUMPS"
 . Set ^DD(100,0.02,1,next,1)="S:X'="""" S ^OR(100,""AZ"",DA,X)="""""
 . Set ^DD(100,0.02,1.next.2)="Q"
 . Set (ii,count)=0 For  Set ii=$Order(^DD(100,0.02,1,ii)) Quit:'ii  Set count=count+1
 . Set ^DD(100,0.02,1)="^.1^"_next_"^"_count
 . Quit
 ;
 ; 14. Check whether variable exists in ORDD100.
 Kill find,replace
 Set find(1)=" I ORACT'=ORCACT D  Q  ; not Current action"
 Set replace(1)=" I $G(ORCACT),ORACT'=ORCACT D  Q  ; not Current action"
 Do FixRoutine("ORDD100",.find,.replace)
 ;
 ; 15. Check whether global variable exists in file #51.41, field #15
 Do
 . New x
 . Set x=$Get(^DD(52.41,15,1,1,1))
 . Do:x="I $P(^PS(52.41,DA,0),""^"",3)=""NW""!($P(^(0),""^"",3)=""RNW"")!($P(^(0),""^"",3)=""RF"") S ^PS(52.41,""AD"",X,$P(^PS(52.41,DA,""INI""),""^""),DA)="""""
 . . Set x="N Y1 S Y1=$P($G(^PS(52.41,DA,""INI"")),""^"",1) I Y1'="",$P(^PS(52.41,DA,0),""^"",3)=""NW""!($P(^(0),""^"",3)=""RNW"")!($P(^(0),""^"",3)=""RF"") S ^PS(52.41,""AD"",X,Y1,DA)="""""
 . . Set ^DD(52.41,15,1,1,1)=x
 . . Quit
 . Set x=$Get(^DD(52.41,15,1,1,2))
 . Do:x="K ^PS(52.41,""AD"",X,$P(^PS(52.41,DA,""INI""),""^""),DA)"
 . . Set x="N Y1 S Y1=$P($G(^PS(52.41,DA,""INI"")),""^"",1) I Y1'="""" K ^PS(52.41,""AD"",X,Y1,DA)"
 . . Set ^DD(51.41,15,1,1,2)=x
 . . Quit
 . Quit
 ;
 ; 16. Check whether field is populated in file #52, field #6
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
 . Do:x="I X,$P(^PSRX(DA,0),""^"",6) S ^PSRX(""ADL"",X,$P(^PSRX(DA,0),""^"",6),DA)=""
 . . Set x="N Y1 S Y1=$P($G(^PSRX(DA,0)),""^"",6) I X,Y1 S ^PSRX(""ADL"",X,Y1,DA)=""
 . . Set ^DD(52,22,1,5,1)=x
 . . Quit
 . Set x=$Get(^DD*52,22,1,5,2))
 . Do:x="I X,$P(^PSRX(DA,0),""^"",6) K ^PSRX(""ADL"",X,$P(^PSRX(DA,0),""^"",6),DA)"
 . . Set x="N Y1 S Y1=$P($G(^PSRX(DA,0)),""^"",6) I X,Y1 K ^PSRX(""ADL"",X,Y1,DA)"
 . . Set ^DD*52,22,1,5,2)=x
 . . Quit
 . Quit
 ;
 ; 17. Remove unused (and conflicting) field in File #52.04, field #1
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
 Quit
 ;
Search(name) New void
 Set void=$ZSearch("")
 Quit $ZSearch(name)
 ;
FixRoutine(name,find,replace) ;
 If $ZVersion["GT.M" Do FixGTMRoutine(.name,.find,.replace) Quit
 If $ZVersion["Cache" Do FixCacheRoutine(.name,.find,.replace) Quit
 Write !!,"Current system is "_$ZVersion
 Write !,"Cannot fix routine "_name_".",!
 Quit
 ;
FixGTMRoutine(name,find,replace) New done,found,i1,i2,line,max,new,newfile,ok,oldfile,oldfile1,oldfile2,savefile
 Set oldfile1="/home/nodevista/r/"_name_".m"
 Set oldfile2="/home/nodevista/p/"_name_".m"
 Set new="/home/nodevista/p/"_name_".new"
 Set new="./"_name_".new" ; remove when done testing
 Set max=$Order(find(""),-1)
 For i1=1:1 Set newfile=new_i1 Quit:$$Search(newfile)=""
 Set savefile="" Do:$$Search(oldfile2)'=""
 . For i1=1:1 Set savefile="/home/nodevista/p/"_name_".old"_i1 Quit:$$Search(savefile)=""
 . Quit
 Set oldfile=oldfile2 Set:$$Search(oldfile)="" oldfile=oldfile1
 If $$Search(oldfile)="" Write !,"Cannot find "_oldfile,! Quit
 ;
 Open oldfile:readonly Use oldfile
 Set i1=0,done=0 For  Do  Quit:done
 . Set $ETrap="Set done=1,$ECode="""""
 . Read line Set:line'="" i1=i1+1,line(i1)=line
 . Quit
 Close oldfile
 Open newfile:newversion Use newfile
 Set found=0,i1="" For  Set i1=$Order(line(i1)) Quit:i1=""  Do
 . If line(i1)'=find(1) Write line(i1),! Quit
 . If max=1 Do  Quit
 . . Set found=found+1
 . . Set i2="" For  Set i2=$Order(replace(i2)) Quit:i2=""  Write replace(i2),!
 . . Quit
 . Set ok=1 For i2=2:1:max If $Get(line(i1+i2))'=find(i2) Set ok=0 Quit
 . If 'ok Write line(i1),! Quit
 . Set found=found+1
 . Set i2="" For  Set i2=$Order(replace(i2)) Quit:i2=""  Write replace(i2),!
 . Quit
 If 'found Do  Quit
 . Close newfile:delete
 . Use $Principal
 . Write !,"No changes made, no new file created"
 . Quit
 If savefile'="" ZSystem "cp "_oldfile_" "_savefile
 Close newfile:rename=oldfile2
 Use $Principal
 Write !,found_" change"_$Select(found=1:"",1:"s")_" made."
 Write:savefile'="" !,"Old file saved as "_savefile
 Write !,"New file saved as "_oldfile2
 Quit
 ;
FixCacheRoutine(name,find,replace) New done,found,i1,i2,i3,line,max,new,newcode,ok,oldcode
 For i1=1:1 Set line=$Text(+i1^@name) Quit:line=""  Set oldcode(i1)=line
 Set max=$Order(find(""),-1)
 Set found=0,i3=0,i1="" For  Set i1=$Order(oldcode(i1)) Quit:i1=""  Do
 . If oldcode(i1)'=find(1) Set i3=i3+1,newcode(i3)=oldcode(i1) Quit
 . If max=1 Do  Quit
 . . Set found=found+1
 . . Set i2="" For  Set i2=$Order(replace(i2)) Quit:i2=""  Set i3=i3+1,newcode(i3)=replace(i2)
 . . Quit
 . Set ok=1 For i2=2:1:max If $Get(oldcode(i1+i2))'=find(i2) Set ok=0 Quit
 . If 'ok Set i3=i3+1,newcode(i3)=oldcode(i1) Quit
 . Set found=found+1
 . Set i2="" For  Set i2=$Order(replace(i2)) Quit:i2=""  Set i3=i3+1,newcode(i3)=replace(i2)
 . Quit
 If 'found Do  Quit
 . Write !,"No changes made, no new routine created"
 . Quit
 Set newcode(0)=i3,errors=""
 Set status=$Compile(newcode,0,errors,,,,name)
 If $ListValid(errors) For i1=1:1:$ListLength(errors) Do
 . Set line=$ListGet(errors,i1)
 . Write !,"Line "_$ListGet(line,1),": ",$ListGet(line,4)
 . Quit
 Kill ^ROUTINE(name,0)
 Merge ^ROUTINE(name,0)=newcode
 Set ^ROUTINE(name,0)=$Horolog
 Set i3=-1,i1=0 For  Set i1=$Order(newcode(i1)) Quit:i1=""  Set i3=i3+1+$Length(newcode(i1))
 Set ^ROUTINE(name,0,"SIZE")=i3
 Set ^ROUTINE(name,"LANG")=""
 Write !,found_" change"_$Select(found=1:"",1:"s")_" made."
 Quit
 ;

