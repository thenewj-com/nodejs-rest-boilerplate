/**
 * auth.js
 * Vishal Kumar
 */

`use strict`;

const { UniversalFunctions: { verifyToken } } = require(`../utilities`);
const {	i18n: {errorMessages: { INVALID_TOKEN }}} = require(`../constants`);

const isUserLoggedIn = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		const token = authorization && authorization.split(` `)[1];
		if (token) {
			// TODO: Check if token exists in DB
			const user = await verifyToken(token);
			req.user = user;
			next();
		}
		next(INVALID_TOKEN);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	isUserLoggedIn,
};
