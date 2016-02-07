gulp.task('move:fonts', ['compile:sass'], function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.output.fonts));
});
