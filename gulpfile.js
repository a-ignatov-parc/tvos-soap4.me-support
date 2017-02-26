'use strict';

const path = require('path');
const stream = require('stream');

const gulp = require('gulp');
const less = require('gulp-less');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');

const xslt = require('./transforms/xslt');

const LESS = './src/**/*.less';
const PICS = './src/**/*.{jpg,png,ico}';
const LOCALES = './src/locales/*.xml';

const DEST = './pages';

function resolvePages() {
	return new stream.Transform({
		objectMode: true,

		transform(file, enc, next) {
			const extname = path.extname(file.path);
			const basename = path.basename(file.path, extname);

			file.base = '/';
			file.path = `/${basename}/index.html`;

			next(null, file);
		},
	});
}

gulp.task('pages', function() {
	return gulp
		.src(LOCALES, {buffer: false})
		.pipe(plumber())
		.pipe(xslt('./src/page.xsl'))
		.pipe(resolvePages())
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
	gulp.watch(LESS, ['styles']);
	gulp.watch(PICS, ['images']);
	gulp.watch(LOCALES, ['pages']);
	gulp.watch('./src/**/*.xsl', ['pages']);
});

gulp.task('build', [
	'pages',
	'styles',
	'images',
]);

gulp.task('default', ['build']);
