VDPCorrectionsGTM ;
 Quit
 ;
Search(name) New void
 Set void=$ZSearch("")
 Quit $ZSearch(name)
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
