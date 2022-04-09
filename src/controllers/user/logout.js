/**
 * logout.js
 * Vishal Kumar
 */

`use strict`;

const { Auth: AuthService } = require(`../../services`);

const logout = async (req) => {
	try {
		const { authorization } = req.headers;
		const token = authorization && authorization.split(` `)[1];
		await AuthService.deleteOne({ token });
	} catch (error) {
		throw error;
	}
};

module.exports = logout;
