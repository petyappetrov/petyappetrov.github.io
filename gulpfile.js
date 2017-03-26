//////////////////////////////////////////////////////////////////////////////////////////
var gulp = require('gulp')
var connect = require('gulp-connect')
var del = require('del')
var plumber = require('gulp-plumber')
var postcss = require('gulp-postcss')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var browserify = require('browserify')
var watchify = require('watchify')
var babel = require('babelify')
var runSequence = require('run-sequence')
var gulpif = require('gulp-if')
var watch = require('gulp-watch')
var batch = require('gulp-batch')
var uglify = require('gulp-uglify')
var htmlmin = require('gulp-htmlmin')

//////////////////////////////////////////////////////////////////////////////////////////
var DEV = false

//////////////////////////////////////////////////////////////////////////////////////////
gulp.task('server', function () {
  return connect.server({
    livereload: true
  })
})

//////////////////////////////////////////////////////////////////////////////////////////
gulp.task('clean', function () {
  return del(['css', 'js', '*.html', 'gradients.json'])
})

//////////////////////////////////////////////////////////////////////////////////////////
gulp.task('styles', function () {
  var processors = [
    require('postcss-import')(),
    require('postcss-cssnext')({
      browsers: ['last 2 version']
    }),
  ]
  if (!DEV) {
    processors.push(require('cssnano')({
      autoprefixer: false
    }))
  }
  return gulp.src('./src/css/style.css')
    .pipe(plumber())
    .pipe(postcss(processors))
    .pipe(gulp.dest('./css'))
    .pipe((gulpif(DEV, connect.reload())));
})

//////////////////////////////////////////////////////////////////////////////////////////
gulp.task('scripts', function () {
  var bundler

  if (DEV) {
    bundler = watchify(browserify('./src/js/main.js', {}).transform(babel));
    bundler.on('update', bundle);
    bundler.on('time', function (time) {
      console.log('Scripts compiled ' + time + 'ms')
    });
  } else {
    bundler = browserify('./src/js/main.js', {}).transform(babel)
  }

  function bundle() {
    bundler.bundle()
      .on('error', console.error)
      .pipe(plumber())
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(gulpif(!DEV, uglify()))
      .pipe(gulp.dest('./js'))
      .pipe(gulpif(DEV, connect.reload()));
  }

  return bundle();
})

//////////////////////////////////////////////////////////////////////////////////////////
gulp.task('html', function () {
  return gulp.src(['./src/*.html', './src/*.json'])
    .pipe(gulpif(!DEV, htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('.'))
})

//////////////////////////////////////////////////////////////////////////////////////////
gulp.task('watch', function () {
  watch(['./src/*.html', './src/*.json'], batch((event, done) =>
      gulp.start('html', done))
  );
  watch('./src/css/*.css', batch((event, done) =>
      gulp.start('styles', done))
  );
})

//////////////////////////////////////////////////////////////////////////////////////////
gulp.task('build', function () {
  return runSequence(
    [
      'clean'
    ],
    [
      'styles',
      'scripts',
      'html'
    ]
  )
})

//////////////////////////////////////////////////////////////////////////////////////////
gulp.task('start', function () {
  DEV = true
  return runSequence(
    [
      'clean'
    ],
    [
      'styles',
      'scripts',
      'html'
    ],
    [
      'server',
      'watch'
    ]
  )
})
