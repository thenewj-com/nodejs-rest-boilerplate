/**
 * error/index.js
 * Vishal Kumar
 */

`use strict`;

const NotFoundError = require(`./notFoundError`);
const ValidationError = require(`./validationError`);

module.exports = {
	NotFoundError,
	ValidationError,
};
