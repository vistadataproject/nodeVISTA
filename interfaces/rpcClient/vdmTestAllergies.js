/*
 * For sharing between checking spec and data insert spec (when they merge
 * then this can go in there (or maybe not!)
 *
 * TODO: times - note slight spread which reflects CRPS/RPC origin. No need
 * for spread in historicals. Should be template $NOW.
 * May added other templates like $PATIENT and $PROVIDER
 *
 * TODO: rename to testAllergies.js to cover MVDM (VPR etc) too ie/ 
 * "mvdmCreate"
 *
 * TODO: change "vdmCreateResult" to "Results" as > 1 object may be
 * created. Type indicates how to automatically look that up ... 
 * ... THESE TESTS CAN BE DATE DRIVEN ...
 * ... i/e can stress OUT whole of vdmAllergy-spec / mvdmAllergy-spec
 * ... ie/ ONLY RPC needs to be hand written.
 *
 * (c) VISTA Data Project 2016
 */ 

// OVERALL TODO: move to a CREATE/UPDATE(s) sequencing ... array it. "vdmCreate": , "vdmUpdate": [] ...
// ... promises ...

'use strict';

var historicalOne = {

    "description": 'Basic historical allergy - PENICILLIN - no errors, has ingredients, classes and the mandatory gmr_allergy.',

    "vdmCreate": {

        "type": "Patient_Allergies-120_8",
        "patient": {
            "id": "2-1",
            "label": "CARTER,DAVID JR"
        },
        "gmr_allergy": {
            "id": "50_6-16",
            "label": "PENICILLIN",
            "sameAs": "vuid:4019880"
        },
        "allergy_type": "D",
        "origination_date_time": {
            "value": "2016-02-18T17:22:00Z",
            "type": "xsd:dateTime"
        },
        "originator": {
            "id": "200-55",
            "label": "ALEXANDER,ROBERT"
        },
        "observed_historical": "HISTORICAL",
        "chart_marked": [
            {
                "type": "CHART MARKED",
                "date_time": {
                    "value": "2016-02-18T17:23:11Z", // slightly later than origination_date_time
                    "type": "xsd:dateTime"
                },
                "user_entering": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                }
            }
        ],
        "mechanism": "UNKNOWN",
        "verified": true,
        "verification_date_time": {
            "value": "2016-02-18T17:23:14Z",
            "type": "xsd:dateTime"
        }
    },

    // result has more in it
    "vdmCreateResult": {

        "type": "Patient_Allergies-120_8",
        "patient": {
            "id": "2-1",
            "label": "CARTER,DAVID JR"
        },
        "reactant": "PENICILLIN",
        "gmr_allergy": {
            "id": "50_6-16",
            "label": "PENICILLIN",
            "sameAs": "vuid:4019880"
        },
        "drug_ingredients": [
            {
                "id": "50_416-2505",
                "label": "PENICILLIN",
                "sameAs": "vuid:4019880"
            }
        ],
        "drug_classes": [
            {
                "id": "50_605-248",
                "label": "AM110",
                "sameAs": "vuid:4021739"
            }
        ],
        "allergy_type": "D",
        "origination_date_time": {
            "value": "2016-02-18T17:22:00Z",
            "type": "xsd:dateTime"
        },
        "originator": {
            "id": "200-55",
            "label": "ALEXANDER,ROBERT"
        },
        "observed_historical": "HISTORICAL",
        "chart_marked": [
            {
                "type": "CHART MARKED",
                "date_time": {
                    "value": "2016-02-18T17:23:11Z", // slightly later than origination_date_time
                    "type": "xsd:dateTime"
                },
                "user_entering": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                }
            }
        ],
        "originator_sign_off": true,
        "mechanism": "UNKNOWN",
        "verified": true,
        "verification_date_time": {
            "value": "2016-02-18T17:23:14Z",
            "type": "xsd:dateTime"
        }

    },

    // equivalent FM of create result (ie/ post default/dependent etc) 
    "fm": {

        "file": '120.8', 

        ".01": '1', 

        ".02": 'PENICILLIN', 

        "1": '16;PSNDF(50.6,', 

        "2": [ { ".01": '2505' } ], 

        "3": [ { ".01": '248' } ], 

        "3.1" : 'D',

        "4": '3160218.172200', 

        "5": '55', 

        "6": 'h', 

        "13": [ { "file": '120.813', ".01": '3160218.172311', "1": '55' } ], 

        "15": '1', 

        "17": 'U', 

        "19": 1, 

        "20": '3160218.172314' 

    }
};

