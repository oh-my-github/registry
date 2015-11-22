// Added by TAK on 2015-09-25
'use strict';

var _ = require('lodash');
var Languages = require('./language.model.js');

// Get list of language
exports.index = function(req, res) {
  Languages.find(function (err, languageList) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(languageList);
  });
};

// Get a single language
//findById 는 db안에 _id를 찾음
exports.show = function(req, res) {
  Languages.findOne({ owner: req.params.owner }, function (err, language) {
    if(err) { return handleError(res, err); }
    if(!language) { return res.status(404).send('Not Found'); }
    return res.json(language);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Languages.create(req.body, function(err, language) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(language);
  });
};


// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Languages.findOne({ owner : req.params.owner }, function (err, language) {
    if (err) { return handleError(res, err); }
    if(!language) { return res.status(404).send('Not Found'); }
    var updated = _.merge(language, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(language);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Languages.findOne({ owner : req.params.owner } , function (err, language) {
    if(err) { return handleError(res, err); }
    if(!language) { return res.status(404).send('Not Found'); }
    language.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
