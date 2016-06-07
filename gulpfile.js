'use strict';

const gulp = require('gulp');
const include = require('gulp-include');
const sourcemaps  = require('gulp-sourcemaps');
const livereload  = require('gulp-livereload');

// Build JS
gulp.task("build-app", function (){
  return gulp.src('frontend/js/app.js')
    .pipe(sourcemaps.init())
      .pipe(include())
    .pipe(sourcemaps.write('_maps'))
    .pipe(gulp.dest('public/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('frontend/js/**/*.js', ['build-app']);
});

// Default Task
gulp.task('default', ['build-app']);