var gulp = require('gulp'),
  hawkjs = require('gulp-hawkjs');

gulp.task('default', function() {
  gulp.src('./*.html')
    .pipe(hawkjs())
    .pipe(gulp.dest('dest/'));
});
