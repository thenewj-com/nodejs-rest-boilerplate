/**
 * dbConfig.js
 * Vishal Kumar
 */

`use strict`;

require(`dotenv`).config();

const { name } = require(`../../package.json`);
const {
	server: { NODE_ENV },
	db: { MONGO_CLUSTER_URI }
} = require(`../constants`);

const mongoUri =
	MONGO_CLUSTER_URI ||
	`mongodb://localhost:27017/${name}-${NODE_ENV || `development`}`;

module.exports = {
	mongoUri,
	dbOptions: {
		// useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		connectTimeoutMS: 1000,
	},
};
