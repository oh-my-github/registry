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
exports.insertTest = function(req, res){
  var insertRepository = new Repository({
    owner : 'njir123',
    repositoryName : 'ohmytest2',
    url : 'http://123.4.56.53.34',
    isPrivate : true,
    isForked : false,
    createdAt : '2015-09-06',
    updatedAt : '2015-10-23',
    pushedAt : '2015-12-32',
    stargazersCount : 1324,
    watchersCount : 25,
    forksCount : 49
  });

  var insertRepository2 = new Repository({
    owner : 'njir',
    repositoryName : 'ohmytest3',
    url : 'ohmytest2',
    isPrivate : true,
    isForked : false,
    createdAt : '2015-09-06',
    updatedAt : '2015-10-23',
    pushedAt : '2015-12-32',
    stargazersCount : 1134,
    watchersCount : 2454,
    forksCount : 4269
  });


  //insertRepository.save(function(err){
  //  if(err){ throw err; }
  //});
  //insertRepository2.save(function(err){
  //  if(err){ throw err; }
  //});

  var insertLanguages = new Languages({
    owner : 'njir',
    repositoryName : 'ohmytest2',
    languages : [
      {name : 'C', line : 12},
      {name : 'Java', line : 22},
      {name : 'CSharp', line : 2300},
    ]
  });

  var insertLanguages2 = new Languages({
    owner : 'njir',
    repositoryName : 'ohmytest3',
    languages : [
      {name : 'Java', line : 22},
      {name : 'JavaScript', line : 20000},
    ]
  });


  //insertLanguages.save(function(err){
  //  if(err){ throw err; }
  //});

  insertLanguages2.save(function(err){
    if(err){ throw err; }
  });

  res.send('success');
};











function handleError(res, err) {
  return res.status(500).send(err);
};
