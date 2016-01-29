var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');


/*
 * path
 */
var path = {
  src: 'src/',
  dist: 'dist/',
  tmp: 'tmp/',
  hbs_src: 'src/hbs/',
  scss_src: 'src/scss/',
  js_src: 'src/js/',
  img_src: 'src/img/',
  sprite_src: 'src/sprite/'
};


/*
 * html
 */
var assemble = require('assemble');
var app = assemble();
var prettify = require('gulp-prettify');
var htmlmin = require('gulp-htmlmin');

// assemble
gulp.task('load', function(cb) {
    // app.data(path.hbs_src + 'data/*.json');
    app.partials(path.hbs_src + 'partials/*.hbs');
    app.layouts(path.hbs_src + 'layouts/*.hbs');
    app.pages(path.hbs_src + 'pages/**/*.hbs');
    cb();
});

gulp.task('assemble', ['load'], function() {
  return app.toStream('pages')
    .pipe(app.renderFile())
    .pipe(rename({
        extname: '.html'
    }))
    .pipe(app.dest(path.dist));
});

// prettify
gulp.task('prettify', function() {
  gulp.src(path.dist + '**/*.html')
    .pipe(prettify({indent_size: 4}))
    .pipe(gulp.dest(path.dist));
});

// htmlmin
gulp.task('htmlmin', function() {
  return gulp.src(path.dist + '**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(path.dist));
});


/*
 * css
 */
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');

// sass
gulp.task('sass', function() {
    gulp.src(path.scss_src + '**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.tmp + 'css/'));
});

// autoprefixer
gulp.task('autoprefixer', function() {
    gulp.src(path.tmp + 'css/*.css')
        .pipe(autoprefixer({
            browsers: ['iOS >= 7','Android >= 4.1']
        }))
        .pipe(gulp.dest(path.tmp + 'css/'));
});

// csscomb
gulp.task('csscomb', function() {
    gulp.src(path.tmp + 'css/*.css')
        .pipe(csscomb())
        .pipe(gulp.dest(path.tmp + 'css/'));
});

// csso
gulp.task('csso', function() {
    gulp.src(path.tmp + 'css/*.css')
        .pipe(csso())
        .pipe(gulp.dest(path.dist + 'css/'));
});


/*
 * js
 */
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// concat
gulp.task('concat', function() {
    return gulp.src([path.js_src + 'sample01.js', path.js_src + 'sample02.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('common.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.tmp + 'js/'));
});

// uglify
gulp.task('uglify', function() {
    return gulp.src([path.tmp + 'js/*.js'])
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(path.dist + 'js/'));
});


/*
 * watch,livereload
 */
var browser = require("browser-sync");

gulp.task('livereload', function() {
    browser({
        server: {
            baseDir: 'dist/'
        }
    });
});

gulp.task('watch', ['livereload'], function() {
    gulp.watch(path.hbs_src + '**/*.hbs', ['build:html']);
    gulp.watch(path.scss_src + '**/*.scss', ['build:css']);
    gulp.watch(path.js_src + '**/*.js', ['build:js']);
});


gulp.task('build:html', function () {
    gulpSequence('assemble')();
});

gulp.task('build:css', function () {
    gulpSequence('sass', 'autoprefixer', 'csscomb', 'csso')();
});

gulp.task('build:js', function () {
    gulpSequence('concat', 'uglify')();
});