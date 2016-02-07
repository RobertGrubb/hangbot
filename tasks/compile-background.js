var reactPreset = require('babel-preset-react');
var esPreset = require('babel-preset-es2015');

gulp.task('compile:background', function() {

  var b = browserify({ entries: paths.jsBackground }, {
    debug: true
  }).transform(babelify, {
    presets: ["es2015", "react"]
  });

  return b.bundle()
    .pipe(source('background.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.output.js));
});
