/// <reference path="../../typings/node/node.d.ts" />
'use strict';
var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/v1.1/user/user.model');
// Passport Configuration
require('./github/passport').setup(User, config);
var router = express.Router();
router.use('/github', require('./github'));
module.exports = router;
//# sourceMappingURL=index.js.map