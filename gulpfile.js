/**
 * Setting all of the variables here without 'var'
 * will set them as a global variable. Therefore meaning
 * they will be able to be accessed from the task files
 * that we include using requireDir.
 *
 * I also did the same for the paths file.
 **/
gulp       = require('gulp');
del        = require('del');
jade       = require('gulp-jade');
sass       = require('gulp-sass');
rename     = require('gulp-rename');
concat     = require('concat');
neat       = require('node-neat');
browserify = require('browserify');
buffer     = require('vinyl-buffer');
source     = require('vinyl-source-stream');
strictify  = require('strictify');
babelify   = require('babelify');
opn        = require('opn');
es         = require('event-stream');
glob       = require('glob');

//Require our tasks since we have required our global plugins:
var requireDir = require('require-dir');
var tasks = requireDir('./tasks');
