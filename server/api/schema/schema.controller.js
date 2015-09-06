'use strict';

var _ = require('lodash');
var Languages = require('./schema.model.languages');
var Repository = require('./schema.model.repository');

// get list languages
exports.languages = function(req, res) {
  Languages.find().select().exec(function (err, LanguagesSelect) {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log('languages : ', LanguagesSelect);
    res.send(LanguagesSelect);
  });
};

// get list repository
exports.repository = function(req, res) {
  Repository.find().select().exec(function (err, RepositorySelect) {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log('repository : ', RepositorySelect);
    res.send(RepositorySelect);
  });
};

// insert db for test
exports.insert = function(req, res){
  var insertRepository = new Repository({
    owner : 'hyungtak',
    repositoryName : 'HT_repository',
    url : 'http://123.4.56.53.34',
    isPrivate : true,
    isForked : false,
    createdAt : '2015-09-06',
    updatedAt : '2015-10-23',
    pushedAt : '2015-12-32',
    stargazersCount : 134,
    watchersCount : 245,
    forksCount : 469
  });

  insertRepository.save(function(err){
    if(err){
      console.error(err);
      throw err;
    }
  });

  var insertLanguages = new Languages({
    owner : 'JHT',
    repositoryName : 'ohmytest',
    languages : [
      {name : 'C', line : 1204},
      {name : 'Java', line : 2222},
      {name : 'Python', line : 345}
    ]
  });
  insertLanguages.save(function(err){
    if(err){
      console.error(err);
      throw err;
    }
  });
  res.send('success');
};


function handleError(res, err) {
  return res.status(500).send(err);
};
