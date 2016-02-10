gulp.task('compile:automation', function() {
  var b = browserify({ entries: paths.automation }, {
    debug: true
  }).transform(babelify, {
    presets: ["es2015", "react"]
  });

  return b.bundle()
    .pipe(source('automation.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.output.automation));
});
