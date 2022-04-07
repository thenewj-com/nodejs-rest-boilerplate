/**
 * admin.js
 * Vishal Kumar
 */

`use strict`;

const { Router } = require(`express`);
const router = new Router();
const {
	Auth: { isUserLoggedIn },
} = require(`../../middlewares`);
const {
	User: { createUserSchema, assignReviewersSchema },
} = require(`../../validations`);
const {
	Response: { validateInput, sendResponse },
} = require(`../../utilities`);
const {
	i18n: {
		errorMessages: { PERMISSIONS_DENIED, INVALID_TOKEN },
	},
} = require(`../../constants`);
const {
	User: { create, getUsers, assignReviewers },
	Task: { getTasksByUserId },
} = require(`../../controllers`);

router.use(async (req, res, next) => {
	const { authorization } = req.headers;
	const token = authorization && authorization.split(` `)[1];
	try {
		if (token) {
			const user = await isUserLoggedIn(token);
			if (!user.isAdmin) throw PERMISSIONS_DENIED;
			req.user = user;
		} else throw INVALID_TOKEN;
	} catch (error) {
		return next(error);
	}
	next();
});

router.post(
	`/user`,
	validateInput(createUserSchema),
	async (req, res, next) => {
		try {
			const data = await create(req.body);
			sendResponse(req, res, 201, { ...data });
		} catch (error) {
			next(error);
		}
	}
);

router.get(`/user`, async (req, res) => {
	const users = await getUsers();
	sendResponse(req, res, 200, { users });
});

router.get(`/:userId/tasks`, async (req, res) => {
	const tasks = await getTasksByUserId(req.params);
	sendResponse(req, res, 200, { tasks });
});

router.post(
	`/assignReviewers`,
	validateInput(assignReviewersSchema),
	async (req, res, next) => {
		try {
			await assignReviewers(req.body);
			sendResponse(req, res, 200);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
