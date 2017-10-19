#!/usr/bin/env node

'use strict';

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status');
const logger = require('./logger.js');
const config = require('./config/config');
const utils = require('./utils');
const InvalidParametersError = require('./errors/invalidParametersError');
const clinicalService = require('./clinicalService');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


function validateExamId(examId) {
    let paramErr;
    if (!examId) {
        paramErr = 'Invalid parameter - missing id';
    } else if (!/9000010_13-\d+/g.test(examId)) {
        paramErr = 'Invalid parameter - id must be in the form of 9000010_13-{IEN}';
    }

    return paramErr;
}


function validateSkinId(skinId) {
    let paramErr;
    if (!skinId) {
        paramErr = 'Invalid parameter - missing id';
    } else if (!/9000010_12-\d+/g.test(skinId)) {
        paramErr = 'Invalid parameter - id must be in the form of 9000010_12-{IEN}';
    }

    return paramErr;
}

function validatePovId(povId) {
    let paramErr;
    if (!povId) {
        paramErr = 'Invalid parameter - missing id';
    } else if (!/9000010_07-\d+/g.test(povId)) {
        paramErr = 'Invalid parameter - id must be in the form of 9000010_07-{IEN}';
    }

    return paramErr;
}


function validatePatientEdId(pEdId) {
    let paramErr;
    if (!pEdId) {
        paramErr = 'Invalid parameter - missing id';
    } else if (!/9000010_16-\d+/g.test(pEdId)) {
        paramErr = 'Invalid parameter - id must be in the form of 9000010_16-{IEN}';
    }

    return paramErr;
}


function validateHealthFactorId(hfId) {
    let paramErr;
    if (!hfId) {
        paramErr = 'Invalid parameter - missing id';
    } else if (!/9000010_23-\d+/g.test(hfId)) {
        paramErr = 'Invalid parameter - id must be in the form of 9000010_23-{IEN}';
    }

    return paramErr;
}


function validateCptId(cptId) {
    let paramErr;
    if (!cptId) {
        paramErr = 'Invalid parameter - missing id';
    } else if (!/9000010_18-\d+/g.test(cptId)) {
        paramErr = 'Invalid parameter - id must be in the form of 9000010_18-{IEN}';
    }

    return paramErr;
}

function validateImmunizationId(immId) {
    let paramErr;
    if (!immId) {
        paramErr = 'Invalid parameter - missing id';
    } else if (!/9000010_11-\d+/g.test(immId)) {
        paramErr = 'Invalid parameter - id must be in the form of 9000010_11-{IEN}';
    }

    return paramErr;
}


/**
 * /exam
 *  POST:
 *      Creates a new exam.
 *      produces: application/json
 *      parameters:
 *          @param {String} args.diagnosis Diagnosis identifier.
 *          @param {Array=} args.comments Problem comments.
 *
 *      responses:
 *          201: new created exam
 *          400: invalid parameters produce a bad request
 */
