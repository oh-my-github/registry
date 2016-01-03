var gulp = require('gulp');
var ts = require('gulp-typescript');

module.exports = function(){
  return gulp.src(['server/**/*.ts', 'client/**/*.ts'], { base : "."})
    .pipe(ts({
      target: 'ES6',
      module: 'commonjs',
      noImplicitAny: false,
      declaration : true
    }))
    .pipe(gulp.dest('built'));
};
