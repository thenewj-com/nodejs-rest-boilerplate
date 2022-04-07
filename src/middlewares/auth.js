/**
 * auth.js
 * Vishal Kumar
 */

`use strict`;

const {
	UniversalFunctions: { verifyToken },
} = require(`../utilities`);

const isUserLoggedIn = async (accessToken) => {
	return await verifyToken(accessToken);
};

module.exports = {
	isUserLoggedIn,
};
