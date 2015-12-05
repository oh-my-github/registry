'use strict';

var express = require('express');
var controller = require('./language.controller.js');

var router = express.Router();

// modified on 2015-12-05
router.get('/', controller.index);
router.get('/eachline', controller.eachline);

router.get('/:repositoryName', controller.languages);
router.delete('/:repositoryName', controller.destroy);

module.exports = router;
