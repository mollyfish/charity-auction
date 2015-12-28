var gulp = require('gulp');

gulp.task('build:dev', ['webpack:dev', 'html', 'views', 'sass', 'watch']);
gulp.task('default', ['build:dev']);