#!/usr/bin/env node

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status');
const logger = require('./logger.js');
const clinicalService = require('./clinicalService');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


router.get('/:id',
    (req, res) => {
        logger.debug(`Calling problem describe. req.context: ${JSON.stringify(req.context, null, 2)}`);
        clinicalService.callService(req.auth.context, 'ProblemService', 'describe', [req.params.id]).then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    });


module.exports = router;
