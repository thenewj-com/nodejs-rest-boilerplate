/**
 * server.js
 * Vishal Kumar
 */

`use strict`;

const express = require(`express`);
const cors = require(`cors`);
// eslint-disable-next-line no-undef
const port = process.env.PORT || 8000;

const {
	name,
	author,
	homepage,
} = require(`../../package.json`);

const {
	Response: { sendResponse },
} = require(`../utilities`);

const {
	i18n: { errorMessages: { NOT_FOUND } },
} = require(`../constants`);

const init = () => {
	const app = express();
	app.use(express.json());

	app.use(cors());

	const { logRequestStart, logResponseBody } = require(`../config`);
	app.use(logRequestStart);
	app.use(logResponseBody);

	app.get(`/`, (req, res) => {
		res.status(200).send(
			`Welcome to <strong>${name}</strong>.<br>
			Contact Author <a href='https://www.linkedin.com/in/the-vishal-kumar/'>${author}</a><br>
			Go to <a href='${homepage}'>Github Repo</a>`
		);
	});

	const {
		User: {
			UnAuthed: UnAuthedRoutes,
			Authed: AuthedRoutes,
			Admin: AdminRoutes,
			Reviewer: ReviewerRoutes,
		},
	} = require(`../routes`);

	app.use(`/`, UnAuthedRoutes);
	app.use(`/`, AuthedRoutes);
	app.use(`/admin`, AdminRoutes);
	app.use(`/reviewer`, ReviewerRoutes);

	app.use((req, res) => {
		sendResponse(req, res, 404, { message: NOT_FOUND });
	});

	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		sendResponse(req, res, 500, {}, { message: err.message || err });
	});

	return app;
};

module.exports = {
	init,
	port,
};
