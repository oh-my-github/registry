/// <reference path="../../../../typings/node/node.d.ts" />
'use strict';
var express = require('express');
var controller = require('./language.controller.js');
var router = express.Router();
router.get('/', controller.index);
router.get('/:repositoryName', controller.languages);
router.delete('/:repositoryName', controller.destroy);
module.exports = router;
//# sourceMappingURL=index.js.map