'use strict';

var _ = require('lodash');
var Languages = require('../../v1/language/language.model.js');
var HashMap = require('hashmap');

function getOwner(baseUrl){
  var res = baseUrl.split('/');
  return res[3];
}

// Owner's Language List
exports.index = function(req, res) {
  var prevName;
  var output = new Array();
  Languages.find({ owner : getOwner(req.baseUrl) }).sort({"repositoryName": 1, "collectAt": -1}).exec(function (err, languages) {
    languages.forEach(function(currLanguage){
      /*
      if(prevName == currLanguage.repositoryName){
        return ;
      }
      prevName = currLanguage.repositoryName;
      */
      output.push(currLanguage);
    });
    if(err) { return handleError(res, err); }
    return res.status(200).json(output);
  });
};

// Code line
exports.languages = function(req, res){
  Languages.findOne({ owner: getOwner(req.baseUrl), repositoryName: req.params.repositoryName}).sort({"collectAt": -1}).exec(function (err, object) {
    if(err) { return handleError(res, err); }
    if(!object) { return res.status(404).send('Not Found'); }
    return res.json(object.languages);
  });
};


//sum each language lines
exports.eachline = function(req, res) {
  var prevName;
  var output = new Array();
  var languageMap = new HashMap();

  Languages.find({ owner : getOwner(req.baseUrl) }).sort({"repositoryName": 1, "collectAt": -1}).exec(function (err, languages) {
    languages.forEach(function(currLanguage){
      if(prevName == currLanguage.repositoryName || (currLanguage.repositoryName.indexOf('github.io') > -1)){
        return ;
      }
      prevName = currLanguage.repositoryName;
      currLanguage.languages.forEach(function(language){
        if(languageMap.has(language.name)){
          languageMap.set(language.name, languageMap.get(language.name) + language.line);
        } else {
          languageMap.set(language.name, language.line);
        }
      });
    });

    languageMap.forEach(function(value, key) {
     output.push({'name':key, 'line':value});
    });

    output.sort(function(a,b) {
      return b.line - a.line;
    });

    if(err) { return handleError(res, err); }
    return res.status(200).json(output);
  });
};



// Deletes a thing from the DB.
exports.destroy = function(req, res) {
   Languages.find({ owner: getOwner(req.baseUrl), repositoryName: req.params.repositoryName}).sort({"collectAt": -1}).exec(function (err, languages) {
    if(err) { return handleError(res, err); }
    if(!language) { return res.status(404).send('Not Found'); }
    languages.forEach(function(currLanguage){
       language.remove(function(err) {
         if(err) { return handleError(res, err); }
         return res.status(204).send('No Content');
       });
     });
  });
};



















function handleError(res, err) {
  return res.status(500).send(err);
}
