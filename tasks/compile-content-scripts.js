gulp.task('compile:content-scripts', function() {
  var b = browserify({ entries: paths.contentScripts }, {
    debug: true
  }).transform(babelify, {
    presets: ["es2015", "react"]
  });

  return b.bundle()
    .pipe(source('contentScripts.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.output.contentScripts));
});
