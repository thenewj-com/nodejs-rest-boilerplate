/**
 * wrapperService.js
 * Vishal Kumar
 */

`use strict`;

const Model = require(`../models`);

module.exports = (model) => {
	const Services = {};

	Services.create = async (objToSave) => {
		return JSON.parse(JSON.stringify(await new Model[model](objToSave).save()));
	};

	Services.createMany = async (arrToSave) => {
		return JSON.parse(JSON.stringify(await Model[model].insertMany(arrToSave)));
	};

	Services.getOne = async (criteria, projection, options = {}) => {
		options.lean = true;
		options.virtuals = true;
		return Model[model].findOne(criteria, projection, options);
	};

	Services.getMany = async (criteria, projection, options = {}) => {
		options.lean = true;
		options.virtuals = true;
		return Model[model].find(criteria, projection, options);
	};

	Services.getPaginatedMany = async (criteria, projection, options = {}) => {
		options.lean = true;
		options.virtuals = true;
		if (!options.page || options.page < 1) options.page = 1;
		if (!options.limit || options.limit < 1) options.limit = 10;
		if (!options.sortKey) options.sortKey = `createdAt`;
		if (!options.sortOrder) options.sortOrder = `desc`;

		return new Promise((resolve, reject) => {
			Model[model].find(criteria, projection, options)
				.sort({ [options.sortKey]: options.sortOrder })
				.skip(options.limit * (options.page - 1))
				.limit(options.limit)
				.exec(function (err1, data) {
					if (err1) reject(err1);
					Model[model].count().exec(function (err2, count) {
						if (err2) reject(err2);
						resolve({
							data,
							prev: options.page > 1 ? options.page - 1 : null,
							current: options.page,
							next: options.page * options.limit < count ? options.page + 1 : null,
							count,
							pages: count / options.limit < 1 ? 1 : count / options.limit,
						});
					});
				});
		});
	};

	Services.getPopulatedMany = async (
		criteria,
		projection,
		populateQuery,
		options = {},
	) => {
		options.lean = true;
		options.virtuals = true;
		return Model[model]
			.find(criteria, projection, options)
			.populate(populateQuery)
			.exec();
	};

	Services.getPaginatedPopulatedMany = async (criteria, projection, populateQuery, options = {}) => {
		options.lean = true;
		options.virtuals = true;
		if (!options.page || options.page < 1) options.page = 1;
		if (!options.limit || options.limit < 1) options.limit = 10;
		if (!options.sortKey) options.sortKey = `createdAt`;
		if (!options.sortOrder) options.sortOrder = `desc`;

		return new Promise((resolve, reject) => {
			Model[model].find(criteria, projection, options)
				.sort({ [options.sortKey]: options.sortOrder })
				.skip(options.limit * (options.page - 1))
				.limit(options.limit)
				.populate(populateQuery)
				.exec(function (err1, data) {
					if (err1) reject(err1);
					Model[model].count().exec(function (err2, count) {
						if (err2) reject(err2);
						resolve({
							data,
							prev: options.page > 1 ? options.page - 1 : null,
							current: options.page,
							next: options.page * options.limit < count ? options.page + 1 : null,
							count,
							pages: count / options.limit < 1 ? 1 : count / options.limit,
						});
					});
				});
		});
	};

	Services.updateOne = async (criteria, dataToUpdate, options = {}) => {
		options.new = true;
		options.lean = true;
		options.useFindAndModify = false;
		options.virtuals = true;
		return Model[model].findOneAndUpdate(criteria, dataToUpdate, options);
	};

	Services.updateMany = async (criteria, dataToUpdate, options = {}) => {
		options.new = true;
		options.lean = true;
		options.virtuals = true;
		return Model[model].updateMany(criteria, dataToUpdate, options);
	};

	Services.deleteOne = async (criteria) => {
		return Model[model].deleteOne(criteria);
	};

	Services.deleteMany = async (criteria) => {
		return Model[model].deleteMany(criteria);
	};

	Services.count = async (criteria) => {
		return Model[model].countDocuments(criteria);
	};

	Services.aggregate = async (group) => {
		return Model[model].aggregate(group);
	};

	return Services;
};
