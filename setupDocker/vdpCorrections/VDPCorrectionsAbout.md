## Data Dictionary (DD) and GT/M portability changes made for _nodeVISTA_

 1. Piece number in error in File #125.8, field #10
    DD entry has piece #1, should be piece #3.

 2. Syntax error at EN+14^DGRPD
    Cache allows extra spaces in a WRITE argument, GT.M does not

 3. AC cross-reference in file #8989.5 (Parameters) is not always set.
    Ensure that it is.
    * Step 1: find domain in Kernel Site Parameters
    * Step 2: find entry in Parameter Definition (file #8989.51)
    * Step 3: find entry in Parameters (file #8989.5) to be corrected:
    * Step 4: Use FileMan to Set .01 field in #8989.5 for this entry to the value of 'ksp'

 4. <Undefined> error at VALID+3^ORCACT0
    Initialize local variable ORENVIR and check that local variable XQY0 has a value

 5. Too many quotes in input transformation 52.07, 3 (QUANTITY)
    Embedded quotes need to be doubled up, but not twice...

 6. Too many quotes in input transformation 52.6, 19 (STRENGTH)
    Embedded quotes need to be doubled up, but not twice...

 7. Error in input transformation 130.03, 4 (ZIP CODE)
    Expected values are nnnnn or nnnnn-nnnn, but the latter does not match .N

 8. Error in input transformation 2100, 460.2 (VEND ZIP 2)
    Expected values are nnnnn, but 1P.E does not match that...

 9. Error in input transform 9.8, 1.4 (DATE OF %INDEX RUN)
    Input transform rejects dates after 31-Dec-1999

10. Bad Identifier in File 52 (field 108 is not an identifier)

11. Cross-reference on File #100, fields #.01 and #.02
    If this cross-reference is executed before a value has been entered for field #.02
    a <subscript> error will occur.
    Add a check for the value of field #.02 to the cross-reference in field #.01
    and add a companion-cross-reference to field #.02

12. <undefined> error in routine ORDD100.
    Add a check whether the variariable ORCACT has a value

13. Check whether global variable exists in "AD" cross-reference on file #51.41, field #15

14. Check whether field is populated in file #52, field #6
    as well as its companion-field in file #52, field #22

15. Remove unused (and conflicting) field in File #52.04, field #1
    Sub-file #52.04 contains 2 fields labeled SIG1, both assigned to piece #1.
    Remove the second instance of this definition (field #1)

