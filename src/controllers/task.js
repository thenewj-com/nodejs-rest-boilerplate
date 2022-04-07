/**
 * task.js
 * Vishal Kumar
 */

`use strict`;

const { Task: TaskService } = require(`../services`);
const {
	UniversalFunctions: { deleteUnnecessaryUserData },
} = require(`../utilities`);
const {
	i18n: {
		errorMessages: { NOT_FOUND, UNABLE_TO_SAVE, PERMISSIONS_DENIED },
	},
} = require(`../constants`);

const create = async (payload, user) => {
	const data = await TaskService.create({
		...payload,
		createdBy: user._id,
	});
	if (data && data._id) return deleteUnnecessaryUserData(data);
	else throw UNABLE_TO_SAVE;
};

const getTaskById = async (payload, user) => {
	const data = await TaskService.getMany({
		_id: payload.taskId,
		createdBy: user._id,
		isDeleted: false,
	});
	if (data && data.length > 0) return deleteUnnecessaryUserData(data[0]);
	else throw NOT_FOUND;
};

const updateTask = async (payload, user) => {
	let dataToSet = {};
	if (payload.title) dataToSet.title = payload.title;
	if (payload.description) dataToSet.description = payload.description;
	const data = await TaskService.updateOne(
		{ _id: payload.taskId, createdBy: user._id, isDeleted: false },
		{ $set: dataToSet }
	);
	return deleteUnnecessaryUserData(data);
};

const getTasksByUserId = async (payload) => {
	const data = await TaskService.getPopulatedMany(
		{ createdBy: payload.userId, isDeleted: false },
		{},
		[
			{
				path: `approvedBy`,
				select: `_id firstName lastName`,
			},
		]
	);
	if (data && data.length > 0)
		return data.map((x) => deleteUnnecessaryUserData(x));
	else return [];
};

const approveTask = async (payload, user) => {
	const task = await TaskService.getMany(
		{ _id: payload.taskId, isDeleted: false },
		{ createdBy: 1 }
	);
	if (!task || task.length === 0) throw NOT_FOUND;
	if (
		user.reviewees
			.map((x) => x.toString())
			.indexOf(task[0].createdBy.toString()) === -1
	)
		throw PERMISSIONS_DENIED;
	await TaskService.updateOne(
		{ _id: payload.taskId },
		{ $addToSet: { approvedBy: user._id } }
	);
	return {};
};

module.exports = {
	create,
	getTaskById,
	updateTask,
	getTasksByUserId,
	approveTask,
};
