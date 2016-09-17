var gulp = require('gulp'),
	gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html');

var env, jsSources, sassSources, htmlSources, outputDir, sassStyle;

env = process.env.NODE_ENV || 'development';

if (env==='development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded'

} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed'
}

jsSources = [
    'components/scripts/docready.min.js',
    'components/scripts/action.js'
];

sassSources = [
    'components/sass/rahtz.net.scss'
];

htmlSources = [
	'builds/development/*.html'
];

gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('action.js'))
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload());
});

gulp.task('compass', function() {
    gulp.src(sassSources)
    	.pipe(notify({ message: 'sassStyle: ' + sassStyle }))
        .pipe(compass({
            sass: 'components/sass',
            image: outputDir + 'img',
            style: sassStyle
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(connect.reload())
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('watch', function() {
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch(htmlSources, ['html']);
	gulp.watch('builds/development/img/**/*.*', ['images']);
});

gulp.task('connect', function() {
	connect.server({
		root: outputDir,
		livereload: true

	})
});

gulp.task('images', function() {
	gulp.src('builds/development/img/**/*.*')
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'img')))
		.pipe(connect.reload());
})

gulp.task('html', function() {
	gulp.src(htmlSources)
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload());
});


gulp.task('default', ['html', 'js', 'compass', 'images', 'connect', 'watch']);


