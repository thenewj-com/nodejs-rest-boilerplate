/**
 * user.js
 * Vishal Kumar
 */

`use strict`;

const Joi = require(`joi`);

const loginSchema = {
	body: Joi.object().keys({
		countryCode: Joi.string().trim().required().min(2).label(`Country Code`),
		phoneNumber: Joi.string().trim().required().min(10).max(10).label(`Phone Number`),
	}),
};

module.exports = {
	loginSchema,
};
