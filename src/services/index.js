/**
 * services/index.js
 * Vishal Kumar
 */

`use strict`;

module.exports = {
	Auth: require(`./wrapperService`)(`Auth`),
	User: require(`./wrapperService`)(`User`),
};
