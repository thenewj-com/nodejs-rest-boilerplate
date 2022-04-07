/**
 * config/index.js
 * Vishal Kumar
 */

`use strict`;

const { mongoUri, dbOptions } = require(`./dbConfig`);
const { logRequestStart, logResponseBody } = require(`./middlewares`);

module.exports = {
	mongoUri,
	dbOptions,
	logRequestStart,
	logResponseBody,
};
