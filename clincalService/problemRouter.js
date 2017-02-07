#!/usr/bin/env node

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger.js');
const clinicalService = require('./clinicalService');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/:id', (req, res) => {
    res.send(clinicalService.getProblemService().describe(req.params.id));
});


module.exports = router;
