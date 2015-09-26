// Added by TAK on 2015-09-25
'use strict';

var express = require('express');
var controller = require('./repository.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:owner', controller.show);
router.post('/', controller.create);
router.put('/:owner', controller.update);
router.patch('/:owner', controller.update);
router.delete('/:owner', controller.destroy);

module.exports = router;
