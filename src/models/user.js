/**
 * user.js
 * Vishal Kumar
 */

`use strict`;

const { model, Schema } = require(`mongoose`);

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			index: true,
		},
		lastName: {
			type: String,
			default: ``,
			index: true,
			sparse: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		password: {
			type: String,
			required: true,
		},
		accessToken: {
			type: String,
			trim: true,
			default: null,
			index: true,
			sparse: true,
		},
		reviewees: [
			{
				type: Schema.Types.ObjectId,
				ref: `User`,
			},
		],
		isAdmin: {
			type: Boolean,
			default: false,
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

module.exports = model(`User`, userSchema);
