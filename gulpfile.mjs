'use strict';

import gulp from 'gulp';
const { src, dest, task, series } = gulp;
import useref from 'gulp-useref';
import terser from 'gulp-terser';
import gulpIf from 'gulp-if';
import { deleteAsync } from 'del';
import cssnano from 'gulp-cssnano';
// import cwebp from 'gulp-cwebp';
import imagemin from 'gulp-imagemin';
import htmlmin from 'gulp-htmlmin';
import autoprefixer from 'gulp-autoprefixer';
// import replace from 'gulp-replace';
import purgecss from 'gulp-purgecss';
import cache from 'gulp-cache';
/* eslint-enable no-undef */

const DIR = {
  src: 'src',
  dist: 'dist',
};

function cleanup() {
  return deleteAsync([DIR.dist]);
}

function minify() {
  return (
    src(`${DIR.src}/*.html`)
      .pipe(useref())
      .pipe(gulpIf('*.html', htmlmin({ collapseWhitespace: true })))
      // .pipe(replace('png', 'webp'))
      // .pipe(replace('jpg', 'webp'))
      .pipe(gulpIf('*.js', terser()))
      .pipe(
        gulpIf(
          '*.css',
          purgecss({
            content: ['src/**/*.html'],
          })
        )
      )
      .pipe(gulpIf('*.css', cssnano()))
      .pipe(gulpIf('*.css', autoprefixer()))
      .pipe(dest(DIR.dist))
  );
}

function components() {
  return src(`${DIR.src}/components/**.js`)
    .pipe(terser())
    .pipe(dest(`${DIR.dist}/components`));
}

function copyImages() {
  return (
    src(`${DIR.src}/assets/images/**/*`)
      .pipe(gulpIf('*.+(png|jpg|gif|svg)', cache(imagemin())))
      // .pipe(gulpIf('*.+(png|jpg)', webp()))
      .pipe(dest(`${DIR.dist}/assets/images`))
  );
}

function copyFonts() {
  return src(`${DIR.src}/assets/fonts/**/*`).pipe(dest(`${DIR.dist}/assets/fonts`));
}

function copyMiscFiles() {
  return src([
    `${DIR.src}/robots.txt`,
    `${DIR.src}/sitemap.xml`
  ]).pipe(dest(DIR.dist));
}

task(
  'build',
  series(cleanup, copyImages, minify, components, copyMiscFiles, copyFonts)
);
