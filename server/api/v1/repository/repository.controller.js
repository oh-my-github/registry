// Added by TAK on 2015-09-25
'use strict';

var _ = require('lodash');
var Repository = require('./repository.model.js');
var Moment = require('moment');




exports.usersStarCount = function(req, res) {
  var prevName;
  var output = new Array();
  var forkSum=0 , starSum=0, watchSum=0;

/*
 var today = Moment().startOf('day'),
 tomorrow = Moment(today).add(100, 'days'),
 yesterday = Moment(today).subtract(100, 'days');

  Repository.find({
    collectedAt: {$gte: yesterday.toDate(), $lt: tomorrow.toDate() }
  }).sort({"name": 1, "collectedAt": -1}).exec(function (err, repositories) {
*/

  Repository.find({}).sort({"name": 1, "collectedAt": -1}).exec(function (err, repositories) {
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
      "owner" : req.params.owner,
      "forksCount" : forkSum,
      "stargazersCount" : starSum,
      "watchersCount": watchSum,
      //"date" : Moment().format()
    };

    if(err) { return handleError(res, err); }
    return res.status(200).json(result);
  });
};



exports.index = function(req, res) {
  var prevName;
  var output = new Array();
  Repository.find({}).sort({"name": 1, "collectedAt": -1}).exec(function (err, repositories) {
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


// Get a single repository
exports.show = function(req, res) {
  var prevName;
  var output = new Array();
  Repository.find({owner: req.params.owner}).sort({"name": 1, "collectedAt": -1}).exec(function (err, repositories) {
    repositories.forEach(function(currRepo){
      if(prevName == currRepo.name){
        return ;
      }
      prevName = currRepo.name;
      //output.push(currRepo);
      output.push(prevName);

    });

    if(err) { return handleError(res, err); }
    return res.status(200).json(output);
  });
};

// Creates a new repository in the DB.
exports.create = function(req, res) {
  Repository.create(req.body, function(err, repository) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(repository);
  });
};

// Updates an existing repository in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Repository.findOne({ owner : req.params.owner }, function (err, repository) {
    if (err) { return handleError(res, err); }
    if(!repository) { return res.status(404).send('Not Found'); }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(repository);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Repository.findOne({ owner : req.params.owner } , function (err, repository) {
    if(err) { return handleError(res, err); }
    if(!repository) { return res.status(404).send('Not Found'); }
    repository.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
