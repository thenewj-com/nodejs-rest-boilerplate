/**
 * user.js
 * Vishal Kumar
 */

`use strict`;

const { User: UserService } = require(`../services`);
const {
	UniversalFunctions: {
		encryptString,
		getTokenForUserId,
		deleteUnnecessaryUserData,
	},
} = require(`../utilities`);
const {
	i18n: {
		errorMessages: { INCORRECT_PASSWORD, NOT_FOUND, UNABLE_TO_SAVE },
	},
} = require(`../constants`);

const login = async (payload) => {
	const encryptedPassword = encryptString(payload.password);
	const user = await UserService.getMany({ email: payload.email });
	if (user && user.length > 0) {
		if (user && user[0].password == encryptedPassword) {
			const accessToken = await getTokenForUserId(user[0]._id);
			const updatedUser = await UserService.updateOne(
				{ email: payload.email },
				{ $set: { accessToken } }
			);
			return { accessToken: updatedUser.accessToken };
		} else throw INCORRECT_PASSWORD;
	} else throw NOT_FOUND;
};

const logout = async (user) => {
	await UserService.updateOne(
		{ _id: user._id },
		{ $set: { accessToken: null } }
	);
	return {};
};

const create = async (payload) => {
	const data = await UserService.create({
		...payload,
		password: encryptString(payload.password),
	});
	if (data && data._id) return deleteUnnecessaryUserData(data);
	else throw UNABLE_TO_SAVE;
};

const getUsers = async () => {
	const users = await UserService.getMany({ isAdmin: false });
	return users.map((user) => deleteUnnecessaryUserData(user));
};

const assignReviewers = async (payload) => {
	const user = await UserService.getMany({ _id: payload.userId }, { _id: 1 });
	if (!user || user.length === 0) throw NOT_FOUND;
	const reviewers = await UserService.getMany(
		{ _id: { $in: payload.reviewerId } },
		{ _id: 1 }
	);
	if (!reviewers || reviewers.length === 0) throw NOT_FOUND;
	await UserService.updateMany(
		{ _id: { $in: payload.reviewerId } },
		{ $addToSet: { reviewees: payload.userId } }
	);
	return {};
};

const getAllAssignedUsers = async (user) => {
	const users = await UserService.getMany(
		{ _id: { $in: user.reviewees } },
		{ _id: 1, firstName: 1, lastName: 1 }
	);
	return users;
};

module.exports = {
	login,
	logout,
	create,
	getUsers,
	assignReviewers,
	getAllAssignedUsers,
};
