/**
 * universalFunctions.js
 * Vishal Kumar
 */

`use strict`;
const JWT = require(`jsonwebtoken`);
const MD5 = require(`md5`);
const { User: UserService } = require(`../services`);
const {
	server: { JWT_SECRET_KEY },
	i18n: {
		errorMessages: { NOT_FOUND },
	},
} = require(`../constants`);

const encryptString = (str) => {
	return MD5(MD5(str));
};

const getTokenForUserId = async (userId) => {
	return await JWT.sign({ userId }, JWT_SECRET_KEY);
};

const verifyToken = async (token) => {
	return new Promise((resolve, reject) => {
		JWT.verify(token, JWT_SECRET_KEY, async (err, decoded) => {
			if (err) reject(err);
			else if (decoded.userId) {
				const user = await UserService.getMany({
					_id: decoded.userId,
					accessToken: token,
				});
				if (user && user.length > 0)
					resolve(deleteUnnecessaryUserData(user[0]));
				else reject(NOT_FOUND);
			} else reject(NOT_FOUND);
		});
	});
};

const deleteUnnecessaryUserData = (data) => {
	delete data.password;
	delete data.accessToken;
	delete data.__v;
	return data;
};

const pick = (object, keys) => {
	return keys.reduce((obj, key) => {
		if (object && Object.prototype.hasOwnProperty.call(object, key)) {
			// eslint-disable-next-line no-param-reassign
			obj[key] = object[key];
		}
		return obj;
	}, {});
};

module.exports = {
	encryptString,
	getTokenForUserId,
	verifyToken,
	deleteUnnecessaryUserData,
	pick,
};
