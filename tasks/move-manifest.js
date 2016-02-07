gulp.task('move:manifest', function() {
  return gulp.src(paths.manifest)
    .pipe(gulp.dest(paths.output.build + '/'));
});
