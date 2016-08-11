var gulp = require('gulp');
var sass = require("gulp-sass"); //for compile sass
var runSequence = require('run-sequence'); //for run task in order and not in parallel
var del = require('del'); //for remove files or directories
var shell = require('gulp-shell');


//CONSTANTS
var SCSS_FILES = './src/*.scss';
var BUILD_PATH = './dist';
var PUBLIC_CSS_PATH = './public/css';

//TASKS
/**
 * Default task when running just gulp
 */
gulp.task('default', []);

/**
 * Start the Development environment. Makes the build, starts watchers and start the server to make some development tasks
 */
gulp.task('dev', function(callback) {
  runSequence('sass', 'watch', 'start', callback);
});

/**
 * compile all sass resources into css ones.
 */
gulp.task('sass', function() {
  return gulp.src(SCSS_FILES)
    .pipe(sass({
      style: 'compressed',
      errLogToConsole: false,
      onError: function(err) {
        return notify().write(err);
      }
    })).pipe(gulp.dest(PUBLIC_CSS_PATH));
});

/**
 * starts a watcher looking for any changes in the app files
 */
gulp.task('watch', function() {
  gulp.watch(SCSS_FILES, ['sass']);
});

/**
 * generates a new build (dist directory)
 */
gulp.task('build', function(callback) {
  runSequence('clean-build', 'sass', 'exec-build', callback);
});

/**
 * Executes the build command
 */
gulp.task('exec-build', shell.task(['npm run build']));

/**
 * Delete the current build directory
 */
gulp.task('clean-build', function() {
  return del(BUILD_PATH, {force: true});
});

/**
 * Starts the webpack-dev-server
 */
gulp.task('start', shell.task(['npm start']));

/**
 * run the mocha tests
 */
gulp.task('test', shell.task(['npm run test']));