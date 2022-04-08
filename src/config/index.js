/**
 * config/index.js
 * Vishal Kumar
 */

`use strict`;

const { mongoUri, dbOptions } = require(`./dbConfig`);
const { logRequestStart, logResponseBody, rollbar, initialiseSentry } = require(`./middlewares`);

module.exports = {
	mongoUri,
	dbOptions,
	logRequestStart,
	logResponseBody,
	rollbar,
	initialiseSentry,
};
