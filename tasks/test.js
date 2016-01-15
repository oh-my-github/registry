'use strict';

/**
 * Test tasks
 */

var gulp        = require('gulp');
var chalk       = require('chalk');
var plumber     = require('gulp-plumber');
var mocha       = require('gulp-mocha');

/**
 * Log. With options.
 *
 * @param {String} msg
 * @param {Object} options
 */
function log (msg, options) {
  options = options || {};
  console.log(
    (options.padding ? '\n' : '')
    + chalk.yellow(' > ' + msg)
    + (options.padding ? '\n' : '')
  );
}

exports.test = function(done) {
  log('Running server tests...', {padding: true});
  gulp.src('server/**/*.spec.js', {read: false})
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .once('error', function (err) {
      done(err);
      process.exit(1);
    })
    .once('end', function () {
      done(0);
      process.exit();
    });
};
