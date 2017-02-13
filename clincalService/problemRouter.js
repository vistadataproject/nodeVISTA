#!/usr/bin/env node

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status');
const logger = require('./logger.js');
const utils = require('./utils');
const clinicalService = require('./clinicalService');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'ProblemService', 'create', [req.body]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

router.put('/',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'ProblemService', 'update', [req.body]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

router.get('/:id',
    (req, res, next) => {
        clinicalService.callService(utils.toContext(req), 'ProblemService', 'describe', [req.params.id]).then((result) => {
            res.send(result);
        }).catch((err) => {
            next(err);
        });
    });

module.exports = router;