var historicalTwo = {

    "description": 'Basic historical allergy - Acetaminophen - no errors. Has ingredients but no class to go with the mandatory gmr_allergy. Note that ingredient and allrgy are the same',

    "vdmCreate": {

        "type": "Patient_Allergies-120_8",

        "patient": {
            "id": "2-1",
            "label": "CARTER,DAVID JR"
        },

        "gmr_allergy": {
            "id": "50_416-105",
            "label": "ACETAMINOPHEN",
            "sameAs": "vuid:4017513"
        },

        "allergy_type": "D",
        "origination_date_time": {
            "value": "2016-02-18T17:34:00Z",
            "type": "xsd:dateTime"
        },
        "originator": {
            "id": "200-55",
            "label": "ALEXANDER,ROBERT"
        },
        "observed_historical": "HISTORICAL",
        "chart_marked": [
            {
                "date_time": {
                    "value": "2016-02-18T17:34:54Z",
                    "type": "xsd:dateTime"
                },
                "user_entering": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                }
            }
        ],
        "mechanism": "PHARMACOLOGIC",
        "verified": true,
        // in VDM, should this be forced to be the same (derived) from origination_date_time?
        "verification_date_time": {
            "value": "2016-02-18T17:34:56Z",
            "type": "xsd:dateTime"
        }
    },

    "vdmCreateResult": {

        "type": "Patient_Allergies-120_8",

        "patient": {
            "id": "2-1",
            "label": "CARTER,DAVID JR"
        },

        "reactant": "ACETAMINOPHEN",

        "gmr_allergy": {
            "id": "50_416-105",
            "label": "ACETAMINOPHEN",
            "sameAs": "vuid:4017513"
        },

        "drug_ingredients": [
            {
                "id": "50_416-105",
                "label": "ACETAMINOPHEN",
                "sameAs": "vuid:4017513"
            }
        ],
        "allergy_type": "D",
        "origination_date_time": {
            "value": "2016-02-18T17:34:00Z",
            "type": "xsd:dateTime"
        },
        "originator": {
            "id": "200-55",
            "label": "ALEXANDER,ROBERT"
        },
        "observed_historical": "HISTORICAL",
        "chart_marked": [
            {
                "date_time": {
                    "value": "2016-02-18T17:34:54Z",
                    "type": "xsd:dateTime"
                },
                "user_entering": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                }
            }
        ],
        "originator_sign_off": true,
        "mechanism": "PHARMACOLOGIC",
        "verified": true,
        // in VDM, should this be forced to be the same (derived) from origination_date_time?
        "verification_date_time": {
            "value": "2016-02-18T17:34:56Z",
            "type": "xsd:dateTime"
        }
    }  
};

