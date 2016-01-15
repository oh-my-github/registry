/// <reference path="../../../../typings/node/node.d.ts" />

'use strict';

var mongoose = require('mongoose');
import crypto = require('crypto');
var Schema = mongoose.Schema;
var authTypes = ['github'];
var collectionName = 'user';

var UserSchema = new Schema({
  id: String,
  name: String,
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  salt: String,
  google: {},
  facebook: {},
  githubProfile: {}
});


UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });


// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate github id is already in use
UserSchema
  .path('githubProfile')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({github: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.github.id === user.github.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified github id is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

//UserSchema
//  .pre('save', function(next) {
//    if (!this.isNew) return next();
//
//    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
//      next(new Error('Invalid password'));
//    else
//      next();
//  });

UserSchema.methods = {

  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};
module.exports = mongoose.model('User', UserSchema, collectionName);
