/**
 * server.js
 * Vishal Kumar
 */

`use strict`;

require(`dotenv`).config();

module.exports = {
	NODE_ENV: process.env.NODE_ENV || `development`,
	PORT: process.env.PORT || 8000,
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || `sUPerSeCuREKeY&^$^&$^%$^%7782348723t4872t34Ends`,
	ROLLBAR_ACCESS_TOKEN: process.env.ROLLBAR_ACCESS_TOKEN || ``,
	SENTRY_DSN: process.env.SENTRY_DSN || ``,
};
