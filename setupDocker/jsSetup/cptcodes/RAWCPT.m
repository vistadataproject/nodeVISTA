GetUnsetCodes()
 ; // Grab all the lexicon codes (757.02) that don't have an associated code or coding system assigned
 S count=0
 S ien="" F  S ien=$O(^LEX(757.02,ien)) Q:ien=""  D
 . S code=$G(^LEX(757.02,ien,0))
 . I +ien>0,$P(code,"^",2)="",$P(code,"^",3)="" D
 . . S count=count+1
 . . S result(count)=ien
 ; // Take the unset codes and drop them into an array string
 S resultCount=0
 S result="["
 S index="" F  S index=$O(result(index)) Q:index=""  D
 . S resultCount=resultCount+1
 . S result=result_$G(result(index))
 . I resultCount<count S result=result_", "
 S result=result_"]"
 Q result

GetLastCPTCode()
 ; // Iterate through the set CPT codes (81) and find the last numeric value
 S lastIEN=0
 S ien=0 F  S ien=$O(^ICPT(ien)) Q:+ien=0  S lastIEN=ien
 S value=$P($G(^ICPT(lastIEN,0)),"^")
 Q value
