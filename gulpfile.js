var gulp = require('gulp'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat');

var jsSources = [
	'components/scripts/docready.min.js',
	'components/scripts/action.js'
]

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(concat('action.js'))
		.pipe(gulp.dest('builds/development/js'));
});

gulp.task('default', function() {
	gutil.log("here we are.");
});