var historicalThree = {

    "description": 'Basic historical allergy - Penicillin Class - no errors. Same class in  gmr_allergy and class',

    "vdmCreate": {
    
        "type": "Patient_Allergies-120_8",

        "patient": {
            "id": "2-1",
            "label": "CARTER,DAVID JR"
        },
        "gmr_allergy": {
            "id": "50_605-11",
            "label": "AM114",
            "sameAs": "vuid:4021523"
        },
        "allergy_type": "D",
        "origination_date_time": {
            "value": "2016-02-18T17:32:00Z",
            "type": "xsd:dateTime"
        },
        "originator": {
            "id": "200-55",
            "label": "ALEXANDER,ROBERT"
        },
        "observed_historical": "HISTORICAL",
        "chart_marked": [
            {
                "date_time": {
                    "value": "2016-02-18T17:32:48Z",
                    "type": "xsd:dateTime"
                },
                "user_entering": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                }
            }
        ],
        "mechanism": "UNKNOWN",
        "verified": true,
        "verification_date_time": {
            "value": "2016-02-18T17:32:05Z",
            "type": "xsd:dateTime"
        }
    },

    "vdmCreateResult": {

        "type": "Patient_Allergies-120_8",

        "patient": {
            "id": "2-1",
            "label": "CARTER,DAVID JR"
        },
        "reactant": "PENICILLINS AND BETA-LACTAM ANTIMICROBIALS",
        "gmr_allergy": {
            "id": "50_605-11",
            "label": "AM114",
            "sameAs": "vuid:4021523"
        },
        "drug_classes": [
            {
                    "id": "50_605-11",
                    "label": "AM114",
                    "sameAs": "vuid:4021523"
            }
        ],
        "allergy_type": "D",
        "origination_date_time": {
            "value": "2016-02-18T17:32:00Z",
            "type": "xsd:dateTime"
        },
        "originator": {
            "id": "200-55",
            "label": "ALEXANDER,ROBERT"
        },
        "observed_historical": "HISTORICAL",
        "chart_marked": [
            {
                "date_time": {
                    "value": "2016-02-18T17:32:48Z",
                    "type": "xsd:dateTime"
                },
                "user_entering": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                }
            }
        ],
        "originator_sign_off": true,
        "mechanism": "UNKNOWN",
        "verified": true,
        "verification_date_time": {
            "value": "2016-02-18T17:32:05Z",
            "type": "xsd:dateTime"
        }
    }
    
};

var historicalFour = {

    "description": 'GMR Allergies (120.8) Drug (D) entry whose definition defines many ingredients (50.416) and classes (50.605)',

    "vdmCreateResult": {

        "type": "Patient_Allergies-120_8",
        "patient": { "id": "2-1", "label": "CARTER,DAVID JR" },
        "reactant": "ASCORBIC ACID",
        "gmr_allergy": { 
            "id": "120_82-53",
            "label": "ASCORBIC ACID",
            "sameAs": "vuid:4636711" 
        },
        "drug_ingredients": 
        [ 
            { "id": "50_416-63", "label": "ASCORBIC ACID", "sameAs": "vuid:4017471"  },
            { "id": "50_416-64", "label": "SODIUM ASCORBATE", "sameAs": "vuid:4017472" },
            { "id": "50_416-2646", "label": "ASCORBYL PALMITATE", "sameAs": "vuid:4020017" },
            { "id": "50_416-4356", "label": "EDETATE", "sameAs": "vuid:4025443" } 
        ],
        "drug_classes": 
        [ 
            { "id": "50_605-207", "label": "TN200", "sameAs": "vuid:4021704" },
            { "id": "50_605-224", "label": "VT400", "sameAs": "vuid:4021716" },
            { "id": "50_605-325", "label": "VT801", "sameAs": "vuid:4021807" },
            { "id": "50_605-329", "label": "VT809", "sameAs": "vuid:4021808" },
            { "id": "50_605-436", "label": "VT802", "sameAs": "vuid:4021913" }
        ],
        "allergy_type": "D",
        "origination_date_time": { "value": "2016-02-25T19:03:00Z", "type": "xsd:dateTime" },
        "originator": { "id": "200-55", "label": "ALEXANDER,ROBERT" },
        "observed_historical": "HISTORICAL",
        "chart_marked": 
        [ 
          { 
            "date_time": { "value": "2016-02-25T19:03:14Z", "type": "xsd:dateTime" },
            "user_entering": { "id": "200-55", "label": "ALEXANDER,ROBERT" } 
          } 
        ],
        "originator_sign_off": true,
        "mechanism": "PHARMACOLOGIC",
        "verified": true,
        "verification_date_time": { "value": "2016-02-25T19:03:17Z", "type": "xsd:dateTime" } 
    }

};

