/// <reference path="../../../../typings/node/node.d.ts" />

'use strict';

var express = require('express');
var controller = require('./user.controller.js');
var config = require('../../../config/environment');
var auth = require('../../../auth/auth.service');

var router = express.Router();

// Added by Tak on 2015-09-28 to show user list
router.get('/', controller.list);
//router.get('/', controller.index);




// To be deleted by tak on 2015-01-15
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);


module.exports = router;
