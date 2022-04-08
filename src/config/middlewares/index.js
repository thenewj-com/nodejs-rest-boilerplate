/**
 * middlewares/index.js
 * Vishal Kumar
 */

`use strict`;

const { logRequestStart, logResponseBody } = require(`./req-res-interceptor`);
const { rollbar } = require(`./rollbar`);
const { initialiseSentry } = require(`./sentry`);

module.exports = {
	logRequestStart,
	logResponseBody,
	rollbar,
	initialiseSentry,
};