var historicalFive = {

    "description": "NDC UPN 50.67. This WILL NOT go through Model as not in gmr_allergy range but RPC can take it and turns it back to a 50.6. The only sign of a change is that the reactant name may not match the 50.6 name. 50_67-11 leads to 50_6-1 in nodeVISTA.",

    "vdmCreateResult": {

        "type": "Patient_Allergies-120_8",
        "patient": { "id": "2-1", "label": "CARTER,DAVID JR" },
        "reactant": "ATROPINE SULFATE", // starts as 50_67-11 ... RPC turns to 50_6 as it must as 50_67 not allowed in file
        "gmr_allergy": { "id": "50_6-1", "label": "ATROPINE", "sameAs": "vuid:4019591" },
        "drug_ingredients": 
        [ 
            { "id": "50_416-2", "label": "GLYCERIN", "sameAs": "vuid:4017411" },
            { "id": "50_416-3", "label": "PHENOL", "sameAs": "vuid:4017412" },
            { "id": "50_416-2207", "label": "ATROPINE", "sameAs": "vuid:4019591" },
            { "id": "50_416-2270", "label": "PARABEN", "sameAs": "vuid:4019651" }
        ],
        "drug_classes": 
        [ 
            { "id": "50_605-43", "label": "AU350", "sameAs": "vuid:4021554" },
            { "id": "50_605-169", "label": "OP600", "sameAs": "vuid:4021669" },
            { "id": "50_605-319", "label": "RE105", "sameAs": "vuid:4021804" }
        ],
        "allergy_type": "D",
        "origination_date_time": { "value": "2016-02-25T19:05:00Z", "type": "xsd:dateTime" },
        "originator": { "id": "200-55", "label": "ALEXANDER,ROBERT" },
        "observed_historical": "HISTORICAL",
        "chart_marked": 
        [ 
            { 
                "date_time": { "value": "2016-02-25T19:06:01Z", "type": "xsd:dateTime" },
                "user_entering": { "id": "200-55", "label": "ALEXANDER,ROBERT" } 
            } 
        ],
        "originator_sign_off": true,
        "mechanism": "ALLERGY",
        "verified": true,
        "verification_date_time": { "value": "2016-02-25T19:06:12Z", "type": "xsd:dateTime" } 
    } 
};

var observedOne = { // has EIE (so remove if using it)
    
    // Note all times effectively the same except for EIE (comment and time made)
    "vdmCreateResult": {

        "type": "Patient_Allergies-120_8",
        "patient": {
            "id": "2-1",
            "label": "CARTER,DAVID JR"
        },
        "reactant": "DOG DANDER",
        "gmr_allergy": {
            "id": "120_82-324",
            "label": "DOG DANDER",
            "sameAs": "vuid:4691020"
        },
        "allergy_type": "O",
        "origination_date_time": {
            "value": "2016-02-18T17:17:00Z",
            "type": "xsd:dateTime"
        },
        "originator": {
            "id": "200-55",
            "label": "ALEXANDER,ROBERT"
        },
        "observed_historical": "OBSERVED",
        "reactions": [
            {
                "reaction": {
                    "id": "120_83-1",
                    "label": "HIVES",
                    "sameAs": "vuid:4538560"
                },
                "entered_by": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                }
            }
        ],
        "chart_marked": [
            {
                "date_time": {
                    "value": "2016-02-18T17:20:13Z",
                    "type": "xsd:dateTime"
                },
                "user_entering": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                }
            }
        ],
        "originator_sign_off": true,
        "mechanism": "UNKNOWN",
        "verified": true,
        "verification_date_time": {
            "value": "2016-02-18T17:20:13Z",
            "type": "xsd:dateTime"
        },
        "comments": [
            {
                "date_time_comment_entered": {
                    "value": "2016-02-18T17:20:13Z",
                    "type": "xsd:dateTime"
                },
                "user_entering": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                },
                "comment_type": "OBSERVED",
                "comments": "say it myself "
            }
        ]
    }, 

    "vdmUpdate": {
        "entered_in_error": true,
        "date_time_entered_in_error": {
            "value": "2016-02-18T18:09:15Z",
            "type": "xsd:dateTime"
        },
        "user_entering_in_error": {
            "id": "200-55",
            "label": "ALEXANDER,ROBERT"
        },
        // interpret to mean add this new multiple, don't change existing one
        "comments": [
            {
                // if EIE - should be same as date_time_entered_in_error ie/ may be derived.
                "date_time_comment_entered": {
                    "value": "2016-02-18T18:09:26Z",
                    "type": "xsd:dateTime"
                },
                // same as "user_entered_in_error"
                "user_entering": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                },
                "comment_type": "ERRORED",
                "comments": "he likes dogs "
            }
        ]
    }
};

