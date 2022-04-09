/**
 * logout.js
 * Vishal Kumar
 */

`use strict`;

const { Router } = require(`express`);
const router = new Router();
const { Auth: { isUserLoggedIn } } = require(`../../middlewares`);
const { User: { logout } } = require(`../../controllers`);
const { Response: { sendResponse } } = require(`../../utilities`);

router.post(`/logout`, isUserLoggedIn, async (req, res, next) => {
	try {
		await logout(req.user);
		return sendResponse(req, res, 204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
