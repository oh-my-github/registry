/// <reference path="../../../../typings/node/node.d.ts" />
'use strict';
var _ = require('lodash');
var Languages = require('./language.model.js');
var HashMap = require('hashmap');
var Module = require('../Func');
//Sum each language lines
exports.index = function (req, res) {
    var prevName;
    var _owner = Module.getOwner(req.baseUrl);
    var output = new Array();
    var languageMap = new HashMap();
    Languages.find({ owner: _owner }).sort({ "repositoryName": 1, "collectAt": -1 }).exec(function (err, languages) {
        languages.forEach(function (currLanguage) {
            if (prevName == currLanguage.repositoryName || (currLanguage.repositoryName.indexOf('github.io') > -1)) {
                return;
            }
            prevName = currLanguage.repositoryName;
            currLanguage.languages.forEach(function (language) {
                if (languageMap.has(language.name)) {
                    languageMap.set(language.name, languageMap.get(language.name) + language.line);
                }
                else {
                    languageMap.set(language.name, language.line);
                }
            });
        });
        languageMap.forEach(function (value, key) {
            output.push({ 'name': key, 'line': value });
        });
        output.sort(function (a, b) {
            return b.line - a.line;
        });
        if (err) {
            return Module.handleError(res, err);
        }
        return res.status(200).json(output);
    });
};
// Code line
exports.languages = function (req, res) {
    var _owner = Module.getOwner(req.baseUrl);
    var _repositoryName = req.params.repositoryName;
    Languages.findOne({ owner: _owner, repositoryName: _repositoryName }).sort({ "collectAt": -1 }).exec(function (err, object) {
        if (err) {
            return Module.handleError(res, err);
        }
        if (!object) {
            return res.status(404).send('Not Found');
        }
        return res.json(object.languages);
    });
};
// Deletes a thing from the DB.
exports.destroy = function (req, res) {
    var _owner = Module.getOwner(req.baseUrl);
    var _repositoryName = req.params.repositoryName;
    Languages.find({ owner: _owner, repositoryName: _repositoryName }).sort({ "collectAt": -1 }).exec(function (err, languages) {
        if (err) {
            return Module.handleError(res, err);
        }
        if (!languages) {
            return res.status(404).send('Not Found');
        }
        languages.forEach(function (currLanguage) {
            currLanguage.remove(function (err) {
                if (err) {
                    return Module.handleError(res, err);
                }
                return res.status(204).send('No Content');
            });
        });
    });
};
