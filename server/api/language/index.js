// Added by TAK on 2015-09-25
'use strict';

var express = require('express');
var controller = require('./language.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/:owner', controller.show);
router.post('/', controller.create);
//PUT 해당 자원의 전체를 교체, PATCH는 일부를 변경
router.put('/:owner', controller.update);
router.patch('/:owner', controller.update);
router.delete('/:owner', controller.destroy);

module.exports = router;
