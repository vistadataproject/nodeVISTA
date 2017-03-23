var VDM_MODEL = [
{
    "id": "New_Person-200",
    "fmId": "200",
    "label": "New Person",
    "location": "^VA(200,",
    "description": "This file contains data on employees, users, practitioners, etc.\rwho were previously in Files 3,6,16 and others.\r \rDHCP packages must check with the KERNEL developers to see that\ra given number/namespace is clear for them to use.\r \rField numbers 53-59.9 reserved for Pharm.\r Nodes and X-ref 'PS*'.\rField numbers 70-79.9 reserved for Radiology\r Nodes and X-ref 'RA*'.\rField numbers 720-725 reserved for DSSM\r Nodes and X-ref 'EC*' and 'AEC*'.\rField numbers 740-749.9 reserved for QA\r Nodes and X-ref 'QA*'.\rField numbers 654-654.9 reserved for Social work\r Node 654 and X-ref 'SW*'.\rField numbers 500-500.9 reserved for mailman\r Node 500 and X-ref 'XM*' and 'AXM*'.\rField numbers 740-749.9 reserved for QA\r Nodes and X-ref 'QA*'.\rField numbers 910-910.9 reserved for Police Package\r Node and X-ref 'ESP'",
    "properties": [
        {
            "id": "name",
            "fmId": ".01",
            "label": "Name",
            "description": "Enter only data that is actually part of the person's name. Do not\rinclude extra titles, identification, flags, local information, etc.\rEnter the person's name in 'LAST,FIRST MIDDLE SUFFIX' format.\rThis value must be 3-35 characters in length and may contain only\ruppercase alpha characters, spaces, apostrophes, hyphens and one comma.\rAll other characters and parenthetical text will be removed.",
            "datatype": "STRING",
            "indexed": true,
            "required": true
        },
        {
            "id": "street_address_1",
            "fmId": ".111",
            "label": "Street Address 1",
            "description": "This is the first line of the street address of the permanent\r address of the new person.",
            "datatype": "STRING"
        },
        {
            "id": "street_address_2",
            "fmId": ".112",
            "label": "Street Address 2",
            "description": " This is the second line of the street address of the permanent\raddress of the new person.",
            "datatype": "STRING"
        },
        {
            "id": "street_address_3",
            "fmId": ".113",
            "label": "Street Address 3",
            "description": "This is the third line of the street address of the permanent\raddress of the new person.",
            "datatype": "STRING"
        },
        {
            "id": "city",
            "fmId": ".114",
            "label": "City",
            "description": "This is the city of the permanent address of\rthe new person.",
            "datatype": "STRING"
        },
        {
            "id": "state",
            "fmId": ".115",
            "label": "State",
            "description": "This is the state of the permanent address of\rthe new person.",
            "datatype": "POINTER",
            "range": {
                "id": "State-5"
            }
        },
        {
            "id": "zip_code",
            "fmId": ".116",
            "label": "ZIP Code",
            "description": "This is the postal ZIP code of the\rpermanent address of the new person.",
            "datatype": "STRING"
        },
        {
            "id": "temporary_address_1",
            "fmId": ".1211",
            "label": "Temporary Address 1",
            "description": "This is the first line of a temporary address\rfor the new person.",
            "datatype": "STRING"
        },
        {
            "id": "temporary_address_2",
            "fmId": ".1212",
            "label": "Temporary Address 2",
            "description": "This is the second line of a temporary address\rfor the new person.",
            "datatype": "STRING"
        },
        {
            "id": "temporary_address_3",
            "fmId": ".1213",
            "label": "Temporary Address 3",
            "description": "This is the third line of a temporary address\rfor the new person.",
            "datatype": "STRING"
        },
        {
            "id": "temporary_city",
            "fmId": ".1214",
            "label": "Temporary City",
            "description": "This is the city of the temporary location for the new person.",
            "datatype": "STRING"
        },
        {
            "id": "temporary_state",
            "fmId": ".1215",
            "label": "Temporary State",
            "description": "This is the state of the temporary location for the new person.",
            "datatype": "POINTER",
            "range": {
                "id": "State-5"
            }
        },
        {
            "id": "temporary_zip_code",
            "fmId": ".1216",
            "label": "Temporary ZIP Code",
            "description": "This is the postal ZIP code for the temporary location for the new person.",
            "datatype": "STRING"
        },
        {
            "id": "start_date_of_temp_addres",
            "fmId": ".1217",
            "label": "Start Date Of Temp Addres",
            "description": "This is the beginning date for use of the temporary address for the\rnew person.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "end_date_of_temp_address",
            "fmId": ".1218",
            "label": "End Date Of Temp Address",
            "description": "This is the ending date for use of the temporary address for the\rnew person.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "phone_home",
            "fmId": ".131",
            "label": "Phone (home)",
            "description": "This is the telephone number for the new person.",
            "datatype": "STRING"
        },
        {
            "id": "office_phone",
            "fmId": ".132",
            "label": "Office Phone",
            "description": "This is the business/office telephone for the new person.",
            "datatype": "STRING"
        },
        {
            "id": "phone_number3",
            "fmId": ".133",
            "label": "Phone #3",
            "description": "This is an alternate telephone number where the new person might also\rbe reached.",
            "datatype": "STRING"
        },
        {
            "id": "phone_number4",
            "fmId": ".134",
            "label": "Phone #4",
            "description": "This is another alternate telephone number where the new person might\ralso be reached.",
            "datatype": "STRING"
        },
        {
            "id": "commercial_phone",
            "fmId": ".135",
            "label": "Commercial Phone",
            "description": "This is a commercial phone number used by IFCAP.",
            "datatype": "STRING"
        },
        {
            "id": "fax_number",
            "fmId": ".136",
            "label": "Fax Number",
            "description": "This field holds a phone number for a FAX machine for this user.\rIt needs to be a format that can be understood by a sending \rMODEM.",
            "datatype": "STRING"
        },
        {
            "id": "voice_pager",
            "fmId": ".137",
            "label": "Voice Pager",
            "description": "This field holds a phone number for an ANALOG PAGER that this person\rcarries with them.\rIt needs to be a format that can be understood by a sending \rMODEM.",
            "datatype": "STRING"
        },
        {
            "id": "digital_pager",
            "fmId": ".138",
            "label": "Digital Pager",
            "description": "This field holds a phone number for a DIGITAL PAGER that this person\rcarries with them.\rIt needs to be a format that can be understood by a sending \rMODEM.",
            "datatype": "STRING"
        },
        {
            "id": "room",
            "fmId": ".141",
            "label": "Room",
            "description": "This is the room number assigned to the new person.",
            "datatype": "STRING"
        },
        {
            "id": "email_address",
            "fmId": ".151",
            "label": "Email Address",
            "description": "This field contains the e-mail address to which an outside person or\rvendor can send correspondence.\r \r(i.e. firstname.lastname@domain.ext or \r lastname.firstname@domain.ext or\r lastname.firstname_i+@domain.ext as in\r smith.robert_b+@domain.ext for Robert B. Smith on Forum).\r \r(* Note: period replaces comma in lastname.firstname syntax, underscore\rreplaces space, and plus sign replaces period following middle initial for\rVISTA MailMan addresses.)\r \rThis address may appear on documents going to vendors.",
            "datatype": "STRING"
        },
        {
            "id": "initial",
            "fmId": "1",
            "label": "Initial",
            "description": "These are the initials of the user, which may be entered for naming\rusers.",
            "datatype": "STRING",
            "indexed": true
        },
        {
            "id": "access_code",
            "fmId": "2",
            "label": "Access Code",
            "description": "This is a unique code to identify a user to the system.\rThis code is hashed so that it can't be looked up to find out the code.\rThe access code will appear as a string of numbers, but must be entered\ras a separate entry.  Users who have no access code will not receive\rmail.\r*** This field should never be edited directly - do not remove WRITE ACCESS!",
            "datatype": "STRING"
        },
        {
            "id": "want_to_edit_access_code_y_n",
            "fmId": "2.1",
            "label": "Want To Edit Access Code (y/n)",
            "description": "Entering a YES to this field calls the KERNEL routine\rfor entering ACCESS codes. No data is stored for this field.",
            "datatype": "STRING"
        },
        {
            "id": "file_manager_access_code",
            "fmId": "3",
            "label": "File Manager Access Code",
            "description": "This is the string that is put in DUZ(0) for use by fileman\rto check file and field access.",
            "datatype": "STRING"
        },
        {
            "id": "sex",
            "fmId": "4",
            "label": "Sex",
            "description": "This is the gender for the new person.",
            "datatype": "ENUMERATION",
            "range": {
                "MALE": "M",
                "FEMALE": "F"
            }
        },
        {
            "id": "dob",
            "fmId": "5",
            "label": "Dob",
            "description": "This is the date of birth of the new person.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "disuser",
            "fmId": "7",
            "label": "Disuser",
            "description": "This field, if set to YES (1), marks a user that is not allowed to\rlog on to this system.  It will leave all Menus, Keys and other attributes\rexabled for the user.\rAn example would be an external support person\rthat you only want to be able to log on to your system when you are\rmonitoring them.  Setting this field would prevent them from loging\ron to the system untill you cleared the field.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "1",
                "true": "0"
            }
        },
        {
            "id": "verify_code_never_expires",
            "fmId": "7.2",
            "label": "Verify Code Never Expires",
            "description": "This field will control if the users VERIFY code will expire at the\rinterval set by the Kernel System Parameter LIFETIME OF VERIFY CODE.\rThis field should only be used for access to the VistA system from other\rsystems making connection with the RPCBroker and have very controlled\raccess.\rOnly persons with the XUMGR key are allowed to set this flag.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "1",
                "true": "0"
            }
        },
        {
            "id": "title",
            "fmId": "8",
            "label": "Title",
            "description": "This is the title for the new person.",
            "datatype": "POINTER",
            "range": {
                "id": "Title-3_1"
            }
        },
        {
            "id": "ssn",
            "fmId": "9",
            "label": "Ssn",
            "description": "This is the social security number of the new person.",
            "datatype": "STRING",
            "indexed": true
        },
        {
            "id": "termination_date",
            "fmId": "9.2",
            "label": "Termination Date",
            "description": "This is the date after which the computer will no longer recognize this\ruser's ACCESS CODE.\rOnce this date has passed, when the USER TERMINATE job runs it will clean\rout this users data based on flags in the NEW PERSON file.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "delete_all_mail_access",
            "fmId": "9.21",
            "label": "Delete All Mail Access",
            "description": "This gives you the ability to purge all of a user's mail related\rinformation. This includes Mail messages, Mail Boxes, Mail Groups,\rSurrogate privlages when that user is terminated.\rThis is recomended.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "n",
                "true": "y"
            }
        },
        {
            "id": "delete_keys_at_termination",
            "fmId": "9.22",
            "label": "Delete Keys At Termination",
            "description": "This gives you the ability to delete all of a user's security\rkeys, and delagated keys when the user is terminated.\rThis is recomended.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "n",
                "true": "y"
            }
        },
        {
            "id": "terminal_type_last_used",
            "fmId": "9.3",
            "label": "Terminal Type Last Used",
            "description": "This field holds a pointer to the last terminal type the user selected\rat sign-on or in edit user char.",
            "datatype": "POINTER",
            "range": {
                "id": "Terminal_Type-3_2"
            }
        },
        {
            "id": "termination_reason",
            "fmId": "9.4",
            "label": "Termination Reason",
            "description": "This field holds a short description of why the user has been terminated\ror has DISUSER flag set.",
            "datatype": "STRING"
        },
        {
            "id": "user_class",
            "fmId": "9.5",
            "label": "User Class",
            "datatype": "[OBJECT]",
            "range": {
                "id": "User_Class-200_07",
                "fmId": "200.07",
                "label": "User Class",
                "properties": [
                    {
                        "id": "user_class",
                        "fmId": ".01",
                        "label": "User Class",
                        "datatype": "POINTER",
                        "indexed": true,
                        "required": true,
                        "range": {
                            "id": "User_Class-201"
                        }
                    },
                    {
                        "id": "isprimary",
                        "fmId": "2",
                        "label": "Isprimary",
                        "description": "This field notes if this User Class is the primary User Class for this \ruser.  If returning just one User Class then this is the one to be \rreturned.",
                        "datatype": "BOOLEAN",
                        "range": {
                            "false": "1",
                            "true": "0"
                        }
                    }
                ]
            }
        },
        {
            "id": "alias",
            "fmId": "10",
            "label": "Alias",
            "description": "Other names used by this new person.",
            "datatype": "[STRING]"
        },
        {
            "id": "name_components",
            "fmId": "10.1",
            "label": "Name Components",
            "description": "Answer with the entry in the NAME COMPONENTS file that contains the\rcomponents of the person's name.",
            "datatype": "POINTER",
            "required": true,
            "range": {
                "id": "Name_Components-20"
            }
        },
        {
            "id": "degree",
            "fmId": "10.6",
            "label": "Degree",
            "description": "This field holds any academic or professional degree that have been earned\rby the user. This would be things like BS, BA, MD, and PHD.",
            "datatype": "STRING"
        },
        {
            "id": "verify_code",
            "fmId": "11",
            "label": "Verify Code",
            "description": "This is the code that is used to verify that the ACCESS CODE was not\rfound by accident.\rIt may be entered at logon time immediately after the ACCESS CODE\rby typing a semicolon, then the VERIFY CODE.\r\rVerify codes may be changed by the user with the CHANGE USER CHARACTERISTICS\roption.  The kernel site parameter field LIFETIME OF VERIFY CODE forces\rthe user to periodically enter a new verify code.",
            "datatype": "STRING"
        },
        {
            "id": "want_to_edit_verify_code_y_n",
            "fmId": "11.1",
            "label": "Want To Edit Verify Code (y/n)",
            "description": "Entering a YES to this field calls the KERNEL routine\rfor entering VERIFY codes. No data is stored for this field.",
            "datatype": "STRING"
        },
        {
            "id": "date_verify_code_last_changed",
            "fmId": "11.2",
            "label": "Date Verify Code Last Changed",
            "description": "This field is triggered by a change in the VERIFY CODE.  It is used\rto determine when the USER must be notified to change their code.",
            "datatype": "STRING"
        },
        {
            "id": "allow_ara_access",
            "fmId": "11.6",
            "label": "Allow Ara Access",
            "description": "This field is for a control that is under development.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "1",
                "true": "0"
            }
        },
        {
            "id": "ara_value",
            "fmId": "11.7",
            "label": "Ara Value",
            "description": "This value is used to identify the user in non interactive connections.",
            "datatype": "STRING",
            "indexed": true
        },
        {
            "id": "current_degree_level",
            "fmId": "12.1",
            "label": "Current Degree Level",
            "description": "This is the current degree level upon entry into the current training\rprogram/residency at this VA medical facility.",
            "datatype": "POINTER",
            "range": {
                "id": "Hl7_Degree-771_9"
            }
        },
        {
            "id": "program_of_study",
            "fmId": "12.2",
            "label": "Program Of Study",
            "description": "This is the discipline that best describes the trainee's current\rprogram of study at this VA medical facility.",
            "datatype": "POINTER",
            "range": {
                "id": "Program_Of_Study-8932_2"
            }
        },
        {
            "id": "last_training_month__year",
            "fmId": "12.3",
            "label": "Last Training Month & Year",
            "description": "This is the MONTH and LAST year the trainee anticipates being in a\rtraining program at this VA medical facility.",
            "datatype": "STRING"
        },
        {
            "id": "vha_training_facility",
            "fmId": "12.4",
            "label": "Vha Training Facility",
            "datatype": "POINTER",
            "range": {
                "id": "Institution-4"
            }
        },
        {
            "id": "date_hl7_trainee_record_built",
            "fmId": "12.5",
            "label": "Date Hl7 Trainee Record Built",
            "description": "This is the date that the trainee information was built and sent to the\rOAA server.",
            "datatype": "DATE-TIME",
            "indexed": true
        },
        {
            "id": "clinical_core_trainee",
            "fmId": "12.6",
            "label": "Clinical Core Trainee",
            "description": "This field designates whether or not the person is an active Trainee.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "N",
                "true": "Y"
            }
        },
        {
            "id": "date_no_longer_trainee",
            "fmId": "12.7",
            "label": "Date No Longer Trainee",
            "description": "This is the date when a Registered Trainee is no longer to be considered\ran trainee.  This may be at the end of a rotation period or at the end VA\rtraining experience.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "start_of_training",
            "fmId": "12.8",
            "label": "Start Of Training",
            "datatype": "DATE-TIME"
        },
        {
            "id": "nick_name",
            "fmId": "13",
            "label": "Nick Name",
            "description": "This is a string that is used in the sign-on greeting and\rfor mailman user lookup.",
            "datatype": "STRING"
        },
        {
            "id": "pac",
            "fmId": "14",
            "label": "Pac",
            "description": "This is a code to be checked before a user is allowed to get into\rprogrammer mode.",
            "datatype": "STRING"
        },
        {
            "id": "hinq_employee_number",
            "fmId": "14.9",
            "label": "Hinq Employee Number",
            "description": "The employee number associated with HINQ passwords from the DVB should\rbe entered here.",
            "datatype": "STRING",
            "indexed": true
        },
        {
            "id": "prohibited_times_for_signon",
            "fmId": "15",
            "label": "Prohibited Times For Sign-on",
            "description": "This is a pair of times within which the user will not be allowed\raccess to the computer.\rThey should be entered in Military format, for example 0900-1300 would\rprohibit signons from 9AM to 1PM each day.",
            "datatype": "STRING"
        },
        {
            "id": "division",
            "fmId": "16",
            "label": "Division",
            "description": "This is the one or more divisions that this user may sign-on and do\rwork for.",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Division-200_02",
                "fmId": "200.02",
                "label": "Division",
                "properties": [
                    {
                        "id": "division",
                        "fmId": ".01",
                        "label": "Division",
                        "description": "The name of a Division that this user may sign on to.",
                        "datatype": "POINTER",
                        "indexed": true,
                        "required": true,
                        "range": {
                            "id": "Institution-4"
                        }
                    },
                    {
                        "id": "default",
                        "fmId": "1",
                        "label": "Default",
                        "description": "This field is used to indicate that a particular division should be\rpresented to the user as a default when selecting a division.  This will\ronly affect users that have more than one division.\rA cross reference will only allow one entry to have this flag set.",
                        "datatype": "BOOLEAN",
                        "range": {
                            "false": "0",
                            "true": "1"
                        }
                    }
                ]
            }
        },
        {
            "id": "delegate_of",
            "fmId": "19",
            "label": "Delegate Of",
            "description": "This field holds the name of the person who has delegated menu manager\rauthority to the user.  The user is thus the 'delegate of' the person\rnamed here.",
            "datatype": "POINTER",
            "range": {
                "id": "New_Person-200"
            }
        },
        {
            "id": "delegation_date",
            "fmId": "19.1",
            "label": "Delegation Date",
            "description": "This field records the data that the user became a delegate.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "delegation_level",
            "fmId": "19.2",
            "label": "Delegation Level",
            "description": "This field records the level of delegation authority with respect to\rthe systems manager, level zero.  When the systems manager delegates\rauthority to someone else, that person will be at level one.  Levels\rare maintained so that lower level delegates cannot interfere with\rthe menus of higher level delegates.",
            "datatype": "NUMERIC"
        },
        {
            "id": "alert_date_time",
            "fmId": "19.4",
            "label": "Alert Date/time",
            "description": "This is a multiple field which is used to generate alerts to the users.\rThe data for alerts is filed by date and time.",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Alert_Date_Time-200_194",
                "fmId": "200.194",
                "label": "Alert Date Time",
                "properties": [
                    {
                        "id": "alert_date_time",
                        "fmId": ".01",
                        "label": "Alert Date Time",
                        "description": "This is the date and time when the alert was generated.",
                        "datatype": "DATE-TIME",
                        "required": true
                    },
                    {
                        "id": "package_id",
                        "fmId": ".02",
                        "label": "Package Id",
                        "description": "This is a field in which the package id passed during alert filing.  This\rid may simply be a package namespace, or it may be a namespace followed by\radditional data to more accurately identify the type or purpose of the\ralert.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "message_text",
                        "fmId": ".03",
                        "label": "Message Text",
                        "description": "This field contains the text of the message to be presented to the user at\rthe time when he cycles through the menu system the first time after the\ralert has been filed for the user, and when the user selects the VIEW\rALERTS option.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "new_alert_flag",
                        "fmId": ".04",
                        "label": "New Alert Flag",
                        "description": "This flag is used by the alert processing to indicate a new alert which\rhas not previously been presented to the user.  After the alert message\rtext has been shown to the user, this flag is cleared and the user must\rthen select the VIEW ALERTS option to process the alert.",
                        "datatype": "ENUMERATION",
                        "range": {
                            "NEW": "1"
                        }
                    },
                    {
                        "id": "action_flag",
                        "fmId": ".05",
                        "label": "Action Flag",
                        "description": "This flag is optional at the present time, since the need for action\rprocessing can be determined by the presence of an option name or a\rroutine name for use during alert processing.",
                        "datatype": "ENUMERATION",
                        "range": {
                            "RUN ROUTINE": "R",
                            "IMMEDIATE RUN": "I",
                            "DELETE": "D"
                        }
                    },
                    {
                        "id": "reserved1",
                        "fmId": ".06",
                        "label": "Reserved1",
                        "description": "This field is reserved for future use by the alert system.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "entry_point",
                        "fmId": ".07",
                        "label": "Entry Point",
                        "description": "While named ENTRY POINT, this is a dual function field.  If the next field\r(#.08, AROUTINE NAME) contains a routine name, this field contains the\rdesired entry point within that routine (this field may also be null,\rindicating that the entry point should be at the top of the routine).  If\rfield #.08 is null, then the contents of this field is interpreted as the\rname of an option which is to be entered when the alert is processed.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "aroutine_name",
                        "fmId": ".08",
                        "label": "Aroutine Name",
                        "description": "If this field is not null, it contains the name of a routine which is to\rbe used when the alert is processed.  If there is also a value in field\r#.07, that value is used as an entry point into the routine specified in\rthis field.\r \rIf this field is null, field #.07 is interpreted as an option name which\ris to be used when the alert is processed.\r \rIf both this field and field #.07 are null, the alert is processed as an\rinformation only alert.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "reserved_field",
                        "fmId": ".09",
                        "label": "Reserved Field",
                        "description": "This field is reserved for future use in the alert processing system.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "first_data_piece",
                        "fmId": ".1",
                        "label": "First Data Piece",
                        "description": "This field and all following ^-separated fields are processed as a single\rentity and are returned in the variable XQADATA for use by the application\rwhich generated the alert.  The package may pass a series of variables\rusing any desired separator in the variable XQADATA at the time the alert\ris setup.  When the alert is processed the value of XQADATA is returned to\rthe application and may be used to establish parameters related to the\ralert without requiring interaction or provision of information by the\ruser.  In this way information related to patient entry number, specific\rinternal numbers for the desired data, etc may be stored and returned.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "data_string",
                        "fmId": "1",
                        "label": "Data String",
                        "datatype": "STRING"
                    }
                ]
            }
        },
        {
            "id": "delegated_options",
            "fmId": "19.5",
            "label": "Delegated Options",
            "description": "This is a sub-file of pointers to the Option File which detail those\roptions this user may delegate to others.",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Delegated_Options-200_19",
                "fmId": "200.19",
                "label": "Delegated Options",
                "properties": [
                    {
                        "id": "delegated_options",
                        "fmId": ".01",
                        "label": "Delegated Options",
                        "description": "This field identifies which options this user may delegate to others.",
                        "datatype": "POINTER",
                        "indexed": true,
                        "required": true,
                        "range": {
                            "id": "Option-19"
                        }
                    },
                    {
                        "id": "delegated_by",
                        "fmId": "1",
                        "label": "Delegated By",
                        "description": "This field indicates who granted authority for this user to delegate\rthis option to others.",
                        "datatype": "POINTER",
                        "range": {
                            "id": "New_Person-200"
                        }
                    },
                    {
                        "id": "date_delegated",
                        "fmId": "2",
                        "label": "Date Delegated",
                        "description": "This field records the date when this option was added to the list\rof options this user may delegate to others.",
                        "datatype": "DATE-TIME"
                    },
                    {
                        "id": "editable",
                        "fmId": "3",
                        "label": "Editable",
                        "description": "This field indicates whether this use is allowed to edit this option.",
                        "datatype": "BOOLEAN",
                        "range": {
                            "false": "1",
                            "true": "0"
                        }
                    }
                ]
            }
        },
        {
            "id": "allowable_new_menu_prefix",
            "fmId": "19.6",
            "label": "Allowable New Menu Prefix",
            "description": "This subfile holds the set of namespaces available to this user in\rthe creation of menus with delegated options.\r",
            "datatype": "[STRING]"
        },
        {
            "id": "menu_template",
            "fmId": "19.8",
            "label": "Menu Template",
            "description": "This multiple holds sets of predefined menus which can be envoked by\rthe user by entering a right-square-bracket (\"[\") followed by a\rtemplate's name.",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Menu_Template-200_198",
                "fmId": "200.198",
                "label": "Menu Template",
                "properties": [
                    {
                        "id": "menu_template",
                        "fmId": ".01",
                        "label": "Menu Template",
                        "datatype": "STRING",
                        "indexed": true,
                        "required": true
                    },
                    {
                        "id": "pathway",
                        "fmId": "1",
                        "label": "Pathway",
                        "description": "This multiple contains the information on the option sequence specified\rfor a given MENU TEMPLATE.",
                        "datatype": "STRING",
                        "isWP": true
                    }
                ]
            }
        },
        {
            "id": "uci",
            "fmId": "20",
            "label": "Uci",
            "description": "This is the set of UCI's that this user must choose from at sign-on\rtime.",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Uci-200_01",
                "fmId": "200.01",
                "label": "Uci",
                "properties": [
                    {
                        "id": "uci",
                        "fmId": ".01",
                        "label": "Uci",
                        "description": "This is one of a set of UCI's that this user may choose to work in\rat sign-on time.",
                        "datatype": "STRING",
                        "indexed": true,
                        "required": true
                    },
                    {
                        "id": "routines_rn1rn2",
                        "fmId": "2",
                        "label": "Routines (rn1:rn2)",
                        "description": "This is a list of routines that the user may choose to run when signing on\rto this UCI.  The routines are seperated by ':'s.",
                        "datatype": "STRING"
                    }
                ]
            }
        },
        {
            "id": "date_esig_last_changed",
            "fmId": "20.1",
            "label": "Date E-sig Last Changed",
            "description": "A $H date of the last time the E-Sig code was changed. Triggered by a\rX-ref on the ELECTRONIC SIGNATURE CODE field.",
            "datatype": "STRING"
        },
        {
            "id": "signature_block_printed_name",
            "fmId": "20.2",
            "label": "Signature Block Printed Name",
            "description": "The name entered must contain the surname of the user.\rThe name must be 2 to 40 characters in length.\r \rThis field can then contain the name of the user as they wish it to\rbe displayed with the notation that they signed the document electronically.\rFor example:  John R. Doe, M.D.   or    Fred A. Sample, RN.",
            "datatype": "STRING"
        },
        {
            "id": "signature_block_title",
            "fmId": "20.3",
            "label": "Signature Block Title",
            "description": "This field should contain the title of the person who is electronically\rsigning a document.  Examples of titles are Chief of Surgery, Dietician,\rClinical Pharmacist, etc.  This title will print next to the name of the\rperson who signs the document.  The person's name will be taken from the\rSIGNATURE BLOCK PRINTED NAME field.\r \rThe title must be 2 to 50 characters in length.",
            "datatype": "STRING"
        },
        {
            "id": "electronic_signature_code",
            "fmId": "20.4",
            "label": "Electronic Signature Code",
            "description": "This field contains the encrypted code which the user types when\rsigning documents electronically.  The user's input will be compared to\rthis field when validating his electronic signature.\rAll electronic signature codes should be treated as confidential.",
            "datatype": "STRING"
        },
        {
            "id": "mail_code",
            "fmId": "28",
            "label": "Mail Code",
            "description": "This is the mail code for the new person.",
            "datatype": "STRING"
        },
        {
            "id": "service_section",
            "fmId": "29",
            "label": "Service/section",
            "description": "This is the name of the service or section for the new person.",
            "datatype": "POINTER",
            "indexed": true,
            "required": true,
            "range": {
                "id": "Service_section-49"
            }
        },
        {
            "id": "date_entered",
            "fmId": "30",
            "label": "Date Entered",
            "description": "This is the date on which the user was entered into the user file.\rIt is automatically inserted into the file by the ADD USER option.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "creator",
            "fmId": "31",
            "label": "Creator",
            "description": "This is the name of the user who entered this user into the user file.\rIt is automatically set by the ADD USER option.",
            "datatype": "POINTER",
            "range": {
                "id": "New_Person-200"
            }
        },
        {
            "id": "file_range",
            "fmId": "31.1",
            "label": "File Range",
            "description": "This field limits a user to a specific range of file numbers.  When\rcreating new files, only a number within this range can be assigned\rto the new file.",
            "datatype": "STRING"
        },
        {
            "id": "text_terminator",
            "fmId": "31.2",
            "label": "Text Terminator",
            "description": "If specified, the character string in this field will be used instead\rof a carriage return to mark the end of word-processing text.  It will\rbe used in all VA FileMan word-processing contexts, e.g. in mail\rmessages.  It can facilitate the uploading of files from a PC\renvironment.\r \rNote that the VA FileMan edit menu provides an option for temporarily\rspecifying a text terminator for that edit session only.",
            "datatype": "STRING"
        },
        {
            "id": "preferred_editor",
            "fmId": "31.3",
            "label": "Preferred Editor",
            "description": "If an entry exists in this field, then whenever a user edits data in a\rFileMan word-processing field, they will automatically be transferred into\rtheir preferred editor.  If this field is blank, then the default editor\rwill be either the FileMan screen editor when editing within ScreenMan\rformat, or the standard FileMan line editor in all other cases.",
            "datatype": "POINTER",
            "range": {
                "id": "Alternate_Editor-1_2"
            }
        },
        {
            "id": "accessible_file",
            "fmId": "32",
            "label": "Accessible File",
            "description": "This multiple-valued field contains the list of files the user may access.\rThe type of access granted to the user is included for each file that\rappears on the list.  The user may be allowed to look at records (READ\raccess), edit existing records (WRITE access), add new record (LAYGO\raccess), delete records (DELETE access), or modify the file structure\r(DATA DICTIONARY ACCESS).",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Accessible_File-200_032",
                "fmId": "200.032",
                "label": "Accessible File",
                "properties": [
                    {
                        "id": "file_number",
                        "fmId": ".001",
                        "label": "File Number",
                        "description": "When defined, this field makes the sub-file's internal entry number\raccessible for inquiry and edit.",
                        "datatype": "IEN"
                    },
                    {
                        "id": "accessible_file",
                        "fmId": ".01",
                        "label": "Accessible File",
                        "datatype": "POINTER",
                        "indexed": true,
                        "required": true,
                        "range": {
                            "id": "File-1"
                        }
                    },
                    {
                        "id": "data_dictionary_access",
                        "fmId": "1",
                        "label": "Data Dictionary Access",
                        "description": "This field is a flag that, when set to 1, gives the user data dictionary\raccess to the file (in the .01 field) represented in this record.",
                        "datatype": "BOOLEAN",
                        "range": {
                            "false": "0",
                            "true": "1"
                        }
                    },
                    {
                        "id": "delete_access",
                        "fmId": "2",
                        "label": "Delete Access",
                        "description": "This field is a flag that, when set to 1, gives the user delete access to\rthe file (in the .01 field) represented in this record.",
                        "datatype": "BOOLEAN",
                        "range": {
                            "false": "0",
                            "true": "1"
                        }
                    },
                    {
                        "id": "laygo_access",
                        "fmId": "3",
                        "label": "Laygo Access",
                        "description": "This field is a flag that, when set to 1, gives the user LAYGO access to\rthe file (in the .01 field) represented in this record.",
                        "datatype": "BOOLEAN",
                        "range": {
                            "false": "0",
                            "true": "1"
                        }
                    },
                    {
                        "id": "read_access",
                        "fmId": "4",
                        "label": "Read Access",
                        "description": "This field is a flag that, when set to 1, gives the user read access to\rthe file (in the .01 field) represented in this record.",
                        "datatype": "BOOLEAN",
                        "range": {
                            "false": "0",
                            "true": "1"
                        }
                    },
                    {
                        "id": "write_access",
                        "fmId": "5",
                        "label": "Write Access",
                        "description": "This field is a flag that, when set to 1, gives the user write access to\rthe file (in the .01 field) represented in this record.",
                        "datatype": "BOOLEAN",
                        "range": {
                            "false": "0",
                            "true": "1"
                        }
                    },
                    {
                        "id": "audit_access",
                        "fmId": "6",
                        "label": "Audit Access",
                        "description": "This field is a flag that, when set to 1, gives the user audit access to\rthe file (in the .01 field) represented in this record.",
                        "datatype": "BOOLEAN",
                        "range": {
                            "false": "0",
                            "true": "1"
                        }
                    }
                ]
            }
        },
        {
            "id": "allowed_to_use_spooler",
            "fmId": "41",
            "label": "Allowed To Use Spooler",
            "description": "If set to 'YES', this user will be able to use the spool device to\rcreate spool documents.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "n",
                "true": "y"
            }
        },
        {
            "id": "multidevice_despooling",
            "fmId": "41.1",
            "label": "Multi-device Despooling",
            "description": "If set to 'YES', the user will be able to print (despool) a spooled\rdocument to more than one device simultaneously.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "n",
                "true": "y"
            }
        },
        {
            "id": "can_make_into_a_mail_message",
            "fmId": "41.2",
            "label": "Can Make Into A Mail Message",
            "description": "If set to 'YES', the document is given the status of a mail message and\rthe user will be able to use all MailMan functions such as copying and\rforwarding.  As a mail message, the document can no longer be manipulated\rwith the spooler since its flag in the Spool Document File has been\rdeleted.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "n",
                "true": "y"
            }
        },
        {
            "id": "authorize_release_of_npi",
            "fmId": "41.97",
            "label": "Authorize Release Of Npi",
            "description": "Answer 1 (Yes) if this disclosure of an individual practitioner's NPI is \rto a non-VA health care provider or its agent to support, or in \ranticipation of supporting, the submission of health care reimbursement \rclaims by non-VA health care providers or their agents (ex., display of \rFEE Basis authorizations). Per Routine Use Amendment #18 to the Privacy \rAct of 1974 this disclosure can be made without requiring consent \r(Blanket Authority) from the practitioner.",
            "datatype": "BOOLEAN",
            "range": {
                "true": "1"
            }
        },
        {
            "id": "npi_entry_status",
            "fmId": "41.98",
            "label": "Npi Entry Status",
            "description": "This field is used in tracking the entry status of NPI d ata for those\rproviders who require an NPI.  The providers needing this value are\ridentified based on data entered in the PERSON CLASS subfile which\rindicates providers that may be related to billing activities.\r \rThe value is initially set to N or NEEDS ENTRY.  It can be changed to E or\rEXEMPT for individuals who have been identified, but who due to\radministrative activities, etc., will not be involved in activities\rrequiring billing.  When the NPI value is entered, the value is changed to\rD or DONE.",
            "datatype": "ENUMERATION",
            "range": {
                "NEEDS ENTRY": "N",
                "DONE": "D",
                "EXEMPT": "E"
            }
        },
        {
            "id": "npi",
            "fmId": "41.99",
            "label": "Npi",
            "description": "Each VHA Billable Practitioner should have applied for the NPI through\rCMS' National Plan and Provider Enumeration System (NPPES).  NPI\rConfirmation Letters are sent by CMS and indicate the NPI assigned.\rPractitioners may present their NPI Confirmation Letter as a source\rdocument to verify the accuracy of the NPI or you may contact your Local\rNPI Maintenance Team Leader for assistance.",
            "datatype": "STRING",
            "indexed": true
        },
        {
            "id": "effective_date_time",
            "fmId": "42",
            "label": "Effective Date/time",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Effective_Date_time-200_042",
                "fmId": "200.042",
                "label": "Effective Date/time",
                "properties": [
                    {
                        "id": "effective_date_time",
                        "fmId": ".01",
                        "label": "Effective Date/time",
                        "description": "This field contains the date and time of the last change to the NPI field.",
                        "datatype": "DATE-TIME",
                        "indexed": true,
                        "required": true
                    },
                    {
                        "id": "status",
                        "fmId": ".02",
                        "label": "Status",
                        "description": "The Status of an NPI is either 'ACTIVE' or 'INACTIVE'. I 'ACTIVE' then \rthe NPI will be accessible by end-users to document a particular \rprovider. If 'INACTIVE', then the NPI will only be accessible by the \rapplication to display legacy data.",
                        "datatype": "ENUMERATION",
                        "required": true,
                        "range": {
                            "ACTIVE": "1",
                            "INACTIVE": "0"
                        }
                    },
                    {
                        "id": "npi",
                        "fmId": ".03",
                        "label": "Npi",
                        "description": "Each VHA Billable Practitioner should have applied for the NPI through\rCMS' National Plan and Provider Enumeration System (NPPES).  NPI\rConfirmation Letters are sent by CMS and indicate the NPI assigned.\rPractitioners may present their NPI Confirmation Letter as a source\rdocument to verify the accuracy of the NPI or you may contact your Local\rNPI Maintenance Team Leader for assistance.",
                        "datatype": "STRING",
                        "indexed": true,
                        "required": true
                    }
                ]
            }
        },
        {
            "id": "key_delegation_level",
            "fmId": "50.1",
            "label": "Key Delegation Level",
            "description": "This a simple, numeric value which prevents removing delegated keys\rfrom someone with a lower level number.",
            "datatype": "NUMERIC"
        },
        {
            "id": "keys",
            "fmId": "51",
            "label": "Keys",
            "description": "These are \"keys\" that define the characteristic(s), authorization(s), or\rprivilege(s) of the person.",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Keys-200_051",
                "fmId": "200.051",
                "label": "Keys",
                "properties": [
                    {
                        "id": "key",
                        "fmId": ".01",
                        "label": "Key",
                        "description": "This is a security key that this person holds.",
                        "datatype": "POINTER",
                        "indexed": true,
                        "required": true,
                        "range": {
                            "id": "Security_Key-19_1"
                        }
                    },
                    {
                        "id": "given_by",
                        "fmId": "1",
                        "label": "Given By",
                        "description": "This is a pointer to the person that entered this security  key into this\rpersons file.",
                        "datatype": "POINTER",
                        "range": {
                            "id": "New_Person-200"
                        }
                    },
                    {
                        "id": "date_given",
                        "fmId": "2",
                        "label": "Date Given",
                        "description": "This is the date that the security key was given to the person.\rThere is know history.",
                        "datatype": "DATE-TIME"
                    },
                    {
                        "id": "review_date",
                        "fmId": "3",
                        "label": "Review Date",
                        "description": "This is the date after which the persons need for this security key should\rbe reviewed.",
                        "datatype": "DATE-TIME"
                    }
                ]
            }
        },
        {
            "id": "delegated_keys",
            "fmId": "52",
            "label": "Delegated Keys",
            "description": "This subfile contains pointers to the Key File of those keys that\rthis person is allowed to allocate to other users.",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Delegated_Keys-200_052",
                "fmId": "200.052",
                "label": "Delegated Keys",
                "properties": [
                    {
                        "id": "delegated_key",
                        "fmId": ".01",
                        "label": "Delegated Key",
                        "description": "This is a security key that this person my allocate to another person.",
                        "datatype": "POINTER",
                        "indexed": true,
                        "required": true,
                        "range": {
                            "id": "Security_Key-19_1"
                        }
                    },
                    {
                        "id": "delegated_by",
                        "fmId": "1",
                        "label": "Delegated By",
                        "description": "This is the person that gave the security key that may be delegated.",
                        "datatype": "POINTER",
                        "range": {
                            "id": "New_Person-200"
                        }
                    },
                    {
                        "id": "date_delegated",
                        "fmId": "2",
                        "label": "Date Delegated",
                        "description": "This is the date that the security key was given to be delegated.",
                        "datatype": "DATE-TIME"
                    },
                    {
                        "id": "may_redelegate",
                        "fmId": "3",
                        "label": "May Re-delegate",
                        "description": "Re-delegation means that the person has total control over the key,\rthe person may not only delegate the key to others but may also give\rothers the authorization to delegate it.",
                        "datatype": "ENUMERATION",
                        "range": {
                            "YES": "1",
                            "no": "0",
                            "yes": "1",
                            "NO": "0"
                        }
                    }
                ]
            }
        },
        {
            "id": "authorized_to_write_med_orders",
            "fmId": "53.1",
            "label": "Authorized To Write Med Orders",
            "description": "This field is used to determin if the provider is authorized to write orders.",
            "datatype": "BOOLEAN",
            "range": {
                "true": "1"
            }
        },
        {
            "id": "detox_maintenance_id_number",
            "fmId": "53.11",
            "label": "Detox/maintenance Id Number",
            "description": "This field holds the Detoxification/Maintenance ID number used for the \rsubstance abuse providers that is \"DATA-waived\". (one X, one alpha, \r7 numbers)\r\r\r",
            "datatype": "STRING"
        },
        {
            "id": "deanumber",
            "fmId": "53.2",
            "label": "Dea#",
            "description": "This field is used to enter the Drug Enforcement Agency (DEA) number.\rEnter the DEA number as two upper case letters followed by 7 digits.\re.g., AA1234567.  Each provider must have a unique number.\r",
            "datatype": "STRING",
            "indexed": true
        },
        {
            "id": "vanumber",
            "fmId": "53.3",
            "label": "Va#",
            "description": "This field is used to enter the VA number.\rThe VA number must be unique.",
            "datatype": "STRING",
            "indexed": true
        },
        {
            "id": "inactive_date",
            "fmId": "53.4",
            "label": "Inactive Date",
            "description": "This field is used to show the inactive date of a provider whereas they\rcan no longer write orders.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "provider_class",
            "fmId": "53.5",
            "label": "Provider Class",
            "description": "This field is used to show the providers class.",
            "datatype": "POINTER",
            "range": {
                "id": "Provider_Class-7"
            }
        },
        {
            "id": "provider_type",
            "fmId": "53.6",
            "label": "Provider Type",
            "description": "This field is used to show the type of provider (staff, fee, etc.)",
            "datatype": "ENUMERATION",
            "range": {
                "FEE BASIS": "4",
                "C & A": "3",
                "FULL TIME": "1",
                "PART TIME": "2",
                "HOUSE STAFF": "5"
            }
        },
        {
            "id": "requires_cosigner",
            "fmId": "53.7",
            "label": "Requires Cosigner",
            "description": "This field is used to determine if the provider needs a cosigner.",
            "datatype": "BOOLEAN",
            "range": {
                "true": "1"
            }
        },
        {
            "id": "usual_cosigner",
            "fmId": "53.8",
            "label": "Usual Cosigner",
            "description": "This field is used to show the usual cosigner for the provider.",
            "datatype": "POINTER",
            "range": {
                "id": "New_Person-200"
            }
        },
        {
            "id": "remarks",
            "fmId": "53.9",
            "label": "Remarks",
            "description": "This field is used to enter remarks and or comments about the provider.",
            "datatype": "STRING"
        },
        {
            "id": "nonva_prescriber",
            "fmId": "53.91",
            "label": "Non-va Prescriber",
            "description": "The Transitional Pharmacy Care Project (TPB) introduces fields 53.91 - \r53.96, to allow a NON-VA Physician to be added to the New Person file\r(#200), so that Outpatient Pharmacy could process medication prescribed by\rsuch physicians.\r \rA value of 1 indicates that this person is a NON-VA Physician.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "0",
                "true": "1"
            }
        },
        {
            "id": "tax_id",
            "fmId": "53.92",
            "label": "Tax Id",
            "description": "TAX ID of the NON-VA Physician's Private Clinic, where the prescription\rwas written.",
            "datatype": "STRING"
        },
        {
            "id": "exclusionary_check_performed",
            "fmId": "53.93",
            "label": "Exclusionary Check Performed",
            "description": "Department of Health and Human Services provides an exclusionary list of\rMedical Practitioners (providers excluded are those who are not allowed to\rreceive payment for government services due to various reasons). When\radding NON-VA Physicians, they must be checked against this list.\r \rA value of 1 indicates that an Exclusionary Check was performed for this\rphysician.",
            "datatype": "BOOLEAN",
            "range": {
                "true": "1"
            }
        },
        {
            "id": "date_exclusionary_list_checked",
            "fmId": "53.94",
            "label": "Date Exclusionary List Checked",
            "description": "The date Exclusionary Check was performed.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "on_exclusionary_list",
            "fmId": "53.95",
            "label": "On Exclusionary List",
            "description": "Was the NON-VA Physician on the Exclusionary Check List?\rA value of 1 indicates that the Physician was on the Exclusionary Check.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "0",
                "true": "1"
            }
        },
        {
            "id": "exclusionary_checked_by",
            "fmId": "53.96",
            "label": "Exclusionary Checked By",
            "description": "User ID of the person who made the entry.",
            "datatype": "POINTER",
            "range": {
                "id": "New_Person-200"
            }
        },
        {
            "id": "licensing_state",
            "fmId": "54.1",
            "label": "Licensing State",
            "description": "This multiple contains credentialing information about a provider\rthat is used by the state.",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Licensing_State-200_541",
                "fmId": "200.541",
                "label": "Licensing State",
                "properties": [
                    {
                        "id": "licensing_state",
                        "fmId": ".01",
                        "label": "Licensing State",
                        "description": "This is the state issuing a license to practice medicine for a provider.",
                        "datatype": "POINTER",
                        "indexed": true,
                        "required": true,
                        "range": {
                            "id": "State-5"
                        }
                    },
                    {
                        "id": "license_number",
                        "fmId": "1",
                        "label": "License Number",
                        "description": "This is the licence number that was issued to a provider by the sate\rhe is licenced in.",
                        "datatype": "STRING",
                        "required": true
                    },
                    {
                        "id": "expiration_date",
                        "fmId": "2",
                        "label": "Expiration Date",
                        "description": "This is the expiration date of the provider's licence issued by the state.\rby the state.",
                        "datatype": "DATE-TIME",
                        "required": true
                    }
                ]
            }
        },
        {
            "id": "state_issuing_dea_number",
            "fmId": "54.2",
            "label": "State Issuing Dea Number",
            "description": "This mutiple contains the DEA# issued by a state in order to allow\rproviders to write medication orders for controlled medications.",
            "datatype": "[OBJECT]",
            "range": {
                "id": "State_Issuing_Dea_Number-200_55",
                "fmId": "200.55",
                "label": "State Issuing Dea Number",
                "properties": [
                    {
                        "id": "state_issuing_dea_number",
                        "fmId": ".01",
                        "label": "State Issuing Dea Number",
                        "description": "This is the state which has issued a State DEA# to a provider.  Not all\rstates require a seperate DEA #",
                        "datatype": "POINTER",
                        "indexed": true,
                        "required": true,
                        "range": {
                            "id": "State-5"
                        }
                    },
                    {
                        "id": "state_dea_number",
                        "fmId": "1",
                        "label": "State Dea Number",
                        "description": "This is the DEA # issued by an individual state, it is not required\rby all states and in some cases may be the same as the Federal\rDEA #.",
                        "datatype": "STRING",
                        "required": true
                    }
                ]
            }
        },
        {
            "id": "schedule_ii_narcotic",
            "fmId": "55.1",
            "label": "Schedule Ii Narcotic",
            "description": "This field is used to determine if the provider has privileges for \rSchedule II narcotic.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "0",
                "true": "1"
            }
        },
        {
            "id": "schedule_ii_nonnarcotic",
            "fmId": "55.2",
            "label": "Schedule Ii Non-narcotic",
            "description": "This field is used to determine if the provider has privileges for \rSchedule II non-narcotic.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "0",
                "true": "1"
            }
        },
        {
            "id": "schedule_iii_narcotic",
            "fmId": "55.3",
            "label": "Schedule Iii Narcotic",
            "description": "This field is used to determine if the provider has privileges for \rSchedule III narcotic.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "0",
                "true": "1"
            }
        },
        {
            "id": "schedule_iii_nonnarcotic",
            "fmId": "55.4",
            "label": "Schedule Iii Non-narcotic",
            "description": "This field is used to determine if the provider has privileges for \rSchedule III non-narcotic.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "0",
                "true": "1"
            }
        },
        {
            "id": "schedule_iv",
            "fmId": "55.5",
            "label": "Schedule Iv",
            "description": "This field is used to determine if the provider has privileges for \rSchedule IV controlled substances.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "0",
                "true": "1"
            }
        },
        {
            "id": "schedule_v",
            "fmId": "55.6",
            "label": "Schedule V",
            "description": "This field is used to determine if the provider has privileges for \rSchedule V controlled substances.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "0",
                "true": "1"
            }
        },
        {
            "id": "staff_review_required",
            "fmId": "70",
            "label": "Staff Review Required",
            "description": "This field applies to 'Interpreting Resident' personnel. If\rit contains a 'yes', an interpreting staff is required to\rreview this resident's report results.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "N",
                "true": "Y"
            }
        },
        {
            "id": "allow_verifying_of_others",
            "fmId": "71",
            "label": "Allow Verifying Of Others",
            "description": "If this field is set to 'YES' and the 'ALLOW VERIFYING BY RESIDENTS'\rdivision parameter is also set to 'YES' then this resident is allowed to\rverify reports associated with another interpreting physician.  (If both\rparameters are set to 'YES' the 'On-line Verifying of Reports' option will\rprompt the user to 'Select Interpreting Physician: ' allowing the user to\rselect an interpreting physician other than him/herself.) If this field is\rset to 'NO' then this resident is only allowed to verify his/her own\rreports.  If the division parameter 'ALLOW VERIFYING BY RESIDENT' is set\rto 'NO' then regardless of how this field is set, the resident will not be\rallowed to verify other interpreting physicians' reports.\r \rIf the user is classified as Interpreting Staff, s/he will be allowed to\rselect another interpreting physician's name and reports if this field is\rset to 'YES'.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "n",
                "true": "y"
            }
        },
        {
            "id": "rad_nuc_med_classification",
            "fmId": "72",
            "label": "Rad/nuc Med Classification",
            "description": "This multiple field contains information about the classification assigned\rto Rad/Nuc Med personnel.  Possible classifications are Technologist,\rInterpreting Resident, Interpreting Staff, and Clerk.",
            "datatype": "[ENUMERATION]",
            "range": {
                "resident": "R",
                "clerk": "C",
                "technologist": "T",
                "staff": "S"
            }
        },
        {
            "id": "rad_nuc_med_inactive_date",
            "fmId": "73",
            "label": "Rad/nuc Med Inactive Date",
            "description": "This field contains the date that this person was inactivated as a Rad/Nuc\rMed user.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "rad_nuc_med_location_access",
            "fmId": "74",
            "label": "Rad/nuc Med Location Access",
            "description": "This field will allow the user to access all data specific to a particular\rRadiology/Nuclear Medicine location.",
            "datatype": "[POINTER]",
            "range": {
                "id": "Imaging_Locations-79_1"
            }
        },
        {
            "id": "restrict_patient_selection",
            "fmId": "101.01",
            "label": "Restrict Patient Selection",
            "description": "Answer 'YES' to restrict this user to selecting only those patients\rassociated with the list pointed to by the PATIENT SELECTION LIST field\r(#101.02).",
            "datatype": "BOOLEAN",
            "range": {
                "false": "1",
                "true": "0"
            }
        },
        {
            "id": "patient_selection_list",
            "fmId": "101.02",
            "label": "Patient Selection List",
            "description": "If a value is entered into this field, the user is allowed to select only\rthose patients associated with this OE/RR LIST.",
            "datatype": "POINTER",
            "range": {
                "id": "Oe_rr_List-100_21"
            }
        },
        {
            "id": "cprs_tab",
            "fmId": "101.13",
            "label": "Cprs Tab",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Cprs_Tab-200_010113",
                "fmId": "200.010113",
                "label": "Cprs Tab",
                "properties": [
                    {
                        "id": "cprs_tab",
                        "fmId": ".01",
                        "label": "Cprs Tab",
                        "description": "This is a pointer to the OR CPRS TABS (#101.13) file. Enter the name of\rthe CPRS tab for which you want to set effective and expiration dates for\raccess for this user.",
                        "datatype": "POINTER",
                        "indexed": true,
                        "required": true,
                        "range": {
                            "id": "Or_Cprs_Tabs-101_13"
                        }
                    },
                    {
                        "id": "effective_date",
                        "fmId": ".02",
                        "label": "Effective Date",
                        "description": "This is the effective date of access to the CPRS tab.",
                        "datatype": "DATE-TIME",
                        "required": true
                    },
                    {
                        "id": "expiration_date",
                        "fmId": ".03",
                        "label": "Expiration Date",
                        "description": "This is the expiration date of access to the CPRS tab.",
                        "datatype": "DATE-TIME"
                    }
                ]
            }
        },
        {
            "id": "problem_list_primary_view",
            "fmId": "125",
            "label": "Problem List Primary View",
            "description": "This string contains the user's preferred view of the problem list.\rProblems are assigned a category based upon the service of the provider\rwho entered and/or is treating the problem; a screen may then be invoked\rallowing a filtered view of the problem list.",
            "datatype": "STRING"
        },
        {
            "id": "problem_selection_list",
            "fmId": "125.1",
            "label": "Problem Selection List",
            "description": "This is the user's preferred default list of problems to select from\rwhen adding to a patient's problem list.  If there is a list specified\rhere from the Problem Selection List File (#125), it will be automatically\rpresented to the user when the \"Add New Problem(s)\" action is selected;\rotherwise, the user will simply be prompted to select a problem from\rthe Clinical Lexicon Utility.",
            "datatype": "POINTER",
            "range": {
                "id": "Problem_Selection_List-125"
            }
        },
        {
            "id": "multiple_signon",
            "fmId": "200.04",
            "label": "Multiple Sign-on",
            "description": "This field, if filled in, overrides the SITE and DEVICE Files as to\rwhether this user can sign-on to multiple terminals at the same time, \ror is limited to one workstation (IP), only one connection.\rIf you select \"Only one IP\" be sure to put a value into the \"MULTIPLE\rSIGN-ON LIMIT\" field so users can sign-on at least once.\rValues are:\r0 = Only one connection.\r1 = Multiple connections from multiple IP's.\r2 = Only one IP address.",
            "datatype": "ENUMERATION",
            "range": {
                "Only one IP": "2",
                "NOT ALLOWED": "0",
                "ALLOWED": "1"
            }
        },
        {
            "id": "ask_device_type_at_signon",
            "fmId": "200.05",
            "label": "Ask Device Type At Sign-on",
            "description": "This field controls if the user/terminal should be asked for a terminal\rtype during sign-on. If set to YES then the system will try and get the\rterminal type from the terminal. If this doesn't work, then user is\rprompted. If set to NO then the one from the users Last Sign-on field or\rthe device subtype will be used.",
            "datatype": "ENUMERATION",
            "range": {
                "ASK": "1",
                "DON'T ASK": "0"
            }
        },
        {
            "id": "auto_menu",
            "fmId": "200.06",
            "label": "Auto Menu",
            "description": "This field controls whether the user will see menus automatically\rdisplayed (as if he had typed a \"?\") each time a new option is presented.",
            "datatype": "ENUMERATION",
            "range": {
                "NO MENUS GENERATED": "0",
                "YES, MENUS GENERATED": "1"
            }
        },
        {
            "id": "language",
            "fmId": "200.07",
            "label": "Language",
            "description": "The value in this field replaces the Default Language field in the\rKernel Site Parameters file.  It points to the Language file\rfor the VA FileMan Dialog file.",
            "datatype": "POINTER",
            "range": {
                "id": "Language-_85"
            }
        },
        {
            "id": "reserved",
            "fmId": "200.08",
            "label": "Reserved",
            "description": "Place holder, see file 3.5 #51.8",
            "datatype": "STRING"
        },
        {
            "id": "typeahead",
            "fmId": "200.09",
            "label": "Type-ahead",
            "description": "If type ahead is selected, the user will be able to type text ahead\rof what the computer is actually reading.  The computer stores the\rkeystrokes from the user, which may be confusing if the computer is slow\rbut more efficient if the user is careful.",
            "datatype": "ENUMERATION",
            "range": {
                "NOT ALLOWED": "N",
                "ALLOWED": "Y"
            }
        },
        {
            "id": "timed_read_number_of_seconds",
            "fmId": "200.1",
            "label": "Timed Read (# Of Seconds)",
            "description": "This field, if filled in, overrides the SITE and DEVICE files as to\rthe time this user has to respond to a timed read.  Stored in DTIME.",
            "datatype": "NUMERIC"
        },
        {
            "id": "always_show_secondaries",
            "fmId": "200.11",
            "label": "Always Show Secondaries",
            "description": "This field is a flag used by the menu system to control if\rthe user is shown there secondary menu list with one '?' or two.",
            "datatype": "BOOLEAN",
            "range": {
                "true": "1"
            }
        },
        {
            "id": "auto_signon",
            "fmId": "200.18",
            "label": "Auto Sign-on",
            "description": "This field will control if the Auto Sign-on (Single Sign-on) is enabled\rfor use with terminal sessions.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "1",
                "true": "0"
            }
        },
        {
            "id": "multiple_signon_limit",
            "fmId": "200.19",
            "label": "Multiple Sign-on Limit",
            "description": "This field, if filled in, overrides the SITE file. This field sets an\rupper limit on the number of concurrent sessions that this user can have\rfrom one IP address when the Multiple Sign-on field (#204) is set to \"One\rIP\"",
            "datatype": "NUMERIC"
        },
        {
            "id": "primary_menu_option",
            "fmId": "201",
            "label": "Primary Menu Option",
            "description": "This is the menu option that this user will be dropped into\rif none of the following are set: (in the order checked)\rTied routine, Device primary menu.",
            "datatype": "POINTER",
            "indexed": true,
            "range": {
                "id": "Option-19"
            }
        },
        {
            "id": "primary_window",
            "fmId": "201.1",
            "label": "Primary Window",
            "description": "This is the lead or first window launched at startup.",
            "datatype": "POINTER",
            "range": {
                "id": "Option-19"
            }
        },
        {
            "id": "startup_default",
            "fmId": "201.2",
            "label": "Startup Default",
            "description": "This field determines if the Primary Menu or the Primary Window is\rloaded at logon.",
            "datatype": "ENUMERATION",
            "range": {
                "Primary Window": "W",
                "Primary Menu Option": "M"
            }
        },
        {
            "id": "last_signon_date_time",
            "fmId": "202",
            "label": "Last Sign-on Date/time",
            "description": "This field is set when a user signs on to the system.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "xus_logon_attempt_count",
            "fmId": "202.02",
            "label": "Xus Logon Attempt Count",
            "description": "This is used to let the user know about unsuccessful logon atempts.",
            "datatype": "NUMERIC"
        },
        {
            "id": "xus_active_user",
            "fmId": "202.03",
            "label": "Xus Active User",
            "description": "If a user gets the ** MULTIPULE SIGN-ON NOT ALLOWED ** message\rthis field can be set to NO to allow them to sign-on again.\rThis flag is set by XUS and XUSCLEAN.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "1",
                "true": "0"
            }
        },
        {
            "id": "entry_last_edit_date",
            "fmId": "202.04",
            "label": "Entry Last Edit Date",
            "description": "This field holds the date time this entry in the file was last edited.\rThe following fields now trigger the current date to the ENTRY LAST EDIT\rDATE field: DISUSER (#7), ACCESS CODE (#2), and TERMINATION DATE (#9.2). ",
            "datatype": "DATE-TIME"
        },
        {
            "id": "lockout_user_until",
            "fmId": "202.05",
            "label": "Lockout User Until",
            "description": "This field is used by the signon code to lockout users that have\rtried bad VERIFY codes too many times.  This field holds the date/time \rthat the user should be locked out of the system until.\rIt is set with the current time plus the lockout time.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "last_option_accessed",
            "fmId": "202.1",
            "label": "Last Option Accessed",
            "description": "This field holds the last option accessed by the user, when the user\rselects the CONTINUE option instead of HALTing.  When the user logs\ron again, he will be able to continue directly at that option.",
            "datatype": "POINTER",
            "range": {
                "id": "Option-19"
            }
        },
        {
            "id": "last_option_main_menu",
            "fmId": "202.2",
            "label": "Last Option Main Menu",
            "description": "This field holds an indicator of which primary or secondary menu a\ruser was in, after selecting the CONTINUE option.  It is used in con-\rjunction with the LAST OPTION ACCESSED to resume when a user logs back\ron.",
            "datatype": "STRING"
        },
        {
            "id": "secondary_menu_options",
            "fmId": "203",
            "label": "Secondary Menu Options",
            "description": "Options awarded a user not on his or her primary menu option",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Secondary_Menu_Options-200_03",
                "fmId": "200.03",
                "label": "Secondary Menu Options",
                "properties": [
                    {
                        "id": "secondary_menu_options",
                        "fmId": ".01",
                        "label": "Secondary Menu Options",
                        "description": "This is an option which is merged with the users primary menu\rand XUCOMMAND option, giving the user this option on all of her/his\rmenus.",
                        "datatype": "POINTER",
                        "indexed": true,
                        "required": true,
                        "range": {
                            "id": "Option-19"
                        }
                    },
                    {
                        "id": "synonym",
                        "fmId": "2",
                        "label": "Synonym",
                        "description": "This is a user-specific synonym which may be used in addressing this\roption.",
                        "datatype": "STRING"
                    }
                ]
            }
        },
        {
            "id": "timestamp",
            "fmId": "203.1",
            "label": "Timestamp",
            "description": "This is the time at which this option was last modified.  It is triggered\rautomatically by the appropriate fields.  If a CPU references an option\rwhich has been modified since it was last rebuilt, it triggers a rebuilding\rof the options.",
            "datatype": "STRING"
        },
        {
            "id": "secid",
            "fmId": "205.1",
            "label": "Secid",
            "description": "Identity and Access Management SECID field used to uniquely identify a \rVistA user by Security ID.\r \r*** This field should never be edited directly - do not remove WRITE \rACCESS!",
            "datatype": "STRING",
            "indexed": true
        },
        {
            "id": "subject_organization",
            "fmId": "205.2",
            "label": "Subject Organization",
            "description": "Identity and Access Management SUBJECT ORGANIZATION field used to \ridentify the Organization of an externally authenticated user (Subject). \rExamples: \"Department of Veterans Affairs\" or \"Department of Defense\"\r \r*** This field should never be edited directly - do not remove WRITE \rACCESS!",
            "datatype": "STRING"
        },
        {
            "id": "subject_organization_id",
            "fmId": "205.3",
            "label": "Subject Organization Id",
            "description": "Identity and Access Management SUBJECT ORGANIZATION ID field used to \runiquely identify the Organization that is providing the identification \rfor an externally authenticated user (Subject). The organization ID \rmay be an Object Identifier (OID), using the urn format (that is, \r\"urn:oid:\" appended with the OID); or it may be a URL assigned to \rthat organization. For SSOi this will be hard-coded to Department of \rVeterans Affairs official Home Community ID. NHIN standards specify that\rthe web address of the Subject Organization is typically stored in this\rfield (example: http://familymedicalclinic.org).\r \r*** This field should never be edited directly - do not remove WRITE \rACCESS!",
            "datatype": "STRING"
        },
        {
            "id": "unique_user_id",
            "fmId": "205.4",
            "label": "Unique User Id",
            "description": "Identity and Access Management UNIQUE USER ID field used to uniquely \ridentify a user (Subject) within the Subject Organization. The combination\rof Subject Organization ID (OID) and Unique User ID (UID) is\rcross-referenced in VistA and must be unique. For VA SSOi, this will be \rthe user SecID. Within NHIN this could be the subject of the NHIN SAML \rtoken which would contain email address of a X.509 name.\r \r*** This field should never be edited directly - do not remove WRITE \rACCESS!",
            "datatype": "STRING"
        },
        {
            "id": "adupn",
            "fmId": "205.5",
            "label": "Adupn",
            "description": "Identity and Access Management Active Directory User Principle Name (AD \rUPN) field.",
            "datatype": "STRING",
            "indexed": true
        },
        {
            "id": "personal_diagnoses_list",
            "fmId": "351",
            "label": "Personal Diagnoses List",
            "description": "This is the provider's personal list of preferred diagnoses codes.",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Personal_Diagnoses_List-200_0351",
                "fmId": "200.0351",
                "label": "Personal Diagnoses List",
                "properties": [
                    {
                        "id": "diagnosis",
                        "fmId": ".01",
                        "label": "Diagnosis",
                        "description": "A diagnosis in the provider's preferred list.",
                        "datatype": "POINTER",
                        "indexed": true,
                        "required": true,
                        "range": {
                            "id": "Icd_Diagnosis-80"
                        }
                    },
                    {
                        "id": "expression",
                        "fmId": "1",
                        "label": "Expression",
                        "description": "This is the diagnosis code's Lexicon\rexpression as stored in the EXPRESSION file,\rfile # 757.01.",
                        "datatype": "POINTER",
                        "range": {
                            "id": "Expressions-757_01"
                        }
                    }
                ]
            }
        },
        {
            "id": "supply_employee",
            "fmId": "400",
            "label": "Supply Employee",
            "datatype": "ENUMERATION",
            "range": {
                "WAREHOUSE": "1",
                "PPM ACCOUNTABLE OFFICER": "2",
                "MANAGER": "4",
                "PURCHASING AGENT": "3"
            }
        },
        {
            "id": "paid_employee",
            "fmId": "450",
            "label": "Paid Employee",
            "description": "This field is a pointer to the PAID EMPLOYEE (#450) file.",
            "datatype": "POINTER",
            "range": {
                "id": "Paid_Employee-450"
            }
        },
        {
            "id": "network_address",
            "fmId": "500",
            "label": "Network Address",
            "description": "This is the begining of a network address.  Enter the Lastname of the user\ror an identifier that he is known as on the receiving system.",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Network_Address-200_005",
                "fmId": "200.005",
                "label": "Network Address",
                "properties": [
                    {
                        "id": "network_address_lastname",
                        "fmId": ".01",
                        "label": "Network Address Lastname",
                        "description": "This is the last name of the user.",
                        "datatype": "STRING",
                        "indexed": true,
                        "required": true
                    },
                    {
                        "id": "network_address_first_name",
                        "fmId": "1",
                        "label": "Network Address First Name",
                        "description": "The recipient's first name should be entered into this field.",
                        "datatype": "STRING",
                        "required": true
                    },
                    {
                        "id": "x400_user_id",
                        "fmId": "2",
                        "label": "X.400 User Id",
                        "description": "Enter a string that uniquely identifies the user at the remote system.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "generation",
                        "fmId": "3",
                        "label": "Generation",
                        "description": "The generation of the recipient is a suffix that further identifies him.\rCommon strings used as such suffixes are: 'junior', 'senior', 'III'.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "country",
                        "fmId": "4",
                        "label": "Country",
                        "description": "All X.400 addresses require a 'country'.  If no country is known this system\rwill not deliver the mail.  As of 11/90 'US' was the only valid country.\rSMTP addresses such as 'name@domain' where domain ends with such strings as\r'.EDU' need no country.",
                        "datatype": "ENUMERATION",
                        "range": {
                            "US": "US"
                        }
                    },
                    {
                        "id": "organization",
                        "fmId": "5",
                        "label": "Organization",
                        "description": "If you are filling in this field for an X.400 address, it is a standard\rfield.  If, however, you are filling in this field for an SMTP address,\ryou must fill in the third level of the domain.  For example, the third\rlevel of the domain 'SILVER.DOMAIN.EXT' is the string after the second\r\".\" starting from the right.  'GOV' is the first.  'VA' is the second.\r'SILVER' is the fourth level.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "organizational_unit_sub0",
                        "fmId": "5.1",
                        "label": "Organizational Unit Sub0",
                        "description": "This field contains the 'Orgainzational Unit' of the address if it is the\raddress of an X.400 recipient.  IF it is the address of an SMTP recipient,\rthis is the FOURTH LEVEL NAME of the DOMAIN.  See the ORGANIZATION field\rfor a description of domain levels of SMTP domains.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "organizational_unit_sub1",
                        "fmId": "5.2",
                        "label": "Organizational Unit Sub1",
                        "description": "The Organizational Unit field of X.400 recipients is infinitely repeating.\rThis system will only be able to handle 4 levels of Organizational Units.\rSMTP domains also have levels.  Each Organizational Unit 'subn' field is\ra deeper definition (and level) of the SMTP domain.  'Sub1' is the fift\rlevel of the domain field.  'Sub2' is the sixth level. 'Sub3' is the seventh.\rSee the description of the ORGANIZATION field for further information on\rlevels of SMTP domains.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "organizational_unit_sub2",
                        "fmId": "5.3",
                        "label": "Organizational Unit Sub2",
                        "description": "See the description of the 'ORGANIZATIONAL UNIT sub1' field for further\rinformation.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "organizational_unit_sub3",
                        "fmId": "5.4",
                        "label": "Organizational Unit Sub3",
                        "description": "See the description of the 'ORGANIZATIONAL UNIT SUB1' field for further\rinformation.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "locality",
                        "fmId": "6",
                        "label": "Locality",
                        "datatype": "STRING"
                    },
                    {
                        "id": "application_entity",
                        "fmId": "7",
                        "label": "Application Entity",
                        "description": "The 'Application Entity' field is the name of a piece of software that will\rreceive and process any messages it receives.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "private_administrative_domain",
                        "fmId": "98",
                        "label": "Private Administrative Domain",
                        "description": "For X.400 addresses this field is standard.  For mapping into the SMTP\rmail system (MailMan is an SMTP mail system.), this field is filled in\rwith a special string.  'DHCP' will be interpreted as \".DOMAIN.EXT\" for all\rDepartment of Veterans' Affairs SMTP systems.  If the address does have\r\"DHCP' in this field, MailMan will try to deliver it to a VA site.  If\rthe address has anything else, MailMan will try to deliver to an X.400\rsystem as of 11/90.  Later there may be additional special PRMDs.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "administrative_domain",
                        "fmId": "99",
                        "label": "Administrative Domain",
                        "description": "The Administrative domain is the carrier of the electronic channels.  Some\rexamples of carriers in the US are US SPRINT, AT&T and MCI Communications.\rThis field is required only for X.400 addresses.",
                        "datatype": "STRING"
                    }
                ]
            }
        },
        {
            "id": "network_username",
            "fmId": "501.1",
            "label": "Network Username",
            "description": "This is the username that is used by the Windows Active Directory.\rIt should be 'VHA' + 3 char station ID + first 5 of last name + first\rcharacter of first name.\rHolders of the XUMGR key can override this.",
            "datatype": "STRING"
        },
        {
            "id": "subject_alternative_name",
            "fmId": "501.2",
            "label": "Subject Alternative Name",
            "description": "This is a name from the PIV card field SUBJECT ALTERNATIVE NAME\ralso known as USER PRINCIPLE NAME. \r \rThe subject alternative name extension allows identities to be bound\rto the subject of the certificate.  These identities may be included\rin addition to or in place of the identity in the subject field of\rthe certificate.  Subject alternative name is defined by an Internet \relectronic mail address.\r \rWhen the subjectAltName extension contains an Internet mail address,\rthe address MUST be stored in the rfc822Name.\r",
            "datatype": "STRING",
            "indexed": true
        },
        {
            "id": "social_worker_",
            "fmId": "654",
            "label": "Social Worker ?",
            "description": "This field will be used to indicate if the user is a Social Worker.\rIt will also act as a screen for lookups.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "0",
                "true": "1"
            }
        },
        {
            "id": "immediate_supervisor",
            "fmId": "654.1",
            "label": "Immediate Supervisor",
            "description": "This field is used to indicate the immediate supervisor of the social worker.",
            "datatype": "POINTER",
            "indexed": true,
            "range": {
                "id": "New_Person-200"
            }
        },
        {
            "id": "position_title",
            "fmId": "654.15",
            "label": "Position/title",
            "description": "This field will be used to indicate the position/title of the social worker.",
            "datatype": "ENUMERATION",
            "range": {
                "SW COORDINATOR": "4",
                "SUPERVISOR": "3",
                "SW CHIEF": "1",
                "ASST. CHIEF": "2",
                "SOCIAL WORKER": "5",
                "VOLUNTEER": "10",
                "SW ASSOCIATE": "6",
                "STUDENT": "9",
                "SW CLERK/STENO": "8",
                "WOC": "11",
                "SECRETARY": "7"
            }
        },
        {
            "id": "social_workers_number",
            "fmId": "654.2",
            "label": "Social Worker's Number",
            "description": "Unique number assigned to social worker by service.  Enter a number 01-999.",
            "datatype": "NUMERIC",
            "indexed": true
        },
        {
            "id": "surrogate",
            "fmId": "654.3",
            "label": "Surrogate",
            "description": "This field will be used to indicate a surrogate supervisor.  When this\rfield has data, the surrogate supervisor will have access to data pertaining\rto worker information for the surrogated supervisor.",
            "datatype": "POINTER",
            "indexed": true,
            "range": {
                "id": "New_Person-200"
            }
        },
        {
            "id": "dmms_units",
            "fmId": "720",
            "label": "Dmms Units",
            "description": "This multiple field contains the DMMS units to which this person has\raccess for entering data and generating reports.",
            "datatype": "[POINTER]",
            "range": {
                "id": "Dss_Unit-724"
            }
        },
        {
            "id": "appointment_status",
            "fmId": "747.11",
            "label": "Appointment Status",
            "description": "Contains the Appointment Status for this person.",
            "datatype": "ENUMERATION",
            "range": {
                "FULL-TIME": "1",
                "RESIDENT": "5",
                "CONSULTING": "3",
                "CONTRACT": "4",
                "FEE BASIS, ON STATION": "6",
                "PART-TIME": "2",
                "OTHER": "9",
                "SPECIALTY FELLOW": "7",
                "WOC": "8"
            }
        },
        {
            "id": "renew_date",
            "fmId": "747.113",
            "label": "Renew Date",
            "description": "Contains the Renewal Date for our General Privilege.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "dea_expiration_date",
            "fmId": "747.44",
            "label": "Dea Expiration Date",
            "description": "This field contains the expiration date for DEA #.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "enumeration_initiated",
            "fmId": "900",
            "label": "Enumeration Initiated",
            "description": "This field notes the date/time the VPID enumeration attempt was \rinitiated.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "enumeration_completed",
            "fmId": "901",
            "label": "Enumeration Completed",
            "description": "This field notes the date/time the VPID assignment was completed.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "requires_transmission",
            "fmId": "902",
            "label": "Requires Transmission",
            "description": "This field is used to note that this record was just added to this file, \ror that an edit was made to the fields that MPI cares about capturing and \ra VPID needs to be assigned or an update message needs to be sent.\r \rFields being monitored for change are:\r \r .01           NAME \r .111          STREET ADDRESS 1 \r .112          STREET ADDRESS 2 \r .113          STREET ADDRESS 3 \r .114          CITY \r .115          STATE \r .116          ZIP CODE \r .131          PHONE (HOME) \r 4             SEX \r 5             DOB \r 9             SSN \r 41.99         NPI \r 53.2          DEA# \r 200.06,.01    VISITED FROM \r 200.06,2      DUZ AT HOME SITE",
            "datatype": "BOOLEAN",
            "range": {
                "true": "Y"
            }
        },
        {
            "id": "badge_number",
            "fmId": "910.1",
            "label": "Badge Number",
            "description": "Enter the badge number assigned to the VA police officer.",
            "datatype": "NUMERIC"
        },
        {
            "id": "rank",
            "fmId": "910.2",
            "label": "Rank",
            "description": "Enter the VA police officer's assigned rank designation, i.e., CHIEF,\rLIEUTENANT, PATROL OFFICER, etc.",
            "datatype": "STRING"
        },
        {
            "id": "visited_from",
            "fmId": "8910",
            "label": "Visited From",
            "description": "This subfile stores the information that travels along with visitors using\rthe CPRS Foreign Views software to look at medical data of a patient which\rresides on a system where the visitor may not have valid access or verify\rcodes.  When that person name and Social Security Number is put into the\rvisited system's New Person File this multiple is updated to provide the\rability to trace the visitors back to the system from which they are\rvisiting.  This field (.01) stores the number of the site where the\rvisitor was authenticated.",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Visited_From-200_06",
                "fmId": "200.06",
                "label": "Visited From",
                "properties": [
                    {
                        "id": "visited_from",
                        "fmId": ".01",
                        "label": "Visited From",
                        "description": "This field holds the official Station Number ID of the remote site that\rdid the user authentication. This may be the site that caused this user to\rbe added to the NPF.",
                        "datatype": "STRING",
                        "indexed": true,
                        "required": true
                    },
                    {
                        "id": "site_name",
                        "fmId": "1",
                        "label": "Site Name",
                        "description": "This field contains the name of the site where the visitor was\rauthenticated.",
                        "datatype": "STRING"
                    },
                    {
                        "id": "duz_at_home_site",
                        "fmId": "2",
                        "label": "Duz At Home Site",
                        "description": "This field contains the internal entry number in the New Person File at\rthe site where this visitor was authenticated.",
                        "datatype": "NUMERIC"
                    },
                    {
                        "id": "first_visit",
                        "fmId": "3",
                        "label": "First Visit",
                        "description": "This field contains the date when this visitor first visited from the site\rrecorded in the .01 field.",
                        "datatype": "DATE-TIME"
                    },
                    {
                        "id": "last_visited",
                        "fmId": "4",
                        "label": "Last Visited",
                        "description": "This field is updated each time a visitor arrives from the site in the .01\rfield.",
                        "datatype": "DATE-TIME"
                    },
                    {
                        "id": "phone_at_site",
                        "fmId": "5",
                        "label": "Phone At Site",
                        "description": "This field may contain a phone number for the visitor at their home site.\rSince phone numbers are not always entered, this field may be blank.",
                        "datatype": "STRING"
                    }
                ]
            }
        },
        {
            "id": "person_class",
            "fmId": "8932.1",
            "label": "Person Class",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Person_Class-200_05",
                "fmId": "200.05",
                "label": "Person Class",
                "properties": [
                    {
                        "id": "person_class",
                        "fmId": ".01",
                        "label": "Person Class",
                        "description": "This is a pointer to the Person class file.",
                        "datatype": "POINTER",
                        "indexed": true,
                        "required": true,
                        "range": {
                            "id": "Person_Class-8932_1"
                        }
                    },
                    {
                        "id": "effective_date",
                        "fmId": "2",
                        "label": "Effective Date",
                        "description": "This field is trigger by adding a new person class.",
                        "datatype": "DATE-TIME",
                        "indexed": true,
                        "required": true
                    },
                    {
                        "id": "expiration_date",
                        "fmId": "3",
                        "label": "Expiration Date",
                        "description": "This field is the date after which this class becomes inactive.\rThis field must be not less than the EFFECTIVE DATE and not greater \rthan the DATE INACTIVATED field(#4) of the Person Class entry in the\rPERSON CLASS file(#8932.1).\r       \rIt will get triggered if a new Person Class is entered or someone\redits the field to inactivate the class.",
                        "datatype": "DATE-TIME"
                    }
                ]
            }
        },
        {
            "id": "pgyear",
            "fmId": "8932.2",
            "label": "Pgyear",
            "description": "This field holds what Post Graduate year a person is.",
            "datatype": "NUMERIC"
        },
        {
            "id": "pgy_assigned",
            "fmId": "8932.21",
            "label": "Pgy Assigned",
            "description": "This field holds the date that the PGYear field was last edited.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "fyear",
            "fmId": "8932.3",
            "label": "Fyear",
            "description": "This field is the Fellowship year of a person.",
            "datatype": "NUMERIC"
        },
        {
            "id": "fy_assigned",
            "fmId": "8932.31",
            "label": "Fy Assigned",
            "description": "This field holds the Date that the FYear field was edited.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "person_file_pointer",
            "fmId": "8980.16",
            "label": "Person File Pointer",
            "description": "This field holds a pointer to the person file so there will be a way to\rprovide a cross reference to help convert 'person file' pointers into\r'new person file' pointer after the person file is removed.",
            "corrupt": true
        },
        {
            "id": "display_help_at_entry_to_lm",
            "fmId": "8983.11",
            "label": "Display Help At Entry To Lm",
            "description": "If set to yes, a help text will be displayed before entering the editor.\rThis is used primarily for new users.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "n",
                "true": "y"
            }
        },
        {
            "id": "ask_terminal_type_at_lm_entry",
            "fmId": "8983.12",
            "label": "Ask Terminal Type At Lm Entry",
            "description": "If set to yes, the terminal type will be asked upon entry to the editor.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "n",
                "true": "y"
            }
        },
        {
            "id": "default_terminal_type_for_lm",
            "fmId": "8983.13",
            "label": "Default Terminal Type For Lm",
            "description": "This field stores the default terminal type for a user.",
            "datatype": "POINTER",
            "range": {
                "id": "Terminal_Type-3_2"
            }
        },
        {
            "id": "display_lm_commands",
            "fmId": "8983.14",
            "label": "Display Lm Commands",
            "description": "If set to yes, the list of commands will be displayed at the bottom\rof the screen when entering the command mode.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "n",
                "true": "y"
            }
        },
        {
            "id": "bright_chars_at_exit_from_lm",
            "fmId": "8983.15",
            "label": "Bright Chars At Exit From Lm",
            "description": "If set to yes, the terminal will be left in high intensity after exiting.",
            "datatype": "BOOLEAN",
            "range": {
                "false": "n",
                "true": "y"
            }
        },
        {
            "id": "date_last_accessed_lm_wp",
            "fmId": "8983.16",
            "label": "Date Last Accessed Lm Wp",
            "description": "The date and time a user last accessed the LetterMan word processor\rdocument editor.",
            "datatype": "DATE-TIME"
        },
        {
            "id": "total_minutes_using_lm_wp",
            "fmId": "8983.17",
            "label": "Total Minutes Using Lm Wp",
            "description": "The total minutes a user has used the LetterMan word processor\rdocument editor.",
            "datatype": "NUMERIC"
        },
        {
            "id": "keystrokes_from_lm_wp",
            "fmId": "8983.18",
            "label": "Keystrokes From Lm Wp",
            "description": "This field stores the total number of keystrokes a user has typed from\rthe word processor document editor.",
            "datatype": "NUMERIC"
        },
        {
            "id": "spelling_exception_dictionary",
            "fmId": "8983.5",
            "label": "Spelling Exception Dictionary",
            "description": "This field stores the exception spelling dictionary for the user.",
            "datatype": "[STRING]"
        },
        {
            "id": "defined_formats_for_lm",
            "fmId": "8983.51",
            "label": "Defined Formats For Lm",
            "description": "This field is used to store predefined format lines which a user can\rselect from during editing.",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Defined_Formats_For_Lm-200_0089832",
                "fmId": "200.0089832",
                "label": "Defined Formats For Lm",
                "properties": [
                    {
                        "id": "number",
                        "fmId": ".01",
                        "label": "Number",
                        "description": "This is the reference number to the predefined format line.",
                        "datatype": "NUMERIC",
                        "indexed": true,
                        "required": true
                    },
                    {
                        "id": "default",
                        "fmId": "1",
                        "label": "Default",
                        "description": "If set to yes, this format line will be used as the default format line\rwhen using the screen editor.  If a document already has a format line\rdefined, then the document format will be used.",
                        "datatype": "BOOLEAN",
                        "indexed": true,
                        "range": {
                            "false": "n",
                            "true": "y"
                        }
                    },
                    {
                        "id": "format_line",
                        "fmId": "2",
                        "label": "Format Line",
                        "description": "This field stores the predefined format lines of the user.",
                        "datatype": "STRING"
                    }
                ]
            }
        },
        {
            "id": "defined_phrases_for_lm",
            "fmId": "8983.52",
            "label": "Defined Phrases For Lm",
            "description": "This field stores predefined phrases which can be inserted into the document during editing.",
            "datatype": "[OBJECT]",
            "range": {
                "id": "Defined_Phrases_For_Lm-200_0089833",
                "fmId": "200.0089833",
                "label": "Defined Phrases For Lm",
                "properties": [
                    {
                        "id": "keyword",
                        "fmId": ".01",
                        "label": "Keyword",
                        "description": "The predefined phrase 'keyword' used to select the phrase.",
                        "datatype": "STRING",
                        "indexed": true,
                        "required": true
                    },
                    {
                        "id": "phrase",
                        "fmId": "1",
                        "label": "Phrase",
                        "description": "The phrase to be inserted into the document.",
                        "datatype": "STRING",
                        "isWP": true
                    }
                ]
            }
        },
        {
            "id": "lm_limit_wp_fields_to_edit",
            "fmId": "8983.6",
            "label": "Lm Limit Wp Fields To Edit",
            "description": "This field is used by the user to limit which word processing\rfields should be edited by LetterMan.",
            "datatype": "[STRING]"
        },
        {
            "id": "vpid",
            "fmId": "9000",
            "label": "Vpid",
            "description": "The VA Person Identification Number which was assigned by the Person\rService central system.  Used to uniquely identify a Person.",
            "datatype": "STRING",
            "indexed": true
        }
    ]
}];

module.exports.vdmModel = VDM_MODEL;
