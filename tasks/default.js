gulp.task('default', [
  'clean',
  'move:manifest',
  'compile:jade',
  'compile:sass',
  'compile:background',
  'compile:popup',
  'compile:automation',
  'move:images',
  'move:fonts'
]);
