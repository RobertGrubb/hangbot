gulp.task('default', [
  'clean',
  'move:manifest',
  'compile:jade',
  'compile:sass',
  'compile:background',
  'compile:popup',
  'move:images',
  'move:fonts'
]);
