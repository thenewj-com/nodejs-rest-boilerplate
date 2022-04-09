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

const generateToken = async (data, expiresIn = `1d`) => {
	return JWT.sign(data, JWT_SECRET_KEY, { expiresIn });
};

const verifyToken = async (token) => {
	return new Promise((resolve, reject) => {
		JWT.verify(token, JWT_SECRET_KEY, async (err, decoded) => {
			if (err) reject(err);
			if (decoded._id) {
				const user = await UserService.getOne({ _id: decoded._id });
				if (user) resolve(deleteUnnecessaryUserData(user));
				reject(NOT_FOUND);
			}
			reject(NOT_FOUND);
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
	generateToken,
	verifyToken,
	deleteUnnecessaryUserData,
	pick,
};
