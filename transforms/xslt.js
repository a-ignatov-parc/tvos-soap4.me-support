'use strict';

const path = require('path');
const stream = require('stream');
const libxslt = require('libxslt-prebuilt');

const libxmljs = libxslt.libxmljs;

const defaults = {
	xslParams: {},
	dtdload: true,
	noent: true,
};

function consumeBuffer(done) {
	return new stream.Writable({
		objectMode: true,

		write(buffer, enc, next) {
			done(buffer);
			next();
		},
	});
}

module.exports = function xslt(stylesheetPath, xslParams) {
	const options = Object.assign({}, defaults, {xslParams});
	const stylesheetResolver = new Promise((resolve, reject) => {
		libxslt.parseFile(stylesheetPath, options, function(err, stylesheet) {
			if (err) return reject(err);
			resolve(stylesheet);
		});
	});

	return new stream.Transform({
		objectMode: true,

		transform(file, enc, next) {
			let fileResolver;

			const extname = path.extname(file.path);
			const basename = path.basename(file.path, extname);

			const xslParams = {
				basename,
			};

			if (file.isNull()) {
				return next(null, file);
			}

			if (file.isStream()) {
				fileResolver = new Promise(resolve => {
					file.pipe(consumeBuffer(buffer => resolve(buffer.toString())));
				});
			}

			if (file.isBuffer()) {
				fileResolver = Promise.resolve(file.contents.toString());
			}

			Promise
				.all([
					fileResolver,
					stylesheetResolver,
				])
				.then(function(results) {
					const content = results[0];
					const stylesheet = results[1];
					const params = Object.assign(xslParams, options.xslParams);
					const document = libxmljs.parseXmlString(content, options);
					if (document.errors.length) return Promise.reject(document.errors);
					return stylesheet.apply(document, params, {outputFormat: 'string'});
				})
				.then(result => {
					file.contents = new Buffer(result);
					this.push(file);
					next();
				})
				.catch(errors => next(errors));
		},
	});
}
