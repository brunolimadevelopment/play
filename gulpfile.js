"use strict";


//////////////////////////////////////
// VARS
//////////////////////////////////////

var browsersup, path;

//////////////////////////////////////
// DIRETORIOS
//////////////////////////////////////

path = {
  dev: './_src',
  prod: './assets',
  proxy: 'http://localhost:10014'
}

//////////////////////////////////////
// LOAD PLUGINS
//////////////////////////////////////

const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cssnano = require("cssnano");
//const del = require("del");
//const eslint = require("gulp-eslint");
const gulp = require("gulp");
//const imagemin = require("gulp-imagemin");
const imagemin = import('gulp-imagemin');
//const imageminGifsicle = require('imagemin-gifsicle');

const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
//const sass = require("gulp-sass");
const sass = require('gulp-sass')(require('sass'));

//////////////////////////////////////
// BROWSERSYNC
//////////////////////////////////////

function browserSync(done) {
  browsersync.init({
    proxy: path.proxy,
    options: {
      reloadDelay: 2000
    },
    browser: ["chrome", "firefox"],
    notify: true,
  });

  done();
}

//////////////////////////////////////
// CLEAN ASSETS
//////////////////////////////////////

function clean() {
    return del(["./assets/"]);
}

//////////////////////////////////////
// OPTIMIZE IMAGES
//////////////////////////////////////

function images() {
  return gulp
    .src(path.dev + "/images/**/*")
    .pipe(newer(path.prod + "/images"))
    .pipe(gulp.dest(path.prod + "/images"));
}

//////////////////////////////////////
// FONTS TASK
//////////////////////////////////////

function fonts() {
  return gulp
    .src(path.dev + '/fonts/**/*')
    .pipe(gulp.dest(path.prod + '/fonts'));
}

//////////////////////////////////////
// CSS TASK
//////////////////////////////////////

function css() {
  return gulp
    .src(path.dev + "/scss/**/main.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest(path.prod + "/css/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.prod + "/css/"))
    .pipe(browsersync.stream());
}

//////////////////////////////////////
// TRANSPILE, CONCATENATE AND MINIFY SCRIPTS
//////////////////////////////////////

function scripts() {
  return gulp
    .src(['!' + path.dev + '/js/_excludes/**/*.js', path.dev + '/js/_includes/**/*.js', path.dev + '/js/*.js'])
    // .pipe(plumber())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.prod + '/js'))
    // // .pipe(webpackstream(webpackconfig, webpack))
    // .pipe(gulp.dest(path.dev + "/js/"))
    .pipe(browsersync.stream());
}

//////////////////////////////////////
// TASKS
//////////////////////////////////////

gulp.task("images", images);
gulp.task("sass", css);
gulp.task("fonts", fonts);
gulp.task("scripts", scripts);
gulp.task("clean", clean);

//////////////////////////////////////
// WATCH FILES
//////////////////////////////////////

function watchFiles() {
  gulp.watch(path.dev + "/scss/**/*", css);
  gulp.watch(path.dev + "/fonts/**/*", fonts);
  gulp.watch(path.dev + "/js/**/*", gulp.series(scripts));
  gulp.watch(path.dev + "/images/**/*", images);
}

//////////////////////////////////////
// BUILD
//////////////////////////////////////

gulp.task(
  "build",
  gulp.series(clean, gulp.parallel(css, images, scripts))
);

//////////////////////////////////////
// WATCH
//////////////////////////////////////

gulp.task(
  "default",
  gulp.parallel(watchFiles, browserSync)
);