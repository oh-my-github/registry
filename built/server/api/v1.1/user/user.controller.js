/// <reference path="../../../../typings/node/node.d.ts" />
'use strict';
var passport = require('passport');
var config = require('../../../config/environment');
var jwt = require('jsonwebtoken');
var Module = require('../Func');
var Repository = require('../repository/repository.model.js');
// Get a User list
exports.list = function (req, res) {
    Repository.distinct("owner", function (err, users) {
        if (err) {
            return Module.handleError(res, err);
        }
        return res.status(200).json(users);
    });
};
var validationError = function (res, err) {
    return res.status(422).json(err);
};
/**
 * Authentication callback
 */
exports.authCallback = function (req, res, next) {
    res.redirect('/');
};
var User = require('./user.model.js');
exports.index = function (req, res) {
    User.find({}, '-salt -hashedPassword', function (err, users) {
        if (err)
            return res.status(500).send(err);
        res.status(200).json(users);
    });
};
exports.create = function (req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function (err, user) {
        if (err)
            return validationError(res, err);
        var token = jwt.sign({ _id: user._id }, config.secrets.session, { expiresInMinutes: 60 * 5 });
        res.json({ token: token });
    });
};
exports.show = function (req, res, next) {
    var userId = req.params.id;
    User.findById(userId, function (err, user) {
        if (err)
            return next(err);
        if (!user)
            return res.status(401).send('Unauthorized');
        res.json(user.profile);
    });
};
exports.destroy = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err)
            return res.status(500).send(err);
        return res.status(204).send('No Content');
    });
};
exports.changePassword = function (req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);
    User.findById(userId, function (err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function (err) {
                if (err)
                    return validationError(res, err);
                res.status(200).send('OK');
            });
        }
        else {
            res.status(403).send('Forbidden');
        }
    });
};
exports.me = function (req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function (err, user) {
        if (err)
            return next(err);
        if (!user)
            return res.status(401).send('Unauthorized');
        res.json(user);
    });
};
