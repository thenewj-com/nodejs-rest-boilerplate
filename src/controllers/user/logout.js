/**
 * logout.js
 * Vishal Kumar
 */

`use strict`;

const { Auth: AuthService } = require(`../../services`);

const logout = async (req) => {
	const { authorization } = req.headers;
	const token = authorization && authorization.split(` `)[1];
	await AuthService.deleteOne({ token });
};

module.exports = logout;
