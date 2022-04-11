/**
 * NotFoundError.js
 * Vishal Kumar
 */

`use strict`;

class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.name = `NotFoundError`;
	}
}

module.exports = NotFoundError;