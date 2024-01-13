"use strict";

var path = {
  dev: "./_src",
  prod: "./assets",
};

const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");

gulp.task(
  "sass",
  gulp.series(function () {
    return gulp
      .src(path.dev + "/scss/**/*.scss")
      .pipe(sass({ outputStyle: "compressed" }))
      .pipe(concat("main.min.css"))
      .pipe(gulp.dest(path.prod + "/css/"))
      .pipe(browserSync.stream());
  })
);

gulp.task(
  "scripts",
  gulp.series(function () {
    return gulp
      .src([path.dev + "/js/_includes/**/*.js", path.dev + "/js/*.js"])
      .pipe(concat("main.min.js"))
      .pipe(terser())
      .pipe(gulp.dest(path.prod + "/js/"))
      .pipe(browserSync.stream());
  })
);

gulp.task(
  "images",
  gulp.series(function () {
    return gulp
      .src(path.dev + "/images/**/*")
      .pipe(imagemin())
      .pipe(gulp.dest(path.prod + "/images/"));
  })
);

gulp.task(
  "server",
  gulp.series("sass", "scripts", function () {
    browserSync.init({
      server: path.dev,
    });

    gulp
      .watch([path.dev + "/js/*.js", path.dev + "/scss/**/*.scss"])
      .on("change", gulp.parallel("sass", "scripts", browserSync.reload));
    gulp.watch(path.dev + "/images/**/*", gulp.series("images"));
  })
);

gulp.task("default", gulp.series("server"));
