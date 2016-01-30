#!/usr/bin/env node

/*
 * 2. Use UPDATE^DIE to create VITAL directly 
 *
 VALS^DIE 
 *
 * Manual: http://www.hardhats.org/fileman/pm/db_die_u.htm

 REAL CHANGE IS WHAT HAPPENS WITH UPDATE DIE if DON'T HAVE THE
 + (for 0 refs), can you not put in now (will it default?), 
 can you leave out 

 K GMVFDA
 S GMVVMEAS=$P(GMVDATA,"*",1)
 S GMVDTDUN=+$P(GMVVMEAS,"^",1) ; Date time
 ;01/28/2005 KAM GMRV*5*9 Added next Line PAL-0105-60940 
 I +$P(GMVDTDUN,".",2)'>0 S GMVDTDUN=$$FMADD^XLFDT(GMVDTDUN,"","","",1)
 I +$P(GMVDTDUN,".",2)=24 S GMVDTDUN=$$FMADD^XLFDT(GMVDTDUN,"","","",1)
 S GMVDFN=+$P(GMVVMEAS,"^",2) ; Patient DFN
 S GMVVTYP=$P(GMVVMEAS,"^",3) ; Vital type
 S GMVDTDUN=$$CHKDT(GMVDTDUN,$P(GMVVTYP,";",1))
 S GMVDTENT=$$NOW^XLFDT ; Current date time
 S GMVHOSPL=+$P(GMVVMEAS,"^",4) ; Hospital
 S GMVENTBY=+$P(GMVVMEAS,"^",5) ; DUZ
 S GMVFDA(120.5,"+1,",.01)=GMVDTDUN ; Date time taken
 S GMVFDA(120.5,"+1,",.02)=GMVDFN   ; Patient
 S GMVFDA(120.5,"+1,",.03)=+$P(GMVVTYP,";",1)   ; Vital Type
 S GMVFDA(120.5,"+1,",.04)=GMVDTENT  ; Date Time entered
 S GMVFDA(120.5,"+1,",.05)=GMVHOSPL  ; Hospital
 S GMVFDA(120.5,"+1,",.06)=GMVENTBY  ; Entered by (DUZ)
 S GMVFDA(120.5,"+1,",1.2)=$P(GMVVTYP,";",2) ; Rate
 S GMVFDA(120.5,"+1,",1.4)=$P(GMVVTYP,";",3) ; Sup 02
 S GMVIEN=""
 D UPDATE^DIE("","GMVFDA","GMVIEN"),FMERROR
 
FMERROR ;
 I $O(^TMP("DIERR",$J,0))>0 D
 . N GMVER1,GMVER2
 . S GMVER1=0
 . F  S GMVER1=$O(^TMP("DIERR",$J,GMVER1)) Q:GMVER1'>0  D
 .. S GMVER2=0
 .. F  S GMVER2=$O(^TMP("DIERR",$J,GMVER1,"TEXT",GMVER2)) Q:GMVER2'>0  D
 ... D MSG("ERROR: "_$G(^TMP("DIERR",$J,GMVER1,"TEXT",GMVER2)))
 ... Q
 .. Q
 . Q
 D CLEAN^DILF
 Q
 
 */
 