var observedTwo = {

    "vdmCreateResult": {

        "type": "Patient_Allergies-120_8",
        "patient": {
            "id": "2-1",
            "label": "CARTER,DAVID JR"
        },
        "reactant": "ACETAMINOPHEN/CODEINE",
        "gmr_allergy": {
            "id": "50_6-203",
            "label": "ACETAMINOPHEN_CODEINE",
            "sameAs": "vuid:4022128"
        },
        "drug_ingredients": [
            {
                "id": "50_416-15",
                "label": "ALCOHOL",
                "sameAs": "vuid:4017424"
            },
            {
                "id": "50_416-101",
                "label": "CODEINE",
                "sameAs": "vuid:4017509"
            },
            {
                "id": "50_416-105",
                "label": "ACETAMINOPHEN",
                "sameAs": "vuid:4017513"
            }
        ],
        "drug_classes": [
            {
                "id": "50_605-73",
                "label": "CN101",
                "sameAs": "vuid:4021583"
            }
        ],
        "allergy_type": "D",
        "origination_date_time": {
            "value": "2016-02-18T17:05:00Z",
            "type": "xsd:dateTime"
        },
        "originator": {
            "id": "200-55",
            "label": "ALEXANDER,ROBERT"
        },
        "observed_historical": "OBSERVED",
        // 120.85 needs date and [severity] too (but not here)
        "reactions": [
            {
                "reaction": {
                    "id": "120_83-51",
                    "label": "CHEST PAIN",
                    "sameAs": "vuid:4637029"
                },
                "entered_by": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                }
            },
            {
                "reaction": {
                    "id": "120_83-1",
                    "label": "HIVES",
                    "sameAs": "vuid:4538560"
                },
                "entered_by": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                }
            }
        ],
        "chart_marked": [
            {
                "date_time": {
                    "value": "2016-02-18T17:52:42Z",
                    "type": "xsd:dateTime"
                },
                "user_entering": { // can't set explicitly in RPC (DUZ) but can in VDM or derive in VDM
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                }
            }
        ],
        "originator_sign_off": true,
        "mechanism": "PHARMACOLOGIC",
        "verified": false, // as drug - can't see where CPRS changes this - pharmacist?
        "comments": [
            {
                "date_time_comment_entered": {
                    "value": "2016-02-18T17:52:42Z",
                    "type": "xsd:dateTime"
                },
                "user_entering": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                },
                "comment_type": "OBSERVED",
                "comments": "don't give the guy this med! "
            }
        ]
    }

};

