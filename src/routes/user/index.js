/**
 * user/index.js
 * Vishal Kumar
 */

`use strict`;

const login = require(`./login`);
const logout = require(`./logout`);
const verifyOtp = require(`./verifyOtp`);

module.exports = [
	login,
	logout,
	verifyOtp,
];
