const gulp = require('gulp');
const { src, series, parallel, dest, watch } = gulp;
// requiring imagemin 
const imagemin = require('gulp-imagemin');
// requriring concat , terser , sourcemaps
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const terser = require('gulp-terser');

// requriring gulp postcss , cssnano , autoprefixer
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

function copyHtml() {
    return src('src/*.html').pipe(gulp.dest('dist'));
}

function imageOptimization() {
    return src('src/images/*').pipe(imagemin()).pipe(dest('dist/img'));
}
function jsConcatination() {
    return src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('flab.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/js'))
}


function cssPreBuild() {
    return src('src/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css'))
}

// exports.default = copyHtml;
exports.imageOptimization = imageOptimization;
exports.jsConcatination = jsConcatination;
exports.cssPreBuild = cssPreBuild;
exports.default = parallel(copyHtml, imageOptimization, cssPreBuild);