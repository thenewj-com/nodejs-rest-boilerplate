/**
 * login.js
 * Vishal Kumar
 */

`use strict`;

const { User: UserService } = require(`../../services`);
const { UniversalFunctions: { generateToken } } = require(`../../utilities`);

const login = async (payload) => {
	let user = await UserService.getOne({ email: payload.email });
	if (user) {
		const token = await generateToken({ _id: user._id }, `300s`);
		user.accessToken = token;
		return user;
	}

	user = await UserService.create(payload);
	const token = await generateToken({ _id: user._id }, `300s`);
	user.accessToken = token;

	// TODO: Send OTP on Phone Number

	return user;
};

module.exports = login;
