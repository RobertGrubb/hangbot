gulp.task('compile:sass', function() {
  return gulp.src(paths.sass)
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [
        paths.fontAwesomeSass
      ].concat(neat.includePaths)
    }))
    .pipe(gulp.dest(paths.output.css));
});
