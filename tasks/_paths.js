/**
 * Prefixed paths.js with an underscore for organization,
 * to show others that _paths.js is not a gulp task.
 * And I also want to say because it'd be one of the first
 * files processed in the requireDir method, assuming that it
 * goes in that order. That way, paths will always be defined
 * before any other gulp tasks are processed.
 **/

paths = {
  jade: ['./src/jade/**/*.jade', '!./src/jade/**/_*.jade'],
  sass: './src/sass/**/*.scss',
  js: './src/js/**/*.{js,jsx}',
  jsPopup: './src/js/popup/popup.js',
  jsBackground: './src/js/background/background.js',
  fontAwesomeSass: './node_modules/font-awesome/scss',
  fonts: './node_modules/font-awesome/fonts/**/*',
  images: './src/images/**/*.*',
  manifest: './src/config/manifest.json',
  contentScripts: './src/js/contentScripts/contentScripts.js'
};

paths.output = {
  css: './build/ext/assets/css/',
  js: './build/ext/assets/js/',
  jade: './build/ext',
  build: './build',
  fonts: './build/ext/assets/fonts/',
  images: './build/ext/assets/images/',
  contentScripts: './build/ext/assets/js/'
};
