var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence'); //for run task in order and not in parallel
var del = require('del'); //for remove files or directories
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var shell = require('gulp-shell');


//CONSTANTS
var HTML_FILES = './src/*.html';
var BUILD_PATH = './dist';


//TASKS
/**
 * Default task when running just gulp
 */
gulp.task('default', ['build']);

/**
 * Start the Development environment. Makes the build, starts watchers and start the server to make some development tasks
 */
gulp.task('dev', function(callback) {
  runSequence('build', 'watch', 'wds', callback);
});

/**
 * Start the Client server to use the client webapp. This tasks is similar to dev with the difference that it doesn't
 * start the gulp watchers. Is good when not doing development, just using the app.
 */
gulp.task('start', function(callback) {
  runSequence('build', 'wds', callback);
});

/**
 * Removes the current build directory an recreates it
 */
gulp.task('build', function(callback) {
  runSequence('clean-build', 'copy-statics', 'webpack:build', callback);
});

/**
 * Delete the current build directory
 */
gulp.task('clean-build', function() {
  return del(BUILD_PATH, {force: true});
});

/**
 * Creates a new build directory and put there the static files
 */
gulp.task('copy-statics', function() {
  return gulp.src(HTML_FILES).pipe(gulp.dest(BUILD_PATH));
});

/**
 * starts a watcher looking for any changes in the app files
 */
gulp.task('watch', function() {
  gulp.watch(HTML_FILES, ['build']);
});


/**
 * Creates a new build using my webpack configuration
 */
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

/**
 * Starts the webpack-dev-server
 */
gulp.task('wds', shell.task(['webpack-dev-server']));
// gulp.task("wds", function(callback) {
//   var myConfig = Object.create(webpackConfig);
//
//   // Start a webpack-dev-server
//   new webpackDevServer(webpack(myConfig), {
//     //publicPath: myConfig.output.publicPath,
//     contentBase: myConfig.devServer.contentBase,
//     stats: {
//       colors: true
//     }
//   }).listen(8080, "localhost", function(err) {
//     if(err) throw new gutil.PluginError("webpack-dev-server", err);
//     gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/");
//   });
// });

/**
 * run the mocha tests
 */
gulp.task('test', shell.task(['npm run test']));

/**
 * run the mocka tests and start a watcher for changes on test resources.
 */
gulp.task('test:watch', shell.task(['npm run test:watch']));
