const gulp = require('gulp');
const webpack = require('webpack-stream');
const babel = require('babel-loader');
const html = require('html-loader');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const minifyCss = require('gulp-minify-css');

gulp.task('html:dev', () => {
  gulp.src(__dirname + '/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('img:dev', () => {
  gulp.src(__dirname + '/app/img/*.jpg')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', () => {
  gulp.src(__dirname + '/test/client_test/test_entry.js')
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: "html"
          }
        ]
      },
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/'));
});

gulp.task('sass:dev', () => {
  gulp.src(__dirname + '/app/css/*.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(maps.write())
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('build:dev', ['webpack:dev', 'html:dev', 'sass:dev', 'img:dev']);
gulp.task('default', ['build:dev']);

gulp.task('sass:watch', () => {
  gulp.watch(__dirname + '/app/**/*.scss', ['sass:dev']);
});
