var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');

var jsSources = [
    'components/scripts/docready.min.js',
    'components/scripts/action.js'
];

var sassSources = [
    'components/sass/rahtz.net.scss'
];


gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('action.js'))
        .pipe(gulp.dest('builds/development/js'));
});

gulp.task('compass', function() {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            image: 'builds/development/img',
            style: 'expanded'
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('builds/development/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('watch', function() {
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
});

gulp.task('default', ['js', 'compass', 'watch']);