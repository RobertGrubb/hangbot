gulp.task('default', [
  'clean',
  'move:manifest',
  'compile:jade',
  'compile:sass',
  'compile:background',
  'compile:popup',
  'compile:content-scripts',
  'move:images',
  'move:fonts'
]);
