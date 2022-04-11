/**
 * server.js
 * Vishal Kumar
 */

`use strict`;

const express = require(`express`);
const cors = require(`cors`);

const {
	server: { PORT, SENTRY_DSN },
	i18n: { errorMessages: { NOT_FOUND } },
} = require(`../constants`);

const {
	name,
	author,
	homepage,
} = require(`../../package.json`);

const {
	Response: { sendResponse },
} = require(`../utilities`);

const {
	logRequestStart,
	logResponseBody,
	// rollbar,
	initialiseSentry
} = require(`../config`);

const init = () => {
	const app = express();
	app.use(express.json());
	app.use(cors());

	app.use(logRequestStart);
	app.use(logResponseBody);

	app.use(`/public`, express.static(`public`));

	app.get(`/`, (req, res) => {
		res.status(200).send(
			`Welcome to <strong>${name}</strong>.<br>
			Contact Author <a href='https://www.linkedin.com/in/the-vishal-kumar/'>${author}</a><br>
			Go to <a href='${homepage}'>Github Repo</a>`
		);
	});

	const { User } = require(`../routes`);
	app.use(`/v1`, User);

	app.use((req, res) => {
		sendResponse(req, res, 404, { message: NOT_FOUND });
	});

	// app.use(rollbar.errorHandler());
	if (SENTRY_DSN) {
		const Sentry = initialiseSentry(app);
		app.use(Sentry.Handlers.errorHandler());
	}

	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		sendResponse(req, res, 500, {}, { message: err.message || err });
	});

	return app;
};

module.exports = {
	init,
	port: PORT,
};
