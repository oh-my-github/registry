'use strict';

var passport = require('passport');
var config = require('../../../config/environment');
var jwt = require('jsonwebtoken');

var Repository = require('../../v1/repository/repository.model.js');
var User = require('../../v1/user/user.model.js');

// Get a User list
exports.list = function(req, res) {
  Repository.distinct("owner", function (err, users) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(users);
  });
};

