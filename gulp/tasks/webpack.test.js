var gulp = require('gulp');
var webpack = require('webpack-stream');
var config = require('../config').webpackTest;

gulp.task('webpack:test', function() {
  return gulp.src(config.src)
  .pipe(webpack({
    output: {
      filename: config.packedFile
    }
  }))
  .pipe(gulp.dest(config.dest));
});