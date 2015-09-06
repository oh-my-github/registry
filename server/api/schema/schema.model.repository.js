'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RepositorySchema = new Schema({
  owner : String,
  repositoryName : String,
  url : String,
  isPrivate : Boolean,
  isForked : Boolean,
  createdAt : String,
  updatedAt : String,
  pushedAt : String,
  stargazersCount : Number,
  watchersCount : Number,
  forksCount : Number
});

module.exports = mongoose.model('Repository', RepositorySchema);

