/// <reference path="../../../../typings/node/node.d.ts" />
'use strict';
var _ = require('lodash');
var Repository = require('./repository.model.js');
var async = require('async');
var moment = require('moment');
///////////////////////////
// Routes
// Get owner's Repository Name List
exports.index = function (req, res) {
    var prevName;
    var output = new Array();
    var _owner = getOwner(req.baseUrl);
    Repository.find({ owner: _owner }).sort({ "name": 1, "collectAt": -1 }).exec(function (err, repositories) {
        repositories.forEach(function (currRepo) {
            if (prevName == currRepo.name || (currRepo.name.indexOf('github.io') > -1)) {
                return;
            }
            prevName = currRepo.name;
            output.push(prevName);
        });
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(output);
    });
};
// Get owner's forks, stargazers, watchers count
exports.starCount = function (req, res) {
    var prevName;
    var forkSum = 0, starSum = 0, watchSum = 0;
    var _owner = getOwner(req.baseUrl);
    Repository.find({ owner: _owner }).sort({ "name": 1, "collectAt": -1 }).exec(function (err, repositories) {
        repositories.forEach(function (currRepo) {
            if (prevName == currRepo.name) {
                return;
            }
            prevName = currRepo.name;
            forkSum += currRepo.forksCount;
            starSum += currRepo.stargazersCount;
            watchSum += currRepo.watchersCount;
        });
        var result = {
            'owner': _owner,
            'forksCount': forkSum,
            'stargazersCount': starSum,
            'watchersCount': watchSum
        };
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(result);
    });
};
// Get owner's forks, stargazers, watchers count by time(hours)
exports.starCountTimeline = function (req, res) {
    var _owner = getOwner(req.baseUrl);
    async.waterfall([
        function (callback) {
            callback(null, _owner);
        },
        getCollectAtTime,
        distinctByDay,
        getStarCount
    ], function (err, results) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(results);
    });
};
// Get owner's a repository info
exports.showRepoInfo = function (req, res) {
    var _owner = getOwner(req.baseUrl);
    var _name = req.params.repoName;
    Repository.findOne({ owner: _owner, name: _name }).sort({ "collectAt": -1 }).exec(function (err, object) {
        if (err) {
            return handleError(res, err);
        }
        if (!object) {
            return res.status(404).send('Not Found');
        }
        return res.status(200).json(object);
    });
};
// Deletes a thing from the DB.
exports.destroy = function (req, res) {
    var _owner = getOwner(req.baseUrl);
    var _name = req.params.repoName;
    Repository.find({ owner: _owner, name: _name }).sort({ "collectAt": -1 }).exec(function (err, repositories) {
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
////////////////////////////
// Functions
function getOwner(baseUrl) {
    var res = baseUrl.split('/');
    return res[3];
}
function getCollectAtTime(_owner, callback) {
    Repository.aggregate([
        { $match: { owner: _owner } },
        { $group: { _id: '$collectAt' } },
        { $sort: { _id: 1 } } // _id equals collectAt
    ], function (err, results) {
        if (err) {
            console.log(err);
            return;
        }
        callback(null, _owner, results);
    });
}
function distinctByDay(_owner, dates, callback) {
    var prevYear, prevMonth, prevDate, prevHours;
    var output = new Array();
    dates.forEach(function (date) {
        if ((prevYear == date._id.getYear())
            && (prevMonth == date._id.getMonth())
            && (prevDate == date._id.getDate())
            && (prevHours == date._id.getHours())) {
            return;
        }
        prevYear = date._id.getYear();
        prevMonth = date._id.getMonth();
        prevDate = date._id.getDate();
        prevHours = date._id.getHours();
        output.push(date._id);
    });
    callback(null, _owner, output);
}
function getStarCount(_owner, dates, callback) {
    var output = new Array();
    var prevName;
    var forkSum = 0, starSum = 0, watchSum = 0;
    var result;
    async.each(dates, function (date, callbackNextEach) {
        Repository.find({ owner: _owner, collectAt: date }).sort({ "name": 1 }).exec(function (err, repositories) {
            repositories.forEach(function (currRepo) {
                if (prevName == currRepo.name) {
                    return;
                }
                prevName = currRepo.name;
                forkSum += currRepo.forksCount;
                starSum += currRepo.stargazersCount;
                watchSum += currRepo.watchersCount;
            });
            result = {
                'collectAt': moment(date).format('YYYY-MM-DD h:mm:ss'),
                'forksCount': forkSum,
                'stargazersCount': starSum,
                'watchersCount': watchSum
            };
            output.push(result);
            forkSum = 0, starSum = 0, watchSum = 0, prevName = 0;
            callbackNextEach();
        });
    }, function (err) {
        if (err) {
            console.log(err);
            callback(null, err);
        }
        callback(null, output);
    });
}
function handleError(res, err) {
    return res.status(500).send(err);
}
if (typeof exports !== 'undefined') {
    exports.getCollectAtTime = getCollectAtTime;
    exports.distinctByDay = distinctByDay;
    exports.getStarCount = getStarCount;
}
