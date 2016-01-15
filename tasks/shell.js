var gulp = require('gulp')
var shell = require('gulp-shell')

module.exports = function () {
  return gulp.src('*.js', {read: false})
    .pipe(shell([
      'mongo ohmygithub-dev --eval "db.repository.drop(); db.language.drop()"',
      'mongoimport --collection repository --db ohmygithub-dev resources/repository.json',
      'mongoimport --collection language --db ohmygithub-dev resources/language.json'
    ], {
      templateData: {
        f: function (s) {
          return s.replace(/$/, '.bak')
        }
      }
    }))
};


