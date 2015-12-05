'use strict';

var express = require('express');
var controller = require('./user.controller.js');
var config = require('../../../config/environment');
var auth = require('../../../auth/auth.service');

var router = express.Router();

// Added by Tak on 2015-09-28 to show user list
router.get('/', controller.list);

module.exports = router;
