/**
 * task.js
 * Vishal Kumar
 */

`use strict`;

const Joi = require(`joi`);

const createTaskSchema = {
	body: Joi.object().keys({
		title: Joi.string().trim().required().label(`Title`),
		description: Joi.string().trim().optional().allow(``).label(`Description`),
	}),
};

const updateTaskSchema = {
	body: Joi.object().keys({
		taskId: Joi.string().trim().required().label(`Task ID`),
		title: Joi.string().trim().optional().allow(``).label(`Title`),
		description: Joi.string().trim().optional().allow(``).label(`Description`),
	}),
};

const approveTaskSchema = {
	body: Joi.object().keys({
		taskId: Joi.string().trim().required().label(`Task ID`),
	}),
};

module.exports = {
	createTaskSchema,
	updateTaskSchema,
	approveTaskSchema,
};
