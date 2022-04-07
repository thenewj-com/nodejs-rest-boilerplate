/**
 * reviewer.js
 * Vishal Kumar
 */

`use strict`;

const { Router } = require(`express`);
const router = new Router();
const {
	Auth: { isUserLoggedIn },
} = require(`../../middlewares`);
const {
	Task: { approveTaskSchema },
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
	User: { getAllAssignedUsers },
	Task: { getTasksByUserId, approveTask },
} = require(`../../controllers`);

router.use(async (req, res, next) => {
	const { authorization } = req.headers;
	const token = authorization && authorization.split(` `)[1];
	try {
		if (token) {
			const user = await isUserLoggedIn(token);
			if (user.reviewees && user.reviewees.length == 0)
				throw PERMISSIONS_DENIED;
			req.user = user;
		} else throw INVALID_TOKEN;
	} catch (error) {
		return next(error);
	}
	next();
});

router.param(`userId`, (req, res, next, userId) => {
	if (
		userId &&
    req.user.reviewees.map((x) => x.toString()).indexOf(userId) === -1
	)
		throw PERMISSIONS_DENIED;
	next();
});

router.get(`/users`, async (req, res, next) => {
	try {
		const users = await getAllAssignedUsers(req.user);
		sendResponse(req, res, 200, { users });
	} catch (error) {
		next(error);
	}
});

router.get(`/:userId/tasks`, async (req, res, next) => {
	try {
		const users = await getTasksByUserId(req.params);
		sendResponse(req, res, 200, { users });
	} catch (error) {
		next(error);
	}
});

router.put(
	`/approve-task`,
	validateInput(approveTaskSchema),
	async (req, res, next) => {
		try {
			await approveTask(req.body, req.user);
			sendResponse(req, res, 200);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