router.post('/exam',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'pceExamService', 'create', [req.body]).then((result) => {
            res.status(HttpStatus.CREATED).send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /exam
 *  PUT:
 *      Updates an existing exam.
 *      produces: application/json
 *      parameters:
 *          @param {Object} args Update exam arguments.
 *          @param {String} args.id Exam identifier.
 *          @param {String} args.comments.comment.text Comment text. *
 *      responses:
 *          200: an updated exam
 *          400: invalid parameters produce a bad request
 */
router.put('/exam',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'pceExamService', 'update', [req.body]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /pce/exam:id
 *  GET:
 *      Retrieves a PCE Exam description
 *      produces: application/json
 *      parameters:
 *          @param {String} id exam identifier.
 *
 *      responses:
 *          200: Exam description
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */

router.get('/exam/:id',
    (req, res, next) => {
        const itemId = req.params.id;

        const paramErr = validateExamId(itemId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceExamService', 'describe', [itemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /exam
 *  GET:
 *      Retrieves a list of all exams associated with a patient
 *      produces: application/json
 *      parameters:
 *           @param {String=} filter PCE Exam list status filter. Possible values: TBD. Defaults to all.
 *
 *      responses:
 *          200: List of all exams associated with a patient
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.get('/exam',
    (req, res, next) => {
        const filter = req.query ? req.query.filter : undefined;

        if (filter && !/^(active|inactive|both|removed)$/g.test(filter)) {
            next(new InvalidParametersError('Invalid parameter - possible filter values are active, inactive, both, or removed'));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceExamService', 'list', [filter]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });



/**
 * /exam/remove
 *  PUT:
 *      Removes a exam (sets condition to HIDDEN).
 *      produces: application/json
 *      parameters:
 *           @param {String} id Exam identifier.
 *
 *      responses:
 *          200: Removed exam.
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.put('/exam/remove',
    (req, res, next) => {
        const problemId = req.body.id;

        const paramErr = validateProblemId(problemId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceExamService', 'remove', [problemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });




/**
 * /cpt
 *  POST:
 *      Creates a new cpt.
 *      produces: application/json
 *      parameters:
 *          @param {String} args.diagnosis Diagnosis identifier.
 *          @param {Array=} args.comments Problem comments.
 *
 *      responses:
 *          201: new created cpt
 *          400: invalid parameters produce a bad request
 */
router.post('/cpt',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'pceCptService', 'create', [req.body]).then((result) => {
            res.status(HttpStatus.CREATED).send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /cpt
 *  PUT:
 *      Updates an existing cpt.
 *      produces: application/json
 *      parameters:
 *          @param {Object} args Update cpt arguments.
 *          @param {String} args.id Cpt identifier.
 *          @param {String} args.comments.comment.text Comment text. *
 *      responses:
 *          200: an updated cpt
 *          400: invalid parameters produce a bad request
 */
router.put('/cpt',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'pceCptService', 'update', [req.body]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /pce/cpt:id
 *  GET:
 *      Retrieves a PCE Cpt description
 *      produces: application/json
 *      parameters:
 *          @param {String} id cpt identifier.
 *
 *      responses:
 *          200: Cpt description
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */

router.get('/cpt/:id',
    (req, res, next) => {
        const itemId = req.params.id;

        const paramErr = validateCptId(itemId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceCptService', 'describe', [itemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /cpt
 *  GET:
 *      Retrieves a list of all cpts associated with a patient
 *      produces: application/json
 *      parameters:
 *           @param {String=} filter PCE Cpt list status filter. Possible values: TBD. Defaults to all.
 *
 *      responses:
 *          200: List of all cpts associated with a patient
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.get('/cpt',
    (req, res, next) => {
        const filter = req.query ? req.query.filter : undefined;

        if (filter && !/^(active|inactive|both|removed)$/g.test(filter)) {
            next(new InvalidParametersError('Invalid parameter - possible filter values are active, inactive, both, or removed'));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceCptService', 'list', [filter]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });



/**
 * /cpt/remove
 *  PUT:
 *      Removes a cpt (sets condition to HIDDEN).
 *      produces: application/json
 *      parameters:
 *           @param {String} id Cpt identifier.
 *
 *      responses:
 *          200: Removed cpt.
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.put('/cpt/remove',
    (req, res, next) => {
        const problemId = req.body.id;

        const paramErr = validateProblemId(problemId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceCptService', 'remove', [problemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /skin
 *  POST:
 *      Creates a new skin.
 *      produces: application/json
 *      parameters:
 *          @param {String} args.diagnosis Diagnosis identifier.
 *          @param {Array=} args.comments Problem comments.
 *
 *      responses:
 *          201: new created skin
 *          400: invalid parameters produce a bad request
 */
router.post('/skin',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'pceSkinService', 'create', [req.body]).then((result) => {
            res.status(HttpStatus.CREATED).send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /skin
 *  PUT:
 *      Updates an existing skin.
 *      produces: application/json
 *      parameters:
 *          @param {Object} args Update skin arguments.
 *          @param {String} args.id skin identifier.
 *          @param {String} args.comments.comment.text Comment text. *
 *      responses:
 *          200: an updated skin
 *          400: invalid parameters produce a bad request
 */
router.put('/skin',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'pceSkinService', 'update', [req.body]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /pce/skin:id
 *  GET:
 *      Retrieves a PCE skin description
 *      produces: application/json
 *      parameters:
 *          @param {String} id skin identifier.
 *
 *      responses:
 *          200: skin description
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */

router.get('/skin/:id',
    (req, res, next) => {
        const itemId = req.params.id;

        const paramErr = validateSkinId(itemId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceSkinService', 'describe', [itemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /skin
 *  GET:
 *      Retrieves a list of all skins associated with a patient
 *      produces: application/json
 *      parameters:
 *           @param {String=} filter PCE skin list status filter. Possible values: TBD. Defaults to all.
 *
 *      responses:
 *          200: List of all skins associated with a patient
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.get('/skin',
    (req, res, next) => {
        const filter = req.query ? req.query.filter : undefined;

        if (filter && !/^(active|inactive|both|removed)$/g.test(filter)) {
            next(new InvalidParametersError('Invalid parameter - possible filter values are active, inactive, both, or removed'));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceSkinService', 'list', [filter]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });



/**
 * /skin/remove
 *  PUT:
 *      Removes a skin (sets condition to HIDDEN).
 *      produces: application/json
 *      parameters:
 *           @param {String} id skin identifier.
 *
 *      responses:
 *          200: Removed skin.
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.put('/skin/remove',
    (req, res, next) => {
        const problemId = req.body.id;

        const paramErr = validateProblemId(problemId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceSkinService', 'remove', [problemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /patientEd
 *  POST:
 *      Creates a new patientEd.
 *      produces: application/json
 *      parameters:
 *          @param {String} args.diagnosis Diagnosis identifier.
 *          @param {Array=} args.comments Problem comments.
 *
 *      responses:
 *          201: new created patientEd
 *          400: invalid parameters produce a bad request
 */
router.post('/patientEd',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'pcePatientEdService', 'create', [req.body]).then((result) => {
            res.status(HttpStatus.CREATED).send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /patientEd
 *  PUT:
 *      Updates an existing patientEd.
 *      produces: application/json
 *      parameters:
 *          @param {Object} args Update patientEd arguments.
 *          @param {String} args.id patientEd identifier.
 *          @param {String} args.comments.comment.text Comment text. *
 *      responses:
 *          200: an updated patientEd
 *          400: invalid parameters produce a bad request
 */
router.put('/patientEd',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'pcePatientEdService', 'update', [req.body]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /pce/patientEd:id
 *  GET:
 *      Retrieves a PCE patientEd description
 *      produces: application/json
 *      parameters:
 *          @param {String} id patientEd identifier.
 *
 *      responses:
 *          200: patientEd description
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */

router.get('/patientEd/:id',
    (req, res, next) => {
        const itemId = req.params.id;

        const paramErr = validatePatientEdId(itemId);
        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }
        clinicalService.callService(utils.toContext(req), 'pcePatientEdService', 'describe', [itemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /patientEd
 *  GET:
 *      Retrieves a list of all patientEds associated with a patient
 *      produces: application/json
 *      parameters:
 *           @param {String=} filter PCE patientEd list status filter. Possible values: TBD. Defaults to all.
 *
 *      responses:
 *          200: List of all patientEds associated with a patient
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.get('/patientEd',
    (req, res, next) => {
        const filter = req.query ? req.query.filter : undefined;

        if (filter && !/^(active|inactive|both|removed)$/g.test(filter)) {
            next(new InvalidParametersError('Invalid parameter - possible filter values are active, inactive, both, or removed'));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pcePatientEdService', 'list', [filter]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });



/**
 * /patientEd/remove
 *  PUT:
 *      Removes a patientEd (sets condition to HIDDEN).
 *      produces: application/json
 *      parameters:
 *           @param {String} id patientEd identifier.
 *
 *      responses:
 *          200: Removed patientEd.
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.put('/patientEd/remove',
    (req, res, next) => {
        const problemId = req.body.id;

        const paramErr = validateProblemId(problemId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pcePatientEdService', 'remove', [problemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /immunization
 *  POST:
 *      Creates a new immunization.
 *      produces: application/json
 *      parameters:
 *          @param {String} args.diagnosis Diagnosis identifier.
 *          @param {Array=} args.comments Problem comments.
 *
 *      responses:
 *          201: new created immunization
 *          400: invalid parameters produce a bad request
 */
router.post('/immunization',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'pceImmunizationService', 'create', [req.body]).then((result) => {
            res.status(HttpStatus.CREATED).send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /immunization
 *  PUT:
 *      Updates an existing immunization.
 *      produces: application/json
 *      parameters:
 *          @param {Object} args Update immunization arguments.
 *          @param {String} args.id immunization identifier.
 *          @param {String} args.comments.comment.text Comment text. *
 *      responses:
 *          200: an updated immunization
 *          400: invalid parameters produce a bad request
 */
router.put('/immunization',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'pceImmunizationService', 'update', [req.body]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /pce/immunization:id
 *  GET:
 *      Retrieves a PCE immunization description
 *      produces: application/json
 *      parameters:
 *          @param {String} id immunization identifier.
 *
 *      responses:
 *          200: immunization description
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */

router.get('/immunization/:id',
    (req, res, next) => {
        const itemId = req.params.id;

        const paramErr = validateImmunizationId(itemId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceImmunizationService', 'describe', [itemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /immunization
 *  GET:
 *      Retrieves a list of all immunizations associated with a patient
 *      produces: application/json
 *      parameters:
 *           @param {String=} filter PCE immunization list status filter. Possible values: TBD. Defaults to all.
 *
 *      responses:
 *          200: List of all immunizations associated with a patient
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.get('/immunization',
    (req, res, next) => {
        const filter = req.query ? req.query.filter : undefined;

        if (filter && !/^(active|inactive|both|removed)$/g.test(filter)) {
            next(new InvalidParametersError('Invalid parameter - possible filter values are active, inactive, both, or removed'));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceImmunizationService', 'list', [filter]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /immunization/remove
 *  PUT:
 *      Removes a immunization (sets condition to HIDDEN).
 *      produces: application/json
 *      parameters:
 *           @param {String} id immunization identifier.
 *
 *      responses:
 *          200: Removed immunization.
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.put('/immunization/remove',
    (req, res, next) => {
        const problemId = req.body.id;

        const paramErr = validateProblemId(problemId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceImmunizationService', 'remove', [problemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });



/**
 * /healthFactor
 *  POST:
 *      Creates a new healthFactor.
 *      produces: application/json
 *      parameters:
 *          @param {String} args.diagnosis Diagnosis identifier.
 *          @param {Array=} args.comments Problem comments.
 *
 *      responses:
 *          201: new created healthFactor
 *          400: invalid parameters produce a bad request
 */
router.post('/healthFactor',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'pceHealthFactorService', 'create', [req.body]).then((result) => {
            res.status(HttpStatus.CREATED).send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /healthFactor
 *  PUT:
 *      Updates an existing healthFactor.
 *      produces: application/json
 *      parameters:
 *          @param {Object} args Update healthFactor arguments.
 *          @param {String} args.id healthFactor identifier.
 *          @param {String} args.comments.comment.text Comment text. *
 *      responses:
 *          200: an updated healthFactor
 *          400: invalid parameters produce a bad request
 */
router.put('/healthFactor',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'pceHealthFactorService', 'update', [req.body]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /pce/healthFactor:id
 *  GET:
 *      Retrieves a PCE healthFactor description
 *      produces: application/json
 *      parameters:
 *          @param {String} id healthFactor identifier.
 *
 *      responses:
 *          200: healthFactor description
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */

router.get('/healthFactor/:id',
    (req, res, next) => {
        const itemId = req.params.id;

        const paramErr = validateHealthFactorId(itemId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceHealthFactorService', 'describe', [itemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /healthFactor
 *  GET:
 *      Retrieves a list of all healthFactors associated with a patient
 *      produces: application/json
 *      parameters:
 *           @param {String=} filter PCE healthFactor list status filter. Possible values: TBD. Defaults to all.
 *
 *      responses:
 *          200: List of all healthFactors associated with a patient
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.get('/healthFactor',
    (req, res, next) => {
        const filter = req.query ? req.query.filter : undefined;

        if (filter && !/^(active|inactive|both|removed)$/g.test(filter)) {
            next(new InvalidParametersError('Invalid parameter - possible filter values are active, inactive, both, or removed'));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceHealthFactorService', 'list', [filter]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });



/**
 * /healthFactor/remove
 *  PUT:
 *      Removes a healthFactor (sets condition to HIDDEN).
 *      produces: application/json
 *      parameters:
 *           @param {String} id healthFactor identifier.
 *
 *      responses:
 *          200: Removed healthFactor.
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.put('/healthFactor/remove',
    (req, res, next) => {
        const problemId = req.body.id;

        const paramErr = validateProblemId(problemId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceHealthFactorService', 'remove', [problemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /pov
 *  POST:
 *      Creates a new pov.
 *      produces: application/json
 *      parameters:
 *          @param {String} args.diagnosis Diagnosis identifier.
 *          @param {Array=} args.comments Problem comments.
 *
 *      responses:
 *          201: new created pov
 *          400: invalid parameters produce a bad request
 */
router.post('/pov',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'pceDiagnosisService', 'create', [req.body]).then((result) => {
            res.status(HttpStatus.CREATED).send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /pov
 *  PUT:
 *      Updates an existing pov.
 *      produces: application/json
 *      parameters:
 *          @param {Object} args Update pov arguments.
 *          @param {String} args.id pov identifier.
 *          @param {String} args.comments.comment.text Comment text. *
 *      responses:
 *          200: an updated pov
 *          400: invalid parameters produce a bad request
 */
router.put('/pov',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'pceDiagnosisService', 'update', [req.body]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

/**
 * /pce/pov:id
 *  GET:
 *      Retrieves a PCE pov description
 *      produces: application/json
 *      parameters:
 *          @param {String} id pov identifier.
 *
 *      responses:
 *          200: pov description
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */

router.get('/pov/:id',
    (req, res, next) => {
        const itemId = req.params.id;

        const paramErr = validatePovId(itemId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceDiagnosisService', 'describe', [itemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });


/**
 * /pov
 *  GET:
 *      Retrieves a list of all povs associated with a patient
 *      produces: application/json
 *      parameters:
 *           @param {String=} filter PCE pov list status filter. Possible values: TBD. Defaults to all.
 *
 *      responses:
 *          200: List of all povs associated with a patient
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.get('/pov',
    (req, res, next) => {
        const filter = req.query ? req.query.filter : undefined;

        if (filter && !/^(active|inactive|both|removed)$/g.test(filter)) {
            next(new InvalidParametersError('Invalid parameter - possible filter values are active, inactive, both, or removed'));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceDiagnosisService', 'list', [filter]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });



/**
 * /pov/remove
 *  PUT:
 *      Removes a pov (sets condition to HIDDEN).
 *      produces: application/json
 *      parameters:
 *           @param {String} id pov identifier.
 *
 *      responses:
 *          200: Removed pov.
 *          400: invalid parameters produce a bad request
 *          404: Resource not found
 */
router.put('/pov/remove',
    (req, res, next) => {
        const problemId = req.body.id;

        const paramErr = validateProblemId(problemId);

        if (paramErr) {
            next(new InvalidParametersError(paramErr));
            return;
        }

        clinicalService.callService(utils.toContext(req), 'pceDiagnosisService', 'remove', [problemId]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });


module.exports = router;
