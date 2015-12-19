'use strict';

var _ = require('lodash');
var Repository = require('../../v1/repository/repository.model.js');
var async = require('async');

function getOwner(baseUrl){
  var res = baseUrl.split('/');
  return res[3];
}

var getCollectAtTime = function(owner, callback){
  // Distinct + Sort Query
  Repository.aggregate([
    { $match : { owner : owner}},
    { $sort : { collectAt : 1}},
    { $group : { _id : "$collectAt"}}
  ], function(err, results){
    if(err){
      console.log(err);
      return;
    }
    callback(null, owner, results);
  });
};

var distinctByDay = function(owner, dates, callback){
  var prevDate, prevYear;
  var output = new Array();
  console.log('distinct dates : ', dates);
  dates.forEach(function(date){
    if((prevDate == date._id.getDate()) && (prevYear == date._id.getYear())){
      return;
    }
    prevYear = date._id.getYear();
    prevDate = date._id.getDate();
    output.push(date._id);
  });
  callback(null, owner, output);
};

var getStarCount = function(owner, dates, callback){
  var output = new Array();
  var prevName;
  var forkSum=0 , starSum=0, watchSum=0;
  var result;

  async.each(dates,
    function(date, callbackNextEach){
      Repository.find({owner : owner, collectAt : date}).sort({"name": 1}).exec(function (err, repositories) {
        repositories.forEach(function(currRepo){
          if(prevName == currRepo.name){
            return ;
          }
          prevName = currRepo.name;
          forkSum += currRepo.forksCount;
          starSum += currRepo.stargazersCount;
          watchSum += currRepo.watchersCount;
        });
        result = {
          'owner' : owner,
          'collectAt' : date,
          'forksCount' : forkSum,
          'stargazersCount' : starSum,
          'watchersCount': watchSum
        };
        output.push(result);
        forkSum = 0, starSum = 0, watchSum = 0, prevName = 0;
        callbackNextEach();
      });
    },
    function(err){
      if(err) {
        console.log(err);
        callback(null, err);
      }
      callback(null, output);
    }
  );
};

exports.starCountByDay = function(req, res){
  async.waterfall([
      //get owner name func
      function(callback){
        var res = req.baseUrl.split('/');
        callback(null, res[3]);
      },
      getCollectAtTime,
      distinctByDay,
      getStarCount
    ],
    function(err, results){
      if(err) { return handleError(res, err); }
      return res.status(200).json(results);
    }
  );
};


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
  var prevName;
  var forkSum=0 , starSum=0, watchSum=0;
  var reqOwner = getOwner(req.baseUrl);

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
      'watchersCount': watchSum
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
