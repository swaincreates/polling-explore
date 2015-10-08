'use strict';

var gulp          = require('gulp'),
    babel = require('babelify'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    gutil         = require('gulp-util'),
    source = require('vinyl-source-stream'),
    sourcemaps    = require('gulp-sourcemaps'),
    watchify = require('watchify');

// Browserify build with Babel from https://gist.github.com/danharper/3ca2273125f500429945
function compile(watch) {
  var bundler = watchify(browserify('./js/app.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', function() { return compile(); });
