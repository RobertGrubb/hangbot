gulp.task('compile:popup', function() {

  var b = browserify({ entries: paths.jsPopup }, {
    debug: true
  }).transform(babelify, {
    presets: ["es2015", "react"]
  });

  return b.bundle()
    .pipe(source('popup.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.output.js));
});
