/**
 * dbConfig.js
 * Vishal Kumar
 */

`use strict`;

const { db: { MONGO_CLUSTER_URI } } = require(`../constants`);

module.exports = {
	mongoUri: MONGO_CLUSTER_URI,
	dbOptions: {
		// useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		connectTimeoutMS: 1000,
	},
};
