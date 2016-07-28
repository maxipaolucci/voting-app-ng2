var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence'); //for run task in order and not in parallel
var del = require('del'); //for remove files or directories
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");


//CONSTANTS
var HTML_FILES = './src/*.html';
var BUILD_PATH = './dist';


//TASKS
/**
 * Default task when just type gulp. Makes the build, starts watchers
 */
gulp.task('default', function(callback) {
  runSequence('re-build', 'watch', callback);
});

/**
 * Removes the current build directory an recreates it
 */
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
 * Delete the current build directory
 */
gulp.task('clean-build', function() {
  return del(BUILD_PATH, {force: true});
});


/**
 * starts a watcher looking for any changes in the app files
 */
gulp.task('watch', function() {
  gulp.watch(HTML_FILES, ['re-build']);
});

gulp.task("webpack:build", function(callback) {
  // run webpack
  webpack(webpackConfig, function(err, stats) {
    if (err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});
