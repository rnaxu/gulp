var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var gulpSequence = require('gulp-sequence');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');


/*
 * path
 */
var path = {
  src: 'src/',
  build: 'build/',
  hbs_src: 'src/hbs/',
  scss_src: 'src/scss/',
  js_src: 'src/js/',
  sprite_src: 'src/sprite/',
  styleguide: 'styleguide/'
};


/*
 * delete
 */
var del = require('del');
gulp.task('del', function () {
    del(path.build);
});


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
    .pipe(app.dest(path.build));
});

// prettify
gulp.task('prettify', function() {
  return gulp.src(path.build + '**/*.html')
    .pipe(prettify({
      indent_size: 4
    }))
    .pipe(gulp.dest(path.build));
});

// htmlmin
gulp.task('htmlmin', function() {
  return gulp.src(path.build + '**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(path.build));
});


/*
 * css
 */
var spritesmith = require('gulp.spritesmith');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');

gulp.task('sprite', function () {
  var spriteData = gulp.src(path.sprite_src + '*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../img/sprite.png',
      cssName: '_sprite.scss',
      cssFormat: 'scss'
    }));
  spriteData.img.pipe(gulp.dest(path.build + 'img/'));
  spriteData.css.pipe(gulp.dest(path.scss_src));
});

// sass
gulp.task('sass', function(cb) {
  gulp.src(path.scss_src + '**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.build + 'css/'))
    .on('end', function() {
      cb();
    });
});

// autoprefixer
gulp.task('autoprefixer', function(cb) {
  gulp.src(path.build + 'css/*.css')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(autoprefixer({
      browsers: ['iOS >= 7','Android >= 4.1']
    }))
    .pipe(gulp.dest(path.build + 'css/'))
    .on('end', function() {
      cb();
    });
});

// csscomb
gulp.task('csscomb', function(cb) {
  gulp.src(path.build + 'css/*.css')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(csscomb())
    .pipe(gulp.dest(path.build + 'css/'))
    .on('end', function() {
      cb();
    });
});

// csso
gulp.task('csso', function(cb) {
  gulp.src([path.build + 'css/*.css', '!' + path.build + 'css/*.min.css'])
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(csso())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(path.build + 'css/'))
    .on('end', function() {
      cb();
    });
});


/*
 * js
 */
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// concat
gulp.task('concat', function() {
  return gulp.src([path.js_src + 'sample01.js', path.js_src + 'sample02.js'])
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('common.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.build + 'js/'));
});

// uglify
gulp.task('uglify', function() {
  return gulp.src([path.build + 'js/*.js', '!' + path.build + 'js/*.min.js'])
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(path.build + 'js/'));
});


/*
 * styleguide
 */
var hologram = require('gulp-hologram');

gulp.task('hologram', function() {
  gulp.src('hologram_config.yml')
    .pipe(hologram({
      bundler:true
    }))
    .pipe(reload({stream: true}));
});


/*
 * watch,livereload
 */
var browserSync = require("browser-sync");
var reload = browserSync.reload;

// watch
gulp.task('watch', ['build:html', 'build:css', 'build:js', 'hologram'], function() {
  browserSync({
    server: './',
    port: 1108
  });
  gulp.watch(path.hbs_src + '**/*.hbs', ['build:html']);
  gulp.watch(path.scss_src + '**/*.scss', ['build:css']);
  gulp.watch(path.js_src + '**/*.js', ['build:js']);
  gulp.watch(path.styleguide + 'doc_assets/*.html', ['hologram']);
  gulp.watch(path.styleguide + 'css/*.css', ['hologram']);
});


/*
 * task
 */
// build:html
gulp.task('build:html', function () {
  gulpSequence('assemble')();
  gulp.src(path.hbs_src + '**/*.hbs')
    .pipe(reload({stream: true}));
});

// build:css
gulp.task('build:css', function () {
  gulpSequence('sass', 'autoprefixer', 'csscomb', 'csso')();
  gulp.src(path.scss_src + '**/*.scss')
    .pipe(reload({stream: true}));
});

// build:js
gulp.task('build:js', function () {
  gulpSequence('concat', 'uglify')();
  gulp.src(path.js_src + '**/*.js')
    .pipe(reload({stream: true}));
});

// default
gulp.task('default', function() {
  gulpSequence('build:html', 'build:css', 'build:js')();
});