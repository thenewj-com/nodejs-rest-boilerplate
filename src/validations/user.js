/**
 * user.js
 * Vishal Kumar
 */

`use strict`;

const Joi = require(`joi`);

const loginSchema = {
	body: Joi.object().keys({
		email: Joi.string().trim().required().email().label(`Email`),
		password: Joi.string().trim().required().label(`Password`),
	}),
};

const createUserSchema = {
	body: Joi.object().keys({
		firstName: Joi.string().trim().required().label(`First Name`),
		lastName: Joi.string().trim().optional().allow(``).label(`Last Name`),
		email: Joi.string().trim().required().email().label(`Email`),
		password: Joi.string().trim().required().label(`Password`),
		reviewees: Joi.array()
			.items(Joi.string().trim())
			.min(0)
			.optional()
			.label(`Reviewee IDs`),
		isAdmin: Joi.boolean().default(false),
	}),
};

const assignReviewersSchema = {
	body: Joi.object().keys({
		userId: Joi.string().trim().required().label(`User ID`),
		reviewerId: Joi.array()
			.items(Joi.string().trim())
			.min(1)
			.required()
			.label(`Reviewer IDs`),
	}),
};

module.exports = {
	loginSchema,
	createUserSchema,
	assignReviewersSchema,
};
