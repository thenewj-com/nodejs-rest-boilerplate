/**
 * task.js
 * Vishal Kumar
 */

`use strict`;

const { model, Schema } = require(`mongoose`);

const taskSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: ``,
		},
		approvedBy: [
			{
				type: Schema.Types.ObjectId,
				ref: `User`,
			},
		],
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: `User`,
			required: true,
			index: true,
		},
		isDeleted: {
			type: Boolean,
			default: false,
			index: true,
		},
		createdAt: Number,
		updatedAt: Number,
	},
	{
		// Make Mongoose use Unix time (seconds since Jan 1, 1970)
		timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
	}
);

module.exports = model(`Task`, taskSchema);
