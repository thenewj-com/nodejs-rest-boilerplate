/**
 * middlewares/index.js
 * Vishal Kumar
 */

`use strict`;

const { logRequestStart, logResponseBody } = require(`./req-res-interceptor`);

module.exports = {
	logRequestStart,
	logResponseBody,
};
