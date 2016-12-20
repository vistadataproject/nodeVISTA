**Background**: Problem unlike vital and allergy directly writes globals. Well, here's one bad side effect of that. The Data Dictionary that defines the file can be out of sync. You can have fields in the data and the file definition doesn't know about them!!!:

**Note**: more general [DD Bug Issue](https://github.com/vistadataproject/VDM/issues/100) but this one is special as it effects us.

Details: this ...

``` text
^DD(125.8,10,0)="OLD PROBLEM ENTRY^F^^1;1^K:$L(X)>150!($L(X)<1) X"

should read

"OLD PROBLEM ENTRY^F^^1;3^K:$L(X)>150!($L(X)<1) X"

ie/ 1;1 -> 1;3
```

with this change, "OLD PROBLEM ENTRY" becomes "old note narrative" 

BUT THERE's MORE (though it may not apply to us ...). Looking at the raw form ...

``` text
^GMPL(125.8,25,1)="2^^aac: changed once^A^3160726^55"
```

it doesn't only have "old note narrative" - it also has all the other values of note ...

![screen shot 2016-07-25 at 6 14 08 pm](https://cloud.githubusercontent.com/assets/1831390/17123327/b7035456-5297-11e6-9e71-78d9a2eb1f78.png)

number, status, author etc.

So two step: 
1. change problem DD to expose "old note narrative" in the pre-existing "old problem entry" field. It will only be set for note changes. Run [this JS](https://github.com/vistadataproject/VDM/blob/master/prototypes/fixDD.js)
2. bigger change? If needed ... property build out the 125.8 DD to expose all five note narrative old values if it is changed, starting with "old_note_nmbr" ... etc

```text
To make the ^DD more complete, execute the following commands:

Set file=125.8
Kill ^DD(file,10)
Kill ^DD(file,"B","OLD PROBLEM ENTRY")
Kill ^DD(file,"GL",1,1,10)

Set field=11
Set ^DD(file,field,0)="NOTE NUMBER^NJ3^^1;1^"
Set ^DD(file,field,3)="Notes are uniquely identified by intger numbers."
Set ^DD(file,field,21,0)="^^1^1"
Set ^DD(file,field,21,1,0)="This is the unique note identifier"
Set ^DD(file,"B","NOTE NUMBER",field)=""
Set ^DD(file,"GL",1,1,field)=""

Set field=13
Set ^DD(file,field,0)="NOTE NARRATIVE^F^^1;3^K:$L(X)>150!($L(X)<1) X"
Set ^DD(file,field,3)="Enter any descriptive narrative text for this note (max 150 char)."
Set ^DD(file,field,21,0)="^^1^1"
Set ^DD(file,field,21,1,0)="Additional comments may be entered here to furthier describe the problem"
Set ^DD(file,"B","NOTE NARRATIVE",field)=""
Set ^DD(file,"GL",1,3,field)=""

Set field=14
Set ^DD(file,field,0)="STATUS^S^A:ACTIVE;^1;4^"
Set ^DD(file,field,3)="Enter ""A"" if this note is active."
Set ^DD(file,field,21,0)="^^1^1"
Set ^DD(file,field,21,1,0)="This flag indicates if this note is currently active"
Set ^DD(file,"B","STATUS",field)=""
Set ^DD(file,"GL",1,4,field)=""

Set field=15
Set ^DD(file,field,0)="DATE NOTE ADDED^D^^1;5^S %DT=""EX"" D ^%DT S X=Y K:DT<X!(1800000>X) X"
Set ^DD(file,field,3)="Enter the date when this note was created (probably today)."
Set ^DD(file,field,21,0)="^^1^1"
Set ^DD(file,field,21,1,0)="This is the date on which this note was entered"
Set ^DD(file,"B","DATE NOTE ADDED",field)=""
Set ^DD(file,"GL",1,5,field)=""

Set field=16
Set ^DD(file,field,0)="AUTHOR^P200'^VA(200,^^1;6^Q"
Set ^DD(file,field,3)="Identify the user who authored this note."
Set ^DD(file,field,21,0)="^^1^1"
Set ^DD(file,field,21,1,0)="This is the provider who entered the text of this note"
Set ^DD(file,"B","AUTHOR",field)=""
Set ^DD(file,"GL",1,6,field)=""
```
