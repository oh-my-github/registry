'use strict';

var express = require('express');
var controller = require('./repository.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/starCount', controller.starCount);
router.get('/starCount/timeline', controller.starCountTimeline);
router.get('/:repoName', controller.showRepoInfo);
router.delete('/:repoName', controller.destroy);

module.exports = router;
