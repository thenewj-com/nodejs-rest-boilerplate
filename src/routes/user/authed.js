/**
 * authed.js
 * Vishal Kumar
 */

`use strict`;

const { Router } = require(`express`);
const router = new Router();
const {
	User: { logout },
} = require(`../../controllers`);
const {
	Auth: { isUserLoggedIn },
} = require(`../../middlewares`);
const {
	Task: { createTaskSchema, updateTaskSchema },
} = require(`../../validations`);
const {
	Task: { create, getTaskById, updateTask },
} = require(`../../controllers`);
const {
	Response: { validateInput, sendResponse },
} = require(`../../utilities`);
const {
	i18n: {
		errorMessages: { INVALID_TOKEN },
	},
} = require(`../../constants`);

router.use(async (req, res, next) => {
	const { authorization } = req.headers;
	const token = authorization && authorization.split(` `)[1];
	try {
		if (token) {
			const user = await isUserLoggedIn(token);
			req.user = user;
		} else throw INVALID_TOKEN;
	} catch (error) {
		return next(error);
	}
	next();
});

router.post(`/logout`, async (req, res, next) => {
	try {
		await logout(req.user);
		sendResponse(req, res, 200);
	} catch (error) {
		next(error);
	}
});

router.post(
	`/task`,
	validateInput(createTaskSchema),
	async (req, res, next) => {
		try {
			const data = await create(req.body, req.user);
			sendResponse(req, res, 201, { ...data });
		} catch (error) {
			next(error);
		}
	}
);

router.get(`/task/:taskId`, async (req, res, next) => {
	try {
		const task = await getTaskById(req.params, req.user);
		sendResponse(req, res, 200, { ...task });
	} catch (error) {
		next(error);
	}
});

router.put(`/task`, validateInput(updateTaskSchema), async (req, res, next) => {
	try {
		const task = await updateTask(req.body, req.user);
		sendResponse(req, res, 200, { ...task });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
