gulp.task('move:images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.output.images));
});
