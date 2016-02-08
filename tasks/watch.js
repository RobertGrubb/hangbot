gulp.task('watch', ['default'], function() {
  gulp.watch([paths.manifest], ["move:manifest"]);
  gulp.watch([paths.jade[0]], ["compile:jade"]);
  gulp.watch([paths.sass], ["compile:sass"]);
  gulp.watch([paths.js], ["compile:background", "compile:popup"]);
  gulp.watch([paths.contentScripts], ["compile:content-scripts"]);
});
