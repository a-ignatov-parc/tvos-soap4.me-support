'use strict';

const gulp = require('gulp');

gulp.task('pages', function() {
	return gulp
		.src('./src/**/*.html', {read: false})
		.pipe(gulp.dest('./page'));
});


gulp.task('default', [
	'pages',
]);
