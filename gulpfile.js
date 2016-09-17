var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    connect = require('gulp-connect');

var jsSources = [
    'components/scripts/docready.min.js',
    'components/scripts/action.js'
];

var sassSources = [
    'components/sass/rahtz.net.scss'
];

var htmlSources = [
	'builds/development/*.html'
];

gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('action.js'))
        .pipe(gulp.dest('builds/development/js'))
        .pipe(connect.reload());
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
        .pipe(connect.reload())
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('watch', function() {
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
	connect.server({
		root: 'builds/development/',
		livereload: true

	})
});

gulp.task('html', function() {
	gulp.src(htmlSources)
		.pipe(connect.reload());
});


gulp.task('default', ['html', 'js', 'compass', 'connect', 'watch']);