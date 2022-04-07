/**
 * services/index.js
 * Vishal Kumar
 */

`use strict`;

module.exports = {
	User: require(`./wrapperService`)(`User`),
	Task: require(`./wrapperService`)(`Task`),
};
