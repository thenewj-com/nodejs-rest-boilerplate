/**
 * bootstrap.js
 * Vishal Kumar
 */

`use strict`;

const { User: UserService } = require(`../services`);
const { deleteUnnecessaryUserData } = require(`./universalFunctions`);

const bootstrapAdmin = async () => {
	const adminPayload = {
		firstName: `Vishal`,
		lastName: `Kumar`,
		email: `vishal194kumar@gmail.com`,
		countryCode: `+91`,
		phoneNumber: `8950656005`,
		isAdmin: true,
		isActive: true,
	};
	const admins = await UserService.getMany({ email: adminPayload.email });
	if (admins && admins.length > 0) {
		return deleteUnnecessaryUserData(admins[0]);
	} else {
		return deleteUnnecessaryUserData(await UserService.create(adminPayload));
	}
};

module.exports = {
	bootstrapAdmin,
};
