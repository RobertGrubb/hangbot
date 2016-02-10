gulp.task('compile:automation', function(done) {
  glob(paths.automation, function(err, files) {
    if(err) done(err);

    var tasks = files.map(function(entry) {
      return browserify({ entries: [entry] })
        .transform(babelify, {
          presets: ["es2015", "react"]
        })
        .bundle()
        .pipe(source(entry))
        .pipe(buffer())
        .pipe(rename(function(path) {
          path.extname = '.bundle.js';
          path.dirname = '';
          path.basename = path.basename.replace('script-', '');
        }))
        .pipe(gulp.dest(paths.output.automation));
      });
    es.merge(tasks).on('end', done);
  })
});