var observedThree = {

    "vdmCreate":     {

        "type": "Patient_Allergies-120_8",
        "patient": {
            "id": "2-1",
            "label": "CARTER,DAVID JR"
        },
        "gmr_allergy": {
            "id": "120_82-3",
            "label": "CHOCOLATE",
            "sameAs": "vuid:4636681"
        },
        "allergy_type": "DF",
        "origination_date_time": {
            "value": "2016-02-18T17:59:00Z",
            "type": "xsd:dateTime"
        },
        "originator": {
            "id": "200-55",
            "label": "ALEXANDER,ROBERT"
        },
        "observed_historical": "OBSERVED",
        // note: CRPS doesn't fill in date (and entered_by comes from DUZ not explicit setting)
        "reactions": [
            {
                "reaction": {
                    "id": "120_83-1",
                    "label": "HIVES",
                    "sameAs": "vuid:4538560"
                }
            }
        ],
        // waiting for prod clone to fully spec this
        "chart_marked": [
            {
                "date_time": {
                    "value": "2016-02-18T18:00:29Z",
                    "type": "xsd:dateTime"
                },
                "user_entering": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                }
            }
        ],
        "mechanism": "ALLERGY",
        "verified": true,
        "verification_date_time": {
            "value": "2016-02-18T18:00:29Z",
            "type": "xsd:dateTime"
        },
        // ala CPRS - no verifier
        "comments": [
            {
                "date_time_comment_entered": {
                    "value": "2016-02-18T18:00:29Z",
                    "type": "xsd:dateTime"
                },
                "user_entering": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                },
                "comment_type": "OBSERVED",
                "comments": "unfortunate fellow\nbut mannerly!"
            }
        ]
    },

    "vdmCreateResult": {

        "type": "Patient_Allergies-120_8",
        "patient": {
            "id": "2-1",
            "label": "CARTER,DAVID JR"
        },
        "reactant": "CHOCOLATE",
        "gmr_allergy": {
            "id": "120_82-3",
            "label": "CHOCOLATE",
            "sameAs": "vuid:4636681"
        },
        "drug_ingredients": [
            {
                "id": "50_416-2014",
                "label": "CHOCOLATE FLAVORING",
                "sameAs": "vuid:4019401"
            }
        ],
        "allergy_type": "DF",
        "origination_date_time": {
            "value": "2016-02-18T17:59:00Z",
            "type": "xsd:dateTime"
        },
        "originator": {
            "id": "200-55",
            "label": "ALEXANDER,ROBERT"
        },
        "observed_historical": "OBSERVED",
        "reactions": [
            {
                "reaction": {
                    "id": "120_83-1",
                    "label": "HIVES",
                    "sameAs": "vuid:4538560"
                },
                "entered_by": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                }
            }
        ],
        "chart_marked": [
            {
                "date_time": {
                    "value": "2016-02-18T18:00:29Z",
                    "type": "xsd:dateTime"
                },
                "user_entering": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                }
            }
        ],
        "originator_sign_off": true,
        "mechanism": "ALLERGY",
        "verified": true,
        "verification_date_time": {
            "value": "2016-02-18T18:00:29Z",
            "type": "xsd:dateTime"
        },
        "comments": [
            {
                "date_time_comment_entered": {
                    "value": "2016-02-18T18:00:29Z",
                    "type": "xsd:dateTime"
                },
                "user_entering": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                },
                "comment_type": "OBSERVED",
                "comments": "unfortunate fellow\nbut mannerly!"
            }
        ]
    },

    "vdmCreateResult2": {

        "type": "Patient_Allergies-120_8",
        "patient": {
            "id": "2-1",
            "label": "CARTER,DAVID JR"
        },
        "reactant": "CHOCOLATE",
        "gmr_allergy": {
            "id": "120_82-3",
            "label": "CHOCOLATE",
            "sameAs": "vuid:4636681"
        },

        "drug_ingredients": [
            {
                "id": "50_416-2014",
                "label": "CHOCOLATE FLAVORING",
                "sameAs": "vuid:4019401"
            }
        ],
        "allergy_type": "DF",
        "origination_date_time": {
            "value": "2016-02-18T17:59:00Z",
            "type": "xsd:dateTime"
        },
        "originator": {
            "id": "200-55",
            "label": "ALEXANDER,ROBERT"
        },
        "observed_historical": "OBSERVED",
        // note: CRPS doesn't fill in date (and entered_by comes from DUZ not explicit setting)
        "reactions": [
            {
                "reaction": {
                    "id": "120_83-1",
                    "label": "HIVES",
                    "sameAs": "vuid:4538560"
                },
                "entered_by": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                }
            }
        ],
        "chart_marked": [
            {
                "date_time": {
                    "value": "2016-02-18T18:00:29Z",
                    "type": "xsd:dateTime"
                },
                "user_entering": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                }
            }
        ],
        "originator_sign_off": true,
        "mechanism": "ALLERGY",
        "verified": true,
        "verification_date_time": {
            "value": "2016-02-18T18:00:29Z",
            "type": "xsd:dateTime"
        },
        "comments": [
            {
                "date_time_comment_entered": {
                    "value": "2016-02-18T18:00:29Z",
                    "type": "xsd:dateTime"
                },
                "user_entering": {
                    "id": "200-55",
                    "label": "ALEXANDER,ROBERT"
                },
                "comment_type": "OBSERVED",
                "comments": "unfortunate fellow\nbut mannerly!"
            }
        ]
    },

    /* 

     VPR (XML): 
     - has severity value='MODERATE' ... JSON lacks this ... hence JLV uses XML
     - April 1st for comment as with RPC comment has today's date (can't set)

                <results version='1.05' timeZone='-0500' >
                        <reactions total='1' >
                        <allergy>
                        <comments>
                            <comment id='1' entered='3160401.001432' enteredBy='ALEXANDER,ROBERT' commentType='O' commentText='unfortunate fellow but mannerly! ' />
                        </comments>
                        <drugIngredients>
                            <drugIngredient name='CHOCOLATE FLAVORING' vuid='4019401' />
                        </drugIngredients>
                        <entered value='3160218.1759' />
                        <facility code='050' name='SOFTWARE SERVICE' />
                        <id value='8' />
                        <localCode value='3;GMRD(120.82,' />
                        <mechanism value='ALLERGY' />
                        <name value='CHOCOLATE' />
                        <reactions>
                            <reaction name='HIVES' vuid='4538560' />
                        </reactions>
                        <severity value='MODERATE' /> 
                        <source value='O' />
                        <type code='DF' name='DRUG, FOOD' />
                        <verified value='3160401.001432' />
                        <vuid value='4636681' />
                        </allergy>
                </reactions>
                </results>"
    */

    /*

     CPRS DETAIL GET (ORQQAL DETAIL) - used by JLV too to give report in a pop up (don't parse XML and make their own)

         Causative agent: PENICILLINS AND BETA-LACTAM ANTIMICROBIALS
         Nature of Reaction: Unknown
       
         Drug Classes: PENICILLINS AND BETA-LACTAM ANTIMICROBIALS
       
         Originator: ALEXANDER,ROBERT
         Originated: Feb 18, 2016@17:32
         Verified: <auto-verified>
         Observed/Historical: Historical

         Causative agent: CHOCOLATE
         Nature of Reaction: Allergy
 
         Signs/symptoms: HIVES <----- addition for Observed
 
         Originator: ALEXANDER,ROBERT
         Originated: Feb 18, 2016@17:59
         Obs dates/severity: MAR 01, 2016 MODERATE <------ addition for Observed from Allergy Report (120.85), not 120.8: not in VPR
 
         Verified: <auto-verified>
         Observed/Historical: Observed
 
         Comments:
             MAR 31, 2016@23:10:04 by ORIGINATOR
             unfortunate fellow but mannerly! 
     */
};

module.exports = {

    "historicals": { "one": historicalOne, "two": historicalTwo, "three": historicalThree, "four": historicalFour, "five": historicalFive },

    "observeds": {"one": observedOne, "two": observedTwo, "three": observedThree }
};

