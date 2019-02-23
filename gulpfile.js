var gulp = require('gulp');
var sass = require('gulp-sass');
var cleancss = require('gulp-clean-css');
var csscomb = require('gulp-csscomb');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');

gulp.task('watch', function() {
  gulp.watch('./**/*.scss', ['build']);
  gulp.watch('./assets/**/*.scss', ['docs']);
  gulp.watch('./pug/**/*.pug', ['docs']);
});

gulp.task('build', function() {
  gulp.src('./src/*.scss')
    .pipe(sass({outputStyle: 'compact', precision: 10})
      .on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(gulp.dest('./dist'))
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('docs', function() {
  gulp.src('./src/*.scss')
    .pipe(sass({outputStyle: 'compact', precision: 10})
      .on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(gulp.dest('./assets/css'))
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./assets/css'));
  gulp.src('./pug/**/!(_)*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['build']);
