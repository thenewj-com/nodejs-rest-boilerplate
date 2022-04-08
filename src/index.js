/**
 * index.js
 * Vishal Kumar
 */

`use strict`;
// eslint-disable-next-line no-undef
global.__basedir = __dirname;

// eslint-disable-next-line no-undef
const nodeVersion = parseInt(process.versions.node);
if (nodeVersion < 16) throw `Kindly upgrade Node version to 16 or higher`;

const { dbInit, serverInit, serverPort } = require(`./app`);
const {
	BootStrap: { bootstrapAdmin },
} = require(`./utilities`);

(async () => {
	try {
		const mongoose = await dbInit();
		console.log(
			`DB connected to ${mongoose.connections[0].host}:${mongoose.connections[0].port}/${mongoose.connections[0].name}`
		);
		await bootstrapAdmin();

		const server = await serverInit();
		server.listen(serverPort, () => {
			console.log(`Server listening at http://localhost:${serverPort}`);
		});
	} catch (error) {
		console.log(
			`\nFatal Error:::***>`,
			JSON.stringify(error),
			`---Fatal Error`
		);
	}
})();

// eslint-disable-next-line no-undef
process.on(`unhandledRejection`, (err) => {
	console.log(`unhandledRejection===>`, err);
	// eslint-disable-next-line no-undef
	// process.exit(0);
});
