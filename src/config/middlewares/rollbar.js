/**
 * middlewares/rollbar.js
 * Vishal Kumar
 */

`use strict`;

const Rollbar = require(`rollbar`);

const { server: { ROLLBAR_ACCESS_TOKEN } } = require(`../../constants`);

const rollbar = new Rollbar({
	accessToken: ROLLBAR_ACCESS_TOKEN,
	captureUncaught: true,
	captureUnhandledRejections: true,
});

module.exports = { rollbar };
