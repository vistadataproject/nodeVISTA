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


router.get('/:id',
    (req, res) => {
        clinicalService.callService(utils.toContext(req), 'ProblemService', 'describe', [req.params.id]).then((result) => {
            res.send(result);
        }).catch((err) => {
            throw err;
        });
    });

module.exports = router;
