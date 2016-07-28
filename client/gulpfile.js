var gulp = require('gulp'),
  runSequence = require('run-sequence'), //for run task in order and not in parallel
  del = require('del'); //for remove files or directories

var HTML_FILES = './src/*.html';
var BUILD_PATH = './dist';

/**
 * Default task when just type gulp. Makes the build, starts watchers
 */
gulp.task('default', function(callback) {
  runSequence('re-build', 'watch', callback);
});

gulp.task('re-build', function(callback) {
  runSequence('clean-build', 'create-build', callback);
});

/**
 * Creates a new build directory and copy there the static files
 */
gulp.task('create-build', function() {
  return gulp.src(HTML_FILES).pipe(gulp.dest(BUILD_PATH));
});

/**
 * Deletes the current angular build
 */
gulp.task('clean-build', function() {
  return del(BUILD_PATH, {force: true});
});


/**
 * starts a watcher looking for any changes in the app js files
 */
gulp.task('watch', function() {
  gulp.watch(HTML_FILES, ['re-build']);
});