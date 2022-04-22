/**
 * auth.js
 * Vishal Kumar
 */

`use strict`;

const { model, Schema } = require(`mongoose`);

const authSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			index: true,
			ref: `User`,
		},
		otp: {
			type: String,
			default: null,
			minlength: 6,
			maxlength: 6,
		},
		token: {
			type: String,
			unique: true,	
			index: true,
		},
		refreshToken: {
			type: String,
			unique: true,
			index: true,
		},
		validTill: {
			type: Date,
			required: true,
		},
		createdAt: {
			type: Number,
		},
		updatedAt: {
			type: Number,
		},
	},
	{
		// Make Mongoose use Unix time (seconds since Jan 1, 1970)
		timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
	},
);

authSchema.index({ validTill: 1 }, { expireAfterSeconds: 0 });

module.exports = model(`Auth`, authSchema);
