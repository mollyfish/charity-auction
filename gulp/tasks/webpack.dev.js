var gulp = require('gulp');
var webpack = require('webpack-stream');
var config = require('../config').webpackDev;

gulp.task('webpack:dev', function() {
  return gulp.src(config.entryPoint)
  .pipe(webpack({
    output: {
      filename: config.packedFile
    }
  }))
  .pipe(gulp.dest(config.dest));
});