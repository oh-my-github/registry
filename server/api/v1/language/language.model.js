// Added by TAK on 2015-09-25
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LanguagesSchema = new Schema({
  collectAt : Date,
  owner : String,
  repositoryName : String,
  languages : [
    { name : String,
      line : Number
    }
  ]
});

module.exports = mongoose.model('Language', LanguagesSchema, 'language');
