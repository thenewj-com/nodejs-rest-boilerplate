/**
 * db.js
 * Vishal Kumar
 */

`use strict`;

const { name } = require(`../../package.json`);
const { NODE_ENV } = require(`./server`);

require(`dotenv`).config();

module.exports = {
	MONGO_CLUSTER_URI: process.env.MONGO_CLUSTER_URI || `mongodb://localhost:27017/${name}-${NODE_ENV}`,
};
