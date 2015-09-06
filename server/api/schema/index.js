/**
 * Created by tak on 15. 8. 29.
 */
'use strict';
var express = require('express');
var controller = require('./schema.controller')

var router = express.Router();

//router.get('/', controller.index);
router.get('/select/languages', controller.languages);
router.get('/select/repository', controller.repository);
router.get('/insert', controller.insert);

module.exports = router;
