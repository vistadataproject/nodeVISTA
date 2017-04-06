VDPCorrectionsCache ;
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

