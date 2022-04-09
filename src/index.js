/**
 * index.js
 * Vishal Kumar
 */

`use strict`;
global.__basedir = __dirname;

const nodeVersion = parseInt(process.versions.node);
if (nodeVersion < 16) throw `Kindly upgrade Node version to 16 or higher`;

const { dbInit, serverInit, serverPort } = require(`./app`);
const { BootStrap: { bootstrapAdmin } } = require(`./utilities`);

(async () => {
	try {
		const mongoose = await dbInit();
		const { connections: [{ host, port, name }] } = mongoose;
		console.info(`DB connected to ${host}:${port}/${name}`);
		await bootstrapAdmin();

		const server = await serverInit();
		server.listen(serverPort, () => {
			console.info(`Server listening at http://localhost:${serverPort}`);
		});
	} catch (error) {
		console.error(`Fatal Error:::***>`, (error), `---Fatal Error`);
	}
})();

process.on(`unhandledRejection`, (err) => {
	console.error(`unhandledRejection===>`, err);
	process.exit(0);
});
