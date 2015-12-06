'use strict';

var _ = require('lodash');
var Repository = require('../../v1/repository/repository.model.js');

function getOwner(baseUrl){
  var res = baseUrl.split('/');
  return res[3];
}

exports.index = function(req, res) {
  var prevName;
  var output = new Array();
  Repository.find({owner : getOwner(req.baseUrl)}).sort({"name": 1, "collectAt": -1}).exec(function (err, repositories) {
    repositories.forEach(function(currRepo){
      if(prevName == currRepo.name){
        return ;
      }
      prevName = currRepo.name;
      output.push(currRepo);
    });

    if(err) { return handleError(res, err); }
    return res.status(200).json(output);
  });
};

exports.usersStarCount = function(req, res) {
  var Moment = require('moment');
  var prevName;
  var forkSum=0 , starSum=0, watchSum=0;
  var reqOwner = getOwner(req.baseUrl);

/*
 var today = Moment().startOf('day'),
 tomorrow = Moment(today).add(100, 'days'),
 yesterday = Moment(today).subtract(100, 'days');

  Repository.find({
    collectAt: {$gte: yesterday.toDate(), $lt: tomorrow.toDate() }
  }).sort({"name": 1, "collectAt": -1}).exec(function (err, repositories) {
*/

  Repository.find({owner : reqOwner}).sort({"name": 1, "collectAt": -1}).exec(function (err, repositories) {
    repositories.forEach(function(currRepo){
      if(prevName == currRepo.name){
        return ;
      }
      prevName = currRepo.name;
      forkSum += currRepo.forksCount;
      starSum += currRepo.stargazersCount;
      watchSum += currRepo.watchersCount;
    });
    var result = {
      'owner' : reqOwner,
      'forksCount' : forkSum,
      'stargazersCount' : starSum,
      'watchersCount': watchSum,
      //"date" : Moment().format()
    };

    if(err) { return handleError(res, err); }
    return res.status(200).json(result);
  });
};


exports.repoStarCount = function(req, res) {
  var prevName;
  var fork=0 , star=0, watch=0;
  var reqOwner = getOwner(req.baseUrl);

  Repository.find({owner : reqOwner, name: req.params.repoName}).sort({"name": 1, "collectAt": -1}).exec(function (err, repositories) {
    repositories.forEach(function(currRepo){
      if(prevName == currRepo.name){
        return ;
      }
      prevName = currRepo.name;
      fork += currRepo.forksCount;
      star += currRepo.stargazersCount;
      watch += currRepo.watchersCount;
    });
     var result = {
      'owner' : reqOwner,
      'repository' : req.params.repoName,
      'forksCount' : fork,
      'stargazersCount' : star,
      'watchersCount': watch,
    };

    if(err) { return handleError(res, err); }
    return res.status(200).json(result);
  });
};


exports.list = function(req, res) {
  var prevName;
  var output = new Array();
  Repository.find({owner : getOwner(req.baseUrl)}).sort({"name": 1, "collectAt": -1}).exec(function (err, repositories) {
    repositories.forEach(function(currRepo){
      if(prevName == currRepo.name){
        return ;
      }
      prevName = currRepo.name;
      output.push(prevName);
    });

    if(err) { return handleError(res, err); }
    return res.status(200).json(output);
  });
};

exports.showInfo = function(req, res) {
  Repository.findOne({owner : getOwner(req.baseUrl), name : req.params.repoName}).sort({"collectAt": -1}).exec(function (err, object) {
    if(err) { return handleError(res, err); }
    if(!object) { return res.status(404).send('Not Found'); }
    return res.status(200).json(object);
  });
};




// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Repository.find({
    owner: getOwner(req.baseUrl),
    name: req.params.repoName
  }).sort({"collectAt": -1}).exec(function (err, repositories) {
    if (err) {
      return handleError(res, err);
    }
    if (!repositories) {
      return res.status(404).send('Not Found');
    }
    repositories.forEach(function (currRepo) {
      currRepo.remove(function (err) {
        if (err) {
          return handleError(res, err);
        }
        return res.status(204).send('No Content');
      });
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
};
