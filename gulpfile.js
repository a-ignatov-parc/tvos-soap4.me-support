'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');

const HTML = './src/**/*.html';
const LESS = './src/**/*.less';
const PICS = './src/**/*.{jpg,png,ico}';

const DEST = './page';

gulp.task('pages', function() {
	return gulp
		.src(HTML, {buffer: false})
		.pipe(gulp.dest(DEST));
});

gulp.task('styles', function() {
	return gulp
		.src(LESS)
		.pipe(plumber())
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(gulp.dest(DEST));
});

gulp.task('images', function() {
	return gulp
		.src(PICS, {buffer: false})
		.pipe(gulp.dest(DEST));
});

gulp.task('watch', function() {
	gulp.start('build');
	gulp.watch(HTML, ['pages']);
	gulp.watch(LESS, ['styles']);
	gulp.watch(PICS, ['images']);
});

gulp.task('build', [
	'pages',
	'styles',
	'images',
]);

gulp.task('default', ['build']);
