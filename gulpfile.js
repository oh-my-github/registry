/**
 * Created by tak on 16. 1. 3.
 */
'use strict';

var gulp = require('gulp');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

gulp.task('default',    ['serve']);
gulp.task('shell',                    require('./tasks/shell'));
gulp.task('serve',      ['shell', 'watch'],    require('./tasks/serve').nodemon);
gulp.task('test',                     require('./tasks/test').test);
gulp.task('watch',      ['inject'],   require('./tasks/watch'));
gulp.task('inject',     ['sass'],     require('./tasks/inject'));
gulp.task('sass',                     require('./tasks/sass'));
gulp.task('build',                    require('./tasks/build'));
gulp.task('bump',       ['version'],  require('./tasks/chore').bump);
gulp.task('version',                  require('./tasks/chore').version);
gulp.task('typescript',                  require('./tasks/typescript'));
