/**
 * gulp
 *
 * ** ローカルサーバーを立ち上げて作業
 *
 * $ gulp serve
 *
 * ** spriteコマンド
 *
 * $ gulp sprite
 *
 * ** image optimコマンド
 *
 * $ gulp optim
 *
 * ** style guideコマンド
 *
 * $ gulp styleguide
 *
 * ---------------------------------------------------------------------- */

/*
 * init package
 */
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var size = require('gulp-size');
var postcss = require('gulp-postcss');

var events = require('events');
events.EventEmitter.defaultMaxListeners = 100;


/*
 * path
 */
var path = {
  src: 'src/',
  dist: 'dist/',
  html_src: 'src/html/',
  css_src: 'src/css/',
  js_src: 'src/js/',
  img_src: 'src/img/',
  sprite_src: 'src/sprite/'
};


/*
 * del
 */
var del = require('del');
gulp.task('del', function () {
  del(path.dist);
});


/*
 * sprite
 */
var spritesmith = require('gulp.spritesmith');
gulp.task('sprite', function () {
  var spriteData = gulp.src(path.sprite_src + 'sprite-common/*.png')
    .pipe(spritesmith({
      imgName: 'sprite-common.png',
      cssName: '_sprite-common.css',
      imgPath: '../img/sprite-common.png',
      cssFormat: 'scss',
      padding: 5,
      cssOpts: {// スプライト用SCSS内のmixinの記述をなくす
        functions: false
      }
    }));
  spriteData.img.pipe(gulp.dest(path.img_src));
  spriteData.css.pipe(gulp.dest(path.css_src + 'setting/var/'))
    .pipe(size({
      title: 'size : sprite'
    }));
});


/*
 * image optim
 */
var imageOptim = require('gulp-imageoptim');
gulp.task('optim', function() {
  return gulp.src(path.img_src + '**/*.{png,jpg}')
    .pipe(imageOptim.optimize())
    .pipe(gulp.dest(path.img_src));
});


/*
 * styledocco
 */
var styledocco = require('gulp-styledocco');

gulp.task('styleguide', function () {
  return gulp.src(path.css_src + '**/*.css')
    .pipe(styledocco({
      out: 'styleguide',
      name: 'Styleduide',
      'no-minify': true
    }));
});


/*
 * html
 */

// metalsmith
var prettify = require('gulp-metalsmith');

gulp.task('metalsmith', function() {
 return gulp.src(path.src.html + '**/*.hbs')
   .pipe(plumber({
     errorHandler: notify.onError('<%= error.message %>')
   }))
   .pipe(metalsmith({
    //  use: [layouts({engine: 'handlebars'})]
   }))
   .pipe(gulp.dest(path.dist + '/'));
});

//htmlmin
var prettify = require('gulp-prettify');

gulp.task('prettify', function() {
  return gulp.src(path.dist + '*.html')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(prettify({
      // indent_inner_html: false,
      indent_size: 4,
      // contense: true,
      // padcomments: true,
      unformatted: ["span"]
     }))
    .pipe(gulp.dest(path.dist + '/'))
    .pipe(size({
      title: 'size : html'
    }));
});


/*
 * css
 */
// precss
// calc
// autoprefixer
var precss = require('precss');
var calc = require("postcss-calc");
var autoprefixer = require('autoprefixer');
gulp.task('precss', function () {
  return gulp.src(path.css_src + '*.css')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(postcss([
      precss(),
      calc(),
      autoprefixer ({
        browsers: ['iOS >= 4.3','Android >= 2.3'],
        cascade: false
     }),
    ]))
    .pipe(gulp.dest(path.dist + 'css/'));
 });

// cssnano
var cssnano = require('cssnano');
gulp.task('cssnano', function () {
  return gulp.src([
    path.dist + 'css/*.css',
    '!' +path.dist + 'css/*.min.css'
  ])
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(postcss([
      cssnano()
    ]))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(path.dist + 'css/'))
    .pipe(size({
      title: 'size : css'
    }));
});


/*
 * js
 */
// browserify
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
gulp.task('browserify', function(){
  return browserify({entries: [path.js_src + 'lp.js']})
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(source('lp.js'))
    .pipe(gulp.dest(path.dist + 'js/'));
});

// uglify
var uglify = require('gulp-uglify');
gulp.task('uglify', function () {
  return gulp.src([
    path.dist + 'js/*.js',
    '!' + path.dist + 'js/*.min.js'
  ])
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(path.dist + 'js/'))
    .pipe(size({
      title: 'size : js'
    }));
});

// copy
gulp.task('copy_lib', function () {
  return gulp.src(path.js_src + 'lib/*.js')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(gulp.dest(path.dist + 'js/'))
    .pipe(size({
      title: 'size : copy_lib'
    }));
});

// jshint
var jshint = require('gulp-jshint');
gulp.task('jshint', function () {
  return gulp.src([
    path.js_src + '**/*.js',
    '!' + path.js_src + 'lib/*.js'
  ])
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

var eslint = require('gulp-eslint');
gulp.task('eslint', function () {
    return gulp.src([
      path.js_src + '**/*.js',
      '!' + path.js_src + 'lib/*.js'
    ])
      .pipe(plumber({
        errorHandler: notify.onError('<%= error.message %>')
      }))
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});


/*
 * img
 */
// copy
gulp.task('copy_img', function () {
  return gulp.src(path.img_src + '**/*.{png,jpg}')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(gulp.dest(path.dist + 'img/'))
    .pipe(size({
      title: 'size : copy_img'
    }));
});


/*
 * server
 */
var browserSync = require('browser-sync');
gulp.task('serve', function () {
  gulpSequence('build')();
  browserSync({
    notify: false,
    server: {
      baseDir: path.dist
    }
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});


/*
 * watch
 */
gulp.task('watch', ['serve'], function () {
  gulp.watch(path.html_src + '**/*.{ejs,json}', ['build:html']);
  gulp.watch(path.css_src + '**/*.css', ['build:css']);
  gulp.watch(path.js_src + '**/*.js', ['build:js']);
  gulp.watch(path.img_src + '**/*.{png,jpg}', ['build:img']);
  gulp.watch('gulpfile.js', ['build']);

  gulp.watch(path.dist + '**/*', ['bs-reload']);
});


/*
 * task manage
 */
// build:html
gulp.task('build:html', function () {
 gulpSequence('metalsmith', 'prettify')();
});

// build:css
gulp.task('build:css', function () {
  gulpSequence('precss', 'cssnano')();
});

// build:js
gulp.task('build:js', function () {
  gulpSequence('eslint', 'browserify', 'uglify', 'copy_lib')();
});

// build:img
gulp.task('build:img', function () {
  gulpSequence('copy_img')();
});

// build
gulp.task('build', function () {
  gulpSequence('build:html', 'build:css', 'build:js', 'build:img')();
});

// default
gulp.task('default', function () {
  gulpSequence('build')();
});

// serve
gulp.task('serve', function () {
  gulpSequence('build', 'watch')();
});