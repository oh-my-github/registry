// Added by TAK on 2015-09-25
'use strict';

var _ = require('lodash');
var Repository = require('./repository.model.js');

//// Get list of things
//exports.index2 = function(req, res) {
//  Repository.find(function (err, repos) {
//    if(err) {
//      console.log("asdsa");
//      return handleError(res, err);
//    }
//    //console.error(repos typeof Array);
//
//    var arr = [];
//
//    for(var i = 0; i < 46; i++) {
//      console.log(JSON.stringify(repos[i]));
//      arr.push(repos[i]);
//    }
//    res.contentType('application/json');
//    res.send(JSON.stringify(arr));
//
//    //return res.status(200).json(arr);
//    //return res.status(200).json(repos);
//  });
//};


exports.index = function(req, res) {
  Repository.find(function (err, things) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(things);
    //return res.send('200');
  });
};


// Get a single thing
exports.show = function(req, res) {
  Repository.findOne({ owner: req.params.owner }, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.status(404).send('Not Found'); }
    return res.json(thing);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Repository.create(req.body, function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(thing);
  });
};


// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Repository.findOne({ owner : req.params.owner }, function (err, thing) {
    if (err) { return handleError(res, err); }
    if(!thing) { return res.status(404).send('Not Found'); }
    var updated = _.merge(thing, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(thing);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Repository.findOne({ owner : req.params.owner } , function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.status(404).send('Not Found'); }
    thing.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
