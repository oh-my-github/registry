'use strict';

/**
 * Serve app. For dev purpose.
 */

var gulp       = require('gulp');
var nodemon    = require('gulp-nodemon');
var open       = require('gulp-open');
var livereload = require('gulp-livereload');

//var config = require('../server/config/environment');

var openOpts = {
  uri: 'http://localhost:9000',
  already: false
};

module.exports = {
  nodemon: function () {
    return nodemon({
      //script: 'server/app.js',
      script: 'built/server/app.js',
      ext: 'js',
      ignore: ['client', 'dist', 'node_modules', 'gulpfile.js']
    })
      .on('start', function () {
        if (!openOpts.already) {
          openOpts.already = true;
          gulp.src('client/index.html')
          .pipe(open(openOpts));
        } else {
          livereload.changed('/');
        }
      });
  }

};
