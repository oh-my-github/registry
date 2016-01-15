/// <reference path="../../../typings/node/node.d.ts" />
'use strict';
var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var router = express.Router();
router
    .get('/', passport.authenticate('github', {
    failureRedirect: '/signup',
    scope: [
        'user:email'
    ],
    session: false
}))
    .get('/callback', passport.authenticate('github', {
    failureRedirect: '/signup',
    session: false
}), auth.setTokenCookie);
module.exports = router;
