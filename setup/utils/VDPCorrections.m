VDPCorrections ;
 ;
 ; NOTE: not run in nodeVISTA Vagrant 2016 - will use in 2017
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

