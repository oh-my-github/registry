'use strict';

var express = require('express');
var controller = require('./repository.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/starCount', controller.usersStarCount);
router.get('/starCount/:repoName', controller.repoStarCount);
router.get('/list', controller.list);


router.get('/:repoName', controller.showInfo);
router.delete('/:repoName', controller.destroy);

module.exports = router;
