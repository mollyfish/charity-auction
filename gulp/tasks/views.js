var gulp = require('gulp');
var config = require('../config').views;

gulp.task('views', function() {
  gulp.src(config.src)
  .pipe(gulp.dest(config.dest));
});